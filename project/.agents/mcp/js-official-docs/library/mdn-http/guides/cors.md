---
title: "Cross-Origin Resource Sharing (CORS) (part 1 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/cors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cross-Origin Resource Sharing (CORS)

**Cross-Origin Resource Sharing** (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. CORS also relies on a mechanism by which browsers make a "preflight" request to the server hosting the cross-origin resource, in order to check that the server will permit the actual request. In that preflight, the browser sends headers that indicate the HTTP method and headers that will be used in the actual request.

An example of a cross-origin request: the front-end JavaScript code served from `https://domain-a.com` uses `fetch()` to make a request for `https://domain-b.com/data.json`.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, `fetch()` and `XMLHttpRequest` follow the same-origin policy. This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. Browsers use CORS in APIs such as `fetch()` or `XMLHttpRequest` to mitigate the risks of cross-origin HTTP requests.

## What requests use CORS?

The cross-origin sharing standard can enable cross-origin HTTP requests for cases such as:

- HTML:
  - Resources fetched by HTML elements with the `crossorigin` attribute, such as ``
  - JavaScript modules loaded using `<script type="module">` and their imports, even when the `crossorigin` attribute is omitted
- CSS:
  - Web Fonts via `@font-face`
  - CSS Shapes from images
- JavaScript:
  - Invocations of `fetch()` or `XMLHttpRequest`, as discussed above
  - WebGL textures
  - Images/video frames drawn to a canvas using `drawImage()` without tainting the canvas, allowing its pixel data to be read or exported

If a site merely _embeds_ a resource with no way to read its data, or merely _writes_ to the external resource, then user data on the external origin is less likely to leak, and such features may not require CORS. However, browsers are increasingly cautious about cross-origin requests in general, so new web features that initiate requests generally require CORS regardless of their nature.

This is a general article about Cross-Origin Resource Sharing and includes a discussion of the necessary HTTP headers.

## Functional overview

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser. Additionally, for HTTP request methods that can cause side-effects on server data (in particular, HTTP methods other than `GET`, or `POST` with certain MIME types), the specification mandates that browsers "preflight" the request, soliciting supported methods from the server with the HTTP `OPTIONS` request method, and then, upon "approval" from the server, sending the actual request. Servers can also inform clients whether "credentials" (such as Cookies and HTTP Authentication) should be sent with requests.

CORS failures result in errors but for security reasons, specifics about the error _are not available to JavaScript_. All the code knows is that an error occurred. The only way to determine what specifically went wrong is to look at the browser's console for details.

Subsequent sections discuss scenarios, as well as provide a breakdown of the HTTP headers used.
