document.addEventListener('DOMContentLoaded', () => {
  // --- Reading Progress Bar logic ---
  const progressEl = document.getElementById('reading-progress');
  if (progressEl) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressEl.style.width = scrolled + '%';
    });
  }

  // --- Copy citation button ---
  document.querySelectorAll('[data-copy-target]').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const target = document.getElementById(btn.dataset.copyTarget);
      if (!target) return;
      const text = target.innerText.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
        btn.classList.add('is-done');
      } catch (err) {
        // Fallback: select the text so it can be copied manually
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = 'Press Ctrl+C to copy';
      }
      setTimeout(() => {
        btn.textContent = label;
        btn.classList.remove('is-done');
      }, 2200);
    });
  });

  // --- Giscus Light Theme Verification ---
  window.addEventListener('message', (event) => {
    if (event.origin !== 'https://giscus.app') return;
    
    // Ensure Giscus loads in light mode
    if (event.data && typeof event.data === 'object' && event.data.giscus) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: 'light'
              }
            }
          },
          'https://giscus.app'
        );
      }
    }
  });
});
