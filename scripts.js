var tablesInfo = JSON.parse(JSON.stringify(guestsInfo))
let guestInformations = []
let tableInformations = []

const GUEST_PARTNER_STRING_VALUE = "OSOBA TOWARZYSZĄCA"

pageLoad()

function pageLoad() {
    createWeedingCountDown()
    getTablesAndGuestsInfo()
    createTables()
    centerTables()
    sortGuestInformations()
    createSearchBar()
    changeModeToTouchScreenDeviceModeIfNeeded()
    addListeners()
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
                    "guestName": guestInfo.name,
                    "chairId": guestInfo.id,
                    "chairTableId": currentTableId,
                }
            )
        })
    });
    guestInformations.sort((a, b) => {
        if (a.chairTableId < b.chairTableId) {
            return -1
        } else {
            if (a.chairTableId == b.chairTableId && a.chairId < b.chairId) {
                return -1
            }
            return 1
        }
    })
    console.log(guestInformations)
}


function createTables() {
    tableInformations.forEach(tableInformation => {
        var tableContainer = document.getElementById("tableContainer")
        tableContainer.innerHTML += `<div class="guestTable table" id="table_${tableInformation.tableId}"></div>`
        var tableDivHTML = document
            .getElementById(`table_${tableInformation.tableId}`)
            .innerHTML

        var tableStyle =
            `grid-area: 1 / 2 / ${((tableInformation.tableSize / 2) + 1)} / 4`

        tableDivHTML +=
            `<div class=\"tableTable tableText"` +
            ` style="${tableStyle}">${tableInformation.tableId}</div>`
        guestInformations.forEach(guestInformation => {
            (tableDivHTML =
                createChair(guestInformation, tableInformation, tableDivHTML))
        })
        table = document.getElementById(`table_${tableInformation.tableId}`)
        table.innerHTML = tableDivHTML

    })


    function createChair(guestInformation, tableInformation, tableDivHTML) {
        if (guestInformation.chairTableId == tableInformation.tableId) {
            var seat
            var chairStyle = ""
            if (guestInformation.chairId > tableInformation.tableSize / 2) {
                seat = "chairRight"
            } else {
                seat = "chairLeft"
                chairStyle = `grid-area: ${guestInformation.chairId} / 1 / ${guestInformation.chairId + 1} / 2`
            }


            var guestNameFormated = () => {
                resultName = ""
                nameParts = guestInformation.guestName.split(" ")
                nameParts.forEach(namePart => {
                    formatName(namePart)
                })
                return resultName
            }
            tableDivHTML +=
                `<span class=\"chair ${seat}" id="table_${guestInformation.chairTableId}_seat_${guestInformation.chairId}"` +
                ` style="${chairStyle}"><p2>${guestNameFormated()}</p2></span>`
        }
        return tableDivHTML

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
        if (guestInformations[i].guestName.toUpperCase() != GUEST_PARTNER_STRING_VALUE) {
            serchbar.innerHTML +=
                //html code
                `<label class="listElements"`
                + `id="table_${guestInformations[i].chairTableId}_guest_${guestInformations[i].chairId}"`
                + `onclick="addAtributeSeat(${guestInformations[i].chairId}, ${guestInformations[i].chairTableId})">`
                +
                // wyświetlanie imienia i nazwiska
                `<span class="labelNick">` +
                `${guestInformations[i].guestName}` +
                `</span>` +

                // wyświetlanie nr stołu
                `<span>` +
                `${guestInformations[i].chairTableId}` +
                `</span>` +

                `<br /></label>`
        }
    }
}



function addAtributeSeat(chairId, tableId) {
    let chairs = document.getElementsByClassName("chair")
    for (let i = 0; i < chairs.length; i++) {
        chairs[i].id != `table_${tableId}_seat_${chairId}`
            ? chairs[i].classList.remove("checkOn")
            : chairs[i].classList.toggle("checkOn")
    }

    let choosenGuestChair = document.getElementById(`table_${tableId}_seat_${chairId}`)
    let tables = document.getElementsByClassName("table")
    for (let i = 0; i < tables.length; i++) {
        tables[i].style.display = (tables[i].id != `table_${tableId}`
            || !choosenGuestChair.classList.contains("checkOn"))
            ? "none"
            : "grid"
        if (tables[i].style.display == "grid") {
            centerTables()
        }
    }

    let guestListElements = document.getElementsByClassName("listElements")
    for (let i = 0; i < guestListElements.length; i++) {
        guestListElements[i].id == `table_${tableId}_guest_${chairId}`
            ? guestListElements[i].classList.toggle("labelBackground")
            : guestListElements[i].classList.remove("labelBackground")
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


function findGuest() {
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
function resizeMap() {
    var churimg = document.getElementsByClassName("church");
    var churimgheight = churimg[0].height;
    document.getElementById("church-map").height = churimgheight;
    var hallimg = document.getElementsByClassName("hall");
    var hallimgheight = hallimg[0].height;
    document.getElementById("hall-map").height = hallimgheight;

}

function changeModeToTouchScreenDeviceModeIfNeeded() {
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


function addListeners() {
    window.addEventListener("scroll", underlineMenuItem);
    window.addEventListener('load', resizeMap);
    window.addEventListener('resize', (event) => {
        centerTables(),
            resizeMap()
    });
}