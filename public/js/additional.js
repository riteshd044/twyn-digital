//  Nav bar ANIMATION  
(function () {
      const navLinks = document.querySelectorAll('.tp-header-12-menu nav ul li');
 
      // ── 1. Mark active based on current URL ──────────────────────────────
      // Strips query strings and trailing slashes for a clean match
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
 
      navLinks.forEach(function (li) {
        const anchor = li.querySelector('a');
        if (!anchor) return;
 
        const href = anchor.getAttribute('href');
 
        // Skip pure hash links
        if (!href || href === '#') return;
 
        // Resolve href relative to current origin
        let linkPath;
        try {
          linkPath = new URL(href, window.location.href).pathname.replace(/\/$/, '') || '/';
        } catch (e) {
          return;
        }
 
        // Exact match → active; also handles root '/'
        if (linkPath === currentPath) {
          li.classList.add('is-active');
        }
      });
 
      // ── 2. Click to set active immediately (SPA-style or same-tab feel) ──
      navLinks.forEach(function (li) {
        li.addEventListener('click', function () {
          // Remove active from all
          navLinks.forEach(function (el) { el.classList.remove('is-active'); });
          // Set on clicked item
          li.classList.add('is-active');
        });
      });
 
    })();


//  3D Ring ANIMATION  
(function() {
    const TAGLINE = "TURNING CLICKS INTO CLIENTS • ";
    const SPEED_SECONDS = 18;
    const RING_WIDTH_RATIO = 0.82;
    const ring = document.getElementById('twynRing');
    ring.style.setProperty('--speed', SPEED_SECONDS + 's');
    function buildRing() {
        ring.innerHTML = '';
        const chars = TAGLINE.split('');
        const N = chars.length;
        // Calculate ring size based on viewport
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        const minDim = Math.min(viewportW, viewportH);
        // Responsive ring diameter
        let D;
        if (viewportW < 480) {
            D = minDim * 0.88;
        } else if (viewportW < 768) {
            D = minDim * 0.85;
        } else if (viewportW < 1200) {
            D = Math.min(viewportW * 0.75, viewportH * 0.7);
        } else {
            D = Math.min(viewportW * RING_WIDTH_RATIO, 900);
        }
        const R = D / 2;
        const slotW = (Math.PI * D) / N;
        const fs = slotW / 0.58;
        const slotH = fs * 1.08;
        const step = 360 / N;
        chars.forEach((c, i) => {
            const d = document.createElement('div');
            d.className = 'twyn-char';
            d.style.width = slotW + 'px';
            d.style.height = slotH + 'px';
            d.style.fontSize = fs + 'px';
            d.style.marginLeft = (-slotW / 2) + 'px';
            d.style.marginTop = (-slotH / 2) + 'px';
            d.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`;
            const ch = c === ' ' ? '&nbsp;' : c;
            d.innerHTML = `<span class="fill">${ch}</span><span class="line">${ch}</span>`;
            ring.appendChild(d);
        });
    }
    buildRing();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(buildRing, 150);
    });
})();


//  who are we counter animatioin 
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');

      // animate counters + progress bars inside this element
      const counter = entry.target.querySelector('.twyn-counter');
      const fill = entry.target.querySelector('.twyn-counter-fill');

      if (counter) {
        const target = +counter.dataset.target;
        let current = 0;
        const step = Math.max(1, target / 60);
        (function update() {
          current += step;
          counter.textContent = current >= target ? target : Math.floor(current);
          if (current < target) requestAnimationFrame(update);
        })();
      }
      if (fill) {
        fill.style.width = fill.dataset.fill + '%';
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.twyn-reveal').forEach((el) => observer.observe(el));
});


//  Twyn Banner Text Rotation 
(function() {
    var words = ["Data", "Creativity", "Strategy", "Growth"];
    var el = document.getElementById('rotateText');
    if (!el) return;

    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var pauseTime = 2000;
    var typeSpeed = 120;
    var deleteSpeed = 60;

    function type() {
        var current = words[wordIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        var speed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === current.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }

    type();
})();