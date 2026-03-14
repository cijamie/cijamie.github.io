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

    // More robust subfolder detection for GitHub Pages
    // We check if the current path contains /works/ or /code/ as a directory segment
    const path = window.location.pathname;
    const isSubfolder = /\/(works|code)\//i.test(path);
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
    const currentHash = window.location.hash;

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (!href) return;

        // Clean href of prefix for comparison
        const cleanHref = href.replace(/^(\.\.\/)+/, '');
        const hrefBase = cleanHref.split('#')[0];
        const hrefHash = cleanHref.includes('#') ? '#' + cleanHref.split('#')[1] : '';

        // Exact match for the page
        const isPageMatch = currentPath.endsWith(hrefBase) || (currentPath.endsWith('/') && hrefBase === 'index.html');
        
        if (isPageMatch) {
            // If there's a hash in the link, it must match current hash or current hash must be empty
            if (!hrefHash || currentHash === hrefHash) {
                link.classList.add('active');
            }
        }
        
        // Special case for Research & Projects sub-pages
        if (currentPath.includes('/works/') && hrefBase === 'works.html') {
            link.classList.add('active');
        }
        if (currentPath.includes('/code/') && hrefBase === 'code.html') {
            link.classList.add('active');
        }
    });
}
