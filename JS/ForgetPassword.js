// jQuery document ready function
$(document).ready(function() {
    // Handle form submission using jQuery
    $('#forgetPasswordForm').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();

      
        validateForgetPassword();
    });

    
});

function validateForgetPassword() {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let errorBox = document.getElementById('errorBox');
    
    let errorMessage = '';

    if (email.trim() === '') {
        errorMessage = 'Email is required.';
    } else if (!isValidEmail(email)) {
        errorMessage = 'Invalid email address.';
    } else if (newPassword.trim() === '') {
        errorMessage = 'New Password is required.';
    } else if (newPassword.length < 6) {
        errorMessage = 'New Password must be at least 6 characters.';
    } else if (confirmPassword.trim() === '') {
        errorMessage = 'Confirm Password is required.';
    } else if (newPassword !== confirmPassword) {
        errorMessage = 'Passwords do not match.';
    }

    if (errorMessage !== '') {
        errorBox.innerHTML = errorMessage;
    } else {
        errorBox.innerHTML = ''; // Clear previous error messages
        // Perform forget password action (e.g., send reset email)
        alert('Password Reset Successfully!');
        console.log('Forget Password successful! Email: ' + email + ', New Password: ' + newPassword);
        //After Resetting the password return to login page
        window.location.href = 'Index.html';
    }
}

function isValidEmail(email) {
    // Basic email validation regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
