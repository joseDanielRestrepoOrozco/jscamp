import { useId } from 'react'
import { useSearchForm } from '../hooks/useFormSearch'

const JobSearch = ({
  onSearch,
  onTextFilter,
  isActiveFilters,
  initialText,
  initialFilters
}) => {
  const idText = useId()
  const idLocation = useId()
  const idTechnology = useId()
  const idExperienceLevel = useId()

  const { handleSubmit, inputRef, handleClearInput } = useSearchForm({
    idTechnology,
    idExperienceLevel,
    idLocation,
    idText,
    onSearch,
    onTextFilter
  })

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleSubmit} role="search" id="empleos-search-form">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            viewBox="0 0 24 24"
          >
            <path fill="none" stroke="none" d="M0 0h24v24H0z" />
            <path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6" />
          </svg>

          <input
            ref={inputRef}
            id="empleos-search-input"
            type="text"
            name={idText}
            defaultValue={initialText}
            placeholder="Buscar trabajos, empresas o habilidades"
          />
        </div>

        <div className="search-filters">
          <select
            className="filter"
            name={idTechnology}
            id="filter-technologies"
            defaultValue={initialFilters.technology}
          >
            <option value="">Tecnologías</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="python">Python</option>
            <option value="kotlin">Kotlin</option>
            <option value="java">Java</option>
          </select>
          <select
            className="filter"
            name={idLocation}
            id="filter-location"
            defaultValue={initialFilters.location}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="bogota">Bogota</option>
          </select>
          <select
            className="filter"
            name={idExperienceLevel}
            id="filter-experience-level"
            defaultValue={initialFilters.experienceLevel}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
          {isActiveFilters && (
            <button onClick={handleClearInput}>
              Limpiar Filtros de búsqueda
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default JobSearch
