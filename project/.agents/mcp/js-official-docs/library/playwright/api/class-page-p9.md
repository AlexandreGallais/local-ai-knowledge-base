---
title: "class: Page (part 9 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 9 of 14)

## async method: Page.route
* since: v1.8
- returns: <[Disposable]>

Routing provides the capability to modify network requests that are made by a page.

Once routing is enabled, every request matching the url pattern will stall unless it's continued, fulfilled or aborted.

:::note
The handler will only be called for the first url if the response is a redirect.
:::

:::note
[`method: Page.route`] will not intercept requests intercepted by Service Worker. See this issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.
:::

:::note
[`method: Page.route`] will not intercept the first request of a popup page. Use [`method: BrowserContext.route`] instead.
:::

**Usage**

An example of a naive handler that aborts all image requests:

```js
const page = await browser.newPage();
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

```java
Page page = browser.newPage();
page.route("**/*.{png,jpg,jpeg}", route -> route.abort());
page.navigate("https://example.com");
browser.close();
```

```python
page = await browser.new_page()
await page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python
page = browser.new_page()
page.route("**/*.{png,jpg,jpeg}", lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.RouteAsync("**/*.{png,jpg,jpeg}", async r => await r.AbortAsync());
await page.GotoAsync("https://www.microsoft.com");
```

or the same snippet using a regex pattern instead:

```js
const page = await browser.newPage();
await page.route(/(\.png$)|(\.jpg$)/, route => route.abort());
await page.goto('https://example.com');
await browser.close();
```

```java
Page page = browser.newPage();
page.route(Pattern.compile("(\\.png$)|(\\.jpg$)"),route -> route.abort());
page.navigate("https://example.com");
browser.close();
```

```python
page = await browser.new_page()
await page.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
await page.goto("https://example.com")
await browser.close()
```

```python
page = browser.new_page()
page.route(re.compile(r"(\.png$)|(\.jpg$)"), lambda route: route.abort())
page.goto("https://example.com")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.RouteAsync(new Regex("(\\.png$)|(\\.jpg$)"), async r => await r.AbortAsync());
await page.GotoAsync("https://www.microsoft.com");
```

It is possible to examine the request to decide the route action. For example, mocking all requests that contain some post data, and leaving all other requests as is:

```js
await page.route('/api/**', async route => {
  if (route.request().postData().includes('my-string'))
    await route.fulfill({ body: 'mocked-data' });
  else
    await route.continue();
});
```

```java
page.route("/api/**", route -> {
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
await page.route("/api/**", handle_route)
```

```python
def handle_route(route: Route):
  if ("my-string" in route.request.post_data):
    route.fulfill(body="mocked-data")
  else:
    route.continue_()
page.route("/api/**", handle_route)
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

If a request matches multiple registered routes, the most recently registered route takes precedence.

Page routes take precedence over browser context routes (set up with [`method: BrowserContext.route`]) when request
matches both handlers.

To remove a route with its handler you can use [`method: Page.unroute`].

:::note
Enabling routing disables http cache.
:::

### param: Page.route.url
* since: v1.8
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, URL pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the `new URL()` constructor.

### param: Page.route.url
* since: v1.8
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate that receives a [URL] to match during routing. If [`option: Browser.newContext.baseURL`] is set in the context options and the provided URL is a string that does not start with `*`, it is resolved using the `new URL()` constructor.

### param: Page.route.handler
* since: v1.8
* langs: js
- `handler` <[function]\([Route], [Request]\): [Promise<any>|any]>

handler function to route the request.

### param: Page.route.handler
* since: v1.8
* langs: python
- `handler` <[function]\([Route]\)|[function]\([Route], [Request]\)>

handler function to route the request.

### param: Page.route.handler
* since: v1.8
* langs: csharp, java
- `handler` <[function]\([Route]\)>

handler function to route the request.

### option: Page.route.times
* since: v1.15
- `times` <[int]>

How often a route should be used. By default it will be used every time.

## async method: Page.routeFromHAR
* since: v1.23

If specified the network requests that are made in the page will be served from the HAR file. Read more about Replaying from HAR.

Playwright will not serve requests intercepted by Service Worker from the HAR file. See this issue. We recommend disabling Service Workers when using request interception by setting [`option: Browser.newContext.serviceWorkers`] to `'block'`.

### param: Page.routeFromHAR.har
* since: v1.23
- `har` <[path]>

Path to a HAR file with prerecorded network data. If `path` is a relative path, then it is resolved relative to the current working directory.

### option: Page.routeFromHAR.notFound
* since: v1.23
- `notFound` "HarNotFound" ?<"abort"|"fallback">
* If set to 'abort' any request not found in the HAR file will be aborted.
* If set to 'fallback' missing requests will be sent to the network.

Defaults to abort.

### option: Page.routeFromHAR.update
* since: v1.23
- `update` ?<boolean>

If specified, updates the given HAR with the actual network information instead of serving from file. The file is written to disk when [`method: BrowserContext.close`] is called.

### option: Page.routeFromHAR.url
* since: v1.23
- `url` <[string]|[RegExp]>

A glob pattern, regular expression or predicate to match the request URL. Only requests with URL matching the pattern will be served from the HAR file. If not specified, all requests are served from the HAR file.

### option: Page.routeFromHAR.updateMode
* since: v1.32
- `updateMode` "HarMode" <"full"|"minimal">

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `minimal`.

### option: Page.routeFromHAR.updateContent
* since: v1.32
- `updateContent` "RouteFromHarUpdateContentPolicy" <"embed"|"attach">

Optional setting to control resource content management. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file.

## async method: Page.routeWebSocket
* since: v1.48

This method allows to modify websocket connections that are made by the page.

Note that only `WebSocket`s created after this method was called will be routed. It is recommended to call this method before navigating the page.

**Usage**

Below is an example of a simple mock that responds to a single message. See [WebSocketRoute] for more details and examples.

```js
await page.routeWebSocket('/ws', ws => {
  ws.onMessage(message => {
    if (message === 'request')
      ws.send('response');
  });
});
```

```java
page.routeWebSocket("/ws", ws -> {
  ws.onMessage(frame -> {
    if ("request".equals(frame.text()))
      ws.send("response");
  });
});
```

```python
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

def handler(ws: WebSocketRoute):
  ws.on_message(lambda message: message_handler(ws, message))

await page.route_web_socket("/ws", handler)
```

```python
def message_handler(ws: WebSocketRoute, message: Union[str, bytes]):
  if message == "request":
    ws.send("response")

def handler(ws: WebSocketRoute):
  ws.on_message(lambda message: message_handler(ws, message))

page.route_web_socket("/ws", handler)
```

```csharp
await page.RouteWebSocketAsync("/ws", ws => {
  ws.OnMessage(frame => {
    if (frame.Text == "request")
      ws.Send("response");
  });
});
```

### param: Page.routeWebSocket.url
* since: v1.48
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [`option: Browser.newContext.baseURL`] context option.

### param: Page.routeWebSocket.url
* since: v1.48
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

Only WebSockets with the url matching this pattern will be routed. A string pattern can be relative to the [`option: Browser.newContext.baseURL`] context option.

### param: Page.routeWebSocket.handler
* since: v1.48
* langs: js, python
- `handler` <[function]\([WebSocketRoute]\): [Promise<any>|any]>

Handler function to route the WebSocket.

### param: Page.routeWebSocket.handler
* since: v1.48
* langs: csharp, java
- `handler` <[function]\([WebSocketRoute]\)>

Handler function to route the WebSocket.

## property: Page.screencast
* since: v1.59
- type: <[Screencast]>

[Screencast] object associated with this page.

**Usage**

```js
await page.screencast.start({
  onFrame: ({ data }) => {
    console.log('received frame, jpeg size:', data.length);
  },
});
// ... perform actions ...
await page.screencast.stop();
```

## async method: Page.screenshot
* since: v1.8
- returns: <[Buffer]>

Returns the buffer with the captured screenshot.

### option: Page.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.8

### option: Page.screenshot.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.screenshot.fullPage = %%-screenshot-option-full-page-%%
* since: v1.8

### option: Page.screenshot.clip = %%-screenshot-option-clip-%%
* since: v1.8

### option: Page.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: Page.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: Page.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about locators.
- returns: <[Array]<[string]>>

This method waits for an element matching [`param: selector`], waits for actionability checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
page.selectOption('select#colors', 'blue');

// single selection matching the label
page.selectOption('select#colors', { label: 'Blue' });

// multiple selection
page.selectOption('select#colors', ['red', 'green', 'blue']);

```

```java
// Single selection matching the value or label
page.selectOption("select#colors", "blue");
// single selection matching both the value and the label
page.selectOption("select#colors", new SelectOption().setLabel("Blue"));
// multiple selection
page.selectOption("select#colors", new String[] {"red", "green", "blue"});
```

```python
# Single selection matching the value or label
await page.select_option("select#colors", "blue")
# single selection matching the label
await page.select_option("select#colors", label="blue")
# multiple selection
await page.select_option("select#colors", value=["red", "green", "blue"])
```

```python
# Single selection matching the value or label
page.select_option("select#colors", "blue")
# single selection matching both the label
page.select_option("select#colors", label="blue")
# multiple selection
page.select_option("select#colors", value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await page.SelectOptionAsync("select#colors", new[] { "blue" });
// single selection matching both the value and the label
await page.SelectOptionAsync("select#colors", new[] { new SelectOptionValue() { Label = "blue" } });
// multiple
await page.SelectOptionAsync("select#colors", new[] { "red", "green", "blue" });
```

### param: Page.selectOption.selector = %%-input-selector-%%
* since: v1.8

### param: Page.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: Page.selectOption.force = %%-input-force-%%
* since: v1.13

### option: Page.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.selectOption.strict = %%-input-strict-%%
* since: v1.14

### option: Page.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### option: Page.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: Page.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### option: Page.selectOption.label = %%-python-select-options-label-%%
* since: v1.8
