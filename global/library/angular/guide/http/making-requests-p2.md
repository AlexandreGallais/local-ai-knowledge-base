---
title: "Making HTTP requests (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/http/making-requests.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Making HTTP requests (part 2 of 2)

## Advanced fetch options

Angular's `HttpClient` supports advanced fetch API options that can improve performance and user experience. These options are available when using the fetch backend, which is the default.

### Fetch options

The following options provide fine-grained control over request behavior when using the fetch backend.

#### Keep-alive connections

The `keepalive` option allows a request to outlive the page that initiated it. This is particularly useful for analytics or logging requests that need to complete even if the user navigates away from the page.

```ts
http
  .post('/api/analytics', analyticsData, {
    keepalive: true,
  })
  .subscribe();
```

#### HTTP caching control

The `cache` option controls how the request interacts with the browser's HTTP cache, which can significantly improve performance for repeated requests.

```ts
//  Use cached response regardless of freshness
http
  .get('/api/config', {
    cache: 'force-cache',
  })
  .subscribe((config) => {
    // ...
  });

// Always fetch from network, bypass cache
http
  .get('/api/live-data', {
    cache: 'no-cache',
  })
  .subscribe((data) => {
    // ...
  });

// Use cached response only, fail if not in cache
http
  .get('/api/static-data', {
    cache: 'only-if-cached',
  })
  .subscribe((data) => {
    // ...
  });
```

#### Request priority for Core Web Vitals

The `priority` option allows you to indicate the relative importance of a request, helping browsers optimize resource loading for better Core Web Vitals scores.

```ts
// High priority for critical resources
http
  .get('/api/user-profile', {
    priority: 'high',
  })
  .subscribe((profile) => {
    // ...
  });

// Low priority for non-critical resources
http
  .get('/api/recommendations', {
    priority: 'low',
  })
  .subscribe((recommendations) => {
    // ...
  });

// Auto priority (default) lets the browser decide
http
  .get('/api/settings', {
    priority: 'auto',
  })
  .subscribe((settings) => {
    // ...
  });
```

Available `priority` values:

- `'high'`: High priority, loaded early (e.g., critical user data, above-the-fold content)
- `'low'`: Low priority, loaded when resources are available (e.g., analytics, prefetch data)
- `'auto'`: Browser determines priority based on request context (default)

TIP: Use `priority: 'high'` for requests that affect Largest Contentful Paint (LCP) and `priority: 'low'` for requests that don't impact initial user experience.

#### Request mode

The `mode` option controls how the request handles cross-origin requests and determines the response type.

```ts
// Same-origin requests only
http
  .get('/api/local-data', {
    mode: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// CORS-enabled cross-origin requests
http
  .get('https://api.external.com/data', {
    mode: 'cors',
  })
  .subscribe((data) => {
    // ...
  });

// No-CORS mode for simple cross-origin requests
http
  .get('https://external-api.com/public-data', {
    mode: 'no-cors',
  })
  .subscribe((data) => {
    // ...
  });
```

Available `mode` values:

- `'same-origin'`: Only allow same-origin requests, fail for cross-origin requests
- `'cors'`: Allow cross-origin requests with CORS (default)
- `'no-cors'`: Allow simple cross-origin requests without CORS, response is opaque

TIP: In the browser, use `mode: 'same-origin'` for sensitive requests that should never go cross-origin.

IMPORTANT: During SSR on Node.js, `HttpClient` uses Node.js's Undici-based Fetch implementation. Undici does not enforce browser CORS checks, so `mode: 'same-origin'` does not restrict server-side requests. Validate user-influenced URLs against an allowlist.

#### Redirect handling

The `redirect` option specifies how to handle redirect responses from the server.

```ts
// Follow redirects automatically (default behavior)
http
  .get('/api/resource', {
    redirect: 'follow',
  })
  .subscribe((data) => {
    // ...
  });

// Prevent automatic redirects
http
  .get('/api/resource', {
    redirect: 'manual',
  })
  .subscribe((response) => {
    // Handle redirect manually
  });

// Treat redirects as errors
http
  .get('/api/resource', {
    redirect: 'error',
  })
  .subscribe({
    next: (data) => {
      // Success response
    },
    error: (err) => {
      // Redirect responses will trigger this error handler
    },
  });
```

