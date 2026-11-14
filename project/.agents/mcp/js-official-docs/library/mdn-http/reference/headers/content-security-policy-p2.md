---
title: "Content-Security-Policy (CSP) header (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/content-security-policy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content-Security-Policy (CSP) header (part 2 of 2)

## Fetch directive syntax

All fetch directives may be specified as one of the following:

- the single value `'none'`, indicating that the specific resource type should be completely blocked
- one or more _source expression_ values, indicating valid sources for that resource type.

Each source expression takes one of the forms listed below. Note that not all forms are applicable to all fetch directives: see the documentation for each fetch directive to find out which forms are applicable to it.

The `<host-source>` and `<scheme-source>` formats must be unquoted, and all other formats must be enclosed in single quotes.

### 'nonce-\<nonce_value>'

This value consists of the string `nonce-` followed by a nonce value. The nonce value may use any of the characters from Base64 or URL-safe Base64.

This string is a random value that the server generates for every HTTP response. For example:

```plain
'nonce-416d1177-4d12-4e3b-b7c9-f6c409789fb8'
```

The server can then include the same value as the value of the `nonce` attribute of any `<script>` or `<style>` resources that they intend to load from the document.

The browser compares the value from the CSP directive against the value in the element attribute, and loads the resource only if they match.

If a directive contains a nonce and `unsafe-inline`, then the browser ignores `unsafe-inline`.

See Nonces in the CSP guide for more usage information.

> **Note:**
> Nonce source expressions are only applicable to `<script>` and `<style>` elements.

### '\<hash_algorithm>-<hash_value>'

This value consists of a string identifying a hash algorithm, followed by `-`, followed by a hash value. The hash value may use any of the characters from Base64 or URL-safe Base64.

- The hash algorithm identifier must be one of `sha256`, `sha384`, or `sha512`.
- The hash value is the base64-encoded hash of a `<script>` or `<style>` resource, calculated using one of the following hash functions: SHA-256, SHA-384, or SHA-512.

For example:

```plain
'sha256-cd9827ad...'
```

When the browser receives the document, it hashes the contents of any `<script>` and `<style>` elements, compares the result with any hashes in the CSP directive, and loads the resource only if there is a match.

If the element loads an external resource (for example, using the `src` attribute), then the element must also have the `integrity` attribute set.

If a directive contains a hash and `unsafe-inline`, then the browser ignores `unsafe-inline`.

See Hashes in the CSP guide for more usage information.

> **Note:**
> Hash source expressions are only applicable to `<script>` and `<style>` elements.

### \<host-source>

The URL or IP address of a host that is a valid source for the resource.

The scheme, port number, and path are optional.

If the scheme is omitted, the scheme of the document's origin is used.

When matching schemes, secure upgrades are allowed. For example:

- `http://example.com` will also permit resources from `https://example.com`
- `ws://example.org` will also permit resources from `wss://example.org`.

Wildcards (`'*'`) can be used for subdomains, host address, and port number, indicating that all legal values of each are valid. For example:

- `http://*.example.com` permits resources from any subdomain of `example.com`, over HTTP or HTTPS.

Paths that end in `/` match any path they are a prefix of. For example:

- `example.com/api/` will permit resources from `example.com/api/users/new`.

Paths that do not end in `/` are matched exactly. For example:

- `https://example.com/file.js` permits resources from `https://example.com/file.js` but not `https://example.com/file.js/file2.js`.

### \<scheme-source>

A scheme, such as `https:`. The colon is required.

Secure upgrades are allowed, so:

- `http:` will also permit resources loaded using HTTPS
- `ws:` will also permit resources loaded using WSS.

### 'self'

Resources of the given type may only be loaded from the same origin as the document.

Secure upgrades are allowed. For example:

- If the document is served from `http://example.com`, then a CSP of `'self'` will also permit resources from `https://example.com`.
- If the document is served from `ws://example.org`, then a CSP of `'self'` will also permit resources from `wss://example.org`.

