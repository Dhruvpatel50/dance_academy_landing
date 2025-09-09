document.addEventListener('DOMContentLoaded', function () {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // --- 1. PRELOADER ANIMATION ---
    const preloader = document.getElementById('preloader');
    const loaderText = preloader.querySelector('.loader-text');

    const preloaderTl = gsap.timeline();
    preloaderTl
        .from(loaderText, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
        .to(loaderText, { y: -50, opacity: 0, duration: 1, ease: 'power3.in' }, "+=0.5")
        .to(preloader, { opacity: 0, duration: 0.5, onComplete: () => preloader.style.display = 'none' });

    // --- 2. CUSTOM CURSOR ---
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        gsap.to(cursorDot, { duration: 0.1, x: posX, y: posY });
        gsap.to(cursorOutline, { duration: 0.3, x: posX, y: posY, ease: 'power2.out' });
    });
    
    // Show cursor when mouse enters the viewport
    document.addEventListener('mouseenter', () => {
        gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 1 });
    });

    // Hide cursor when mouse leaves the viewport
    document.addEventListener('mouseleave', () => {
        gsap.to([cursorDot, cursorOutline], { duration: 0.3, opacity: 0 });
    });
    
    // Animate cursor on link/button hover
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("mouseenter", () => {
            gsap.to(cursorOutline, {
                duration: 0.3,
                scale: 1.5,
                backgroundColor: 'rgba(212, 175, 55, 0.3)',
                borderColor: 'transparent'
            });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(cursorOutline, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: '#D4AF37'
            });
        });
    });

    // --- 3. HERO SECTION ANIMATION ---
    const heroTl = gsap.timeline({ delay: 2.5 }); // Delay to start after preloader

    const heroTitle = new SplitText(".hero-title", { type: "lines, words" });

    heroTl
        .from(".hero-img-container", { scale: 1.2, opacity: 0, duration: 1.5, ease: 'power4.out' })
        .from(heroTitle.words, {
            y: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: 'power4.out'
        }, "-=1.2")
        .from(".hero-p, .hero-btn", {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        }, "-=0.8");

    // --- 4. SCROLL-TRIGGERED ANIMATIONS ---
    
    // Section Title Reveals
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.fromTo(text, 
            { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
            {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                duration: 1.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%',
                }
            }
        );
    });
    
    // About Cards Stagger
    gsap.from(".about-card", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: ".about-card",
            start: "top 90%",
        }
    });

    // Faculty Cards Stagger and Image zoom
    document.querySelectorAll('.faculty-card').forEach(card => {
        const img = card.querySelector('img');
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            }
        });

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(img, { scale: 1.1, duration: 0.5, ease: 'power2.out' });

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
    });
    
    // --- 5. SWIPER INITIALIZATION ---
    new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    // --- 6. STICKY HEADER ---
    const header = document.querySelector('header');
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: self => {
            if (self.direction === -1) { // Scrolling up
                header.classList.remove('bg-black/80', 'backdrop-blur-sm');
            } else { // Scrolling down
                header.classList.add('bg-black/80', 'backdrop-blur-sm');
            }
        }
    });

});
