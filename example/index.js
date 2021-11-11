import { PrHttpClientBuilder, PrRequestBuilder}  from '../index.js'
import AxiosRequestEngine from './AxiosRequestEngine.js'
import { AxiosRequestInterceptor, AxiosReloginInterceptor, AxiosResponseInterceptor } from './AxiosInterceptor.js'
import CancelError from '../lib/CancelError.js'

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
    httpClient.newCall(request).execute().then( res => {
        // console.log(res)
    }).catch( e => {
        // console.log(e)
    })
}

function getExampleAuthError() {
    const request = getBuilder.build()
    const url = '/user'
    const data = {

    }
    request.setUrl(url).setData(data)
    httpClient.newCall(request).execute().then( res => {
        // console.log(res)
    }).catch( e => {
        // console.log(e)
    })
}

function postExample() {
    const request = postBuilder.build()
    const url = '/echo/post/json'
    const data = {
        id: '1'
    }
    request.setUrl(url).setData(data)
    httpClient.newCall(request).execute().then( res => {
        // console.log(res)
    }).catch( e => {
        // console.log(e)
    })
}

function cancelExample() {
    const request = getBuilder.build()
    const url = ''
    request.setUrl(url)
    const call = httpClient.newCall(request)
    call.execute().then(res => {
        console.log(res)

    }).catch( e => {
        if(e instanceof CancelError) {
            console.log('Request was cancelled')
        } else {
            console.log(e)
        }
    })

    setTimeout( () => {
        call.cancel()
    }, 100)
}

function test() {
    init()
    getExample()
    getExampleAuthError()
    postExample()
    cancelExample()
}

test()