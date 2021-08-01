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
### Do Http request
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

httpClient.execute(request)
```

## Example
You can look at a [full example](example/index.js) which use [Axios](https://github.com/axios/axios) as engine