# common/http/src/xsrf

## HttpXsrfTokenExtractor

```ts
export abstract class HttpXsrfTokenExtractor
```

Retrieves the current XSRF token to use with the next outgoing request.

@publicApi

## HttpXsrfTokenExtractor.getToken

```ts
abstract getToken(): string | null
```

Get the XSRF token to use with an outgoing request.

Will be called for every request, so the token may change between requests.