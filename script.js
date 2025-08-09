// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navHamburger = document.getElementById('nav-hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    // Sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-item a');

    // Handle scroll effect on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle mobile menu toggle
    navHamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navHamburger.classList.toggle('active');
    });

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            navMenu.classList.remove('active');
            navHamburger.classList.remove('active');
        });
    });

    // Sidebar link smooth scroll and highlight
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta, .pricing-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.onclick) return; // Skip if button has custom onclick
            
            e.preventDefault();
            const orderSection = document.getElementById('order');
            if (orderSection) {
                const offsetTop = orderSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlighting for both nav and sidebar
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click tracking for analytics (placeholder)
function trackButtonClick(buttonName) {
    // Placeholder for analytics tracking
    console.log(`Button clicked: ${buttonName}`);
}

// Add form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add smooth reveal animations for pricing cards
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    const pricingObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        pricingObserver.observe(card);
    });
});

// Typing animation for hero alternate text
const heroWords = ["Resume", "Website"];
const heroAlternateText = document.getElementById("hero-alternate-text");
let heroWordIndex = 0;
let charIndex = 0;
let typing = true;

function typeHeroWord() {
    if (!heroAlternateText) return;
    if (typing) {
        if (charIndex < heroWords[heroWordIndex].length) {
            heroAlternateText.textContent += heroWords[heroWordIndex][charIndex];
            charIndex++;
            setTimeout(typeHeroWord, 80);
        } else {
            typing = false;
            setTimeout(typeHeroWord, 2500);
        }
    } else {
        if (charIndex > 0) {
            heroAlternateText.textContent = heroAlternateText.textContent.slice(0, -1);
            charIndex--;
            setTimeout(typeHeroWord, 40);
        } else {
            typing = true;
            heroWordIndex = (heroWordIndex + 1) % heroWords.length;
            setTimeout(typeHeroWord, 400);
        }
    }
}
typeHeroWord();

// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarToggleIcon = document.getElementById('sidebar-toggle-icon');

if (sidebar && sidebarToggle && sidebarToggleIcon) {
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('closed');
        if (sidebar.classList.contains('open')) {
            sidebarToggleIcon.classList.remove('fa-chevron-right');
            sidebarToggleIcon.classList.add('fa-times');
        } else {
            sidebarToggleIcon.classList.remove('fa-times');
            sidebarToggleIcon.classList.add('fa-chevron-right');
        }
    });
}
