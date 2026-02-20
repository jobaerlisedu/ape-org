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
});
