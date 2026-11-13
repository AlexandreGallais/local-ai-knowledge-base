---
title: "Content Security Policy (CSP) (part 3 of 4)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/csp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content Security Policy (CSP) (part 3 of 4)

### Strict CSP

To control script loading as a mitigation against XSS, recommended practice is to use nonce- or hash- based fetch directives. This is called a _strict CSP_. This type of CSP has two main advantages over a location-based CSP (usually called an _allowlist CSP_):

- Allowlist CSPs are hard to get right and often policies inadvertently whitelist unsafe domains, and hence don't provide effective protection against XSS (see CSP Is Dead, Long Live CSP! On the Insecurity of Whitelists and the Future of Content Security Policy).
- Allowlist CSPs can be very large and hard to maintain, in particular when using scripts that are outside of your control. According to How I learned to stop worrying and love the Content Security Policy, just to integrate Google Analytics, a developer is asked to add 187 Google domains to the allowlist.

A nonce-based strict CSP looks like this:

```http
Content-Security-Policy:
  script-src 'nonce-{RANDOM}';
  object-src 'none';
  base-uri 'none';
```

In this CSP, we:

- use nonces to control which JavaScript resources are allowed to load
- block all object embeds
- block all uses of the `<base>` element to set a base URI.

A hash-based strict CSP is the same, except it uses hashes instead of nonces:

```http
Content-Security-Policy:
  script-src 'sha256-{HASHED_SCRIPT}';
  object-src 'none';
  base-uri 'none';
```

Nonce-based directives are easier to maintain if you can generate responses, including the content itself, dynamically. Otherwise, you need to use hash-based directives. The problem with hash-based directives is that you need to recalculate and reapply the hash if any change is made to the script contents.

#### The `strict-dynamic` keyword

As presented above, the strict CSP is difficult to implement when you use scripts which are not under your control. If a third-party script loads any additional scripts, or uses any inline scripts, then this will fail, because the third-party script won't pass the nonce or hash through.

The `strict-dynamic` keyword is provided to help with this problem. It is a keyword that can be included in a fetch directive, and it has the effect that if a script has a nonce or a hash attached to it, then that script will be allowed to load further scripts which do not themselves have nonces or hashes. That is, the trust placed in a script by a nonce or hash is passed on to scripts that the original script loads (and scripts that _they_ load, and so on).

For example, consider a document like this:

```html
<html lang="en-US">
  <head>
    <script
      src="./main.js"
      integrity="sha256-gEh1+8U9S1vkEuQSmmUMTZjyNSu5tIoECP4UXIEjMTk="></script>
  </head>
  <body>
    <h1>Example page!</h1>
  </body>
</html>
```

It includes a script "main.js", which creates and adds another script, "main2.js":

```js
console.log("hello");

const scriptElement = document.createElement("script");
scriptElement.src = `main2.js`;

document.head.appendChild(scriptElement);
```

We serve our document with a CSP like this:

```http
Content-Security-Policy:
  script-src 'sha256-gEh1+8U9S1vkEuQSmmUMTZjyNSu5tIoECP4UXIEjMTk='
```

The "main.js" script will be allowed to load, because its hash matches the value in the CSP. But its attempt to load "main2.js" will fail.

If we add `'strict-dynamic'` to the CSP, then "main.js" will be allowed to load "main2.js":

```http
Content-Security-Policy:
  script-src 'sha256-gEh1+8U9S1vkEuQSmmUMTZjyNSu5tIoECP4UXIEjMTk='
  'strict-dynamic'
```

The `'strict-dynamic'` keyword makes it much easier to create and maintain nonce- or hash-based CSPs, especially when a website uses third-party scripts. It does make your CSP less secure, though, because if the scripts you include create `<script>` elements based on potential sources of XSS, then the CSP will not protect them.

#### Refactoring inline JavaScript and `eval()`

We've seen above that inline JavaScript is disallowed by default in a CSP. With nonces or hashes, a developer can use inline `<script>` tags, but you'll still need to refactor code to remove other disallowed patterns, including inline event handlers, `javascript:` URLs, and uses of `eval()`. For example, inline event handlers should usually be replaced with calls to `addEventListener()`:

```html
<p onclick="console.log('Hello from an inline event handler')">click me</p>
```

```html
<!-- served with the following CSP:
 `script-src 'sha256-AjYfua7yQhrSlg807yyeaggxQ7rP9Lu0Odz7MZv8cL0='`
 -->
<p id="hello">click me</p>
<script>
  const hello = document.querySelector("#hello");
  hello.addEventListener("click", () => {
    console.log("Hello from an inline script");
  });
</script>
```

## Clickjacking protection

The `frame-ancestors` directive can be used to control which documents, if any, are allowed to embed this document in a nested browsing context such as an ``. This is an effective protection against clickjacking attacks, because these attacks depend on embedding the target site in a site controlled by the attacker.

