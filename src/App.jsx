import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import MoviesPage from './pages/movies/MoviesPage';
import MovieDetailsPage from './pages/movies/details/MovieDetailsPage';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" elemment={<HomePage/>}></Route>
        <Route path="/movies" elemment={<MoviesPage/>}></Route>
        <Route path="/movies/:movieId" elemment={<MovieDetailsPage/>}>
          <Route path="cast" elemment={<MovieCast/>}></Route>
          <Route path="reviews" elemment={<MovieReviews/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
