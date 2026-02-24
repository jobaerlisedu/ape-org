document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    const submenus = document.querySelectorAll('.dropdown-submenu');

    function setupMobileDropdowns() {
        if (window.innerWidth <= 900) {
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                // Clone the link to remove previous event listeners if any (to avoid duplicates on resize)
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);

                newLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        e.stopPropagation(); // Prevent bubbling to document
                        dropdown.classList.toggle('active');
                    }
                });
            });

            submenus.forEach(submenu => {
                const link = submenu.querySelector('a');
                const newLink = link.cloneNode(true);
                link.parentNode.replaceChild(newLink, link);

                newLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        e.stopPropagation();
                        submenu.classList.toggle('active');
                    }
                });
            });
        }
    }

    // Run on load and resize
    setupMobileDropdowns();
    // Debounce resize event
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupMobileDropdowns();
        }, 250);
    });

    // Close menu when clicking a link (regular links, not parent toggles)
    document.querySelectorAll('.nav a:not(.dropdown > a):not(.dropdown-submenu > a)').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');

            // Close all dropdowns when menu closes
            document.querySelectorAll('.dropdown.active, .dropdown-submenu.active').forEach(el => {
                el.classList.remove('active');
            });
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Particle Network Animation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = 60; // Slightly fewer for icons to avoid clutter
        const connectionDistance = 150;
        const moveSpeed = 0.4;
        const icons = ['\uf0c0', '\uf19c', '\uf1bb', '\uf57d']; // users, building-columns, leaf, globe
        const textLabels = ['Governance', 'Youth', 'Marginalised', 'Progressive', 'Global'];

        function resize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }

        class Particle {
            constructor(labelText = null) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * moveSpeed;
                this.vy = (Math.random() - 0.5) * moveSpeed;

                if (labelText) {
                    this.text = labelText;
                    this.isText = true;
                    this.fontSize = 14;
                } else {
                    this.icon = icons[Math.floor(Math.random() * icons.length)];
                    this.isText = false;
                    this.fontSize = Math.random() * 10 + 12; // 12px to 22px
                }
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (this.isText) {
                    ctx.font = `600 ${this.fontSize}px "Inter", sans-serif`;
                } else {
                    ctx.font = `900 ${this.fontSize}px "Font Awesome 6 Free"`;
                }
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.isText ? this.text : this.icon, this.x, this.y);
            }
        }

        function initParticles() {
            particles = [];
            resize();

            // Add particles with text labels (3 instances of each)
            const repeats = 3;
            for (let i = 0; i < repeats; i++) {
                textLabels.forEach(label => {
                    particles.push(new Particle(label));
                });
            }

            // Add remaining particles with icons
            const textParticlesCount = textLabels.length * repeats;
            for (let i = textParticlesCount; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / connectionDistance) * 0.5})`;
                        ctx.lineWidth = 1.0;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        document.fonts.ready.then(() => {
            initParticles();
            animate();
        });
    }
});
