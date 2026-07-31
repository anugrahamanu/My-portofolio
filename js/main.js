/* =========================================
   Data Injection
   ========================================= */

const skillsData = {
    frontend: [
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'Bootstrap', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'UI/UX Design', level: 80 }
    ],
    backend: [
        { name: 'PHP', level: 90 },
        { name: 'Laravel', level: 85 },
        { name: 'CodeIgniter', level: 80 },
        { name: 'MySQL', level: 85 },
        { name: 'WordPress', level: 80 }
    ]
};



const portfolioData = [
    { 
        title: 'Website Jurnal Guru', 
        category: 'Pendidikan', 
        filter: 'education',
        tech: 'Laravel, MySQL, Bootstrap', 
        img: 'assets/images/jurnal-guru.png',
        link: 'https://gurugenz.my.id/'
    },
    { 
        title: 'Sistem Administrasi Sekolah', 
        category: 'Pendidikan', 
        filter: 'education',
        tech: 'PHP, CodeIgniter, MySQL', 
        img: 'assets/images/web-administrasi.png',
        link: 'https://ruangpendidik.my.id/'
    },
    { 
        title: 'Elite English Course', 
        category: 'Landing Page', 
        filter: 'landing',
        tech: 'HTML, Tailwind CSS, JS', 
        img: 'assets/images/web-les.png',
        link: 'https://www.lesinggrisbatumarta.my.id/'
    },
    { 
        title: 'Website Mulok Pertanian', 
        category: 'Pendidikan', 
        filter: 'education',
        tech: 'WordPress, Custom Theme', 
        img: 'assets/images/web-mulok.png',
        link: 'https://kelasbertanam.my.id/'
    }
];



/* =========================================
   DOM Elements Injection
   ========================================= */

// Inject Skills
const frontendContainer = document.getElementById('frontend-skills');
const backendContainer = document.getElementById('backend-skills');

const renderSkills = (data, container) => {
    data.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `
            <div class="skill-info">
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.level}%"></div>
            </div>
        `;
        container.appendChild(div);
    });
};

renderSkills(skillsData.frontend, frontendContainer);
renderSkills(skillsData.backend, backendContainer);



// Inject Portfolio
const portfolioContainer = document.getElementById('portfolio-grid');
portfolioData.forEach(item => {
    const div = document.createElement('div');
    div.className = `portfolio-card filter-item ${item.filter}`;
    div.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="portfolio-img" onerror="this.src='https://via.placeholder.com/600x400/1a1a1a/00E5FF?text=Project'">
        <div class="portfolio-overlay">
            <span class="portfolio-category">${item.category}</span>
            <h3 class="portfolio-title">${item.title}</h3>
            <a href="${item.link || '#'}" ${item.link ? 'target="_blank" rel="noopener noreferrer"' : ''} class="btn btn-primary portfolio-link">Lihat Detail</a>
        </div>
    `;
    portfolioContainer.appendChild(div);
});



/* =========================================
   Interactive Functionality
   ========================================= */

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /* --- Custom Cursor --- */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;
            gsap.set(follower, {
                css: { left: posX, top: posY }
            });
            gsap.set(cursor, {
                css: { left: mouseX, top: mouseY }
            });
        }
    });

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Hover effect on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .portfolio-card, .service-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    /* --- Mobile Menu --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('bx-x', 'bx-menu');
        });
    });

    /* --- Sticky Navbar & ScrollSpy --- */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // ScrollSpy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    /* --- Portfolio Filter --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    gsap.fromTo(card, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });





    /* --- GSAP Animations --- */
    
    // Hero Elements
    gsap.from('.subtitle', { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });
    gsap.from('.title', { y: 30, opacity: 0, duration: 0.8, delay: 0.4 });
    gsap.from('.roles .role-badge', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.6 });
    gsap.from('.description', { y: 20, opacity: 0, duration: 0.8, delay: 0.8 });
    gsap.from('.cta-group', { y: 20, opacity: 0, duration: 0.8, delay: 1 });
    
    gsap.from('.image-container', { scale: 0.8, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
    gsap.from('.floating-card', { x: 30, opacity: 0, duration: 0.8, stagger: 0.2, delay: 1.2 });
    gsap.from('.social-links a', { x: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 1.5 });

    // Section Titles Fade Up
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });

    // About Image and Text
    gsap.from('.about-visual', {
        scrollTrigger: { trigger: '.about', start: "top 70%" },
        x: -50, opacity: 0, duration: 0.8
    });
    gsap.from('.about-text', {
        scrollTrigger: { trigger: '.about', start: "top 70%" },
        x: 50, opacity: 0, duration: 0.8
    });

    // Skill Bars Animation
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: '.skills',
                start: "top 70%"
            },
            width: bar.getAttribute('data-width'),
            duration: 1.5,
            ease: "power2.out"
        });
    });



    // Timeline Animation
    gsap.from('.timeline-item', {
        scrollTrigger: { trigger: '.experience', start: "top 75%" },
        x: -50, opacity: 0, duration: 0.6, stagger: 0.2
    });

    // Contact Form
    gsap.from('.contact-info-wrapper', {
        scrollTrigger: { trigger: '.contact', start: "top 75%" },
        x: -50, opacity: 0, duration: 0.8
    });
    gsap.from('.contact-form-wrapper', {
        scrollTrigger: { trigger: '.contact', start: "top 75%" },
        scale: 0.9, opacity: 0, duration: 0.8
    });

    // Contact form prevention
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = `<span>Terkirim!</span> <i class='bx bx-check'></i>`;
            btn.style.background = 'var(--accent-color)';
            btn.style.color = '#000';
            
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        });
    }

    // Typed.js Animation for Hero
    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                "<h3 class='subtitle'>Hi, Saya</h3>\n<h1 class='title'>Anugrah Amanu<br><span class='text-primary'>Pratama</span></h1>"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 2500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});
