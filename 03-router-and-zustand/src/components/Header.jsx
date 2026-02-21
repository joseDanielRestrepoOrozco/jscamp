import { NavLink } from 'react-router'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/favoritesStore'



const Header = () => {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoritesStore()

  const numberOfFavorites = countFavorites()

  return (
    <header>
      <h2>DevJobs</h2>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-link-active' : '')}
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-link-active' : '')}
          to="/search"
        >
          Empleos
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link-active' : '')}
            to="/profile"
          >
            Profile (❤️ {numberOfFavorites})
          </NavLink>
        )}
      </nav>
      <HeaderUserButton />
    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  return isLoggedIn ? (
    <button onClick={logout}>Cerrar sesión</button>
  ) : (
    <button onClick={login}>Iniciar sesión</button>
  )
}

export default Header
