import JobListing from '../components/JobListing'
import SearchFormSection from '../components/SearchFormSection'

import Pagination from '../components/Pagination'
import { useFilters } from '../hooks/useFilters'

const RESULTS_PER_PAGE = 5

const Search = () => {
  const {
    handlePageChange,
    handleSearch,
    handleTextFilter,
    jobs,
    total,
    loading,
    currentPage,
    totalPages,
    filters,
    isActiveFilters,
    textToFilter
  } = useFilters(RESULTS_PER_PAGE)

  // react ofrece una alternativa a esto y es que podemos agregar la etiqueta title a nuestro componente para asignar el titulo de la pestaña de nuestra pagina
  // useEffect(() => {
  //   document.title = `Resultados: ${total}, Página ${currentPage} - DevJobs`
  // }, [total, currentPage])

  const title = loading
    ? 'Cargando... - DevJobs'
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`

  return (
    <main>
      <title>{title}</title>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        isActiveFilters={isActiveFilters}
        initialText={textToFilter}
        initialFilters={filters}
      />
      <section>
        {loading ? (
          <p>Cargando empleos...</p>
        ) : (
          <JobListing data={jobs} total={total} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  )
}

export default Search
