---
title: "Content Security Policy (CSP) (part 2 of 4)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/csp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content Security Policy (CSP) (part 2 of 4)

## Controlling resource loading

A CSP can be used to control the resources that a document is allowed to load. This is primarily used for protection against cross-site scripting (XSS) attacks.

In this section we'll first see how controlling resource loads can help protect against XSS, then at the tools CSP provides to control what resources are loaded. Finally we'll describe one particular recommended strategy, which is called a "Strict CSP".

### XSS and resource loading

A cross-site scripting (XSS) attack is one in which an attacker is able to execute their code in the context of the target website. This code is then able to do anything that the website's own code could do, including, for example:

- access or modify the content of the site's loaded pages
- access or modify content in local storage
- make HTTP requests with the user's credentials, enabling them to impersonate the user or access sensitive data

An XSS attack is possible when a website accepts some input which might have been crafted by an attacker (for example, URL parameters, or a comment on a blog post) and then includes it in the page without _sanitizing_ it: that is, without ensuring that it can't be executed as JavaScript.

Websites should protect themselves against XSS by sanitizing this input before including it in the page.

> **Note:**
> A CSP can actually help protect against XSS in two different ways:
>
> - It can help ensure that input is sanitized before being used in the client: we discuss this later on in Requiring trusted types.
> - By controlling resource loads, a CSP can provide a defense in depth against XSS, protecting the website even if sanitization fails. This is the XSS defense that we will discuss in this section.

If sanitization fails, there are various forms the injected malicious code can take in the document, including:

- A `<script>` tag that links to a malicious source:

  ```html
  <script src="https://evil.example.com/hacker.js"></script>
  ```

- A `<script>` tag that includes inline JavaScript:

  ```html
  <script>
    console.log("You've been hacked!");
  </script>
  ```

- An inline event handler:

  ```html
  <img
    onmouseover="console.log(`You've been hacked!`)"
    src="thumbnail.jpg"
    alt="" />
  ```

- A `javascript:` URL:

  ```html
  <iframe src="javascript:console.log(`You've been hacked!`)"></iframe>
  ```

- A string argument to an unsafe API like `eval()`:

  ```js
  eval("console.log(`You've been hacked!`)");
  ```

By controlling resource loading, a CSP can provide protection against all of these. With a CSP, you can:

- define the permitted sources for JavaScript files and other resources, effectively blocking loads from `https://evil.example.com`
- disable inline script tags
- allow only script tags which have the correct nonce or hash set
- disable inline event handlers
- disable `javascript:` URLs
- disable dangerous APIs like `eval()`

In the next section we'll go over the tools CSP provides to do these things.

> **Note:**
> Setting a CSP is not an alternative to sanitizing input. Websites should sanitize input _and_ set a CSP, providing defense in depth against XSS.

### Fetch directives

Fetch directives are used to specify a particular category of resource that a document is allowed to load — such as JavaScript, CSS stylesheets, images, fonts, and so on.

There are different fetch directives for different types of resource. For example:

- `script-src` sets allowed sources for JavaScript.
- `style-src` sets allowed sources for CSS stylesheets.
- `img-src` sets allowed sources for images.

One special fetch directive is `default-src`, which sets a fallback policy for all resources whose directives are not explicitly listed.

For the complete set of fetch directives, see the reference documentation.

Each fetch directive is specified as either the single keyword `'none'` or one or more _source expressions_, separated by spaces. When more than one source expression is listed: if any of the methods allow the resource, then the resource is allowed.

For example, the CSP below sets two fetch directives:

- `default-src` is given the single source expression `'self'`
- `img-src` is given two source expressions: `'self'` and `example.com`

The effect of this is that:

- images must be either same-origin with the document, or loaded from `example.com`
- all other resources must be same-origin with the document.

In the next few sections we'll describe some of the ways you can use source expressions to control resource loads. Note that although we're describing them separately, these expressions can in general be combined: for example, a single fetch directive may include nonces as well as hostnames.

#### Blocking resources

To block a resource type entirely, use the `'none'` keyword. For example, the following directive blocks all `<object>` and `` resources:

```http
Content-Security-Policy: object-src 'none'
```

Note that `'none'` cannot be combined with any other method in a particular directive: in practice, if any other source expressions are given alongside `'none'`, then they are ignored.

#### Nonces

A `nonce` is the recommended approach for restricting the loading of `<script>` and `<style>` resources.

With a nonce, the server generates a random value for every HTTP response, and includes it in a `script-src` and/or a `style-src` directive:

```http
Content-Security-Policy:
  script-src 'nonce-416d1177-4d12-4e3b-b7c9-f6c409789fb8'
```

The server then includes this value as the value of the `nonce` attribute of all the `<script>` and/or `<style>` tags that they intend to include in the document.

The browser compares the two values, and loads the resource only if they match. The idea is that even if an attacker can insert some JavaScript into the page, they won't know which nonce the server is going to use, so the browser will refuse to run the script.

For this approach to work, it must not be possible for an attacker to guess the nonce.

**In practice this means that the nonce must be different for every HTTP response, and must not be predictable.**

This in turn means that the server cannot serve static HTML, because it must insert a new nonce each time. Typically the server would use a templating engine to insert the nonce.

Here's a snippet of Express code to demonstrate:

```js
function content(nonce) {
  return `
    <script nonce="${nonce}" src="/main.js"></script>
    <script nonce="${nonce}">console.log("hello!");</script>
    <h1>Hello world</h1> 
    `;
}

app.get("/", (req, res) => {
  const nonce = crypto.randomUUID();
  res.setHeader("Content-Security-Policy", `script-src 'nonce-${nonce}'`);
  res.send(content(nonce));
});
```

