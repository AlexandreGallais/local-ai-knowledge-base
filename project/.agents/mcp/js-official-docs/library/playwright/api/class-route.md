---
title: "class: Route (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-route.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Route
* since: v1.8

Whenever a network route is set up with [`method: Page.route`] or [`method: BrowserContext.route`], the `Route` object
allows to handle the route.

Learn more about networking.

## async method: Route.abort
* since: v1.8

Aborts the route's request.

### param: Route.abort.errorCode
* since: v1.8
- `errorCode` ?<[string]>

Optional error code. Defaults to `failed`, could be one of the following:
* `'aborted'` - An operation was aborted (due to user action)
* `'accessdenied'` - Permission to access a resource, other than the network, was denied
* `'addressunreachable'` - The IP address is unreachable. This usually means that there is no route to the specified
  host or network.
* `'blockedbyclient'` - The client chose to block the request.
* `'blockedbyresponse'` - The request failed because the response was delivered along with requirements which are not
  met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
* `'connectionaborted'` - A connection timed out as a result of not receiving an ACK for data sent.
* `'connectionclosed'` - A connection was closed (corresponding to a TCP FIN).
* `'connectionfailed'` - A connection attempt failed.
* `'connectionrefused'` - A connection attempt was refused.
* `'connectionreset'` - A connection was reset (corresponding to a TCP RST).
* `'internetdisconnected'` - The Internet connection has been lost.
* `'namenotresolved'` - The host name could not be resolved.
* `'timedout'` - An operation timed out.
* `'failed'` - A generic failure occurred.

## async method: Route.continue
* since: v1.8
* langs:
  - alias-java: resume
  - alias-python: continue_

Sends route's request to the network with optional overrides.

**Usage**

```js
await page.route('**/*', async (route, request) => {
  // Override headers
  const headers = {
    ...request.headers(),
    foo: 'foo-value', // set "foo" header
    bar: undefined, // remove "bar" header
  };
  await route.continue({ headers });
});
```

```java
page.route("**/*", route -> {
  // Override headers
  Map<String, String> headers = new HashMap<>(route.request().headers());
  headers.put("foo", "foo-value"); // set "foo" header
  headers.remove("bar"); // remove "bar" header
  route.resume(new Route.ResumeOptions().setHeaders(headers));
});
```

```python
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.continue_(headers=headers)

await page.route("**/*", handle)
```

```python
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.continue_(headers=headers)

page.route("**/*", handle)
```

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "bar" } };
    headers.Remove("origin");
    await route.ContinueAsync(new() { Headers = headers });
});
```

**Details**

The [`option: headers`] option applies to both the routed request and any redirects it initiates. However, [`option: url`], [`option: method`], and [`option: postData`] only apply to the original request and are not carried over to redirected requests.

[`method: Route.continue`] will immediately send the request to the network, other matching handlers won't be invoked. Use [`method: Route.fallback`] If you want next matching handler in the chain to be invoked.

:::warning
Some request headers are **forbidden** and cannot be overridden (for example, `Cookie`, `Host`, `Content-Length` and others, see this MDN page for full list).
If an override is provided for a forbidden header, it will be ignored and the original request header will be used.

To set custom cookies, use [`method: BrowserContext.addCookies`].
:::

### option: Route.continue.url
* since: v1.8
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one.

### option: Route.continue.method
* since: v1.8
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.continue.postData
* since: v1.8
* langs: js, python
- `postData` <[string]|[Buffer]|[Serializable]>

If set changes the post data of request.

### option: Route.continue.postData
* since: v1.8
* langs: java
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.continue.postData
* since: v1.8
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.continue.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.

## async method: Route.fallback
* since: v1.23

Continues route's request with optional overrides. The method is similar to [`method: Route.continue`] with the difference that other matching handlers will be invoked before sending the request.

**Usage**

When several routes match the given pattern, they run in the order opposite to their registration.
That way the last registered route can always override all the previous ones. In the example below,
request will be handled by the bottom-most handler first, then it'll fall back to the previous one and
in the end will be aborted by the first registered route.

```js
await page.route('**/*', async route => {
  // Runs last.
  await route.abort();
});
await page.route('**/*', async route => {
  // Runs second.
  await route.fallback();
});
await page.route('**/*', async route => {
  // Runs first.
  await route.fallback();
});
```

```java
page.route("**/*", route -> {
  // Runs last.
  route.abort();
});

page.route("**/*", route -> {
  // Runs second.
  route.fallback();
});

