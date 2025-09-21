// Authentication Page JavaScript

// Global variables
let currentTab = 'login';
let isFormValid = {
    login: false,
    signup: false
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    setupFormValidation();
    setupEventListeners();
});

// Initialize authentication page
function initializeAuth() {
    // Set initial tab
    switchTab('login');
    
    // Add entrance animation
    const authCard = document.querySelector('.auth-card');
    authCard.style.opacity = '0';
    authCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        authCard.style.transition = 'all 0.5s ease';
        authCard.style.opacity = '1';
        authCard.style.transform = 'translateY(0)';
    }, 100);
}

// Tab switching functionality
function switchTab(tabName) {
    currentTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update form containers
    document.querySelectorAll('.form-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(`${tabName}-form`).classList.add('active');
    
    // Reset forms
    resetForm(tabName);
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    
    // Real-time validation
    setupRealTimeValidation();
}

// Setup form validation
function setupFormValidation() {
    // Login form validation
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    
    loginEmail.addEventListener('input', () => validateLoginForm());
    loginPassword.addEventListener('input', () => validateLoginForm());
    
    // Signup form validation
    const signupFullName = document.getElementById('signupFullName');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');
    
    signupFullName.addEventListener('input', () => validateSignupForm());
    signupEmail.addEventListener('input', () => validateSignupForm());
    signupPassword.addEventListener('input', () => {
        updatePasswordStrength();
        validateSignupForm();
    });
    confirmPassword.addEventListener('input', () => validateSignupForm());
    agreeTerms.addEventListener('change', () => validateSignupForm());
}

// Real-time validation setup
function setupRealTimeValidation() {
    // Email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', () => validateEmail(input));
    });
    
    // Password validation
    document.querySelectorAll('input[type="password"]').forEach(input => {
        input.addEventListener('input', () => {
            if (input.id === 'signupPassword') {
                updatePasswordStrength();
            }
            validatePassword(input);
        });
    });
}

// Validate login form
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const emailValid = validateEmail(document.getElementById('loginEmail'));
    const passwordValid = validatePassword(document.getElementById('loginPassword'));
    
    isFormValid.login = emailValid && passwordValid;
    updateLoginButton();
}

