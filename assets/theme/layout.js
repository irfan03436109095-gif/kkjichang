/* 首页和列表正常整页滚动，锚点及侧栏按实际导航高度避让。 */
(() => {
  const page = document.body;
  const header = document.querySelector('.site-header');
  if (!page.classList.contains('route-page') || page.classList.contains('article-page') || !header) return;
  let previousHeight = -1;
  const updateHeaderHeight = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height === previousHeight) return;
    previousHeight = height;
    page.style.setProperty('--route-header-height', `${height}px`);
  };
  updateHeaderHeight();
  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(updateHeaderHeight).observe(header);
  } else {
    window.addEventListener('resize', updateHeaderHeight, { passive: true });
  }
  window.addEventListener('pageshow', updateHeaderHeight);
})();
