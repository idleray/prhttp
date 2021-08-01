import PrHttpClient from './PrHttpClient.js'

export default class PrHttpClientBuilder {
    constructor() {
        this.engine = null
        this.interceptors = []
    }

    setEngine(engine) {
        this.engine = engine
        return this
    }
    
    addInterceptor(interceptor) {
        this.interceptors.push(interceptor)
        return this
    }

    build() {
        if(!this.engine) {
            throw new Error("no request engine")
        }
        return new PrHttpClient(this)
    }
}