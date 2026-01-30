// Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const backToTopBtn = document.querySelector('.back-to-top');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menuCategories = document.querySelector('.menu-categories');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Function to show all menu sections
    function showAllSections() {
        menuSections.forEach(section => {
            section.classList.remove('hidden');
        });
    }
    
    // Function to filter sections by category
    function filterSections(category) {
        menuSections.forEach(section => {
            if (category === 'all') {
                section.classList.remove('hidden');
            } else if (section.id === category) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }
    
    // Enhanced button click with visual feedback
    function activateButton(button) {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = '';
        });
        
        // Add active class to clicked button with animation
        button.classList.add('active');
        button.style.transform = 'scale(0.95)';
        
        // Reset transform after animation
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    // Enhanced menu item selection with visual effects
    function setupMenuItemSelection() {
        menuItems.forEach(item => {
            // Click event for menu items
            item.addEventListener('click', function() {
                // Remove selected class from all items
                menuItems.forEach(i => {
                    i.classList.remove('selected');
                    i.style.zIndex = '';
                });
                
                // Add selected class to clicked item
                this.classList.add('selected');
                this.style.zIndex = '20';
                
                // Add ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(245, 162, 93, 0.3);
                    transform: scale(0);
                    animation: itemRipple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Haptic feedback on mobile
                if (window.innerWidth < 768 && navigator.vibrate) {
                    navigator.vibrate(15);
                }
                
                // Auto-deselect after 3 seconds
                setTimeout(() => {
                    if (this.classList.contains('selected')) {
                        this.classList.remove('selected');
                        this.style.zIndex = '';
                    }
                }, 3000);
            });
            
            // Touch feedback for mobile
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.opacity = '0.95';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 200);
            });
            
            // Keyboard navigation support
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Add CSS for item ripple animation
    const itemRippleStyle = document.createElement('style');
    itemRippleStyle.textContent = `
        @keyframes itemRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(itemRippleStyle);
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        // Click event
        button.addEventListener('click', function() {
            activateButton(this);
            
            // Get the category from data attribute
            const category = this.getAttribute('data-category');
            
            // Filter sections
            filterSections(category);
            
            // Scroll to the first visible section
            const firstVisible = document.querySelector('.menu-section:not(.hidden)');
            if (firstVisible && window.innerWidth < 768) {
                setTimeout(() => {
                    window.scrollTo({
                        top: firstVisible.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
        
        // Touch feedback for mobile
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 200);
        });
    });
    
    // Menu Item Animation on Scroll
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all menu items
    menuItems.forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    // Today's Special Highlight with more visible animation
    const todaySpecial = document.querySelector('.today-special');
    if (todaySpecial) {
        let pulseInterval = setInterval(() => {
            todaySpecial.style.boxShadow = todaySpecial.style.boxShadow 
                ? '' 
                : '0 0 25px rgba(245, 162, 93, 0.6)';
        }, 1500);
        
        // Clear interval on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(pulseInterval);
        });
    }
    
    // Price formatting
    document.querySelectorAll('.item-price').forEach(priceElement => {
        const price = parseFloat(priceElement.textContent);
        priceElement.textContent = price.toFixed(2);
    });

    // Payment method interaction with touch feedback
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        method.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        method.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', () => {
        menuCategories.classList.toggle('mobile-open');
        mobileMenuToggle.innerHTML = menuCategories.classList.contains('mobile-open') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!menuCategories.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            menuCategories.classList.remove('mobile-open');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Swipe support for mobile category navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    menuCategories.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    menuCategories.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - scroll right
            menuCategories.scrollBy({ left: 100, behavior: 'smooth' });
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - scroll left
            menuCategories.scrollBy({ left: -100, behavior: 'smooth' });
        }
    }
    
    // Optimize for mobile performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth >= 768) {
                menuCategories.classList.remove('mobile-open');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }, 250);
    });
    
    // Add active state to CTA buttons on touch
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Prevent text selection on buttons during touch
    document.querySelectorAll('button, .cta-btn').forEach(element => {
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
    });
    
    // RATE US BUTTON ENHANCED FUNCTIONALITY
    const rateButtons = document.querySelectorAll('.cta-btn.rate-btn, .copyright a[href*="google.com/search"]');
    
    rateButtons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // If it's the main Rate Us button, add extra feedback
            if (this.classList.contains('rate-btn')) {
                // Briefly change the icon
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Redirecting...';
                this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                // Restore after 1.5 seconds if user doesn't leave page
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
                }, 1500);
            }
        });
        
        // Add hover/touch effect
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('rate-btn')) return;
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('rate-btn')) return;
            this.style.transform = '';
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize menu item selection
    setupMenuItemSelection();
    
    // Initialize first load
    if (window.innerWidth < 768) {
        // Auto-scroll active category into view on mobile
        setTimeout(() => {
            const activeBtn = document.querySelector('.category-btn.active');
            if (activeBtn) {
                activeBtn.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }, 500);
    }
    
    // Add haptic feedback for mobile if available
    function vibrate(ms = 10) {
        if (navigator.vibrate) {
            navigator.vibrate(ms);
        }
    }
    
    // Add vibration to category buttons on mobile
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                vibrate(10);
            }
        });
    });
    
    // Add vibration to Rate Us button
    document.querySelectorAll('.rate-btn, .copyright a[href*="google.com/search"]').forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                vibrate(20);
            }
        });
    });
    
    // Performance optimization for animations
    let lastScrollTop = 0;
    const scrollElements = document.querySelectorAll('.menu-item, .payment-method');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only check every 100ms for performance
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            scrollElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
                
                if (isVisible && !el.classList.contains('animated')) {
                    el.classList.add('animated');
                }
            });
            lastScrollTop = scrollTop;
        }
    }, { passive: true });
    
    // Add subtle parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.1;
        const bodyBg = document.querySelector('body::before');
        
        // Update CSS custom property for parallax
        document.documentElement.style.setProperty('--parallax-offset', `${rate}px`);
    });
});
