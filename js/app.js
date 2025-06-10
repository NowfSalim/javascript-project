/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/* Define Global Variables */
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');
const scrollToTopBtn = document.getElementById('scrollToTop');

/* Helper Functions */

// Check if section is in viewport
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 150 && rect.bottom >= 150;
};

/* Main Functions */

// Dynamically builds the nav bar based on sections
const buildNav = () => {
    const fragment = document.createDocumentFragment();

    for (const section of sections) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = section.getAttribute('data-nav');
        a.href = `#${section.id}`;
        a.classList.add('menu__link');

        // Scroll smoothly to section on link click
        a.addEventListener('click', function (e) {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });

        li.appendChild(a);
        fragment.appendChild(li);
    }

    navBar.appendChild(fragment);
};

// Highlights section and nav item currently in view
const makeActive = () => {
    for (const section of sections) {
        section.classList.remove('your-active-class');
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (navLink) navLink.classList.remove('active-link');
    }

    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            section.classList.add('your-active-class');
            const navLink = document.querySelector(`a[href="#${section.id}"]`);
            if (navLink) navLink.classList.add('active-link');
        }
    }
};

/* Events */

// Scroll event: highlights section, hides navbar, shows scroll-to-top
let scrollTimeout;
window.addEventListener('scroll', () => {
    makeActive();

    navBar.style.display = 'block';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        navBar.style.display = 'none';
    }, 2000);

    scrollToTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

// Scroll to top button click event
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize nav after DOM is loaded
document.addEventListener('DOMContentLoaded', buildNav);
