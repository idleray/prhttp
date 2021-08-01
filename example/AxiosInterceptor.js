import {PrHttpClientBuilder} from '../index.js'
import AxiosRequestEngine from './AxiosRequestEngine.js'

function getToken() {
  let auth = ""
  return auth
}

function isLogin(response) {
    return response.status != 401
}

export class AxiosRequestInterceptor {

  async intercept (chain) {
    const newRequest = chain.request.newRequest()
    newRequest.setHeader('Accept', 'application/vnd.github.v3+json')
    // const token = getToken()
    // newRequest.setHeader('Authorization', `Bearer ${token}`)

    return await chain.proceed(newRequest)
  }
}

export class AxiosReloginInterceptor {

  async intercept (chain) {
    const request = chain.request
    let res = await chain.proceed(request)
    if(!isLogin(res)) {
      let loginResult = await this.login()
      if(loginResult) {
          const retryClient = new PrHttpClientBuilder().setEngine(new AxiosRequestEngine()).build()
          let newRequest = request.newRequest()
          // const token = getToken()
          // newRequest.setHeader('Authorization', `Bearer ${token}`)

          res = await retryClient.execute(newRequest)
      } 
    }

    return res
  }

  async login() {
      return await true
  }
}

export class AxiosResponseInterceptor {
  async intercept (chain) {
    const request = chain.request
    let res = await chain.proceed(request)
    const status = res.status
    if (status >= 200 && status < 300) {
      return res.data
    }
    const errorObject = {
      message: `error status: ${res.status}`,
    }

    throw errorObject
  }
}
