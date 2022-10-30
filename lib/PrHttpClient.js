import Call from "./Call.js"

export default class PrHttpClient {
    constructor(builder) {
        this.engine = builder ? builder.engine : null
        this.interceptors = builder ? builder.interceptors : []
        this.lifecycle = null
    }

    newCall(request) {
        return new Call(this, request)
    }

    bindLifecycle(lifecycle) {
        this.lifecycle = lifecycle
    }

    unbindLifecycle(lifecycle) {
        if(this.lifecycle === lifecycle) {
            this.lifecycle = null
        }
    }
}