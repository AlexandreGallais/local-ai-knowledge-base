---
title: "Server and hybrid rendering (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/ssr.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Server and hybrid rendering (part 2 of 3)

## Providing platform-specific implementations

When your application needs different behavior on the browser and server, provide separate service implementations for each platform. This approach centralizes platform logic in dedicated services.

```ts
export abstract class AnalyticsService {
  abstract trackEvent(name: string): void;
}
```

Create the browser implementation:

```ts
@Injectable()
export class BrowserAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // Sends the event to the browser-based third-party analytics provider
  }
}
```

Create the server implementation:

```ts
@Injectable()
export class ServerAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // Records the event on the server
  }
}
```

Register the browser implementation in your main application configuration:

```ts
export const appConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: BrowserAnalyticsService}],
};
```

Override with the server implementation in your server configuration:

```ts
const serverConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: ServerAnalyticsService}],
};
```

Inject and use the service in your components:

```ts
@Component(/* ... */)
export class Checkout {
  private analytics = inject(AnalyticsService);

  onAction() {
    this.analytics.trackEvent('action');
  }
}
```

## Accessing Document via DI

When working with server-side rendering, you should avoid directly referencing browser-specific globals like `document`. Instead, use the `DOCUMENT` token to access the document object in a platform-agnostic way.

```ts
import {inject, DOCUMENT, Service} from '@angular/core';

@Service()
export class CanonicalLinkService {
  private readonly document = inject(DOCUMENT);

  // During server rendering, inject a <link rel="canonical"> tag
  // so the generated HTML includes the correct canonical URL
  setCanonical(href: string): void {
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    this.document.head.appendChild(link);
  }
}
```

HELPFUL: For managing meta tags, Angular provides the `Meta` service.

## Accessing Request and Response via DI

The `@angular/core` package provides several tokens for interacting with the server-side rendering environment. These tokens give you access to crucial information and objects within your Angular application during SSR.

- **`REQUEST`:** Provides access to the current request object, which is of type `Request` from the Web API. This allows you to access headers, cookies, and other request information.
- **`RESPONSE_INIT`:** Provides access to the response initialization options, which is of type `ResponseInit` from the Web API. This allows you to set headers and the status code for the response dynamically. Use this token to set headers or status codes that need to be determined at runtime.
- **`REQUEST_CONTEXT`:** Provides access to additional context related to the current request. This context can be passed as the second parameter of the `handle` function. Typically, this is used to provide additional request-related information that is not part of the standard Web API.

```angular-ts
import {inject, REQUEST, Component} from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<h1>My Component</h1>`,
})
export class MyComponent {
  constructor() {
    const request = inject(REQUEST);
    console.log(request?.url);
  }
}
```

IMPORTANT: The above tokens will be `null` in the following scenarios:
  During the build processes.
  When the application is rendered in the browser (CSR).
  When performing static site generation (SSG).
  During route extraction in development (at the time of the request).

## Generate a fully static application

By default, Angular prerenders your entire application and generates a server file for handling requests. This allows your app to serve pre-rendered content to users. However, if you prefer a fully static site without a server, you can opt out of this behavior by setting the `outputMode` to `static` in your `angular.json` configuration file.

When `outputMode` is set to `static`, Angular generates pre-rendered HTML files for each route at build time, but it does not generate a server file or require a Node.js server to serve the app. This is useful for deploying to static hosting providers where a backend server is not needed.

To configure this, update your `angular.json` file as follows:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "outputMode": "static"
          }
        }
      }
    }
  }
}
```

## Caching data when using HttpClient

`HttpClient` caches outgoing network requests when running on the server. This information is serialized and transferred to the browser as part of the initial HTML sent from the server. In the browser, `HttpClient` checks whether it has data in the cache and if so, reuses it instead of making a new HTTP request during initial application rendering. `HttpClient` stops using the cache once an application becomes stable while running in a browser.

### Configuring the response body size limit

When `HttpClient` uses the default fetch backend during server-side rendering, Angular limits each response body to 1 MB. This limit prevents the server from buffering unexpectedly large responses during rendering. If a response exceeds the configured limit, the request fails with the NG02825 error.

If your application needs to fetch larger responses during server rendering, set `maxResponseBodySize` in the `provideServerRendering` options:

```ts
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {ApplicationConfig} from '@angular/core';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      {
        maxResponseBodySize: 5 * 1024 * 1024, // 5MB
      },
      withRoutes(serverRoutes),
    ),
  ],
};
```

`maxResponseBodySize` is configured in bytes and applies globally to server-side `HttpClient` requests that use the fetch backend.

IMPORTANT: Keep this limit as small as your application allows. Increasing it lets server-side requests buffer larger response bodies, which can increase memory use and denial-of-service risk. Prefer moving large downloads outside server rendering.

CRITICAL: During SSR, the Fetch implementation reads the entire response body to verify `integrity` before returning a response, as required by the Fetch Standard. Angular enforces `maxResponseBodySize` only after Fetch returns a response, so this limit does not constrain the data buffered during integrity verification.

### Configuring the caching options

You can customize how Angular caches HTTP responses during server‑side rendering (SSR) and reuses them during hydration by configuring `HttpTransferCacheOptions`.
This configuration is provided globally using `withHttpTransferCacheOptions` inside `provideClientHydration()`.

