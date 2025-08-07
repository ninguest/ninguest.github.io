// Custom enhancements for portfolio website
(function() {
    'use strict';

    // Handle loading screen
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit to ensure all libraries are loaded
        setTimeout(() => {
            initializeAnimations();
        }, 500);

        // Add typing animation to hero section
        const heroText = document.querySelector('#hero h1');
        if (heroText) {
            heroText.style.overflow = 'hidden';
            heroText.style.borderRight = '3px solid #149ddd';
            heroText.style.whiteSpace = 'nowrap';
            heroText.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }

        // Add particle background to hero section
        createParticleBackground();

        // Enhanced skill item interactions
        addSkillInteractions();

        // Add progress bar animations
        animateProgressBars();

        // Initialize dark mode toggle
        initDarkModeToggle();

        // Fix portfolio filtering if needed
        fixPortfolioFiltering();

        // Ensure back to top button works
        ensureBackToTopWorks();
    });

    // Ensure back to top button functionality
    function ensureBackToTopWorks() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            // Remove any existing event listeners and add our own
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Show/hide on scroll
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 100) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
        }
    }

    // Fix portfolio filtering functionality
    function fixPortfolioFiltering() {
        // Wait for Isotope to initialize, but provide fallback
        setTimeout(() => {
            // Check if Isotope is working
            const portfolioContainer = document.querySelector('.portfolio-container');
            if (!portfolioContainer) return;

            // Add click handlers to filter buttons
            const portfolioFilters = document.querySelectorAll('#portfolio-flters li');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            // Check if original Isotope functionality is working
            let isotopeWorking = false;
            portfolioFilters.forEach(filter => {
                if (filter.onclick || filter.addEventListener.toString().includes('Isotope')) {
                    isotopeWorking = true;
                }
            });

            // If Isotope isn't working, provide fallback
            if (!isotopeWorking) {
                portfolioFilters.forEach(filter => {
                    filter.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Remove active class from all filters
                        portfolioFilters.forEach(f => f.classList.remove('filter-active'));
                        // Add active class to clicked filter
                        this.classList.add('filter-active');

                        const filterValue = this.getAttribute('data-filter');

                        portfolioItems.forEach(item => {
                            if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                                item.style.display = 'block';
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            } else {
                                item.style.display = 'none';
                            }
                        });

                        // Refresh AOS animations if available
                        if (typeof AOS !== 'undefined') {
                            AOS.refresh();
                        }
                    });
                });
            }
        }, 1000);
    }

    function initializeAnimations() {
        // Observe skill items for stagger animation
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
            observer.observe(item);
        });

        // Observe portfolio items - wait for Isotope to finish
        setTimeout(() => {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                observer.observe(item);
            });
        }, 100);

        // Observe resume items
        const resumeItems = document.querySelectorAll('.resume-item');
        resumeItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    // Initialize dark mode toggle
    function initDarkModeToggle() {
        const toggle = document.getElementById('dark-mode-toggle');
        const icon = toggle.querySelector('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                icon.className = 'bx bx-sun';
            }
        }

        toggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            icon.className = newTheme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        });
    }

    // Create particle background effect
    function createParticleBackground() {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticles() {
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(20, 157, 221, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        createParticles();
        animateParticles();
    }

    // Enhanced skill interactions
    function addSkillInteractions() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        });
    }

    // Animate progress bars when they come into view
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            observer.observe(bar);
            bar.addEventListener('animationstart', function() {
                const percent = this.getAttribute('aria-valuenow');
                this.style.width = percent + '%';
            });
        });
    }

    // Add smooth scroll behavior for navigation links (avoid conflicts)
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelectorAll('a[href^="#"]:not(.back-to-top)');
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target && this.getAttribute('href') !== '#') {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });

})();
