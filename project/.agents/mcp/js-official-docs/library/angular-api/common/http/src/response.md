# common/http/src/response

## HttpEventType

```ts
export enum HttpEventType
```

Type enumeration for the different kinds of `HttpEvent`.

@see [Receiving raw progress event](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpProgressEvent

```ts
export interface HttpProgressEvent
```

Base interface for progress events.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpProgressEvent.type

```ts
type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress
```

Progress event type is either upload or download.

## HttpProgressEvent.loaded

```ts
loaded: number
```

Number of bytes uploaded or downloaded.

## HttpProgressEvent.total

```ts
total?: number
```

Total number of bytes to upload or download. Depending on the request or
response, this may not be computable and thus may not be present.

## HttpDownloadProgressEvent

```ts
export interface HttpDownloadProgressEvent extends HttpProgressEvent
```

A download progress event.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpDownloadProgressEvent.partialText

```ts
partialText?: string
```

The partial response body as downloaded so far.

Only present if the responseType was `text`.

## HttpUploadProgressEvent

```ts
export interface HttpUploadProgressEvent extends HttpProgressEvent
```

An upload progress event.

Note: The `FetchBackend` doesn't support progress report on uploads.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpSentEvent

```ts
export interface HttpSentEvent
```

An event indicating that the request was sent to the server. Useful
when a request may be retried multiple times, to distinguish between
retries on the final event stream.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpUserEvent

```ts
export interface HttpUserEvent<T>
```

A user-defined event.

Grouping all custom events under this type ensures they will be handled
and forwarded by all implementations of interceptors.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpEvent

```ts
export type HttpEvent<T> = | HttpSentEvent | HttpHeaderResponse | HttpResponse<T> | HttpDownloadProgressEvent | HttpUploadProgressEvent | HttpUserEvent<T>
```

Union type for all possible events on the response stream.

Typed according to the expected type of the response.

@see [Intercepting response events](guide/http/interceptors#intercepting-response-events)
@publicApi

## HttpResponseBase

```ts
export abstract class HttpResponseBase
```

Base class for both `HttpResponse` and `HttpHeaderResponse`.

@publicApi

## HttpResponseBase.headers

```ts
readonly headers: HttpHeaders
```

All response headers.

## HttpResponseBase.status

```ts
readonly status: number
```

Response status code.

## HttpResponseBase.statusText

```ts
readonly statusText: string
```

Textual description of response status code, defaults to OK.

Do not depend on this.

@deprecated With HTTP/2 and later versions, this will incorrectly remain set to 'OK' even when the status code of a response is not 200.

## HttpResponseBase.url

```ts
readonly url: string | null
```

URL of the resource retrieved, or null if not available.

## HttpResponseBase.ok

```ts
readonly ok: boolean
```

Whether the status code falls in the 2xx range.

## HttpResponseBase.type

```ts
readonly type!: HttpEventType.Response | HttpEventType.ResponseHeader
```

Type of the response, narrowed to either the full response or the header.

## HttpResponseBase.redirected

```ts
readonly redirected?: boolean
```

Indicates whether the HTTP response was redirected during the request.
This property is only available when using the Fetch API using `withFetch()`
When using the default XHR Request this property will be `undefined`

## HttpResponseBase.responseType

```ts
readonly responseType?: ResponseType
```

Indicates the type of the HTTP response, based on how the request was made and how the browser handles the response.

This corresponds to the `type` property of the Fetch API's `Response` object, which can indicate values such as:
- `'basic'`: A same-origin response, allowing full access to the body and headers.
- `'cors'`: A cross-origin response with CORS enabled, exposing only safe response headers.
- `'opaque'`: A cross-origin response made with `no-cors`, where the response body and headers are inaccessible.
- `'opaqueredirect'`: A response resulting from a redirect followed in `no-cors` mode.
- `'error'`: A response representing a network error or similar failure.

This property is only available when using the Fetch-based backend (via `withFetch()`).
When using Angular's (XHR) backend, this value will be `undefined`.

## HttpResponseBase.constructor

```ts
constructor( init:
```

Super-constructor for all responses.

The single parameter accepted is an initialization hash. Any properties
of the response passed there will override the default values.

## HttpHeaderResponse

```ts
export class HttpHeaderResponse extends HttpResponseBase
```

A partial HTTP response which only includes the status and header data,
but no response body.

`HttpHeaderResponse` is a `HttpEvent` available on the response
event stream, only when progress events are requested.

@see [Receiving raw progress events](guide/http/making-requests#receiving-raw-progress-events)

@publicApi

## HttpHeaderResponse.constructor

```ts
constructor( init:
```

Create a new `HttpHeaderResponse` with the given parameters.

## HttpHeaderResponse.clone

```ts
clone( update:
```

Copy this `HttpHeaderResponse`, overriding its contents with the
given parameter hash.

## HttpResponse

```ts
export class HttpResponse<T> extends HttpResponseBase
```

A full HTTP response, including a typed response body (which may be `null`
if one was not returned).

`HttpResponse` is a `HttpEvent` available on the response event
stream.

@see [Interacting with the server response events](guide/http/making-requests#interacting-with-the-server-response-events)

@publicApi

## HttpResponse.body

```ts
readonly body: T | null
```

The response body, or `null` if one was not returned.

## HttpResponse.constructor

```ts
constructor( init:
```

Construct a new `HttpResponse`.

## HttpErrorResponse

```ts
export class HttpErrorResponse extends HttpResponseBase implements Error
```

A response that represents an error or failure, either from a
non-successful HTTP status, an error while executing the request,
or some other failure which occurred during the parsing of the response.

Any error returned on the `Observable` response stream will be
wrapped in an `HttpErrorResponse` to provide additional context about
the state of the HTTP layer when the error occurred. The error property
will contain either a wrapped Error object or the error response returned
from the server.

@see [Handling request failure](guide/http/making-requests#handling-request-failure)

@publicApi

## HttpErrorResponse.ok

```ts
override readonly ok = false
```

Errors are never okay, even when the status code is in the 2xx success range.

## HttpStatusCode

```ts
export enum HttpStatusCode
```

Http status codes.
As per https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
@publicApi