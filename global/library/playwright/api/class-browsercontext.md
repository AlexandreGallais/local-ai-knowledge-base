---
title: "class: BrowserContext (part 1 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsercontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserContext
* since: v1.8

BrowserContexts provide a way to operate multiple independent browser sessions.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser
context.

Playwright allows creating isolated non-persistent browser contexts with [`method: Browser.newContext`] method. Non-persistent browser
contexts don't write any browsing data to disk.

```js
// Create a new incognito browser context
const context = await browser.newContext();
// Create a new page inside context.
const page = await context.newPage();
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

```java
// Create a new incognito browser context
BrowserContext context = browser.newContext();
// Create a new page inside context.
Page page = context.newPage();
page.navigate("https://example.com");
// Dispose context once it is no longer needed.
context.close();
```

```python
# create a new incognito browser context
context = await browser.new_context()
# create a new page inside context.
page = await context.new_page()
await page.goto("https://example.com")
# dispose context once it is no longer needed.
await context.close()
```

```python
# create a new incognito browser context
context = browser.new_context()
# create a new page inside context.
page = context.new_page()
page.goto("https://example.com")
# dispose context once it is no longer needed.
context.close()
```

```csharp
using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Firefox.LaunchAsync(new() { Headless = false });
// Create a new incognito browser context
var context = await browser.NewContextAsync();
// Create a new page inside context.
var page = await context.NewPageAsync();
await page.GotoAsync("https://bing.com");
// Dispose context once it is no longer needed.
await context.CloseAsync();
```

## event: BrowserContext.backgroundPage
* since: v1.11
* deprecated: Background pages have been removed from Chromium together with Manifest V2 extensions.
- argument: <[Page]>

This event is not emitted.

## property: BrowserContext.clock
* since: v1.45
- type: <[Clock]>

Playwright has ability to mock clock and passage of time.

## property: BrowserContext.credentials
* since: v1.61
- type: <[Credentials]>

Virtual WebAuthn authenticator for this context. Lets tests seed credentials and intercept
`navigator.credentials.create()` / `navigator.credentials.get()` ceremonies.

## property: BrowserContext.debugger
* since: v1.59
- type: <[Debugger]>

Debugger allows to pause and resume the execution.

## event: BrowserContext.close
* since: v1.8
- argument: <[BrowserContext]>

Emitted when Browser context gets closed. This might happen because of one of the following:
* Browser context is closed.
* Browser application is closed or crashed.
* The [`method: Browser.close`] method was called.

### option: BrowserContext.close.reason
* since: v1.40
- `reason` <[string]>

The reason to be reported to the operations interrupted by the context closure.

## event: BrowserContext.console
* since: v1.34
* langs:
  - alias-java: consoleMessage
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` and the page are available on the [ConsoleMessage] event handler argument.

**Usage**

```js
context.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

```java
context.onConsoleMessage(msg -> {
  for (int i = 0; i < msg.args().size(); ++i)
    System.out.println(i + ": " + msg.args().get(i).jsonValue());
});
page.evaluate("() => console.log('hello', 5, { foo: 'bar' })");
```

```python
async def print_args(msg):
    values = []
    for arg in msg.args:
        values.append(await arg.json_value())
    print(values)

context.on("console", print_args)
await page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```python
def print_args(msg):
    for arg in msg.args:
        print(arg.json_value())

context.on("console", print_args)
page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```csharp
context.Console += async (_, msg) =>
{
    foreach (var arg in msg.Args)
        Console.WriteLine(await arg.JsonValueAsync<object>());
};

