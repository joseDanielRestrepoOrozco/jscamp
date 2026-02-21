import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const useDetails = () => {
  const { id } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs/${id}`
        )
        if (!response.ok) throw new Error('Job Not Found')
        const data = await response.json()
        setJob(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchJobDetails()
  }, [id])

  return { job, loading, error }
}

export default useDetails
