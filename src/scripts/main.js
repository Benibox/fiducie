import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  initEmailJS();
  const footerCopy = document.querySelector('.footer-copy span');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const header = document.querySelector('.site-header');

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

  // Hide/Show header on scroll
  if (header) {
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          if (currentScroll <= 0) {
            // At the top of the page
            header.classList.remove('header-hidden');
          } else if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past 100px
            header.classList.add('header-hidden');
          } else if (currentScroll < lastScroll) {
            // Scrolling up
            header.classList.remove('header-hidden');
          }

          lastScroll = currentScroll;
          ticking = false;
        });

        ticking = true;
      }
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

  // Contact form handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const formNote = contactForm.querySelector('.form-note');
      const originalButtonText = submitButton.textContent;

      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';

      // Remove any existing messages
      const existingMessages = contactForm.querySelectorAll('.form-message');
      existingMessages.forEach(msg => msg.remove());

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

        if (!serviceId || !templateId) {
          throw new Error('EmailJS configuration is missing. Please check your .env file.');
        }

        // Send email using EmailJS
        await emailjs.sendForm(serviceId, templateId, contactForm);

        // Show success message
        const successMessage = document.createElement('p');
        successMessage.className = 'form-message form-success';
        successMessage.textContent = 'Message envoyé avec succès! Nous vous répondrons rapidement.';
        formNote.insertAdjacentElement('beforebegin', successMessage);

        // Reset form
        contactForm.reset();

      } catch (error) {
        console.error('Error sending email:', error);

        // Show error message
        const errorMessage = document.createElement('p');
        errorMessage.className = 'form-message form-error';
        errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.';
        formNote.insertAdjacentElement('beforebegin', errorMessage);
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }
});
