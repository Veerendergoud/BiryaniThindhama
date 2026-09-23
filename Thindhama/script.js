const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Mobile menu
const menuToggle = $(".menu-toggle");
const navLinks = $(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

$$(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Smooth scroll buttons
$$("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    const target = $(button.dataset.scroll);
    target?.scrollIntoView({ behavior: "smooth" });
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

// 3D tilt effect — intentionally subtle on desktop
const tiltCards = $$(".tilt-card");

tiltCards.forEach(card => {
  card.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 900) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

// Cursor glow
const glow = $(".cursor-glow");

window.addEventListener("pointermove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

// Menu filtering
const filters = $$(".filter");
const foodCards = $$(".food-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    foodCards.forEach(card => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("hide", !match);
    });
  });
});

// Add-to-feast interaction
const toast = $("#toast");

function showToast() {
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

$$(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    button.textContent = "✓";
    showToast();

    setTimeout(() => {
      button.textContent = "+";
    }, 1200);
  });
});

// Hero image follows pointer slightly
const heroDish = $(".hero-dish");
const heroImage = $(".hero-dish img");

window.addEventListener("pointermove", (event) => {
  if (!heroDish || !heroImage || window.innerWidth < 900) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 8;
  const y = (event.clientY / window.innerHeight - 0.5) * -8;

  heroImage.style.transform =
    `rotate(-7deg) translate3d(${x}px, ${y}px, 40px)`;
});

// Small parallax for decorative orbs
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  $$(".hero-orb").forEach((orb, index) => {
    orb.style.translate = `0 ${scrollY * (index ? 0.05 : -0.08)}px`;
  });
});
