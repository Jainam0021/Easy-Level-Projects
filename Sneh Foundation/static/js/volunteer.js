// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll to form
function scrollToForm() {
    const formSection = document.getElementById('volunteer-form');
    formSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Form submission with WhatsApp integration
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const skills = formData.get('skills');
    const availability = formData.get('availability');
    
    // Create WhatsApp message
    const message = `Hi, I would like to apply as a volunteer. 
My name is ${name}, I can help with ${skills || 'various activities'}. 
My availability is ${availability}. 
You can reach me at ${email} or ${phone}.`;
    
    // WhatsApp number (replace with your foundation's WhatsApp number)
    const whatsappNumber = '919876543210';
    const whatsappUrl = `https://wa.me/${9875147657}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('Application sent! Check WhatsApp for confirmation.', 'success');
    
    // Reset form
    this.reset();
});

// Testimonial Carousel
let currentTestimonial = 1;
const totalTestimonials = 3;

function showTestimonial(n) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[n - 1].classList.add('active');
    dots[n - 1].classList.add('active');
}

function currentSlide(n) {
    currentTestimonial = n;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = currentTestimonial >= totalTestimonials ? 1 : currentTestimonial + 1;
    showTestimonial(currentTestimonial);
}, 5000);

// WhatsApp floating button functionality
function openWhatsApp() {
    const message = "Hi! I'm interested in learning more about volunteering opportunities with Sneh Foundation.";
    const whatsappNumber = '919876543210';
    const whatsappUrl = `https://wa.me/${9875147657}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form input animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Button hover effects
document.querySelectorAll('.cta-button, .cta-button-large, .submit-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Card hover effects
document.querySelectorAll('.benefit-card, .support-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyles);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.benefit-card, .support-card, .section-title').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .benefit-card,
    .support-card,
    .section-title {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .benefit-card.animate-in,
    .support-card.animate-in,
    .section-title.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Form validation
function validateForm() {
    const form = document.getElementById('volunteerForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Real-time form validation
document.querySelectorAll('input[required], select[required]').forEach(input => {
    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '#e74c3c';
            showNotification('Please fill in all required fields', 'error');
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#e0e0e0';
        }
    });
});

// Add error notification style
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .notification-error {
        background: #e74c3c !important;
    }
`;
document.head.appendChild(errorStyles);

// Keyboard navigation for testimonials
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        currentTestimonial = currentTestimonial <= 1 ? totalTestimonials : currentTestimonial - 1;
        showTestimonial(currentTestimonial);
    } else if (e.key === 'ArrowRight') {
        currentTestimonial = currentTestimonial >= totalTestimonials ? 1 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    }
});

// Touch gestures for testimonials on mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.testimonial-carousel').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.testimonial-carousel').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next testimonial
            currentTestimonial = currentTestimonial >= totalTestimonials ? 1 : currentTestimonial + 1;
        } else {
            // Swipe right - previous testimonial
            currentTestimonial = currentTestimonial <= 1 ? totalTestimonials : currentTestimonial - 1;
        }
        showTestimonial(currentTestimonial);
    }
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Sneh Foundation Volunteer Page - JavaScript loaded successfully!');

