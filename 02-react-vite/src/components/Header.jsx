import Link from './Link'

const Header = () => {
  return (
    <header>
      <h2>DevJobs</h2>
      <nav>
        <Link href="/">Inicio</Link>
        <Link href="/search">Empleos</Link>
      </nav>

      <div>
        <Link href="">Publicar un empleo</Link>
        <Link href="">Iniciar sesión</Link>
      </div>
    </header>
  )
}

export default Header
