/**
 * ============================================================================
 * ZENTIVO DIGITAL — Official Projects Portfolio Data & Dynamic Engine
 * ============================================================================
 * 
 * HOW TO ADD / REPLACE / DELETE YOUR OWN PROJECT IMAGES:
 * 1. Place your image files into `assets/images/` (e.g. `borewells-thumb.png`, `hospital-thumb.png`).
 * 2. In this file (`js/projects.js`), set the `image` field or `screenshots` array
 *    to match your filename (e.g. `image: "assets/images/borewells-thumb.png"`).
 * 3. If an image file is not present yet or is deleted, a sleek branded placeholder
 *    is automatically shown so your website never has broken image icons!
 * ============================================================================
 */

const projectsData = [
  {
    id: "proj-borewells",
    name: "SRI VELLINGIRI NATHAN BOREWELLS",
    category: "Web Development",
    displayCategory: "Business Website / Borewell Services",
    badgeLabel: "Featured Client Project",
    image: "assets/images/this porfoilo sreenshor1.png",
    shortDescription: "A comprehensive, high-conversion commercial website built for borewell and drilling services. Features responsive service inquiries, service listings, machinery showcases, and direct customer contact funnels.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Vercel"],
    liveUrl: "https://sri-vellingiri.vercel.app/",
    githubUrl: "https://github.com/VK-vimal123/Borewell-Frontend.git",
    caseStudy: {
      categoryDisplay: "Business Website / Borewell Services",
      overview: "SRI VELLINGIRI NATHAN BOREWELLS is an end-to-end commercial website engineered to establish strong local credibility, showcase heavy machinery capabilities, and capture customer drilling inquiries efficiently.",
      challenge: "Industrial service businesses often struggle with outdated web presence that fails to demonstrate operational scale, modern equipment, and quick mobile contact options for clients in urgent need of water drilling.",
      solution: "Engineered a high-impact responsive frontend interface highlighting core borewell services, customer testimonials, technical machinery specifications, and single-tap WhatsApp / telephone calling.",
      designApproach: "High-contrast visual hierarchy, clear service breakdown cards, bold typography, and immediate call-to-action touchpoints optimized for mobile smartphone users.",
      deliverables: [
        "Fully Responsive Cross-Platform Web Layout",
        "Direct One-Tap Phone & WhatsApp Call-to-Actions",
        "Comprehensive Services & Machinery Showcase",
        "Fast Page Speed Deployed on Vercel Edge Network"
      ],
      screenshots: [
        { title: "Homepage Hero & Service Introduction", path: "assets/images/this porfoilo sreenshor1.png" },
        { title: "Borewell Services & Equipment Fleet", path: "assets/images/borewells-screen-2.png" },
        { title: "Contact & Direct Inquiry Section", path: "assets/images/borewells-screen-3.png" }
      ]
    }
  },
  {
    id: "proj-hospital",
    name: "HOSPITAL CENTRALIZATION SYSTEM",
    category: "Web Development",
    displayCategory: "Healthcare Web Application",
    badgeLabel: "Featured Healthcare Application",
    image: "assets/images/sentralization.png",
    shortDescription: "A centralized healthcare management dashboard built for hospital staff, medical administration, patient record coordination, and real-time clinical workflow tracking.",
    technologies: ["Web Application", "JavaScript", "Healthcare UI/UX", "Responsive Dashboard", "Vercel"],
    liveUrl: "https://hospital-centralization.vercel.app/staff/dashboard",
    // GitHub repository is not provided yet — strictly omitted as instructed
    githubUrl: null,
    caseStudy: {
      categoryDisplay: "Healthcare Web Application • Staff Dashboard",
      overview: "A streamlined, secure medical administration system designed to centralize hospital departments, doctor scheduling, patient admissions, and staff operational activity into one unified digital portal.",
      challenge: "Healthcare institutions often face fragmented coordination between departments, causing administrative bottlenecks, delayed record lookups, and cumbersome desktop-only software interfaces.",
      solution: "Developed an intuitive, responsive staff dashboard interface that simplifies medical operations, displays real-time patient queue metrics, and maintains high readability under fast-paced clinical environments.",
      designApproach: "Clean healthcare-grade UI design with structured card layouts, accessible contrast, distraction-free navigation, and instant data overview panels.",
      deliverables: [
        "Centralized Staff Operations Dashboard",
        "Patient Queue & Department Activity Metrics",
        "Responsive Clinical Web Interface",
        "Streamlined Navigation for Medical Administrators"
      ],
      // Screenshot Gallery
      screenshots: [
        { title: "Staff Centralized Overview Dashboard", path: "assets/images/sentralization.png" },
        { title: "Department & Patient Management", path: "assets/images/hospital-screen-2.png" },
        { title: "Operational Clinical Analytics", path: "assets/images/hospital-screen-3.png" }
      ]
    }
  }
];

