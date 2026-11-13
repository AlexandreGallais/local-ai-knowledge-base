---
title: "class: Page (part 4 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 4 of 14)

## async method: Page.evaluate
* since: v1.8
- returns: <[Serializable]>

Returns the value of the [`param: expression`] invocation.

If the function passed to the [`method: Page.evaluate`] returns a [Promise], then [`method: Page.evaluate`] would wait
for the promise to resolve and return its value.

If the function passed to the [`method: Page.evaluate`] returns a non-[Serializable] value, then
[`method: Page.evaluate`] resolves to `undefined`. Playwright also supports transferring some
additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`.

**Usage**

Passing argument to [`param: expression`]:

```js
const result = await page.evaluate(([x, y]) => {
  return Promise.resolve(x * y);
}, [7, 8]);
console.log(result); // prints "56"
```

```java
Object result = page.evaluate("([x, y]) => {\n" +
  "  return Promise.resolve(x * y);\n" +
  "}", Arrays.asList(7, 8));
System.out.println(result); // prints "56"
```

```python
result = await page.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```python
result = page.evaluate("([x, y]) => Promise.resolve(x * y)", [7, 8])
print(result) # prints "56"
```

```csharp
var result = await page.EvaluateAsync<int>("([x, y]) => Promise.resolve(x * y)", new[] { 7, 8 });
Console.WriteLine(result);
```

A string can also be passed in instead of a function:

```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

```java
System.out.println(page.evaluate("1 + 2")); // prints "3"
```

```python
print(await page.evaluate("1 + 2")) # prints "3"
x = 10
print(await page.evaluate(f"1 + {x}")) # prints "11"
```

```python
print(page.evaluate("1 + 2")) # prints "3"
x = 10
print(page.evaluate(f"1 + {x}")) # prints "11"
```

```csharp
Console.WriteLine(await page.EvaluateAsync<int>("1 + 2")); // prints "3"
```

[ElementHandle] instances can be passed as an argument to the [`method: Page.evaluate`]:

```js
const bodyHandle = await page.evaluateHandle('document.body');
const html = await page.evaluate<string, HTMLElement>(([body, suffix]) =>
  body.innerHTML + suffix, [bodyHandle, 'hello']
);
await bodyHandle.dispose();
```

```java
ElementHandle bodyHandle = page.evaluateHandle("document.body");
String html = (String) page.evaluate("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(bodyHandle, "hello"));
bodyHandle.dispose();
```

```python
body_handle = await page.evaluate_handle("document.body")
html = await page.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
await body_handle.dispose()
```

```python
body_handle = page.evaluate_handle("document.body")
html = page.evaluate("([body, suffix]) => body.innerHTML + suffix", [body_handle, "hello"])
body_handle.dispose()
```

```csharp
var bodyHandle = await page.EvaluateHandleAsync("document.body");
var html = await page.EvaluateAsync<string>("([body, suffix]) => body.innerHTML + suffix", new object [] { bodyHandle, "hello" });
await bodyHandle.DisposeAsync();
```

### param: Page.evaluate.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.evaluate.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.evaluate.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.evaluate.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

## async method: Page.evaluateHandle
* since: v1.8
- returns: <[JSHandle]>

Returns the value of the [`param: expression`] invocation as a [JSHandle].

The only difference between [`method: Page.evaluate`] and [`method: Page.evaluateHandle`] is that [`method: Page.evaluateHandle`] returns [JSHandle].

If the function passed to the [`method: Page.evaluateHandle`] returns a [Promise], then [`method: Page.evaluateHandle`] would wait for the
promise to resolve and return its value.

**Usage**

```js
// Handle for the window object.
const aWindowHandle = await page.evaluateHandle(() => Promise.resolve(window));
```

```java
// Handle for the window object.
JSHandle aWindowHandle = page.evaluateHandle("() => Promise.resolve(window)");
```

```python
a_window_handle = await page.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```python
a_window_handle = page.evaluate_handle("Promise.resolve(window)")
a_window_handle # handle for the window object.
```

```csharp
// Handle for the window object.
var aWindowHandle = await page.EvaluateHandleAsync("() => Promise.resolve(window)");
```

A string can also be passed in instead of a function:

```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

```java
JSHandle aHandle = page.evaluateHandle("document"); // Handle for the "document".
```

```python
a_handle = await page.evaluate_handle("document") # handle for the "document"
```

```python
a_handle = page.evaluate_handle("document") # handle for the "document"
```

```csharp
var docHandle = await page.EvaluateHandleAsync("document"); // Handle for the `document`
```

[JSHandle] instances can be passed as an argument to the [`method: Page.evaluateHandle`]:

```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

```java
JSHandle aHandle = page.evaluateHandle("() => document.body");
JSHandle resultHandle = page.evaluateHandle("([body, suffix]) => body.innerHTML + suffix", Arrays.asList(aHandle, "hello"));
System.out.println(resultHandle.jsonValue());
resultHandle.dispose();
```

```python
a_handle = await page.evaluate_handle("document.body")
result_handle = await page.evaluate_handle("body => body.innerHTML", a_handle)
print(await result_handle.json_value())
await result_handle.dispose()
```

```python
a_handle = page.evaluate_handle("document.body")
result_handle = page.evaluate_handle("body => body.innerHTML", a_handle)
print(result_handle.json_value())
result_handle.dispose()
```

```csharp
var handle = await page.EvaluateHandleAsync("() => document.body");
var resultHandle = await page.EvaluateHandleAsync("([body, suffix]) => body.innerHTML + suffix", new object[] { handle, "hello" });
Console.WriteLine(await resultHandle.JsonValueAsync<string>());
await resultHandle.DisposeAsync();
```

### param: Page.evaluateHandle.expression = %%-evaluate-expression-%%
* since: v1.8

### param: Page.evaluateHandle.expression = %%-js-evaluate-pagefunction-%%
* since: v1.8

### param: Page.evaluateHandle.arg
* since: v1.8
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Page.evaluateHandle.exposeFunctions = %%-js-evaluate-expose-functions-%%
* since: v1.62

## async method: Page.exposeBinding
* since: v1.8
- returns: <[Disposable]>

The method adds a function called [`param: name`] on the `window` object of every frame in this page. When called, the
function executes [`param: callback`] and returns a [Promise] which resolves to the return value of [`param: callback`].
If the [`param: callback`] returns a [Promise], it will be awaited.

The first argument of the [`param: callback`] function contains information about the caller: `{ browserContext:
BrowserContext, page: Page, frame: Frame }`.

See [`method: BrowserContext.exposeBinding`] for the context-wide version.

:::note
Functions installed via [`method: Page.exposeBinding`] survive navigations.
:::

**Usage**

An example of exposing page URL to all frames in a page:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.exposeBinding('pageURL', ({ page }) => page.url());
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.click('button');
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      BrowserContext context = browser.newContext();
      Page page = context.newPage();
      page.exposeBinding("pageURL", (source, args) -> source.page().url());
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");
      page.click("button");
    }
  }
}
```

```python
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    page = await context.new_page()
    await page.expose_binding("pageURL", lambda source: source["page"].url)
    await page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    await page.click("button")

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.expose_binding("pageURL", lambda source: source["page"].url)
    page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    page.click("button")

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync(new()
        {
            Headless = false,
        });
        var page = await browser.NewPageAsync();

        await page.ExposeBindingAsync("pageUrl", (source) => source.Page.Url);
        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.ClickAsync("button");
    }
}
```

### param: Page.exposeBinding.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: Page.exposeBinding.callback
* since: v1.8
- `callback` "BindingCallback" <[function]>

Callback function that will be called in the Playwright's context.
