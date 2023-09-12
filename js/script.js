//APIKey = e2121f4c0901b3856a1985143270d754
//AccessToken = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjEyMWY0YzA5MDFiMzg1NmExOTg1MTQzMjcwZDc1NCIsInN1YiI6IjYzZGMwNDU4YTkxMTdmMDA5M2NmMjliYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._n71JBLy1x5_ydllc7My7H9upSc7TeWswlDiGtknZDY

const global = {
  currentPage: window.location.pathname,
};

//Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  //LOL, don't COPY
  //You can get yours at https://www.themoviedb.org/

  const API_KEY = "e2121f4c0901b3856a1985143270d754";
  const API_URL = "https://api.themoviedb.org/3/";
}
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie-details.html");
      break;
    case "/tv-details.html":
      console.log("Tv Shows");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
