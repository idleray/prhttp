import utils from '../utils.js'

export default class FetchEngine {

  async execute (request) {
    let requestUrl = utils.combineURLs(request.baseUrl, request.url)
    
    const options = {
      method: request.method,
      headers: request.headers,  
    }
    
    const data = request.data
    if( request.method.toUpperCase() === 'POST') {
      const body = JSON.stringify(data)
      options.body = body
    } else if( request.method.toUpperCase() === 'GET') {
      requestUrl = utils.buildUrl(requestUrl, data)
    }

    
    const req = new Request(requestUrl, options)
    
    return fetch(req).then(res => {
      return res
    }).catch(e => {
      console.log(e.message)
      throw e
    })
  }
}
