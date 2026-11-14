---
title: "Using the Fetch API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fetch_api/using_fetch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Fetch API

The Fetch API provides a JavaScript interface for making HTTP requests and processing the responses.

Fetch is the modern replacement for `XMLHttpRequest`: unlike `XMLHttpRequest`, which uses callbacks, Fetch is promise-based and is integrated with features of the modern web such as service workers and Cross-Origin Resource Sharing (CORS).

With the Fetch API, you make a request by calling `fetch()`, which is available as a global function in both `window` and `worker` contexts. You pass it a `Request` object or a string containing the URL to fetch, along with an optional argument to configure the request.

The `fetch()` function returns a `Promise` which is fulfilled with a `Response` object representing the server's response. You can then check the request status and extract the body of the response in various formats, including text and JSON, by calling the appropriate method on the response.

Here's a minimal function that uses `fetch()` to retrieve some JSON data from a server:

```js
async function getData() {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
```

We declare a string containing the URL and then call `fetch()`, passing the URL with no extra options.

The `fetch()` function will reject the promise on some errors, but not if the server responds with an error status like `404`: so we also check the response status and throw if it is not OK.

Otherwise, we fetch the response body content as JSON by calling the `json()` method of `Response`, and log one of its values. Note that like `fetch()` itself, `json()` is asynchronous, as are all the other methods to access the response body content.

In the rest of this page we'll look in more detail at the different stages of this process.

## Making a request

To make a request, call `fetch()`, passing in:

1. a definition of the resource to fetch. This can be any one of:
   - a string containing the URL
   - an object, such as an instance of `URL`, which has a stringifier that produces a string containing the URL
   - a `Request` instance
2. optionally, an object containing options to configure the request.

In this section we'll look at some of the most commonly-used options. To read about all the options that can be given, see the `fetch()` reference page.

### Setting the method

By default, `fetch()` makes a `GET` request, but you can use the `method` option to use a different request method:

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  // …
});
```

If the `mode` option is set to `no-cors`, then `method` must be one of `GET`, `POST` or `HEAD`.

### Setting a body

The request body is the payload of the request: it's the thing the client is sending to the server. You cannot include a body with `GET` requests, but it's useful for requests that send content to the server, such as `POST` or `PUT` requests. For example, if you want to upload a file to the server, you might make a `POST` request and include the file as the request body.

To set a request body, pass it as the `body` option:

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  // …
});
```

You can supply the body as an instance of any of the following types:

- a string
- `ArrayBuffer`
- `TypedArray`
- `DataView`
- `Blob`
- `File`
- `URLSearchParams`
- `FormData`
- `ReadableStream`

Other objects are converted to strings using their `toString()` method. For example, you can use a `URLSearchParams` object to encode form data (see setting headers for more information):

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // Automatically converted to "<example-value>"
  body: new URLSearchParams({ username: "<example-value>", password: "<example-value>" }),
  // …
});
```

Note that just like response bodies, request bodies are streams, and making the request reads the stream, so if a request contains a body, you can't make it twice:

```js
const request = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
});

const response1 = await fetch(request);
console.log(response1.status);

// Will throw: "Body has already been consumed."
const response2 = await fetch(request);
console.log(response2.status);
```

Instead, you would need to `create a clone` of the request before sending it:

```js
const request1 = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
});

const request2 = request1.clone();

const response1 = await fetch(request1);
console.log(response1.status);

const response2 = await fetch(request2);
console.log(response2.status);
```

See Locked and disturbed streams for more information.

### Setting headers

Request headers give the server information about the request: for example, in a `POST` request, the `Content-Type` header tells the server the format of the request's body.

To set request headers, assign them to the `headers` option.

You can pass an object literal here containing `header-name: header-value` properties:

```js
const response = await fetch("https://example.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "example" }),
  // …
});
```

Alternatively, you can construct a `Headers` object, add headers to that object using `Headers.append()`, then assign the `Headers` object to the `headers` option:

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify({ username: "example" }),
  // …
});
```

Compared to using plain objects, the `Headers` object provides some additional input sanitization. For example, it normalizes header names to lowercase, strips leading and trailing whitespace from header values, and prevents certain headers from being set. Many headers are set automatically by the browser and can't be set by a script: these are called Forbidden request headers. If the `mode` option is set to `no-cors`, then the set of permitted headers is further restricted.

### Sending data in a GET request

`GET` requests don't have a body, but you can still send data to the server by appending it to the URL as a query string. This is a common way to send form data to the server. You can do this by using `URLSearchParams` to encode the data, and then appending it to the URL:

