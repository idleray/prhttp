import { PrHttpClientBuilder, PrRequestBuilder}  from 'prhttp'
import AxiosEngine from './AxiosEngine.js'
import { AxiosRequestInterceptor, AxiosReloginInterceptor, AxiosResponseInterceptor } from './AxiosInterceptor.js'
import { CancelError } from 'prhttp'

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
            .setBaseUrl("https://jsonplaceholder.typicode.com")
            .setContentType('application/json')
            .setExtensions(extensions)
}

function createHttpClient() {
    let builder = new PrHttpClientBuilder()
    return builder.setEngine(new AxiosEngine())
            .addInterceptor(new AxiosRequestInterceptor())
            .addInterceptor(new AxiosResponseInterceptor())
            .addInterceptor(new AxiosReloginInterceptor())
            .build()
}

function getExample() {
    console.log('getExample')
    const request = getBuilder.build()
    const url = '/search/repositories'
    const data = {
        q: 'okhttp',
        per_page: 1
    }
    request.setUrl(url).setData(data)
    httpClient.newCall(request).execute().then( res => {
        console.log(res)
    }).catch( e => {
        console.log(e)
    })
}

function getExampleAuthError() {
    console.log('getExampleAuthError')
    const request = getBuilder.build()
    const url = '/user'
    const data = {

    }
    request.setUrl(url).setData(data)
    httpClient.newCall(request).execute().then( res => {
        console.log(res)
    }).catch( e => {
        console.log(e)
    })
}

function postExample() {
    console.log('postExample')
    const request = postBuilder.build()
    const url = '/posts'
    const data = {
        title: 'foo',
        body: 'bar',
        userId: 1,
    }
    request.setUrl(url).setData(data)
    httpClient.newCall(request).execute().then( res => {
        console.log(res)
    }).catch( e => {
        console.log(e)
    })
}

function cancelExample() {
    console.log('cancelExample')
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

export default function test() {
    init()
    getExample()
    // getExampleAuthError()
    postExample()
    // cancelExample()
}