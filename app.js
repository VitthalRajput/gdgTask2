// For Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Smooth scrolling for anchor links
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll animation with direction detection
        const scrollElements = document.querySelectorAll('.scroll-element');
        
        // Track scroll direction
        let lastScrollY = window.scrollY;
        let scrollDirection = 'down';
        
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return (
                elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
            );
        };
        
        const handleScrollAnimation = () => {
            const currentScrollY = window.scrollY;
            scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            lastScrollY = currentScrollY;
            
            scrollElements.forEach(el => {
                if (elementInView(el, 1.2)) {
                    if (scrollDirection === 'down') {
                        el.classList.add('active');
                        el.classList.remove('inactive');
                    } else {
                        // Keep elements active when scrolling up if they're still in view
                        if (elementInView(el, 1.5)) {
                            el.classList.add('active');
                            el.classList.remove('inactive');
                        }
                    }
                } else {
                    if (scrollDirection === 'up') {
                        el.classList.remove('active');
                        el.classList.add('inactive');
                    }
                }
            });
        };
        
        // Initialize elements as inactive for long
        scrollElements.forEach(el => {
            el.classList.add('inactive');
        });
        
        window.addEventListener('scroll', () => {
            handleScrollAnimation();
        });
        
        // Initial check on page load so far
        window.addEventListener('load', () => {
            handleScrollAnimation();
        });