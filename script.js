document.addEventListener('DOMContentLoaded', () => {

    // ================= 1. DYNAMIC NAVBAR LOADING =================
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Navbar load nahi ho paya');
            return response.text();
        })
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Navbar Fetch Error:', error));


    // ================= 2. PRELOADER ANIMATION =================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 2000);
    }


    // ================= 3. MANUAL MUTE / UNMUTE BUTTON TOGGLE ONLY =================
    const heroVideo = document.getElementById('heroVideo');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const soundLabel = document.getElementById('soundLabel');

    if (soundToggle && heroVideo) {
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();

            if (heroVideo.muted) {
                heroVideo.muted = false;
                heroVideo.play().then(() => {
                    if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
                    if (soundLabel) soundLabel.textContent = 'MUTE REEL';
                }).catch(err => console.log(err));
            } else {
                heroVideo.muted = true;
                if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
                if (soundLabel) soundLabel.textContent = 'UNMUTE REEL';
            }
        });
    }


    // ================= 4. NAVBAR SCROLL BACKGROUND TOGGLE =================
    window.addEventListener('scroll', () => {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (navbarPlaceholder) {
            if (window.scrollY > 50) {
                navbarPlaceholder.classList.add('scrolled');
            } else {
                navbarPlaceholder.classList.remove('scrolled');
            }
        }
    });


    // ================= 5. SCROLL ANIMATION FOR SECTIONS =================
    const animatedElements = document.querySelectorAll('.animate-top-bottom, .animate-right-left');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => sectionObserver.observe(el));


    // ================= 6. EXPERTISE SECTION SCROLL ANIMATION & DOTTED PATH =================
    const expertiseElements = document.querySelectorAll('.expertise-section .animate-from-left, .expertise-section .animate-from-right');

    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    expertiseElements.forEach(el => expertiseObserver.observe(el));

    // Dotted line: cards ki actual position se path banata hai
    const pathSvg = document.querySelector('.expertise-path-svg');
    const expertisePath = document.getElementById('expertisePath');
    const expertiseContainer = document.querySelector('.expertise-container');

    if (pathSvg && expertisePath && expertiseContainer) {
        // SVG ko container ke andar le aao (HTML change ki zarurat nahi)
        expertiseContainer.prepend(pathSvg);

        const drawExpertisePath = () => {
            const cards = expertiseContainer.querySelectorAll('.expert-card');
            if (cards.length < 2) return;

            const w = expertiseContainer.offsetWidth;
            const h = expertiseContainer.offsetHeight;
            pathSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            pathSvg.setAttribute('preserveAspectRatio', 'none');

            let d = '';
            for (let i = 0; i < cards.length - 1; i++) {
                const a = cards[i];
                const b = cards[i + 1];

                const x1 = a.offsetLeft + a.offsetWidth / 2;
                const y1 = a.offsetTop + a.offsetHeight;
                const x2 = b.offsetLeft + b.offsetWidth / 2;
                const y2 = b.offsetTop;
                const gap = (y2 - y1) * 0.6;

                d += `M ${x1} ${y1} C ${x1} ${y1 + gap}, ${x2} ${y2 - gap}, ${x2} ${y2} `;
            }
            expertisePath.setAttribute('d', d);
        };

        drawExpertisePath();
        window.addEventListener('load', drawExpertisePath);
        window.addEventListener('resize', drawExpertisePath);
        new ResizeObserver(drawExpertisePath).observe(expertiseContainer);
    }

});

//=====================mobile====================

window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenu) {
        mobileMenu.classList.toggle('active');

        if (menuIcon) {
            if (mobileMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        }
    }
};

window.closeMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        if (menuIcon) {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }
};

// ================= CERTIFICATION CARDS: TAP TO FLIP =================
document.addEventListener("DOMContentLoaded", function () {
    const certCards = document.querySelectorAll(".cert-flip-card");

    certCards.forEach((card) => {
        card.addEventListener("click", function (e) {
            if (e.target.closest(".view-pdf-btn")) {
                return;
            }
            this.classList.toggle("is-flipped");
        });
    });
});