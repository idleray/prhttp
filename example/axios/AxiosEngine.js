import axios from 'axios'
import qs from 'qs'
import utils from '../utils.js'

export default class AxiosRequestEngine {
  constructor () {
    this.engine = axios.create({
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
  }

  async execute (request) {
    const requestUrl = utils.combineURLs(request.baseUrl, request.url)
    const config = {
      url: requestUrl,
      method: request.method,
      headers: request.headers
    }
    if (request.method.toUpperCase() === 'GET') {
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
