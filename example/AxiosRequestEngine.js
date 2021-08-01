import axios from 'axios'
import qs from 'qs'

export default class AxiosRequestEngine {
  constructor () {
    this.engine = axios.create({
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  }

  combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }

  async execute (request) {
    const requestUrl = this.combineURLs(request.baseUrl, request.url)
    const config = {
      url: requestUrl,
      method: request.method,
      headers: request.headers
    }
    if (request.method === 'get') {
      config.params = request.data
    } else {
      config.data = request.data
    }
    
    return this.engine.request(config).then(res => {
      return res
    }).catch(e => {
      return e.response
    })
  }
}
