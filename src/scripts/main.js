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

  // Service expandable cards
  document.querySelectorAll('.service-expand-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const article = btn.closest('.service-item-expandable');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Toggle expanded state
      btn.setAttribute('aria-expanded', String(!isExpanded));
      article.classList.toggle('expanded');

      // Update button text
      const expandText = btn.querySelector('.expand-text');
      if (expandText) {
        expandText.textContent = isExpanded ? 'Voir les détails' : 'Masquer les détails';
      }
    });
  });

  // Tabs functionality (Service 02)
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      const tabsContainer = btn.closest('.tabs-container');

      // Remove active class from all buttons and panels
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabsContainer.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.remove('active');
      });

      // Add active class to clicked button and corresponding panel
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = tabsContainer.querySelector(`[data-panel="${tabName}"]`);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });
});
