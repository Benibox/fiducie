document.addEventListener('DOMContentLoaded', () => {
  const footerCopy = document.querySelector('.footer-copy span');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (footerCopy) {
    footerCopy.textContent = footerCopy.textContent.replace('{year}', new Date().getFullYear());
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      navToggle.classList.toggle('nav-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href')?.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });
});
