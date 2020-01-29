
function buildQueryURL() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";
  var queryParams = {"apikey":"4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq"};

  queryParams.keyword = $("#keyword")
    .val()
    .trim();

  queryParams.city = $("#city")
    .val()
    .trim();

  return queryURL + $.param(queryParams);
}
  
function searchButtonClick(event) {
  event.preventDefault();
  var queryURL = buildQueryURL();
  console.log(queryURL);   
  $("#ticketErrorMsg").empty()

  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
    let resultsArray = [];
    if(response._embedded){
      $.each(response._embedded.events, function (index, value){
        let eventObj = {
          name: value.name,
          venue: value._embedded.venues[0].name,
          date: value.dates.start.localDate,
          time: value.dates.start.localTime,
          img: value.images[0].url,
          link: value.url
        }    
          resultsArray.push(eventObj);
          let formatDate = moment(eventObj.date).format("MMM D YYYY");
          console.log(eventObj)
      })
      createCard(resultsArray)
      $("#eventSearch").addClass("hide")
    }
    else {
      $("#ticketErrorMsg").text("Please enter a valid city & Event Type!")
    }

  })
};
  
  function createCard(tickets){
    console.log(tickets);
    $.each(tickets, function(index, value){
      console.log(value);
      var formattedDate=moment(value.date).format("dddd, MMMM Do YYYY");
      var formattedTime=moment(value.time, "HH:mm:ss").format(" h:mm A");
      $(".results").append(`<div class="card">
                              <div class="row">
                                  <div class="coloumn-small-4 float-left img-responsive thumbnail">
                                      <img class="cardImg" src="${value.img}"></img>
                                  </div>
                                  <div class="coloumn-small-8">
                                      <h6>${value.name}</h6>
                                      <p><b>WHERE: </b>${value.venue}</p>
                                      <p class="eventDate"><b>WHEN : </b> ${formattedDate} at ${formattedTime} </p>
                                      <a href="${value.link}"target="_blank">Get Tickets</a>
                                  </div>
                              </div>
                            </div>`)
      })
    };
  
  /* Getting The Browser’s Geolocation */
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      var x = document.getElementById("location");
      x.innerHTML = "Geolocation is not supported.";
  }
}


function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          x.innerHTML = "User denied the request for Geolocation."
          break;
      case error.POSITION_UNAVAILABLE:
          x.innerHTML = "Location information is unavailable."
          break;
      case error.TIMEOUT:
          x.innerHTML = "The request to get user location timed out."
          break;
      case error.UNKNOWN_ERROR:
          x.innerHTML = "An unknown error occurred."
          break;
  }
}

/* Passing Location To The Discovery API */
function showPosition(position) {
  var x = document.getElementById("location");
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  $.ajax({
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq&latlong="+latlon,
    method: "GET" 
  })
    .then(function(response){
      console.log(response);
      let resultsArrayLocation = [];

        $.each(response._embedded.events, function (index, value){
            let eventObj = {
                name: value.name,
                venue: value._embedded.venues[0].name,
                date: value.dates.start.localDate,
                time: value.dates.start.localTime,
                img: value.images[0].url,
                link: value.url
            }   
            //changes
          //  let formatDate=moment(eventObj.date).format("dddd, MMMM Do YYYY");
          //   console.log(moment(eventObj.time, "HH:mm:ss").format(" h:mm A"))
            resultsArrayLocation.push(eventObj);
           
      })
      createCard(resultsArrayLocation);
      $("#eventSearch").addClass("hide");
  })
};

/* Process The API Response */
$("#location").on("click", function(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition, showError); 
});
  
  $("[data-menu-underline-from-center] a").addClass("underline-from-center");
  $("#search-button").on("click", searchButtonClick);