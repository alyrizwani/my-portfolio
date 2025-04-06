// Elements
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const contactForm = document.getElementById('contactForm');
const currentYearElement = document.getElementById('currentYear');

// Update current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Mobile menu toggle
function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
}

// Handle smooth scrolling for navigation links
function handleNavLinkClick(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
    
    window.scrollTo({
      top: targetElement.offsetTop - 80, // Account for header height
      behavior: 'smooth'
    });
  }
}

// Create and show toast message
function showToast(message) {
  // Remove any existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Show the toast
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Hide and remove the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Form submission handler
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = {
    name: this.elements.name.value,
    email: this.elements.email.value,
    message: this.elements.message.value
  };
  
  // Log the form data (in a real application, you would send this to a server)
  console.log('Form submitted:', formData);
  
  // Show success message
  showToast('Message sent! Thank you for reaching out.');
  
  // Reset the form
  this.reset();
}

// Event listeners
window.addEventListener('scroll', handleScroll);
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
contactForm.addEventListener('submit', handleFormSubmit);

// Initialize header state on page load
handleScroll();

// Add animation classes to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-box, .about-card, .contact-card');
    
    elements.forEach(function(element) {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animate-scale-in');
      }
    });
  };
  
  // Run once on initial load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
