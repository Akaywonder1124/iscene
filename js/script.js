const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = ` <div class="card">
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />`
                : `<img
              src="images/no-image.png"
              class="card-img-top"
              alt="Movie Title"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>`;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function displayTVShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.innerHTML = ` <div class="card">
          <a href="shows.html?id=${show.id}">
            ${
              show.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />`
                : `<img
              src="images/no-image.png"
              class="card-img-top"
              alt="Movie Title"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        </div>`;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function getMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const detail = await fetchAPIData(`movie/${movieId}`);
  const div = document.createElement("div");
  div.innerHTML = ` <div class="details-top">
          <div>
              ${
                detail.poster_path
                  ? `<img
              src="https://image.tmdb.org/t/p/w500${detail.poster_path}"
              class="card-img-top"
              alt=${detail.title}
            />`
                  : `<img
              src="images/no-image.png"
              class="card-img-top"
              alt="Movie Title"
            />`
              }
          </div>
          <div>
            <h2>${detail.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${detail.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Release Date: ${detail.release_date}</p>
            <p>
            ${detail.overview}
            </p>
            <h5>Genres</h5>
          <ul>
             ${detail.genres.map((value) => `<li>${value.name}</li>`).join("")}
          </ul>
            <a href=${
              detail.homepage
            } target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${
              detail.budget
            }</li>
            <li><span class="text-secondary">Revenue:</span> $${
              detail.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              detail.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${
              detail.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${detail.production_companies
            .map((value) => value.name + "&nbsp; ")
            .join("")}</div>
        </div>`;
  document.querySelector("#movie-details").appendChild(div);
}

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  //LOL, don't COPY. You can get yours at https://www.themoviedb.org/
  const API_KEY = "e2121f4c0901b3856a1985143270d754";
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US `
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function changeLogo() {
  const logo = document.querySelector(".logo");
  const footerLogo = document.querySelector(".logo span");
  logo.textContent = "iscene";
  footerLogo.textContent = "iscene";
}
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTVShows();
      break;
    case "/movie-details.html":
      getMovieDetails();
      break;
    case "/tv-details.html":
      console.log("Tv Shows");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
  changeLogo();
}

document.addEventListener("DOMContentLoaded", init);
