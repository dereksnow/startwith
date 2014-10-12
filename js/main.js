$(document).ready(function() {
    $("#movies-lookup").submit(function(e) {
        e.preventDefault();

        var $results = $("#results"),
            actor = $("#inputActor").val(),
            apiKey = "089b243059a48ca001c7242cf7f51fd3";
        var requestURL = "http://api.themoviedb.org/3/search/person?callback=?";
        $("#results").html("");
	$("#query-error").remove();
        $.getJSON(requestURL, {
            'api_key': apiKey,
            'query': actor
        }, function(data) {
            console.log(data);
            if (data && data.results[0]) {
                var id = data.results[0].id;
                var requestURL = "http://api.themoviedb.org/3/person/" + id + "/movie_credits?callback=?";
                var actorsName = data.results[0].name;
                $.getJSON(requestURL, {
                    'api_key': apiKey,
                }, function(creditsData) {
                    console.log(creditsData);
                    var title = "",
                        posterPath = "",
                        imageURL = "";
                    $("#results").append("<div class='row text-center'><h2>Movie credits for " + actorsName + "</h2></div>");
                    for (movie in creditsData.cast) {
			var movieData = creditsData.cast[movie];
                        var title = movieData.title;
                        var character = movieData.character;
			var releaseDate = movieData.release_date;
                        var posterPath = movieData.poster_path;
                        if (posterPath) {
                            imageURL = "<img src='http://image.tmdb.org/t/p/w185" + posterPath + "' height='278' width='185'>";
                        } else {
                            imageURL = "<img src='../img/no_image.png' height='278' width='185'>";
                        }
                        if (releaseDate) {
                            releaseYear = releaseDate.split("-")[0];
                        } else {
				releaseYear = "Not Available";
			}
                        $("#results").append("<div class='row text-center movie-data'><div class='col-md-3'><ul class='list-unstyled'>" + "<li> Title: " + title + "</li>" + "<li> Character: " + character + "</li>" + "<li> Release Year: " + releaseYear + "</li>" +
                            "</ul></div><div class='col-md-3'>"

                            + imageURL +
                            "</div></div>");
                    }
                });
            } else {
                $("#query").append("<div id='query-error' class='row error-query'><div class='col-md-4 col-md-offset-4'><div class='alert alert-danger text-center' role='alert'>No results for <strong>" + actor + "</strong> Please search again.</div></div></div>");
            }
        });
    })
});
