# common/http/src/client

## HttpClientCommonOptions

```ts
export interface HttpClientCommonOptions extends Omit<HttpRequestOptions, 'headers' | 'params'>
```

Common options for HttpClient requests.

@publicApi 22.0

## HttpClient

```ts
export class HttpClient
```

Performs HTTP requests.
This service is available as an injectable class, with methods to perform HTTP requests.
Each request method has multiple signatures, and the return type varies based on
the signature that is called (mainly the values of `observe` and `responseType`).

Note that the `responseType` *options* value is a String that identifies the
single data type of the response.
A single overload version of the method handles each response type.
The value of `responseType` cannot be a union, as the combined signature could imply.

@usageNotes

### HTTP Request Example

```ts
 // GET heroes whose name contains search term
searchHeroes(term: string): observable<Hero[]>{

 const params = new HttpParams({fromString: 'name=term'});
   return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
}
```

Alternatively, the parameter string can be used without invoking HttpParams
by directly joining to the URL.
```ts
this.httpClient.request('GET', this.heroesUrl + '?' + 'name=term', {responseType:'json'});
```

### PATCH Example
```ts
// PATCH one of the heroes' name
patchHero (id: number, heroName: string): Observable<{}> {
const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 return this.httpClient.patch(url, {name: heroName}, httpOptions)
   .pipe(catchError(this.handleError('patchHero')));
}
```

@see [HTTP Guide](guide/http)
@see [HTTP Request](api/common/http/HttpRequest)

@publicApi

## HttpClient.request

```ts
request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>
```

Sends an `HttpRequest` and returns a stream of `HttpEvent`s.

@return An `Observable` of the response, with the response body as a stream of `HttpEvent`s.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in
an `ArrayBuffer`.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.


@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request that interprets the body as a blob and returns
the response as a blob.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type `Blob`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request that interprets the body as a text string and
returns a string value.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type string.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request that interprets the body as an `ArrayBuffer` and returns the
the full event stream.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body as an array of `HttpEvent`s for
the request.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request that interprets the body as a `Blob` and returns
the full event stream.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request,
with the response body of type `Blob`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as a text string and returns the full event
stream.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request,
with the response body of type string.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as a JavaScript object and returns the full
event stream.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the  request.

@return An `Observable` of all `HttpEvent`s for the request,
with the response body of type `Object`.

## HttpClient.request

```ts
request<R>( method: string, url: string, options:
```

Constructs a request which interprets the body as a JavaScript object and returns the full
event stream.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request,
with the response body of type `R`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as an `ArrayBuffer`
and returns the full `HttpResponse`.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body as an `ArrayBuffer`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as a `Blob` and returns the full `HttpResponse`.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as a text stream and returns the full
`HttpResponse`.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the HTTP response, with the response body of type string.

## HttpClient.request

```ts
request( method: string, url: string, options:
```

Constructs a request which interprets the body as a JavaScript object and returns the full
`HttpResponse`.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the full `HttpResponse`,
with the response body of type `Object`.

## HttpClient.request

```ts
request<R>( method: string, url: string, options:
```

Constructs a request which interprets the body as a JavaScript object and returns
the full `HttpResponse` with the response body in the requested type.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return  An `Observable` of the full `HttpResponse`, with the response body of type `R`.

## HttpClient.request

```ts
request( method: string, url: string, options?:
```

Constructs a request which interprets the body as a JavaScript object and returns the full
`HttpResponse` as a JavaScript object.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of type `Object`.

## HttpClient.request

```ts
request<R>( method: string, url: string, options?:
```

Constructs a request which interprets the body as a JavaScript object
with the response body of the requested type.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of type `R`.

## HttpClient.request

```ts
request( method: string, url: string, options?:
```

Constructs a request where response type and requested observable are not known statically.

@param method  The HTTP method.
@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the requested response, with body of type `any`.

## HttpClient.request

```ts
request( first: string | HttpRequest<any>, url?: string, options:
```

Constructs an observable for a generic HTTP request that, when subscribed,
fires the request through the chain of registered interceptors and on to the
server.

You can pass an `HttpRequest` directly as the only parameter. In this case,
the call returns an observable of the raw `HttpEvent` stream.

Alternatively you can pass an HTTP method as the first parameter,
a URL string as the second, and an options hash containing the request body as the third.
See `addBody()`. In this case, the specified `responseType` and `observe` options determine the
type of returned observable.
  * The `responseType` value determines how a successful response body is parsed.
  * If `responseType` is the default `json`, you can pass a type interface for the resulting
