// $.ajax({
//   url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=soccer&apikey=4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq",
//   method: "GET"
// })
// .then(function(response){
//   console.log(response);   
// });


// let apikey = "4wDYyinV6ZsMzVdTn2gRFTJQnFyW6euq"
// let eventOptionsUrl = `https://app.ticketmaster.eu/mfxapi/v2/event.json?apikey=${apikey}&cities?lang&domain&country_id=200`
//   $.ajax({
//     url: eventOptionsUrl,
//     method: "GET",

   
//   }) 
//   console.log(eventOptionsUrl)

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
                img: value.images[0].url,
                link: value.url
            }    
            console.log(eventObj)
                $("#eventSearch").hide();
                $(".results").append(`  <div class="card">
                                                <div class="row">
                                                    <div class="coloumn-small-4 float-left img-responsive thumbnail">
                                                        <img src="${value.images[0].url}"></img>
                                                    </div>
                                                    <div class="coloumn-small-8">
                                                        <h6>${value.name}</h6>
                                                        <p>${value._embedded.venues[0].name}</p>
                                                        <a href="${value.url}">Get Tickets</a>
                                                    </div>
                                                </div>
                                            </div>`)
                });
            
        })

    
  });

  
  
  $("#clear-all").on("click", clear);