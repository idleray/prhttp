function clone(src) {
    if(!src) {
        return null
    }
    return JSON.parse(JSON.stringify(src))
}

export default {
    clone
}