Available `redirect` values:

- `'follow'`: Automatically follow redirects (default)
- `'error'`: Treat redirects as errors
- `'manual'`: Don't follow redirects automatically, return redirect response

TIP: Use `redirect: 'manual'` when you need to handle redirects with custom logic.

#### Credentials <example-value>

The `credentials` option controls whether cookies, authorization headers, and other credentials are sent with cross-origin requests. This is particularly important for authentication scenarios.

```ts
// Include credentials for cross-origin requests
http
  .get('https://api.example.com/protected-data', {
    credentials: 'include',
  })
  .subscribe((data) => {
    // ...
  });

// Never send credentials (default for cross-origin)
http
  .get('https://api.example.com/public-data', {
    credentials: 'omit',
  })
  .subscribe((data) => {
    // ...
  });

// Send credentials only for same-origin requests
http
  .get('/api/user-data', {
    credentials: 'same-origin',
  })
  .subscribe((data) => {
    // ...
  });

// withCredentials <example-value> credentials <example-value>
http
  .get('https://api.example.com/data', {
    credentials: 'omit', // This will be ignored
    withCredentials: true, // This forces credentials: 'include'
  })
  .subscribe((data) => {
    // Request will include credentials <example-value> credentials: 'omit'
  });

// Legacy approach (still supported)
http
  .get('https://api.example.com/data', {
    withCredentials: true,
  })
  .subscribe((data) => {
    // Equivalent to credentials: 'include'
  });
```

IMPORTANT: The `withCredentials` option takes precedence over the `credentials` option. If both are specified, `withCredentials: true` will always result in `credentials: 'include'`, regardless of the explicit `credentials` value.

Available `credentials` values:

- `'omit'`: Never send credentials
- `'same-origin'`: Send credentials only for same-origin requests (default)
- `'include'`: Always send credentials, even for cross-origin requests

TIP: Use `credentials: 'include'` when you need to send authentication cookies or headers to a different domain that supports CORS. Avoid mixing `credentials` and `withCredentials` options to prevent confusion.

IMPORTANT: During SSR on Node.js, `credentials: 'include'` does not automatically forward cookies from the incoming browser request. The `credentials` option does not remove `Cookie` or `Authorization` headers that you add explicitly. Undici permits some headers that browsers forbid, so only forward credential <example-value> to trusted origins.

#### Referrer

The `referrer` option allows you to control what referrer information is sent with the request. This is important for privacy and security considerations.

```ts
// Send a specific referrer URL
http
  .get('/api/data', {
    referrer: 'https://example.com/page',
  })
  .subscribe((data) => {
    // ...
  });

// Use the current page as referrer (default behavior)
http
  .get('/api/analytics', {
    referrer: 'about:client',
  })
  .subscribe((data) => {
    // ...
  });
```

The `referrer` option accepts:

- A valid URL string: Sets the specific referrer URL to send
- An empty string `''`: Sends no referrer information
- `'about:client'`: Uses the default referrer (current page URL)

TIP: Use `referrer: ''` for sensitive requests where you don't want to leak the referring page URL.

#### Referrer policy

The `referrerPolicy` option controls how much referrer information—the URL of the page making the request—is sent along with an HTTP request. This setting affects both privacy and analytics, allowing you to balance data visibility with security considerations.

```ts
// Send no referrer information regardless of the current page
http
  .get('/api/data', {
    referrerPolicy: 'no-referrer',
  })
  .subscribe();

// Send origin only (e.g. https://example.com)
http
  .get('/api/analytics', {
    referrerPolicy: 'origin',
  })
  .subscribe();
```

The `referrerPolicy` option accepts:

