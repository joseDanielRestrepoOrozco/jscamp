import { useState } from 'react'
import Link from './Link'
import styles from './JobCard.module.css'
import { useFavoritesStore } from '../store/favoritesStore'
import heartIcon from '../assets/iconHeart.svg'
import heartFilledIcon from '../assets/iconHeartFilled.svg'
import { useAuthStore } from '../store/authStore'

const JobCardFavoriteButton = ({ jobId }) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const { isLoggedIn } = useAuthStore()

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      aria-label={
        isFavorite(jobId) ? 'Remove from favorites' : 'Add to favorites'
      }
      disabled={!isLoggedIn}
    >
      {isFavorite(jobId) ? (
        <img src={heartFilledIcon} alt="heartFilledIcon" />
      ) : (
        <img src={heartIcon} alt="heartIcon" />
      )}
    </button>
  )
}

const JobCardApplyButton = ({ jobId }) => {
  const [isApplied, setIsApplied] = useState(false)
  const { isLoggedIn } = useAuthStore()

  const handleApplyClick = () => {
    console.log('Aplicando al trabajo con id:', jobId)
    setIsApplied(!isApplied)
  }

  const text = isApplied ? 'Aplicado' : 'Aplicar'
  const buttonClass = isApplied
    ? 'button-apply-job is-applied'
    : 'button-apply-job'

  return (
    <button
      disabled={!isLoggedIn}
      className={buttonClass}
      onClick={handleApplyClick}
    >
      {text}
    </button>
  )
}

const JobCard = ({ id, titulo, empresa, location, description, data }) => {
  return (
    <article
      className="job-item"
      data-experience={data.nivel}
      data-technologies={data.technologies}
      data-modalidad={data.modalidad}
      data-titulo={titulo}
    >
      <div>
        <h4>
          <Link className={styles.title} href={`/jobs/${id}`}>
            {titulo}
          </Link>
        </h4>
        <small>
          {empresa} | {location}
        </small>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        <Link className={styles.details} href={`/jobs/${id}`}>
          Ver detalles
        </Link>
        <JobCardApplyButton jobId={id} />
        <JobCardFavoriteButton jobId={id} />
      </div>
    </article>
  )
}

export default JobCard
