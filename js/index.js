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
