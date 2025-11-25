document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Loaded');

    // Select all links with the class 'disabled-link' or href="#"
    const disabledLinks = document.querySelectorAll('a[href="#"]');

    disabledLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent the default jump-to-top behavior
            e.preventDefault();
            console.log('This project is coming soon.');
            
            // Optional: Add a subtle visual cue that the link is disabled
            link.style.cursor = 'not-allowed';
        });
    });

    // Optional: Add scroll reveal animation for cards
    // This adds a class 'visible' when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // You can attach this observer to your cards if you modify the CSS initial state
    // const cards = document.querySelectorAll('.card');
    // cards.forEach(card => observer.observe(card));
});
