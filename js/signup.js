
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Check existing account
    const existingUser = JSON.parse(localStorage.getItem("noventraUser"));

    if (existingUser && existingUser.email === email) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Create user object
    const user = {
        name: name,
        email: email,
        password: password
    };

    // Store user details
    localStorage.setItem("noventraUser", JSON.stringify(user));

    alert("Account created successfully!");

    // Redirect to login
    window.location.href = "login.html";
});