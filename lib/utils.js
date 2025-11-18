function clone(src) {
    if(!src) {
        return null
    }
    return JSON.parse(JSON.stringify(src))
}

function deepMerge(target, source) {
    if (!target) target = {}
    if (!source) return target
    
    const result = clone(target)
    
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = deepMerge(result[key], source[key])
            } else {
                result[key] = source[key]
            }
        }
    }
    
    return result
}

export default {
    clone,
    deepMerge
}