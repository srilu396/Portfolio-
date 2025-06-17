// Initialize theme immediately
const body = document.body;
const themeButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');

try {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  if (isDark) {
    body.classList.add('dark');
    themeButtons.forEach(btn => {
      btn.innerHTML = '<i class="fas fa-sun text-xl"></i>';
    });
  } else {
    body.classList.remove('dark');
    themeButtons.forEach(btn => {
      btn.innerHTML = '<i class="fas fa-moon text-xl"></i>';
    });
  }
} catch (e) {
  console.error('Error accessing localStorage:', e);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 1200,
    once: true,
    easing: 'ease-in-out-back',
  });

  // Theme Toggle
  const toggleTheme = () => {
    const isDarkMode = body.classList.toggle('dark');
    themeButtons.forEach(btn => {
      btn.innerHTML = `<i class="fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl"></i>`;
    });

    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  themeButtons.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('open', !isOpen);
    mobileMenu.classList.toggle('closed', isOpen);
    hamburger.innerHTML = `<i class="fas ${isOpen ? 'fa-bars' : 'fa-times'} text-xl"></i>`;
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('open');
      mobileMenu.classList.add('closed');
      hamburger.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    });
  });

  // Typewriter Effect for Hero
  const tagline = document.getElementById('tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    setTimeout(typeWriter, 500);
  }

  // Animate Progress Bars for Skills
  document.querySelectorAll('.progress').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });

  // Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});