import PrRequest from './PrRequest.js'
import utils from './utils.js'

export default class PrRequestBuilder {
    constructor(builder) {
        this.baseUrl = builder ? builder.baseUrl : ''
        this.method = builder ? builder.method : 'get'
        this.contentType = builder ? builder.contentType : ''
        this.headers = builder ? utils.clone(builder.headers) : {}
        this.extensions = builder ? utils.clone(builder.extensions) : {}
        
    }

    setBaseUrl(url) {
        this.baseUrl = url
        return this
    }
    setMethod(method) {
        this.method = method
        return this
    }

    setContentType(contentType) {
        this.setHeader('Content-Type', contentType)
        return this
    }

    setHeaders(headers) {
        this.headers = headers || {}
        return this
    }

    setHeader(name, value) {
        this.headers[name] = value
        return this
    }

    setExtensions(extensions) {
        this.extensions = extensions
        return this
    }

    build() {
        return new PrRequest(this)
    }

}