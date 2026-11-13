---
title: "Security (part 4 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/security.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Security (part 4 of 4)

## HTTP-level vulnerabilities

Angular has built-in support to help prevent two common HTTP vulnerabilities, cross-site request forgery \(CSRF or XSRF\) and cross-site script inclusion \(XSSI\).
Both of these must be mitigated primarily on the server side, but Angular provides helpers to make integration on the client side easier.

### Cross-site request forgery

In a cross-site request forgery \(CSRF or XSRF\), an attacker tricks the user into visiting a different web page \(such as `evil.com`\) with malignant code. This web page secretly sends a malicious request to the application's web server \(such as `example-bank.com`\).

Assume the user is logged into the application at `example-bank.com`.
The user opens an email and clicks a link to `evil.com`, which opens in a new tab.

The `evil.com` page immediately sends a malicious request to `example-bank.com`.
Perhaps it's a request to transfer money from the user's account to the attacker's account.
The browser automatically sends the `example-bank.com` cookies, including the authentication cookie, with this request.

If the `example-bank.com` server lacks XSRF protection, it can't tell the difference between a legitimate request from the application and the forged request from `evil.com`.

To prevent this, the application must ensure that a user request originates from the real application, not from a different site.
The server and client must cooperate to thwart this attack.

In a common anti-XSRF technique, the application server sends a randomly created authentication token in a cookie.
The client code reads the cookie and adds a custom request header with the token in all following requests.
The server compares the received cookie value to the request header value and rejects the request if the values are missing or don't match.

This technique is effective because all browsers implement the _same origin policy_.
Only code from the website on which cookies are set can read the cookies from that site and set custom headers on requests to that site.
That means only your application can read this cookie token and set the custom header.
The malicious code on `evil.com` can't.

### `HttpClient` XSRF/CSRF security

`HttpClient` supports a common mechanism used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`. Because only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.

By default, an interceptor sends this header on all mutating requests (such as `POST`) to relative and same origin URLs, but not on `GET` or `HEAD` requests.

**Why not protect GET requests?**
CSRF protection is only needed for requests that can change state on the backend. By their nature, CSRF attacks cross domain boundaries, and the web's same-origin policy will prevent an attacking page from retrieving the results of authenticated `GET` requests.

To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens. Set the token to a digest of your site's authentication cookie with a salt for added security.

To prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

**HttpClient supports only the client half of the XSRF protection scheme**
  Your backend service must be configured to set the cookie for your page, and to verify that the header is present on all eligible requests. Failing to do so renders Angular's default protection ineffective.

### Configure custom cookie/header names

If your backend service uses different names for the XSRF token <example-value> or header, use `withXsrfConfiguration` to override the defaults.

Add it to the `provideHttpClient` call as follows:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'CUSTOM_XSRF_TOKEN',
        headerName: 'X-Custom-Xsrf-Header',
      }),
    ),
  ],
};
```

### Disabling XSRF protection

