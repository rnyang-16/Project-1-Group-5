// $.ajax({
//   url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=soccer&apikey=4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq",
//   method: "GET"
// })
// .then(function(response){
//   console.log(response);   
// });


// let apikey = "IGvjW5Z2WgDlL9rVeNhyTPrvhM0cn9dU"
// let eventOptionsUrl = `https://app.ticketmaster.eu/mfxapi/v2/cities?&country_id=840&apikey=${apikey}`
// let cityOptions = [];
//   $.ajax({
//     url: eventOptionsUrl,
//     method: "GET",
//     accept: "application/json",
//   }) .then(function(response){

//     $.each(response.cities, function(index, value) {
//       citiesObject = {
//         name: value.name
//       }
//       cityOptions.push(citiesObject); 
//     })

//     cityOptions.sort(function (a,b){
//       return a-b
//       console.log(cityOptions)
//     })
//     createCityList(cityOptions);
//   });

let apikey = "IGvjW5Z2WgDlL9rVeNhyTPrvhM0cn9dU"
let eventOptionsUrl = `https://app.ticketmaster.eu/mfxapi/v2/cities?&country_id=840&apikey=${apikey}`
let cityOptions = [];
  $.ajax({
    url: eventOptionsUrl,
    method: "GET",
    accept: "application/json",
  }) .then(function(response){

    $.each(response.cities, function(index, value) {
      cityOptions.push(value.name); 
    })
    
    cityOptions.sort()

    createCityList(cityOptions);
  });

  function createCityList(cityOptions){
    console.log(cityOptions)
    for (let i = 0; i < cityOptions.length; i++){
      $("#eventOptions").append(`<option value="${cityOptions[i]}">${cityOptions[i]}</option>`);
    }
  }


function buildQueryURL() {
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
  
    var queryParams = {"apikey":"4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq"};
  
    queryParams.keyword = $("#keyword")
      .val()
      .trim();

    queryParams.city = $("#eventOptions")
      .val();

    console.log($("#eventOptions").children("option:selected").val())
    // queryParams.location = $("#currentLocation")
    //   .val()
    //   .trim();
  
  
    return queryURL + $.param(queryParams);
  }
  
  function clear() {
    $("#results").empty();
  }
  
  $("#search-button").on("click", function(event) {
  
    event.preventDefault();
  
    clear();
  
    var queryURL = buildQueryURL();
    console.log(queryURL);   
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response){
        console.log(response);
        // for (i=0; i<response._embedded.events.length; i++) {
        //   var li_el = $("<li>");
        //   var link_el = $("<a>");
        //   link_el.text(response._embedded.events[i].name);
        //   link_el.attr("href", response._embedded.events[i].url);
        //   li_el.append(link_el);
        //   $("#results").append(li_el);
        // }

        let resultsArray = [];

        $.each(response._embedded.events, function (index, value){
            let eventObj = {
                name: value.name,
                venue: value._embedded.venues[0].name,
                date: value.dates.start.localDate,
                time: value.dates.start.localTime,
                img: value.images[0].url,
                link: value.url
            }    
            let formatDate = moment(eventObj.date).format("MMM D YYYY");
            console.log(eventObj)

                $("#eventSearch").hide();

                $(".results").append(`<div class="card">
                                        <div class="row">
                                            <div class="coloumn-small-4 float-left img-responsive thumbnail">
                                                <img src="${value.images[0].url}"></img>
                                            </div>
                                            <div class="coloumn-small-8">
                                                <h6>${value.name}</h6>
                                                <p>${value._embedded.venues[0].name}</p>
                                                <p class="eventDate">${formatDate} ${value.dates.start.localTime}</p>
                                                <a href="${value.url}">Get Tickets</a>
                                            </div>
                                        </div>
                                      </div>`)
                });
        })
  });

  
  
  $("#clear-all").on("click", clear);
  $("[data-menu-underline-from-center] a").addClass("underline-from-center");
