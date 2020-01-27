/* put the keyword and city parameters into queryURL */
function buildQueryURL()  {
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

/* search by keyword or/and city */
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
      for (i=0; i<response._embedded.events.length; i++) {
        var li_el = $("<li>");
        var link_el = $("<a>");
        link_el.text(response._embedded.events[i].name);
        link_el.attr("href", response._embedded.events[i].url);
        li_el.append(link_el);
        $("#results").append(li_el);
      }
      
  });
});

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
      for (i=0; i<response._embedded.events.length; i++) {
        var li_el = $("<li>");
        var link_el = $("<a>");
        link_el.text(response._embedded.events[i].name);
        link_el.attr("href", response._embedded.events[i].url);
        li_el.append(link_el);
        $("#results").append(li_el);
      }    
  });

}

/* Process The API Response */
$("#location").on("click", function(event) {
  event.preventDefault();
  clear();
  navigator.geolocation.getCurrentPosition(showPosition, showError); 
});

$("#clear-all").on("click", clear);