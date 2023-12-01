import { PrHttpClientBuilder, PrRequestBuilder}  from 'prhttp'
import WechatEngine from "./wxEngine.js"
import {
  LoadingInterceptor,
  RequestInterceptor, 
  ReloginResponseInterceptor,
  ResponseInterceptor
} from './wxInterceptor.js'

let httpClient
let getBuilder
let postBuilder
let deleteBuilder

const baseUrl = "https://www.example.com"

function init() {
  httpClient = createHttpClient()
  createRequestBuilder()
}

function createHttpClient() {
  let builder = new PrHttpClientBuilder()
  return builder.setEngine(new WechatEngine())
          .addInterceptor(new LoadingInterceptor())
          .addInterceptor(new RequestInterceptor())
          .addInterceptor(new ResponseInterceptor())
          .addInterceptor(new ReloginResponseInterceptor())
          .build()
}

function generateRequestExtensions() {
  return {
    showErrorToast: true,
    loadingOpt: {
      isShow: true,
      title: '',
      mask: false
    }
  }
}

function createRequestBuilder() {
  getBuilder = new PrRequestBuilder()
  getBuilder.setMethod('get')
            .setBaseUrl(baseUrl)
            .setContentType('application/json')
            .setExtensions(generateRequestExtensions())

  postBuilder = new PrRequestBuilder()
  postBuilder.setMethod('post')
            .setBaseUrl(baseUrl)
            .setContentType('application/json')
            .setExtensions(generateRequestExtensions())

  deleteBuilder = new PrRequestBuilder()
  deleteBuilder.setMethod('delete')
            .setBaseUrl(baseUrl)
            .setContentType('application/json')
            .setExtensions(generateRequestExtensions())
}

init()

export {
  httpClient,
  getBuilder,
  postBuilder,
  deleteBuilder,
  generateRequestExtensions
}