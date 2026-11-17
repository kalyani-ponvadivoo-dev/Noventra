
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Get registered user
    const registeredUser = JSON.parse(
        localStorage.getItem("noventraUser")
    );

    // Check whether account exists
    if (!registeredUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    // Validate login details
    if (
        registeredUser.email !== email ||
        registeredUser.password !== password
    ) {
        alert("Invalid email or password!");
        return;
    }

    // Store login session (without password)
    const loggedInUser = {
        name: registeredUser.name,
        email: registeredUser.email
    };

    localStorage.setItem(
        "noventraLoggedInUser",
        JSON.stringify(loggedInUser)
    );

    alert("Login successful!");

    // Return to the requested page, if provided
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo");

    if (returnTo === "job-details.html") {
        window.location.href = "job-details.html?apply=1";
    } else {
        window.location.href = "dashboard.html";
    }
});
