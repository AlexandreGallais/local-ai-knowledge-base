# common/http/src/provider

## HttpFeatureKind

```ts
export enum HttpFeatureKind
```

Identifies a particular kind of `HttpFeature`.

@publicApi

## HttpFeature

```ts
export interface HttpFeature<KindT extends HttpFeatureKind>
```

A feature for use when configuring `provideHttpClient`.

@publicApi

## withInterceptors

```ts
export function withInterceptors( interceptorFns: HttpInterceptorFn[], ): HttpFeature<HttpFeatureKind.Interceptors>
```

Adds one or more functional-style HTTP interceptors to the configuration of the `HttpClient`
instance.

@see {@link HttpInterceptorFn}
@see {@link provideHttpClient}
@publicApi

## withRequestsMadeViaParent

```ts
export function withRequestsMadeViaParent(): HttpFeature<HttpFeatureKind.RequestsMadeViaParent>
```

Configures the current `HttpClient` instance to make requests via the parent injector's
`HttpClient` instead of directly.

By default, `provideHttpClient` configures `HttpClient` in its injector to be an independent
instance. For example, even if `HttpClient` is configured in the parent injector with
one or more interceptors, they will not intercept requests made via this instance.

With this option enabled, once the request has passed through the current injector's
interceptors, it will be delegated to the parent injector's `HttpClient` chain instead of
dispatched directly, and interceptors in the parent configuration will be applied to the request.

If there are several `HttpClient` instances in the injector hierarchy, it's possible for
`withRequestsMadeViaParent` to be used at multiple levels, which will cause the request to
"bubble up" until either reaching the root level or an `HttpClient` which was not configured with
this option.

This feature cannot be combined with `withFetch` or `withXhr` in the same
`provideHttpClient()` call.

@see [HTTP client setup](guide/http/setup#withrequestsmadeviaparent)
@see {@link provideHttpClient}
@publicApi 19.0

## withFetch

```ts
export function withFetch(): HttpFeature<HttpFeatureKind.Fetch>
```

Configures the current `HttpClient` instance to make requests using the fetch API.

Note: The Fetch API doesn't support progress report on uploads.

@see [Advanced fetch Options](guide/http/making-requests#advanced-fetch-options)

@publicApi
@deprecated `withFetch` is not required anymore. `FetchBackend` is the default `HttpBackend`.

## withXhr

```ts
export function withXhr(): HttpFeature<HttpFeatureKind.Xhr>
```

Configures the current `HttpClient` instance to make requests using the Xhr API.

Use this feature if you want to report progress on uploads as the Xhr API supports it.

<div class="docs-alert docs-alert-critical">

Do not use {@link withXhr} in server-side rendering (SSR) environments. XHR support on the
server is **deprecated** and is intended to be removed in Angular 23 because the underlying `xhr2`
library does not safely handle redirects (e.g. it can forward `Authorization` headers on
cross-origin redirects and is susceptible to denial-of-service via redirect loops).

</div>

@see {@link provideHttpClient}
@publicApi