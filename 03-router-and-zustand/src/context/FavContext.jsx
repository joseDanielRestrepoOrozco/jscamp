import { createContext, use, useState } from 'react'

export const FavContext = createContext()

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const removeFavorite = jobId => {
    setFavorites(prevFavorites => {
      prevFavorites.filter(job => job.id !== jobId)
    })
  }

  const addFavorite = job => {
    setFavorites(prevFavorites => [...prevFavorites, job])
  }

  const isFavorite = jobId => {
    return favorites.some(job => job.id === jobId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return <FavContext value={value}>{children}</FavContext>
}

export const useFavorites = () => {
  const context = use(FavContext)

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavProvider')
  }

  return context
}
