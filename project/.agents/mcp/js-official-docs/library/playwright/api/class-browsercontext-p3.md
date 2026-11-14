---
title: "class: BrowserContext (part 3 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsercontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserContext (part 3 of 5)

## async method: BrowserContext.grantPermissions
* since: v1.8

Grants specified permissions to the browser context. Only grants corresponding permissions to the given origin if
specified.

### param: BrowserContext.grantPermissions.permissions
* since: v1.8
- `permissions` <[Array]<[string]>>

A list of permissions to grant.

:::danger
Supported permissions differ between browsers, and even between different versions of the same browser. Any permission may stop working after an update.
:::

Here are some permissions that may be supported by some browsers:
* `'accelerometer'`
* `'ambient-light-sensor'`
* `'background-sync'`
* `'camera'`
* `'clipboard-read'`
* `'clipboard-write'`
* `'geolocation'`
* `'gyroscope'`
* `'local-fonts'`
* `'local-network-access'`
* `'magnetometer'`
* `'microphone'`
* `'midi-sysex'` (system-exclusive midi)
* `'midi'`
* `'notifications'`
* `'payment-handler'`
* `'storage-access'`
* `'screen-wake-lock'`

### option: BrowserContext.grantPermissions.origin
* since: v1.8
- `origin` <[string]>

The [origin] to grant permissions to, e.g. "https://example.com".

## method: BrowserContext.isClosed
* since: v1.59
- returns: <[boolean]>

Indicates that the browser context is in the process of closing or has already been closed.

## async method: BrowserContext.newCDPSession
* since: v1.11
- returns: <[CDPSession]>

:::note
CDP sessions are only supported on Chromium-based browsers.
:::

Returns the newly created session.

### param: BrowserContext.newCDPSession.page
* since: v1.11
- `page` <[Page]|[Frame]>

Target to create new session for. For backwards-compatibility, this parameter is
named `page`, but it can be a `Page` or `Frame` type.

## async method: BrowserContext.newPage
* since: v1.8
- returns: <[Page]>

Creates a new page in the browser context.

## method: BrowserContext.pages
* since: v1.8
- returns: <[Array]<[Page]>>

Returns all open pages in the context.

## async method: BrowserContext.removeAllListeners
* since: v1.47
* langs: js

Removes all the listeners of the given type (or all registered listeners if no type given).
Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

### param: BrowserContext.removeAllListeners.type
* since: v1.47
- `type` ?<[string]>

### option: BrowserContext.removeAllListeners.behavior = %%-remove-all-listeners-options-behavior-%%
* since: v1.47

## property: BrowserContext.request
* since: v1.16
* langs:
  - alias-csharp: APIRequest
- type: <[APIRequestContext]>

API testing helper associated with this context. Requests made with this API will use context cookies.

## async method: BrowserContext.route
* since: v1.8
- returns: <[Disposable]>

