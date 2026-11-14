# common/http/src/request

## HttpRequestOptions

```ts
export interface HttpRequestOptions
```

Options to configure the `HttpRequest`, like headers, parameters, etc.

@publicApi 22.0

## HttpRequestOptions.reportProgress

```ts
reportProgress?: boolean
```

@deprecated 22.0 Use `reportUploadProgress` and `reportDownloadProgress` instead

## HttpRequestOptions.reportUploadProgress

```ts
reportUploadProgress?: boolean
```

When set to `true` a request emited against the `FetchBackend` will throw an error.

## HttpRequestOptions.transferCache

```ts
transferCache?: HttpTransferCacheRequestOptions
```

This property accepts either a boolean to enable/disable transferring cache for eligible
requests performed using `HttpClient`, or an object, which allows to configure cache
parameters, such as which headers should be included (no headers are included by default).

Setting this property will override the options passed to `provideClientHydration()` for this
particular request

## HttpRequest

```ts
export class HttpRequest<T> implements HttpRequestOptions
```

An outgoing HTTP request with an optional typed body.

`HttpRequest` represents an outgoing request, including URL, method,
headers, body, and other request configuration options. Instances should be
assumed to be immutable. To modify a `HttpRequest`, the `clone`
method should be used.

@publicApi

## HttpRequest.body

```ts
readonly body: T | null = null
```

The request body, or `null` if one isn't set.

Bodies are not enforced to be immutable, as they can include a reference to any
user-defined data type. However, interceptors should take care to preserve
idempotence by treating them as such.

## HttpRequest.headers

```ts
readonly headers!: HttpHeaders
```

Outgoing headers for this request.

## HttpRequest.context

```ts
readonly context!: HttpContext
```

Shared and mutable context that can be used by interceptors

## HttpRequest.reportProgress

```ts
readonly reportProgress: boolean = false
```

Whether this request should be made in a way that exposes progress events.

Progress events are expensive (change detection runs on each event) and so
they should only be requested if the consumer intends to monitor them.

Note: The default `HttpBackend` based on fetch, does not support progress report for uploads.
Set the `HttpXhrBackend` with `withXhr()` if you need this feature.

@deprecated 22.0 Use `reportUploadProgress` and `reportDownloadProgress` instead

## HttpRequest.reportUploadProgress

```ts
readonly reportUploadProgress: boolean = false
```

When set to `true` a request emited against the `FetchBackend` will throw an error.

## HttpRequest.withCredentials

```ts
readonly withCredentials: boolean = false
```

Whether this request should be sent with outgoing credentials (cookies).

## HttpRequest.credentials

```ts
readonly credentials!: RequestCredentials
```

The credentials mode of the request, which determines how cookies and HTTP authentication are handled.
 This can affect whether cookies are sent with the request, and how authentication is handled.

## HttpRequest.keepalive

```ts
readonly keepalive: boolean = false
```

When using the fetch implementation and set to `true`, the browser will not abort the associated request if the page that initiated it is unloaded before the request is complete.

## HttpRequest.cache

```ts
readonly cache!: RequestCache
```

Controls how the request will interact with the browser's HTTP cache.
This affects whether a response is retrieved from the cache, how it is stored, or if it bypasses the cache altogether.

## HttpRequest.priority

```ts
readonly priority!: RequestPriority
```

Indicates the relative priority of the request. This may be used by the browser to decide the order in which requests are dispatched and resources fetched.

## HttpRequest.mode

```ts
readonly mode!: RequestMode
```

The mode of the request, which determines how the request will interact with the browser's security model.
This can affect things like CORS (Cross-Origin Resource Sharing) and same-origin policies.

## HttpRequest.redirect

```ts
readonly redirect!: RequestRedirect
```

The redirect mode of the request, which determines how redirects are handled.
This can affect whether the request follows redirects automatically, or if it fails when a redirect occurs.

## HttpRequest.referrer

```ts
readonly referrer!: string
```

The referrer of the request, which can be used to indicate the origin of the request.
This is useful for security and analytics purposes.
Value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

## HttpRequest.integrity

```ts
readonly integrity!: string
```

The integrity metadata of the request, which can be used to ensure the request is made with the expected content.
A cryptographic hash of the resource to be fetched by request

## HttpRequest.referrerPolicy

```ts
readonly referrerPolicy!: ReferrerPolicy
```

The referrer policy of the request, which can be used to specify the referrer information to be included with the request.
This can affect the amount of referrer information sent with the request, and can be used to enhance privacy and security.

## HttpRequest.responseType

```ts
readonly responseType: HttpResponseType = 'json'
```

The expected response type of the server.

This is used to parse the response appropriately before returning it to
the requestee.

## HttpRequest.method

```ts
readonly method: string
```

The outgoing HTTP request method.

## HttpRequest.params

```ts
readonly params!: HttpParams
```

Outgoing URL parameters.

To pass a string representation of HTTP parameters in the URL-query-string format,
the `HttpParamsOptions`' `fromString` may be used. For example:

```ts
new HttpParams({fromString: 'angular=awesome'})
```

## HttpRequest.urlWithParams

```ts
readonly urlWithParams: string
```

The outgoing URL with all URL parameters set.

## HttpRequest.transferCache

```ts
readonly transferCache?: HttpTransferCacheRequestOptions
```

The HttpTransferCache option for the request

## HttpRequest.timeout

```ts
readonly timeout?: number
```

The timeout for the backend HTTP request in ms.

## HttpRequest.serializeBody

```ts
serializeBody(): ArrayBuffer | Blob | FormData | URLSearchParams | string | null
```

Transform the free-form body into a serialized format suitable for
transmission to the server.

## HttpRequest.detectContentTypeHeader

```ts
detectContentTypeHeader(): string | null
```

Examine the body and attempt to infer an appropriate MIME type
for it.

If no such type can be inferred, this method will return `null`.