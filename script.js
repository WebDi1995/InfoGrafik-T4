const TOTAL = 6;
let current = 1;

/**
 * Switches between the 6 different panels
 * @param {number} n - The panel index to switch to
 */
function switchTab(n) {
    // Update panel visibility
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    
    // Update tab button states
    document.querySelectorAll('.tab-btn').forEach((b, i) => {
        const isActive = i === n - 1;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Show target panel
    const target = document.getElementById('panel-' + n);
    if (target) target.classList.add('active');

    // Update progress bar
    document.getElementById('progress').style.width = (n / TOTAL * 100) + '%';
    
    current = n;
    
    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Toggles the expandable text sections
 * @param {HTMLElement} btn - The button clicked
 */
function toggleExpand(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    
    body.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', (!isOpen).toString());
}

/**
 * Replaces the placeholder with an iframe for video content
 * @param {HTMLElement} slot - The media-slot container
 */
function toggleVideo(slot) {
    const videoSrc = slot.dataset.video;
    if (!videoSrc) return;

    const existing = slot.querySelector('iframe');
    if (existing) {
        slot.removeChild(existing);
        return;
    }

    const iframe = document.createElement('iframe');
    iframe.src = videoSrc + '?autoplay=1';
    iframe.allow = 'autoplay; fullscreen';
    iframe.allowFullscreen = true;
    
    // Clear placeholder and add iframe
    slot.innerHTML = '';
    slot.appendChild(iframe);
}

// Keyboard navigation (Arrow keys)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && current < TOTAL) {
        switchTab(current + 1);
    }
    if (e.key === 'ArrowLeft' && current > 1) {
        switchTab(current - 1);
    }
});
