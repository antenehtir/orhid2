// Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
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
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the category from data attribute
            const category = this.getAttribute('data-category');
            
            // Filter sections
            filterSections(category);
            
            // Scroll to the first visible section
            const firstVisible = document.querySelector('.menu-section:not(.hidden)');
            if (firstVisible) {
                window.scrollTo({
                    top: firstVisible.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu Item Animation on Scroll
    const observerOptions = {
        threshold: 0.1,
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
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    // Today's Special Highlight
    const todaySpecial = document.querySelector('.today-special');
    if (todaySpecial) {
        setInterval(() => {
            todaySpecial.style.boxShadow = todaySpecial.style.boxShadow ? '' : '0 0 20px rgba(245, 162, 93, 0.5)';
        }, 1000);
    }
    
    // Price formatting
    document.querySelectorAll('.item-price').forEach(priceElement => {
        const price = parseFloat(priceElement.textContent);
        priceElement.textContent = price.toFixed(2);
    });

    // Payment method hover effect enhancement
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});