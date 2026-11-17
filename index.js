

var sidenav = document.getElementById("sidenav")
var menuico = document.getElementById("menuico")
var close = document.getElementById("closenav")

menuico.addEventListener("click",function(){
    sidenav.style.left=0
})

closenav.addEventListener("click",function(){
    sidenav.style.left="-50%"
})
