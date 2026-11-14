# common/http/src/backend

## HttpBackend

```ts
export abstract class HttpBackend implements HttpHandler
```

A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.

Interceptors sit between the `HttpClient` interface and the `HttpBackend`.

When injected, `HttpBackend` dispatches requests directly to the backend, without going
through the interceptor chain.

@publicApi

## HttpHandler

```ts
export abstract class HttpHandler
```

Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
`HttpResponse`.

`HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
`HttpBackend`.

In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.

@publicApi