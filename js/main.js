document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effects
    initCustomCursor();
    
    // Initialize animations
    initRevealAnimations();
    
    // Add particle background effect
    initParticleBackground();
    
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Enhanced sticky header with transition effects
    const header = document.querySelector('.sticky-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                document.body.classList.add('header-scrolled');
            } else {
                header.classList.remove('scrolled');
                document.body.classList.remove('header-scrolled');
            }
            
            // Parallax scroll effect for hero section
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const scrollValue = window.scrollY;
                heroSection.style.backgroundPositionY = scrollValue * 0.5 + 'px';
            }
        });
    }
    
    // Enhanced testimonial slider with smooth transitions
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;
    
    if (testimonials.length > 0 && prevButton && nextButton) {
        // Create progress indicators
        const progressContainer = document.createElement('div');
        progressContainer.className = 'testimonial-progress';
        
        testimonials.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = index === 0 ? 'active' : '';
            indicator.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
            progressContainer.appendChild(indicator);
        });
        
        testimonialSlider.parentNode.appendChild(progressContainer);
        
        // Set up initial state
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.opacity = 0;
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show a specific testimonial with enhanced animation
        function showTestimonial(index) {
            // Update progress indicators
            document.querySelectorAll('.testimonial-progress span').forEach((indicator, i) => {
                indicator.className = i === index ? 'active' : '';
            });
            
            // Fade out current testimonial
            testimonials[currentTestimonial].style.opacity = 0;
            
            setTimeout(() => {
                // Hide all testimonials
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'none';
                });
                
                // Show and fade in the selected testimonial
                testimonials[index].style.display = 'block';
                setTimeout(() => {
                    testimonials[index].style.opacity = 1;
                }, 50);
            }, 300);
        }
        
        // Event listeners for next and previous buttons with enhanced feedback
        nextButton.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        prevButton.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
        
        // Auto-rotate testimonials with smoother transitions
        let testimonialInterval = setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 7000);
        
        // Pause rotation on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(function() {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 7000);
        });
    }
    
    // Interactive feature cards with hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            featureCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Add 3D tilt effect
            card.addEventListener('mousemove', handleTilt);
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove tilt effect
            card.removeEventListener('mousemove', handleTilt);
            card.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        });
    });
    
    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const angleX = (e.clientY - cardCenterY) / 15;
        const angleY = (cardCenterX - e.clientX) / 15;
        
        card.style.transform = `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    }
    
    // Enhanced newsletter form with validation and animation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        
        emailInput.addEventListener('input', function() {
            const isValid = this.checkValidity();
            if (isValid) {
                submitButton.classList.add('ready');
            } else {
                submitButton.classList.remove('ready');
            }
        });
        
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (emailInput.value) {
                // Add success animation
                this.classList.add('success');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for subscribing!';
                
                this.appendChild(successMessage);
                
                // Reset form after delay
                setTimeout(() => {
                    emailInput.value = '';
                    this.classList.remove('success');
                    successMessage.remove();
                    submitButton.classList.remove('ready');
                }, 3000);
            }
        });
    }
    
    // Smooth scrolling with enhanced easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add click effect to the anchor
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 300);
                
                // Calculate scroll position with offset
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                // Smooth scroll with cubic-bezier easing
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Initialize counters for stats
    initCounters();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize text scramble effect for hero heading
    initTextScramble();
    
    // Add animated gradient background to buttons
    initAnimatedButtons();
});

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', e => {
        // Use requestAnimationFrame for smoother cursor movement
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add slight delay to dot for trailing effect
            setTimeout(() => {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            }, 50);
        });
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .blog-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
        });
    });
}

// Particle background effect
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-background';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Resize canvas when window size changes
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    // Particle settings
    const particleCount = 100;
    const particles = [];
    const connectionDistance = 150;
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25,
            size: Math.random() * 3 + 1
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            
            // Move particles
            p.x += p.vx;
            p.y += p.vy;
            
            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor;
            ctx.globalAlpha = 0.5;
            ctx.fill();
            
            // Connect particles
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = primaryColor;
                    ctx.globalAlpha = 0.2 * (1 - distance / connectionDistance);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Reveal animations on scroll
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
}

// Animated counters for statistics
function initCounters() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const startCounting = () => {
        statItems.forEach(item => {
            const target = parseInt(item.textContent);
            const suffix = item.textContent.replace(/[0-9]/g, '');
            let count = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 16);
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    item.textContent = target + suffix;
                    clearInterval(counter);
                } else {
                    item.textContent = Math.floor(count) + suffix;
                }
            }, 16);
        });
    };
    
    // Start counting when stats section comes into view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Parallax effects for various elements
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            element.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Text scramble effect for headings
function initTextScramble() {
    const heroHeading = document.querySelector('.animated-heading');
    
    if (heroHeading) {
        const originalText = heroHeading.textContent;
        const scrambleText = () => {
            const chars = '!<>-_\\/[]{}—=+*^?#________';
            let iteration = 0;
            const maxIterations = 15;
            
            const interval = setInterval(() => {
                heroHeading.textContent = originalText
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        };
        
        // Trigger the effect when the element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(scrambleText, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heroHeading);
    }
}
