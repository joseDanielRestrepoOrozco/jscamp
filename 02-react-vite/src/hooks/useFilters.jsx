import { useEffect, useState } from 'react'
import { useRouter } from './useRouter'
// import data from '../../public/data.json'

const getInitialState = () => {
  const params = new URLSearchParams(window.location.search)
  const page = Math.floor(Number(params.get('page')))

  return {
    filters: {
      technology: params.get('technology') || '',
      location: params.get('type') || '',
      experienceLevel: params.get('level') || ''
    },
    textToFilter: params.get('text') || '',
    currentPage: page > 0 ? page : 1
  }
}

export const useFilters = RESULTS_PER_PAGE => {
  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { navigateTo } = useRouter()

  const params = getInitialState()

  const [filters, setFilters] = useState(params.filters)

  const [textToFilter, setTextToFilter] = useState(params.textToFilter)

  const [currentPage, setCurrentPage] = useState(params.currentPage)

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
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
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
    const params = new URLSearchParams()

    if (textToFilter) params.append('text', textToFilter)
    if (filters.technology) params.append('technology', filters.technology)
    if (filters.location) params.append('type', filters.location)
    if (filters.experienceLevel) params.append('level', filters.experienceLevel)

    if (currentPage > 1) params.append('page', currentPage)

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname

    navigateTo(newUrl)
  }, [filters, currentPage, textToFilter, navigateTo])

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
