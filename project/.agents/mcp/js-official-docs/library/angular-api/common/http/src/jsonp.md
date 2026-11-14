# common/http/src/jsonp

## JsonpClientBackend

```ts
export class JsonpClientBackend implements HttpBackend
```

Processes an `HttpRequest` with the JSONP method,
by performing JSONP style requests.
@see {@link HttpHandler}
@see {@link HttpXhrBackend}

@publicApi
@deprecated 22.1 JSONP is deprecated as it can cause XSS vulnerabilities. Use standard HTTP requests instead. Intent to remove in future versions of Angular.

## JsonpClientBackend.handle

```ts
handle(req: HttpRequest<never>): Observable<HttpEvent<any>>
```

Processes a JSONP request and returns an event stream of the results.
@param req The request object.
@returns An observable of the response events.

## JsonpInterceptor

```ts
export class JsonpInterceptor
```

Identifies requests with the method JSONP and
shifts them to the `JsonpClientBackend`.

@see {@link HttpInterceptor}

@publicApi
@deprecated 22.1 JSONP is deprecated as it can cause XSS vulnerabilities. Use standard HTTP requests instead. Intent to remove in future versions of Angular.

## JsonpInterceptor.intercept

```ts
intercept(initialRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
```

Identifies and handles a given JSONP request.
@param initialRequest The outgoing request object to handle.
@param next The next interceptor in the chain, or the backend
if no interceptors remain in the chain.
@returns An observable of the event stream.