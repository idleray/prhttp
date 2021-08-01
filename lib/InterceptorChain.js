export default class InterceptorChain {
    constructor(interceptors, request, index) {
        this.interceptors = interceptors
        this.request = request
        this.index = index
    }

    async proceed(request) {
        if(this.index >= this.interceptors.length) {
            throw new Error('out of index')
        }

        const next = new InterceptorChain(this.interceptors, request, this.index+1)
        const interceptor = this.interceptors[this.index]
        const response = await interceptor.intercept(next)

        return response

    }
}