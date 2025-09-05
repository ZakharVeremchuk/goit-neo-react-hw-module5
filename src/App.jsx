import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import css from './App.module.css'

function App() {

  const HomePage = lazy(() => import('./pages/home/HomePage'));
  const MoviesPage = lazy(() => import('./pages/movies/MoviesPage'));
  const MovieDetailsPage = lazy(() => import('./pages/movies/details/MovieDetailsPage'));
  const MovieCast = lazy(() => import('./components/cast/MovieCast'));
  const MovieReviews = lazy(() => import('./components/reviews/MovieReviews'))

  return (
    <>
    <div>
      <nav className={css.nav}>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>

    </div>
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
