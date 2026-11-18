// Mobile navigation drawer toggle
var sidenav = document.getElementById("sidenav");
var menuico = document.getElementById("menuico");
var closenav = document.getElementById("closenav");

if (menuico && sidenav) {
    menuico.addEventListener("click", function () {
        sidenav.style.left = "0";
    });
}

if (closenav && sidenav) {
    closenav.addEventListener("click", function () {
        sidenav.style.left = "-100%";
    });
}


// Search Bar Functionality

var searchBtn = document.getElementById("searchBtn");
var searchKeyword = document.getElementById("searchKeyword");
var searchLocation = document.getElementById("searchLocation");
var searchCategory = document.getElementById("searchCategory");

function performSearch() {
    var keyword = searchKeyword ? searchKeyword.value.trim() : "";
    var location = searchLocation ? searchLocation.value : "";
    var category = searchCategory ? searchCategory.value : "";

    // Build the URL parameters 
    var params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (location) params.append("location", location);
    if (category) params.append("category", category);

    // Redirect to jobs.html with the search query
    var queryString = params.toString();
    if (queryString) {
        window.location.href = "jobs.html?" + queryString;
    } else {
        window.location.href = "jobs.html";
    }
}

// 1. Search when user clicks the "Search Jobs" button
if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
}

// 2. Search when user presses Enter key in the keyword input field
if (searchKeyword) {
    searchKeyword.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
}

// 3. Quick Category Pills click navigation
var pills = document.querySelectorAll(".category-pills .pill");
pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
        var categoryName = pill.querySelector("span") ? pill.querySelector("span").textContent.trim() : "";
        if (categoryName && categoryName !== "More") {
            window.location.href = "jobs.html?keyword=" + encodeURIComponent(categoryName);
        } else {
            window.location.href = "jobs.html";
        }
    });
});



// ============================================
// Login / Dashboard State Toggle
// ============================================
function updateAuthState() {
    var loggedInUser = null;
    try {
        loggedInUser = JSON.parse(localStorage.getItem("noventraLoggedInUser"));
    } catch (e) {
        loggedInUser = null;
    }

    var navAuthActions = document.getElementById("navAuthActions");
    var drawerAuthActions = document.getElementById("drawerAuthActions");

    if (loggedInUser) {
        // User IS logged in: Show Dashboard & Logout buttons
        var firstName = loggedInUser.name ? loggedInUser.name.split(" ")[0] : "User";

        if (navAuthActions) {
            navAuthActions.innerHTML = `
                <a href="dashboard.html" class="btn btn-outline" style="gap:6px;">
                    <i class="fa-solid fa-chart-pie"></i> ${firstName}'s Dashboard
                </a>
                <button id="logoutBtn" class="btn btn-primary" type="button" style="cursor:pointer;">
                    Logout
                </button>
            `;
        }

        if (drawerAuthActions) {
            drawerAuthActions.innerHTML = `
                <a href="dashboard.html" class="btn-drawer-signup" style="text-align:center;">
                    <i class="fa-solid fa-chart-pie"></i> Dashboard
                </a>
                <button id="drawerLogoutBtn" class="btn-drawer-login" type="button" style="cursor:pointer; width:100%;">
                    Logout
                </button>
            `;
        }

        // Handle Logout Click
        function handleLogout() {
            localStorage.removeItem("noventraLoggedInUser");
            alert("Logged out successfully!");
            updateAuthState(); // refresh navbar immediately
        }

        var logoutBtn = document.getElementById("logoutBtn");
        var drawerLogoutBtn = document.getElementById("drawerLogoutBtn");
        if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
        if (drawerLogoutBtn) drawerLogoutBtn.addEventListener("click", handleLogout);

    } else {
        // User is NOT logged in: Show Login & Sign Up buttons
        if (navAuthActions) {
            navAuthActions.innerHTML = `
                <a href="login.html" class="btn btn-outline">Login</a>
                <a href="signup.html" class="btn btn-primary">Sign Up</a>
            `;
        }

        if (drawerAuthActions) {
            drawerAuthActions.innerHTML = `
                <a href="login.html" class="btn-drawer-login">Login</a>
                <a href="signup.html" class="btn-drawer-signup">Sign Up</a>
            `;
        }
    }
}

// Run on page load
updateAuthState();

