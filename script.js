/* ============================================
   Tekzo IT Solutions - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initTypingEffect();
  initParticles();
  initCounters();
  initTestimonialSlider();
  initPortfolioFilter();
  initLightbox();
  initBackToTop();
  initContactForm();
  initNewsletter();
  initAOS();
});

/* Loading Screen */
function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1500);
  });
}

/* Navigation */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* Typing Effect */
function initTypingEffect() {
  const typingEl = document.querySelector('.typing-text');
  if (!typingEl) return;

  const words = ['Digital Solutions', 'Web Experiences', 'Brand Identity', 'Social Presence'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = words[wordIndex];
    let display = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    typingEl.textContent = display;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length + 1) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

/* Floating Particles */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 60 + 20;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    container.appendChild(particle);
  }
}

/* Animated Counters */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

/* Testimonial Slider */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentIndex = 0;
  let autoPlay;

  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  autoPlay = setInterval(nextSlide, 5000);

  track.closest('.testimonial-slider')?.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.closest('.testimonial-slider')?.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
  });
}

/* Portfolio Filter */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* Lightbox Gallery */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  const items = document.querySelectorAll('.portfolio-item');
  const lightboxImg = lightbox.querySelector('img');
  const lightboxTitle = lightbox.querySelector('.lightbox-info h3');
  const lightboxDesc = lightbox.querySelector('.lightbox-info p');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(items).filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = item.getAttribute('data-title') || '';
    lightboxDesc.textContent = item.getAttribute('data-desc') || '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      visibleItems = getVisibleItems();
      const visibleIndex = visibleItems.indexOf(item);
      openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightbox();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % visibleItems.length;
      updateLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* Back to Top */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Contact Form (FormSubmit or EmailJS) */
function getContactConfig() {
  const defaults = {
    method: 'formsubmit',
    recipientEmail: 'info@tekzoitsolutions.com',
    emailjs: { publicKey: '', serviceId: '', templateId: '' }
  };
  return { ...defaults, ...(window.TEKZO_CONTACT || {}) };
}

function isEmailJsConfigured(config) {
  const { publicKey, serviceId, templateId } = config.emailjs || {};
  const placeholders = ['YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', ''];
  return (
    publicKey && serviceId && templateId &&
    !placeholders.includes(publicKey) &&
    !placeholders.includes(serviceId) &&
    !placeholders.includes(templateId)
  );
}

function showFormMessage(successMsg, errorMsg, type, text) {
  if (type === 'success') {
    if (successMsg) {
      successMsg.textContent = text;
      successMsg.classList.add('show');
    }
    errorMsg?.classList.remove('show');
  } else {
    if (errorMsg) {
      errorMsg.textContent = text;
      errorMsg.classList.add('show');
    }
    successMsg?.classList.remove('show');
  }
}

function sendViaFormSubmit(form, config) {
  const data = new FormData(form);
  const payload = {
    name: data.get('from_name'),
    email: data.get('from_email'),
    phone: data.get('phone'),
    service: data.get('service'),
    message: data.get('message'),
    _subject: `Tekzo Contact: ${data.get('service') || 'New Inquiry'}`,
    _template: 'table',
    _captcha: 'false'
  };

  const email = (config.recipientEmail || '').trim();
  if (!email || !email.includes('@')) {
    return Promise.reject(new Error('Set recipientEmail in assets/contact-config.js'));
  }

  return fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async (res) => {
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(body.message || 'FormSubmit request failed');
    }
    return body;
  });
}

function sendViaEmailJS(form, config) {
  if (typeof emailjs === 'undefined') {
    return Promise.reject(new Error('EmailJS library failed to load'));
  }

  const { publicKey, serviceId, templateId } = config.emailjs;
  emailjs.init({ publicKey });

  return emailjs.sendForm(serviceId, templateId, form, { publicKey });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.querySelector('.form-success');
  const errorMsg = document.querySelector('.form-error');
  const config = getContactConfig();

  const useEmailJs =
    config.method === 'emailjs' && isEmailJsConfigured(config);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (window.location.protocol === 'file:' && !useEmailJs) {
      showFormMessage(
        successMsg,
        errorMsg,
        'error',
        'Open this site through a local server (e.g. Live Server or "npx serve ."), not as a file on disk. FormSubmit does not work with file:// URLs.'
      );
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const sendPromise = useEmailJs
      ? sendViaEmailJS(form, config)
      : sendViaFormSubmit(form, config);

    sendPromise
      .then(() => {
        showFormMessage(
          successMsg,
          errorMsg,
          'success',
          'Thank You! Your Message Has Been Successfully Sent.'
        );
        form.reset();
        setTimeout(() => successMsg?.classList.remove('show'), 8000);
      })
      .catch((err) => {
        console.error('Contact form error:', err);
        let message = 'Something went wrong. Please try again or email us directly.';

        if (!useEmailJs && config.method === 'emailjs') {
          message =
            'EmailJS is not configured. Open assets/contact-config.js and add your keys, or set method to "formsubmit".';
        } else if (err?.text) {
          message = `Could not send: ${err.text}`;
        } else if (err?.message) {
          message = err.message;
        }

        showFormMessage(successMsg, errorMsg, 'error', message);
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

/* Newsletter */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        alert('Thank you for subscribing to our newsletter!');
        input.value = '';
      }
    });
  });
}

/* AOS Initialization */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 80
    });
  }
}

/* Fade In Animation for Portfolio */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
