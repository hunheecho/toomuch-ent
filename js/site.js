/* 공통 레이아웃(헤더/푸터) + 페이지별 렌더링 */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // 사진이 없을 때 쓰는 자리표시 배경
  function visual(img, seed) {
    if (img) return `style="background-image:url('${esc(img)}')"`;
    const h = (seed * 47) % 360;
    return `style="background-image:linear-gradient(160deg,hsl(${h} 22% 80%),hsl(${(h + 40) % 360} 20% 58%))"`;
  }

  /* ---------- 헤더 ---------- */
  function renderHeader() {
    const current = location.pathname.split('/').pop() || 'index.html';
    const item = (n) => {
      const active = n.href.split('?')[0].split('#')[0] === current &&
        (!n.href.includes('?g=') || params.get('g') === new URLSearchParams(n.href.split('?')[1]).get('g'));
      const sub = n.sub ? `<ul class="sub">${n.sub.map((s) => `<li><a href="${s.href}">${s.label}</a></li>`).join('')}</ul>` : '';
      return `<li class="${active ? 'on' : ''}"><a href="${n.href}">${n.label}</a>${sub}</li>`;
    };
    $('#header').innerHTML = `
      <header class="hd">
        <a class="logo" href="index.html" aria-label="${SITE.nameKo} 홈">
          <strong>TOO MUCH</strong><span>ENTERTAINMENT</span>
        </a>
        <nav class="gnb" aria-label="주 메뉴"><ul>${NAV.map(item).join('')}</ul></nav>
        <button class="burger" aria-label="메뉴 열기" aria-expanded="false"><i></i><i></i><i></i></button>
      </header>
      <div class="drawer" hidden>
        <ul>${NAV.map((n) => `
          <li><a class="d1" href="${n.href}">${n.label}</a>
            ${n.sub ? `<div class="d2">${n.sub.map((s) => `<a href="${s.href}">${s.label}</a>`).join('')}</div>` : ''}
          </li>`).join('')}
        </ul>
        <div class="drawer-sns">${[['Instagram', SITE.instagram], ['Blog', SITE.blog]].filter(([, u]) => u && u !== '#').map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${l}</a>`).join('')}</div>
      </div>`;
    const burger = $('.burger'), drawer = $('.drawer');
    burger.addEventListener('click', () => {
      const open = drawer.hidden;
      drawer.hidden = !open;
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.classList.toggle('lock', open);
    });
    const onScroll = () => {
      $('.hd').classList.toggle('scrolled', window.scrollY > 10);
      // 홈 히어로의 버튼을 가리지 않도록, 홈에서는 스크롤 후에 플로팅 버튼 노출
      const fl = $('.floating');
      if (fl) fl.classList.toggle('show', page !== 'home' || window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 푸터 + 플로팅 버튼 ---------- */
  function renderFooter() {
    $('#footer').innerHTML = `
      <footer class="ft">
        <div class="wrap ft-in">
          <div class="ft-brand">
            <a class="logo" href="index.html"><strong>TOO MUCH</strong><span>ENTERTAINMENT</span></a>
            <p>Model &amp; Influencer Agency</p>
          </div>
          <ul class="ft-nav">${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
          <div class="ft-info">
            <p>${SITE.nameKo}</p>
            <p>E-mail <a href="mailto:${SITE.email}">${SITE.email}</a></p>
            <p>주소 ${SITE.address}</p>
            <p class="copy">Copyright © ${new Date().getFullYear()} ${SITE.nameKo}. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      <div class="floating">
        <a href="contact.html" class="f-ask">섭외<br>문의</a>
        <button class="f-top" aria-label="맨 위로">↑</button>
      </div>`;
    $('.f-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 카드 ---------- */
  const modelCard = (m, i) => `
    <button class="m-card reveal" data-idx="${MODELS.indexOf(m)}">
      <div class="ph" ${visual(m.img, i + m.name.length)}>${m.img ? '' : `<em>${esc(m.en)}</em>`}</div>
      <div class="m-meta"><strong>${esc(m.name)}</strong><span>${MODEL_CATS[m.c]} · ${esc(m.age)}</span></div>
    </button>`;

  const inflCard = (f, i) => `
    <article class="i-card reveal">
      <div class="ph round" ${visual(f.img, i * 3 + 5)}>${f.img ? '' : `<em>${esc(f.en)}</em>`}</div>
      <span class="tag">${PLATFORMS[f.p]}</span>
      <strong>${esc(f.name)}</strong>
      <dl><div><dt>규모</dt><dd>${esc(f.scale)}</dd></div><div><dt>콘텐츠</dt><dd>${esc(f.content)}</dd></div></dl>
      <a class="link" href="contact.html?target=${encodeURIComponent(`${PLATFORMS[f.p]} 인플루언서 · ${f.name}`)}">섭외 문의 →</a>
    </article>`;

  const workCard = (w, i) => `
    <article class="w-card reveal">
      <div class="ph wide" ${visual(w.img, i * 5 + 2)}>${w.img ? '' : `<em>${esc(w.en)}</em>`}</div>
      <span class="tag">${WORK_CATS[w.cat]}</span>
      <strong>${esc(w.title)}</strong>
      <span class="sub">${esc(w.desc)}</span>
    </article>`;

  /* ---------- 모델 상세 모달 ---------- */
  function bindModelModal(root) {
    let dlg = $('#modelDlg');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'modelDlg';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('.dlg-x')) dlg.close(); });
    }
    root.addEventListener('click', (e) => {
      const card = e.target.closest('.m-card');
      if (!card) return;
      const m = MODELS[card.dataset.idx];
      dlg.innerHTML = `
        <div class="dlg-in">
          <button class="dlg-x" aria-label="닫기">×</button>
          <div class="ph" ${visual(m.img, +card.dataset.idx + m.name.length)}>${m.img ? '' : `<em>${esc(m.en)}</em>`}</div>
          <div class="dlg-body">
            <span class="tag">${GENDERS[m.g]} · ${MODEL_CATS[m.c]}</span>
            <h3>${esc(m.name)}</h3>
            <dl>
              <div><dt>AGE</dt><dd>${esc(m.age)}</dd></div>
              <div><dt>WORK</dt><dd>${esc(m.use)}</dd></div>
            </dl>
            <p>모델 프로필은 문의 시 조건에 맞춰 컴카드(Comp Card) 리스트로 제안드립니다.</p>
            <a class="btn" href="contact.html?target=${encodeURIComponent(`${GENDERS[m.g]} · ${MODEL_CATS[m.c]} · ${m.name}`)}">이 라인업으로 문의 →</a>
          </div>
        </div>`;
      dlg.showModal();
    });
  }

  /* ---------- 필터 탭 ---------- */
  function tabs(el, options, value, onChange) {
    el.innerHTML = options.map(([v, l]) => `<button data-v="${v}" class="${v === value ? 'on' : ''}">${l}</button>`).join('');
    el.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', el).forEach((x) => x.classList.toggle('on', x === b));
      onChange(b.dataset.v);
    });
  }

  /* ---------- 페이지별 ---------- */
  const pages = {
    home() {
      $('#homeModels').innerHTML = MODELS.filter((m) => m.featured).map(modelCard).join('');
      bindModelModal($('#homeModels'));
      $('#homeInfl').innerHTML = INFLUENCERS.slice(0, 5).map(inflCard).join('');
      $('#homeWorks').innerHTML = WORKS.slice(0, 6).map(workCard).join('');
    },
    models() {
      let g = GENDERS[params.get('g')] ? params.get('g') : 'all';
      let c = MODEL_CATS[params.get('c')] ? params.get('c') : 'all';
      const grid = $('#modelGrid');
      const draw = () => {
        const list = MODELS.filter((m) => (g === 'all' || m.g === g) && (c === 'all' || m.c === c));
        $('#modelTitle').textContent = g === 'all' ? 'MODELS' : g === 'f' ? 'WOMEN' : 'MEN';
        $('#modelCount').textContent = `${list.length}개 라인업`;
        grid.innerHTML = list.length ? list.map(modelCard).join('') : '<p class="empty">해당 라인업은 문의해 주세요.</p>';
        const q = new URLSearchParams();
        if (g !== 'all') q.set('g', g);
        if (c !== 'all') q.set('c', c);
        history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : ''));
        observe();
      };
      tabs($('#genderTabs'), [['all', '전체'], ['f', '여자모델'], ['m', '남자모델']], g, (v) => { g = v; draw(); });
      tabs($('#catTabs'), [['all', '전체'], ...Object.entries(MODEL_CATS)], c, (v) => { c = v; draw(); });
      bindModelModal(grid);
      draw();
    },
    influencers() {
      let p = PLATFORMS[params.get('p')] ? params.get('p') : 'all';
      const draw = () => {
        $('#inflGrid').innerHTML = INFLUENCERS.filter((f) => p === 'all' || f.p === p).map(inflCard).join('');
        observe();
      };
      tabs($('#platTabs'), [['all', '전체'], ...Object.entries(PLATFORMS)], p, (v) => { p = v; draw(); });
      draw();
    },
    portfolio() {
      let cat = 'all';
      const draw = () => {
        $('#workGrid').innerHTML = WORKS.filter((w) => cat === 'all' || w.cat === cat).map(workCard).join('');
        observe();
      };
      tabs($('#workTabs'), [['all', '전체'], ...Object.entries(WORK_CATS)], cat, (v) => { cat = v; draw(); });
      draw();
    },
    contact() {
      $$('[data-site]').forEach((el) => {
        const k = el.dataset.site;
        el.textContent = SITE[k];
        if (el.tagName === 'A') el.href = `mailto:${SITE[k]}`;
      });
      $('#profileMail').href = `mailto:${SITE.profileEmail}?subject=${encodeURIComponent('[프로필 접수] 이름 / 분야')}`;
      const form = $('#askForm');
      if (params.get('target')) form.message.value = `섭외 희망: ${params.get('target')}\n\n`;
      // 서버가 없으므로 작성 내용을 메일 앱으로 넘깁니다. (추후 폼 서비스/백엔드 연동 지점)
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const d = new FormData(form);
        const body = [
          `구분: ${d.get('type')}`, `회사/브랜드: ${d.get('company')}`, `담당자: ${d.get('name')}`,
          `연락처: ${d.get('phone')}`, `이메일: ${d.get('email')}`, `일정: ${d.get('date') || '-'}`,
          `예산: ${d.get('budget') || '-'}`, '', d.get('message'),
        ].join('\n');
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`[섭외문의] ${d.get('company')} / ${d.get('type')}`)}&body=${encodeURIComponent(body)}`;
        $('#formNote').hidden = false;
      });
    },
  };

  /* ---------- 스크롤 등장 효과 ---------- */
  let io;
  function observe() {
    if (!('IntersectionObserver' in window)) return $$('.reveal').forEach((el) => el.classList.add('in'));
    io = io || new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal:not(.in)').forEach((el) => io.observe(el));
  }

  renderHeader();
  renderFooter();
  window.dispatchEvent(new Event('scroll'));
  if (pages[page]) pages[page]();
  observe();
})();
