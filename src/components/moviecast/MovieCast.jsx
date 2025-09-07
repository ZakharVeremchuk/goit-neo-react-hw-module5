import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buildImagePath, getMovieCast } from "../../api/moviesApi";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casters, setCasters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      if (movieId) {
        setLoading(true);
        try {
          const response = await getMovieCast(movieId);
          setCasters(response.data.cast);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading casters ...</p>}
      {error && <p>Something went wrong, refresh page</p>}
      {casters.length === 0 && <p>There is no information about casters</p>}
      {!loading && !error && (
        <ul>
          {casters.length > 0 &&
            casters.map((cast) => (
              <li key={cast.id}>
                <img
                  src={buildImagePath(cast.profile_path, 200)}
                  alt={cast.name}
                />
                <h4>{cast.name}</h4>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
export default MovieCast;
