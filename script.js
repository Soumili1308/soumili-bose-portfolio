document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  const themeToggle = document.getElementById("themeToggle");
  const scrollTop = document.getElementById("scrollTop");
  const printResume = document.getElementById("printResume");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Theme preference
  const savedTheme = localStorage.getItem("soumilitheme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀";
  }

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const light = document.body.classList.contains("light-mode");
    localStorage.setItem("soumilitheme", light ? "light" : "dark");
    themeToggle.textContent = light ? "☀" : "☾";
  });

  // Navbar and back-to-top
  const onScroll = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 20);
    scrollTop?.classList.toggle("show", window.scrollY > 500);

    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".nav-links a");
    let current = "home";

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 130) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTop?.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

  // Resume: print the portfolio as a PDF from the browser.
  // This avoids a missing-PDF error when the site is opened locally.
  printResume?.addEventListener("click", () => window.print());

  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Simple reveal animation that never hides content if JS is disabled.
  const revealItems = document.querySelectorAll(
    ".skill-card, .experience-card, .project-card, .achievement-card, .certification-card, .contact-card"
  );
  if ("IntersectionObserver" in window) {
    revealItems.forEach(item => item.classList.add("reveal-ready"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.08});
    revealItems.forEach(item => observer.observe(item));
  }
});
