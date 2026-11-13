---
title: "Security (part 3 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/security.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Security (part 3 of 4)

### Content security policy

Content Security Policy \(CSP\) is a defense-in-depth technique to prevent XSS.
To enable CSP, configure your web server to return an appropriate `Content-Security-Policy` HTTP header.
Read more about content security policy at the Web Fundamentals guide on the Google Developers website.

The minimal policy required for a brand-new Angular application is:

```txt
default-src 'self'; style-src 'self' 'nonce-randomNonceGoesHere'; script-src 'self' 'nonce-randomNonceGoesHere';
```

When serving your Angular application, the server should include a randomly-generated nonce in the HTTP header for each request.
You must provide this nonce to Angular so that the framework can render `<style>` elements.
You can set the nonce for Angular in one of the following ways:

1. Set the `ngCspNonce` attribute on the root application element as `<app ngCspNonce="randomNonceGoesHere"></app>`. Use this approach if you have access to server-side templating that can add the nonce both to the header and the `index.html` when constructing the response.
1. Provide the nonce using the `CSP_NONCE` injection token. Use this approach if you have access to the nonce at runtime and you want to be able to cache the `index.html`.

```ts
import {CSP_NONCE} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: CSP_NONCE,
      useValue: globalThis.myRandomNonceValue,
    },
  ],
});
```

**Unique nonces**

Always ensure that the nonces you provide are unique per request and that they are not predictable or guessable.
If an attacker can predict future nonces, they can circumvent the protections offered by CSP.

Generating a nonce at the origin server is generally discouraged when using a CDN, as responses are frequently cached. If the server generates a nonce and the CDN caches that HTML response, every subsequent visitor receives the same "unique" value, allowing an attacker to discover the static value and bypass CSP protections.

To maintain the "one-time-use" integrity of a nonce, it should ideally be generated at the Edge layer (e.g., CDN) just before the content is delivered to the user.

NOTE: If you want to inline the critical CSS of your application, you can not use the `CSP_NONCE` token, and should prefer the `security.autoCsp` option in the workspace configuration or set the `ngCspNonce` attribute on the root application element.

If you cannot generate nonces in your project, you can allow inline styles by adding `'unsafe-inline'` to the `style-src` section of the CSP header.