### 'trusted-types-eval'

By default, if a CSP contains a `default-src` or a `script-src` directive, then JavaScript functions which evaluate their arguments as JavaScript are disabled.
This includes `eval()`, the `code` argument to `setTimeout()`, or the `Function()` constructor.

The `trusted-types-eval` keyword can be used to undo this protection, but only when Trusted Types are enforced and passed to these functions instead of strings.
This allows dynamic evaluation of strings as JavaScript, but only after inputs have been passed through a transformation function before it is injected, which has the chance to sanitize the input to remove potentially dangerous markup.

The `trusted-types-eval` must be used instead of `'unsafe-eval'` when using these methods with trusted types.
This ensures that access to the methods is blocked on browsers that don't support trusted types.

> **Note:**
> Developers should avoid using `trusted-types-eval` or these methods unless absolutely necessary.
> Trusted types ensure that the input passes through a transformation function — they don't ensure that the transformation makes the input safe (and this can be very hard to get right).

See `eval()` and similar APIs in the CSP guide for more usage information.

### 'unsafe-eval'

By default, if a CSP contains a `default-src` or a `script-src` directive, then JavaScript functions which evaluate their arguments as JavaScript are disabled.
This includes `eval()`, the `code` argument to `setTimeout()`, or the `Function()` constructor.

The `unsafe-eval` keyword can be used to undo this protection, allowing dynamic evaluation of strings as JavaScript.

> **Warning:**
> Developers should avoid `'unsafe-eval'`, because it defeats much of the purpose of having a CSP.
> 'trusted-types-eval' provides a "potentially" safer alternative if using these methods is necessary.

See `eval()` and similar APIs in the CSP guide for more usage information.

### 'wasm-unsafe-eval'

By default, if a CSP contains a `default-src` or a `script-src` directive, then a page won't be allowed to compile WebAssembly using functions like `WebAssembly.compileStreaming()`.

The `wasm-unsafe-eval` keyword can be used to undo this protection. This is a much safer alternative to `'unsafe-eval'`, since it does not enable general evaluation of JavaScript.

### 'unsafe-inline'

By default, if a CSP contains a `default-src` or a `script-src` directive, then inline JavaScript is not allowed to execute. This includes:

- inline `<script>` tags
- inline event handler attributes
- `javascript:` URLs.

Similarly, if a CSP contains `default-src` or a `style-src` directive, then inline CSS will not be loaded, including:

- inline `<style>` tags
- `style` attributes.

The `unsafe-inline` keyword can be used to undo this protection, allowing all these forms to be loaded.

> **Warning:**
> Developers should avoid `'unsafe-inline'`, because it defeats much of the purpose of having a CSP.

See Inline JavaScript in the CSP guide for more usage information.

### 'unsafe-hashes'

By default, if a CSP contains a `default-src` or a `script-src` directive, then inline event handler attributes like `onclick` and inline `style` attributes are not allowed to execute.

The `'unsafe-hashes'` expression allows the browser to use hash expressions for inline event handlers and `style` attributes. For example, a CSP might contain a directive like this:

```http
script-src 'unsafe-hashes' 'sha256-cd9827ad...'
```

If the hash value matches the hash of an inline event handler attribute value or of a `style` attribute value, then the code will be allowed to execute.

> **Warning:**
> The `'unsafe-hashes'` value is unsafe.
>
> In particular, it enables an attack in which the content of the inline event handler attribute is injected into the document as an inline `<script>` element. Suppose the inline event handler is:
>
> ```html
> Transfer all my money
> ```
>
> If an attacker can inject an inline `<script>` element containing this code, the CSP will allow it to execute automatically.
>
> However, `'unsafe-hashes'` is much safer than `'unsafe-inline'`.

### 'inline-speculation-rules'

