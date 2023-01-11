const CronJob = require('cron').CronJob
const {log} = require('./utils/util')
const juejin = require('./utils/juejin')

let time = `0 0 9 * * *`

let job = new CronJob('0 0 9 * * *', async () => {
  await juejin.checkIn()
  await juejin.draw()
}, null, false)

log('开始运行')

job.start()
