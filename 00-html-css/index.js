// const buttons = document.querySelectorAll('.button-apply-job')

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     button.textContent = 'Aplicado'
//     button.classList.add('is-applied')
//   })
// })

const $jobsList = document.querySelector('.jobs-listing')
const $jobs = document.querySelectorAll('.job-item')

const $filters = document.querySelector('.search-filters')

const $locationFilter = document.querySelector('#filter-location')
const $experienceLevelFilter = document.querySelector(
  '#filter-experience-level'
)
const $technologyFilter = document.querySelector('#filter-technologies')

$filters.addEventListener('change', () => {
  $jobs.forEach(job => {
    const modalidad = job.dataset.modalidad
    const tecnologia = job.dataset.technologies
    const experiencia = job.dataset.experience

    const isShow =
      ($locationFilter.value !== '' && $locationFilter.value !== modalidad) ||
      ($experienceLevelFilter.value !== '' &&
        $experienceLevelFilter.value !== experiencia) ||
      ($technologyFilter.value !== '' && $technologyFilter.value !== tecnologia)

    job.classList.toggle('is-hidden', !isShow)
  })
})

$jobsList?.addEventListener('click', event => {
  const element = event.target

  if (element.classList.contains('button-apply-job')) {
    element.textContent = 'Aplicado'
    element.classList.add('is-applied')
  }
})

const searchInput = document.querySelector('#empleos-search-input')

searchInput.addEventListener('input', event => {
  console.log(event.target.value)
})

searchInput.addEventListener('blur', () => {
  console.log('perdio el foco')
})

const searchForm = document.querySelector('#empleos-search-form')

searchForm.addEventListener('submit', event => {
  event.preventDefault()

  console.log('formulario enviado')
})
