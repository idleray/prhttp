import InterceptorChain from './InterceptorChain.js'
import CallServerInterceptor from './CallServerInterceptor.js'
import CancellationInterceptor from "./CancellationInterceptor.js"
import Lifecycleinterceptor from './lifecycle/LifecycleInterceptor.js'

export default class Call {
    constructor(client, request) {
        this.client = client
        this.request = request
        this.cancellationInterceptor = new CancellationInterceptor()
        if(this.client.lifecycle) {
            this.lifeCycleInterceptor = new Lifecycleinterceptor(this, this.client.lifecycle)
        }
    }

    async execute() {
        let interceptors = []
        interceptors.push(...this.client.interceptors)
        interceptors.push(this.cancellationInterceptor)
        if(this.lifeCycleInterceptor) {
            interceptors.push(this.lifeCycleInterceptor)
        }
        interceptors.push(new CallServerInterceptor(this.client.engine))

        const chain = new InterceptorChain(interceptors, this.request, 0)
        const response = await chain.proceed(this.request)
        return response
    }

    cancel() {
        this.cancellationInterceptor.cancel()
    }
}