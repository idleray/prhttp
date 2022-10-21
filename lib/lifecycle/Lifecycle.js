export default class Lifecycle {
    static STATE = {
        INIT: "Init",
        BEFORE_MOUNT: "BeforeMount",
        MOUNTED: "Mounted",
        BEFORE_UNMOUNTED: "BeforeUnmounted",
        UNMOUNTED: "Unmounted"

    }
    constructor() {
        this.state = Lifecycle.STATE.INIT
        this.observers = new Map()
    }

    addObserver(observer) {
        if(!this.observers.has(observer)) {
            this.observers.set(observer, observer)
        }
    }

    removeObserver(observer) {
        this.observers.delete(observer)
    }
    
    setState(state) {
        this.state = state
        this.observers.forEach( (key, value) => {
            value.onStateChanged(state)
        })
    }
}