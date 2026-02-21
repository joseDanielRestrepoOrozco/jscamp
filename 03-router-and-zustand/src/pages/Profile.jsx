import styles from "./Profile.module.css";

export default function ProfilePage() {
  return (
    <main className={styles.container}>
      {/* Header del perfil */}
      <section className={styles.header}>
        <div className={styles.avatar}>
          JD
        </div>

        <div className={styles.basicInfo}>
          <h1>Juan Dev</h1>
          <p className={styles.role}>Software Developer</p>
          <p className={styles.location}>📍 Bogotá, Colombia</p>
        </div>
      </section>

      {/* Información de la cuenta */}
      <section className={styles.card}>
        <h2>Información de la cuenta</h2>
        <ul className={styles.infoList}>
          <li><strong>Email:</strong> juandev@devjobs.com</li>
          <li><strong>Usuario:</strong> juan_dev</li>
          <li><strong>Miembro desde:</strong> Enero 2025</li>
          <li><strong>Disponibilidad:</strong> Abierto a ofertas</li>
        </ul>
      </section>

      {/* Sobre mí */}
      <section className={styles.card}>
        <h2>Sobre mí</h2>
        <p>
          Desarrollador de software con enfoque en frontend y experiencia
          construyendo aplicaciones web modernas usando React. Me interesa
          trabajar en productos con impacto real y buen diseño.
        </p>
      </section>

      {/* Habilidades */}
      <section className={styles.card}>
        <h2>Habilidades</h2>
        <div className={styles.skills}>
          <span>JavaScript</span>
          <span>React</span>
          <span>Node.js</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>Git</span>
          <span>REST APIs</span>
        </div>
      </section>

      {/* Experiencia */}
      <section className={styles.card}>
        <h2>Experiencia</h2>

        <div className={styles.experienceItem}>
          <h3>Frontend Developer</h3>
          <p className={styles.company}>Tech Solutions · 2023 - 2025</p>
          <p>
            Desarrollo de interfaces con React, consumo de APIs y mejora
            de performance en aplicaciones web.
          </p>
        </div>

        <div className={styles.experienceItem}>
          <h3>Junior Web Developer</h3>
          <p className={styles.company}>Startup Dev · 2022 - 2023</p>
          <p>
            Implementación de vistas responsivas y mantenimiento de
            proyectos existentes.
          </p>
        </div>
      </section>
    </main>
  );
}
