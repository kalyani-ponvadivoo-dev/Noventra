
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check password match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("noventraUsers")) || [];

    // Check whether email already exists
    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Create new user object
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    // Add new user to the array
    users.push(user);

    // Save all users
    localStorage.setItem("noventraUsers", JSON.stringify(users));

    alert("Account created successfully!");

    // Redirect to login
    window.location.href = "login.html";
});