/**
 * Renders project cards into the designated container
 * @param {string} filterCategory - "All" or a specific category name
 * @param {string} containerSelector - CSS selector of target container
 */
function renderProjects(filterCategory = "All", containerSelector = "#projectsGrid") {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const filtered = filterCategory === "All"
    ? projectsData
    : projectsData.filter(p => 
        p.category.toLowerCase() === filterCategory.toLowerCase() ||
        (p.displayCategory && p.displayCategory.toLowerCase().includes(filterCategory.toLowerCase()))
      );

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 12px;">No projects found in this category.</p>
        <button class="btn btn-secondary btn-sm" onclick="renderProjects('All')">View All Projects</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((proj, index) => {
    const techTagsHtml = proj.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("");
    
    // GitHub button only where provided
    const githubBtnHtml = proj.githubUrl ? `
      <a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-github btn-sm" aria-label="View source code on GitHub" title="View Source on GitHub">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        <span>GitHub</span>
      </a>
    ` : '';

    return `
      <article class="project-card reveal reveal-up stagger-${(index % 4) + 1}" data-category="${escapeHtml(proj.category)}" data-id="${proj.id}">
        <!-- Project Thumbnail with Built-in Placeholder Support -->
        <div class="project-thumb-box" style="position: relative;">
          <div class="project-thumb-placeholder" style="position: absolute; inset: 0; background: linear-gradient(135deg, #101726 0%, #07090e 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(0, 255, 136, 0.08); border: 1px solid rgba(0, 255, 136, 0.28); display: flex; align-items: center; justify-content: center; color: var(--accent-lime); margin-bottom: 12px;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: #ffffff; line-height: 1.3;">${escapeHtml(proj.name)}</span>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-lime); margin-top: 6px; text-transform: uppercase;">${escapeHtml(proj.displayCategory || proj.category)}</span>
            <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dark); margin-top: 8px;">[Image Placeholder &bull; Upload via assets/images]</span>
          </div>

          <!-- Project image loads smoothly on top when provided -->
          ${proj.image ? `<img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.name)} thumbnail" class="project-thumb-img" loading="lazy" onerror="this.style.display='none';" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1;">` : ''}

          <span class="project-category-badge" style="z-index: 2;">${escapeHtml(proj.displayCategory || proj.category)}</span>
          <span class="project-sample-indicator" style="z-index: 2; border-color: rgba(0, 255, 136, 0.4); color: var(--accent-lime);">${escapeHtml(proj.badgeLabel || 'Project')}</span>
        </div>

        <div class="project-body">
          <div class="project-body-top">
            <h3 class="project-title">${escapeHtml(proj.name)}</h3>
            <p class="project-desc">${escapeHtml(proj.shortDescription)}</p>
            <div class="project-tech-tags">
              ${techTagsHtml}
            </div>
          </div>
          <div class="project-actions" style="flex-wrap: wrap; gap: 8px;">
            <button type="button" class="btn btn-primary btn-sm project-btn-case" onclick="openCaseStudyModal('${proj.id}')">
              <span>View Details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm project-btn-live" aria-label="Visit live demo for ${escapeHtml(proj.name)}">
              <span>Live Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            ${githubBtnHtml}
          </div>
        </div>
      </article>
    `;
  }).join("");

  if (window.observeRevealElements) {
    window.observeRevealElements();
  }
}

/**
 * Initializes portfolio filter buttons
 */
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter") || "All";
      renderProjects(category);
    });
  });
}

/**
 * Opens the interactive Case Study modal with full details, screenshot gallery & links
 * @param {string} projectId 
 */
