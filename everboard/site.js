const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.hidden = false;
  document.documentElement.classList.add('js');
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}

const tour = {
  stats: {
    file: 'stats-solo',
    alt: '개인 통계 화면. 에버리지, 하이런과 최근 경기 추이.',
    caption: '개인 통계 · 실제 앱 화면\n기간별 통계와 경기별 추이 확장은 인앱 구매 항목입니다.',
  },
  result: {
    file: 'result',
    alt: '경기 종료 화면. 득점, 이닝, 에버리지와 하이런, 이닝별 득점 격자.',
    caption: '경기 결과 · 실제 앱 화면\n득점과 이닝별 기록을 한눈에 확인하세요.',
  },
  share: {
    file: 'share-card',
    alt: '경기 기록을 공유하기 위한 실제 성적표 이미지.',
    caption: '기록 공유 · 실제 앱 화면\n경기 기록을 이미지로 만들어 함께 나눠보세요.',
  },
};
document.querySelectorAll('[data-tour]').forEach(button => {
  button.addEventListener('click', () => {
    const item = tour[button.dataset.tour];
    const image = document.querySelector('.tour-image');
    const caption = document.querySelector('#tour-caption');
    if (!item || !image || !caption) return;
    document.querySelectorAll('[data-tour]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    image.src = `assets/${item.file}.png`;
    image.alt = item.alt;
    caption.textContent = item.caption;
  });
});
