const port = 8087
const canvasWidth = 280
const captchaSolverUrl = 'http://127.0.0.1:8086'
const baseUrl = 'http://id.hqu.edu.cn/authserver/'
const jwcLoginUrl = baseUrl + 'login?service=https%3A%2F%2Fjwapp.hqu.edu.cn%2Fjwapp%2Fsys%2Femaphome%2Fportal%2Findex.do%3FforceCas%3D1'
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67'
export default {
    canvasWidth,
    captchaSolverUrl,
    jwcLoginUrl,
    userAgent,
    baseUrl,
    port
}