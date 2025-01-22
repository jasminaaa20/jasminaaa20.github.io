// Create a new file called js/form-validation.js and add this content:

// Get the form element
const form = document.getElementById('contact-form');

// Validation helper functions
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
    
    errorDiv.className = 'error-message text-danger mt-2';
    errorDiv.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorDiv);
    }
    
    input.classList.add('is-invalid');
};

const removeError = (input) => {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    
    input.classList.remove('is-invalid');
};

// Form validation function
const validateForm = () => {
    let isValid = true;
    
    // Get all form inputs
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const subject = form.querySelector('[name="subject"]');
    const message = form.querySelector('[name="message"]');
    
    // Clear previous errors
    [name, email, subject, message].forEach(input => removeError(input));
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        showError(subject, 'Subject is required');
        isValid = false;
    } else if (subject.value.trim().length < 3) {
        showError(subject, 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
};

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validateForm()) {
        // If validation passes, send email using EmailJS
        emailjs.sendForm("service_4yt0m5s", "template_8f6cwre", this)
            .then(
                function() {
                    alert("Message sent successfully!");
                    form.reset(); // Clear the form after successful submission
                },
                function(error) {
                    alert("Failed to send the message. Please try again.");
                    console.error(error);
                }
            );
    }
});

// Add real-time validation on input
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        removeError(input);
    });
});