If the built-in XSRF protection mechanism doesn't work for your application, you can disable it using the `withNoXsrfProtection` feature:

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withNoXsrfProtection())],
};
```

For information about CSRF at the Open Web Application Security Project \(OWASP\), see Cross-Site Request Forgery (CSRF) and Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet.
The Stanford University paper Robust Defenses for Cross-Site Request Forgery is a rich source of detail.

See also Dave Smith's talk on XSRF at AngularConnect 2016.

### Cross-site script inclusion (XSSI)

Cross-site script inclusion, also known as JSON vulnerability, can allow an attacker's website to read data from a JSON API.
The attack works on older browsers by overriding built-in JavaScript object constructors, and then including an API URL using a `<script>` tag.

This attack is only successful if the returned JSON is executable as JavaScript.
Servers can prevent an attack by prefixing all JSON responses to make them non-executable, by convention, using the well-known string `")]}',\n"`.

Angular's `HttpClient` library recognizes this convention and automatically strips the string `")]}',\n"` from all responses before further parsing.

For more information, see the XSSI section of this Google web security blog post.

## Preventing Server-Side Request Forgery (SSRF)

Angular includes strict validation for `Host`, `Forwarded`, `X-Forwarded-Host`, `X-Forwarded-Proto`, `X-Forwarded-Prefix`, and `X-Forwarded-Port` headers in the request handling pipeline to prevent header-based Server-Side Request Forgery (SSRF).

The validation rules are:

- `Host`, `X-Forwarded-Host`, and the `host` parameter of the `Forwarded` header are validated against a strict allowlist and cannot contain path separators.
- `X-Forwarded-Port` header must be numeric.
- `X-Forwarded-Proto` header and the `proto` parameter of the `Forwarded` header must be `http` or `https`.
- `X-Forwarded-Prefix` header must start with `/` and contain only alphanumeric characters, hyphens, and underscores, separated by single slashes.
- By default, the `Forwarded` header and all `X-Forwarded-*` headers are treated as untrusted and are removed from the request. To retain them, they must be explicitly allowed by configuring `trustProxyHeaders`.

Invalid headers trigger an error log, and unallowed proxy headers are removed from the request. Requests with unrecognized hostnames will result in a `400 Bad Request`.

NOTE: Most cloud providers and CDN providers perform automatic validation of these headers before a request ever reaches the application origin. This inherent filtering significantly reduces the practical attack surface.

### Configuring allowed hosts

To allow specific hostnames, you need to add them to the allowlist. This is critical for ensuring your application works correctly and securely when deployed. The patterns support wildcards for flexible hostname matching.

You can configure the `allowedHosts` option in your `angular.json`:

```json
{
  // ...
  "projects": {
    "your-project-name": {
      // ...
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "security": {
              "allowedHosts": [
                "example.com",
                "*.example.com" // allows all subdomains of example.com
              ]
            }
            // ... other options
          }
        }
      }
    }
  }
}
```

You can also configure `allowedHosts` when initializing the application engine:

```typescript
const appEngine = new AngularAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});

const nodeAppEngine = new AngularNodeAppEngine({
  allowedHosts: ['example.com', '*.trusted-example.com'],
});
```

For the Node.js variant `AngularNodeAppEngine`, you can also provide `NG_ALLOWED_HOSTS` (comma-separated list) environment variable for authorizing hosts.

```bash
export NG_ALLOWED_HOSTS="example.com,*.trusted-example.com"
```

IMPORTANT: You can use `*` as a value in `allowedHosts` to allow all hostnames, though this is generally discouraged and presents a security risk. Accepting any host header can expose your application to host header injection and Server-Side Request Forgery (SSRF) attacks. This configuration should only be used when validation for `Host` and `X-Forwarded-Host` headers is performed in another layer, such as a load balancer or reverse proxy. For better security, we recommend using an explicit list of allowed hosts whenever possible. See GHSA-x288-3778-4hhx for more details.

### Configuring trusted proxy headers

By default, Angular ignores the standard `Forwarded` header and all `X-Forwarded-*` headers. If your application is behind a trusted reverse proxy (like a load balancer) that sets these headers, you can configure Angular to trust them.

If the `Forwarded` header is trusted, its `host` and `proto` parameters are extracted and take precedence over the corresponding `x-forwarded-host` and `x-forwarded-proto` headers.

You can configure `trustProxyHeaders` when initializing the application engine:

```typescript
const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['forwarded'], // Trust the standard Forwarded header
});

const appEngine = new AngularAppEngine({
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto'], // Trust non-standard headers
});

const nodeAppEngine = new AngularNodeAppEngine({
  trustProxyHeaders: true, // Trust standard Forwarded and all X-Forwarded-* headers
});
```

For the Node.js variant `AngularNodeAppEngine`, you can also provide the `NG_TRUST_PROXY_HEADERS` environment variable (with a comma-separated list of headers as a value) to allow the usage of these headers.

```bash
export NG_TRUST_PROXY_HEADERS="X-FORWARDED-HOST,X-FORWARDED-PREFIX"
```

IMPORTANT: Only enable `trustProxyHeaders` if your application is behind a trusted proxy that strictly validates or overrides these headers. Otherwise, attackers can spoof these headers to cause Server-Side Request Forgery (SSRF) attacks.

## Auditing Angular applications

Angular applications must follow the same security principles as regular web applications, and must be audited as such.
Angular-specific APIs that should be audited in a security review, such as the _bypassSecurityTrust_ methods, are marked in the documentation as security sensitive.
