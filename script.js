// ===================================
// Navigation Functionality
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Typing Animation
// ===================================

const typingText = document.getElementById('typingText');
const textToType = "Cyber Security Enthusiast | Web Developer | Innovator";
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!isDeleting && charIndex < textToType.length) {
        // Typing forward
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        typingSpeed = 100;
        setTimeout(typeText, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        // Deleting backward
        typingText.textContent = textToType.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
        setTimeout(typeText, typingSpeed);
    } else if (charIndex === textToType.length) {
        // Pause at end before deleting
        isDeleting = true;
        setTimeout(typeText, 2000);
    } else if (charIndex === 0) {
        // Start typing again
        isDeleting = false;
        setTimeout(typeText, 500);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// ===================================
// Scroll Reveal Animation
// ===================================

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Validation
// ===================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName() {
    const nameError = document.getElementById('nameError');
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        nameInput.style.borderColor = '#ff4444';
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.style.borderColor = '#ff4444';
        return false;
    } else {
        nameError.textContent = '';
        nameInput.style.borderColor = 'var(--primary-color)';
        return true;
    }
}

function validateEmail() {
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        emailInput.style.borderColor = '#ff4444';
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.style.borderColor = '#ff4444';
        return false;
    } else {
        emailError.textContent = '';
        emailInput.style.borderColor = 'var(--primary-color)';
        return true;
    }
}

function validateMessage() {
    const messageError = document.getElementById('messageError');
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
        messageError.textContent = 'Message is required';
        messageInput.style.borderColor = '#ff4444';
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.style.borderColor = '#ff4444';
        return false;
    } else {
        messageError.textContent = '';
        messageInput.style.borderColor = 'var(--primary-color)';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';

        // Reset form
        contactForm.reset();
        nameInput.style.borderColor = 'rgba(0, 188, 212, 0.2)';
        emailInput.style.borderColor = 'rgba(0, 188, 212, 0.2)';
        messageInput.style.borderColor = 'rgba(0, 188, 212, 0.2)';

        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // In a real application, you would send the form data to a server here
        // Example: fetch('/api/contact', { method: 'POST', body: formData })
    } else {
        // Show error message
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Please fix the errors above and try again.';

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(revealOnScroll, 20));

// ===================================
// Accessibility Enhancements
// ===================================

// Keyboard navigation for hamburger menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Focus trap for mobile menu when open
const focusableElements = 'a[href], button, textarea, input, select';
let firstFocusableElement, lastFocusableElement;

hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
        const focusables = navLinks.querySelectorAll(focusableElements);
        firstFocusableElement = focusables[0];
        lastFocusableElement = focusables[focusables.length - 1];
    }
});

document.addEventListener('keydown', (e) => {
    if (!navLinks.classList.contains('active')) return;

    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    }

    // Close menu on Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
        hamburger.focus();
    }
});

// ===================================
// Console Easter Egg
// ===================================

console.log('%c👨‍💻 Welcome to my portfolio!', 'color: #00bcd4; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check it out on GitHub!', 'color: #00bcd4; font-size: 14px;');
console.log('%chttps://github.com/JassSangale', 'color: #00e5ff; font-size: 14px;');