On every request, the server generates a new nonce, inserts it into the CSP and into the `<script>` tags in the returned document. Note that the server:

- generates a new nonce for every request
- can use nonces with both external and inline scripts
- uses the same nonce for all `<script>` tags in the document

It's important that the server uses some kind of templating to insert nonces, and does not just insert them into all `<script>` tags: otherwise, the server might inadvertently insert nonces into scripts that were injected by an attacker.

Note that nonces can only be used for elements that have a `nonce` attribute: that is, only `<script>` and `<style>` elements.

#### Hashes

Fetch directives can also use a hash of the script to guarantee its integrity. With this method, the server:

1. calculates a hash of the script contents using a hash function (one of SHA-256, SHA-384, or SHA-512)
2. creates a Base64 encoding of the result
3. appends a prefix identifying the hash algorithm used (one of `sha256-`, `sha384-`, or `sha512-`).

It then adds the result to the directive:

```http
Content-Security-Policy: script-src 'sha256-cd9827ad...'
```

When the browser receives the document, it hashes the script, compares the result with the value from the header, and loads the script only if they match.

External scripts must also include the `integrity` attribute for this method to work.

Here's a snippet of Express code, to demonstrate:

```js
const hash1 = "sha256-ex2O7MWOzfczthhKm6azheryNVoERSFrPrdvxRtP8DI=";
const hash2 = "sha256-H/eahVJiG1zBXPQyXX0V6oaxkfiBdmanvfG9eZWSuEc=";

const csp = `script-src '${hash1}' '${hash2}'`;
const content = `
  <script src="./main.js" integrity="${hash2}"></script>
  <script>console.log("hello!");</script>
    <h1>Hello world</h1> 
    `;

app.get("/", (req, res) => {
  res.setHeader("Content-Security-Policy", csp);
  res.send(content);
});
```

Note that:

- We have a separate hash for every script in the document.
- For the external script "main.js", we also include the `integrity` attribute, and give it the same value.
- Unlike the example using nonces, both the CSP and the content can be static, because the hashes stay the same. This makes hash-based policies more suitable for static pages or websites that rely on client-side rendering.

#### Scheme-based policies

Fetch directives can list a scheme, like `https:`, to allow resources that are served using that scheme. This, for example, allows a policy to require HTTPS for all resource loads:

```http
Content-Security-Policy: default-src https:
```

#### Location-based policies

Fetch directives can control resource loads based on where the resource is located.

The keyword `'self'` allows resources which are same-origin with the document itself:

```http
Content-Security-Policy: img-src 'self'
```

You can also specify one or more hostnames, potentially including wildcards, and only resources served from those hosts will be allowed. This might be used, for example, to allow content to be served from a trusted CDN.

```http
Content-Security-Policy: img-src *.example.org
```

You can specify multiple locations. The following directive allows only images that are same-origin with the current document, or are served from a subdomain of "example.org", or are served from "example.com":

```http
Content-Security-Policy: img-src 'self' *.example.org  example.com
```

#### Inline JavaScript

If a CSP contains either a `default-src` or a `script-src` directive, then inline JavaScript will not be allowed to execute unless extra measures are taken to enable it. This includes:

- JavaScript included inside a `<script>` element in the page:

  ```html
  <script>
    console.log("Hello from an inline script");
  </script>
  ```

- JavaScript in an inline event handler attribute:

  ```html
  <img src="x" onerror="console.log('Hello from an inline event handler')" />
  ```

- JavaScript in a `javascript:` URL:

  ```html
  <a href="javascript:console.log('Hello from a javascript: URL')">Click me</a>
  ```

The `unsafe-inline` keyword can be used to override this restriction. For example, the following directive requires all resources to be same-origin, but allows inline JavaScript:

```http
Content-Security-Policy: default-src 'self' 'unsafe-inline'
```

> **Warning:**
> Developers should avoid `'unsafe-inline'`, because it defeats much of the purpose of having a CSP. Inline JavaScript is one of the most common XSS vectors, and one of the most basic goals of a CSP is to prevent its uncontrolled use.

Inline `<script>` elements are allowed if they are protected by a nonce or a hash, as described above.

If a directive contains nonce or hash expressions, then the `unsafe-inline` keyword is ignored by browsers.

#### `eval()` and similar APIs

Like inline JavaScript, if a CSP contains either a `default-src` or a `script-src` directive, then `eval()` and similar APIs will not be allowed to execute. This includes, among other APIs:

- `eval()` itself:

  ```js
  eval('console.log("hello from eval()")');
  ```

- The `Function()` constructor:

  ```js
  const sum = new Function("a", "b", "return a + b");
  ```

- The string argument to `setTimeout()` and `setInterval()`:

  ```js
  setTimeout("console.log('hello from setTimeout')", 1);
  ```

The `unsafe-eval` keyword can be used to override this behavior, and as with `unsafe-inline`, and for the same reasons: **developers should avoid `unsafe-eval`**.

Sometimes it can be difficult to remove usages of `eval()` and the other methods: in these situations, the Trusted Types API can make it safer, by ensuring that the input meets a defined policy.
The `trusted-types-eval` keyword should be used to override the behavior in this case.
Unlike `unsafe-inline` it only overrides the behavior in browser when trusted types are supported and enabled; which ensures that the methods will remain blocked on browsers that don't support trusted types.

Unlike `unsafe-inline`, the `unsafe-eval` keyword does still work in a directive that contains nonce or hash expressions.
