import utils from '../utils.js'

export default class WechatEngine {
  async execute (request) {
    const requestUrl = utils.combineURLs(request.baseUrl, request.url)
    const options = {
      url: requestUrl,
      method: request.method,
      data: request.data,
      header: request.headers
    }
    
    try {
      let res = await utils.callWxApiToPromise(wx.request, options)
      return res
    } catch (e) {
      return e
    }
  }
}