import { useNavigate } from "react-router";
import Link from "../components/Link";
import snarkdown from "snarkdown";
import styles from "./Detail.module.css";
import useDetails from "../hooks/useDetails";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore";
import { useAiSummary } from "../hooks/useAiSummary";
import { Streamdown } from "streamdown";

const JobSection = ({ title, content }) => {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
};

const DetailPageBreadCrumb = ({ job }) => {
  return (
    <nav className={styles.breadcrumb}>
      <Link href="/search" className={styles.breadcrumbButton}>
        Empleos
      </Link>
      <span className={styles.breadcrumbSeparator}>/</span>
      <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
    </nav>
  );
};

const DetailPageHeader = ({ job }) => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} | {job.ubicacion}
        </p>
      </div>
      <div>
        <DetailApplyButton />
        <DetailFavoriteButton jobId={job.id} />
        <AISummary jobId={job.id} />
      </div>
    </header>
  );
};

const DetailApplyButton = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
      {!isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  );
};

const DetailFavoriteButton = ({ jobId }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      aria-label={
        isFavorite(jobId) ? "Remove from favorites" : "Add to favorites"
      }
    >
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  );
};

const AISummary = ({ jobId }) => {
  const { summary, generateSummary, loading } = useAiSummary(jobId);

  if (summary) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Resumen IA</h2>
        <div className={styles.sectionContent}>
          {/* <p>{summary}</p> */}
          <Streamdown isAnimating={loading}>{summary}</Streamdown>
        </div>
      </section>
    );
  }

  return (
    <button
      onClick={generateSummary}
      disabled={loading}
      className={styles.applyButton}
    >
      {loading ? "Generando..." : "Generar resumen IA"}
    </button>
  );
};

const Detail = () => {
  const { job, loading, error } = useDetails();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <button
            onClick={() => navigate("/")}
            className={StyleSheet.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
      <div className={styles.container}>
        <DetailPageBreadCrumb job={job} />
        <DetailPageHeader job={job} />
        <JobSection
          title="Descripción del puesto"
          content={job.content.description}
        />
        <JobSection
          title="Responsabilidades"
          content={job.content.responsibilities}
        />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
      </div>
    </main>
  );
};

export default Detail;
