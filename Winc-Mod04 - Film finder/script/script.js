// Add movies to DOM function
const addMoviesToDom = function (moviesToAdd) {
    // Get movie-list handle and clear list
    const moviesList = document.getElementById("movies-list");
    moviesList.innerHTML = "";

    // populate movies-list
    for (let i = 0; i < moviesToAdd.length; i++) {
        const newLi = document.createElement("li");
        const newP = document.createElement("p");
        const newH4 = document.createElement("h4");
        newH4.textContent = moviesToAdd[i].title;

        const newA = document.createElement("a");
        newA.href = "https://www.imdb.com/title/" + moviesToAdd[i].imdbID;
        newA.target = "_blank";

        const newImg = document.createElement("img");
        newImg.src = moviesToAdd[i].poster;
        newImg.alt = moviesToAdd[i].title;

        newLi.appendChild(newP);
        newP.appendChild(newH4);
        newP.appendChild(newA);
        newA.appendChild(newImg);
        moviesList.appendChild(newLi);
    };
}

const handleOnChangeEvent = function (element) {
    console.log(element);
    const searchInput = document.getElementById("searchmovies");

    // Search element before all other radio button options...
    if (searchInput.value === "") {
        // Radio button is pressed..
        console.log("switch Statement");
        console.log(element.target.value);
        switch (element.target.value) {
            case undefined:
            case "all":
                addMoviesToDom(movies);
                break;
            case "latest":
                addMoviesToDom(movies.filter(object => {
                    if (object.year >= 2014) {
                        return object;
                    }
                }));
                break;
            default:
                addMoviesToDom(movies.filter(object => {
                    if (object.title.toLowerCase().includes(element.target.value)) {
                        return object;
                    }
                }));
        }
    } else {
        // Search option is used..
        console.log("search Statement");
        addMoviesToDom(movies.filter(object => {
            if (object.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
                return object;
            }
        }));
        searchInput.value = "";
    }
}

// setup Event listeners.
const radioButtons = document.querySelectorAll('[type="radio"]');
radioButtons.forEach(element => element.addEventListener("change", handleOnChangeEvent));

const searchButton = document.getElementById("searchbutton");
searchButton.addEventListener("click", handleOnChangeEvent, false);

// Catch enter key on search input..
const searchInput = document.getElementById("searchmovies");
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

// First run - load all movies:
addMoviesToDom(movies);
