# prhttp
A JavaScript HTTP interceptor inspired by [okhttp](https://github.com/square/okhttp)

## Installation
```shell
npm install prhttp
```

## Usage
### Create HTTP engine
Create an object which implement `execute` function
```
class exampleEngine() {
    execute(request) {
        //execute http request
    }
}
```
### Create interceptor
Create an ojbect which implement `intercept` function
```
class exampleInterceptor() {
    async intercept(chain) {
        const newRequest = chain.request.newRequest()
        newRequest.setHeader('Authorization', 'your token')
        return await chain.proceed(newRequest)
    }
}
```
### Send Http request
```
import { PrHttpClientBuilder, PrRequestBuilder}  from 'prhttp'

let builder = new PrHttpClientBuilder()
let httpClient = builder.setEngine(new exampleEngine())
                        .addInterceptor(new exampleInterceptor)
                        .build()

let getBuilder = new PrRequestBuilder()
getBuilder.setMethod('get')
              .setBaseUrl("https://www.example.com")
              .setContentType('application/json')

let request = getBuilder.build()
const data = {
    data1: 'data'
}
request.setUrl('your api').setData(data)

httpClient.newCall(request).execute()
```
### Cancellation
You can cancel a request Using `Call.cancel()`. Instead of normal return , `CancelError` will be thrown.
```
const call = httpClient.newCall(request)
call.execute().then(res => {
    console.log(res)
}).catch( e => {
    if(e instanceof CancelError) {
        console.log('Request was cancelled')
    } else {
        console.log(e)
    }
})

setTimeout( () => {
    call.cancel()
}, 100)
```

### Lifecycle Bind
`PrHttpClient` instance can be bound to a lifecycle. When the state of lifecycle is `BEFORE_UNMOUNTED`, `Call.cancel()` will be call.
#### Vue 2.x 
Use `Vue2lifecycleMixin` provided by prhttp.
```
import { Vue2lifecycleMixin } from 'prhttp/lifecycle'

// PrHttpClient instance
const httpClient = /.../

export default {
  mixins: [Vue2lifecycleMixin],
  mounted() {
    this.bind(httpClient)
  }
}
```

### Vue 3.x

1、Create a composable function
```
// Vue3LifecycleHook.js
import { onBeforeUnmount } from 'vue'
import { Lifecycle } from 'prhttp/lifecycle'

export function bindVue3Lifecycle(httpClient) {
    let lifecycle = new Lifecycle()
    onBeforeUnmount( () => {
        lifecycle.setState(Lifecycle.STATE.BEFORE_UNMOUNTED)
    })
    
    httpClient.bindLifecycle(lifecycle)
}
```

2、Bind lifecycle in `<script setup>` or `setup()`
```
import { bindVue3Lifecycle } from '@/path_to/Vue3LifecycleHook.js'

// PrHttpClient instance
const httpClient = /.../
bindVue3Lifecycle(httpClient)
```

## Example
You can look at a [full example](example/index.js) which use [Axios](https://github.com/axios/axios) as engine