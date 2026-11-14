# common/http/src/resource_api

## HttpResourceRequest

```ts
export interface HttpResourceRequest
```

The structure of an `httpResource` request which will be sent to the backend.

@publicApi 22.0

## HttpResourceRequest.url

```ts
url: string
```

URL of the request.

This URL should not include query parameters. Instead, specify query parameters through the
`params` field.

## HttpResourceRequest.method

```ts
method?: string
```

HTTP method of the request, which defaults to GET if not specified.

## HttpResourceRequest.body

```ts
body?: unknown
```

Body to send with the request, if there is one.

If no Content-Type header is specified by the user, Angular will attempt to set one based on
the type of `body`.

## HttpResourceRequest.params

```ts
params?: | HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
```

Dictionary of query parameters which will be appeneded to the request URL.

## HttpResourceRequest.headers

```ts
headers?: HttpHeaders | Record<string, string | ReadonlyArray<string>>
```

Dictionary of headers to include with the outgoing request.

## HttpResourceRequest.context

```ts
context?: HttpContext
```

Context of the request stored in a dictionary of key-value pairs.

## HttpResourceRequest.reportProgress

```ts
reportProgress?: boolean
```

If `true`, progress events will be enabled for the request and delivered through the
`HttpResource.progress` signal.

## HttpResourceRequest.withCredentials

```ts
withCredentials?: boolean
```

Specifies whether the `withCredentials` flag should be set on the outgoing request.

This flag causes the browser to send cookies and other authentication information along with
the request.

## HttpResourceRequest.keepalive

```ts
keepalive?: boolean
```

When using the fetch implementation and set to `true`, the browser will not abort the associated request if the page that initiated it is unloaded before the request is complete.

## HttpResourceRequest.cache

```ts
cache?: RequestCache | (string & {})
```

Controls how the request will interact with the browser's HTTP cache.
This affects whether a response is retrieved from the cache, how it is stored, or if it bypasses the cache altogether.

## HttpResourceRequest.credentials

```ts
credentials?: RequestCredentials | (string & {})
```

The credentials mode of the request, which determines how cookies and other authentication information are handled.
This can affect whether credentials are sent with cross-origin requests or not.

## HttpResourceRequest.priority

```ts
priority?: RequestPriority | (string & {})
```

Indicates the relative priority of the request. This may be used by the browser to decide the order in which requests are dispatched and resources fetched.

## HttpResourceRequest.mode

```ts
mode?: RequestMode | (string & {})
```

The mode of the request, which determines how the request will interact with the browser's security model.
This can affect things like CORS (Cross-Origin Resource Sharing) and same-origin policies.

## HttpResourceRequest.redirect

```ts
redirect?: RequestRedirect | (string & {})
```

The redirect mode of the request, which determines how redirects are handled.
This can affect whether the request follows redirects automatically, or if it fails when a redirect occurs.

## HttpResourceRequest.referrer

```ts
referrer?: string
```

The referrer of the request, which can be used to indicate the origin of the request.
This is useful for security and analytics purposes.
Value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

## HttpResourceRequest.referrerPolicy

```ts
referrerPolicy?: ReferrerPolicy | (string & {})
```

The referrer policy of the request, which can be used to specify the referrer information to be included with the request.
This can affect the amount of referrer information sent with the request, and can be used to enhance privacy and security.

## HttpResourceRequest.integrity

```ts
integrity?: string
```

The integrity metadata of the request, which can be used to ensure the request is made with the expected content.
A cryptographic hash of the resource to be fetched by request

## HttpResourceRequest.transferCache

```ts
transferCache?: {includeHeaders?: string[]} | boolean
```

Configures the server-side rendering transfer cache for this request.

See the documentation on the transfer cache for more information.

## HttpResourceRequest.timeout

```ts
timeout?: number
```

The timeout for the backend HTTP request in ms.

## HttpResourceOptions

```ts
export interface HttpResourceOptions<TResult, TRaw>
```

Options for creating an `httpResource`.

@publicApi 22.0

## HttpResourceOptions.parse

```ts
parse?: (value: TRaw)
```

Transform the result of the HTTP request before it's delivered to the resource.

`parse` receives the value from the HTTP layer as its raw type (e.g. as `unknown` for JSON data).
It can be used to validate or transform the type of the resource, and return a more specific
type. This is also useful for validating backend responses using a runtime schema validation
library such as Zod.

## HttpResourceOptions.defaultValue

```ts
defaultValue?: NoInfer<TResult>
```

Value that the resource will take when in Idle or Loading states.

If not set, the resource will use `undefined` as its default value.

## HttpResourceOptions.injector

```ts
injector?: Injector
```

The `Injector` in which to create the `httpResource`.

If this is not provided, the current [injection context](guide/di/dependency-injection-context)
will be used instead (via `inject`).

## HttpResourceOptions.equal

```ts
equal?: ValueEqualityFn<NoInfer<TResult>>
```

A comparison function which defines equality for the response value.

## HttpResourceOptions.debugName

```ts
debugName?: string
```

A debug name for the reactive node. Used in Angular DevTools to identify the node.

## HttpResourceRef

```ts
export interface HttpResourceRef<T> extends WritableResource<T>, ResourceRef<T>
```

A `WritableResource` that represents the results of a reactive HTTP request.

`HttpResource`s are backed by `HttpClient`, including support for interceptors, testing, and the
other features of the `HttpClient` API.

@publicApi 22.0

## HttpResourceRef.headers

```ts
readonly headers: Signal<HttpHeaders | undefined>
```

Signal of the response headers, when available.

## HttpResourceRef.statusCode

```ts
readonly statusCode: Signal<number | undefined>
```

Signal of the response status code, when available.

## HttpResourceRef.progress

```ts
readonly progress: Signal<HttpProgressEvent | undefined>
```

Signal of the latest progress update, if the request was made with `reportProgress: true`.