| Sections                                         | Details                                                                                                                                                                                                                                                                                                                                                  |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default-src 'self';`                            | Allows the page to load all its required resources from the same origin.                                                                                                                                                                                                                                                                                 |
| `style-src 'self' 'nonce-randomNonceGoesHere';`  | Allows the page to load global styles from the same origin \(`'self'`\) and styles inserted by Angular with the `nonce-randomNonceGoesHere`.                                                                                                                                                                                                             |
| `script-src 'self' 'nonce-randomNonceGoesHere';` | Allows the page to load JavaScript from the same origin \(`'self'`\) and scripts inserted by the Angular CLI with the `nonce-randomNonceGoesHere`. Required only when you enable critical CSS inlining or subresource integrity (which injects an import map to validate dynamically imported chunks), both of which add inline scripts to `index.html`. |

Angular itself requires only these settings to function correctly.
As your project grows, you may need to expand your CSP settings to accommodate extra features specific to your application.

#### Static hosting without per-response nonces

If your hosting environment or CDN can replace a placeholder token in cached HTML at the edge (for example, using SSI, ESI, or an edge function), you can build `index.html` with a placeholder in `ngCspNonce` (such as `<app ngCspNonce="__CSP_NONCE__"></app>`) and replace it with a unique nonce on each response.

If you deploy your application to a static host that serves `index.html` unchanged without edge transformation, do not hard-code a static nonce. Instead, use one of the following approaches:

##### Hash inline scripts with `autoCsp`

Set the `security.autoCsp` option to `true` in the workspace configuration.
At build time, the Angular CLI computes a hash of every inline script in `index.html`, including the scripts added by critical CSS inlining and subresource integrity.
The CLI replaces the `<script src>` elements with a hashed loader script and adds a `<meta>` tag at the start of `<head>`:

```txt
script-src 'strict-dynamic' 'sha256-...' https: 'unsafe-inline'; object-src 'none'; base-uri 'self';
```

Because hashes depend only on the content of the scripts, `index.html` remains valid for every visitor and can be cached.
Browsers that support hashes and `'strict-dynamic'` ignore the `https:` and `'unsafe-inline'` fallback sources.

The policy generated by `autoCsp` has the following limitations:

- It only covers scripts. You must configure `style-src` separately.
- Browsers ignore some directives, such as `frame-ancestors`, `report-uri`, and `sandbox`, when they appear in a `<meta>` tag. Send these directives in a `Content-Security-Policy` HTTP header.
- When a page has multiple policies, the browser enforces all of them. If you also send a CSP header, omit both `script-src` and `default-src` from the header so they do not block the hashed inline scripts.
- You cannot use `autoCsp` with server-side rendering.

##### Avoid inline scripts

The Angular CLI only adds inline scripts to `index.html` for critical CSS inlining and subresource integrity (which emits an import map to carry integrity metadata for dynamic module imports).
If you set `optimization.styles.inlineCritical` to `false` and leave `subresourceIntegrity` disabled, `index.html` does not contain inline scripts. You can then configure a `Content-Security-Policy` header with `script-src 'self'`.

NOTE: Disabling critical CSS inlining can slow down the initial render of your application, and disabling subresource integrity removes script integrity checks.

##### Configure styles for static hosting

Angular inserts `<style>` elements for component styles at runtime, and critical CSS inlining adds a `<style>` element to `index.html`.
Neither `autoCsp` nor disabling inline scripts covers these styles. Without a per-response nonce, allow them by adding `'unsafe-inline'` to `style-src`.
For example, if your build avoids inline scripts, configure your host to send the following header:

```txt
default-src 'self'; style-src 'self' 'unsafe-inline';
```

If you use `autoCsp`, send `style-src 'self' 'unsafe-inline'` in the HTTP header without `default-src` or `script-src`.

Your application code and third-party libraries might require additional directives in both cases.

### Enforcing Trusted Types

It is recommended that you use Trusted Types as a way to help secure your applications from cross-site scripting attacks.
Trusted Types is a web platform feature that can help you prevent cross-site scripting attacks by enforcing safer coding practices.
Trusted Types can also help simplify the auditing of application code.

**Trusted types**

Trusted Types might not yet be available in all browsers your application targets.
In the case your Trusted-Types-enabled application runs in a browser that doesn't support Trusted Types, the features of the application are preserved. Your application is guarded against XSS by way of Angular's DomSanitizer.
See caniuse.com/trusted-types for the current browser support.

To enforce Trusted Types for your application, you must configure your application's web server to emit HTTP headers with one of the following Angular policies:

| Policies                 | Detail                                                                                                                                                                                                                                                                                     |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `angular`                | This policy is used in security-reviewed code that is internal to Angular, and is required for Angular to function when Trusted Types are enforced. Any inline template values or content sanitized by Angular is treated as safe by this policy.                                          |
| `angular#bundler`        | This policy is used by the Angular CLI bundler when creating lazy chunk files.                                                                                                                                                                                                             |
| `angular#unsafe-bypass`  | This policy is used for applications that use any of the methods in Angular's DomSanitizer that bypass security, such as `bypassSecurityTrustHtml`. Any application that uses these methods must enable this policy.                                  |
| `angular#unsafe-jit`     | This policy is used by the Just-In-Time (JIT) compiler. You must enable this policy if your application interacts directly with the JIT compiler or is running in JIT mode using the platform browser dynamic. |
| `angular#unsafe-upgrade` | This policy is used by the @angular/upgrade package. You must enable this policy if your application is an AngularJS hybrid.                                                                                                                           |

You should configure the HTTP headers for Trusted Types in the following locations:

- Production serving infrastructure
- Angular CLI \(`ng serve`\), using the `headers` property in the `angular.json` file, for local development and end-to-end testing
- Karma \(`ng test`\), using the `customHeaders` property in the `karma.config.js` file, for unit testing

The following is an example of a header specifically configured for Trusted Types and Angular:

```html
Content-Security-Policy: trusted-types angular; require-trusted-types-for 'script';
```

An example of a header specifically configured for Trusted Types and Angular applications that use any of Angular's methods in DomSanitizer that bypasses security:

```html
Content-Security-Policy: trusted-types angular angular#unsafe-bypass; require-trusted-types-for
'script';
```

The following is an example of a header specifically configured for Trusted Types and Angular applications using JIT:

```html
Content-Security-Policy: trusted-types angular angular#unsafe-jit; require-trusted-types-for
'script';
```

The following is an example of a header specifically configured for Trusted Types and Angular applications that use lazy loading of modules:

```html
Content-Security-Policy: trusted-types angular angular#bundler; require-trusted-types-for 'script';
```

**Community contributions**

To learn more about troubleshooting Trusted Type configurations, the following resource might be helpful:

Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types

### Use the AOT template compiler

The AOT template compiler prevents a whole class of vulnerabilities called template injection, and greatly improves application performance.
The AOT template compiler is the default compiler used by Angular CLI applications, and you should use it in all production deployments.

An alternative to the AOT compiler is the JIT compiler which compiles templates to executable template code within the browser at runtime.
Angular trusts template code, so dynamically generating templates and compiling them, in particular templates containing user data, circumvents Angular's built-in protections. This is a security anti-pattern.
For information about dynamically constructing forms in a safe way, see the Dynamic Forms guide.

### Server-side XSS protection

HTML constructed on the server is vulnerable to injection attacks.
Injecting template code into an Angular application is the same as injecting executable code into the application:
It gives the attacker full control over the application.
To prevent this, use a templating language that automatically escapes values to prevent XSS vulnerabilities on the server.
Don't create Angular templates on the server side using a templating language. This carries a high risk of introducing template-injection vulnerabilities.
