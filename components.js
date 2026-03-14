/**
 * Jamie Sessions | Portfolio Components
 * Handles dynamic navigation and footer injection to reduce redundancy.
 */

document.addEventListener('DOMContentLoaded', () => {
    injectNavigation();
    injectFooter();
    setActiveLink();
});

function injectNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    // Check if we are in a subdirectory (like /works/ or /code/)
    const pathDepth = window.location.pathname.split('/').filter(p => p).length;
    // This is a simple heuristic. For a local file system it might be different.
    // Let's check if the current path contains /works/ or /code/
    const isSubfolder = window.location.pathname.includes('/works/') || window.location.pathname.includes('/code/');
    const prefix = isSubfolder ? '../' : '';

    nav.innerHTML = `
        <div class="logo"><a href="${prefix}index.html" style="text-decoration: none; color: inherit;">JAMIE SESSIONS</a></div>
        <div class="nav-links">
            <a href="${prefix}index.html">Home</a>
            <a href="${prefix}works.html">Research</a>
            <a href="${prefix}code.html">Projects</a>
            <a href="${prefix}index.html#about">About</a>
            <a href="mailto:contact@jamiesessions.com">Contact</a>
        </div>
    `;
}

function injectFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="social-links">
            <a href="https://www.linkedin.com/in/jamie-sessions-15b646281" target="_blank">LinkedIn</a>
            <a href="https://instagram.com/cijamie" target="_blank">Instagram</a>
        </div>
        <p class="copyright">&copy; ${new Date().getFullYear()} Jamie Sessions</p>
    `;
}

function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Remove active class first
        link.classList.remove('active');

        const href = link.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
        
        // Special case for Research & Projects sub-pages
        if (currentPath.includes('/works/') && href.includes('works.html')) {
            link.classList.add('active');
        }
        if (currentPath.includes('/code/') && href.includes('code.html')) {
            link.classList.add('active');
        }
    });
}
