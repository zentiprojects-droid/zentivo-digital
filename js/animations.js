/**
 * ============================================================================
 * ZENTIVO DIGITAL — Animations & Interactive Experience Engine
 * ============================================================================
 */

(function () {
  "use strict";

  // Check if reduced motion is requested by user
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------------------
     1. Scroll Reveal Intersection Observer
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
      return;
    }

    const revealElements = document.querySelectorAll(".reveal:not(.active)");
    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // Export so dynamically rendered project cards can be observed
  window.observeRevealElements = initScrollReveal;

  /* --------------------------------------------------------------------------
     2. Interactive Hero Canvas Network (Floating Connected Particles)
     -------------------------------------------------------------------------- */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 32 : 65;
    const maxDistance = window.innerWidth < 768 ? 100 : 140;

    let mouse = {
      x: null,
      y: null,
      radius: 150
    };

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse push / interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            this.x -= dirX * force * 2;
            this.y -= dirY * force * 2;
            this.radius = this.baseRadius * 1.5;
          } else {
            this.radius = this.baseRadius;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.75)";
        ctx.shadowColor = "rgba(0, 255, 136, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Spawn particles
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  /* --------------------------------------------------------------------------
     3. Ambient Desktop Cursor Spotlight
     -------------------------------------------------------------------------- */
  function initCursorSpotlight() {
    if (prefersReducedMotion || window.innerWidth < 992) return;

    const spotlight = document.querySelector(".cursor-spotlight");
    if (!spotlight) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function renderSpotlight() {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(renderSpotlight);
    }

    requestAnimationFrame(renderSpotlight);
  }

  /* --------------------------------------------------------------------------
     4. Scroll Progress Indicator & Header Sticky Blur
     -------------------------------------------------------------------------- */
  function initScrollEffects() {
    const progressBar = document.querySelector(".scroll-progress-bar");
    const header = document.querySelector(".site-header");
    const backToTopBtn = document.querySelector(".back-to-top-btn");

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Update progress bar
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }

      // Header scrolled state
      if (header) {
        if (scrollTop > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      // Back to top button visibility
      if (backToTopBtn) {
        if (scrollTop > 400) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Initialize on DOM Ready
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initHeroCanvas();
    initCursorSpotlight();
    initScrollEffects();
  });
})();

