import { useId } from 'react'
import styles from './Login.module.css'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router'

export default function Login() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const passwordId = useId()
  const emailId = useId()

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get(emailId)
    const password = formData.get(passwordId)

    if (email && password) {
      login()
      navigate('/')
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <p className={styles.subtitle}>Accede a tu cuenta de devJobs</p>

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

        <button className={styles.primaryButton}>Entrar</button>

        <p className={styles.footerText}>
          ¿No tienes cuenta?{' '}
          <a onClick={() => navigate('/register')}>Regístrate</a>
        </p>
      </form>
    </main>
  )
}
