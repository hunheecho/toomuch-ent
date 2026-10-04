/* ============================================================
   (주)투머치엔터테이먼트 — 사이트 데이터
   이 파일만 고치면 회사 정보 / 모델 / 인플루언서 / 포트폴리오가 전부 바뀝니다.
   ============================================================ */

// 회사 기본 정보 (※ 실제 정보로 교체하세요)
const SITE = {
  nameKo: '(주)투머치엔터테이먼트',
  nameEn: 'TOO MUCH ENTERTAINMENT',
  ceo: '대표자명',
  bizNo: '000-00-00000',
  regNo: '제0000-000000호', // 대중문화예술기획업 등록번호
  tel: '010-0000-0000',
  email: 'gongtek@naver.com',
  profileEmail: 'gongtek@naver.com', // 모델·인플루언서 지원 접수 메일
  address: '서울 강남구 삼성동 107',
  hours: '평일 10:00 – 19:00',
  instagram: '', // 주소를 넣으면 모바일 메뉴에 링크가 나타납니다
  blog: '',
};

// 메뉴 구성
const NAV = [
  { label: '회사소개', href: 'about.html' },
  {
    label: '여자모델', href: 'models.html?g=f',
    sub: [
      { label: '국내', href: 'models.html?g=f&c=domestic' },
      { label: '외국인', href: 'models.html?g=f&c=foreign' },
      { label: '시니어', href: 'models.html?g=f&c=senior' },
      { label: '키즈', href: 'models.html?g=f&c=kids' },
    ],
  },
  {
    label: '남자모델', href: 'models.html?g=m',
    sub: [
      { label: '국내', href: 'models.html?g=m&c=domestic' },
      { label: '외국인', href: 'models.html?g=m&c=foreign' },
      { label: '시니어', href: 'models.html?g=m&c=senior' },
      { label: '키즈', href: 'models.html?g=m&c=kids' },
    ],
  },
  {
    label: '인플루언서', href: 'influencers.html',
    sub: [
      { label: '인스타그램', href: 'influencers.html?p=instagram' },
      { label: '유튜브', href: 'influencers.html?p=youtube' },
      { label: '틱톡', href: 'influencers.html?p=tiktok' },
    ],
  },
  {
    label: '서비스', href: 'service.html',
    sub: [
      { label: '모델 캐스팅', href: 'service.html#casting' },
      { label: '인플루언서 마케팅', href: 'service.html#influencer' },
      { label: '행사 · 의전', href: 'service.html#promotion' },
      { label: '촬영대행', href: 'service.html#production' },
    ],
  },
  { label: '프로젝트', href: 'portfolio.html' },
  { label: '섭외문의', href: 'contact.html' },
];

const MODEL_CATS = { domestic: '국내', foreign: '외국인', senior: '시니어', kids: '키즈' };
const GENDERS = { f: '여자모델', m: '남자모델' };
const PLATFORMS = { instagram: '인스타그램', youtube: '유튜브', tiktok: '틱톡' };
const WORK_CATS = { ad: '광고 · 화보', sns: 'SNS 캠페인', event: '팝업 · 행사', video: '영상' };

/* ------------------------------------------------------------
   캐스팅 라인업 (모델 유형)
   개인 프로필은 공개하지 않고, 문의 시 조건에 맞는 리스트를 제안하는 방식입니다.
   실제 소속 모델이 생기면 name 에 이름, img 에 사진 경로를 넣어 개인 카드로 써도 됩니다.
   { name, en, g:'f'|'m', c, age, use, img, featured }
   ------------------------------------------------------------ */
