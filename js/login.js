
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("noventraUsers")) || [];

    // Find user by email
    const registeredUser = users.find(function(user) {
        return user.email === email;
    });

    // Check whether account exists
    if (!registeredUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    // Check password
    if (registeredUser.password !== password) {
        alert("Invalid email or password!");
        return;
    }

    // Store logged-in user details
    const loggedInUser = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email
    };

    localStorage.setItem(
        "noventraLoggedInUser",
        JSON.stringify(loggedInUser)
    );

    alert("Login successful!");

    // Redirect to requested page, if provided
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo");

    if (returnTo === "job-details.html") {
        window.location.href = "job-details.html?apply=1";
    } else {
        window.location.href = "dashboard.html";
    }
});
