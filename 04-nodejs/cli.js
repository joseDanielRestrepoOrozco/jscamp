import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] || '.'

// 2. Formateo simple de los tamaños
const formatBytes = bytes => {
  if (bytes < 1024) return `${bytes} B`
  return `${(bytes / 1024).toFixed(2)} KB`
}

// 3. Leer los nombre, sin info
const files = await readdir(dir)
console.log(files)

// 4. recuperar la info de cada file
const entries = Promise.all(
  files.map(async name => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    }
  })
)

// sort
// 1. Que aparezcan primero las carpetas
// 2. Que esten en orden alfabético los ficheros

// filter
// tener en cuenta flags como --files-only o 


for (const entry of await entries) {
  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : ` ${entry.size}`
  console.log(`${icon} ${entry.name.padEnd(25)} - ${size}`)
}
