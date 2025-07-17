// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll - REMOVED to keep fixed background

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Ensure clicked nav links stay white
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active from all links
            navLinks.forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active to clicked link
            this.classList.add('active');
        });
    });
});

// Simple notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
          // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:saifulhoque30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        
        // Reset form
        this.reset();
        showNotification('Thank you for your message! Your email client should open with the message ready to send.', 'success');
    });
}

// Advanced typing effect with multiple texts
function multipleTypeWriter(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize multiple typing effect when page loads
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const texts = [
            'Kotlin Expert',
            'Senior Android Developer',
            'Jetpack Compose Enthusiast',
            'Mobile App Architect'
        ];
        setTimeout(() => {
            multipleTypeWriter(heroSubtitle, texts, 100, 50, 2000);
        }, 1000);
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn, .navbar-brand');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(20px);
    }
    
    .navbar-nav .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
    
    .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .progress-bar {
        transition: width 1.5s ease-in-out;
    }
    
    .hero-subtitle {
        border-right: 2px solid var(--primary-color);
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: var(--primary-color); }
        51%, 100% { border-color: transparent; }
    }
    
    .toast-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
    }
`;
document.head.appendChild(style);

// Loading screen fade out
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Refresh AOS after page load
    setTimeout(() => {
        AOS.refresh();
    }, 100);
});

// Dynamic CV Download Handler
document.addEventListener('DOMContentLoaded', () => {
    // Handle both the old CV button (if exists) and the new navigation CV button
    const cvButton = document.getElementById('cv-download-btn');
    const cvNavButton = document.getElementById('cv-download-nav');
    
    function handleCVDownload(e) {
        e.preventDefault();
        
        // Get the current location to build the proper CV path
        const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
        const cvPath = baseUrl + 'assets/documents/Gazi Md. Saiful Hoque CV.pdf';
        
        // Create a temporary link element for download
        const link = document.createElement('a');
        link.href = cvPath;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // For production (GitHub Pages), use the relative path
        if (window.location.protocol === 'https:' || window.location.hostname !== '') {
            link.href = 'assets/documents/Gazi Md. Saiful Hoque CV.pdf';
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Opening CV...', 'success');
    }
    
    if (cvButton) {
        cvButton.addEventListener('click', handleCVDownload);
    }
    
    if (cvNavButton) {
        cvNavButton.addEventListener('click', handleCVDownload);
    }
});

// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navClose = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Initialize Bootstrap Collapse
    let bsCollapse;
    if (navbarCollapse) {
        bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
    }
    
    function closeMobileNav() {
        if (bsCollapse) {
            bsCollapse.hide();
        }
        navbarCollapse.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    function openMobileNav() {
        if (bsCollapse) {
            bsCollapse.show();
        }
        navbarCollapse.classList.add('show');
        navbarToggler.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    
    if (navbarToggler && navbarCollapse) {
        // Close button functionality
        if (navClose) {
            navClose.addEventListener('click', closeMobileNav);
        }
        
        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggler.contains(e.target) && 
                !navbarCollapse.contains(e.target) && 
                navbarCollapse.classList.contains('show')) {
                closeMobileNav();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                closeMobileNav();
            }
        });
        
        // Listen to Bootstrap collapse events
        navbarCollapse.addEventListener('hidden.bs.collapse', () => {
            document.body.style.overflow = '';
        });
        
        navbarCollapse.addEventListener('shown.bs.collapse', () => {
            document.body.style.overflow = 'hidden';
        });
    }
});

// Skills animation on scroll
const observeSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage') || '90';
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
};

// Initialize skills animation when DOM is loaded
document.addEventListener('DOMContentLoaded', observeSkills);
