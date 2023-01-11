const {get, post} = require('./http')
const {log, getConfig} = require('./util.js')
const {sendEmail} = require('./email')
const { baseUrl, apiUrl } = getConfig()

// 获取抽奖次数
const getTodayDrawStatus = async () => {
  let {data} = await get(baseUrl + apiUrl.getLotteryConf)

  if (data.err_no) {
    await sendEmail('查询抽奖次数：失败', JSON.stringify(data))
  }
  
  return { error: data.err_no !== 0, isDraw: data.data.free_count === 0 }
}

// 抽奖
const draw = async () => {
  let { error, isDraw } = await getTodayDrawStatus()
  if (error) return log('查询抽奖次数失败', true)
  if (isDraw) return log('今日已无免费抽奖次数', true)

  let {data} = await post(baseUrl + apiUrl.drawLottery)
  if (data.err_no) {
    log('免费抽奖失败', true)
    await sendEmail('免费抽奖：失败', JSON.stringify(data))
  } else {
    log(`恭喜抽到：${data.data.lottery_name}`)
    await sendEmail(`恭喜抽到：${data.data.lottery_name}`, '')
  }
  return true
}

// 查询是否签到
const getTodayCheckState = async () => {
  let {data} = await get(baseUrl + apiUrl.getTodayState)
  
  if (data.err_no) {
    await sendEmail('今日掘金签到查询：失败', JSON.stringify(data))
  }

  return {error: data.err_no !== 0, isCheck: data.data}
}

// 签到
const checkIn = async () => {
  let {error, isCheck} = await getTodayCheckState()
  if (error) return log('查询签到失败', true)
  if (isCheck) return log('今日已参与签到', true)
  
  let {data} = await post(baseUrl + apiUrl.checkIn)

  if (data.err_no) {
    log('签到失败', true)
    await sendEmail('今日掘金签到：失败', JSON.stringify(data))
  } else {
    log(`签到成功！当前积分：${data.data.sum_point}`)
    await sendEmail('今日掘金签到：成功', JSON.stringify(data))
  }
  return true
}

module.exports = {
  checkIn,
  draw
}
