
// DOM do node
var p2NodeList = document.querySelectorAll('p2');
var serchbar = document.querySelector('.guestSerchBar');

// node do array
var p2List = Array.from(p2NodeList);




// let array = []

// for(let i = 0 ; i < p2List.length; i++) {
//     array.push(p2List[i].outerText)
// }


// console.log(p2NodeList)
// console.log(p2List)
// console.log('hi')
// console.log("array",array)
 

// const object = {}
// for(let i = 0 ; i < p2List.length; i++) {
//     object[p2List[i].outerText] = "seat"+(i+1)
//     serchbar.innerHTML += 
//         "<input type=\"checkbox\" id=" +
//         "\"" + "seat"+(i+1) + "\"/>" + 
//         p2List[i].outerText + 
//         "<br />"
// }
// console.log("object",object)


// array of objects
let arrayObject = []
for(let i = 0 ; i < p2List.length; i++) {
    arrayObject[i] = {
        "nazwisko":p2List[i].outerText,
        "id":"seat"+[(i+1)],
        "number": (i+1)
    }
}


// sortowanie alfabetyczne
function compare( a, b ) {
    if ( a.nazwisko < b.nazwisko ){
      return -1;
    }
    if ( a.nazwisko > b.nazwisko ){
      return 1;
    }
    return 0;
}
arrayObject.sort( compare );

console.log("arrayObject",arrayObject)


// renderowanie listy
for(let i = 0 ; i < arrayObject.length; i++) {
    
    serchbar.innerHTML += 
        "<input type=\"checkbox\" onclick=\"addAtributeSeat(" +
        arrayObject[i].number + 
        ")\" id=\"" +
        arrayObject[i].id + 
        "\"/>" + 
        arrayObject[i].nazwisko + 
        "<br />"
}

function addAtributeSeat(numb) {
    let seat = document.querySelector('.seatHTML'+ numb)
    // seat.setAttribute('id',"checkOn")
    seat.classList.toggle ('checkOn');

    console.log("seat", seat)
}
