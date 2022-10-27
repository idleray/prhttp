import Lifecycle from "./Lifecycle.js"

export default class LifecycleInterceptor {
    constructor(call, lifecycle) {
        this.call = call
        this.lifecycle = lifecycle
    }

    async intercept(chain) {
        const request = chain.request
        let res = await chain.proceed(request)

        if(this.lifecycle && this.lifecycle.state === Lifecycle.STATE.BEFORE_UNMOUNTED) {
            this.call.cancel()
        }

        return res
    }
}