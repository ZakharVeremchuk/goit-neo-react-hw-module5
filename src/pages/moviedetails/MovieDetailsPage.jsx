import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getMovieDetails, buildImagePath } from "../../api/moviesApi";
import { Link, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backPath = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await getMovieDetails(movieId);
        setMovieDetails(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <>
      <Link to={backPath.current}>Go back</Link>
      {loading && <p>Loading movie detail ...</p>}
      {error && <p>Something went wrong, refresh page</p>}
      {movieDetails && !loading && !error && (
        <>
          <div className={css.container}>
            <div className={css.containerWithImg}>
              <div>
                <img src={buildImagePath(movieDetails.poster_path, 300)} />
              </div>
              <div>
                <h3>{movieDetails.title}</h3>
                <p>User Score: {movieDetails.vote_average * 10} %</p>
                <h4>Overview</h4>
                <p>{movieDetails.overview}</p>
                <h4>Genres</h4>
                <p>
                  {movieDetails.genres
                    ? movieDetails.genres.map((genre) => genre.name).join(" ")
                    : ""}
                </p>
              </div>
            </div>
            <div>
              <h4>Additional information</h4>
              <ul>
                <li>
                  <NavLink to="cast" state={location.state}>
                    Cast
                  </NavLink>
                </li>
                <li>
                  <NavLink to="reviews" state={location.state}>
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