Routing provides the capability to modify network requests that are made by any page in the browser context. Once route
is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note
[`method: BrowserContext.route`] will not intercept requests intercepted by Service Worker. See this issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```js
const context = await browser.newContext();
await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

```java
BrowserContext context = browser.newContext();
context.route("**/*.{png,jpg,jpeg}", route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

```python
context = await browser.new_context()
page = await context.new_page()
await context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python
context = browser.new_context()
page = context.new_page()
context.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync("**/*.{png,jpg,jpeg}", r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

or the same snippet using a regex pattern instead:

```js
const context = await browser.newContext();
await context.route(/(\.png$)|(\.jpg$)/, route => route.abort());
const page = await context.newPage();
await page.goto('https://example.com');
await browser.close();
```

```java
BrowserContext context = browser.newContext();
context.route(Pattern.compile("(\\.png$)|(\\.jpg$)"), route -> route.abort());
Page page = context.newPage();
page.navigate("https://example.com");
browser.close();
```

```python
context = await browser.new_context()
page = await context.new_page()
await context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
await page.goto("https://example.com")
await browser.close()
```

```python
context = browser.new_context()
page = context.new_page()
context.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page = await context.new_page()
page = context.new_page()
page.goto("https://example.com")
browser.close()
```

```csharp
var context = await browser.NewContextAsync();
var page = await context.NewPageAsync();
await context.RouteAsync(new Regex("(\\.png$)|(\\.jpg$)"), r => r.AbortAsync());
await page.GotoAsync("https://theverge.com");
await browser.CloseAsync();
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```js
await context.route('/api/**', async route => {
  if (route.request().postData().includes('my-string'))
    await route.fulfill({ body: 'mocked-data' });
  else
    await route.continue();
});
```

```java
context.route("/api/**", route -> {
  if (route.request().postData().contains("my-string"))
    route.fulfill(new Route.FulfillOptions().setBody("mocked-data"));
  else
    route.resume();
});
```

```python
async def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    await route.fulfill(body="mocked-data")
  else:
    await route.continue_()
await context.route("/api/**", handle_route)
```

```python
def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
context.route("/api/**", handle_route)
```

```csharp
await page.RouteAsync("/api/**", async r =>
{
    if (r.Request.PostData.Contains("my-string"))
        await r.FulfillAsync(new() { Body = "mocked-data" });
    else
        await r.ContinueAsync();
});
```

Page routes (set up with [`method: Page.route`]) take precedence over browser context routes when request matches both
handlers.

To remove a route with its handler you can use [`method: BrowserContext.unroute`].

:::note
Enabling routing disables http cache.
:::

### param: BrowserContext.route.url
* since: v1.8
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, URL pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the `new URL()` constructor.

### param: BrowserContext.route.url
* since: v1.8
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the `new URL()` constructor.

### param: BrowserContext.route.handler
* since: v1.8
* langs: js
- `handler` <[function]\([Route], [Request]\): [Promise<any>|any]>

handler function to route the request.

### param: BrowserContext.route.handler
* since: v1.8
* langs: python
- `handler` <[function]\([Route]\)|[function]\([Route], [Request]\)>

handler function to route the request.

### param: BrowserContext.route.handler
* since: v1.8
* langs: csharp, java
- `handler` <[function]\([Route]\)>

handler function to route the request.

### option: BrowserContext.route.times
* since: v1.15
- `times` <[int]>

How often a route should be used. By default it will be used every time.

## async method: BrowserContext.routeFromHAR
* since: v1.23

If specified the network requests that are made in the context will be served from the HAR file. Read more about Replaying from HAR.

Playwright will not serve requests intercepted by Service Worker from the HAR file. See this issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.

### param: BrowserContext.routeFromHAR.har
* since: v1.23
- `har` <[path]>

Path to a HAR file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.

### option: BrowserContext.routeFromHAR.notFound
* since: v1.23
- `notFound` "HarNotFound" ?<"abort"|"fallback">
* If set to 'abort' any request not found in the HAR file will be aborted.
* If set to 'fallback' falls through to the next route handler in the handler chain.

Defaults to abort.

### option: BrowserContext.routeFromHAR.update
* since: v1.23
- `update` ?<boolean>

If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [`method: BrowserContext.close`] is called.

### option: BrowserContext.routeFromHAR.url
* since: v1.23
- `url` <[string]|[RegExp]>

A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

### option: BrowserContext.routeFromHAR.updateMode
* since: v1.32
- `updateMode` "HarMode" <"full"|"minimal">

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.

### option: BrowserContext.routeFromHAR.updateContent
* since: v1.32
- `updateContent` "RouteFromHarUpdateContentPolicy" <"embed"|"attach">

Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.

## async method: BrowserContext.routeWebSocket
* since: v1.48

This method allows to modify websocket connections that are made by any page in the browser context.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before creating any pages.

**Usage**

Below is an example of a simple handler that blocks some websocket messages.
See [WebSocketRoute] for more details and examples.

```js
await context.routeWebSocket('/ws', ws => {
  const server = ws.connectToServer();
  ws.onMessage(message => {
    if (message === 'to-be-blocked')
      return;
    server.send(message);
  });
});
```

```java
context.routeWebSocket("/ws", ws -> {
  WebSocketRoute server = ws.connectToServer();
  ws.onMessage(frame -> {
    if ("to-be-blocked".equals(frame.text()))
      return;
    server.send(frame.text());
  });
});
```

```python
def message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message == "to-be-blocked":
    return
  server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

await context.route_web_socket("/ws", handler)
```

```python
def message_handler(server: WebSocketRoute, message: Union[str, bytes]):
  if message == "to-be-blocked":
    return
  server.send(message)

def handler(ws: WebSocketRoute):
  server = ws.connect_to_server()
  ws.on_message(lambda message: message_handler(server, message))

context.route_web_socket("/ws", handler)
```

```csharp
await context.RouteWebSocketAsync("/ws", ws => {
  var server = ws.ConnectToServer();
  ws.OnMessage(frame => {
    if (frame.Text == "to-be-blocked")
      return;
    server.Send(frame.Text);
  });
});
```

### param: BrowserContext.routeWebSocket.url
* since: v1.48
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [`option: Browser.newContext.baseURL`] context option.

### param: BrowserContext.routeWebSocket.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([WebSocketRoute]\): [Promise<any>|any]>

Handler function to route the WebSocket.

### param: BrowserContext.routeWebSocket.handler
* since: v1.48
* langs: csharp, java
- `handler` <[function]\([WebSocketRoute]\)>

Handler function to route the WebSocket.

## method: BrowserContext.serviceWorkers
* since: v1.11
* langs: js, python
- returns: <[Array]<[Worker]>>

:::note
Service workers are only supported on Chromium-based browsers.
:::

All existing service workers in the context.

## method: BrowserContext.setDefaultNavigationTimeout
* since: v1.8

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [`method: Page.goBack`]
* [`method: Page.goForward`]
* [`method: Page.goto`]
* [`method: Page.reload`]
* [`method: Page.setContent`]
* [`method: Page.waitForNavigation`]

:::note
[`method: Page.setDefaultNavigationTimeout`] and [`method: Page.setDefaultTimeout`] take priority over
[`method: BrowserContext.setDefaultNavigationTimeout`].
:::

### param: BrowserContext.setDefaultNavigationTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum navigation time in milliseconds

## method: BrowserContext.setDefaultTimeout
* since: v1.8

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

:::note
[`method: Page.setDefaultNavigationTimeout`], [`method: Page.setDefaultTimeout`] and
[`method: BrowserContext.setDefaultNavigationTimeout`] take priority over [`method: BrowserContext.setDefaultTimeout`].
:::

### param: BrowserContext.setDefaultTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum time in milliseconds. Pass `0` to disable timeout.