object as a type parameter to the call.

The `observe` value determines the return type, according to what you are interested in
observing.
  * An `observe` value of events returns an observable of the raw `HttpEvent` stream, including
progress events by default.
  * An `observe` value of response returns an observable of `HttpResponse<T>`,
where the `T` parameter depends on the `responseType` and any optionally provided type
parameter.
  * An `observe` value of body returns an observable of `<T>` with the same `T` body type.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
 and returns the response as an `ArrayBuffer`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return  An `Observable` of the response body as an `ArrayBuffer`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a `Blob` and returns
the response as a `Blob`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response body as a `Blob`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a text string and returns
a string.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type string.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
 and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request,
with response body as an `ArrayBuffer`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a `Blob`
 and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all the `HttpEvent`s for the request, with the response body as a
`Blob`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a text string
and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request, with the response
body of type string.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as JSON
and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request, with response body of
type `Object`.

## HttpClient.delete

```ts
delete<T>( url: string, options:
```

Constructs a `DELETE`request that interprets the body as JSON
and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all the `HttpEvent`s for the request, with a response
body in the requested type.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
 the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the full `HttpResponse`, with the response body as an `ArrayBuffer`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
`HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request that interprets the body as a text stream and
 returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the full `HttpResponse`, with the response body of type string.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs a `DELETE` request the interprets the body as a JavaScript object and returns
the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of type `Object`.

## HttpClient.delete

```ts
delete<T>( url: string, options:
```

Constructs a `DELETE` request that interprets the body as JSON
and returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with the response body of the requested type.

## HttpClient.delete

```ts
delete( url: string, options?:
```

Constructs a `DELETE` request that interprets the body as JSON and
returns the response body as an object parsed from JSON.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type `Object`.

## HttpClient.delete

```ts
delete<T>( url: string, options?:
```

Constructs a DELETE request that interprets the body as JSON and returns
the response in a given type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with response body in the requested type.

## HttpClient.delete

```ts
delete( url: string, options:
```

Constructs an observable that, when subscribed, causes the configured
`DELETE` request to execute on the server. See the individual overloads for
details on the return type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the
response in an `ArrayBuffer`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a `Blob`
and returns the response as a `Blob`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body as a `Blob`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a text string
and returns the response as a string value.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type string.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
 the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of all `HttpEvent`s for the request, with the response
body as an `ArrayBuffer`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a `Blob` and
returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body as a `Blob`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a text string and returns
the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type string.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as JSON
and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body of type `Object`.

## HttpClient.get

```ts
get<T>( url: string, options:
```

Constructs a `GET` request that interprets the body as JSON and returns the full
event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with a response body in the requested type.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse` for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a `Blob` and
returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse` for the request,
with the response body as a `Blob`.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as a text stream and
returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse` for the request,
with the response body of type string.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs a `GET` request that interprets the body as JSON and
returns the full `HttpResponse`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the full `HttpResponse`,
with the response body of type `Object`.

## HttpClient.get

```ts
get<T>( url: string, options:
```

Constructs a `GET` request that interprets the body as JSON and returns
the full `HttpResponse` with the response body in the requested type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the full `HttpResponse`, with the response body in the requested type.

## HttpClient.get

```ts
get( url: string, options?:
```

Constructs a `GET` request that interprets the body as JSON and
returns the response body as an object parsed from JSON.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.


@return An `Observable` of the response body as a JavaScript object.

## HttpClient.get

```ts
get<T>( url: string, options?:
```

Constructs a `GET` request that interprets the body as JSON and returns
the response body in a given type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the `HttpResponse`, with a response body in the requested type.

## HttpClient.get

```ts
get( url: string, options:
```

Constructs an observable that, when subscribed, causes the configured
`GET` request to execute on the server. See the individual overloads for
details on the return type.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a `HEAD` request that interprets the body as an `ArrayBuffer` and
returns the response as an `ArrayBuffer`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as a \`Blob\` and returns
the response as a \`Blob\`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return  An \`Observable\` of the response, with the response body as a \`Blob\`.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as a text string and returns the response
as a string value.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the response, with the response body of type string.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as an  \`ArrayBuffer\`
 and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of all \`HttpEvent\`s for the request,
with the response body as an \`ArrayBuffer\`.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as a \`Blob\` and
returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of all \`HttpEvent\`s for the request,
with the response body as a \`Blob\`.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as a text string
and returns the full event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of all \`HttpEvent\`s for the request, with the response body of type
string.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as JSON
and returns the full HTTP event stream.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of all \`HttpEvent\`s for the request, with a response body of
type \`Object\`.

## HttpClient.head

```ts
head<T>( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as JSON and
returns the full event stream.

@return An \`Observable\` of all the \`HttpEvent\`s for the request,
with a response body in the requested type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as an \`ArrayBuffer\`
 and returns the full HTTP response.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body as an \`ArrayBuffer\`.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as a \`Blob\` and returns
the full \`HttpResponse\`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body as a blob.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as text stream
and returns the full \`HttpResponse\`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body of type string.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as JSON and
returns the full \`HttpResponse\`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body of type \`Object\`.

## HttpClient.head

```ts
head<T>( url: string, options:
```

Constructs a \`HEAD\` request that interprets the body as JSON
and returns the full \`HttpResponse\`.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with a response body of the requested type.

## HttpClient.head

```ts
head(url: string, options?: HttpClientCommonOptions): Observable<Object>
```

Constructs a \`HEAD\` request that interprets the body as JSON and
returns the response body as an object parsed from JSON.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the response, with the response body as an object parsed from JSON.

## HttpClient.head

```ts
head<T>(url: string, options?: HttpClientCommonOptions): Observable<T>
```

Constructs a \`HEAD\` request that interprets the body as JSON and returns
the response in a given type.

@param url     The endpoint URL.
@param options The HTTP options to send with the request.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with a response body of the given type.

## HttpClient.head

```ts
head( url: string, options:
```

Constructs an observable that, when subscribed, causes the configured
\`HEAD\` request to execute on the server. The \`HEAD\` method returns
meta information about the resource without transferring the
resource itself. See the individual overloads for
details on the return type.

## HttpClient.jsonp

```ts
jsonp(url: string, callbackParam: string): Observable<Object>
```

Constructs a `JSONP` request for the given URL and name of the callback parameter.

@param url The resource URL.
@param callbackParam The callback function name.

@return An `Observable` of the response object, with response body as an object.
@deprecated 22.1 JSONP is deprecated as it can cause XSS vulnerabilities. Use standard HTTP requests instead. Intent to remove in future versions of Angular.

## HttpClient.jsonp

```ts
jsonp<T>(url: string, callbackParam: string): Observable<T>
```

Constructs a `JSONP` request for the given URL and name of the callback parameter.

@param url The resource URL.
@param callbackParam The callback function name.

You must install a suitable interceptor, such as one provided by `HttpClientJsonpModule`.
If no such interceptor is reached,
then the `JSONP` request can be rejected by the configured backend.

@return An `Observable` of the response object, with response body in the requested type.
@deprecated 22.1 JSONP is deprecated as it can cause XSS vulnerabilities. Use standard HTTP requests instead. Intent to remove in future versions of Angular.

## HttpClient.jsonp

```ts
jsonp<T>(url: string, callbackParam: string): Observable<T>
```

Constructs an `Observable` that, when subscribed, causes a request with the special method
`JSONP` to be dispatched via the interceptor pipeline.
The [JSONP pattern](https://en.wikipedia.org/wiki/JSONP) works around limitations of certain
API endpoints that don't support newer,
and preferable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) protocol.
JSONP treats the endpoint API as a JavaScript file and tricks the browser to process the
requests even if the API endpoint is not located on the same domain (origin) as the client-side
application making the request.
The endpoint API must support JSONP callback for JSONP requests to work.
The resource API returns the JSON response wrapped in a callback function.
You can pass the callback function name as one of the query parameters.
Note that JSONP requests can only be used with `GET` requests.

@param url The resource URL.
@param callbackParam The callback function name.
@deprecated 22.1 JSONP is deprecated as it can cause XSS vulnerabilities. Use standard HTTP requests instead. Intent to remove in future versions of Angular.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an `OPTIONS` request that interprets the body as an
`ArrayBuffer` and returns the response as an `ArrayBuffer`.

@param url The endpoint URL.
@param options HTTP options.

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as a \`Blob\` and returns
the response as a \`Blob\`.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the response, with the response body as a \`Blob\`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as a text string and
returns a string value.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the response, with the response body of type string.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
 and returns the full event stream.

@param url The endpoint URL.
@param options HTTP options.

@return  An `Observable` of all `HttpEvent`s for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as a \`Blob\` and
returns the full event stream.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of all \`HttpEvent\`s for the request,
with the response body as a \`Blob\`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as a text string
and returns the full event stream.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of all the \`HttpEvent\`s for the request,
with the response body of type string.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as JSON
and returns the full event stream.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of all the \`HttpEvent\`s for the request with the response
body of type \`Object\`.

## HttpClient.options

```ts
options<T>( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as JSON and
returns the full event stream.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of all the \`HttpEvent\`s for the request,
with a response body in the requested type.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
 and returns the full HTTP response.

@param url The endpoint URL.
@param options HTTP options.

@return An `Observable` of the `HttpResponse` for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as a \`Blob\`
 and returns the full \`HttpResponse\`.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body as a \`Blob\`.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as text stream
and returns the full \`HttpResponse\`.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body of type string.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as JSON
and returns the full \`HttpResponse\`.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with the response body of type \`Object\`.

## HttpClient.options

```ts
options<T>( url: string, options:
```

Constructs an \`OPTIONS\` request that interprets the body as JSON and
returns the full \`HttpResponse\`.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the \`HttpResponse\` for the request,
with a response body in the requested type.

## HttpClient.options

```ts
options(url: string, options?: HttpClientCommonOptions): Observable<Object>
```

Constructs an \`OPTIONS\` request that interprets the body as JSON and returns the
response body as an object parsed from JSON.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the response, with the response body as an object parsed from JSON.

## HttpClient.options

```ts
options<T>(url: string, options?: HttpClientCommonOptions): Observable<T>
```

Constructs an \`OPTIONS\` request that interprets the body as JSON and returns the
response in a given type.

@param url The endpoint URL.
@param options HTTP options.

@return An \`Observable\` of the \`HttpResponse\`, with a response body of the given type.

## HttpClient.options

```ts
options( url: string, options:
```

Constructs an \`Observable\` that, when subscribed, causes the configured
\`OPTIONS\` request to execute on the server. This method allows the client
to determine the supported HTTP methods and other capabilities of an endpoint,
without implying a resource action. See the individual overloads for
details on the return type.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and returns
the response as an `ArrayBuffer`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a \`PATCH\` request that interprets the body as a \`Blob\` and returns the response
as a \`Blob\`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An \`Observable\` of the response, with the response body as a \`Blob\`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a \`PATCH\` request that interprets the body as a text string and
returns the response as a string value.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An \`Observable\` of the response, with a response body of type string.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
 returns the full event stream.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of all the `HttpEvent`s for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as a `Blob`
 and returns the full event stream.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of all the `HttpEvent`s for the request, with the
response body as `Blob`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as a text string and
returns the full event stream.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of all the `HttpEvent`s for the request, with a
response body of type string.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as JSON
and returns the full event stream.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of all the `HttpEvent`s for the request,
with a response body of type `Object`.

## HttpClient.patch

```ts
patch<T>( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as JSON
and returns the full event stream.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of all the `HttpEvent`s for the request,
with a response body in the requested type.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
 and returns the full `HttpResponse`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return  An `Observable` of the `HttpResponse` for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
`HttpResponse`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return  An `Observable` of the `HttpResponse` for the request,
with the response body as a `Blob`.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as a text stream and returns the
full `HttpResponse`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return  An `Observable` of the `HttpResponse` for the request,
with a response body of type string.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as JSON
and returns the full `HttpResponse`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of the `HttpResponse` for the request,
with a response body in the requested type.

## HttpClient.patch

```ts
patch<T>( url: string, body: any | null, options:
```

Constructs a `PATCH` request that interprets the body as JSON
and returns the full `HttpResponse`.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An `Observable` of the `HttpResponse` for the request,
with a response body in the given type.

## HttpClient.patch

```ts
patch(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>
```

Constructs a \`PATCH\` request that interprets the body as JSON and
returns the response body as an object parsed from JSON.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return An \`Observable\` of the response, with the response body as an object parsed from JSON.

## HttpClient.patch

```ts
patch<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>
```

Constructs a \`PATCH\` request that interprets the body as JSON
and returns the response in a given type.

@param url The endpoint URL.
@param body The resources to edit.
@param options HTTP options.

@return  An \`Observable\` of the \`HttpResponse\` for the request,
with a response body in the given type.

## HttpClient.patch

```ts
patch( url: string, body: any | null, options:
```

Constructs an observable that, when subscribed, causes the configured
\`PATCH\` request to execute on the server. See the individual overloads for
details on the return type.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as an `ArrayBuffer` and returns
an `ArrayBuffer`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options.

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a \`POST\` request that interprets the body as a \`Blob\` and returns the
response as a \`Blob\`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An \`Observable\` of the response, with the response body as a \`Blob\`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a \`POST\` request that interprets the body as a text string and
returns the response as a string value.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An \`Observable\` of the response, with a response body of type string.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
returns the full event stream.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as a `Blob`
and returns the response in an observable of the full event stream.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request, with the response body as `Blob`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as a text string and returns the full
event stream.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return  An `Observable` of all `HttpEvent`s for the request,
with a response body of type string.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a POST request that interprets the body as JSON and returns the full
event stream.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return  An `Observable` of all `HttpEvent`s for the request,
with a response body of type `Object`.

## HttpClient.post

```ts
post<T>( url: string, body: any | null, options:
```

Constructs a POST request that interprets the body as JSON and returns the full
event stream.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request,
with a response body in the requested type.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a POST request that interprets the body as an `ArrayBuffer`
 and returns the full `HttpResponse`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return  An `Observable` of the `HttpResponse` for the request, with the response body as an
`ArrayBuffer`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as a `Blob` and returns the full
`HttpResponse`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request,
with the response body as a `Blob`.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as a text stream and returns
the full `HttpResponse`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return  An `Observable` of the `HttpResponse` for the request,
with a response body of type string.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as JSON
and returns the full `HttpResponse`.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request, with a response body of type
`Object`.

## HttpClient.post

```ts
post<T>( url: string, body: any | null, options:
```

Constructs a `POST` request that interprets the body as JSON and returns the
full `HttpResponse`.


@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request, with a response body in the
requested type.

## HttpClient.post

```ts
post(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>
```

Constructs a `POST` request that interprets the body as JSON
and returns the response body as an object parsed from JSON.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return An `Observable` of the response, with the response body as an object parsed from JSON.

## HttpClient.post

```ts
post<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>
```

Constructs a `POST` request that interprets the body as JSON
and returns an observable of the response.

@param url The endpoint URL.
@param body The content to replace with.
@param options HTTP options

@return  An `Observable` of the `HttpResponse` for the request, with a response body in the
requested type.

## HttpClient.post

```ts
post( url: string, body: any | null, options:
```

Constructs an observable that, when subscribed, causes the configured
`POST` request to execute on the server. The server responds with the location of
the replaced resource. See the individual overloads for
details on the return type.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and returns the
response as an `ArrayBuffer`.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the response, with the response body as an `ArrayBuffer`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a `Blob` and returns
the response as a `Blob`.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the response, with the response body as a `Blob`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a text string and
returns the response as a string value.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the response, with a response body of type string.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
returns the full event stream.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request,
with the response body as an `ArrayBuffer`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event
stream.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request,
with the response body as a `Blob`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a text string and returns the full event
stream.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request, with a response body
of type string.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as JSON and returns the full
event stream.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request, with a response body of
type `Object`.

## HttpClient.put

```ts
put<T>( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as JSON and returns the
full event stream.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of all `HttpEvent`s for the request,
with a response body in the requested type.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as an
`ArrayBuffer` and returns an observable of the full HTTP response.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request, with the response body as an
`ArrayBuffer`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a `Blob` and returns the
full HTTP response.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request,
with the response body as a `Blob`.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as a text stream and returns the
full HTTP response.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request, with a response body of type
string.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as JSON and returns the full
HTTP response.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request, with a response body
of type 'Object`.

## HttpClient.put

```ts
put<T>( url: string, body: any | null, options:
```

Constructs a `PUT` request that interprets the body as an instance of the requested type and
returns the full HTTP response.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the `HttpResponse` for the request,
with a response body in the requested type.

## HttpClient.put

```ts
put(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<Object>
```

Constructs a `PUT` request that interprets the body as JSON
and returns an observable of JavaScript object.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the response as a JavaScript object.

## HttpClient.put

```ts
put<T>(url: string, body: any | null, options?: HttpClientCommonOptions): Observable<T>
```

Constructs a `PUT` request that interprets the body as an instance of the requested type
and returns an observable of the requested type.

@param url The endpoint URL.
@param body The resources to add/update.
@param options HTTP options

@return An `Observable` of the requested type.

## HttpClient.put

```ts
put( url: string, body: any | null, options:
```

Constructs an observable that, when subscribed, causes the configured
`PUT` request to execute on the server. The `PUT` method replaces an existing resource
with a new set of values.
See the individual overloads for details on the return type.