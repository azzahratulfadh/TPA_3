let API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=56fbe8b2d958e5c2d2b70c90819ca67c&page=1'
let PATH_IMG = 'https://image.tmdb.org/t/p/w500'
let SEARCH = 'https://api.themoviedb.org/3/search/movie?&api_key=56fbe8b2d958e5c2d2b70c90819ca67c&query=';

let main = document.getElementById('main')
let form = document.getElementById('form')
let search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    let res = await fetch(url)
    let data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        let { title, poster_path, vote_average, release_date} = movie

        let moviecreate = document.createElement('div')
        moviecreate.classList.add('movie')

        moviecreate.innerHTML = `
            <img src="${PATH_IMG + poster_path}" alt="${title}">
            <div class="movie-info">
          <h2>${title}</h2>
          <h4>${release_date}</h4>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
        `
        main.appendChild(moviecreate)
    })
}

function getClassByRate(vote) {
    if(vote >=8) {
        return 'red'
    }else if(vote >=6){
        return 'blue'
    }else{
        return'green'
    }
}

form.addEventListener('submit', (e) =>  {
    e.preventDefault()

    let searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH + searchTerm)

        search.value = ''
    }else {
        window.location.reload()
    }
})
