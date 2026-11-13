---
title: "class: Page (part 1 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page
* since: v1.8

Page provides methods to interact with a single tab in a [Browser], or an
extension background page in Chromium. One [Browser]
instance might have multiple [Page] instances.

This example creates a page, navigates it to a URL, and then saves a screenshot:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch();
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      page.navigate("https://example.com");
      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("screenshot.png")));
      browser.close();
    }
  }
}
```

```python
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch()
    context = await browser.new_context()
    page = await context.new_page()
    await page.goto("https://example.com")
    await page.screenshot(path="screenshot.png")
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch()
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://example.com")
    page.screenshot(path="screenshot.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Run()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.GotoAsync("https://www.theverge.com");
        await page.ScreenshotAsync(new() { Path = "theverge.png" });
    }
}
```

The Page class emits various events (described below) which can be handled using any of Node's native
`EventEmitter` methods, such as `on`, `once` or
`removeListener`.

This example logs a message for a single page `load` event:

```js
page.once('load', () => console.log('Page loaded!'));
```

```java
page.onLoad(p -> System.out.println("Page loaded!"));
```

```py
page.once("load", lambda: print("page loaded!"))
```

```csharp
page.Load += (_, _) => Console.WriteLine("Page loaded!");
```

To unsubscribe from events use the `removeListener` method:

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.removeListener('request', logRequest);
```

```java
Consumer<Request> logRequest = interceptedRequest -> {
  System.out.println("A request was made: " + interceptedRequest.url());
};
page.onRequest(logRequest);
// Sometime later...
page.offRequest(logRequest);
```

```py
def log_request(intercepted_request):
    print("a request was made:", intercepted_request.url)
page.on("request", log_request)
# sometime later...
page.remove_listener("request", log_request)
```

```csharp
void PageLoadHandler(object _, IPage p) {
    Console.WriteLine("Page loaded!");
};

page.Load += PageLoadHandler;
// Do some work...
page.Load -= PageLoadHandler;
```

## property: Page.clock
* since: v1.45
- type: <[Clock]>

Playwright has ability to mock clock and passage of time.

## event: Page.close
* since: v1.8
- argument: <[Page]>

Emitted when the page closes.

## event: Page.console
* since: v1.8
* langs:
  - alias-java: consoleMessage
- argument: <[ConsoleMessage]>

Emitted when JavaScript within the page calls one of console API methods, e.g. `console.log` or `console.dir`.

The arguments passed into `console.log` are available on the [ConsoleMessage] event handler argument.

**Usage**

```js
page.on('console', async msg => {
  const values = [];
  for (const arg of msg.args())
    values.push(await arg.jsonValue());
  console.log(...values);
});
await page.evaluate(() => console.log('hello', 5, { foo: 'bar' }));
```

```java
page.onConsoleMessage(msg -> {
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

page.on("console", print_args)
await page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```python
def print_args(msg):
    for arg in msg.args:
        print(arg.json_value())

page.on("console", print_args)
page.evaluate("console.log('hello', 5, { foo: 'bar' })")
```

```csharp
page.Console += async (_, msg) =>
{
    foreach (var arg in msg.Args)
        Console.WriteLine(await arg.JsonValueAsync<object>());
};

await page.EvaluateAsync("console.log('hello', 5, { foo: 'bar' })");
```

## event: Page.crash
* since: v1.8
- argument: <[Page]>

Emitted when the page crashes. Browser pages might crash if they try to allocate too much memory. When the page crashes,
ongoing and subsequent operations will throw.

The most common way to deal with crashes is to catch an exception:

```js
try {
  // Crash might happen during a click.
  await page.click('button');
  // Or while waiting for an event.
  await page.waitForEvent('popup');
} catch (e) {
  // When the page crashes, exception message contains 'crash'.
}
```

```java
try {
  // Crash might happen during a click.
  page.click("button");
  // Or while waiting for an event.
  page.waitForPopup(() -> {});
} catch (PlaywrightException e) {
  // When the page crashes, exception message contains "crash".
}
```

```python
try:
    # crash might happen during a click.
    await page.click("button")
    # or while waiting for an event.
    await page.wait_for_event("popup")
