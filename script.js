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

    // Global document click listener REMOVED so clicks on buttons/links won't auto-unmute the video.

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

    const observerOptions = {
        threshold: 0.15 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => sectionObserver.observe(el));


    // ================= 6. EXPERTISE SECTION SCROLL ANIMATION & DOTTED PATH =================
    const expertiseElements = document.querySelectorAll('.expertise-section .animate-from-left, .expertise-section .animate-from-right');
    const expertisePath = document.getElementById('expertisePath');

    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    expertiseElements.forEach(el => expertiseObserver.observe(el));

    // Scroll Position ke saath Dotted Line Path 
    window.addEventListener('scroll', () => {
        const expertiseSection = document.getElementById('expertise');
        if (!expertiseSection || !expertisePath) return;

        const rect = expertiseSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const progress = (windowHeight - rect.top) / (windowHeight + totalHeight);
            
            const opacityValue = Math.min(Math.max(progress * 1.5, 0.3), 1);
            expertisePath.style.opacity = opacityValue;
            
            if (opacityValue > 0.6) {
                expertisePath.style.stroke = "#000000";
            } else {
                expertisePath.style.stroke = "#121212";
            }
        }
    });

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
document.addEventListener("DOMContentLoaded", function () {
    const certCards = document.querySelectorAll(".cert-flip-card");

    certCards.forEach((card) => {
        card.addEventListener("click", function (e) {
           
            if (e.target.closest(".view-pdf-btn")) {
                return;
            }
            
            // Toggle 'is-flipped' class on tap/click
            this.classList.toggle("is-flipped");
        });
    });
});