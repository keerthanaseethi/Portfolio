// AOS init
AOS.init({ duration: 900, once: true });

// Smooth active link highlight with IntersectionObserver
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
);

sections.forEach((sec) => observer.observe(sec));

// Scroll-to-top button
const topBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 160) topBtn.classList.add("show");
  else topBtn.classList.remove("show");
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile menu
const burger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
burger.addEventListener("click", () => {
  const expanded = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!expanded));
  navList.classList.toggle("show");
});
navLinks.forEach((l) =>
  l.addEventListener("click", () => {
    navList.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
  })
);

// Typewriter effect (no external lib)
const typeEl = document.querySelector(".typewrite");
const cursor = document.querySelector(".cursor");
if (typeEl) {
  const words = JSON.parse(typeEl.getAttribute("data-words") || "[]");
  let i = 0, j = 0, isDeleting = false;

  function type() {
    const current = words[i % words.length];
    typeEl.textContent = isDeleting ? current.slice(0, j--) : current.slice(0, j++);
    const base = isDeleting ? 70 : 110;
    const extraPause = (!isDeleting && j === current.length) ? 900 : (isDeleting && j === 0 ? 350 : 0);

    if (!isDeleting && j === current.length) { isDeleting = true; }
    else if (isDeleting && j === 0) { isDeleting = false; i++; }

    setTimeout(type, base + extraPause);
  }
  type();

  // Blink cursor
  setInterval(() => cursor.classList.toggle("hidden"), 500);
}

// Contact form (front-end only)
function handleContact(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  alert(`Thanks, ${data.name}! I’ll get back to you at ${data.email}.`);
  e.target.reset();
  return false;
}
window.handleContact = handleContact;
