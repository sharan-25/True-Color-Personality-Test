// Include jQuery document ready function
$(document).ready(function() {
    // Using jQuery to handle form submission
    $('#signupForm').submit(function(event) {
        // Prevent default form submission
        event.preventDefault();
        validateSignup();
    });

    
    $('#errorBox').hide(); // Hide error box initially

    
});


function validateSignup() {

    //prevents default submission of form
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let errorBox = document.getElementById('errorBox');
    
    let errorMessage = '';

    if (name.trim() === '') {
        errorMessage += 'Name is required.<br>';
    }

    if (email.trim() === '') {
        errorMessage += 'Email is required.<br>';
    } else if (!isValidEmail(email)) {
        errorMessage += 'Invalid email address.<br>';
    }

    if (password.trim() === '') {
        errorMessage += 'Password is required.<br>';
    } else if (password.length < 6) {
        errorMessage += 'Password must be at least 6 characters.<br>';
    }

    if (confirmPassword.trim() === '') {
        errorMessage += 'Confirm Password is required.<br>';
    } else if (password !== confirmPassword) {
        errorMessage += 'Passwords do not match.<br>';
    }

    if (errorMessage !== '') {
        errorBox.innerHTML = errorMessage;
    } else {
        errorBox.innerHTML = ''; // Clear previous error messages
        // Perform signup or redirect to another page
        alert('Account created Succesfully!');
        console.log('Signup successful!');
    }
}

function isValidEmail(email) {
    // Basic email validation regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
