// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    body.appendChild(menuOverlay);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });
    
    // Close menu when clicking a link
    const menuNavLinks = document.querySelectorAll('nav ul li a');
    menuNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
    
    // Add animations to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .blog-card, .testimonial, .section-title, .hero-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Add typing animation to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Blog search functionality
    const searchInput = document.getElementById('search-blogs');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Category filter functionality
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            const category = this.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            if (category === 'all') {
                blogCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            blogCards.forEach(card => {
                const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();
                
                if (cardCategory.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Animate counter numbers
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCounter = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCounter, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const formParent = form.parentElement;
                form.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<h3>Thank you!</h3><p>Your submission has been received. Weil get back to you soon .</p>';
                
                formParent.appendChild(successMessage);
                
                // Reset form
                form.reset();
            }
        });
    });
});
