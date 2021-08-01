import { PrHttpClientBuilder, PrRequestBuilder}  from '../index.js'
import AxiosRequestEngine from './AxiosRequestEngine.js'
import { AxiosRequestInterceptor, AxiosReloginInterceptor, AxiosResponseInterceptor } from './AxiosInterceptor.js'

const extensions = {
    showErrorToast: true,
}

let httpClient
let getBuilder
let postBuilder

function init() {
    httpClient = createHttpClient()

    getBuilder = new PrRequestBuilder()
    getBuilder.setMethod('get')
              .setBaseUrl("https://api.github.com")
              .setContentType('application/json')
              .setExtensions(extensions)

    postBuilder = new PrRequestBuilder()
    postBuilder.setMethod('post')
            .setBaseUrl("https://reqbin.com")
            .setContentType('application/json')
            .setExtensions(extensions)
}

function createHttpClient() {
    let builder = new PrHttpClientBuilder()
    return builder.setEngine(new AxiosRequestEngine())
            .addInterceptor(new AxiosRequestInterceptor())
            .addInterceptor(new AxiosResponseInterceptor())
            .addInterceptor(new AxiosReloginInterceptor())
            .build()
}

function getExample() {
    const request = getBuilder.build()
    const url = '/search/repositories'
    const data = {
        q: 'okhttp',
        per_page: 5
    }
    request.setUrl(url).setData(data)
    return httpClient.execute(request)
}

function getExampleAuthError() {
    const request = getBuilder.build()
    const url = '/user'
    const data = {

    }
    request.setUrl(url).setData(data)
    return httpClient.execute(request)
}

function postExample() {
    const request = postBuilder.build()
    const url = '/echo/post/json'
    const data = {
        id: '1'
    }
    request.setUrl(url).setData(data)
    return httpClient.execute(request)
}

function test() {
    init()
    getExample().then( res => {
        // console.log(res)
    }).catch( e => {
        // console.log(e)
    })

    getExampleAuthError().then( res => {
        // console.log(res)
    }).catch( e => {
        // console.log(e)
    })

    postExample().then( res => {
        // console.log(res)
    })
}

test()