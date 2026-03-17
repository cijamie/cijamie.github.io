// Scroll Progress Bar & Reading Time
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    // Update Active Link
    updateActiveLink();
};

document.addEventListener('DOMContentLoaded', () => {
    calculateReadingTime();
});

function calculateReadingTime() {
    const main = document.querySelector('main');
    const display = document.getElementById('reading-time');
    if (!main || !display) return;

    const text = main.innerText;
    const wpm = 225; // Average adult reading speed
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    
    display.innerText = `${time} min read`;
}

// Section Reveal Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(section => {
    observer.observe(section);
});

// Update Active Nav Link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + current || href.endsWith('#' + current)) {
                link.classList.add('active');
            }
        });
    }
}
