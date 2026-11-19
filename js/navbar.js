
document.addEventListener("DOMContentLoaded", function () {

    const navActions = document.getElementById("navActions");
    const drawerActions = document.getElementById("drawerActions");

    const loggedInUser = JSON.parse(
        localStorage.getItem("noventraLoggedInUser")
    );

    function updateNavbar(container, isMobile = false) {

        if (!container) return;

        if (loggedInUser) {
            container.innerHTML = `
                <a href="dashboard.html"
                   class="${isMobile ? "btn-drawer-login" : "btn btn-outline"}">
                    Profile
                </a>

                <a href="#" id="${isMobile ? "mobileLogout" : "desktopLogout"}"
                   class="${isMobile ? "btn-drawer-signup" : "btn btn-primary"}">
                    Logout
                </a>
            `;
        } else {
            container.innerHTML = `
                <a href="login.html"
                   class="${isMobile ? "btn-drawer-login" : "btn btn-outline"}">
                    Login
                </a>

                <a href="signup.html"
                   class="${isMobile ? "btn-drawer-signup" : "btn btn-primary"}">
                    Sign Up
                </a>
            `;
        }
    }

    updateNavbar(navActions);
    updateNavbar(drawerActions, true);

    // Logout functionality
    document.querySelectorAll("#desktopLogout, #mobileLogout")
        .forEach(function (button) {
            button.addEventListener("click", function (event) {
                event.preventDefault();

                localStorage.removeItem("noventraLoggedInUser");

                window.location.href = "index.html";
            });
        });
        // Mobile Hamburger Menu

const menuIcon = document.getElementById("menuico");
const sideNav = document.getElementById("sidenav");
const closeNav = document.getElementById("closenav");

if (menuIcon && sideNav && closeNav) {

    menuIcon.addEventListener("click", function () {
        sideNav.classList.add("open");
    });

    closeNav.addEventListener("click", function () {
        sideNav.classList.remove("open");
    });

}

});
