// --- MODAL LOGIC (New) ---
const openBtn = document.getElementById('openFormBtn');
const navBtn = document.getElementById('navLoginBtn');
const closeBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

function openModal(e) {
    if(e) e.preventDefault();
    modalOverlay.classList.add('show');
}

function closeModal() {
    modalOverlay.classList.remove('show');
    // Optional: Reset form on close
    // form.reset(); resetVisuals();
}

openBtn.addEventListener('click', openModal);
navBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Close if clicked outside the form box
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});


// --- VALIDATION LOGIC (Existing Robust Logic) ---
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const togglePassword = document.getElementById('togglePassword');
const strengthBar = document.getElementById('strength-bar');

const showError = (input, message) => {
    const formControl = input.closest('.form-control');
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
};

const showSuccess = (input) => {
    const formControl = input.closest('.form-control');
    formControl.className = 'form-control success';
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkStrength = (pass) => {
    let strength = 0;
    if (pass.length > 5) strength += 20;
    if (pass.length > 7) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 20;
    return strength;
};

// Checkers
const checkUsername = () => {
    let valid = false;
    const val = username.value.trim();
    if (!val) showError(username, 'ID required.');
    else if (val.length < 3) showError(username, 'ID too short (min 3).');
    else { showSuccess(username); valid = true; }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const val = email.value.trim();
    if (!val) showError(email, 'Email required.');
    else if (!isEmailValid(val)) showError(email, 'Invalid email format.');
    else { showSuccess(email); valid = true; }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const val = password.value.trim();
    const strength = checkStrength(val);
    
    strengthBar.style.width = `${strength}%`;
    if(strength <= 40) strengthBar.style.backgroundColor = '#e74c3c';
    else if(strength <= 60) strengthBar.style.backgroundColor = '#f1c40f';
    else strengthBar.style.backgroundColor = '#2ecc71';

    if (!val) showError(password, 'Password required.');
    else if (strength < 80) showError(password, 'Weak password.');
    else { showSuccess(password); valid = true; }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const val = confirmPassword.value.trim();
    if (!val) showError(confirmPassword, 'Confirm password.');
    else if (password.value.trim() !== val) showError(confirmPassword, 'Mismatch.');
    else { showSuccess(confirmPassword); valid = true; }
    return valid;
};

// Event Listeners
form.addEventListener('input', (e) => {
    switch(e.target.id) {
        case 'username': checkUsername(); break;
        case 'email': checkEmail(); break;
        case 'password': checkPassword(); if(confirmPassword.value) checkConfirmPassword(); break;
        case 'confirm-password': checkConfirmPassword(); break;
    }
});

togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = checkUsername() && checkEmail() && checkPassword() && checkConfirmPassword();
    
    if (isValid) {
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enrolling...';
        
        setTimeout(() => {
            alert(`Enrollment Successful!\nWelcome to B Sharana Basava's Class.`);
            btn.innerText = originalText;
            closeModal();
            form.reset();
            // Reset visuals
            document.querySelectorAll('.form-control').forEach(c => c.className = 'form-control');
            strengthBar.style.width = '0';
        }, 1500);
    }
});