- `'no-referrer'` Never send the `Referer` header.
- `'no-referrer-when-downgrade'` Sends the referrer for same-origin and secure (HTTPS→HTTPS) requests, but omits it when navigating from a secure to a less secure origin (HTTPS→HTTP).
- `'origin'` Sends only the origin (scheme, host, port) of the referrer, omitting path and query information.
- `'origin-when-cross-origin'` Sends the full URL for same-origin requests, but only the origin for cross-origin requests.
- `'same-origin'` Sends the full URL for same-origin requests and no referrer for cross-origin requests.
- `'strict-origin'` Sends only the origin, and only if the protocol security level is not downgraded (e.g., HTTPS→HTTPS). Omits the referrer on downgrade.
- `'strict-origin-when-cross-origin'` Default browser behavior. Sends the full URL for same-origin requests, the origin for cross-origin requests when not downgraded, and omits the referrer on downgrade.
- `'unsafe-url'` Always sends the full URL (including path and query). This can expose sensitive data and should be used with caution.

TIP: Prefer conservative values such as `'no-referrer'`, `'origin'`, or `'strict-origin-when-cross-origin'` for privacy-sensitive requests.

#### Integrity

The `integrity` option allows you to verify that the response hasn't been tampered with by providing a cryptographic hash of the expected content. This is particularly useful for loading scripts or other resources from CDNs.

```ts
// Verify response integrity with SHA-256 hash
http
  .get('/api/script.js', {
    integrity: 'sha256-ABC123...',
    responseType: 'text',
  })
  .subscribe((script) => {
    // Script content is verified against the hash
  });
```

IMPORTANT: The `integrity` option requires an exact match between the response content and the provided hash. If the content doesn't match, the request will fail with a network error.

CRITICAL: During SSR, the Fetch implementation reads the entire response body to verify `integrity` before returning a response, as required by the Fetch Standard. Angular enforces `maxResponseBodySize` only after Fetch returns a response, so this limit does not constrain the data buffered during integrity verification.

TIP: Use subresource integrity when loading critical resources from external sources to ensure they haven't been modified. Generate hashes using tools like `openssl`.

## HTTP `Observable`s

Each request method on `HttpClient` constructs and returns an `Observable` of the requested response type. Understanding how these `Observable`s work is important when using `HttpClient`.

`HttpClient` produces what RxJS calls "cold" `Observable`s, meaning that no actual request happens until the `Observable` is subscribed. Only then is the request actually dispatched to the server. Subscribing to the same `Observable` multiple times will trigger multiple backend requests. Each subscription is independent.

TIP: You can think of `HttpClient` `Observable`s as _blueprints_ for actual server requests.

Once subscribed, unsubscribing will abort the in-progress request. This is very useful if the `Observable` is subscribed via the `async` pipe, as it will automatically cancel the request if the user navigates away from the current page. Additionally, if you use the `Observable` with an RxJS combinator like `switchMap`, this cancellation will clean up any stale requests.

Once the response returns, `Observable`s from `HttpClient` usually complete (although interceptors can influence this).

Because of the automatic completion, there is usually no risk of memory leaks if `HttpClient` subscriptions are not cleaned up. However, as with any async operation, we strongly recommend that you clean up subscriptions when the component using them is destroyed, as the subscription callback may otherwise run and encounter errors when it attempts to interact with the destroyed component.

TIP: Using the `async` pipe or the `toSignal` operation to subscribe to `Observable`s ensures that subscriptions are disposed properly.

## Best practices

While `HttpClient` can be injected and used directly from components, generally we recommend you create reusable, injectable services which isolate and encapsulate data access logic. For example, this `UserService` encapsulates the logic to request data for a user by their id:

```ts
@Service()
export class UserService {
  private http = inject(HttpClient);

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }
}
```

Within a component, you can combine `@if` with the `async` pipe to render the UI for the data only after it's finished loading:

```angular-ts
import {AsyncPipe} from '@angular/common';
import {Component, input, inject, effect} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  imports: [AsyncPipe],
  template: `
    @if (user$ | async; as user) {
      <p>Name: {{ user.name }}</p>
      <p>Biography: {{ user.biography }}</p>
    }
  `,
})
export class UserProfile {
  userId = input.required<string>();
  user$!: Observable<User>;

  private userService = inject(UserService);

  constructor() {
    effect(() => {
      this.user$ = this.userService.getUser(this.userId());
    });
  }
}
```
