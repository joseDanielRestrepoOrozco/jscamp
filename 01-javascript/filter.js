const searchInput = document.querySelector('#empleos-search-input')
const $locationFilter = document.querySelector('#filter-location')
const $experienceLevelFilter = document.querySelector(
  '#filter-experience-level'
)
const $technologyFilter = document.querySelector('#filter-technologies')

const setFilter = () => {
  const $jobs = document.querySelectorAll('.job-item')

  $jobs.forEach(job => {
    const modalidad = job.dataset.modalidad
    const tecnologias = job.dataset.technologies.split(',')
    const experiencia = job.dataset.experience
    const titulo = job.dataset.titulo

    const isShow =
      ($locationFilter.value === '' || $locationFilter.value === modalidad) &&
      ($experienceLevelFilter.value === '' ||
        $experienceLevelFilter.value === experiencia) &&
      ($technologyFilter.value === '' ||
        tecnologias.includes($technologyFilter.value)) &&
      (searchInput.value === '' ||
        titulo.toLowerCase().includes(searchInput.value.toLowerCase()))

    job.classList.toggle('is-hidden', !isShow)
  })
}

const filterForm = document.querySelector('#empleos-search-form')

filterForm.addEventListener('input', setFilter)

filterForm.addEventListener('change', setFilter)
