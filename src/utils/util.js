const dayjs = require('dayjs')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const configPath = path.resolve(__dirname, '../config/config.json')

// log
const log = (msg, isError = false) => {
  const color = isError ? 'red' : 'blue'

  console.log(
    chalk[color](
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      msg
    )
  )
}

const getConfig = () => {
  return JSON.parse(fs.readFileSync(configPath))
}

module.exports = {
  log,
  getConfig
}