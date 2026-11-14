---
title: "class: Page (part 13 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 13 of 14)

## async method: Page.waitForResponse
* since: v1.8
* langs:
  * alias-python: expect_response
  * alias-csharp: RunAndWaitForResponse
- returns: <[Response]>

Returns the matched response. See waiting for event for more details about events.

**Usage**

```js
// Start waiting for response before clicking. Note no await.
const responsePromise = page.waitForResponse('https://example.com/resource');
await page.getByText('trigger response').click();
const response = await responsePromise;

// Alternative way with a predicate. Note no await.
const responsePromise = page.waitForResponse(response =>
  response.url() === 'https://example.com' && response.status() === 200
      && response.request().method() === 'GET'
);
await page.getByText('trigger response').click();
const response = await responsePromise;
```

```java
// Waits for the next response with the specified url
Response response = page.waitForResponse("https://example.com/resource", () -> {
  // Triggers the response
  page.getByText("trigger response").click();
});

// Waits for the next response matching some conditions
Response response = page.waitForResponse(response -> "https://example.com".equals(response.url()) && response.status() == 200 && "GET".equals(response.request().method()), () -> {
  // Triggers the response
  page.getByText("trigger response").click();
});
```

```python
async with page.expect_response("https://example.com/resource") as response_info:
    await page.get_by_text("trigger response").click()
response = await response_info.value
return response.ok

# or with a lambda
async with page.expect_response(lambda response: response.url == "https://example.com" and response.status == 200 and response.request.method == "get") as response_info:
    await page.get_by_text("trigger response").click()
response = await response_info.value
return response.ok
```

```python
with page.expect_response("https://example.com/resource") as response_info:
    page.get_by_text("trigger response").click()
response = response_info.value
return response.ok

# or with a lambda
with page.expect_response(lambda response: response.url == "https://example.com" and response.status == 200 and response.request.method == "get") as response_info:
    page.get_by_text("trigger response").click()
response = response_info.value
return response.ok
```

```csharp
// Waits for the next response with the specified url.
await page.RunAndWaitForResponseAsync(async () =>
{
    await page.GetByText("trigger response").ClickAsync();
}, "http://example.com/resource");

// Alternative way with a predicate.
await page.RunAndWaitForResponseAsync(async () =>
{
    await page.GetByText("trigger response").ClickAsync();
}, response => response.Url == "https://example.com" && response.Status == 200 && response.Request.Method == "GET");
```

## async method: Page.waitForResponse
* since: v1.8
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Page.waitForResponse.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### param: Page.waitForResponse.urlOrPredicate
* since: v1.8
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Response]\):[boolean]>

Request URL string, regex or predicate receiving [Response] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the `new URL()` constructor.

### param: Page.waitForResponse.urlOrPredicate
* since: v1.8
* langs: js, python
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Response]\):[boolean]|[Promise]<[boolean]>>

Request URL string, regex or predicate receiving [Response] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the `new URL()` constructor.

### option: Page.waitForResponse.timeout
* since: v1.8
- `timeout` <[float]>

Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be
changed by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

### param: Page.waitForResponse.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
  Read more about locators.
- returns: <[null]|[ElementHandle]>

Returns when element specified by selector satisfies [`option: state`] option. Returns `null` if waiting for `hidden` or
`detached`.

:::note
Playwright automatically waits for element to be ready before performing an action. Using
[Locator] objects and web-first assertions makes the code wait-for-selector-free.
:::

Wait for the [`param: selector`] to satisfy [`option: state`] option (either appear/disappear from dom, or become
visible/hidden). If at the moment of calling the method [`param: selector`] already satisfies the condition, the method
will return immediately. If the selector doesn't satisfy the condition for the [`option: timeout`] milliseconds, the
function will throw.

**Usage**

This method works across navigations:

```js
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'.

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const currentURL of ['https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
    const element = await page.waitForSelector('img');
    console.log('Loaded image: ' + await element.getAttribute('src'));
  }
  await browser.close();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      Browser browser = chromium.launch();
      Page page = browser.newPage();
      for (String currentURL : Arrays.asList("https://google.com", "https://bbc.com")) {
        page.navigate(currentURL);
        ElementHandle element = page.waitForSelector("img");
        System.out.println("Loaded image: " + element.getAttribute("src"));
      }
      browser.close();
    }
  }
}
```

```python
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = await chromium.launch()
    page = await browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        await page.goto(current_url, wait_until="domcontentloaded")
        element = await page.wait_for_selector("img")
        print("Loaded image: " + str(await element.get_attribute("src")))
    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    chromium = playwright.chromium
    browser = chromium.launch()
    page = browser.new_page()
    for current_url in ["https://google.com", "https://bbc.com"]:
        page.goto(current_url, wait_until="domcontentloaded")
        element = page.wait_for_selector("img")
        print("Loaded image: " + str(element.get_attribute("src")))
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Threading.Tasks;

class FrameExamples
{
  public static async Task Images()
  {
      using var playwright = await Playwright.CreateAsync();
      await using var browser = await playwright.Chromium.LaunchAsync();
      var page = await browser.NewPageAsync();

      foreach (var currentUrl in new[] { "https://www.google.com", "https://bbc.com" })
      {
          await page.GotoAsync(currentUrl);
          var element = await page.WaitForSelectorAsync("img");
          Console.WriteLine($"Loaded image: {await element.GetAttributeAsync("src")}");
      }

      await browser.CloseAsync();
  }
}
```

