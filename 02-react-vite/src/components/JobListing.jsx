import JobCard from './JobCard.jsx'

const JobList = ({ data, total }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Resultados de búsqueda</h2>
      <div className="jobs-listing">
        {total === 0 && (
          <p style={{ textAlign: 'center', padding: '1rem' }}>
            No hay resultados coincidentes con tus filtros de búsqueda
          </p>
        )}
        {data.map(j => (
          <JobCard
            key={j.id}
            titulo={j.titulo}
            description={j.descripcion}
            empresa={j.empresa}
            location={j.ubicacion}
            data={j.data}
          />
        ))}
      </div>
    </>
  )
}

export default JobList