The syntax of `frame-ancestors` is a subset of the fetch directive syntax: you can provide the single keyword value `'none'` or one or more source expressions. However, the only source expressions you can use are schemes, hostnames, or the `'self'` keyword value.

Unless you need your site to be embeddable, you should set `frame-ancestors` to `'none'`:

```http
Content-Security-Policy: frame-ancestors 'none'
```

This directive is a more flexible replacement for the `X-Frame-Options` header.

## Upgrading insecure requests

Web developers are strongly encouraged to serve all their content over HTTPS. In the process of upgrading a site to HTTPS, a site sometimes serves the main document over HTTPS but serves its resources over HTTP, for example, using markup like this:

```html
<script src="http://example.org/my-cat.js"></script>
```

This is called _mixed content_, and the presence of insecure resources greatly weakens the protection afforded by HTTPS. Under the mixed content algorithm that browsers implement, if a document is served over HTTPS, insecure resources are categorized into "upgradable content" and "blockable content". Upgradable content is upgraded to HTTPS, and blockable content is blocked, potentially breaking the page.

The ultimate solution to mixed content is for developers to load all resources over HTTPS. However, even if a site is actually able to serve all content over HTTPS, it can still be very difficult (or even effectively impossible, where archived content is concerned) for a developer to rewrite all the URLs the site uses to load resources.

The `upgrade-insecure-requests` directive is intended to solve this problem. This directive doesn't have any value: to set it, just include the directive name:

```http
Content-Security-Policy: upgrade-insecure-requests
```

If this directive is set on a document, then the browser will automatically upgrade to HTTPS any HTTP URLs in the following cases:

- requests to load resources (such as images, scripts, or fonts)
- navigation requests (such as link targets) which are same-origin with the document
- navigation requests in nested browsing contexts, such as iframes
- form submissions

However, top-level navigation requests whose target is a different origin will not be upgraded.

For example, suppose the document at `https://example.org` is served with a CSP containing the `upgrade-insecure-requests` directive, and the document contains markup like this:

```html
<script src="http://example.org/my-cat.js"></script>
<script src="http://not-example.org/another-cat.js"></script>
```

The browser will automatically upgrade both of these requests to HTTPS.

Suppose the document also contains this:

```html
<a href="http://example.org/more-cats">See some more cats!</a>
<a href="http://not-example.org/even-more-cats">More cats, on another site!</a>
```

The browser will upgrade the first link to HTTPS, but not the second, as it is navigating to a different origin.

This directive is not a substitute for the `Strict-Transport-Security` header (also known as HSTS), because it does not upgrade external links to a site. Sites should include this directive and the `Strict-Transport-Security` header.

## Requiring trusted types

The `require-trusted-types-for` and `trusted-types` directives enable you to defend against client-side cross-site scripting (XSS) attacks, by ensuring that any input has been passed through a transformation to make it safe before it is passed to a web platform API that might otherwise execute it as code.
The `require-trusted-types-for` and `trusted-types` directives can be used to enforce the Trusted Types API.
This allows you to defend against client-side cross-site scripting (XSS) attacks by mandating that any input must be passed through a transformation function, providing an opportunity to make it safe before it is sent to a web platform API that might otherwise execute it as code.

### Injection sinks and sanitization

Some APIs in the web platform are known as _injection sinks_. These are APIs that can be passed some input, usually in the form of a string, and that can interpret that input as code. In this guide we've already seen `eval()`, but there are many other injection sinks, such as `Element.innerHTML` or `Document.write()`.

If an attacker can supply some specially crafted input to your website, and your website passes it to one of these injection sinks, then the attacker can execute malicious code.

Some injection sinks, like `eval()`, are very hard to use safely, and we've seen that a CSP will typically block them entirely. Others can be made safer if the input to them is processed so as to remove unsafe elements. This practice is called _sanitization_.

### The Trusted Types API

With the Trusted Types API, you can pass <example-value> types_ into injection sinks, instead of strings. Trusted types are objects that result from passing potentially dangerous input through a transformation function. This transformation typically sanitizes the input, by removing any elements that might make it executable (such as `<script>` tags).

By default, your code could choose to pass <example-value> types or unsanitized strings to injection sinks. However, if you include the `require-trusted-types-for` directive in your CSP, and give it a value of `'script'`, then the browser will only allow your site to pass <example-value> types to injection sinks. For example, the following code will throw an exception:

```js
const possiblyXSS = "<p>I might be XSS</p>";
const target = document.querySelector("#target");

target.innerHTML = possiblyXSS;
// Will throw an exception if `require-trusted-types-for` is set
```

Trusted type objects are created using a user-defined _policy_ object. Your code can create any kind of policy object, including ones whose transformation function doesn't actually sanitize the input, and therefore doesn't protect you. To minimize this risk, you can include the `trusted-types` directive. This lists the names of acceptable policies, and the browser will only allow those named policies to be used.
