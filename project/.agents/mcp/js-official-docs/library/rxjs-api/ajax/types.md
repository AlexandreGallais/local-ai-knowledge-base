# src/internal/ajax/types

## AjaxDirection

```ts
export type AjaxDirection = 'upload' | 'download'
```

Valid Ajax direction types. Prefixes the event `type` in the
{@link AjaxResponse} object with "upload_" for events related
to uploading and "download_" for events related to downloading.

## AjaxRequest

```ts
export interface AjaxRequest
```

The object containing values RxJS used to make the HTTP request.

This is provided in {@link AjaxError} instances as the `request`
object.

## AjaxRequest.url

```ts
url: string
```

The URL requested.

## AjaxRequest.body

```ts
body?: any
```

The body to send over the HTTP request.

## AjaxRequest.method

```ts
method: string
```

The HTTP method used to make the HTTP request.

## AjaxRequest.async

```ts
async: boolean
```

Whether or not the request was made asynchronously.

## AjaxRequest.headers

```ts
headers: Readonly<Record<string, any>>
```

The headers sent over the HTTP request.

## AjaxRequest.timeout

```ts
timeout: number
```

The timeout value used for the HTTP request.
Note: this is only honored if the request is asynchronous (`async` is `true`).

## AjaxRequest.user

```ts
user?: string
```

The user credentials user name sent with the HTTP request.

## AjaxRequest.password

```ts
password?: string
```

The user credentials password sent with the HTTP request.

## AjaxRequest.crossDomain

```ts
crossDomain: boolean
```

Whether or not the request was a CORS request.

## AjaxRequest.withCredentials

```ts
withCredentials: boolean
```

Whether or not a CORS request was sent with credentials.
If `false`, will also ignore cookies in the CORS response.

## AjaxRequest.responseType

```ts
responseType: XMLHttpRequestResponseType
```

The [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) set before sending the request.

## AjaxConfig

```ts
export interface AjaxConfig
```

Configuration for the {@link ajax} creation function.

## AjaxConfig.url

```ts
url: string
```

The address of the resource to request via HTTP.

## AjaxConfig.body

```ts
body?: any
```

The body of the HTTP request to send.

This is serialized, by default, based off of the value of the `"content-type"` header.
For example, if the `"content-type"` is `"application/json"`, the body will be serialized
as JSON. If the `"content-type"` is `"application/x-www-form-urlencoded"`, whatever object passed
to the body will be serialized as URL, using key-value pairs based off of the keys and values of the object.
In all other cases, the body will be passed directly.

## AjaxConfig.async

```ts
async?: boolean
```

Whether or not to send the request asynchronously. Defaults to `true`.
If set to `false`, this will block the thread until the AJAX request responds.

## AjaxConfig.method

```ts
method?: string
```

The HTTP Method to use for the request. Defaults to "GET".

## AjaxConfig.headers

```ts
headers?: Readonly<Record<string, any>>
```

The HTTP headers to apply.

Note that, by default, RxJS will add the following headers under certain conditions:

1. If the `"content-type"` header is **NOT** set, and the `body` is [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData),
   a `"content-type"` of `"application/x-www-form-urlencoded; charset=UTF-8"` will be set automatically.
2. If the `"x-requested-with"` header is **NOT** set, and the `crossDomain` configuration property is **NOT** explicitly set to `true`,
   (meaning it is not a CORS request), a `"x-requested-with"` header with a value of `"XMLHttpRequest"` will be set automatically.
   This header is generally meaningless, and is set by libraries and frameworks using `XMLHttpRequest` to make HTTP requests.

## AjaxConfig.timeout

```ts
timeout?: number
```

The time to wait before causing the underlying XMLHttpRequest to timeout. This is only honored if the
`async` configuration setting is unset or set to `true`. Defaults to `0`, which is idiomatic for "never timeout".

## AjaxConfig.user

```ts
user?: string
```

The user credentials user name to send with the HTTP request

## AjaxConfig.password

```ts
password?: string
```

The user credentials password to send with the HTTP request

## AjaxConfig.crossDomain

