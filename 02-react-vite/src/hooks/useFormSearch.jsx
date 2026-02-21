import { useRef } from 'react'

export const useSearchForm = ({
  idTechnology,
  idExperienceLevel,
  idLocation,
  idText,
  onSearch,
  onTextFilter
}) => {
  // crear referencias a estados mutables que pueden persistir entre renderizados
  const timeoutId = useRef(null)
  // crear una referencia a un elemento del componente, esta es la forma correcta en react para acceder a elementos del DOM, a diferencia de js vanilla que es con document.querySelector.
  const inputRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    if (event.target.name === idText) {
      const text = event.target.value

      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      timeoutId.current = setTimeout(() => {
        onTextFilter(text)
      }, 500)
    } else {
      const formData = new FormData(event.currentTarget)

      const filters = {
        location: formData.get(idLocation),
        technology: formData.get(idTechnology),
        experienceLevel: formData.get(idExperienceLevel)
      }

      onSearch(filters)
    }
  }

  const handleClearInput = event => {
    event.preventDefault()
    inputRef.current.value = ''
    onTextFilter('')
  }

  return { handleSubmit, inputRef, handleClearInput }
}