By default, if a CSP contains a `default-src` or a `script-src` directive, then inline JavaScript is not allowed to execute. The `'inline-speculation-rules'` allows the browser to load inline `<script>` elements that have a `type` attribute of `speculationrules`.

See the Speculation Rules API for more information.

### 'strict-dynamic'

The `'strict-dynamic'` keyword makes the trust conferred on a script by a nonce or a hash extend to scripts that this script dynamically loads, for example by creating new `<script>` tags using `Document.createElement()` and then inserting them into the document using `Node.appendChild()`.

If this keyword is present in a directive, then the following source expression values are all ignored:

- \<host-source>
- \<scheme-source>
- `'self'`
- `'unsafe-inline'`

See The `strict-dynamic` keyword in the CSP guide for more usage information.

### 'report-sample'

If this expression is included in a directive controlling scripts or styles, and the directive causes the browser to block any inline scripts, inline styles, or event handler attributes, then the violation report that the browser generates will contain a `sample` property containing the first 40 characters of the blocked resource.

## CSP in workers

Workers are in general _not_ governed
by the content security policy of the document (or parent worker) that created them. To
specify a content security policy for the worker, set a
`Content-Security-Policy` response header for the request which requested the
worker script itself.

The exception to this is if the worker script's origin is a globally unique identifier
(for example, if its URL has a scheme of data or blob). In this case, the worker does
inherit the content security policy of the document or worker that created it.

## Multiple content security policies

The CSP mechanism allows multiple policies being specified for a resource, including
via the `Content-Security-Policy` header, the
`Content-Security-Policy-Report-Only` header and a
`<meta>` element.

You can use the `Content-Security-Policy` header more than once, as in the
example below. Pay special attention to the  directive here. Even
though the second policy would allow the connection, the first policy contains
`connect-src 'none'`. Adding additional policies _can only further
restrict_ the capabilities of the protected resource, which means that there will
be no connection allowed and, as the strictest policy, `connect-src 'none'`
is enforced.

```http
Content-Security-Policy: default-src 'self' http://example.com;
                          connect-src 'none';
Content-Security-Policy: connect-src http://example.com/;
                          script-src http://example.com/
```

## Examples

### Disable unsafe inline code and only allow HTTPS resources

This HTTP header sets the default policy to only allow resource loading (images, fonts, scripts, etc.) over HTTPS.
Because the `unsafe-inline` and `unsafe-eval` directives are not set, inline scripts will be blocked.

```http
Content-Security-Policy: default-src https:
```

The same restrictions can be applied using the HTML `<meta>` element.

```html
<meta http-equiv="Content-Security-Policy" content="default-src https:" />
```

### Allow inline code and HTTPS resources, but disable plugins

This policy could be used on a pre-existing site that uses too much inline code to fix, to ensure resources are loaded only over HTTPS and disable plugins:

```http
Content-Security-Policy: default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'
```

### Report but don't enforce violations when testing

This example sets the same restrictions as the previous example, but using the `Content-Security-Policy-Report-Only` header and the  directive.
This approach is used during testing to report violations but not block code from executing.

Endpoints (URLs) to send reports to are defined using the `Reporting-Endpoints` HTTP response header.

```http
Reporting-Endpoints: csp-endpoint="https://example.com/csp-reports"
```

A particular endpoint is then selected as the report target in the CSP policy using the  directive.

```http
Content-Security-Policy-Report-Only: default-src https:; report-uri /csp-violation-report-url/; report-to csp-endpoint
```

Note that the  (deprecated) directive is also specified above because `report-to` is not yet broadly supported by browsers.

See Content Security Policy (CSP) implementation for more examples.

## See also

- `Content-Security-Policy-Report-Only`
- CSP  directive
- `Reporting-Endpoints`
- `CSPViolationReport`
- Reporting API.
- Learn about: Content Security Policy
- Content Security in WebExtensions
- Adopting a strict policy
- CSP Evaluator - Evaluate your
  Content Security Policy
