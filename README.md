# ZENTIVO DIGITAL — Official Company Website

A premium, modern, high-performance company website built for **ZENTIVO DIGITAL**, founded by **VIMALKUMAR M**.

---

## 🌟 Brand Design & Architecture

- **Color Palette**: Dark charcoal / deep navy backgrounds (`#07090e`, `#0d121d`), white typography, and electric lime green accents (`#00ff88`).
- **Typography**: Outfit (headings), Plus Jakarta Sans (body), and JetBrains Mono (tech tags and numbers) via Google Fonts.
- **Technology Stack**: Strict **HTML5**, **CSS3**, and **Vanilla JavaScript** (Zero frameworks, zero build tools, zero dependencies).
- **Official Brand Assets**: Uses the authentic uploaded **ZENTIVO DIGITAL** logo (`assets/logo/zentivo-logo.png`) with original proportions preserved.
- **Founder / Admin**: **VIMALKUMAR M**
- **Business Email**: `zentiprojects@gmail.com`
- **LinkedIn**: [Zentivo Digital](https://www.linkedin.com/in/zentivo-digital-ba281944b/)
- **WhatsApp**: `+91 96556 04042`

---

## 📁 Project Structure

```
website/
├── index.html              # Homepage with animated hero, services, process, & portfolio
├── about.html              # In-depth About page & Founder attribution (Vimalkumar M)
├── services.html           # 6 core services with interactive detail modals
├── projects.html           # Interactive portfolio with dynamic category filtering
├── contact.html            # Client-side validated contact form & WhatsApp direct routing
├── favicon.ico             # Official company favicon
├── css/
│   ├── style.css           # Core design system, variables, layouts, & components
│   ├── animations.css      # Floating animations, scroll reveals, & reduced-motion support
│   └── responsive.css      # Responsive media queries (Desktop, Laptop, Tablet, Mobile)
├── js/
│   ├── projects.js         # Modular JavaScript project data structure & dynamic renderer
│   ├── animations.js       # Interactive canvas particle network & scroll triggers
│   └── main.js             # Mobile menu drawer, active nav, service modals, & validation
└── assets/
    ├── logo/               # Authentic ZENTIVO DIGITAL logo files
    ├── images/             # High-resolution project showcase & banner graphics
    └── icons/              # Vector icons
```

*(Note: An identical copy of this structure is also mirrored in `zentivo-digital/`)*

---

## 🚀 How to Run the Website

Because this project uses pure HTML5, CSS3, and Vanilla JavaScript with no build steps:

### Option 1: Direct File Opening
Double-click `index.html` in your file explorer to open it directly in Chrome, Edge, Safari, or Firefox.

### Option 2: VS Code Live Server
1. Open the `website` folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.
3. It will launch at `http://127.0.0.1:5500/`.

### Option 3: Python Local Server
Run this command in terminal/PowerShell inside the website folder:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/`.

---

## 🛠️ How to Add or Edit Projects in the Portfolio

All portfolio projects are driven dynamically by the simple data structure in **`js/projects.js`**.

To add a new project:
1. Open `js/projects.js` in any text editor.
2. Scroll to the `projectsData` array at the top.
3. Copy one of the project objects and paste it into the array:

```javascript
{
  id: "my-new-project",
  name: "Your Project Name",
  category: "Web Development", // Or "Web Design" or "Digital Solutions"
  badgeLabel: "Client Project",
  image: "assets/images/your-screenshot.png",
  shortDescription: "A concise 1-2 sentence description of the project.",
  technologies: ["HTML5", "CSS3", "JavaScript"],
  liveUrl: "https://yourclientwebsite.com",
  caseStudy: {
    categoryDisplay: "Web Development • Commercial Website",
    overview: "Summary of the project...",
    challenge: "What problem did the client face?",
    solution: "How did Zentivo Digital solve it?",
    designApproach: "What was the visual and UX strategy?",
    deliverables: [
      "Responsive Layout",
      "Fast Core Web Vitals",
      "Custom Forms"
    ],
    screenshots: [
      "assets/images/your-screenshot.png"
    ]
  }
}
```
4. Save the file.
5. Your project will **automatically appear** on both `index.html` and `projects.html`, support category filtering, and open its case study modal!

---

## 📬 Contact Form & Real-World Message Delivery

The contact form in `contact.html` features complete **client-side input validation**:
- Validates Full Name, Email, Phone Number, Service Selection, and Project Details.
- Submitting the form opens a confirmation modal giving the user instant 1-click options to:
  1. **Send directly via WhatsApp** (pre-populates all user-entered details in the WhatsApp chat to `+91 96556 04042`).
  2. **Send via Email app** (pre-populates client name, service, and project scope in a formatted email).

### Optional: Connecting to an Automated Backend Email Service
If you want form submissions to arrive automatically in your inbox without using WhatsApp, you can connect any free form handler in 1 minute:
- **Formspree**: Change `<form id="contactForm" ...>` in `contact.html` to:
  ```html
  <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```
- **EmailJS**: Include the EmailJS SDK script and call `emailjs.sendForm(...)` inside `js/main.js`.

---

## 🛡️ Standards & Quality Checklist

- [x] Authentic uploaded company logo used with original aspect ratio.
- [x] Responsive on Desktop, Laptop, Tablet, and Mobile.
- [x] Smooth entrance animations and subtle canvas particle network in hero.
- [x] Filterable project portfolio with case study modals.
- [x] Founder credit: **Founded by VIMALKUMAR M**.
- [x] Accessible HTML5 semantic structure and WCAG-compliant contrast.
- [x] SEO-ready meta tags, Open Graph tags, and Schema.org JSON-LD structured data.
- [x] Reduced motion preference handled gracefully.
