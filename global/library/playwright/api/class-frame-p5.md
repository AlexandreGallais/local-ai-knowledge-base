---
title: "class: Frame (part 5 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-frame.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Frame (part 5 of 5)

## method: Frame.url
* since: v1.8
- returns: <[string]>

Returns frame's url.

## async method: Frame.waitForFunction
* since: v1.8
- returns: <[JSHandle]>

Returns when the [`param: expression`] returns a truthy value, returns that value.

**Usage**

The [`method: Frame.waitForFunction`] can be used to observe viewport size change:

```js
const { firefox } = require('playwright');  // Or 'chromium' or 'webkit'.

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
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
      BrowserType firefox = playwright.firefox();
      Browser browser = firefox.launch();
      Page page = browser.newPage();
      page.setViewportSize(50, 50);
      page.mainFrame().waitForFunction("window.innerWidth < 100");
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
    await page.main_frame.wait_for_function("() => window.x > 0")
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
    page.main_frame.wait_for_function("() => window.x > 0")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class FrameExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Firefox.LaunchAsync();
        var page = await browser.NewPageAsync();
        await page.SetViewportSizeAsync(50, 50);
        await page.MainFrame.WaitForFunctionAsync("window.innerWidth < 100");
    }
}
```

To pass an argument to the predicate of `frame.waitForFunction` function:

```js
const selector = '.foo';
await frame.waitForFunction(selector => !!document.querySelector(selector), selector);
```

```java
String selector = ".foo";
frame.waitForFunction("selector => !!document.querySelector(selector)", selector);
```

```python
selector = ".foo"
await frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```python
selector = ".foo"
frame.wait_for_function("selector => !!document.querySelector(selector)", selector)
```

```csharp
var selector = ".foo";
await page.MainFrame.WaitForFunctionAsync("selector => !!document.querySelector(selector)", selector);
```

### param: Frame.waitForFunction.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Frame.waitForFunction.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Frame.waitForFunction.arg
* since: v1.8
* langs: js, java, csharp
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.waitForFunction.arg
* since: v1.8
* langs: python
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Frame.waitForFunction.polling = %%-js-python-wait-for-function-polling-%%
* since: v1.8

### option: Frame.waitForFunction.polling = %%-csharp-java-wait-for-function-polling-%%
* since: v1.8

### option: Frame.waitForFunction.timeout = %%-wait-for-function-timeout-%%
* since: v1.8

### option: Frame.waitForFunction.timeout = %%-wait-for-function-timeout-js-%%
* since: v1.8

## async method: Frame.waitForLoadState
* since: v1.8

Waits for the required load state to be reached.

This returns when the frame reaches a required load state, `load` by default. The navigation must have been committed
when this method is called. If current document has already reached the required state, resolves immediately.

:::note
Most of the time, this method is not needed because Playwright auto-waits before every action.
:::

**Usage**

```js
await frame.click('button'); // Click triggers navigation.
await frame.waitForLoadState(); // Waits for 'load' state by default.
```

```java
frame.click("button"); // Click triggers navigation.
frame.waitForLoadState(); // Waits for "load" state by default.
```

```python
await frame.click("button") # click triggers navigation.
await frame.wait_for_load_state() # the promise resolves after "load" event.
```

```python
frame.click("button") # click triggers navigation.
frame.wait_for_load_state() # the promise resolves after "load" event.
```

```csharp
await frame.ClickAsync("button");
await frame.WaitForLoadStateAsync(); // Defaults to LoadState.Load
```

### param: Frame.waitForLoadState.state = %%-wait-for-load-state-state-%%
* since: v1.8

### option: Frame.waitForLoadState.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.waitForLoadState.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Frame.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Frame.waitForURL`] instead.
* langs:
  * alias-python: expect_navigation
  * alias-csharp: RunAndWaitForNavigation
- returns: <[null]|[Response]>

Waits for the frame navigation and returns the main resource response. In case of multiple redirects, the navigation
will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to
History API usage, the navigation will resolve with `null`.

**Usage**

This method waits for the frame to navigate to a new URL. It is useful for when you run code which will indirectly cause
the frame to navigate. Consider this example:

```js
// Start waiting for navigation before clicking. Note no await.
const navigationPromise = page.waitForNavigation();
await page.getByText('Navigate after timeout').click();
await navigationPromise;
```

