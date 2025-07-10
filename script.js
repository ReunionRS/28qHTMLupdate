// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        } else {
            mobileMenu.classList.add('active');
        }
    }
}

// Cases filter
function filterCases(category) {
    const cases = document.querySelectorAll('.case-card');
    const buttons = document.querySelectorAll('.filter-button');
    
    // Update button states
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter cases
    cases.forEach(caseCard => {
        const categories = caseCard.dataset.category ? caseCard.dataset.category.split(' ') : [];
        if (category === 'all' || categories.includes(category)) {
            caseCard.style.display = 'block';
        } else {
            caseCard.style.display = 'none';
        }
    });
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        project_type: formData.get('project_type'),
        budget: formData.get('budget'),
        message: formData.get('message')
    };
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Спасибо за заявку! Мы свяжемся с вами в течение часа.');
    
    // Reset form
    event.target.reset();
}

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
function initAnimations() {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu-list a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (mobileMenu && navToggle) {
        if (!mobileMenu.contains(event.target) && !navToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Enhanced form submission with validation
function enhancedSubmitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const phone = formData.get('phone');
    
    if (!name || name.trim().length < 2) {
        alert('Пожалуйста, введите корректное имя');
        return;
    }
    
    if (!email || !validateEmail(email)) {
        alert('Пожалуйста, введите корректный email');
        return;
    }
    
    if (phone && !validatePhone(phone)) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    if (!message || message.trim().length < 10) {
        alert('Пожалуйста, опишите ваш проект подробнее (минимум 10 символов)');
        return;
    }
    
    // If validation passes, submit the form
    submitForm(event);
}