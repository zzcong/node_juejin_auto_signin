const CronJob = require('cron').CronJob
const {log} = require('./utils/util')
const juejin = require('./utils/juejin')

let time = `0 0 9 * * *`

const fn = () => {
  const time = Math.ceil(Math.random() * 3 * 3600 * 1000)
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true)
    }, time)
  })
}

let job = new CronJob('0 0 9 * * *', () => {
  fn().then(() => {
    return juejin.checkIn()
  }).then(() => {
    return juejin.draw()
  })
}, null, false)

log('开始运行')

job.start()
