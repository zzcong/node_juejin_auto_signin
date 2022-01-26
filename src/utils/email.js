const nodeMailer = require('nodemailer')
const { getConfig, log } = require('./util')
/**
 * 发送邮件
 * @param {string} subject 主题
 * @param {string} html 内容
 */
const sendEmail = async (subject, html) => {
  html += '<p><img src="https://p9-passport.byteacctimg.com/img/user-avatar/4c2a6c6768f65e8237d7593aceaf91f8~300x300.image"/></p>'
  let config = getConfig().email.wy126
  const transporter = nodeMailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass
    }
  })
  transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: subject,
    html: html
  }, err => {
    if (err) {
      log(`发送邮件失败：${JSON.stringify(err)}！`, true)
      return
    }
    log(`发送邮件成功！`)
  })
}

module.exports = {
  sendEmail
}
