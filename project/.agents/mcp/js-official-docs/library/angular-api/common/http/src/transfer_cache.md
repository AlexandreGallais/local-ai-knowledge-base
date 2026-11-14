# common/http/src/transfer_cache

## HttpTransferCacheOptions

```ts
export interface HttpTransferCacheOptions
```

Options to configure how TransferCache should be used to cache requests made via HttpClient.

@see [Configuring the caching options](guide/ssr#configuring-the-caching-options)

@publicApi

## HttpTransferCacheOptions.filter

```ts
filter?: (req: HttpRequest<unknown>)
```

A function that receives a request as an argument and returns a boolean to indicate
whether a request should be included into the cache.

## HttpTransferCacheOptions.includeHeaders

```ts
includeHeaders?: string[]
```

Specifies which headers should be included into cached responses. No headers are included by default.

## HttpTransferCacheOptions.includePostRequests

```ts
includePostRequests?: boolean
```

Enables caching for `POST` requests. By default, only `GET` and `HEAD` requests are cached.
This option can be enabled if `POST` requests are used to retrieve data (for example using `GraphQL`).

## HttpTransferCacheOptions.includeRequestsWithAuthHeaders

```ts
includeRequestsWithAuthHeaders?: boolean
```

Enables caching of requests containing `Authorization`, `Proxy-Authorization`, or `Cookie` headers.
By default, these requests are excluded from caching.

## HttpTransferCacheOptions.includeRequestsWithCredentials

```ts
includeRequestsWithCredentials?: boolean
```

Enables caching of requests sent using `withCredentials` or Fetch API `credentials` modes (`include` or `same-origin`).
By default, these requests are excluded from caching.

## HttpTransferCacheOptions.includeNonCacheableRequests

```ts
includeNonCacheableRequests?: boolean
```

Enables caching of requests and responses with `Cache-Control` directives that forbid caching
(such as `no-cache`, `no-store`, or `private`), responses with a `Set-Cookie` header, or requests using Fetch API `no-cache` or `no-store` modes.
By default, these requests/responses are excluded from caching.

## HTTP_TRANSFER_CACHE_ORIGIN_MAP

```ts
export const HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken<Record<string, string>>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'HTTP_TRANSFER_CACHE_ORIGIN_MAP' : '', )
```

If your application uses different HTTP origins to make API calls (via `HttpClient`) on the server and
on the client, the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token allows you to establish a mapping
between those origins, so that `HttpTransferCache` feature can recognize those requests as the same
ones and reuse the data cached on the server during hydration on the client.

IMPORTANT: The `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token should *only* be provided in
the *server* code of your application (typically in the `app.server.config.ts` script). Angular throws an
error if it detects that the token is defined while running on the client.

@usageNotes

When the same API endpoint is accessed via `http://internal-domain.com:8080` on the server and
via `https://external-domain.com` on the client, you can use the following configuration:
```ts
// in app.server.config.ts
{
    provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
    useValue: {
        'http://internal-domain.com:8080': 'https://external-domain.com'
    }
}
```

@publicApi