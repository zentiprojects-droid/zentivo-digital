/**
 * ============================================================================
 * ZENTIVO DIGITAL — Main Core Logic & Interactivity
 * ============================================================================
 * Features:
 * - Mobile Menu Navigation Drawer & Backdrop
 * - Active Page & Section Link Highlighting
 * - Services "Learn More" Detail Modals
 * - Client-Side Contact Form Validation
 * - Direct EmailJS Live Transmission (service_d4woj7o / template_6treqtl)
 * - Direct WhatsApp & Email Routing
 * - URL Query Parameter Service Preselection
 * ============================================================================
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. Mobile Navigation Drawer Controller
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileDrawer = document.getElementById("mobileNavDrawer");
    const mobileBackdrop = document.getElementById("mobileBackdrop");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!hamburgerBtn || !mobileDrawer) return;

    function openMenu() {
      hamburgerBtn.classList.add("active");
      hamburgerBtn.setAttribute("aria-expanded", "true");
      mobileDrawer.classList.add("active");
      if (mobileBackdrop) mobileBackdrop.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      mobileDrawer.classList.remove("active");
      if (mobileBackdrop) mobileBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }

    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("active");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", closeMenu);
    }

    mobileLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Active Link Highlighting
     -------------------------------------------------------------------------- */
  function initActiveNavLinks() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      const targetPage = href.split("#")[0].split("/").pop();

      if (targetPage === currentPath || (currentPath === "" && targetPage === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Service Detail Data & Modal System
     -------------------------------------------------------------------------- */
  const servicesData = {
    "web-development": {
      title: "Website Development",
      category: "Full-Stack Frontend & Web Engineering",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      description: "We build clean, robust, and lightning-fast websites engineered with semantic HTML5, modern CSS3, and high-performance Vanilla JavaScript.",
      deliverables: [
        "Standards-compliant semantic HTML5 architecture",
        "Modern CSS3 layout systems (Flexbox & CSS Grid)",
        "Zero-bloat Vanilla JavaScript for sub-second load times",
        "API integration & dynamic data rendering",
        "Cross-browser testing (Chrome, Safari, Firefox, Edge)",
        "Search-engine friendly structure with fast Core Web Vitals"
      ],
      idealFor: "Startups, local companies, and enterprises needing dependable web applications without heavy framework overhead."
    },
    "web-design": {
      title: "Website Design",
      category: "Bespoke Creative & UI/UX Design",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
      description: "Transform your digital footprint into an unforgettable visual experience. We craft modern dark-themed aesthetics, balanced spacing, and intuitive user journeys.",
      deliverables: [
        "Brand-aligned color palettes & typographic hierarchy",
        "Figma prototypes and interactive design concepts",
        "Intuitive user journeys & frictionless wireframing",
        "Subtle micro-interactions & tactile button feedback",
        "Accessible contrast ratios (WCAG compliance)",
        "Visual storytelling tailored to modern audiences"
      ],
      idealFor: "Ambitious businesses looking to outshine competitors with high-end international digital design aesthetics."
    },
    "responsive-design": {
      title: "Responsive Web Design",
      category: "Mobile-First Cross-Platform Engineering",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
      description: "Flawless performance across every screen size. From compact smartphones to ultra-wide 4K monitors, your site will adapt with fluid grace.",
      deliverables: [
        "Adaptive viewport scaling with CSS clamp() and fluid typography",
        "Touch-friendly navigation drawers and thumb-zone interactions",
        "Responsive images with modern formats (WebP, SVG)",
        "Zero layout shifts (CLS) on device orientation change",
        "Optimized mobile bandwidth consumption",
        "Consistent brand presentation across Android and iOS"
      ],
      idealFor: "Businesses whose customers browse primarily on mobile devices and demand an effortless touch experience."
    },
    "digital-marketing": {
      title: "Digital Marketing",
      category: "Strategic Growth & Lead Acquisition",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 6l-9.5 9.5-5-5L1 18"></path><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      description: "Drive qualified traffic, capture high-intent prospective buyers, and convert online visitors into loyal clients through strategic digital outreach.",
      deliverables: [
        "Targeted local search optimization (Google Business Profile)",
        "High-conversion landing page integration",
        "Direct-to-chat inquiry funnels (WhatsApp & Web forms)",
        "Technical SEO auditing and on-page optimization",
        "Clear value proposition messaging that builds buyer trust",
        "Analytics-ready conversion event tracking"
      ],
      idealFor: "Entrepreneurs and small business owners seeking sustainable client inquiries rather than vanity metrics."
    },
    "business-solutions": {
      title: "Business Website Solutions",
      category: "Turnkey Digital Identity for Companies",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      description: "An end-to-end web presence package tailored for local businesses and emerging enterprises. Everything you need to win customer trust online.",
      deliverables: [
        "Complete multi-page corporate architecture",
        "Founder attribution, team profile & company credentials",
        "Interactive quotation & service scope calculator",
        "Google Maps, office hours & instant contact widgets",
        "SSL security readiness & domain DNS consultation",
        "Ongoing post-launch technical guidance and maintenance"
      ],
      idealFor: "Established local service providers, consultants, and companies modernizing their digital presence."
    },
    "landing-pages": {
      title: "Landing Page Development",
      category: "High-Impact Conversion Machines",
      iconSvg: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      description: "Laser-focused single-page destinations tailored to a specific product launch, promotional campaign, or service inquiry funnel.",
      deliverables: [
        "Compelling hero section with crystal-clear call-to-action",
        "Distraction-free layout engineered for maximum conversions",
        "Client-side validation for instant inquiry submission",
        "Fast sub-second loading for reduced paid-traffic bounce",
        "Social proof cards & interactive benefit showcases",
        "A/B test ready semantic code architecture"
      ],
      idealFor: "Marketing campaigns, product announcements, and startups testing market demand quickly."
    }
  };

  function initServiceModals() {
    const modal = document.getElementById("serviceModal");
    if (!modal) return;

    window.openServiceModal = function (serviceKey) {
      const data = servicesData[serviceKey];
      if (!data) return;

      const deliverablesHtml = data.deliverables.map(item => `
        <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; font-size: 0.95rem; color: var(--text-secondary);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-lime)" stroke-width="2.5" style="flex-shrink: 0; margin-top: 3px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${escapeHtml(item)}</span>
        </li>
      `).join("");

      modal.innerHTML = `
        <div class="service-modal-content" role="dialog" aria-modal="true" aria-labelledby="serviceModalTitle">
          <button type="button" class="modal-close-btn" onclick="closeServiceModal()" aria-label="Close Service Modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
            <div class="service-icon-box" style="margin-bottom: 0;">
              ${data.iconSvg}
            </div>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-lime); text-transform: uppercase;">${escapeHtml(data.category)}</span>
              <h3 id="serviceModalTitle" style="font-size: 1.6rem; color: var(--text-primary);">${escapeHtml(data.title)}</h3>
            </div>
          </div>

          <p style="font-size: 1.05rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 24px;">
            ${escapeHtml(data.description)}
          </p>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
            <h4 style="font-size: 1.1rem; color: var(--accent-lime); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              What is included in this service:
            </h4>
            <ul style="list-style: none;">
              ${deliverablesHtml}
            </ul>
          </div>

          <div style="background: rgba(0, 255, 136, 0.05); border-left: 3px solid var(--accent-lime); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 14px 18px; margin-bottom: 28px;">
            <strong style="display: block; font-size: 0.88rem; color: var(--text-primary); margin-bottom: 2px;">Ideal for:</strong>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0;">${escapeHtml(data.idealFor)}</p>
          </div>

          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="contact.html?service=${encodeURIComponent(data.title)}" class="btn btn-primary" style="flex: 1;">
              <span>Inquire About ${escapeHtml(data.title)}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <button type="button" class="btn btn-secondary" onclick="closeServiceModal()">
              <span>Close</span>
            </button>
          </div>
        </div>
      `;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    window.closeServiceModal = function () {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        window.closeServiceModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        window.closeServiceModal();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Contact Form Validation & EmailJS Delivery Engine
     -------------------------------------------------------------------------- */
  const EMAILJS_CONFIG = {
    serviceID: "service_d4woj7o",
    templateID: "template_6treqtl",
    publicKey: "0HtFBxJ7r_vnEWUhc"
  };

  // Initialize EmailJS SDK when script is loaded
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
      });
    } catch (err) {
      console.warn("EmailJS init note:", err);
    }
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedbackModal = document.getElementById("formFeedbackModal");
    const submitBtn = document.getElementById("submitInquiryBtn");
    if (!form) return;

    // Preselect service dropdown if present in URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    if (serviceParam) {
      const serviceSelect = document.getElementById("serviceRequired");
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(serviceParam.toLowerCase()) ||
              serviceSelect.options[i].value.toLowerCase().includes(serviceParam.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    const fields = {
      fullName: {
        el: document.getElementById("fullName"),
        errorEl: document.getElementById("fullNameError"),
        validate: (val) => val.trim().length >= 2,
        errorMsg: "Please enter your full name (at least 2 characters)."
      },
      emailAddress: {
        el: document.getElementById("emailAddress"),
        errorEl: document.getElementById("emailError"),
        validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
        errorMsg: "Please enter a valid email address (e.g., name@domain.com)."
      },
      phoneNumber: {
        el: document.getElementById("phoneNumber"),
        errorEl: document.getElementById("phoneError"),
        validate: (val) => /^[\d\s\+\-\(\)]{7,20}$/.test(val.trim()),
        errorMsg: "Please enter a valid phone number (at least 7 digits)."
      },
      businessName: {
        el: document.getElementById("businessName"),
        errorEl: null,
        validate: () => true,
        errorMsg: ""
      },
      serviceRequired: {
        el: document.getElementById("serviceRequired"),
        errorEl: document.getElementById("serviceError"),
        validate: (val) => val !== "" && val !== "Select a service...",
        errorMsg: "Please select a service from the list."
      },
      projectDetails: {
        el: document.getElementById("projectDetails"),
        errorEl: document.getElementById("detailsError"),
        validate: (val) => val.trim().length >= 10,
        errorMsg: "Please provide a brief description of your project (min 10 characters)."
      }
    };

    // Live validation on blur & input
    Object.keys(fields).forEach(key => {
      const item = fields[key];
      if (!item || !item.el) return;

      item.el.addEventListener("blur", () => {
        validateField(key);
      });

      item.el.addEventListener("input", () => {
        if (item.el.classList.contains("error")) {
          validateField(key);
        }
      });
    });

    function validateField(key) {
      const item = fields[key];
      if (!item || !item.el) return true;

      const isValid = item.validate(item.el.value);
      if (!isValid) {
        item.el.classList.add("error");
        item.el.classList.remove("valid");
        if (item.errorEl) {
          item.errorEl.textContent = item.errorMsg;
          item.errorEl.classList.add("visible");
        }
        return false;
      } else {
        item.el.classList.remove("error");
        item.el.classList.add("valid");
        if (item.errorEl) {
          item.errorEl.classList.remove("visible");
        }
        return true;
      }
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let formIsValid = true;
      Object.keys(fields).forEach(key => {
        const fieldValid = validateField(key);
        if (!fieldValid && formIsValid) {
          formIsValid = false;
          fields[key].el.focus();
        }
      });

      if (!formIsValid) {
        return;
      }

      // Collect form values
      const formData = {
        name: fields.fullName.el.value.trim(),
        email: fields.emailAddress.el.value.trim(),
        phone: fields.phoneNumber.el.value.trim(),
        business: fields.businessName.el ? fields.businessName.el.value.trim() : "Not Specified",
        service: fields.serviceRequired.el.value,
        details: fields.projectDetails.el.value.trim()
      };

      // Button loading indicator
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "Send Inquiry";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(0,0,0,0.25); border-top-color: #000; border-radius: 50%; animation: spinSlow 0.8s linear infinite;"></span>
          <span>Transmitting Inquiry...</span>
        `;
      }

      // Fallback links
      const waText = encodeURIComponent(
        `Hello Zentivo Digital! My name is ${formData.name}.\n\n` +
        `• Business: ${formData.business || "N/A"}\n` +
        `• Service: ${formData.service}\n` +
        `• Phone: ${formData.phone}\n` +
        `• Email: ${formData.email}\n\n` +
        `Project Details:\n${formData.details}`
      );
      const waLink = `https://wa.me/9196556 04042?text=${waText}`;

      const mailtoSubject = encodeURIComponent(`Project Inquiry: ${formData.service} - ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `Client Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Business Name: ${formData.business || "N/A"}\n` +
        `Service Requested: ${formData.service}\n\n` +
        `Project Scope & Details:\n${formData.details}\n`
      );
      const mailtoLink = `mailto:zentiprojects@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // EmailJS parameter payload (mapped to common template variables)
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        business_name: formData.business,
        service_required: formData.service,
        message: formData.details,
        reply_to: formData.email,
        to_email: "zentiprojects@gmail.com",
        // Common aliases
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business: formData.business,
        service: formData.service,
        details: formData.details
      };

      let emailDelivered = false;

      // Send via EmailJS
      if (typeof emailjs !== "undefined") {
        try {
          await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams, EMAILJS_CONFIG.publicKey);
          emailDelivered = true;
        } catch (err) {
          console.error("EmailJS transmission error:", err);
        }
      }

      // Restore submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      // Display Confirmation Modal
      if (feedbackModal) {
        if (emailDelivered) {
          feedbackModal.innerHTML = `
            <div class="form-feedback-dialog" role="dialog" aria-modal="true">
              <div class="feedback-icon-box" style="background: rgba(0, 255, 136, 0.18); border-color: var(--accent-lime); color: var(--accent-lime);">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style="color: #ffffff;">Inquiry Sent Successfully!</h3>
              <p>
                Thank you, <strong style="color: var(--text-primary);">${escapeHtml(formData.name)}</strong>. 
                Your project inquiry for <strong class="text-lime">${escapeHtml(formData.service)}</strong> has been delivered directly to our inbox (<strong style="color: var(--text-primary);">zentiprojects@gmail.com</strong>).
              </p>
              <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 24px;">
                Founder <strong style="color: var(--text-primary);">VIMALKUMAR M</strong> will review your requirements and respond within 24 hours.
              </p>

              <div class="feedback-next-actions">
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>Need Immediate Answer? Chat on WhatsApp</span>
                </a>

                <button type="button" class="btn btn-secondary" onclick="closeFeedbackModal()" style="width: 100%;">
                  <span>Close</span>
                </button>
              </div>
            </div>
          `;
          form.reset();
          Object.keys(fields).forEach(key => {
            if (fields[key].el) fields[key].el.classList.remove("valid");
          });
        } else {
          // Fallback if adblocker or network interrupted EmailJS
          feedbackModal.innerHTML = `
            <div class="form-feedback-dialog" role="dialog" aria-modal="true">
              <div class="feedback-icon-box" style="background: rgba(0, 255, 136, 0.15); border-color: var(--accent-lime); color: var(--accent-lime);">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 style="color: #ffffff;">Inquiry Verified &amp; Ready</h3>
              <p>
                Inquiry details prepared for <strong style="color: var(--text-primary);">${escapeHtml(formData.name)}</strong>. 
                Click below to deliver immediately:
              </p>

              <div class="feedback-next-actions">
                <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>Send via WhatsApp (+91 96556 04042)</span>
                </a>

                <a href="${mailtoLink}" class="btn btn-secondary" style="width: 100%;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span>Send via Email Client (zentiprojects@gmail.com)</span>
                </a>

                <button type="button" class="btn btn-secondary" onclick="closeFeedbackModal()" style="width: 100%; border: none;">
                  <span>Dismiss</span>
                </button>
              </div>
            </div>
          `;
        }

        feedbackModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });

    window.closeFeedbackModal = function () {
      if (feedbackModal) {
        feedbackModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    if (feedbackModal) {
      feedbackModal.addEventListener("click", (e) => {
        if (e.target === feedbackModal) {
          window.closeFeedbackModal();
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     5. Helper: Escape HTML
     -------------------------------------------------------------------------- */
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* --------------------------------------------------------------------------
     6. DOM Ready Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initActiveNavLinks();
    initServiceModals();
    initContactForm();
  });
})();
