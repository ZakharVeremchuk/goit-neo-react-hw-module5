import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/moviesApi";

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
      <div>Trending Today</div>
      <ul>
        {trendMovies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
