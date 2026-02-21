const $jobsList = document.querySelector('.jobs-listing')

fetch('./data.json')
  .then(response => response.json())
  .then(jobs => {
    jobs.forEach(job => {
      const article = document.createElement('article')
      article.className = 'job-item'
      article.setAttribute('data-experience', job.data.nivel)
      article.setAttribute('data-technologies', job.data.technologies)
      article.setAttribute('data-modalidad', job.data.modalidad)
      article.setAttribute('data-titulo', job.titulo)

      article.innerHTML = `
      <div>
        <h4>${job.titulo}</h4>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
      `

      $jobsList.appendChild(article)
    })
  })
