import {PrHttpClientBuilder} from 'prhttp'
import Engine from './FetchEngine.js'

function getToken() {
  let auth = ""
  return auth
}

function isLogin(response) {
    return response.status != 401
}

export class RequestInterceptor {

  async intercept (chain) {
    const newRequest = chain.request.newRequest()
    
    // const token = getToken()
    // newRequest.setHeader('Authorization', `Bearer ${token}`)

    return await chain.proceed(newRequest)
  }
}

export class ReloginInterceptor {

  async intercept (chain) {
    const request = chain.request
    let res = await chain.proceed(request)
    if(!isLogin(res)) {
      let loginResult = await this.login()
      if(loginResult) {
          const retryClient = new PrHttpClientBuilder().setEngine(new Engine()).build()
          let newRequest = request.newRequest()
          // const token = getToken()
          // newRequest.setHeader('Authorization', `Bearer ${token}`)

          res = await retryClient.newCall(newRequest).execute()
      } 
    }

    return res
  }

  async login() {
      return await true
  }
}

export class ResponseInterceptor {
  async intercept (chain) {
    const request = chain.request
    let res = await chain.proceed(request)
    const status = res.status
    if (res.ok) {
      return await res.json()
    }
    
    const errorObject = {
      message: `error status: ${res.status}`,
    }

    throw errorObject
  }
}
