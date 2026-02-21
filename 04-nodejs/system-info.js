import os from 'node:os'
import ms from 'ms'

console.log('Operating System Information:')
console.log(`Platform: ${os.platform()}`)
console.log(`Architecture: ${os.arch()}`)
console.log(`CPU Cores: ${os.cpus().length}`)
console.log(`Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`)
console.log(`Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`)
console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} hours`)
console.log(`Tiempo de actividad: ${ms(os.uptime() * 1000, { long: true })}`)