import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/navigation/Navigation';

function App() {

  const HomePage = lazy(() => import('./pages/home/HomePage'));
  const MoviesPage = lazy(() => import('./pages/movies/MoviesPage'));
  const MovieDetailsPage = lazy(() => import('./pages/moviedetails/MovieDetailsPage'));
  const MovieCast = lazy(() => import('./components/moviecast/MovieCast'));
  const MovieReviews = lazy(() => import('./components/moviereviews/MovieReviews'))

  return (
    <>
    <Navigation />
    <Suspense fallback={<div>Loading page ...</div>}>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/movies" element={<MoviesPage/>}></Route>
        <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
          <Route path="cast" element={<MovieCast/>}></Route>
          <Route path="reviews" element={<MovieReviews/>}></Route>
        </Route>
      </Routes>
    </Suspense>
    </>
  )
}

export default App
