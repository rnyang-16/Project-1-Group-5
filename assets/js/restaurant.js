$(document).foundation()

/*---------- Code to populate Select-Categories field-------- */

var categoryUrl="https://developers.zomato.com/api/v2.1/categories"
var categoriesOption=[];

    $.ajax({
        url:categoryUrl,
        method:"GET",
        headers: {
            "user-key":"120096337753aa5793884bfdbe77a2ae",
            "Accept":"application/json"
        }
    }).then(function(response){
            console.log(response);
            
            $.each(response.categories,function(index, value){
                    categoriesObj={
                    name:value.categories.name,
                    id: value.categories.id
                }
                categoriesOption.push(categoriesObj);
            }) 
            createSelectOptions(categoriesOption);
        })
/* --------------for each method to create select Options ---------------*/
    function createSelectOptions(categoriesOption){
        $(categoriesOption).each(function(index, value){
            var options=$("<option>").text(value.name).attr("restaurantid", value.id);

            $("#selectOptions").append(options);
            })
    }

/*-----------Add Event listener to the Near-Me button to fetch nearby Restaurants----------- */

$(".locationBtn").on("click",function(events){
    event.preventDefault();
    $.get("https://api.ipdata.co?api-key=test", function(response) {
        console.log(response);
        var ipAdress=response.ip;
        var city=response.city;
        var latitude=response.latitude;
        var longitude=response.longitude;
        var response=JSON.stringify(response, null, 4);
        console.log("ip: "+ipAdress+"  longitude:  "+longitude+ "  latitude:  "+latitude);
        console.log("output response"+response);
        getLocation(latitude,longitude);
        $(".translucent-form-overlay ").addClass("hide");
    });
})
var APIkey="120096337753aa5793884bfdbe77a2ae"; //Zomato ApI Key

/*----------------------function  to fetch nearby restaurant------------------*/

function getLocation(latitude,longitude){

    var queryUrl="https://developers.zomato.com/api/v2.1/geocode?lat="+latitude+"&lon="+longitude;

        $.ajax({
        url:queryUrl,
        method:"GET",
        headers: {
            "user-key":"120096337753aa5793884bfdbe77a2ae",
            "Accept":"application/json"
        }
    }).then(function(response){
        console.log(response);
        var myrestaurantArray = []
        $.each(response.nearby_restaurants, function(index, value){
            console.log(value.restaurant.name)
            myrestaurant = {
                name: value.restaurant.name, 
                url: value.restaurant.url,
                imageURL:value.restaurant.thumb,
                adress:value.restaurant.location.address,
                menu:value.restaurant.menu_url,
                cousines:value.restaurant.cuisines
            };
            myrestaurantArray.push(myrestaurant);
            console.log(myrestaurantArray);
        });
        addCards(myrestaurantArray);
    });
}

/*-------------------Add event listener to the search button-------------------------*/

$(".searchButton").on("click",function(events){
    events.preventDefault();
    var cityID;
    var userCity=$("#inputTextField").val().trim();
    console.log(userCity);
    var userCategory=$("#selectOptions").val().trim();
    var userCategoryId=$("#selectOptions")[0].selectedOptions[0].attributes[0].value; // categoty ID
    console.log(userCategoryId);

    var searchCityIDURL="https://developers.zomato.com/api/v2.1/cities?q="+userCity;

    $.ajax({
        url:searchCityIDURL,
        method:"GET",
        headers: {
            "user-key":"120096337753aa5793884bfdbe77a2ae",
            "Accept":"application/json"
        }
    }).then(function(response){
        console.log(response);
        cityID= response.location_suggestions[0].id;  // City ID
        console.log(cityID);
        searchCityFunction(userCategoryId,cityID);
    })
})

/*---------------function to serch restaurant with City and category detail------------ */

function searchCityFunction(userCategoryId,cityID){
    var searchURL="https://developers.zomato.com/api/v2.1/search?entity_id="+cityID+"&entity_type=city&category="+userCategoryId;
    console.log(searchURL);

    $.ajax({
        url:searchURL,
        method:"GET",
        headers: {
            "user-key":"120096337753aa5793884bfdbe77a2ae",
            "Accept":"application/json"
        }
    }).then(function(response){
        console.log(response);
        var searchResultsArray=[]
        $.each(response.restaurants, function(index,value){
            var resultObj={
                name: value.restaurant.name,
                url: value.restaurant.url,
                imageURL:value.restaurant.thumb,
                adress: value.restaurant.location.address,
                menu:value.restaurant.menu_url,
                cousines:value.restaurant.cuisines
            }
            searchResultsArray.push(resultObj)
            console.log(searchResultsArray);
        })
        $(".translucent-form-overlay ").addClass("hide");
        addCards(searchResultsArray)
    })
}

function addCards(restaurant) {
    $.each(restaurant, function(index, value){
        
        // $(".results").append($("<div>").addClass("columns medium-3 cardsDiv")
        // .append($("<h6>").addClass("float-right coloumn-small-4").html(value.name).append($("<p>").html(value.adress)
        // .append($("<img src=" + value.imageURL + ">").addClass("float-left thumbnail coloumn-small-4")))))

        $(".results").append(`  <div class="card">
                                    <div class="row">
                                        <div class="coloumn-small-6 float-left img-responsive thumbnail">
                                            <img src="${value.imageURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS27vqG8i62H8RxLyDKoZCsjqIAWiP26oeaoHfSmUBpRlKRrjEA&s"}"></img>
                                        </div>
                                        <div class="coloumn small-5  center">
                                            <h6>${value.name}</h6>
                                            <p>${value.adress}</p>
                                            <p id=> <b>cuisines:</b>${value.cousines}</p>
                                        </div>
                                    </div>
                                </div>`)
    });
}
$("[data-menu-underline-from-center] a").addClass("underline-from-center");

// <div class=conatiner>
{/* <div class="row">
    <div class="coloumn-small-4 float right">
        <h6>value.name</h6>
        <p>adress</p>
    </div>
    <div class="coloumn-small-4 float left">
        <img src="value.imageURL"></img>
    </div>
</div>  */}

        






        

        
