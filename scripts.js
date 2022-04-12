// DOM do node
var p2NodeList = document.querySelectorAll('p2');
var serchbar = document.querySelector('.guestSerchBar');

// node do array
var p2List = Array.from(p2NodeList);


// array of objects
let arrayObject = []
for (let i = 0; i < p2List.length; i++) {
    arrayObject[i] = {
        "nick": p2List[i].outerText,
        "id": "seat" + [(i + 1)],
        "number": (i + 1)
    }
}


// sortowanie alfabetyczne
function compare(a, b) {
    if (a.nick < b.nick) {
        return -1;
    }
    if (a.nick > b.nick) {
        return 1;
    }
    return 0;
}
arrayObject.sort(compare);
// console.log("arrayObject",arrayObject)


// renderowanie listy
for (let i = 0; i < arrayObject.length; i++) {
    serchbar.innerHTML +=
        "<label><input type=\"checkbox\" onclick=\"addAtributeSeat(" +
        arrayObject[i].number +
        ")\" id=\"" +
        arrayObject[i].id +
        "\"/>" +
        arrayObject[i].nick +
        "<br /></label>"
}

// podswietlanie osoby z listy
function addAtributeSeat(numb) {
    let seat = document.querySelector('.seatHTML' + numb)
    seat.classList.toggle('checkOn');
}

//dodawanie underline do sekcji w której jestesmy

function underlineMenuItem() {
    var sections = document.querySelectorAll(".sectionContainer");
    var menuitems = document.querySelectorAll(".menu-item");
    var menuheight = document.querySelector('.menu').offsetHeight;
    for (var i = 0; i < sections.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = sections[i].getBoundingClientRect().top;
        if (elementTop + windowHeight - menuheight < windowHeight) {
            menuitems[i].classList.add("active");
            if (i > 0) {
                menuitems[i - 1].classList.remove("active");
            }
        } else {
            menuitems[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", underlineMenuItem);

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
var weddingDate = new Date("Sep 24, 2022 16:30:00").getTime();
// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = weddingDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (day));
    var hours = Math.floor((distance % (day)) / (hour));
    var minutes = Math.floor((distance % hour) / (minute));
    var seconds = Math.floor((distance % (minute)) / second);

    // Output the result
    document.getElementById("days").innerHTML = days + "d";
    document.getElementById("hours").innerHTML = hours + "h";
    document.getElementById("minutes").innerHTML = minutes + "m";
    document.getElementById("seconds").innerHTML = seconds + "s";
}, second);

function find() {
    var inp, filter, i, txtValue;
    inp = document.getElementById("myInput");
    filter = inp.value.toUpperCase();
    inputs = document.querySelectorAll(".guestSerchBar label");
    for (i = 0; i < inputs.length; i++) {
        txtValue = inputs[i].textContent || inputs[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            inputs[i].style.display = "";
        } else {
            inputs[i].style.display = "none";
        }
    }
}

//zmiana wysokości mapki
function resizemap() {
    var churimg = document.getElementsByClassName("church");
    var churimgheight = churimg[0].height;
    document.getElementById("church-map").height = churimgheight;
    var hallimg = document.getElementsByClassName("hall");
    var hallimgheight = hallimg[0].height;
    document.getElementById("hall-map").height = hallimgheight;

}
window.addEventListener('load', resizemap);
window.addEventListener('resize', resizemap);