// 분위기컷 파일명 규칙: images/{f|m|x(키즈)|i|w}-{영문 태그 소문자}.jpg
const slug = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
const M = (g, c, name, en, age, use, featured) => ({ g, c, name, en, age, use, img: `images/${c === 'kids' ? 'x' : g}-${slug(en)}.jpg?v=5`, featured: !!featured });
const MODELS = [
  M('f', 'domestic', '뷰티 · 스킨케어', 'BEAUTY', '20–30대', '화장품 광고, 상세페이지, 뷰티 화보', 1),
  M('f', 'domestic', '패션 · 룩북', 'FASHION', '20–30대', '시즌 룩북, 브랜드 화보, 캠페인', 1),
  M('f', 'domestic', '피팅 · 쇼핑몰', 'FITTING', '20대', '쇼핑몰 정기 촬영, 라이브 커머스'),
  M('f', 'domestic', '광고 · CF', 'COMMERCIAL', '20–40대', 'TV · 디지털 광고, 바이럴 영상'),
  M('f', 'domestic', '피트니스 · 애슬레저', 'FITNESS', '20–30대', '스포츠웨어, 헬스 · 필라테스 브랜드', 1),
  M('f', 'domestic', '웨딩 · 주얼리', 'WEDDING', '20–30대', '웨딩 화보, 주얼리 · 핸드 컷'),
  M('f', 'foreign', '하이패션', 'HIGH FASHION', '20대', '에디토리얼, 글로벌 캠페인', 1),
  M('f', 'foreign', '글로벌 뷰티', 'GLOBAL BEAUTY', '20–30대', '수출용 광고, 해외 타깃 콘텐츠'),
  M('f', 'foreign', '라이프스타일', 'LIFESTYLE', '20–40대', '리빙 · 가전 · 여행 광고'),
  M('f', 'senior', '시니어 광고', 'SENIOR AD', '50–70대', '금융 · 보험 · 건강식품 광고'),
  M('f', 'senior', '시니어 패션', 'SENIOR FASHION', '50–60대', '시니어 패션 · 뷰티 브랜드'),
  M('f', 'senior', '패밀리 · 부모 역할', 'FAMILY', '40–60대', '가족 콘셉트 광고, 공익 광고'),
  M('f', 'kids', '키즈 패션', 'KIDS FASHION', '4–12세', '아동복 룩북, 쇼핑몰'),
  M('f', 'kids', '완구 · 교육', 'KIDS AD', '4–12세', '완구, 교육 서비스, 식품 광고'),
  M('m', 'domestic', '패션 · 룩북', 'FASHION', '20–30대', '시즌 룩북, 브랜드 화보, 캠페인', 1),
  M('m', 'domestic', '광고 · CF', 'COMMERCIAL', '20–40대', 'TV · 디지털 광고, 기업 홍보 영상'),
  M('m', 'domestic', '피팅 · 쇼핑몰', 'FITTING', '20대', '쇼핑몰 정기 촬영, 라이브 커머스'),
  M('m', 'domestic', '피트니스 · 스포츠', 'FITNESS', '20–30대', '스포츠웨어, 헬스 · 보충제 브랜드'),
  M('m', 'domestic', '그루밍 · 뷰티', 'GROOMING', '20–30대', '남성 화장품, 헤어 · 향수 광고'),
  M('m', 'domestic', '비즈니스 · 수트', 'BUSINESS', '30–40대', '기업 · 금융 광고, 정장 브랜드', 1),
  M('m', 'foreign', '하이패션', 'HIGH FASHION', '20대', '에디토리얼, 글로벌 캠페인'),
  M('m', 'foreign', '라이프스타일', 'LIFESTYLE', '20–40대', '리빙 · 가전 · 자동차 광고'),
  M('m', 'foreign', '스포츠 · 아웃도어', 'OUTDOOR', '20–30대', '아웃도어 · 스포츠 브랜드', 1),
  M('m', 'senior', '시니어 광고', 'SENIOR AD', '50–70대', '금융 · 보험 · 건강식품 광고', 1),
  M('m', 'senior', '시니어 패션', 'SENIOR FASHION', '50–60대', '시니어 패션, 골프웨어'),
  M('m', 'senior', '패밀리 · 부모 역할', 'FAMILY', '40–60대', '가족 콘셉트 광고, 공익 광고'),
  M('m', 'kids', '키즈 패션', 'KIDS FASHION', '4–12세', '아동복 룩북, 쇼핑몰'),
  M('m', 'kids', '완구 · 교육', 'KIDS AD', '4–12세', '완구, 교육 서비스, 식품 광고'),
];

/* ------------------------------------------------------------
   인플루언서 라인업 (분야별)
   { name, en, p:'instagram'|'youtube'|'tiktok', scale, content, img }
   ------------------------------------------------------------ */
const I = (p, name, en, scale, content) => ({ p, name, en, scale, content, img: `images/i-${slug(en)}.jpg?v=2` });
const INFLUENCERS = [
  I('instagram', '패션 · 데일리룩', 'FASHION', '나노 – 매크로', '피드 · 릴스 · 스토리'),
  I('instagram', '뷰티 · 메이크업', 'BEAUTY', '나노 – 매크로', '리뷰 · 튜토리얼 릴스'),
  I('instagram', '맛집 · 카페', 'FOOD', '나노 – 마이크로', '방문 후기 · 릴스'),
  I('instagram', '육아 · 리빙', 'LIVING', '나노 – 마이크로', '사용 후기 · 공동구매'),
  I('instagram', '운동 · 헬스', 'FITNESS', '마이크로 – 매크로', '루틴 · 제품 착용 콘텐츠'),
  I('youtube', '뷰티 리뷰', 'REVIEW', '마이크로 – 매크로', '브랜디드 영상 · PPL'),
  I('youtube', '브이로그 · 일상', 'VLOG', '마이크로 – 매크로', 'PPL · 쇼츠'),
  I('youtube', '테크 · 가전', 'TECH', '마이크로 – 매크로', '언박싱 · 리뷰 영상'),
  I('tiktok', '댄스 · 챌린지', 'CHALLENGE', '마이크로 – 메가', '챌린지 · 숏폼 광고'),
  I('tiktok', '코미디 · 숏폼', 'SHORTFORM', '마이크로 – 메가', '브랜드 숏폼 · 바이럴'),
];

/* ------------------------------------------------------------
   프로젝트 유형
   실제 진행 사례가 생기면 title 에 프로젝트명, desc 에 '클라이언트 · 연도', img 에 사진을 넣으세요.
   { title, en, cat:'ad'|'sns'|'event'|'video', desc, img }
   ------------------------------------------------------------ */
const W = (cat, title, en, desc) => ({ cat, title, en, desc, img: `images/w-${slug(en)}.jpg?v=2` });
const WORKS = [
  W('ad', '브랜드 시즌 화보', 'EDITORIAL', '모델 캐스팅 · 스튜디오 촬영'),
  W('sns', '신제품 SNS 캠페인', 'CAMPAIGN', '인플루언서 매칭 · 콘텐츠 운영'),
  W('event', '팝업스토어 운영', 'POP-UP', '프로모터 · 안내 인력'),
  W('video', '브랜드 필름', 'FILM', '모델 캐스팅 · 영상 제작'),
  W('ad', '쇼핑몰 룩북', 'LOOKBOOK', '피팅 모델 · 정기 촬영'),
  W('sns', '체험단 · 시딩', 'SEEDING', '다수 인플루언서 동시 진행'),
  W('event', '전시 · 포럼 의전', 'PROTOCOL', '의전 · 리셉션 · MC'),
  W('video', '숏폼 광고', 'SHORTFORM', '릴스 · 쇼츠 · 틱톡 콘텐츠'),
  W('ad', 'TV · 디지털 CF', 'COMMERCIAL', '주조연 · 보조출연 섭외'),
];
