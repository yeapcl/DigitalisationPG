// Enhanced functionality for the Modern Landing Page

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner"></div>
    `;
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 800);
});

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.innerText.replace('+', '');
        const count = 0;
        const speed = 200; // Lower is faster
        
        const updateCount = () => {
            const increment = target / speed;
            const currentCount = +count;
            
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment) + '+';
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-content')) {
                animateCounters();
            }
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements to observe
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Observe about section specifically for counter animation
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});

// Enhanced form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameField = contactForm.querySelector('input[type="text"]');
        const emailField = contactForm.querySelector('input[type="email"]');
        const messageField = contactForm.querySelector('textarea');
        
        // Simple validation
        let isValid = true;
        
        if (!nameField.value.trim()) {
            markInvalid(nameField, 'Please enter your name');
            isValid = false;
        } else {
            markValid(nameField);
        }
        
        if (!emailField.value.trim()) {
            markInvalid(emailField, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            markInvalid(emailField, 'Please enter a valid email');
            isValid = false;
        } else {
            markValid(emailField);
        }
        
        if (!messageField.value.trim()) {
            markInvalid(messageField, 'Please enter your message');
            isValid = false;
        } else {
            markValid(messageField);
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

// Form validation helpers
function markInvalid(field, message) {
    field.classList.add('invalid');
    
    // Create or update error message
    let errorMessage = field.nextElementSibling;
    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    errorMessage.textContent = message;
}

function markValid(field) {
    field.classList.remove('invalid');
    
    // Remove error message if it exists
    const errorMessage = field.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Testimonial slider functionality
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
}

// Only initialize if there are multiple testimonials
if (testimonials.length > 1) {
    // Create navigation buttons
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const navButtons = document.createElement('div');
    navButtons.className = 'testimonial-nav';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.className = 'testimonial-prev';
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.className = 'testimonial-next';
    
    navButtons.appendChild(prevButton);
    navButtons.appendChild(nextButton);
    testimonialsContainer.appendChild(navButtons);
    
    // Add event listeners
    prevButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });
    
    nextButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });
    
    // Show first testimonial initially
    showTestimonial(0);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }, 5000);
}

// Theme switcher
function addThemeToggle() {
    const header = document.querySelector('header .header-inner');
    
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    header.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', addThemeToggle);
