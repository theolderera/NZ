// Enhanced Birthday Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initFloatingHearts();
    initNavbarEffects();
    initScrollAnimations();
    initInteractiveElements();
    initParallaxEffects();
    initTypingEffect();
    initConfettiEffect();
    
    // Floating Hearts Animation
    function initFloatingHearts() {
        const heartsContainer = document.getElementById('heartsContainer');
        const heartSymbols = ['💖', '💕', '💗', '💓', '💝', '🌸', '🌺', '✨', '⭐', '💫'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            // Random position and properties
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            // Add some color variation
            const colors = ['#ff6b9d', '#d63384', '#ffc3e1', '#ff8fab'];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 15000);
        }
        
        // Create hearts at intervals
        setInterval(createHeart, 1500);
        
        // Create initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 300);
        }
    }
    
    // Navbar Effects
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(255, 107, 157, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 157, 0.1)';
            }
        });
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Add ripple effect
                addRippleEffect(link, e);
            });
        });
    }
    
    // Ripple Effect
    function addRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple CSS
    const rippleCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 107, 157, 0.3);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add specific animations for different elements
                    if (entry.target.classList.contains('celebration-card')) {
                        entry.target.style.animation = 'bounceIn 0.8s ease forwards';
                    }
                    
                    if (entry.target.classList.contains('memory-card')) {
                        entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
                    }
                    
                    if (entry.target.classList.contains('gallery-card')) {
                        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.celebration-card, .memory-card, .gallery-card, .wish-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }
    
    // Interactive Elements
    function initInteractiveElements() {
        // Add hover sound effect (visual feedback)
        const interactiveElements = document.querySelectorAll('.celebration-card, .memory-card, .gallery-card, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'all 0.3s ease';
            });
        });
        
        // Interactive wish list items
        const wishItems = document.querySelectorAll('.wish-list li');
        wishItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = `pulse 0.5s ease, slideInList 0.6s ease forwards`;
                }, 10);
            });
        });
        
        // Add click effect to celebration emojis
        const emojis = document.querySelectorAll('.celebration-emoji .emoji');
        emojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                emoji.style.animation = 'none';
                setTimeout(() => {
                    emoji.style.animation = 'bounce 0.6s ease, rotate 1s linear';
                }, 10);
                
                // Create sparkle effect
                createSparkleEffect(emoji);
            });
        });
    }
    
    // Sparkle Effect
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + rect.width / 2) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.fontSize = '20px';
            sparkle.style.animation = `sparkleAnimation 1s ease-out forwards`;
            
            const angle = (Math.PI * 2 * i) / 6;
            const distance = 50 + Math.random() * 30;
            sparkle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            sparkle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    // Add sparkle animation CSS
    const sparkleCSS = `
        @keyframes sparkleAnimation {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 1;
            }
            50% {
                transform: translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5)) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--end-x), var(--end-y)) scale(0);
                opacity: 0;
            }
        }
    `;
    
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = sparkleCSS;
    document.head.appendChild(sparkleStyle);
    
    // Parallax Effects
    function initParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-section');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    // Typing Effect for Birthday Message
    function initTypingEffect() {
        const finalTitle = document.querySelector('.final-title');
        if (finalTitle) {
            const text = finalTitle.textContent;
            finalTitle.textContent = '';
            let i = 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeText();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(finalTitle);
            
            function typeText() {
                if (i < text.length) {
                    finalTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeText, 100);
                } else {
                    finalTitle.style.animation = 'pulse 2s ease-in-out infinite';
                }
            }
        }
    }
    
    // Confetti Effect
    function initConfettiEffect() {
        function createConfetti() {
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '9999';
            
            const colors = ['#ff6b9d', '#d63384', '#ffc3e1', '#ff8fab', '#fff'];
            const shapes = ['🎊', '🎉', '🎈', '💖', '⭐'];
            
            for (let i = 0; i < 50; i++) {
                const confettiPiece = document.createElement('div');
                confettiPiece.innerHTML = Math.random() > 0.5 ? 
                    shapes[Math.floor(Math.random() * shapes.length)] : '●';
                confettiPiece.style.position = 'absolute';
                confettiPiece.style.left = Math.random() * 100 + '%';
                confettiPiece.style.color = colors[Math.floor(Math.random() * colors.length)];
                confettiPiece.style.fontSize = (Math.random() * 15 + 10) + 'px';
                confettiPiece.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
                
                confettiContainer.appendChild(confettiPiece);
            }
            
            document.body.appendChild(confettiContainer);
            
            setTimeout(() => {
                confettiContainer.remove();
            }, 5000);
        }
        
        // Add confetti CSS
        const confettiCSS = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = confettiCSS;
        document.head.appendChild(confettiStyle);
        
        // Trigger confetti on page load
        setTimeout(createConfetti, 1000);
        
        // Add confetti trigger to main title click
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.addEventListener('click', createConfetti);
            mainTitle.style.cursor = 'pointer';
        }
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-arrow');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#celebration').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Mobile touch effects
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.celebration-card, .memory-card, .gallery-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = '';
            });
        });
    }
    
    // Performance optimization
    let ticking = false;
    
    function updateAnimations() {
        // Batch DOM updates here if needed
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
    
    // Add some Easter eggs
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            const message = document.createElement('div');
            message.innerHTML = '🎉 You found the hidden surprise! 🎉';
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = 'linear-gradient(135deg, #ff6b9d, #d63384)';
            message.style.color = 'white';
            message.style.padding = '20px 40px';
            message.style.borderRadius = '25px';
            message.style.fontSize = '1.2rem';
            message.style.fontWeight = 'bold';
            message.style.zIndex = '99999';
            message.style.animation = 'bounceIn 0.5s ease';
            message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => message.remove(), 500);
            }, 2000);
            
            clickCount = 0;
        }
    });
    
    // Add fade out animation
    const fadeOutCSS = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = fadeOutCSS;
    document.head.appendChild(fadeOutStyle);
    
    console.log('🎉 Happy Birthday Nazira! 🎂 This website was made with lots of care and attention to detail!');
});

// Add some extra interactive features
document.addEventListener('keydown', (e) => {
    // Secret key combinations
    if (e.key === 'b' || e.key === 'B') {
        // Create birthday sparkles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'fixed';
                sparkle.style.left = Math.random() * window.innerWidth + 'px';
                sparkle.style.top = Math.random() * window.innerHeight + 'px';
                sparkle.style.fontSize = '24px';
                sparkle.style.zIndex = '9999';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'fadeOut 2s ease forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 2000);
            }, i * 100);
        }
    }
});