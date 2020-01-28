function searchEats(event){
    console.log("eats!!")
    document.location.href = "restuarants.html"
}

function searchEvents(event){
    console.log("events!!")

    document.location.href = "tickets.html"
}

$("#eats").on("click", searchEats);
$("#events").on("click", searchEvents);

$("[data-menu-underline-from-center] a").addClass("underline-from-center");
