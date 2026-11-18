
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");
const termsCheckbox = document.getElementById("termsCheckbox");

const signupNameError = document.getElementById("signupNameError");
const signupEmailError = document.getElementById("signupEmailError");
const signupPasswordError = document.getElementById("signupPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const termsError = document.getElementById("termsError");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

function showFieldMessage(input, errorElement, message) {
    errorElement.textContent = message;

    if (input === null) {
        return;
    }

    if (message !== "") {
        input.classList.add("invalid");
        input.classList.remove("valid");
    } else {
        input.classList.remove("invalid");
        input.classList.add("valid");
    }
}

function getNameError() {
    if (signupName.value.trim() === "") {
        return "Name is required. Please enter your name.";
    }
    return "";
}

function getEmailError() {
    const email = signupEmail.value.trim();

    if (email === "") {
        return "Email is required.";
    }
    if (!emailPattern.test(email)) {
        return "Please enter a valid email, for example name@example.com.";
    }
    return "";
}

function getPasswordError() {
    if (signupPassword.value === "") {
        return "Password is required.";
    }
    if (signupPassword.value.length < MIN_PASSWORD_LENGTH) {
        return "Password must contain at least " + MIN_PASSWORD_LENGTH + " characters.";
    }
    return "";
}

function getConfirmPasswordError() {
    if (confirmPassword.value === "") {
        return "Confirm password is required.";
    }
    if (confirmPassword.value !== signupPassword.value) {
        return "Passwords do not match!";
    }
    return "";
}

function getTermsError() {
    if (!termsCheckbox.checked) {
        return "Please agree to the Terms and Privacy Policy.";
    }
    return "";
}

function checkName() {
    showFieldMessage(signupName, signupNameError, getNameError());
}

function checkEmail() {
    showFieldMessage(signupEmail, signupEmailError, getEmailError());
}

function checkPassword() {
    showFieldMessage(signupPassword, signupPasswordError, getPasswordError());
}

function checkConfirmPassword() {
    showFieldMessage(confirmPassword, confirmPasswordError, getConfirmPasswordError());
}

function checkTerms() {
    showFieldMessage(null, termsError, getTermsError());
}

function isSignupFormValid() {
    return getNameError() === "" &&
        getEmailError() === "" &&
        getPasswordError() === "" &&
        getConfirmPasswordError() === "" &&
        getTermsError() === "";
}

signupName.addEventListener("input", checkName);
signupName.addEventListener("blur", checkName);
signupEmail.addEventListener("input", checkEmail);
signupEmail.addEventListener("blur", checkEmail);
signupPassword.addEventListener("input", function () {
    checkPassword();
    if (confirmPassword.value !== "") {
        checkConfirmPassword();
    }
});
signupPassword.addEventListener("blur", checkPassword);
confirmPassword.addEventListener("input", checkConfirmPassword);
confirmPassword.addEventListener("blur", checkConfirmPassword);
termsCheckbox.addEventListener("change", checkTerms);

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    checkName();
    checkEmail();
    checkPassword();
    checkConfirmPassword();
    checkTerms();

    if (!isSignupFormValid()) {
        return;
    }

    const name = signupName.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;

    const users = JSON.parse(localStorage.getItem("noventraUsers")) || [];

    const existingUser = users.find(function(user) {
        return user.email === email;
    });

    if (existingUser) {
        alert("This email is already registered. Please login.");
        return;
    }

    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    };

    users.push(user);
    localStorage.setItem("noventraUsers", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "login.html";
});