except Error as e:
    pass
    # when the page crashes, exception message contains "crash".
```

```python
try:
    # crash might happen during a click.
    page.click("button")
    # or while waiting for an event.
    page.wait_for_event("popup")
except Error as e:
    pass
    # when the page crashes, exception message contains "crash".
```

```csharp
try {
  // Crash might happen during a click.
  await page.ClickAsync("button");
  // Or while waiting for an event.
  await page.WaitForPopup();
} catch (PlaywrightException e) {
  // When the page crashes, exception message contains "crash".
}
```

## event: Page.dialog
* since: v1.8
- argument: <[Dialog]>

Emitted when a JavaScript dialog appears, such as `alert`, `prompt`, `confirm` or `beforeunload`. Listener **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise the page will freeze waiting for the dialog, and actions like click will never finish.

**Usage**

```js
page.on('dialog', dialog => dialog.accept());
```

```java
page.onDialog(dialog -> {
  dialog.accept();
});
```

```python
page.on("dialog", lambda dialog: dialog.accept())
```

```csharp
page.RequestFailed += (_, request) =>
{
    Console.WriteLine(request.Url + " " + request.Failure);
};
```

:::note
When no [`event: Page.dialog`] or [`event: BrowserContext.dialog`] listeners are present, all dialogs are automatically dismissed.
:::

## event: Page.dialogClosed
* since: v1.63
- argument: <[Dialog]>

Emitted when a JavaScript dialog has been closed, either by [`method: Dialog.accept`], by [`method: Dialog.dismiss`], or manually by the user in the headed browser.

## event: Page.DOMContentLoaded
* since: v1.9
- argument: <[Page]>

Emitted when the JavaScript `DOMContentLoaded`
event is dispatched.

## event: Page.download
* since: v1.8
- argument: <[Download]>

Emitted when attachment download started. User can access basic file operations on downloaded content via the passed
[Download] instance.

## event: Page.fileChooser
* since: v1.9
- argument: <[FileChooser]>

Emitted when a file chooser is supposed to appear, such as after clicking the  ``. Playwright can
respond to it via setting the input files using [`method: FileChooser.setFiles`] that can be uploaded after that.

```js
page.on('filechooser', async fileChooser => {
  await fileChooser.setFiles(path.join(__dirname, '/tmp/myfile.pdf'));
});
```

```java
page.onFileChooser(fileChooser -> {
  fileChooser.setFiles(Paths.get("/tmp/myfile.pdf"));
});
```

```py
page.on("filechooser", lambda file_chooser: file_chooser.set_files("/tmp/myfile.pdf"))
```

```csharp
page.FileChooser += (_, fileChooser) =>
{
    fileChooser.SetFilesAsync(@"C:\temp\myfile.pdf");
};
```

## event: Page.frameAttached
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is attached.

## event: Page.frameDetached
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is detached.

## event: Page.frameNavigated
* since: v1.9
- argument: <[Frame]>

Emitted when a frame is navigated to a new url.

## event: Page.load
* since: v1.8
- argument: <[Page]>

Emitted when the JavaScript `load` event is dispatched.

## event: Page.pageError
* since: v1.9
- argument: <[Error]>

Emitted when an uncaught exception happens within the page.

```js
// Log all uncaught errors to the terminal
page.on('pageerror', exception => {
  console.log(`Uncaught exception: "${exception}"`);
});

// Navigate to a page with an exception.
await page.goto('data:text/html,<script>throw new Error("Test")</script>');
```

```java
// Log all uncaught errors to the terminal
page.onPageError(exception -> {
  System.out.println("Uncaught exception: " + exception);
});

