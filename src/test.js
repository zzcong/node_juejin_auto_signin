const CronJob = require('cron').CronJob
const {log} = require('./utils/util')
const juejin = require('./utils/juejin')

let job = async () => {
  await juejin.checkIn()
  await juejin.draw()
}

log('开始运行')

job()