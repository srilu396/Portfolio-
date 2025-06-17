const { useEffect, useState } = React;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
    lucide.createIcons();
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('neon-mode', theme === 'neon');

    // Initialize Tilt.js
    VanillaTilt.init(document.querySelectorAll('.project-card'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    });

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    const trails = [];
    const trailCount = 5;

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      document.body.appendChild(trail);
      trails.push(trail);
    }

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      trails.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${e.clientX}px`;
          trail.style.top = `${e.clientY}px`;
          trail.style.transform = `scale(${1 - index * 0.2})`;
          trail.style.opacity = 1 - index * 0.2;
        }, index * 50);
      });
    });

    // Parallax Effect
    const hero = document.getElementById('home');
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      hero.style.backgroundPositionY = `${offset * 0.5}px`;

      // Scroll Progress Bar
      const scrollProgress = document.getElementById('scroll-progress');
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (offset / scrollHeight) * 100;
      scrollProgress.style.width = `${progress}%`;

      // Active Section Highlight
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'internships', 'contact'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element.getBoundingClientRect().top <= 100) {
          current = section;
        }
      }
      setActiveSection(current);
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });

    backToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'neon' : 'light');
  };

  return (
    <div>
      <nav className="navbar py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src="images/logo.png" alt="Logo" className="logo-img mr-2" />
          <h1 className="text-xl font-bold">Your Name 🌟</h1>
        </div>
        <ul className="flex space-x-6">
          {['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Internships', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`hover:text-cyan-400 transition ${activeSection === item.toLowerCase() ? 'nav-link active' : ''}`}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} className="p-2">
              <i data-lucide={theme === 'light' ? 'moon' : theme === 'dark' ? 'zap' : 'sun'}></i>
            </button>
          </li>
        </ul>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hello, I'm <span className="text-cyan-400">Your Name</span> ✨
          </h1>
          <Typewriter text="Frontend Developer | Web Enthusiast 💻" speed={100} />
          <a
            href="#projects"
            className="inline-flex items-center bg-cyan-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-cyan-600 transition mt-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <i data-lucide="briefcase" className="mr-2"></i>
            See My Work
          </a>
        </div>
      </section>

      <section id="about" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">About Me 🌈</h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8" data-aos="fade-up" data-aos-delay="200">
          <img src="images/profile.jpg" alt="Your Name" className="profile-img" />
          <div>
            <p className="text-lg mb-4">
              I'm a passionate frontend developer dedicated to crafting seamless, visually stunning websites. 🎨
            </p>
            <p className="text-lg mb-4">
              When I'm not coding, you'll find me immersed in cartoons, diving into the wisdom of the Bhagavad Gita, or experimenting with new tech. 📺
            </p>
            <p className="text-lg">
              Fun Fact: <span className="fun-fact text-cyan-400">I’m obsessed with creating pixel-perfect animations! 🎉</span>
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Skills 💪</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
          {[
            { icon: 'code', name: 'HTML', level: 'Expert', emoji: '📝' },
            { icon: 'css-3', name: 'CSS', level: 'Advanced', emoji: '🎨' },
            { icon: 'javascript', name: 'JavaScript', level: 'Advanced', emoji: '⚡️' },
            { icon: 'react', name: 'React', level: 'Intermediate', emoji: '🔄' },
          ].map((skill) => (
            <div key={skill.name} className="skill-card bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-6 rounded-lg">
              <div className="skill-icon">
                <i data-lucide={skill.icon}></i>
              </div>
              <p className="text-lg font-semibold">{skill.name} {skill.emoji}</p>
              <p className="skill-level">{skill.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white py-16">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Projects 🚀</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              title: 'Weather App',
              desc: 'A modern weather forecasting app using OpenWeather API. ☀️',
              img: 'images/project1.gif',
              live: '#',
              github: '#',
            },
            {
              title: 'Todo List',
              desc: 'A sleek task management app with local storage. ✅',
              img: 'images/project2.gif',
              live: '#',
              github: '#',
            },
          ].map((project) => (
            <div key={project.title} className="project-card p-6 rounded-lg" data-tilt>
              <img src={project.img} alt={project.title} className="project-img mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="mb-4">{project.desc}</p>
              <div className="flex space-x-4">
                <a href={project.live} target="_blank" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">Live Demo 🌐</a>
                <a href={project.github} target="_blank" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">GitHub 🐙</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications" className="py-16">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Certifications 🏆</h2>
        <div className="timeline" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              title: 'React Developer Certification ⭐',
              issuer: 'Coursera',
              year: '2024',
              desc: 'Mastered React.js with advanced component design and state management.',
              img: 'images/cert1.jpg',
            },
            {
              title: 'Web Development Bootcamp ⭐',
              issuer: 'Udemy',
              year: '2023',
              desc: 'Comprehensive course covering HTML, CSS, JavaScript, and Node.js.',
              img: 'images/cert2.jpg',
            },
          ].map((cert, index) => (
            <div key={cert.title} className={`timeline-item cert-card p-6 rounded-lg ${index % 2 === 0 ? 'left' : 'right'}`}>
              <img src={cert.img} alt={cert.title} className="cert-img" />
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-400">{cert.issuer} • {cert.year}</p>
              <p>{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="internships" className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white py-16">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Internships 💼</h2>
        <div className="timeline" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              title: 'Frontend Developer Intern',
              company: 'TechCorp',
              period: 'Jun 2024 - Aug 2024',
              desc: 'Developed responsive web interfaces using React and Tailwind CSS. 🖥️',
            },
            {
              title: 'Web Development Intern',
              company: 'StartUp Inc.',
              period: 'Jan 2023 - May 2023',
              desc: 'Built dynamic web applications with JavaScript and APIs. 🌐',
            },
          ].map((intern, index) => (
            <div key={intern.title} className={`timeline-item intern-card p-6 rounded-lg ${index % 2 === 0 ? 'left' : 'right'}`}>
              <h3 className="text-xl font-semibold">{intern.title}</h3>
              <p className="text-sm text-gray-400">{intern.company} • {intern.period}</p>
              <p>{intern.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Contact Me 📩</h2>
        <div className="max-w-lg mx-auto" data-aos="fade-up" data-aos-delay="200">
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-cyan-500 text-white p-3 rounded-lg hover:bg-cyan-600 transition"
            >
              Send 📬
            </button>
            <a
              href="resume.pdf"
              download
              className="inline-flex items-center bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition w-full justify-center"
            >
              <i data-lucide="download" className="mr-2"></i>
              Download Resume 📄
            </a>
          </div>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="https://github.com/username" target="_blank" className="social-icon text-2xl">
              <i data-lucide="github"></i>
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" className="social-icon text-2xl">
              <i data-lucide="linkedin"></i>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-4 text-center flex flex-col items-center">
        <img src="images/logo.png" alt="Logo" className="logo-img mb-2" />
        <p>© 2025 Your Name. All rights reserved. ❤️</p>
      </footer>

      <div id="back-to-top" className="p-2">
        <i data-lucide="arrow-up"></i>
      </div>
    </div>
  );
};

const Typewriter = ({ text, speed }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };
    type();
  }, [text, speed]);

  return <p className="text-xl md:text-2xl mb-6 typewriter">{displayText}</p>;
};

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.01;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size <= 0.2) {
      particles.splice(index, 1);
      particles.push(new Particle());
    }
  });
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

ReactDOM.render(<App />, document.getElementById('root'));