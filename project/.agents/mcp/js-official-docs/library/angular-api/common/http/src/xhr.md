# common/http/src/xhr

## HttpXhrBackend

```ts
export class HttpXhrBackend implements HttpBackend
```

Uses `XMLHttpRequest` to send requests to a backend server.
@see {@link HttpHandler}
@see {@link JsonpClientBackend}

@publicApi

## HttpXhrBackend.handle

```ts
handle(req: HttpRequest<any>): Observable<HttpEvent<any>>
```

Processes a request and returns a stream of response events.
@param req The request object.
@returns An observable of the response events.