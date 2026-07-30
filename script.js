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


    // ================= 3. AUTO-UNMUTE ON FIRST USER CLICK =================
    const heroVideo = document.getElementById('heroVideo');
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    const soundLabel = document.getElementById('soundLabel');

    // Enable Sound on First Click Anywhere on Page
    const enableAudio = () => {
        if (heroVideo && heroVideo.muted) {
            heroVideo.muted = false;
            heroVideo.play().then(() => {
                if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
                if (soundLabel) soundLabel.textContent = 'MUTE REEL';
            }).catch(err => console.log(err));
        }
        // Remove listener once audio is enabled
        document.removeEventListener('click', enableAudio);
    };

    document.addEventListener('click', enableAudio);


    // ================= 4. MANUAL MUTE / UNMUTE BUTTON TOGGLE =================
    if (soundToggle && heroVideo) {
        soundToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering document click
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


    // ================= 5. NAVBAR SCROLL BACKGROUND TOGGLE =================
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

});

// ================= 7. SCROLL ANIMATION FOR ABOUT SECTION =================
    const animatedElements = document.querySelectorAll('.animate-top-bottom, .animate-right-left');

    const observerOptions = {
        threshold: 0.2 // Section ka 20% dikhte hi animation start ho jayegi
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => sectionObserver.observe(el));

    // ================= EXPERTISE SECTION SCROLL ANIMATION & DOTTED PATH =================
    const expertiseElements = document.querySelectorAll('.expertise-section .animate-from-left, .expertise-section .animate-from-right');
    const expertisePath = document.getElementById('expertisePath');

    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.25 });

    expertiseElements.forEach(el => expertiseObserver.observe(el));

    // Scroll Position ke saath Dotted Line Path Darken & Fill karne ka logic
    window.addEventListener('scroll', () => {
        const expertiseSection = document.getElementById('expertise');
        if (!expertiseSection || !expertisePath) return;

        const rect = expertiseSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress calculation inside expertise section
        if (rect.top < windowHeight && rect.bottom > 0) {
            const totalHeight = rect.height;
            const progress = (windowHeight - rect.top) / (windowHeight + totalHeight);
            
            // Path stroke opacity and dash offset adjustment
            const opacityValue = Math.min(Math.max(progress * 1.5, 0.3), 1);
            expertisePath.style.opacity = opacityValue;
            
            if (opacityValue > 0.6) {
                expertisePath.style.stroke = "#000000"; // Darken to solid black when scrolling
            } else {
                expertisePath.style.stroke = "#121212";
            }
        }
    });