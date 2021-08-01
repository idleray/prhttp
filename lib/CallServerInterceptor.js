export default class CallServerInterceptor {
    constructor(engine) {
        this.engine = engine
    }

    async intercept(chain) {
        const request = chain.request
        const response = await this.engine.execute(request)
        return response
    }
}