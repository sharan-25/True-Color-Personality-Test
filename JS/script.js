const username= document.getElementById('name');
const password=document.getElementById('password');
const form=document.getElementById('form');
const errorBox= document.getElementById('errorBox');

function validateLogin(event){
// Always prevent default form submission
event.preventDefault();
let errorMessage = null;
// let flag = true;


// authentication logic 
let generatedPassword = generatePassword();
console.log("Password = ",generatedPassword);
if (username.value === 'user1'  && password.value === generatedPassword) {
   // Successful login, navigate to questionnaire page
    window.location.href = './../HTML/quiz1.html';
   
} else {
   // Display error message
   if (username.value.trim() === '') {
       errorMessage = 'Name is required<br>';
    //    flag = false;
   } else if (password.value.length <= 6) {
       errorMessage = 'Password must be longer than 6 characters<br>';
    //    flag = false;
   } else if (password.value.length >= 20) {
       errorMessage = 'Password must be less than 20 characters<br>';
    //    flag = false;
   } else if (password.value == 'password') {
       errorMessage = 'Password cannot be "password"<br>';
    //    flag = false;
   } else {
       errorMessage = "Invalid UserName or Password! Please try again.";
    //    flag = false;
   }
   // Display error message
   if (errorMessage.length > 0) {
       console.log('Error Message:', errorMessage);
       errorBox.innerHTML = errorMessage;
       errorBox.style.display = 'block'; // Show the error box
   }else {
      errorBox.innerHTML = ''; // Clear previous error messages
      // Perform signup or redirect to another page
      console.log('Signup successful!');
  }
}




// Return the flag after handling the error
// return flag;
}


function generatePassword() {
    // Define characters that can be used in the password
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";

    // Set the length of the password
    const passwordLength = 12;

    let password = "";

    // Generate the password
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    // Update the password input field
    document.getElementById("password").value = password;

    return password;
}