// Validate signup form
function validateSignupForm() {
    const fullName = document.getElementById('signupFullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    const fullNameValid = validateFullName(document.getElementById('signupFullName'));
    const emailValid = validateEmail(document.getElementById('signupEmail'));
    const passwordValid = validatePassword(document.getElementById('signupPassword'));
    const confirmPasswordValid = validateConfirmPassword(document.getElementById('confirmPassword'));
    const termsValid = agreeTerms;
    
    isFormValid.signup = fullNameValid && emailValid && passwordValid && confirmPasswordValid && termsValid;
    updateSignupButton();
}

// Email validation
function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (!email) {
        showError(errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Password validation
function validatePassword(input) {
    const password = input.value;
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (input.id === 'loginPassword') {
        if (!password) {
            showError(errorElement, 'Password is required');
            return false;
        } else if (password.length < 6) {
            showError(errorElement, 'Password must be at least 6 characters');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    } else if (input.id === 'signupPassword') {
        if (!password) {
            showError(errorElement, 'Password is required');
            return false;
        } else if (password.length < 8) {
            showError(errorElement, 'Password must be at least 8 characters');
            return false;
        } else if (!/(?=.*[a-z])/.test(password)) {
            showError(errorElement, 'Password must contain at least one lowercase letter');
            return false;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            showError(errorElement, 'Password must contain at least one uppercase letter');
            return false;
        } else if (!/(?=.*\d)/.test(password)) {
            showError(errorElement, 'Password must contain at least one number');
            return false;
        } else if (!/(?=.*[@$!%*?&])/.test(password)) {
            showError(errorElement, 'Password must contain at least one special character');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    return true;
}

// Full name validation
function validateFullName(input) {
    const fullName = input.value.trim();
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (!fullName) {
        showError(errorElement, 'Full name is required');
        return false;
    } else if (fullName.split(' ').length < 2) {
        showError(errorElement, 'Please enter your full name (first and last name)');
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Confirm password validation
function validateConfirmPassword(input) {
    const confirmPassword = input.value;
    const password = document.getElementById('signupPassword').value;
    const errorElement = document.getElementById(input.id + 'Error');
    
    if (!confirmPassword) {
        showError(errorElement, 'Please confirm your password');
        return false;
    } else if (confirmPassword !== password) {
        showError(errorElement, 'Passwords do not match');
        return false;
    } else {
        hideError(errorElement);
        return true;
    }
}

// Update password strength indicator
function updatePasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    let strength = 0;
    let strengthLabel = '';
    
    if (password.length >= 8) strength += 25;
    if (/(?=.*[a-z])/.test(password)) strength += 25;
    if (/(?=.*[A-Z])/.test(password)) strength += 25;
    if (/(?=.*\d)/.test(password)) strength += 25;
    
    if (strength < 25) {
        strengthLabel = 'Very Weak';
        strengthFill.style.background = '#e74c3c';
    } else if (strength < 50) {
        strengthLabel = 'Weak';
        strengthFill.style.background = '#f39c12';
    } else if (strength < 75) {
        strengthLabel = 'Good';
        strengthFill.style.background = '#f1c40f';
    } else {
        strengthLabel = 'Strong';
        strengthFill.style.background = '#27ae60';
    }
    
    strengthFill.style.width = strength + '%';
    strengthText.textContent = strengthLabel;
}

// Show error message
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Hide error message
function hideError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Update login button state
function updateLoginButton() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.disabled = !isFormValid.login;
}

// Update signup button state
function updateSignupButton() {
    const signupBtn = document.querySelector('.signup-btn');
    signupBtn.disabled = !isFormValid.signup;
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.classList.remove('fa-eye');
        toggle.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggle.classList.remove('fa-eye-slash');
        toggle.classList.add('fa-eye');
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    if (!isFormValid.login) return;
    
    const formData = new FormData(e.target);
    const loginData = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    setButtonLoading('.login-btn', true);
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessMessage('Login Successful!', 'Welcome back to Sneh Foundation.');
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            showError(document.getElementById('loginPasswordError'), result.message || 'Invalid email or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError(document.getElementById('loginPasswordError'), 'Login failed. Please try again.');
    } finally {
        setButtonLoading('.login-btn', false);
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();
    
    if (!isFormValid.signup) return;
    
    const formData = new FormData(e.target);
    const signupData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    setButtonLoading('.signup-btn', true);
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessMessage('Account Created!', 'Welcome to Sneh Foundation. Your account has been created successfully.');
            setTimeout(() => {
                switchTab('login');
            }, 2000);
        } else {
            if (result.field) {
                showError(document.getElementById(result.field + 'Error'), result.message);
            } else {
                showError(document.getElementById('signupEmailError'), result.message || 'Signup failed. Please try again.');
            }
        }
    } catch (error) {
        console.error('Signup error:', error);
        showError(document.getElementById('signupEmailError'), 'Signup failed. Please try again.');
    } finally {
        setButtonLoading('.signup-btn', false);
    }
}

// Handle forgot password
async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Password reset link sent to your email');
            closeForgotPassword();
        } else {
            alert(result.message || 'Failed to send reset link');
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        alert('Failed to send reset link. Please try again.');
    }
}

// Social login
function socialLogin(provider) {
    // Simulate social login
    showSuccessMessage('Social Login', `Redirecting to ${provider} login...`);
    
    // In a real implementation, you would redirect to the social provider's OAuth URL
    setTimeout(() => {
        alert(`${provider} login would be implemented here`);
    }, 1000);
}

// Set button loading state
function setButtonLoading(selector, loading) {
    const button = document.querySelector(selector);
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
    } else {
        button.classList.remove('loading');
        button.disabled = !isFormValid[currentTab];
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
    }
}

// Show success message
function showSuccessMessage(title, text) {
    const successMessage = document.getElementById('successMessage');
    const successTitle = document.getElementById('successTitle');
    const successText = document.getElementById('successText');
    
    successTitle.textContent = title;
    successText.textContent = text;
    successMessage.style.display = 'flex';
}

// Hide success message
function hideSuccessMessage() {
    document.getElementById('successMessage').style.display = 'none';
}

// Show forgot password modal
function showForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Close forgot password modal
function closeForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('resetEmail').value = '';
}

// Reset form
function resetForm(formType) {
    const form = document.getElementById(`${formType}Form`);
    if (form) {
        form.reset();
        
        // Clear all error messages
        form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        // Reset password strength
        if (formType === 'signup') {
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            strengthFill.style.width = '0%';
            strengthText.textContent = 'Password strength';
        }
        
        // Update button states
        isFormValid[formType] = false;
        if (formType === 'login') {
            updateLoginButton();
        } else {
            updateSignupButton();
        }
    }
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const forgotModal = document.getElementById('forgotPasswordModal');
    const successMessage = document.getElementById('successMessage');
    
    if (e.target === forgotModal) {
        closeForgotPassword();
    }
    
    if (e.target === successMessage) {
        hideSuccessMessage();
    }
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}
