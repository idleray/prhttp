import InterceptorChain from './InterceptorChain.js'
import CallServerInterceptor from './CallServerInterceptor.js'

export default class PrHttpClient {
    constructor(builder) {
        this.engine = builder ? builder.engine : null
        this.interceptors = builder ? builder.interceptors : []
    }

    async execute(httpRequest) {
        let interceptors = []
        interceptors.push(...this.interceptors)
        interceptors.push(new CallServerInterceptor(this.engine))

        const chain = new InterceptorChain(interceptors, httpRequest, 0)
        const response = await chain.proceed(httpRequest)
        return response
    }
}