```java
// The method returns after navigation has finished
frame.waitForNavigation(() -> {
  // Clicking the link will indirectly cause a navigation
  frame.click("a.delayed-navigation");
});
```

```python
async with frame.expect_navigation():
    await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

```python
with frame.expect_navigation():
    frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
# Resolves after navigation has finished
```

```csharp
await frame.RunAndWaitForNavigationAsync(async () =>
{
    // Clicking the link will indirectly cause a navigation.
    await frame.ClickAsync("a.delayed-navigation");
});

// Resolves after navigation has finished
```

:::note
Usage of the History API to change the URL is considered
a navigation.
:::

## async method: Frame.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Frame.waitForURL`] instead.
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Frame.waitForNavigation.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Frame.waitForNavigation.url = %%-js-wait-for-navigation-url-%%
* since: v1.8

### option: Frame.waitForNavigation.url = %%-python-csharp-java-wait-for-navigation-url-%%
* since: v1.8

### option: Frame.waitForNavigation.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Frame.waitForNavigation.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.waitForNavigation.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### param: Frame.waitForNavigation.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Frame.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
  Read more about locators.
- returns: <[null]|[ElementHandle]>

Returns when element specified by selector satisfies [`option: state`] option. Returns `null` if waiting for `hidden` or
`detached`.

:::note
Playwright automatically waits for element to be ready before performing an action. Using
[Locator] objects and web-first assertions make the code wait-for-selector-free.
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
    const element = await page.mainFrame().waitForSelector('img');
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
        ElementHandle element = page.mainFrame().waitForSelector("img");
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
        element = await page.main_frame.wait_for_selector("img")
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
        element = page.main_frame.wait_for_selector("img")
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
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync();
        var page = await browser.NewPageAsync();

        foreach (var currentUrl in new[] { "https://www.google.com", "https://bbc.com" })
        {
            await page.GotoAsync(currentUrl);
            element = await page.MainFrame.WaitForSelectorAsync("img");
            Console.WriteLine($"Loaded image: {await element.GetAttributeAsync("src")}");
        }
    }
}
```

### param: Frame.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: Frame.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: Frame.waitForSelector.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.waitForTimeout
* since: v1.8
* discouraged: Never wait for timeout in production. Tests that wait for time are
  inherently flaky. Use [Locator] actions and web assertions that wait automatically.

Waits for the given [`param: timeout`] in milliseconds.

Note that `frame.waitForTimeout()` should only be used for debugging. Tests using the timer in production are going to
be flaky. Use signals such as network events, selectors becoming visible and others instead.

### param: Frame.waitForTimeout.timeout
* since: v1.8
- `timeout` <[float]>

A timeout to wait for

## async method: Frame.waitForURL
* since: v1.11

Waits for the frame to navigate to the given URL.

**Usage**

```js
await frame.click('a.delayed-navigation'); // Clicking the link will indirectly cause a navigation
await frame.waitForURL('**/target.html');
```

```java
frame.click("a.delayed-navigation"); // Clicking the link will indirectly cause a navigation
frame.waitForURL("**/target.html");
```

```python
await frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
await frame.wait_for_url("**/target.html")
```

```python
frame.click("a.delayed-navigation") # clicking the link will indirectly cause a navigation
frame.wait_for_url("**/target.html")
```

```csharp
await frame.ClickAsync("a.delayed-navigation"); // clicking the link will indirectly cause a navigation
await frame.WaitForURLAsync("**/target.html");
```

### param: Frame.waitForURL.url = %%-js-wait-for-navigation-url-%%
* since: v1.11

### param: Frame.waitForURL.url = %%-python-csharp-java-wait-for-navigation-url-%%
* since: v1.11

### option: Frame.waitForURL.timeout = %%-navigation-timeout-%%
* since: v1.11

### option: Frame.waitForURL.timeout = %%-navigation-timeout-js-%%
* since: v1.11

### option: Frame.waitForURL.waitUntil = %%-navigation-wait-until-%%
* since: v1.11

## property: Frame.webmcp
* since: v1.64
- type: <[WebMCP]>

Tools that the frame registers through the experimental WebMCP browser API. See [WebMCP] for details.
