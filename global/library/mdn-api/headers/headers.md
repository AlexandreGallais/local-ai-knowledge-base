---
title: "Headers: Headers() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: Headers() constructor

The **`Headers()`** constructor creates a new
`Headers` object.

## Syntax

```js
new Headers()
new Headers(init)
```

### Parameters

- `init` (optional)
    An object containing any HTTP headers
    that you want to pre-populate your `Headers` object with. This can be a
    simple object literal with `String` values, an array of name-value pairs, where each pair is a 2-element string array; or an existing
    `Headers` object. In the last case, the new `Headers` object
    copies its data from the existing `Headers` object.

## Examples

Creating an empty `Headers` object is simple:

```js
const myHeaders = new Headers(); // Currently empty
```

You could add a header to this using `Headers.append`:

```js
myHeaders.append("Content-Type", "image/jpeg");
myHeaders.get("Content-Type"); // Returns 'image/jpeg'
```

Or you can add the headers you want as the `Headers` object is created. In
the following snippet we create a new `Headers` object, adding some headers
by passing the constructor an init object as an argument:

```js
const httpHeaders = {
  "Content-Type": "image/jpeg",
  "X-My-Custom-Header": "Zeke are cool",
};
const myHeaders = new Headers(httpHeaders);
```

You can now create another `Headers` object, passing it the first
`Headers` object as its init object:

```js
const secondHeadersObj = new Headers(myHeaders);
secondHeadersObj.get("Content-Type"); // Would return 'image/jpeg' — it inherits it from the first headers object
```

You can also add the headers you want as the `Headers` object is created by using a two-dimensional array to add multiple headers with the same values. In
the following snippet we create a new `Headers` object with multiple `Set-Cookie` headers
by passing the constructor an init array as an argument:

```js
const headers = [
  ["Set-Cookie", "greeting=hello"],
  ["Set-Cookie", "name=world"],
];
const myHeaders = new Headers(headers);
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
