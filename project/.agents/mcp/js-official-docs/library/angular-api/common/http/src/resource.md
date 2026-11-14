# common/http/src/resource

## HttpResourceFn

```ts
export interface HttpResourceFn
```

Type for the `httpRequest` top-level function, which includes the call signatures for the JSON-
based `httpRequest` as well as sub-functions for `ArrayBuffer`, `Blob`, and `string` type
requests.

@publicApi 22.0

## HttpResourceFn.arrayBuffer

```ts
arrayBuffer:
```

Create a `Resource` that fetches data with the configured HTTP request.

The resource will update when the URL or request changes via signals.

Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
of the `HttpClient` API. Data is parsed into an `ArrayBuffer`.

@publicApi 22.0

## HttpResourceFn.blob

```ts
blob:
```

Create a `Resource` that fetches data with the configured HTTP request.

The resource will update when the URL or request changes via signals.

Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
of the `HttpClient` API. Data is parsed into a `Blob`.

@publicApi 22.0

## HttpResourceFn.text

```ts
text:
```

Create a `Resource` that fetches data with the configured HTTP request.

The resource will update when the URL or request changes via signals.

Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
of the `HttpClient` API. Data is parsed as a `string`.

@publicApi 22.0

## httpResource

```ts
export const httpResource: HttpResourceFn = /* @__PURE__ */ (()
```

`httpResource` makes a reactive HTTP request and exposes the request status and response value as
a `WritableResource`. By default, it assumes that the backend will return JSON data. To make a
request that expects a different kind of data, you can use a sub-constructor of `httpResource`,
such as `httpResource.text`.

@publicApi 22.0