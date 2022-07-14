const menu__search__btn = document.getElementById("search__icon");

const search__container = document.querySelector(".search__container");

const search__close__btn = search__container.querySelector(".fa-times");


const menu__cart = document.querySelector(".menu__cart");
const cart__container = document.querySelector("#cart__container");


const menu__toggler__btn = document.querySelector("#menu__toggler__btn");
const menu = document.querySelector("#menu");



const primary__nav = document.querySelector(".primary__nav");


window.onscroll = function (e) {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 50) {
        primary__nav.classList.add("active");
        primary__nav.style.position = "sticky";
    }
    else {
        primary__nav.classList.remove("active");
        primary__nav.style.position = "fixed";


    }
}





menu__search__btn.onclick = function () {
    search__container.classList.add("active");
}
search__close__btn.onclick = function () {
    search__container.classList.remove("active");
}
menu__cart.onclick = function () {
    cart__container.classList.toggle("active");
}
menu__toggler__btn.onclick = function () {
    menu.classList.toggle("active");

    if (menu__toggler__btn.classList.contains("fa-bars")) {
        menu__toggler__btn.classList.remove("fa-bars")
        menu__toggler__btn.classList.add("fa-times")
    } else {
        menu__toggler__btn.classList.remove("fa-times")
        menu__toggler__btn.classList.add("fa-bars")
    }
}