```ts
crossDomain?: boolean
```

Whether or not to send the HTTP request as a CORS request.
Defaults to `false`.

@deprecated Will be removed in version 8. Cross domain requests and what creates a cross
domain request, are dictated by the browser, and a boolean that forces it to be cross domain
does not make sense. If you need to force cross domain, make sure you're making a secure request,
then add a custom header to the request or use `withCredentials`. For more information on what
triggers a cross domain request, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Requests_with_credentials).
In particular, the section on [Simple Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests) is useful
for understanding when CORS will not be used.

## AjaxConfig.withCredentials

```ts
withCredentials?: boolean
```

To send user credentials in a CORS request, set to `true`. To exclude user credentials from
a CORS request, _OR_ when cookies are to be ignored by the CORS response, set to `false`.

Defaults to `false`.

## AjaxConfig.xsrfCookieName

```ts
xsrfCookieName?: string
```

The name of your site's XSRF cookie.

## AjaxConfig.xsrfHeaderName

```ts
xsrfHeaderName?: string
```

The name of a custom header that you can use to send your XSRF cookie.

## AjaxConfig.responseType

```ts
responseType?: XMLHttpRequestResponseType
```

Can be set to change the response type.
Valid values are `"arraybuffer"`, `"blob"`, `"document"`, `"json"`, and `"text"`.
Note that the type of `"document"` (such as an XML document) is ignored if the global context is
not `Window`.

Defaults to `"json"`.

## AjaxConfig.createXHR

```ts
createXHR?: ()
```

An optional factory used to create the XMLHttpRequest object used to make the AJAX request.
This is useful in environments that lack `XMLHttpRequest`, or in situations where you
wish to override the default `XMLHttpRequest` for some reason.

If not provided, the `XMLHttpRequest` in global scope will be used.

NOTE: This AJAX implementation relies on the built-in serialization and setting
of Content-Type headers that is provided by standards-compliant XMLHttpRequest implementations,
be sure any implementation you use meets that standard.

## AjaxConfig.progressSubscriber

```ts
progressSubscriber?: PartialObserver<ProgressEvent>
```

An observer for watching the upload progress of an HTTP request. Will
emit progress events, and completes on the final upload load event, will error for
any XHR error or timeout.

This will **not** error for errored status codes. Rather, it will always _complete_ when
the HTTP response comes back.

@deprecated If you're looking for progress events, use {@link includeDownloadProgress} and
{@link includeUploadProgress} instead. Will be removed in v8.

## AjaxConfig.includeDownloadProgress

```ts
includeDownloadProgress?: boolean
```

If `true`, will emit all download progress and load complete events as {@link AjaxResponse}
from the observable. The final download event will also be emitted as a {@link AjaxResponse}.

If both this and {@link includeUploadProgress} are `false`, then only the {@link AjaxResponse} will
be emitted from the resulting observable.

## AjaxConfig.includeUploadProgress

```ts
includeUploadProgress?: boolean
```

If `true`, will emit all upload progress and load complete events as {@link AjaxResponse}
from the observable. The final download event will also be emitted as a {@link AjaxResponse}.

If both this and {@link includeDownloadProgress} are `false`, then only the {@link AjaxResponse} will
be emitted from the resulting observable.

## AjaxConfig.queryParams

```ts
queryParams?: | string | URLSearchParams | Record<string, string | number | boolean | string[] | number[] | boolean[]> | [string, string | number | boolean | string[] | number[] | boolean[]][]
```

Query string parameters to add to the URL in the request.
<em>This will require a polyfill for `URL` and `URLSearchParams` in Internet Explorer!</em>

Accepts either a query string, a `URLSearchParams` object, a dictionary of key/value pairs, or an
array of key/value entry tuples. (Essentially, it takes anything that `new URLSearchParams` would normally take).

If, for some reason you have a query string in the `url` argument, this will append to the query string in the url,
but it will also overwrite the value of any keys that are an exact match. In other words, a url of `/test?a=1&b=2`,
with queryParams of `{ b: 5, c: 6 }` will result in a url of roughly `/test?a=1&b=5&c=6`.