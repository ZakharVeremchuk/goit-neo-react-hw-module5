import axios from 'axios';

const url =
  "<https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1>";

const trendingMovieBaseUrl = "https://api.themoviedb.org/3/trending/movie/";
const searchMovieByValue = "https://api.themoviedb.org/3/search/movie?query="
const getSpecificMovie = "https://api.themoviedb.org/3/movie/"
const imageBaseUrl = "https://image.tmdb.org/t/p/";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTE1MDk1ZTY1NmE2N2U4NDkyZjI2ODBkZjA2ODU5ZiIsIm5iZiI6MTc1Njk5MTk3Ni4xNzcsInN1YiI6IjY4Yjk5MWU4M2JmMmI5MDhiZjhjZGUwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IrdLhKVB0ZHxt1-PyKb25wiEkNiGx3vm6PccWpp-uJ0",
  },
};

export async function downloadMovies() {
  return axios
    .get(url, options)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export async function getTrendingMovies(period) {
  const finalUrl = trendingMovieBaseUrl + period;
  return axios.get(finalUrl, options);
}

export async function getMoviesByValue(value) {
  const finalUrl = searchMovieByValue + value;
  return axios.get(finalUrl, options);
}

export async function getMovieDetails(id) {
  const finalUrl = getSpecificMovie + id;
  return axios.get(finalUrl, options);
}

export function buildImagePath(path, width) {
  return path ? imageBaseUrl+ 'w'+ width + path : 'no url to image';
}

export function getMovieCast(movieId) {
  const movieCastUrl = getSpecificMovie + movieId + "/credits";
  return axios.get(movieCastUrl, options);
}
export function getMovieReview(movieId) {
  const movieReviewUrl = getSpecificMovie + movieId + "/reviews";
  return axios.get(movieReviewUrl, options)
}
