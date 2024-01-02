$(document).ready(function() {
    $('#forgetPasswordForm').submit(function(event) {
        event.preventDefault();
        validateForgetPassword();
    });
});

function validateForgetPassword() {
    let email = $('#email').val();
    let newPassword = $('#newPassword').val();
    let confirmPassword = $('#confirmPassword').val();
    let errorBox = $('#errorBox');
    
    let errorMessage = '';

    if ($.trim(email) === '') {
        errorMessage = 'Email is required.';
    } else if (!isValidEmail(email)) {
        errorMessage = 'Invalid email address.';
    } else if ($.trim(newPassword) === '') {
        errorMessage = 'New Password is required.';
    } else if (newPassword.length < 6) {
        errorMessage = 'New Password must be at least 6 characters.';
    } else if ($.trim(confirmPassword) === '') {
        errorMessage = 'Confirm Password is required.';
    } else if (newPassword !== confirmPassword) {
        errorMessage = 'Passwords do not match.';
    }

    if (errorMessage !== '') {
        errorBox.html(errorMessage);
    } else {
        errorBox.html(''); // Clear previous error messages
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
