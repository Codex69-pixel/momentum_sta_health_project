// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (
            !e.target.closest('.header-left') &&
            !e.target.closest('.hamburger')
        ) {
            navMenu.classList.remove('active');
        }
    });
}

// Mobile menu toggle functionality
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });
}