page.route("**/*", route -> {
  // Runs first.
  route.fallback();
});
```

```python
await page.route("**/*", lambda route: route.abort())  # Runs last.
await page.route("**/*", lambda route: route.fallback())  # Runs second.
await page.route("**/*", lambda route: route.fallback())  # Runs first.
```

```python
page.route("**/*", lambda route: route.abort())  # Runs last.
page.route("**/*", lambda route: route.fallback())  # Runs second.
page.route("**/*", lambda route: route.fallback())  # Runs first.
```

```csharp
await page.RouteAsync("**/*", route => {
    // Runs last.
    await route.AbortAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs second.
    await route.FallbackAsync();
});

await page.RouteAsync("**/*", route => {
    // Runs first.
    await route.FallbackAsync();
});
```

Registering multiple routes is useful when you want separate handlers to
handle different kinds of requests, for example API calls vs page resources or
GET requests vs POST requests as in the example below.

```js
// Handle GET requests.
await page.route('**/*', async route => {
  if (route.request().method() !== 'GET') {
    await route.fallback();
    return;
  }
  // Handling GET only.
  // ...
});

// Handle POST requests.
await page.route('**/*', async route => {
  if (route.request().method() !== 'POST') {
    await route.fallback();
    return;
  }
  // Handling POST only.
  // ...
});
```

```java
// Handle GET requests.
page.route("**/*", route -> {
  if (!route.request().method().equals("GET")) {
    route.fallback();
    return;
  }
  // Handling GET only.
  // ...
});

// Handle POST requests.
page.route("**/*", route -> {
  if (!route.request().method().equals("POST")) {
    route.fallback();
    return;
  }
  // Handling POST only.
  // ...
});
```

```python
# Handle GET requests.
async def handle_get(route):
    if route.request.method != "GET":
        await route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
async def handle_post(route):
    if route.request.method != "POST":
        await route.fallback()
        return
  # Handling POST only.
  # ...

await page.route("**/*", handle_get)
await page.route("**/*", handle_post)
```

```python
# Handle GET requests.
def handle_get(route):
    if route.request.method != "GET":
        route.fallback()
        return
  # Handling GET only.
  # ...

# Handle POST requests.
def handle_post(route):
    if route.request.method != "POST":
        route.fallback()
        return
  # Handling POST only.
  # ...

page.route("**/*", handle_get)
page.route("**/*", handle_post)
```

```csharp
// Handle GET requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "GET") {
        await route.FallbackAsync();
        return;
    }
    // Handling GET only.
    // ...
});

// Handle POST requests.
await page.RouteAsync("**/*", route => {
    if (route.Request.Method != "POST") {
        await route.FallbackAsync();
        return;
    }
    // Handling POST only.
    // ...
});
```

One can also modify request while falling back to the subsequent handler, that way intermediate
route handler can modify url, method, headers and postData of the request.

```js
await page.route('**/*', async (route, request) => {
  // Override headers
  const headers = {
    ...request.headers(),
    foo: 'foo-value', // set "foo" header
    bar: undefined, // remove "bar" header
  };
  await route.fallback({ headers });
});
```

```java
page.route("**/*", route -> {
  // Override headers
  Map<String, String> headers = new HashMap<>(route.request().headers());
  headers.put("foo", "foo-value"); // set "foo" header
  headers.remove("bar"); // remove "bar" header
  route.fallback(new Route.ResumeOptions().setHeaders(headers));
});
```

```python
async def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    await route.fallback(headers=headers)

await page.route("**/*", handle)
```

```python
def handle(route, request):
    # override headers
    headers = {
        **request.headers,
        "foo": "foo-value", # set "foo" header
        "bar": None # remove "bar" header
    }
    route.fallback(headers=headers)

page.route("**/*", handle)
```

```csharp
await page.RouteAsync("**/*", async route =>
{
    var headers = new Dictionary<string, string>(route.Request.Headers) { { "foo", "foo-value" } };
    headers.Remove("bar");
    await route.FallbackAsync(new() { Headers = headers });
});
```

Use [`method: Route.continue`] to immediately send the request to the network, other matching handlers won't be invoked in that case.

### option: Route.fallback.url
* since: v1.23
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one. Changing the URL won't
affect the route matching, all the routes are matched using the original request URL.

### option: Route.fallback.method
* since: v1.23
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.fallback.postData
* since: v1.23
* langs: js, python
- `postData` <[string]|[Buffer]|[Serializable]>

If set changes the post data of request.

### option: Route.fallback.postData
* since: v1.23
* langs: java
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.fallback.postData
* since: v1.23
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.fallback.headers
* since: v1.23
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.
