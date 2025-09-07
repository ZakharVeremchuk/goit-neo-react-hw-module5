import css from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </div>
  );
};
export default Navigation;