### param: Page.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: Page.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: Page.waitForSelector.strict = %%-input-strict-%%
* since: v1.14

### option: Page.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.waitForCondition
* since: v1.32
* langs: java

The method will block until the condition returns true. All Playwright events will
be dispatched while the method is waiting for the condition.

**Usage**

Use the method to wait for a condition that depends on page events:

```java
List<String> messages = new ArrayList<>();
page.onConsoleMessage(m -> messages.add(m.text()));
page.getByText("Submit button").click();
page.waitForCondition(() -> messages.size() > 3);
```

### param: Page.waitForCondition.condition
* since: v1.32
- `condition` <[BooleanSupplier]>

Condition to wait for.

### option: Page.waitForCondition.timeout = %%-wait-for-function-timeout-%%
* since: v1.32

## async method: Page.waitForTimeout
* since: v1.8
* discouraged: Never wait for timeout in production. Tests that wait for time are
  inherently flaky. Use [Locator] actions and web assertions that wait automatically.

Waits for the given [`param: timeout`] in milliseconds.

Note that `page.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to be
flaky. Use signals such as network events, selectors becoming visible and others instead.

**Usage**

```js
// wait for 1 second
await page.waitForTimeout(1000);
```

```java
// wait for 1 second
page.waitForTimeout(1000);
```

```python
# wait for 1 second
await page.wait_for_timeout(1000)
```

```python
# wait for 1 second
page.wait_for_timeout(1000)
```

```csharp
// Wait for 1 second
await page.WaitForTimeoutAsync(1000);
```

### param: Page.waitForTimeout.timeout
* since: v1.8
- `timeout` <[float]>

A timeout to wait for

## async method: Page.waitForURL
* since: v1.11

Waits for the main frame to navigate to the given URL.

**Usage**

```js
await page.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation
await page.waitForURL('**/target.html');
```

```java
page.click("a.delayed-navigation"); // Clicking the link will indirectly cause a navigation
page.waitForURL("**/target.html");
```

```python
await page.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
await page.wait_for_url("**/target.html")
```

```python
page.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
page.wait_for_url("**/target.html")
```

```csharp
await page.ClickAsync("a.delayed-navigation"); // clicking the link will indirectly cause a navigation
await page.WaitForURLAsync("**/target.html");
```

### param: Page.waitForURL.url = %%-js-wait-for-navigation-url-%%
* since: v1.11

### param: Page.waitForURL.url = %%-python-csharp-java-wait-for-navigation-url-%%
* since: v1.11

### option: Page.waitForURL.timeout = %%-navigation-timeout-%%
* since: v1.11

### option: Page.waitForURL.timeout = %%-navigation-timeout-js-%%
* since: v1.11

### option: Page.waitForURL.waitUntil = %%-navigation-wait-until-%%
* since: v1.11

## async method: Page.waitForWebSocket
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_websocket
  - alias-csharp: RunAndWaitForWebSocket
- returns: <[WebSocket]>

Performs action and waits for a new [WebSocket]. If predicate is provided, it passes
[WebSocket] value into the `predicate` function and waits for `predicate(webSocket)` to return a truthy value.
Will throw an error if the page is closed before the WebSocket event is fired.

## async method: Page.waitForWebSocket
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[WebSocket]>>

**Usage**

```python
async with page.expect_websocket() as ws_info:
    await page.get_by_text("Connect").click()

ws = await ws_info.value
print(ws.url)
```

```python
with page.expect_websocket() as ws_info:
    page.get_by_text("Connect").click()

ws = ws_info.value
print(ws.url)
```

### param: Page.waitForWebSocket.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForWebSocket.predicate
* since: v1.9
- `predicate` <[function]\([WebSocket]\):[boolean]>

Receives the [WebSocket] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForWebSocket.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForWebSocket.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForWorker
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_worker
  - alias-csharp: RunAndWaitForWorker
- returns: <[Worker]>

Performs action and waits for a new [Worker]. If predicate is provided, it passes
[Worker] value into the `predicate` function and waits for `predicate(worker)` to return a truthy value.
Will throw an error if the page is closed before the worker event is fired.

## async method: Page.waitForWorker
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Worker]>>

**Usage**

```python
async with page.expect_worker() as worker_info:
    await page.get_by_text("Start worker").click()

worker = await worker_info.value
print(worker.url)
```

```python
with page.expect_worker() as worker_info:
    page.get_by_text("Start worker").click()

worker = worker_info.value
print(worker.url)
```

### param: Page.waitForWorker.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForWorker.predicate
* since: v1.9
- `predicate` <[function]\([Worker]\):[boolean]>

Receives the [Worker] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForWorker.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForWorker.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## property: Page.webmcp
* since: v1.64
- type: <[WebMCP]>

Tools that the main frame registers through the experimental WebMCP browser API. Shortcut for [`property: Frame.webmcp`] of [`method: Page.mainFrame`], see [WebMCP] for details.

**Usage**

```js
const tools = await page.webmcp.tools();
const result = await page.webmcp.callTool('add', { a: 2, b: 40 });
```

## method: Page.workers
* since: v1.8
- returns: <[Array]<[Worker]>>

This method returns all of the dedicated WebWorkers
associated with the page.

:::note
This does not contain ServiceWorkers
:::
