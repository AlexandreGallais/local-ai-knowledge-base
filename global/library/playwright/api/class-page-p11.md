---
title: "class: Page (part 11 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 11 of 14)

## async method: Page.unroute
* since: v1.8

Removes a route created with [`method: Page.route`]. When [`param: handler`] is not specified, removes all routes for
the [`param: url`].

### param: Page.unroute.url
* since: v1.8
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL] to match while routing.

### param: Page.unroute.url
* since: v1.8
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate receiving [URL] to match while routing.

### param: Page.unroute.handler
* since: v1.8
* langs: js
- `handler` ?<[function]\([Route], [Request]\): [Promise<any>|any]>

Optional handler function to route the request.

### param: Page.unroute.handler
* since: v1.8
* langs: python
- `handler` ?<[function]\([Route]\)|[function]\([Route], [Request]\)>

Optional handler function to route the request.

### param: Page.unroute.handler
* since: v1.8
* langs: csharp, java
- `handler` ?<[function]\([Route]\)>

Optional handler function to route the request.

## method: Page.url
* since: v1.8
- returns: <[string]>

## method: Page.video
* since: v1.8
- returns: <[null]|[Video]>

Video object associated with this page. Can be used to access the video file when using the `recordVideo` context option.

## method: Page.viewportSize
* since: v1.8
- returns: "ViewportSize" <[null]|[Object]>
  * alias-csharp: PageViewportSizeResult
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

## async method: Page.waitForClose
* since: v1.11
* langs: java
- returns: <[Page]>

Performs action and waits for the Page to close.

### option: Page.waitForClose.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForClose.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForConsoleMessage
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_console_message
  - alias-csharp: RunAndWaitForConsoleMessage
- returns: <[ConsoleMessage]>

Performs action and waits for a [ConsoleMessage] to be logged by in the page. If predicate is provided, it passes
[ConsoleMessage] value into the `predicate` function and waits for `predicate(message)` to return a truthy value.
Will throw an error if the page is closed before the [`event: Page.console`] event is fired.

## async method: Page.waitForConsoleMessage
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[ConsoleMessage]>>

**Usage**

```python
async with page.expect_console_message() as message_info:
    await page.get_by_role("button").click()

message = await message_info.value
print(message.text)
```

```python
with page.expect_console_message() as message_info:
    page.get_by_role("button").click()

message = message_info.value
print(message.text)
```

### param: Page.waitForConsoleMessage.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForConsoleMessage.predicate
* since: v1.9
- `predicate` <[function]\([ConsoleMessage]\):[boolean]>

Receives the [ConsoleMessage] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForConsoleMessage.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForConsoleMessage.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForDownload
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_download
  - alias-csharp: RunAndWaitForDownload
- returns: <[Download]>

Performs action and waits for a new [Download]. If predicate is provided, it passes
[Download] value into the `predicate` function and waits for `predicate(download)` to return a truthy value.
Will throw an error if the page is closed before the download event is fired.

## async method: Page.waitForDownload
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Download]>>

**Usage**

```python
async with page.expect_download() as download_info:
    await page.get_by_text("Download").click()

download = await download_info.value
print(download.url)
```

```python
with page.expect_download() as download_info:
    page.get_by_text("Download").click()

download = download_info.value
print(download.url)
```

### param: Page.waitForDownload.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForDownload.predicate
* since: v1.9
- `predicate` <[function]\([Download]\):[boolean]>

Receives the [Download] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForDownload.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForDownload.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForEvent
* since: v1.8
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy
value. Will throw an error if the page is closed before the event is fired. Returns the event data value.

**Usage**

```js
// Start waiting for download before clicking. Note no await.
const downloadPromise = page.waitForEvent('download');
await page.getByText('Download file').click();
const download = await downloadPromise;
```

```python
async with page.expect_event("framenavigated") as event_info:
    await page.get_by_role("button")
frame = await event_info.value
```

```python
with page.expect_event("framenavigated") as event_info:
    page.get_by_role("button")
frame = event_info.value
```

## async method: Page.waitForEvent
* since: v1.8
* langs: python
- returns: <[EventContextManager]>

### param: Page.waitForEvent.event = %%-wait-for-event-event-%%
* since: v1.8

### param: Page.waitForEvent.optionsOrPredicate
* since: v1.8
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

Either a predicate that receives an event or an options object. Optional.

### option: Page.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: Page.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.8

## async method: Page.waitForFileChooser
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_file_chooser
  - alias-csharp: RunAndWaitForFileChooser
- returns: <[FileChooser]>

Performs action and waits for a new [FileChooser] to be created. If predicate is provided, it passes
[FileChooser] value into the `predicate` function and waits for `predicate(fileChooser)` to return a truthy value.
Will throw an error if the page is closed before the file chooser is opened.

## async method: Page.waitForFileChooser
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[FileChooser]>>

**Usage**

```python
async with page.expect_file_chooser() as fc_info:
    await page.get_by_text("Upload").click()

file_chooser = await fc_info.value
await file_chooser.set_files("myfile.pdf")
```

```python
with page.expect_file_chooser() as fc_info:
    page.get_by_text("Upload").click()

file_chooser = fc_info.value
file_chooser.set_files("myfile.pdf")
```

### param: Page.waitForFileChooser.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForFileChooser.predicate
* since: v1.9
- `predicate` <[function]\([FileChooser]\):[boolean]>

Receives the [FileChooser] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForFileChooser.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForFileChooser.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForFunction
* since: v1.8
- returns: <[JSHandle]>

Returns when the [`param: expression`] returns a truthy value. It resolves to a JSHandle of the truthy value.

**Usage**

The [`method: Page.waitForFunction`] can be used to observe viewport size change:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  const watchDog = page.waitForFunction(() => window.innerWidth < 100);
  await page.setViewportSize({ width: 50, height: 50 });
  await watchDog;
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
      Page page = browser.newPage();
      page.setViewportSize(50,  50);
      page.waitForFunction("() => window.innerWidth < 100");
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
    page = await browser.new_page()
    await page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    await page.wait_for_function("() => window.x > 0")
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
    page = browser.new_page()
    page.evaluate("window.x = 0; setTimeout(() => { window.x = 100 }, 1000);")
    page.wait_for_function("() => window.x > 0")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class FrameExamples
{
  public static async Task WaitForFunction()
  {
    using var playwright = await Playwright.CreateAsync();
    await using var browser = await playwright.Webkit.LaunchAsync();
    var page = await browser.NewPageAsync();
    await page.SetViewportSizeAsync(50, 50);
    await page.MainFrame.WaitForFunctionAsync("window.innerWidth < 100");
  }
}
```

To pass an argument to the predicate of [`method: Page.waitForFunction`] function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), selector);
```

```java
String selector = ".foo";
page.waitForFunction("selector => !!document.querySelector(selector)", selector);
```

```python
selector = ".foo"
await page.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```python
selector = ".foo"
page.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```csharp
var selector = ".foo";
await page.WaitForFunctionAsync("selector => !!document.querySelector(selector)", selector);
```

### param: Page.waitForFunction.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.waitForFunction.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.waitForFunction.arg
* since: v1.8
* langs: js, java, csharp
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.waitForFunction.arg
* since: v1.8
* langs: python
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.waitForFunction.polling = %%-js-python-wait-for-function-polling-%%
* since: v1.8

### option: Page.waitForFunction.polling = %%-csharp-java-wait-for-function-polling-%%
* since: v1.8

### option: Page.waitForFunction.timeout = %%-wait-for-function-timeout-%%
* since: v1.8

### option: Page.waitForFunction.timeout = %%-wait-for-function-timeout-js-%%
* since: v1.8