function openCaseStudyModal(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("caseStudyModal");
  if (!modal) return;

  const cs = proj.caseStudy;
  const deliverablesHtml = (cs.deliverables || []).map(item => `
    <li>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHtml(item)}</span>
    </li>
  `).join("");

  const techStackHtml = proj.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("");

  // Screenshot Gallery with Placeholders
  const galleryHtml = (cs.screenshots || []).map((shot, idx) => `
    <div class="gallery-item-box">
      <!-- Screenshot Image (loads when file is provided) -->
      <img src="${escapeHtml(shot.path)}" alt="${escapeHtml(shot.title)}" class="gallery-item-img" onerror="this.style.display='none';">
      <div class="gallery-placeholder-content">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        <div class="gallery-placeholder-title">${escapeHtml(shot.title)}</div>
        <div class="gallery-placeholder-hint">Placeholder Slot #${idx + 1} &bull; ${escapeHtml(shot.path)}</div>
      </div>
    </div>
  `).join("");

  // GitHub button in modal (only when URL is provided)
  const githubModalBtn = proj.githubUrl ? `
    <a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-github">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      <span>GitHub Repository</span>
    </a>
  ` : '';

  modal.innerHTML = `
    <div class="case-study-dialog" role="dialog" aria-modal="true" aria-labelledby="modalProjectTitle">
      <div class="case-study-hero" style="background: linear-gradient(135deg, #101726 0%, #07090e 100%); display: flex; align-items: center; justify-content: center; position: relative;">
        <!-- Default Hero Placeholder -->
        <div style="text-align: center; padding: 40px; position: relative; z-index: 1;">
          <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(0, 255, 136, 0.1); border: 1px solid rgba(0, 255, 136, 0.3); display: flex; align-items: center; justify-content: center; color: var(--accent-lime); margin: 0 auto 12px auto;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <h3 style="font-size: 1.6rem; color: #ffffff; margin-bottom: 4px;">${escapeHtml(proj.name)}</h3>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-lime); text-transform: uppercase;">${escapeHtml(proj.displayCategory || proj.category)}</span>
        </div>

        ${proj.image ? `<img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.name)}" class="case-study-hero-img" onerror="this.style.display='none';" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 2;">` : ''}
        <div class="case-study-hero-overlay" style="z-index: 3;"></div>
        <button type="button" class="case-study-close-btn" onclick="closeCaseStudyModal()" aria-label="Close Case Study Modal" style="z-index: 10;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="case-study-content">
        <div class="case-study-header">
          <span class="case-study-cat">${escapeHtml(cs.categoryDisplay || proj.displayCategory || proj.category)}</span>
          <h3 class="case-study-title" id="modalProjectTitle">${escapeHtml(proj.name)}</h3>
          <p class="lead">${escapeHtml(proj.shortDescription)}</p>
        </div>

        <div class="case-study-meta-grid">
          <div class="case-meta-item">
            <span>Project Scope</span>
            <strong>${escapeHtml(proj.displayCategory || proj.category)}</strong>
          </div>
          <div class="case-meta-item">
            <span>Live Deployment</span>
            <strong class="text-lime">Vercel Production</strong>
          </div>
          <div class="case-meta-item">
            <span>GitHub Source</span>
            <strong>${proj.githubUrl ? 'Public Repository' : 'Private / Proprietary'}</strong>
          </div>
          <div class="case-meta-item">
            <span>Client Showcase</span>
            <strong class="text-lime">${escapeHtml(proj.badgeLabel || 'Verified Project')}</strong>
          </div>
        </div>

        <div class="case-study-section-block">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Project Overview &amp; Challenge
          </h4>
          <p>${escapeHtml(cs.overview)}</p>
          <p style="margin-top: 10px;">${escapeHtml(cs.challenge)}</p>
        </div>

        <div class="case-study-section-block">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            Our Solution &amp; Technical Approach
          </h4>
          <p>${escapeHtml(cs.solution)}</p>
          <p style="margin-top: 10px;">${escapeHtml(cs.designApproach)}</p>
        </div>

        <div class="case-study-section-block">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Key Highlights &amp; Features
          </h4>
          <ul class="case-study-deliverables">
            ${deliverablesHtml}
          </ul>
        </div>

        <!-- Screenshot Gallery with User-Replaceable Placeholders -->
        <div class="case-study-section-block">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            Project Screenshot Gallery
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">
            Image placeholders ready for your screenshots. Save your screenshots into <code>assets/images/</code> to display them here automatically.
          </p>
          <div class="case-study-gallery-grid">
            ${galleryHtml}
          </div>
        </div>

        <div class="case-study-section-block">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Technologies Used
          </h4>
          <div class="project-tech-tags" style="margin-top: 8px;">
            ${techStackHtml}
          </div>
        </div>

        <div class="case-study-footer">
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="${escapeHtml(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <span>View Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
            ${githubModalBtn}
          </div>
          <div>
            <a href="contact.html?service=${encodeURIComponent(proj.displayCategory || proj.category)}" class="btn btn-secondary">
              <span>Start Similar Project</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Case Study modal
 */
function closeCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Global modal background click and ESC key listeners
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("caseStudyModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeCaseStudyModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCaseStudyModal();
    }
  });

  if (typeof window !== "undefined") {
    window.projectsData = projectsData;
  }
  renderProjects("All");
  setupProjectFilters();
});

if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}
