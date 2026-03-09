import jobs from '../../jobs.json' with { type: 'json' }

export class JobModel {
  static async getAll({ text, level, technology, type, limit = 10, offset = 0 }) {
    let filteredJobs = jobs

    if (level) {
      const searchTerm = level.toLowerCase()
      filteredJobs = filteredJobs.filter(job => job.data.nivel.toLowerCase().includes(searchTerm))
    }

    if (type) {
      filteredJobs = filteredJobs.filter(job => job.ubicacion.toLowerCase().includes(type))
    }

    if (text) {
      const searchTerm = text.toLowerCase()
      filteredJobs = filteredJobs.filter(
        job =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm)
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter(job => job.data.technology.includes(technology))
    }

    const paginatedJobs = filteredJobs.slice(offset, offset + limit)

    const total = filteredJobs.length

    return { jobs: paginatedJobs, total }
  }

  static async getById(id) {
    const job = jobs.find(job => job.id === id)
    return job
  }

  static async create({ titulo, empresa, ubicacion, data, content }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
      content
    }

    jobs.push(newJob) // lo haremos en una base de datos con un INSERT

    return newJob
  }

  static async update(id, { titulo, descripcion, empresa, ubicacion, data }) {
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) return null

    const oldJob = jobs[jobIndex]

    const updatedJob = {
      ...oldJob,
      titulo: titulo ?? oldJob.titulo,
      descripcion: descripcion ?? oldJob.descripcion,
      empresa: empresa ?? oldJob.empresa,
      ubicacion: ubicacion ?? oldJob.ubicacion,
      data: data ?? oldJob.data
    }

    jobs.splice(jobIndex, 1, updatedJob)

    return updatedJob
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
      throw new Error('Job not found')
    }

    jobs.splice(jobIndex, 1)
  }
}
