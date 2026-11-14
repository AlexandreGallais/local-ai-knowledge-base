# common/http/testing/src/request

## TestRequest

```ts
export class TestRequest
```

A mock requests that was received and is ready to be answered.

This interface allows access to the underlying `HttpRequest`, and allows
responding with `HttpEvent`s or `HttpErrorResponse`s.

@publicApi

## TestRequest.cancelled

```ts
get cancelled(): boolean
```

Whether the request was cancelled after it was sent.

## TestRequest.flush

```ts
flush( body: | ArrayBuffer | Blob | boolean | string | number | Object | (boolean | string | number | Object | null)[] | null, opts:
```

Resolve the request by returning a body plus additional HTTP information (such as response
headers) if provided.
If the request specifies an expected body type, the body is converted into the requested type.
Otherwise, the body is converted to `JSON` by default.

Both successful and unsuccessful responses can be delivered via `flush()`.

## TestRequest.error

```ts
error(error: ErrorEvent, opts?: TestRequestErrorOptions): void
```

Resolve the request by returning an `ErrorEvent` (e.g. simulating a network failure).
@deprecated Http requests never emit an `ErrorEvent`. Please specify a `ProgressEvent`.

## TestRequest.error

```ts
error(error: ProgressEvent, opts?: TestRequestErrorOptions): void
```

Resolve the request by returning an `ProgressEvent` (e.g. simulating a network failure).

## TestRequest.event

```ts
event(event: HttpEvent<any>): void
```

Deliver an arbitrary `HttpEvent` (such as a progress event) on the response stream for this
request.