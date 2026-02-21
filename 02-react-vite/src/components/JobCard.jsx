import { useState } from 'react'

const JobCard = ({ titulo, empresa, location, description, data }) => {
  const [isApplied, setIsApplied] = useState(false)

  const handleApplyClick = () => {
    setIsApplied(!isApplied)
  }

  const text = isApplied ? 'Aplicado' : 'Aplicar'
  const buttonClass = isApplied
    ? 'button-apply-job is-applied'
    : 'button-apply-job'

  return (
    <article
      className="job-item"
      data-experience={data.nivel}
      data-technologies={data.technologies}
      data-modalidad={data.modalidad}
      data-titulo={titulo}
    >
      <div>
        <h4>{titulo}</h4>
        <small>
          {empresa} | {location}
        </small>
        <p>{description}</p>
      </div>
      <button className={buttonClass} onClick={handleApplyClick}>
        {text}
      </button>
    </article>
  )
}

export default JobCard
