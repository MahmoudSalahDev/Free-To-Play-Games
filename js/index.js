// let mmorpg = document.getElementById("mmorpg")
// let shooter = document.getElementById("shooter")
// let sailing = document.getElementById("sailing")
// let permadeath = document.getElementById("permadeath")
// let superhero = document.getElementById("superhero")
// let pixel = document.getElementById("pixel")
let loading = document.querySelector(".loading");
let gamesData = document.getElementById("gamesData");

let details = document.getElementById("details")
let Category = document.getElementById("Category")
let Platform = document.getElementById("Platform")
let Status = document.getElementById("Status")
let closeIcon = document.getElementById("close")
let home = document.getElementById("home")
let gameTitle = document.getElementById("gameTitle")
let description = document.getElementById("description")
let detailsphoto = document.getElementById("detailsphoto")
let goToGameUrl = document.getElementById("goToGameUrl")


// start links
let links = document.querySelectorAll(".nav-link");

links.forEach(element => {
    element.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        element.classList.add("active");
    })
});
// end links

let gamesList = []
let allCols;

async function getApi(search) {
    loading.classList.replace("d-none", "d-flex")
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '64cbea3a02msh961deea081c2e68p113e49jsnfaad423a768a',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${search}`, options)
    const response = await api.json();
    gamesList = response;
    // console.log(gamesList)
    displayGames()
    loading.classList.replace("d-flex", "d-none")

}
links.forEach(element => {
    element.addEventListener("click", function () {
        // console.log(this.innerHTML);
        getApi(this.innerHTML)
    }
    )
});
// links.addEventListener("click", function () {


//     getDegree(findInput.value)

// })
// console.log(gamesList)
getApi("mmorpg")
let gameDetails = {}
function displayGames() {
    let contain = ``
    for (var i = 0; i < gamesList.length; i++) {
        contain += `
                        <div data-id="${gamesList[i].id}" class="col-xl-3 col-lg-4 col-md-6 all-cols">
                        <div class="card h-100">
                            <div class="card-body">
                            <img src="${gamesList[i].thumbnail}" class="w-100" alt="${gamesList[i].title} thumbnail">
                            <div class="caption">
                                <div class="head d-flex justify-content-between align-items-center">
                                    <h3>${gamesList[i].title}</h3>
                                    <span class="badge ">Free</span>
                                </div>
                                <p>${gamesList[i].short_description}</p>
                            </div>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <span class="badge">${gamesList[i].genre}</span>
                                <span class="badge">${gamesList[i].platform}</span>
                            </div>
                        </div>
                    </div>
                `
    }
    gamesData.innerHTML = contain;
    allCols = document.querySelectorAll(".all-cols");
    allCols.forEach(element => {
        element.addEventListener("click", function () {
            // console.log(this.getAttribute("data-id"));


            async function getDetails(num) {
                loading.classList.replace("d-none", "d-flex")
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '64cbea3a02msh961deea081c2e68p113e49jsnfaad423a768a',
                        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                    }
                };
                const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${num}`, options)
                const response = await api.json();
                gameDetails = response;
                // console.log(gameDetails);
                detailsphoto.innerHTML = `<img src="${gameDetails.thumbnail}" class="w-100" alt="${gameDetails.title} thumbnail">`
                gameTitle.innerHTML = `Title: ${gameDetails.title}`
                Category.innerHTML = gameDetails.genre
                Platform.innerHTML = gameDetails.platform
                Status.innerHTML = gameDetails.status
                description.innerHTML = gameDetails.description
                goToGameUrl.setAttribute("href", `${gameDetails.game_url}`);
                details.classList.remove("d-none")
                home.classList.add("d-none")
                loading.classList.replace("d-flex", "d-none")
            }
            getDetails(this.getAttribute("data-id"))
        })
    });
}
closeIcon.addEventListener("click", () => {
    details.classList.add("d-none")
    home.classList.remove("d-none")
})






