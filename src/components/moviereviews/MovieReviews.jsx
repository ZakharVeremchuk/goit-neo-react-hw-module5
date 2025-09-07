import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReview } from "../../api/moviesApi";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (movieId) {
      const fetchMovieReview = async () => {
        setLoading(true);
        try {
          const response = await getMovieReview(movieId);
          setReviews(response.data.results);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchMovieReview();
    }
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading reviews ...</p>}
      {error && <p>Something went wrong, refresh page </p>}
      {reviews.length === 0 && <p>Ths movie haven't reviews</p>}
      {reviews.length > 0 &&
        !loading &&
        !error &&
        reviews.map((review) => <li>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
        </li>)}
    </>
  );
};

export default MovieReviews;
