
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function showFieldMessage(input, errorElement, message) {
    errorElement.textContent = message;

    if (message !== "") {
        input.classList.add("invalid");
        input.classList.remove("valid");
    } else {
        input.classList.remove("invalid");
        input.classList.add("valid");
    }
}

function getLoginEmailError() {
    const email = loginEmail.value.trim();

    if (email === "") {
        return "Email is required.";
    }
    if (!emailPattern.test(email)) {
        return "Please enter a valid email, for example name@example.com.";
    }
    return "";
}

function getLoginPasswordError() {
    if (loginPassword.value === "") {
        return "Password is required.";
    }
    if (loginPassword.value.length < MIN_PASSWORD_LENGTH) {
        return "Password must contain at least " + MIN_PASSWORD_LENGTH + " characters.";
    }
    return "";
}

function checkLoginEmail() {
    showFieldMessage(loginEmail, loginEmailError, getLoginEmailError());
}

function checkLoginPassword() {
    showFieldMessage(loginPassword, loginPasswordError, getLoginPasswordError());
}

function isLoginFormValid() {
    return getLoginEmailError() === "" && getLoginPasswordError() === "";
}

loginEmail.addEventListener("input", checkLoginEmail);
loginEmail.addEventListener("blur", checkLoginEmail);
loginPassword.addEventListener("input", checkLoginPassword);
loginPassword.addEventListener("blur", checkLoginPassword);

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    checkLoginEmail();
    checkLoginPassword();

    if (!isLoginFormValid()) {
        return;
    }

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    const registeredUser = JSON.parse(
        localStorage.getItem("noventraUser")
    );

    if (!registeredUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    if (
        registeredUser.email !== email ||
        registeredUser.password !== password
    ) {
        alert("Invalid email or password!");
        return;
    }

    const loggedInUser = {
        name: registeredUser.name,
        email: registeredUser.email
    };

    localStorage.setItem(
        "noventraLoggedInUser",
        JSON.stringify(loggedInUser)
    );

    alert("Login successful!");

    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get("returnTo");

    if (returnTo === "job-details.html") {
        window.location.href = "job-details.html?apply=1";
    } else {
        window.location.href = "dashboard.html";
    }
});
