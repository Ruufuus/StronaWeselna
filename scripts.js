var tablesInfo = JSON.parse(JSON.stringify(guestsInfo))
let guestInformations = []
let tableInformations = []
pageLoad()

function pageLoad() {
    createWeedingCountDown()
    getTablesAndGuestsInfo()
    createTables()
    centerTables()
    sortGuestInformations()
    createSearchBar()
    changeModeToTouchScreenDeviceMode()
}

function createWeedingCountDown() {
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
        if (now < weddingDate) {
            document.getElementById("days").innerHTML = days + "d";
            document.getElementById("hours").innerHTML = hours + "h";
            document.getElementById("minutes").innerHTML = minutes + "m";
            document.getElementById("seconds").innerHTML = seconds + "s";
        } else {
            document.getElementsByClassName("timer-title")[0].innerHTML = "";
        }
    }, second);
}

function getTablesAndGuestsInfo() {
    tablesInfo.forEach(tableInfo => {
        var currentTableId = tableInfo.tableID;
        tableInformations.push(
            {
                "tableId": tableInfo.tableID,
                "tableSize": tableInfo.tableSize
            }
        )
        tableInfo.guestList.forEach(guestInfo => {
            guestInformations.push(
                {
                    "nick": guestInfo.name,
                    "id": "seat" + guestInfo.id,
                    "number": guestInfo.id,
                    "table": currentTableId,
                }
            )
        })
    });
}

function createTables() {
    tableInformations.forEach(tableInformation => {
        var tableDivHTML = document
            .getElementById(tableInformation.tableId)
            .innerHTML

        var tableStyle = 
        `grid-area: 1 / 2 / ${((tableInformation.tableSize / 2) + 1)} / 4`

        tableDivHTML += 
        `<div class=\"tableTable table${tableInformation.tableSize} tableText"`+
        ` style="${tableStyle}">${tableInformation.tableId}</div>`
        var chairCounter = tableInformation.tableSize
        guestInformations.forEach(guestInformation => {
            ({ chairCounter, tableDivHTML } =
                createChair(guestInformation, tableInformation, chairCounter, tableDivHTML))
        })
        table = document.getElementById(tableInformation.tableId)
        table.innerHTML = tableDivHTML

    })


    function createChair(guestInformation, tableInformation, chairCounter, tableDivHTML) {
        if (guestInformation.table == tableInformation.tableId) {
            var seat
            var row 
            var chairStyle = ""
            if (chairCounter <= tableInformation.tableSize / 2){
                seat = "chairRight"
            }else{
                var charNumber = tableInformation.tableSize - chairCounter + 1
                seat = "chairLeft"
                row = 1
                chairStyle = `grid-area: ${charNumber} / 1 / ${charNumber+1} / 2`
            }


            var guestNameFormated = () => {
                resultName = ""
                nameParts = guestInformation.nick.split(" ")
                nameParts.forEach(namePart => {
                    formatName(namePart)
                })
                return resultName
            }
            tableDivHTML +=
                `<span class=\"chair ${seat} seatHTML${guestInformation.number}"`+
                ` style="${chairStyle}"><p2>${guestNameFormated()}</p2></span>`
            chairCounter -= 1
        }
        return { chairCounter, tableDivHTML }

        function formatName(namePart) {
            if (resultName != "") {
                resultName += "</br>"
            }
            resultName += namePart
        }
    }
}

function centerTables() {
    let chair = document.getElementsByClassName("checkOn")
    if (chair.length > 0) {
        chair = chair.item(0)
        let tableId = chair.parentElement.id
        let table = document.getElementById(tableId)
        chairWidth = chair.offsetWidth
        table.style.transform = "translateX(-" + chairWidth + "px)"
    }
}

function sortGuestInformations() {
    function compare(a, b) {
        if (a.table < b.table) {
            return -1;
        }
        if (a.table > b.table) {
            return 1;
        }
        return 0;
    }
    guestInformations.sort(compare);
}

function createSearchBar() {
    // renderowanie tytułu listy
    var serchbar = document.querySelector('.guestSerchBar');
    serchbar.innerHTML +=
        "<div class=\"labelTitle\">" +
        "<span>Imię Nazwisko</span>" +
        "<span>Stół</span>" +
        "</div>";

    // renderowanie listy
    for (let i = 0; i < guestInformations.length; i++) {
        if (guestInformations[i].nick.toUpperCase() != "OSOBA  TOWARZYSZĄCA") {
            serchbar.innerHTML +=
                //html code
                "<label class=\"listElements\" id=\"" +
                guestInformations[i].id + "\"onclick=\"addAtributeSeat(" +
                guestInformations[i].number + "," + guestInformations[i].table +
                ")\">" +

                // wyświetlanie imienia i nazwiska
                "<span class=\"labelNick\">" +
                guestInformations[i].nick +
                "</span>" +

                // wyświetlanie nr stołu
                "<span class=\"" +
                guestInformations[i].table +
                "\">" +
                guestInformations[i].table +
                "</span>" +

                "<br /></label>"
        }
    }
}


function addAtributeSeat(numb, tableNumber) {
    // podswietlanie osoby z listy
    let seats = [document.getElementsByClassName('chair')]
    for (let i = 0; i < seats.length; i++) {
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j].classList.contains('seatHTML' + numb)) {
                seats[i][j].classList.toggle("checkOn");
            } else {
                seats[i][j].classList.remove("checkOn");
            }
        }
    }
    let tables = document
        .getElementsByClassName("table")
    let choosenSit = document
        .getElementsByClassName('seatHTML' + numb).item(0)
    for (let i = 0; i < tables.length; i++) {
        if (tables[i].id != tableNumber || !choosenSit.classList.contains("checkOn")) {
            tables[i].style.display = "none"
        } else {
            tables[i].style.display = "grid"
            centerTables()
        }
    }
    // podswietlanie osoby na liście
    var listElements = document.getElementsByClassName("listElements")
    for (let i = 0; i < listElements.length; i++) {
        if (listElements[i].id == "seat" + numb) {
            listElements[i].classList.toggle('labelBackground')
        } else {
            listElements[i].classList.remove('labelBackground');
        }
    }
}


//dodawanie underline do sekcji w której jestesmy
function underlineMenuItem() {
    var title = document.querySelector('.title');
    var menu = document.querySelector('.menu');
    if (title.getBoundingClientRect().bottom < 0) {
        menu.classList.add("sticky")
    } else {
        menu.classList.remove("sticky");
    }
    var sections = document.querySelectorAll(".sectionContainer");
    var menuitems = document.querySelectorAll(".menu-item");
    var menuheight = menu.offsetHeight;
    for (var i = 0; i < sections.length; i++) {
        var elementTop = sections[i].getBoundingClientRect().top;
        if (elementTop - menuheight < 0) {
            menuitems[i].classList.add("active");
            if (i > 0) {
                menuitems[i - 1].classList.remove("active");
            }
        } else {
            menuitems[i].classList.remove("active");
        }
    }
}


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

function changeModeToTouchScreenDeviceMode() {
    function hasTouch() {
        return 'ontouchstart' in document.documentElement ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }
    if (hasTouch()) { // remove all the :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) { }
    }
}


window.addEventListener("scroll", underlineMenuItem);
window.addEventListener('load', resizemap);
window.addEventListener('resize', (event) => {
    centerTables(),
        resizemap()
});