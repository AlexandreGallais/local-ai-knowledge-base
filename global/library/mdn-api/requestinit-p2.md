---
title: "RequestInit (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/requestinit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RequestInit (part 2 of 2)

## Examples

### Passing options into `fetch()`

In this example we pass the `method`, `body`, and `headers` options directly into the `fetch()` method call:

```js
async function post() {
  const response = await fetch("https://example.org/post", {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.status);
}
```

### Passing options into the `Request()` constructor

In this example we create a `Request`, passing the same set of options into its constructor, and then pass the request into `fetch()`:

```js
async function post() {
  const request = new Request("https://example.org/post", {
    method: "POST",
    body: JSON.stringify({ username: "example" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);

  console.log(response.status);
}
```

### Passing options into both `Request()` and `fetch()`

In this example we create a `Request`, passing the `method`, `headers`, and `body` options into its constructor. We then pass the request into `fetch()` along with `body` and `referrer` options:

```js
async function post() {
  const request = new Request("https://example.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "example1" }),
  });

  const response = await fetch(request, {
    body: JSON.stringify({ username: "example2" }),
    referrer: "",
  });

  console.log(response.status);
}
```

In this case the request will be sent with the following options:

- `method: "POST"`
- `headers: {"Content-Type": "application/json"}`
- `body: '{"username":"example2"}'`
- `referrer: ""`

## See also

- Using Fetch
- ServiceWorker API
- HTTP access control (CORS)
- HTTP
