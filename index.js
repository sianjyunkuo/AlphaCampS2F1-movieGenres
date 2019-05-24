const BASE_URL = 'https://movie-list.alphacamp.io/api/v1/'
const POSTER_URL = 'https://movie-list.alphacamp.io/posters/'
const movieList = document.querySelector('#movie-list')
const moviesPanel = document.querySelector('#movies-panel')
const data = []
const category = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

// console.log(Object.keys(category))
// console.log(category)

axios.get(BASE_URL + "movies/")
  .then((response) => {
    data.push(...response.data.results)
  })
  .catch((err) => console.log(err))

//function create list
function createMovieList(category, list) {
  let text = ''
  text = `
    <li>
      <a class = "nav-link" data-toggle="list" href="#" data-id="${list + 1}"> ${Object.values(category)[list]} </a>
    </li>
    `
  movieList.innerHTML += text
}

for (let i = 0; i < Object.keys(category).length; i++) {
  createMovieList(category, i)
}



//eventlistener create movies
movieList.addEventListener('click', (categoryChosen) => {
  const movieGenres = Number(categoryChosen.target.dataset.id)
  const genre = categoryChosen.target.matches('[data-toggle="list"]')
  //let categoryName = categoryChosen.target.innerText
  //console.log(genre)
  //console.log(categoryName)
  let results = []
  results = data.filter(movie => movie.genres.includes(movieGenres))
  if (!genre) {
    return
  }
  displayDataList(results)
})

// function display movie
function displayDataList(data) {
  let htmlContent = ''
  data.forEach(function (item, index) {
    // let number=item.genres
    // console.log(number)
    htmlContent += `
      <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
`
    item.genres.forEach(function (value) {
      htmlContent += `<p class="d-inline-block bg-light mx-1 px-2 ${value}">${category[value]}</p>`
    })

    htmlContent += `
          </div>
        </div>
      </div>
      `
  })
  moviesPanel.innerHTML = htmlContent
}