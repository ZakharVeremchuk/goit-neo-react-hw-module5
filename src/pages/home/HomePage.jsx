import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/moviesApi";
import MovieList from "../../components/movieList/MovieList";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTrendMovies = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getTrendingMovies("day");
      console.log(response);
      setTrendMovies(response.data.results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendMovies();
  }, []);

  return (
    <>
      <h2>Trending Today</h2>
      {loading && <p>Loading trending movies ...</p>}
      {error && <p>Something went wrong, refresh page </p>}
      {trendMovies.length === 0 && <p>Today we haven't trending movies</p>}
      {trendMovies.length > 0 && !loading && !error && (
        <MovieList movies={trendMovies} />
      )}
    </>
  );
};

export default HomePage;
