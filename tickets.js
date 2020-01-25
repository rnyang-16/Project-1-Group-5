// $.ajax({
//   url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=soccer&apikey=4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq",
//   method: "GET"
// })
// .then(function(response){
//   console.log(response);   
// });

function buildQueryURL() {
  var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?";

  var queryParams = {"apikey":"4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq"};

  queryParams.keyword = $("#keyword")
    .val()
    .trim();

  queryParams.city = $("#city")
    .val()
    .trim();

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

$("#clear-all").on("click", clear);