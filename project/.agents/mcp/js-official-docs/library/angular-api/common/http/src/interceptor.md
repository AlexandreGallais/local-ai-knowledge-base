# common/http/src/interceptor

## HttpInterceptor

```ts
export interface HttpInterceptor
```

Intercepts and handles an `HttpRequest` or `HttpResponse`.

Most interceptors transform the outgoing request before passing it to the
next interceptor in the chain, by calling `next.handle(transformedReq)`.
An interceptor may transform the
response event stream as well, by applying additional RxJS operators on the stream
returned by `next.handle()`.

More rarely, an interceptor may handle the request entirely,
and compose a new event stream instead of invoking `next.handle()`. This is an
acceptable behavior, but keep in mind that further interceptors will be skipped entirely.

It is also rare but valid for an interceptor to return multiple responses on the
event stream for a single request.

@publicApi

@see [HTTP Guide](guide/http/interceptors)
@see {@link HttpInterceptorFn}

@usageNotes

To use the same instance of `HttpInterceptors` for the entire app, import the `HttpClientModule`
only in your `AppModule`, and add the interceptors to the root application injector.
If you import `HttpClientModule` multiple times across different modules (for example, in lazy
loading modules), each import creates a new copy of the `HttpClientModule`, which overwrites the
interceptors provided in the root module.

## HttpInterceptor.intercept

```ts
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
```

Identifies and handles a given HTTP request.
@param req The outgoing request object to handle.
@param next The next interceptor in the chain, or the backend
if no interceptors remain in the chain.
@returns An observable of the event stream.

## HttpHandlerFn

```ts
export type HttpHandlerFn = (req: HttpRequest<unknown>)
```

Represents the next interceptor in an interceptor chain, or the real backend if there are no
further interceptors.

Most interceptors will delegate to this function, and either modify the outgoing request or the
response when it arrives. Within the scope of the current request, however, this function may be
called any number of times, for any number of downstream requests. Such downstream requests need
not be to the same URL or even the same origin as the current request. It is also valid to not
call the downstream handler at all, and process the current request entirely within the
interceptor.

This function should only be called within the scope of the request that's currently being
intercepted. Once that request is complete, this downstream handler function should not be
called.

@publicApi

@see [HTTP Guide](guide/http/interceptors)

## HTTP_INTERCEPTORS

```ts
export const HTTP_INTERCEPTORS = new InjectionToken<readonly HttpInterceptor[]>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'HTTP_INTERCEPTORS' : '', )
```

A multi-provider token that represents the array of registered
`HttpInterceptor` objects.

@see [HTTP Guide](guide/http/interceptors)

@publicApi