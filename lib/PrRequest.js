import utils from './utils.js'
import PrRequestBuilder from './PrRequestBuilder.js'

export default class PrRequest {
    constructor(builder) {
        this.baseUrl = builder ? builder.baseUrl : ''
        this.method = builder ? builder.method : 'get'
        this.headers = builder ? utils.clone(builder.headers) : {}
        this.contentType = builder ? builder.contentType : ""
        this.extensions = builder ? utils.clone(builder.extensions) : {}

        this.url = ''
        this.data = ''
    }

    newRequest() {
        return new PrRequestBuilder(this).build()
                        .setUrl(this.url)
                        .setData(this.data)
    }

    setContentType(type) {
        this.contentType = type
    }

    setHeader(name, value) {
        this.headers[name] = value
        return this
    }

    clearResponseInterceptors() {
        this.responseInterceptors = {}
    }

    setUrl(url) {
        this.url = url
        return this
    }

    setData(data) {
        this.data = data
        return this
    }

    setExtensions(extensions) {
        this.extensions = extensions
        return this
    }

    mergeExtensions(extensions) {
        this.extensions = utils.deepMerge(this.extensions, extensions)
        return this
    }
}