await page.EvaluateAsync("console.log('hello', 5, { foo: 'bar' })");
```

## event: BrowserContext.dialog
* since: v1.34
- argument: <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise the page will freeze waiting for the dialog, and actions like click will never finish.

**Usage**

```js
context.on('dialog', dialog => {
  dialog.accept();
});
```

```java
context.onDialog(dialog -> {
  dialog.accept();
});
```

```python
context.on("dialog", lambda dialog: dialog.accept())
```

```csharp
Context.Dialog += async (_, dialog) =>
{
    await dialog.AcceptAsync();
};
```

:::note
When no [`event: Page.dialog`] or [`event: BrowserContext.dialog`] listeners are present, all dialogs are automatically dismissed.
:::

## event: BrowserContext.dialogClosed
* since: v1.63
- argument: <[Dialog]>

Emitted when a JavaScript dialog in any page belonging to this context has been closed, either by [`method: Dialog.accept`], by [`method: Dialog.dismiss`], or manually by the user in the headed browser.

## event: BrowserContext.download
* since: v1.60
- argument: <[Download]>

Emitted when attachment download started in any page belonging to this context. User can access basic file operations on downloaded content via the passed [Download] instance. See also [`event: Page.download`] to receive events about a specific page.

## event: BrowserContext.frameAttached
* since: v1.60
- argument: <[Frame]>

Emitted when a frame is attached in any page belonging to this context. See also [`event: Page.frameAttached`] to receive events about a specific page.

## event: BrowserContext.frameDetached
* since: v1.60
- argument: <[Frame]>

Emitted when a frame is detached in any page belonging to this context. See also [`event: Page.frameDetached`] to receive events about a specific page.

## event: BrowserContext.frameNavigated
* since: v1.60
- argument: <[Frame]>

Emitted when a frame is navigated to a new url in any page belonging to this context. See also [`event: Page.frameNavigated`] to receive events about navigations in a specific page.

## event: BrowserContext.page
* since: v1.8
- argument: <[Page]>

The event is emitted when a new Page is created in the BrowserContext. The page may still be loading. The event will
also fire for popup pages. See also [`event: Page.popup`] to receive events about popups relevant to a specific page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is
done and its response has started loading in the popup. If you would like to route/listen to this network request, use [`method: BrowserContext.route`] and [`event: BrowserContext.request`] respectively instead of similar methods on the [Page].

```js
const newPagePromise = context.waitForEvent('page');
await page.getByText('open new page').click();
const newPage = await newPagePromise;
console.log(await newPage.evaluate('location.href'));
```

```java
Page newPage = context.waitForPage(() -> {
  page.getByText("open new page").click();
});
System.out.println(newPage.evaluate("location.href"));
```

```python
async with context.expect_page() as page_info:
    await page.get_by_text("open new page").click(),
page = await page_info.value
print(await page.evaluate("location.href"))
```

```python
with context.expect_page() as page_info:
    page.get_by_text("open new page").click(),
