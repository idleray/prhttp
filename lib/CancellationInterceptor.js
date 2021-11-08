import CancelError from "./CancelError.js"

export default class CancellationInterceptor {
    constructor() {
        this.canceled = false
    }

    cancel() {
        this.canceled = true
    }

    async intercept(chain) {
        const request = chain.request
        let res = await chain.proceed(request)
        if(this.canceled) {
            throw new CancelError('Canceled')
        }

        return res
    }
}