// Navigate to a page with an exception.
page.navigate("data:text/html,<script>throw new Error('Test')</script>");
```

```python
# Log all uncaught errors to the terminal
page.on("pageerror", lambda exc: print(f"uncaught exception: {exc}"))

# Navigate to a page with an exception.
await page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```python
# Log all uncaught errors to the terminal
page.on("pageerror", lambda exc: print(f"uncaught exception: {exc}"))

# Navigate to a page with an exception.
page.goto("data:text/html,<script>throw new Error('test')</script>")
```

```csharp
// Log all uncaught errors to the terminal
page.PageError += (_, exception) =>
{
  Console.WriteLine("Uncaught exception: " + exception);
};
```

## event: Page.pageError
* since: v1.9
* langs: csharp, java
- argument: <[string]>

## event: Page.popup
* since: v1.8
- argument: <[Page]>

Emitted when the page opens a new tab or window. This event is emitted in addition to the
[`event: BrowserContext.page`], but only for popups relevant to this page.

The earliest moment that page is available is when it has navigated to the initial url. For example, when opening a
popup with `window.open('http://example.com')`, this event will fire when the network request to "http://example.com" is
done and its response has started loading in the popup. If you would like to route/listen to this network request, use [`method: BrowserContext.route`] and [`event: BrowserContext.request`] respectively instead of similar methods on the [Page].

```js
// Start waiting for popup before clicking. Note no await.
const popupPromise = page.waitForEvent('popup');
await page.getByText('open the popup').click();
const popup = await popupPromise;
console.log(await popup.evaluate('location.href'));
```

```java
Page popup = page.waitForPopup(() -> {
  page.getByText("open the popup").click();
});
System.out.println(popup.evaluate("location.href"));
```

```python
async with page.expect_event("popup") as page_info:
    await page.get_by_text("open the popup").click()
popup = await page_info.value
print(await popup.evaluate("location.href"))
```

```python
with page.expect_event("popup") as page_info:
    page.get_by_text("open the popup").click()
popup = page_info.value
print(popup.evaluate("location.href"))
```

```csharp
var popup = await page.RunAndWaitForPopupAsync(async () =>
{
    await page.GetByText("open the popup").ClickAsync();
});
Console.WriteLine(await popup.EvaluateAsync<string>("location.href"));
```

:::note
Use [`method: Page.waitForLoadState`] to wait until the page gets to a particular state (you should not need it in most
cases).
:::

## event: Page.request
* since: v1.8
- argument: <[Request]>

Emitted when a page issues a request. The [request] object is read-only. In order to intercept and mutate requests, see
[`method: Page.route`] or [`method: BrowserContext.route`].

## event: Page.requestFailed
* since: v1.9
- argument: <[Request]>

Emitted when a request fails, for example by timing out.

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

```java
page.onRequestFailed(request -> {
  System.out.println(request.url() + " " + request.failure());
});
```

```python
page.on("requestfailed", lambda request: print(request.url + " " + request.failure.error_text))
```

:::note
HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete
with [`event: Page.requestFinished`] event and not with [`event: Page.requestFailed`]. A request will only be considered
failed when the client cannot get an HTTP response from the server, e.g. due to network error net::ERR_FAILED.
:::

## event: Page.requestFinished
* since: v1.9
- argument: <[Request]>

Emitted when a request finishes successfully after downloading the response body. For a successful response, the
sequence of events is `request`, `response` and `requestfinished`.

## event: Page.response
* since: v1.8
- argument: <[Response]>

Emitted when [response] status and headers are received for a request. For a successful response, the sequence of events
is `request`, `response` and `requestfinished`.

## event: Page.webSocket
* since: v1.9
- argument: <[WebSocket]>

Emitted when [WebSocket] request is sent.

## event: Page.worker
* since: v1.8
- argument: <[Worker]>

Emitted when a dedicated WebWorker is spawned by the
page.
