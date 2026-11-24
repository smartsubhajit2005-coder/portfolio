// Theme Management
const htmlEl = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
  htmlEl.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Toast Helper
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2800);
}

// Instant Email Copy
document.querySelectorAll('[data-email]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const email = btn.getAttribute('data-email');
    try {
      await navigator.clipboard.writeText(email);
      showToast(`Copied ${email} to clipboard`);
    } catch {
      const temp = document.createElement('input');
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast(`Copied ${email} to clipboard`);
    }
  });
});

// Project Category Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    filterButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// Interactive Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill out all fields before sending.');
    return;
  }

  const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  const mailtoUrl = `mailto:subhajit.mitra@stirrup.works?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;
  window.location.href = mailtoUrl;

  showToast('Opening your mail client to send the message...');
  contactForm.reset();
});

// Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();