page = page_info.value
print(page.evaluate("location.href"))
```

```csharp
var popup = await context.RunAndWaitForPageAsync(async =>
{
    await page.GetByText("open new page").ClickAsync();
});
Console.WriteLine(await popup.EvaluateAsync<string>("location.href"));
```

:::note
Use [`method: Page.waitForLoadState`] to wait until the page gets to a particular state (you should not need it in most
cases).
:::

## event: BrowserContext.pageClose
* since: v1.60
- argument: <[Page]>

Emitted when a page in this context is closed. See also [`event: Page.close`] to receive events about a specific page.

## event: BrowserContext.pageLoad
* since: v1.60
- argument: <[Page]>

Emitted when the JavaScript `load` event is dispatched in any page belonging to this context. See also [`event: Page.load`] to receive events about a specific page.

## event: BrowserContext.webError
* since: v1.38
- argument: <[WebError]>

Emitted when exception is unhandled in any of the pages in this
context. To listen for errors from a particular page, use [`event: Page.pageError`] instead.

## event: BrowserContext.request
* since: v1.12
- argument: <[Request]>

Emitted when a request is issued from any pages created through this context.
The [request] object is read-only. To only listen for requests from a particular
page, use [`event: Page.request`].

In order to intercept and mutate requests, see [`method: BrowserContext.route`]
or [`method: Page.route`].

## event: BrowserContext.requestFailed
* since: v1.12
- argument: <[Request]>

Emitted when a request fails, for example by timing out. To only listen for
failed requests from a particular page, use [`event: Page.requestFailed`].

:::note
HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete
with [`event: BrowserContext.requestFinished`] event and not with [`event: BrowserContext.requestFailed`].
:::

## event: BrowserContext.requestFinished
* since: v1.12
- argument: <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the
sequence of events is `request`, `response` and `requestfinished`. To listen for
successful requests from a particular page, use [`event: Page.requestFinished`].

## event: BrowserContext.response
* since: v1.12
- argument: <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events
is `request`, `response` and `requestfinished`. To listen for response events
from a particular page, use [`event: Page.response`].

## event: BrowserContext.serviceWorker
* since: v1.11
* langs: js, python
- argument: <[Worker]>

:::note
Service workers are only supported on Chromium-based browsers.
:::

Emitted when new service worker is created in the context.

## async method: BrowserContext.addCookies
* since: v1.8

Adds cookies into this browser context. All pages within this context will have these cookies installed. Cookies can be
obtained via [`method: BrowserContext.cookies`].

**Usage**

```js
await browserContext.addCookies([cookieObject1, cookieObject2]);
```

```java
browserContext.addCookies(Arrays.asList(cookieObject1, cookieObject2));
```

```python
await browser_context.add_cookies([cookie_object1, cookie_object2])
```

```python
browser_context.add_cookies([cookie_object1, cookie_object2])
```

```csharp
await context.AddCookiesAsync(new[] { cookie1, cookie2 });
```

### param: BrowserContext.addCookies.cookies = %%-add-cookies-param-%%
* since: v1.8

## async method: BrowserContext.addInitScript
* since: v1.8
- returns: <[Disposable]>

Adds a script which would be evaluated in one of the following scenarios:
* Whenever a page is created in the browser context or is navigated.
* Whenever a child frame is attached or navigated in any page in the browser context. In this case, the script is
  evaluated in the context of the newly attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend
the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same directory.
await browserContext.addInitScript({
  path: 'preload.js'
});
```

```java
// In your playwright script, assuming the preload.js file is in same directory.
browserContext.addInitScript(Paths.get("preload.js"));
```

```python
# in your playwright script, assuming the preload.js file is in same directory.
await browser_context.add_init_script(path="preload.js")
```

```python
# in your playwright script, assuming the preload.js file is in same directory.
browser_context.add_init_script(path="preload.js")
```

```csharp
await Context.AddInitScriptAsync(scriptPath: "preload.js");
```

:::note
The order of evaluation of multiple scripts installed via [`method: BrowserContext.addInitScript`] and
[`method: Page.addInitScript`] is not defined.
:::

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: js
- `script` <[function]|[string]|[Object]>
  - `path` ?<[path]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the
    current working directory. Optional.
  - `content` ?<[string]> Raw script content. Optional.

Script to be evaluated in all pages in the browser context.

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: csharp, java
- `script` <[string]|[path]>

Script to be evaluated in all pages in the browser context.

### param: BrowserContext.addInitScript.arg
* since: v1.8
* langs: js
- `arg` ?<[Serializable]>

Optional argument to pass to [`param: script`] (only supported when passing a function).

### option: BrowserContext.addInitScript.path
* since: v1.8
* langs: python
- `path` ?<[path]>

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.

### param: BrowserContext.addInitScript.script
* since: v1.8
* langs: python
- `script` ?<[string]>

Script to be evaluated in all pages in the browser context. Optional.

### option: BrowserContext.addInitScript.exposeFunctions = %%-js-init-script-expose-functions-%%
* since: v1.62

## method: BrowserContext.backgroundPages
* since: v1.11
* deprecated: Background pages have been removed from Chromium together with Manifest V2 extensions.
- returns: <[Array]<[Page]>>

Returns an empty list.

## method: BrowserContext.browser
* since: v1.8
- returns: <[null]|[Browser]>

Gets the browser instance that owns the context. Returns `null` if the context is created outside of normal browser, e.g. Android or Electron.
