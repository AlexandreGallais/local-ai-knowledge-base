# core/src/application/platform_tokens

## REQUEST

```ts
export const REQUEST = new InjectionToken<Request | null>( typeof ngDevMode === 'undefined' || ngDevMode ? 'REQUEST' : '',
```

Injection token representing the current HTTP request object.

Use this token to access the current request when handling server-side
rendering (SSR).

@remarks
This token may be `null` in the following scenarios:

* During the build processes.
* When the application is rendered in the browser (client-side rendering).
* When performing static site generation (SSG).
* During route extraction in development (at the time of the request).

@see {@link https://developer.mozilla.org/en-US/docs/Web/API/Request `Request` on MDN}

@see [Accessing Request and Response via DI](guide/ssr#accessing-request-and-response-via-di)

@publicApi

## ResponseInit

```ts
export type ResponseInit
```

Type that represents the initialization options for a response.

@publicApi

## RESPONSE_INIT

```ts
export const RESPONSE_INIT = new InjectionToken<ResponseInit | null>( typeof ngDevMode === 'undefined' || ngDevMode ? 'RESPONSE_INIT' : '',
```

Injection token for response initialization options.

Use this token to provide response options for configuring or initializing
HTTP responses in server-side rendering or API endpoints.

@remarks
This token may be `null` in the following scenarios:

* During the build processes.
* When the application is rendered in the browser (client-side rendering).
* When performing static site generation (SSG).
* During route extraction in development (at the time of the request).

@see {@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response `ResponseInit` on MDN}

@publicApi
@see [Accessing Request and Response via DI](guide/ssr#accessing-request-and-response-via-di)

## REQUEST_CONTEXT

```ts
export const REQUEST_CONTEXT = new InjectionToken<unknown>( typeof ngDevMode === 'undefined' || ngDevMode ? 'REQUEST_CONTEXT' : '',
```

Injection token for additional request context.

Use this token to pass custom metadata or context related to the current request in server-side rendering.

@remarks
This token is only available during server-side rendering and will be `null` in other contexts.

@publicApi
@see [Accessing Request and Response via DI](guide/ssr#accessing-request-and-response-via-di)