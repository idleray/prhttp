import Call from "./Call.js"

export default class PrHttpClient {
    constructor(builder) {
        this.engine = builder ? builder.engine : null
        this.interceptors = builder ? builder.interceptors : []
    }

    newCall(request) {
        return new Call(this, request)
    }
}