By default, `HttpClient` caches all `HEAD` and `GET` requests which don't contain `Authorization`, `Proxy-Authorization`, or `Cookie` headers and are not sent with `withCredentials` or Fetch API `credentials` modes that can send credentials. Angular also skips transfer cache when a request or response includes `Cache-Control` directives that forbid caching (`no-store`, `no-cache`, or `private`), or when the Fetch API `cache` option is set to `no-store` or `no-cache`. Responses that carry a `Set-Cookie` header are also skipped. You can override the request filtering settings by using `withHttpTransferCacheOptions` in the hydration configuration.

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeHeaders: ['ETag', 'Cache-Control'],
        filter: (req) => !req.url.includes('/api/profile'),
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false,
      }),
    ),
  ],
});
```

### `includeHeaders`

Specifies which headers from the server response should be included in cached entries.
No headers are included by default.

```ts
withHttpTransferCacheOptions({
  includeHeaders: ['ETag', 'Cache-Control'],
});
```

IMPORTANT: Avoid including sensitive headers like authentication tokens. These can leak user‑specific data between requests.

Including `Cache-Control` in `includeHeaders` only makes that header available on the hydrated response. Angular already evaluates `Cache-Control` headers automatically when deciding whether a request or response is eligible for transfer cache.

### `includePostRequests`

By default, only `GET` and `HEAD` requests are cached.
You can enable caching for `POST` requests when they are used as read operations such as GraphQL queries.

```ts
withHttpTransferCacheOptions({
  includePostRequests: true,
});
```

Use this only when `POST` requests are **idempotent** and safe to reuse between server and client renders.

### `includeRequestsWithAuthHeaders`

Determines whether requests containing `Authorization`, `Proxy‑Authorization`, or `Cookie` headers are eligible for caching.
By default, these are excluded to prevent caching user‑specific responses.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithAuthHeaders: true,
});
```

Enable only when authentication headers do **not** affect the response content (for example, public tokens for analytics APIs).

### `includeRequestsWithCredentials`

Determines whether requests sent using `withCredentials` or Fetch API `credentials` modes (`include` or `same-origin`) are eligible for caching.
By default, these are excluded to prevent caching user‑specific responses.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithCredentials: true,
});
```

Enable only when credentialed requests return responses that are safe to cache.

### `includeNonCacheableRequests`

Determines whether requests and responses containing `Cache-Control` directives that forbid caching (`no-store`, `no-cache`, or `private`), responses with a `Set-Cookie` header, or requests using Fetch API `cache` options (`no-store` or `no-cache`), are eligible for caching.
By default, these are excluded to respect HTTP caching controls.

```ts
withHttpTransferCacheOptions({
  includeNonCacheableRequests: true,
});
```

Enable only when you need to bypass cache-control restrictions for transfer caching.

### Per‑request overrides

You can override caching behavior for a specific request using the `transferCache` request option.

```ts
// Include specific headers for this request
http.get('/api/profile', {transferCache: {includeHeaders: ['CustomHeader']}});
```

### Disabling caching

You can disable HTTP caching of requests sent from the server either globally or individually.

#### Globally

To disable caching for all requests in your application, use the `withNoHttpTransferCache` feature:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration(withNoHttpTransferCache())],
});
```

#### Filtering

You can also selectively disable caching for certain requests using the `filter` option in `withHttpTransferCacheOptions`. For example, you can disable caching for a specific API endpoint:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (req) => !req.url.includes('/api/sensitive-data'),
      }),
    ),
  ],
});
```

Use this option to exclude endpoints with user‑specific or dynamic data (for example `/api/profile`).

#### Per-request

To disable caching for an individual request, you can specify the `transferCache` option in an `HttpRequest`.

```ts
httpClient.get('/api/sensitive-data', {transferCache: false});
```

`HttpTransferCache` does not cache requests or responses that explicitly opt out of caching. Angular skips transfer cache entries when a request includes a `Cache-Control` header with `no-store`, `no-cache`, or `private`, or when the request uses the Fetch API `cache` option set to `no-store` or `no-cache`. Responses with `Cache-Control: no-store`, `Cache-Control: no-cache`, or `Cache-Control: private` are also not stored in the transfer cache. Responses that include a `Set-Cookie` header are likewise not stored, as they typically carry user-specific state.

NOTE: If your application uses different HTTP origins to make API calls on the server and on the client, the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token allows you to establish a mapping between those origins, so that `HttpTransferCache` feature can recognize those requests as the same ones and reuse the data cached on the server during hydration on the client.

## Configuring a server

### Node.js

The `@angular/ssr/node` extends `@angular/ssr` specifically for Node.js environments. It provides APIs that make it easier to implement server-side rendering within your Node.js application. For a complete list of functions and usage examples, refer to the `@angular/ssr/node` API reference API reference.

```ts
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next(); // Pass control to the next middleware
      }
    })
    .catch(next);
});

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
```

### Non-Node.js

The `@angular/ssr` provides essential APIs for server-side rendering your Angular application on platforms other than Node.js. It leverages the standard `Request` and `Response` objects from the Web API, enabling you to integrate Angular SSR into various server environments. For detailed information and examples, refer to the `@angular/ssr` API reference.

```ts
import {AngularAppEngine, createRequestHandler} from '@angular/ssr';

const angularApp = new AngularAppEngine();

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res: Response | null = await angularApp.handle(req);

  // ...
});
```
