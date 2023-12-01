import {PrHttpClientBuilder} from 'prhttp'
import WechatEngine from './wxEngine.js'

async function wxLogin() {
  return await true
}

export class RequestInterceptor {
  async intercept(chain) {
    const newRequest = chain.request.newRequest()
    console.log("RequestInterceptor: " + newRequest.url)
    
    const token = wx.getStorageSync('token')
    console.log(token)
    if(token) {
      newRequest.setHeader('Authorization', `Bearer ${token}`)
    }

    return await chain.proceed(newRequest)
  }
}

export class ResponseInterceptor {
  async intercept(chain) {
    const request = chain.request
    let res = await chain.proceed(request)
    
    const status = res.statusCode
    const data = res.data
    const payload = data ? data.payload : null
    if(status == 200) {
      return data.payload
    } else if(status == 409) {
      this.throwErrorResponse(res)
    } else {
      this.showError(request)
      this.throwErrorResponse(res)
    }
  }

  showError(request, message) {
    if(request.extensions.showErrorToast) {
      wx.showToast({
        icon: 'none',
        title: message || 'System error'
      })
    }
  }

  throwErrorResponse(res) {
    const status = res.statusCode
    const message = res.data ? res.data.msg : ''
    const code = res.data ? res.data.code : ''
    const payload = res.data ? res.data.payload : null
    const errorObject = {
        status: status,
        code: code,
        message: message || 'System error',
        payload: payload
    }
    throw errorObject
  }
}

export class ReloginResponseInterceptor {
  async intercept(chain) {
      const request = chain.request
      let res = await chain.proceed(request)
      
      console.log("ReloginResponseInterceptor: " + request.url)
      if(res.statusCode == 401) {
          try {
              let result = await wxLogin()
              if(result) {
                  
                  const retryClient = new PrHttpClientBuilder()
                  .setEngine(new WechatEngine())
                  .addInterceptor(new RequestInterceptor())
                  .build()
                  
                  let newRequest = request.newRequest()
                  res = await retryClient.newCall(newRequest).execute()
              }
          } catch(e) {
              console.log(e)
              
          }
      }
      return res
  }
}

export class LoadingInterceptor {
  async intercept(chain) {
    const request = chain.request
    const loadingOpt = request.extensions.loadingOpt
    const showLoading = loadingOpt && loadingOpt.isShow
    if(showLoading) {
      wx.showLoading({
        title: loadingOpt.title,
        mask: loadingOpt.mask
      })
    }

    try {
      const res = await chain.proceed(request)
      if(showLoading) {
        wx.hideLoading()
      }
      return res
    } catch (e) {
      if(showLoading) {
        wx.hideLoading()
      }
      throw e
    }
  }
}