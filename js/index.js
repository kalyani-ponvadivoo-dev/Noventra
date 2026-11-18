// 1. Mobile Menu (Open / Close)
var sidenav = document.getElementById("sidenav")
var menuico = document.getElementById("menuico")
var close = document.getElementById("closenav")

menuico.addEventListener("click",function(){
    sidenav.style.left="0"
})

closenav.addEventListener("click",function(){
    sidenav.style.left="-100%"
})


// 2. Search Bar

var searchBtn = document.getElementById("searchBtn");
var searchKeyword = document.getElementById("searchKeyword");
var searchLocation = document.getElementById("searchLocation");

if (searchBtn) {
    searchBtn.addEventListener("click", function () {
        var keyword = searchKeyword.value;
        var location = searchLocation.value;

        // Simple link: jobs.html?keyword=python&location=chennai
        window.location.href = "jobs.html?keyword=" + keyword + "&location=" + location;
    });
}


// 3. Click to Search

var pills = document.querySelectorAll(".pill");

pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
        var categoryName = pill.querySelector("span").textContent;
        window.location.href = "jobs.html?keyword=" + categoryName;
    });
});



// 4. Login & Logout Check Laptop & Phone

var navActions = document.getElementById("navAuthActions");
var drawerActions = document.getElementById("drawerAuthActions");
var user = localStorage.getItem("noventraLoggedInUser");

// If user is logged in
if (user) {
    //  1. Get user's first name from localStorage
    var userData = JSON.parse(user);
    var userName = userData.name ? userData.name.split(" ")[0] : "User";

    // 2. Laptop screen (shows: Tamil's Dashboard)
    navActions.innerHTML = 
        '<a href="dashboard.html" class="btn btn-outline">' + userName + "'s Dashboard</a>" +
        '<button id="logoutBtn" class="btn btn-primary" style="cursor:pointer;">Logout</button>';

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("noventraLoggedInUser");
        alert("Logged out successfully!");
        window.location.reload();
    });

    // 3. Phone screen (shows: Tamil's Dashboard)
    drawerActions.innerHTML = 
        '<a href="dashboard.html" class="btn-drawer-signup" style="text-align:center;">' + userName + "'s Dashboard</a>" +
        '<button id="drawerLogoutBtn" class="btn-drawer-login" style="cursor:pointer;">Logout</button>';

    document.getElementById("drawerLogoutBtn").addEventListener("click", function () {
        localStorage.removeItem("noventraLoggedInUser");
        alert("Logged out successfully!");
        window.location.reload();
    });

} else {
    // If user is NOT logged in: Show Login and Sign Up
    navActions.innerHTML = 
        '<a href="login.html" class="btn btn-outline">Login</a>' +
        '<a href="signup.html" class="btn btn-primary">Sign Up</a>';

    drawerActions.innerHTML = 
        '<a href="login.html" class="btn-drawer-login">Login</a>' +
        '<a href="signup.html" class="btn-drawer-signup">Sign Up</a>';
}