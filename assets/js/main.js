// ====================================
// TIKOMED - Main JavaScript
// ====================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      const icon = this.querySelector('i') || this;
      icon.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close mobile menu if open
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
          }
        }
      }
    });
  });
  
  // Scroll to Top Button
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Form Validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      if (!name || !phone) {
        alert('Пожалуйста, заполните обязательные поля: Имя и Телефон');
        return;
      }
      
      // Phone validation (basic)
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
      }
      
      // Success message (in real implementation, this would send data to server)
      alert('Спасибо за вашу заявку! Наш администратор свяжется с вами в ближайшее время.');
      contactForm.reset();
    });
  }
  
  // Animate on Scroll (Simple Implementation)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Apply animation to cards
  const animatedElements = document.querySelectorAll('.feature-card, .team-member, .testimonial-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Active Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
});

// Auto-scroll to top on page load/change (SPA-like behavior)
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
