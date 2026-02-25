// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (!carouselTrack) return;

    let isPaused = false;

    // Pause on hover (desktop)
    carouselTrack.addEventListener('mouseenter', function() {
        isPaused = true;
        carouselTrack.style.animationPlayState = 'paused';
    });

    carouselTrack.addEventListener('mouseleave', function() {
        isPaused = false;
        carouselTrack.style.animationPlayState = 'running';
    });

    // Pause on touch/tap (mobile)
    let touchStartTime = 0;
    
    carouselTrack.addEventListener('touchstart', function() {
        touchStartTime = Date.now();
        isPaused = true;
        carouselTrack.style.animationPlayState = 'paused';
    });

    carouselTrack.addEventListener('touchend', function() {
        const touchDuration = Date.now() - touchStartTime;
        
        // Resume after a short delay if it was a tap (not a scroll)
        if (touchDuration < 200) {
            setTimeout(function() {
                if (isPaused) {
                    isPaused = false;
                    carouselTrack.style.animationPlayState = 'running';
                }
            }, 1500);
        } else {
            isPaused = false;
            carouselTrack.style.animationPlayState = 'running';
        }
    });

    // Handle visibility change (pause when tab is not visible)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            carouselTrack.style.animationPlayState = 'paused';
        } else if (!isPaused) {
            carouselTrack.style.animationPlayState = 'running';
        }
    });

    // Smooth entrance animation for screen cards
    const screenCards = document.querySelectorAll('.screen-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    screenCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // Parallax effect removed to prevent footer floating issues

    // Preload images for smoother experience
    const images = document.querySelectorAll('.screen-image');
    images.forEach(function(img) {
        const src = img.getAttribute('src');
        const preloadImg = new Image();
        preloadImg.src = src;
    });

    // Add loading state
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Optional: CTA button interaction enhancement
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        // Add ripple effect on click
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    }
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
