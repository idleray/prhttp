import InterceptorChain from './InterceptorChain.js'
import CallServerInterceptor from './CallServerInterceptor.js'
import CancellationInterceptor from "./CancellationInterceptor.js"

export default class Call {
    constructor(client, request) {
        this.client = client
        this.request = request
        this.cancellationInterceptor = new CancellationInterceptor()
    }

    async execute() {
        let interceptors = []
        interceptors.push(...this.client.interceptors)
        interceptors.push(this.cancellationInterceptor)
        interceptors.push(new CallServerInterceptor(this.client.engine))

        const chain = new InterceptorChain(interceptors, this.request, 0)
        const response = await chain.proceed(this.request)
        return response
    }

    cancel() {
        this.cancellationInterceptor.cancel()
    }
}