---
title: "Request: mode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: mode property

The **`mode`** read-only property of the `Request`
interface contains the mode of the request (e.g., `cors`,
`no-cors`, `same-origin`, or `navigate`.) This is used
to determine if cross-origin requests lead to valid responses, and which properties of the response are readable.

To construct a request with a specific mode, pass the desired value as the `RequestInit` option to the `Request.Request()` constructor.

Note that setting particular modes, especially `no-cors`, places restrictions on the request methods and headers that may be used, and prevents JavaScript from accessing the response headers or body. See the documentation for `RequestInit` for more details.

## Value

One of the following values:

- `same-origin`
    Disallows cross-origin requests. If a request is made to another origin with this mode set, the result is an error.

- `no-cors`
    Disables CORS for cross-origin requests. The response is _opaque_, meaning that its headers and body are not available to JavaScript.

- `cors`
    If the request is cross-origin then it will use the Cross-Origin Resource Sharing (CORS) mechanism.

- `navigate`
    A mode for supporting navigation. The `navigate` value is intended to be used only by HTML navigation. A navigate request is created only while navigating between documents.

### Default mode

Requests can be initiated in a variety of ways, and the mode for a request depends on
the particular means by which it was initiated.

For example, when a `Request` object is created using the
`Request()` constructor, the value of the `mode` property
for that `Request` is set to `cors`.

However, for requests created other than by the `Request()`
constructor, `no-cors` is typically used as the mode; for example, for
embedded resources where the request is initiated from markup, unless the
`crossorigin`
attribute is present, the request is in most cases made using the `no-cors`
mode — that is, for the `<link>` or `<script>` elements
(except when used with modules), or ``, `<audio>`,
``, `<object>`, ``, or
`` elements.

## Examples

In the following snippet, we create a new request using the
`Request()` constructor (for an image file in the same directory as
the script), then save the request mode in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myMode = myRequest.mode; // returns "cors" by default
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
