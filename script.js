const menu = document.querySelector(".menu");
const links = document.querySelector(".links");
if (menu) menu.addEventListener("click", () => links.classList.toggle("open"));
document.querySelectorAll(".links a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();


/* Premium scroll-reveal observer */
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll(
    '.section-label, .section-head, .service-card, .project-card, .industry-card, .testimonial-card, .faq-item, .contact-card'
  );

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal-up');
    el.style.transitionDelay = `${Math.min((index % 5) * 70, 280)}ms`;
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
});


/* Subtle cursor glow for desktop — disabled on touch devices. */
if (window.matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.hero-mouse-glow');
  if (glow) {
    window.addEventListener('pointermove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, {passive:true});
  }
}

/* Slow, refined custom cursor */
if (window.matchMedia('(pointer:fine)').matches) {
  const cursorDot = document.querySelector('.premium-cursor-dot');
  const cursorRing = document.querySelector('.premium-cursor-ring');

  if (cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      document.body.classList.add('cursor-active');
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('pointermove', moveCursor, {passive:true});
    window.addEventListener('pointerleave', () => document.body.classList.remove('cursor-active'));
    animateRing();

    document.querySelectorAll('a,button,input,select,textarea,summary,.service-card,.project-card,.industry-card').forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
}
