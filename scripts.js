/**
 * Jamie Sessions | Portfolio Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrolling();
    initBackToTop();
});

/**
 * Handles the "Back to Top" button visibility and click
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Handles fade-in animations as elements enter the viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements we want to animate
    const animateElements = document.querySelectorAll('.card, .hero-content, .about-section, .section-header, .about-container');
    
    animateElements.forEach(el => {
        // Add the base fade-in class if it doesn't exist
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });

    // Special case for elements already at the top of the page (Hero)
    // We reveal them immediately if they are in view
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

/**
 * Ensures smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
