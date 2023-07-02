import SuperAgent from 'superagent'
import * as cheerio from 'cheerio'
import { encryptPassword } from './encrypt.js'
import config from '../config.js'

function CustomReturn(code, msg) {
    return {
        code: code,
        msg: msg
    }
}

//获取 excution ，cookie ， pwdSalt
async function firstGetPage(agent) {
    try {
        const res = await agent.get(config.jwcLoginUrl)
        const $ = cheerio.load(res.text)
        const pwdSalt = $('#pwdEncryptSalt').val()
        const execution = $('#pwdLoginDiv #pwdEncryptSalt').next().val()
        return CustomReturn(1, {
            pwdSalt,
            execution
        })
    }
    catch {
        return CustomReturn(0, "GET登录首页错误")
    }
}

//处理验证码
async function handleCaptcha(agent) {
    try {
        let res = await agent.get(config.baseUrl + 'common/openSliderCaptcha.htl')
        // console.log(res.req._header)
        let jsonData = JSON.parse(res.text)
        res = await agent
            .post(config.captchaSolverUrl)
            .send({
                bigImage: jsonData.bigImage,
                smallImage: jsonData.smallImage,
                canvasWidth: config.canvasWidth
            })
        // console.log(res.text)
        jsonData = JSON.parse(res.text)
        res = await agent
            .post(config.baseUrl + 'common/verifySliderCaptcha.htl')
            .type('form')
            .send({
                canvasLength: config.canvasWidth,
                moveLength: jsonData.msg
            })
        // console.log(res.text)
        jsonData = JSON.parse(res.text)
        return CustomReturn(jsonData.errorCode, "验证码处理：" + jsonData.errorMsg)
    } catch {
        return CustomReturn(0, "处理验证码错误")
    }
}

//模拟登录
async function fakeLogin(agent, stunum, password, pwdSalt, execution) {
    try {
        const dataForm = {
            username: stunum,
            password: encryptPassword(password, pwdSalt),
            captcha: null,
            _eventId: 'submit',
            cllt: 'userNameLogin',
            dllt: 'generalLogin',
            lt: null,
            execution: execution
        }
        // console.log(dataForm)
        try {
            let count = 0
            let returnData = { ual: null, jwapp: null }
            await agent
                .type('form')
                .set('User-Agent', config.userAgent)
                .post(config.jwcLoginUrl)
                .send(dataForm)
                .on('redirect', (midRes) => {
                    if (count === 0) {
                        returnData.ual = {
                            cookie: midRes.header["set-cookie"],
                            location: midRes.header["location"]
                        }
                    } else if (count === 1) {
                        returnData.jwapp = {
                            cookie: midRes.header["set-cookie"],
                            location: midRes.header["location"]
                        }
                    }
                    count += 1
                })
            if (returnData.jwapp != null) {
                return CustomReturn(1, returnData)
            } else {
                return CustomReturn(0, "模拟登录错误")
            }
        } catch (e) {
            if (!e.response) {
                return CustomReturn(0, "模拟登录错误")
            }
            const $ = cheerio.load(e.response.text)
            const errorMsg = $("#pwdLoginDiv #showErrorTip span").text()
            if (errorMsg) {
                console.log(stunum, errorMsg)
                return CustomReturn(0, errorMsg)
            } else {
                return CustomReturn(0, "模拟登录错误: " + e.response.status)
            }
        }

    } catch {
        return CustomReturn(0, "模拟登录错误")
    }
}

async function login(stunum, password) {
    const agent = new SuperAgent.agent()
    let res = null

    //获取 excution ，cookie ， pwdSalt
    res = await firstGetPage(agent)
    if (!res.code) {
        return res
    }
    const { pwdSalt, execution } = res.msg

    //处理验证码
    res = await handleCaptcha(agent)
    if (!res.code) {
        return res
    }
    // console.log(res)

    //模拟登录
    return await fakeLogin(agent, stunum, password, pwdSalt, execution)
}

export {
    login
}

// login('2125102052', 'XXX').then((res) => {
//     console.log(JSON.stringify(res))
// })

