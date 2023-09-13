const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
    totalResults: 1,
  },
  APIKey: "e2121f4c0901b3856a1985143270d754",
  APIURL: "https://api.themoviedb.org/3/",
};

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  //LOL, don't COPY. You can get yours at https://www.themoviedb.org/
  const API_KEY = global.APIKey;
  const API_URL = global.APIURL;
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US `
  );
  const data = await response.json();
  hideSpinner();
  return data;
}

//search API function
async function searchAPIData() {
  //LOL, don't COPY. You can get yours at https://www.themoviedb.org/
  const API_KEY = global.APIKey;
  const API_URL = global.APIURL;
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
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
          <a href="tv-details.html?id=${show.id}">
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
  DisplayBackdropImage("movie", detail.backdrop_path);
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

async function getShowDetails() {
  const movieId = window.location.search.split("=")[1];
  const detail = await fetchAPIData(`tv/${movieId}`);
  const div = document.createElement("div");
  DisplayBackdropImage("show", detail.backdrop_path);
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
            <h2>${detail.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${detail.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Release Date: ${detail.first_air_date}</p>
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
           <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span>${
              detail.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                detail.last_episode_to_air.name
              }
            </li>
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
  document.querySelector("#show-details").appendChild(div);
}

//Display searched Items

function displaySearcheditems(items, type) {
  document.querySelector("#search-results").innerHTML = "";
  document.querySelector("#search-results-heading").innerHTML = "";
  document.querySelector("#pagination").innerHTML = "";

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `  <div class="card">
    ${
      type === "tv"
        ? `<a href="tv-details.html?id=${item.id}">`
        : ` <a href="movie-details.html?id=${item.id}">`
    }
     
          ${
            item.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="card-img-top" alt="" />`
              : `<img src="/images/no-image.png" class="card-img-top" alt="" />`
          }
            
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              type === "tv" ? item.original_name : item.original_title
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                type === "tv" ? item.first_air_date : item.release_date
              }</small>
            </p>
          </div>
        </div>`;
    document.querySelector("#search-results-heading").innerHTML = `
          <h2>
          ${items.length} of ${global.search.totalResults} Results for ${global.search.term}
          </h2>
    `;
    document.querySelector("#search-results").appendChild(div);
  });
  displayPagination();

  //next page
  document.querySelector("#next").addEventListener("click", async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearcheditems(results);
  });
  //prev page
  document.querySelector("#prev").addEventListener("click", async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearcheditems(results);
  });
}

//display pagination
function displayPagination() {
  const div = document.createElement("div");
  div.classList.add("pagination");
  div.innerHTML = `
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector("#pagination").appendChild(div);
  if (global.search.page === 1) {
    document.querySelector("#prev").disabled = true;
  } else if (global.search.page === global.search.totalPages) {
    document.querySelector("#next").disabled = true;
  }
}

//Display backdrop images
function DisplayBackdropImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://images.tmdb.org/t/p/original${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  const searchedtype = urlParams.get("type");

  if (global.search.term !== "" && global.search.term !== null) {
    const { results, page, total_pages, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    if (results.length === 0) {
      showAlert("Searched item not found", "error");
    } else {
      displaySearcheditems(results, searchedtype);
    }
  } else {
    showAlert("please enter a search term", "error");
  }
}

//Display slider
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((results) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = ` <div class="swiper-slide">
            <a href="movie-details.html?id=${results.id}">
            ${
              results.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${results.poster_path}"
                  alt="Movie Title"
                />`
                : ` <img src="/images/no-image.png" alt="Movie Title" />`
            }
             
            </a>
          </div>
            
          `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
}
//swiper js

function initSwiper() {
  let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 500,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      modifier: 1.5,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

function showAlert(message, className) {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector("#alert").appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      displaySlider();
      break;
    case "/shows":
      displayTVShows();
      break;
    case "/movie-details.html":
      getMovieDetails();
      break;
    case "/tv-details.html":
      getShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }
  highlightActiveLink();
  changeLogo();
}

document.addEventListener("DOMContentLoaded", init);
