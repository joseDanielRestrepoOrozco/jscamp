import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
// import data from '../../public/data.json'

export const useFilters = RESULTS_PER_PAGE => {
  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get('text') || ''
  )

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Math.floor(Number(searchParams.get('page')))
    return page > 0 ? page : 1
  })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)

        const params = new URLSearchParams()

        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel)
          params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE

        params.append('offset', offset)

        params.append('limit', RESULTS_PER_PAGE)

        const queryParams = params.toString()

        const response = await fetch(
          // `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
          `http://localhost:3000/jobs?${queryParams}`
        )
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error(`Error fetching jobs: ${error}`)
        setError(error)
      } finally {
        setLoading(false)
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
    fetchJobs()
  }, [filters, textToFilter, currentPage, RESULTS_PER_PAGE])

  useEffect(() => {
    setSearchParams(() => {
      const newParams = new URLSearchParams()

      if (textToFilter) newParams.set('text', textToFilter)
      if (filters.technology) newParams.set('technology', filters.technology)
      if (filters.location) newParams.set('type', filters.location)
      if (filters.experienceLevel)
        newParams.set('level', filters.experienceLevel)
      if (currentPage > 1) newParams.set('page', currentPage)

      return newParams
    })
  }, [filters, currentPage, textToFilter, setSearchParams])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handleSearch = filters => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = newTextToFilter => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const isActiveFilters = Object.values(filters).some(Boolean) || textToFilter

  return {
    handlePageChange,
    handleTextFilter,
    handleSearch,
    isActiveFilters,
    textToFilter,
    filters,
    totalPages,
    currentPage,
    total,
    jobs,
    loading,
    error
  }
}
