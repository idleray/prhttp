import Lifecycle from './Lifecycle.js'

const lifecycleMixin = {
    data() {
        return {
            lifecycle: new Lifecycle()
        }
    },
    methods: {
        bind(httpClient) {
            httpClient.bindLifecycle(this.lifecycle)
        }
    },

    beforeDestroy() {
        this.lifecycle.setState(Lifecycle.STATE.BEFORE_UNMOUNTED)
    }
}

export default lifecycleMixin