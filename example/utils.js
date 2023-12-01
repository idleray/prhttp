function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

function buildUrl(urlStr, params) {
    let searchParams = ""
    if (params) {
        const query = Object.keys(params)
            .map(k => fixedEncodeURIComponent(k) + '=' + fixedEncodeURIComponent(params[k]))
            .join('&')
        searchParams = "?" + query
    }
    const url = urlStr + searchParams

    return url
}

function callWxApiToPromise(wxApi, option) {
    let opt = option || {}
    return new Promise((resolve, reject) => {
        wxApi({
            ...opt,
            success: (res) => {
                // console.log(res)
                resolve(res)
            },
            fail: (res) => {
                // console.log(res)
                reject(res)
            }
        })
    })
  }

export default {
    combineURLs,
    fixedEncodeURIComponent,
    buildUrl,
    callWxApiToPromise
}