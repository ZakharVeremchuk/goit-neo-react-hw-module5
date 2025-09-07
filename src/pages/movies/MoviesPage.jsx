import { useEffect, useState } from "react";
import MovieList from "../../components/movieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { getMoviesByValue } from "../../api/moviesApi";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const response = await getMoviesByValue(query);
          setMovies(response.data.results);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [searchParams]);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.searchQuery.value;

    if (!query.length) {
      return;
    }

    updateSearchParams("query", query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchQuery">
          <input type="text" name="searchQuery" id="searchQuery" />
        </label>
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading movies...</div>}
      {error && <p>Something went wrong, refresh page</p>}
      {movies.length > 0 && !loading && !error && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