```js
const params = new URLSearchParams();
params.append("username", "example");

// GET request sent to https://example.org/login?username=example
const response = await fetch(`https://example.org/login?${params}`);
```

### Making cross-origin requests

Whether a request can be made cross-origin or not is determined by the value of the `RequestInit` option. This may take one of three values: `cors`, `same-origin`, or `no-cors`.

- For fetch requests the default value of `mode` is `cors`, meaning that if the request is cross-origin then it will use the Cross-Origin Resource Sharing (CORS) mechanism. This means that:
  - if the request is a simple request, then the request will always be sent, but the server must respond with the correct `Access-Control-Allow-Origin` header or the browser will not share the response with the caller.
  - if the request is not a simple request, then the browser will send a preflighted request to check that the server understands CORS and allows the request, and the real request will not be sent unless the server responds to the preflighted request with the appropriate CORS headers.

- Setting `mode` to `same-origin` disallows cross-origin requests completely.

- Setting `mode` to `no-cors` disables CORS for cross-origin requests. This restricts the headers that may be set, and restricts methods to GET, HEAD, and POST. The response is _opaque_, meaning that its headers and body are not available to JavaScript. Most of the time a website should not use `no-cors`: the main application of it is for certain service worker use cases.

See the reference documentation for `RequestInit` for more details.

### Including credentials

In the context of the Fetch API, a credential is an extra piece of data sent along with the request that the server may use to authenticate the user. All the following items are considered to be credentials:

- HTTP cookies
- TLS client certificates
- The `Authorization` and `Proxy-Authorization` headers.

By default, credentials are only included in same-origin requests. To customize this behavior, as well as to control whether the browser respects any **`Set-Cookie`** response headers, set the `credentials` option, which can take one of the following three values:

- `omit`: never send credentials in the request or include credentials in the response.
- `same-origin` (the default): only send and include credentials for same-origin requests.
- `include`: always include credentials, even cross-origin.

Note that if a cookie's `SameSite` attribute is set to `Strict` or `Lax`, then the cookie will not be sent cross-site, even if `credentials` is set to `include`.

Including credentials in cross-origin requests can make a site vulnerable to CSRF attacks, so even if `credentials` is set to `include`, the server must also agree to their inclusion by including the `Access-Control-Allow-Credentials` header in its response. Additionally, in this situation the server must explicitly specify the client's origin in the `Access-Control-Allow-Origin` response header (that is, `*` is not allowed).

This means that if `credentials` is set to `include` and the request is cross-origin, then:

- If the request is a simple request, then the request will be sent with credentials, but the server must set the `Access-Control-Allow-Credentials` and `Access-Control-Allow-Origin` response headers, or the browser will return a network error to the caller. If the server does set the correct headers, then the response, including credentials, will be delivered to the caller.

- If the request is not a simple request, then the browser will send a preflighted request without credentials, and the server must set the `Access-Control-Allow-Credentials` and `Access-Control-Allow-Origin` response headers, or the browser will return a network error to the caller. If the server does set the correct headers, then the browser will follow up with the real request, including credentials, and will deliver the real response, including credentials, to the caller.

### Creating a `Request` object

The `Request()` constructor takes the same arguments as `fetch()` itself. This means that instead of passing options into `fetch()`, you can pass the same options to the `Request()` constructor, and then pass that object to `fetch()`.

For example, we can make a POST request by passing options into `fetch()` using code like this:

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  headers: myHeaders,
});
```

However, we could rewrite this to pass the same arguments to the `Request()` constructor:

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const myRequest = new Request("https://example.org/post", {
  method: "POST",
  body: JSON.stringify({ username: "example" }),
  headers: myHeaders,
});

const response = await fetch(myRequest);
```

This also means that you can create a request from another request, while changing some of its properties using the second argument:

```js
async function post(request) {
  try {
    const response = await fetch(request);
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

const request1 = new Request("https://example.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "example1" }),
});

const request2 = new Request(request1, {
  body: JSON.stringify({ username: "example2" }),
});

post(request1);
post(request2);
```

## Canceling a request

To make a request cancelable, create an `AbortController`, and assign its `AbortSignal` to the request's `signal` property.

To cancel the request, call the controller's `abort()` method. The `fetch()` call will reject the promise with an `AbortError` exception.

```js
const controller = new AbortController();

const fetchButton = document.querySelector("#fetch");
fetchButton.addEventListener("click", async () => {
  try {
    console.log("Starting fetch");
    const response = await fetch("https://example.org/get", {
      signal: controller.signal,
    });
    console.log(`Response: ${response.status}`);
  } catch (e) {
    console.error(`Error: ${e}`);
  }
});

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", () => {
  controller.abort();
  console.log("Canceled fetch");
});
```

If the request is aborted after the `fetch()` call has been fulfilled but before the response body has been read, then attempting to read the response body will reject with an `AbortError` exception.

```js
async function get() {
  const controller = new AbortController();
  const request = new Request("https://example.org/get", {
    signal: controller.signal,
  });

  const response = await fetch(request);
  controller.abort();
  // The next line will throw `AbortError`
  const text = await response.text();
  console.log(text);
}
```
