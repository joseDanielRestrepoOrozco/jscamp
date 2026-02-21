import { useNavigate } from 'react-router'
import styles from './Register.module.css'
import { useId } from 'react'
import { useAuthStore } from '../store/authStore'

export default function Register() {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()

  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get(emailId)
    const name = formData.get(nameId)
    const password = formData.get(passwordId)

    if (email && name && password) {
      login()
      navigate('/')
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>
        <p className={styles.subtitle}>
          Únete a devJobs y encuentra tu próximo reto
        </p>
        <div className={styles.field}>
          <label>
            Nombre
            <input type="text" placeholder="Juan Dev" name={nameId} />
          </label>
        </div>

        <div className={styles.field}>
          <label>
            Email
            <input type="email" placeholder="tu@email.com" name={emailId} />
          </label>
        </div>

        <div className={styles.field}>
          <label>
            Contraseña
            <input type="password" placeholder="••••••••" name={passwordId} />
          </label>
        </div>

        <div className={styles.field}>
          <label>
            Confirmar contraseña
            <input type="password" placeholder="••••••••" />
          </label>
        </div>

        <button className={styles.primaryButton}>Registrarse</button>

        <p className={styles.footerText}>
          ¿Ya tienes cuenta?{' '}
          <a onClick={() => navigate('/login')}>Inicia sesión</a>
        </p>
      </form>
    </main>
  )
}
