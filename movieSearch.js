$("#addMovie").on("click", function(event) {
    inputValue = $("#movieName").val()
    if(inputValue.length > 0){
    $("#storeAge").append(`<input class="movies-btn" type="button" value="${inputValue}">`)
    console.log("movieInput: ", inputValue)
    }
})

var movieName = ""

$(document).on("click", ".movies-btn", function(){
    movieName = this.value
    console.log("movie: ", movieName)
    displayMovieInfo()
})



function displayMovieInfo() {

var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=30337a4a";

$.ajax({
  url: queryURL,
  method: "GET"
}).done(function(response) {
    if(response.Response == "False"){
        $("#movieInfo").prepend("<p>Movie not found!")
    }else{
    $("#movieInfo").prepend(
    `<div class="foundMovies" style="border: 1px solid red">
        <p>Rating: ${response.Rated}</p>
        <p class="scores">Score: 
            
        </p>
        <p>Release Date: ${response.Released}</p>
        <p>Plot: ${response.Plot}</p>
        <img src="${response.Poster}"></img>

    </div>`)
    }
    for(i = 0; i < response.Ratings.length; i++ ){
                $(".scores").append(`<span>${response.Ratings[i].Source}: ${response.Ratings[i].Value} </span>`)
            }
}).catch(function(){
    console.log("Something went wrong.")})
};

