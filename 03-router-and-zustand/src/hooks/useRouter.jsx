import { useLocation, useNavigate } from 'react-router'

export const useRouter = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const currentPath = location.pathname

  const navigateTo = path => {
    navigate(path)
  }

  return {
    currentPath,
    navigateTo
  }
}
