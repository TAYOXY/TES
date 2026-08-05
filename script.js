// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Mobile Apply Now dropdown toggle
document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (button && button.closest('.bg-purple-600') && button.closest('.w-full')) {
        const dropdown = button.nextElementSibling;
        if (dropdown && dropdown.classList.contains('space-y-2')) {
            dropdown.classList.toggle('hidden');
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
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
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(item.querySelector('img').src);
    });
});

function openLightbox(imageSrc) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center';
    lightbox.innerHTML = `
        <div class="relative max-w-4xl max-h-screen p-4">
            <img src="${imageSrc}" alt="Gallery Image" class="max-w-full max-h-full rounded-lg">
            <button class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition">
                <i class="fas fa-times"></i>
            </button>
            <button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('.fa-times')) {
            closeLightbox(lightbox);
        }
    });
    
    // Navigation
    const prevBtn = lightbox.querySelector('.fa-chevron-left');
    const nextBtn = lightbox.querySelector('.fa-chevron-right');
    
    if (prevBtn) {
        prevBtn.parentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.parentElement.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(1);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
}

function closeLightbox(lightbox) {
    lightbox.remove();
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', handleKeyNavigation);
}

function handleKeyNavigation(e) {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.fixed.inset-0');
        if (lightbox) closeLightbox(lightbox);
    } else if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    }
}

function navigateGallery(direction) {
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    
    const lightbox = document.querySelector('.fixed.inset-0 img');
    if (lightbox) {
        lightbox.src = images[currentImageIndex];
    }
}

// Form submission handling - removed as buttons are now links

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Counter animation for statistics (if added later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Parallax effect for hero section - optimized with requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-gradient');
            if (heroSection && scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Loading animation and preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
    document.body.classList.add('loaded');
});

// Add hover effects to cards
document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Email validation for contact forms (if added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone number formatting
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Initialize tooltips (if needed)
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm z-50';
            tooltipEl.textContent = text;
            tooltipEl.style.bottom = '100%';
            tooltipEl.style.left = '50%';
            tooltipEl.style.transform = 'translateX(-50%)';
            e.target.appendChild(tooltipEl);
        });
        
        tooltip.addEventListener('mouseleave', (e) => {
            const tooltipEl = e.target.querySelector('.absolute');
            if (tooltipEl) tooltipEl.remove();
        });
    });
});

// Print functionality for registration form
function printForm() {
    window.print();
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization - lazy loading images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});
