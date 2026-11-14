---
title: "class: Page (part 5 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 5 of 14)

## async method: Page.exposeFunction
* since: v1.8
- returns: <[Disposable]>

The method adds a function called [`param: name`] on the `window` object of every frame in the page. When called, the
function executes [`param: callback`] and returns a [Promise] which resolves to the return value of [`param: callback`].

If the [`param: callback`] returns a [Promise], it will be awaited.

See [`method: BrowserContext.exposeFunction`] for context-wide exposed function.

:::note
Functions installed via [`method: Page.exposeFunction`] survive navigations.
:::

**Usage**

An example of adding a `sha256` function to the page:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const page = await browser.newPage();
  await page.exposeFunction('sha256', text =>
    crypto.createHash('sha256').update(text).digest('hex'),
  );
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
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

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType webkit = playwright.webkit();
      Browser browser = webkit.launch(new BrowserType.LaunchOptions().setHeadless(false));
      Page page = browser.newPage();
      page.exposeFunction("sha256", args -> {
        try {
          String text = (String) args[0];
          MessageDigest crypto = MessageDigest.getInstance("SHA-256");
          byte[] token = crypto.digest(text.getBytes(StandardCharsets.UTF_8));
          return Base64.getEncoder().encodeToString(token);
        } catch (NoSuchAlgorithmException e) {
          return null;
        }
      });
      page.setContent(
        "<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>"
      );
      page.click("button");
    }
  }
}
```

```python
import asyncio
import hashlib
from playwright.async_api import async_playwright, Playwright

def sha256(text):
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    page = await browser.new_page()
    await page.expose_function("sha256", sha256)
    await page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
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
import hashlib
from playwright.sync_api import sync_playwright, Playwright

def sha256(text):
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    page = browser.new_page()
    page.expose_function("sha256", sha256)
    page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
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
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

class PageExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Webkit.LaunchAsync(new()
        {
            Headless = false
        });
        var page = await browser.NewPageAsync();

        await page.ExposeFunctionAsync("sha256", (string input) =>
        {
            return Convert.ToBase64String(
                SHA256.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(input)));
        });

        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.ClickAsync("button");
        Console.WriteLine(await page.TextContentAsync("div"));
    }
}
```

### param: Page.exposeFunction.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object

### param: Page.exposeFunction.callback
* since: v1.8
- `callback` "FunctionCallback" <[function]>

Callback function which will be called in Playwright's context.

## async method: Page.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about locators.

This method waits for an element matching [`param: selector`], waits for actionability checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an ``, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: Page.fill.selector = %%-input-selector-%%
* since: v1.8

### param: Page.fill.value
* since: v1.8
- `value` <[string]>

Value to fill for the ``, `<textarea>` or `[contenteditable]` element.

### option: Page.fill.force = %%-input-force-%%
* since: v1.13

### option: Page.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.fill.strict = %%-input-strict-%%
* since: v1.14

### option: Page.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about locators.

This method fetches an element with [`param: selector`] and focuses it. If there's no element matching
[`param: selector`], the method waits until a matching element appears in the DOM.

### param: Page.focus.selector = %%-input-selector-%%
* since: v1.8

### option: Page.focus.strict = %%-input-strict-%%
* since: v1.14

### option: Page.focus.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.focus.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Page.frame
* since: v1.8
- returns: <[null]|[Frame]>

Returns frame matching the specified criteria. Either `name` or `url` must be specified.

**Usage**

```js
const frame = page.frame('frame-name');
```

```java
Frame frame = page.frame("frame-name");
```

```py
frame = page.frame(name="frame-name")
```

```csharp
var frame = page.Frame("frame-name");
```

```js
const frame = page.frame({ url: /.*domain.*/ });
```

```java
Frame frame = page.frameByUrl(Pattern.compile(".*domain.*"));
```

```py
frame = page.frame(url=r".*domain.*")
```

```csharp
var frame = page.FrameByUrl(".*domain.*");
```

### param: Page.frame.frameSelector
* since: v1.8
* langs: js
- `frameSelector` <[string]|[Object]>
  - `name` ?<[string]> Frame name specified in the `iframe`'s `name` attribute. Optional.
  - `url` ?<[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]> A glob pattern, regex pattern, URL pattern, or predicate receiving
    frame's `url` as a [URL] object. Optional.

Frame name or other frame lookup options.

### param: Page.frame.name
* since: v1.9
* langs: csharp, java
- `name` <[string]>

Frame name specified in the `iframe`'s `name` attribute.

### param: Page.frame.name
* since: v1.8
* langs: python
- `name` ?<[string]>

Frame name specified in the `iframe`'s `name` attribute. Optional.

### option: Page.frame.url
* since: v1.8
* langs: python
- `url` ?<[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object. Optional.

## method: Page.frameByUrl
* since: v1.9
* langs: csharp, java
- returns: <[null]|[Frame]>

Returns frame with matching URL.

### param: Page.frameByUrl.url
* since: v1.9
* langs: csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern or predicate receiving frame's `url` as a [URL] object.

## method: Page.frameLocator
* since: v1.17
- returns: <[FrameLocator]>

When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements
in that iframe.

When called without [`param: selector`], the search starts in any frame on the page - the main frame or any of
the iframes - so that you don't need to locate each iframe first. Note that the rest of the locator is resolved
inside a single frame, just like any other locator. If it matches elements inside multiple frames, an error is thrown.

**Usage**

Following snippet locates element with text "Submit" in the iframe with id `my-frame`,
like ``:

```js
const locator = page.frameLocator('#my-iframe').getByText('Submit');
await locator.click();
```

```java
Locator locator = page.frameLocator("#my-iframe").getByText("Submit");
locator.click();
```

```python
locator = page.frame_locator("#my-iframe").get_by_text("Submit")
await locator.click()
```

```python
locator = page.frame_locator("#my-iframe").get_by_text("Submit")
locator.click()
```

```csharp
var locator = page.FrameLocator("#my-iframe").GetByText("Submit");
await locator.ClickAsync();
```

Following snippet locates a button, either in the main frame or in one of the iframes:

```js
const locator = page.frameLocator().getByRole('button');
await locator.click();
```

```java
Locator locator = page.frameLocator().getByRole(AriaRole.BUTTON);
locator.click();
```

```python
locator = page.frame_locator().get_by_role("button")
await locator.click()
```

```python
locator = page.frame_locator().get_by_role("button")
locator.click()
```

```csharp
var locator = page.FrameLocator().GetByRole(AriaRole.Button);
await locator.ClickAsync();
```

### param: Page.frameLocator.selector
* since: v1.17
- `selector` ?<[string]>

A selector that matches the frame element. When not specified, locator is matched in any frame on the page.

## method: Page.frames
* since: v1.8
- returns: <[Array]<[Frame]>>

An array of all frames attached to the page.

## async method: Page.getAttribute
* since: v1.8
* discouraged: Use locator-based [`method: Locator.getAttribute`] instead. Read more about locators.
- returns: <[null]|[string]>

Returns element attribute value.

### param: Page.getAttribute.selector = %%-input-selector-%%
* since: v1.8

### param: Page.getAttribute.name
* since: v1.8
- `name` <[string]>

Attribute name to get the value for.

### option: Page.getAttribute.strict = %%-input-strict-%%
* since: v1.14

### option: Page.getAttribute.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.getAttribute.timeout = %%-input-timeout-js-%%
* since: v1.8

## method: Page.getByAltText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-alt-text-%%

## method: Page.getByLabel
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-label-text-%%

## method: Page.getByPlaceholder
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-placeholder-text-%%

## method: Page.getByRef
* since: v1.64
- returns: <[Locator]>

Locate element by its aria ref. Refs like `[ref=e2]` are reported by [`method: Page.ariaSnapshot`] when called with
the `"ai"` mode, and resolve against the latest snapshot taken in the element's frame.

**Usage**

Consider the following aria snapshot.

```yaml
- button "Submit" [ref=e2]
```

You can locate the button by its ref:

```js
await page.getByRef('e2').click();
```

```java
page.getByRef("e2").click();
```

```python
await page.get_by_ref("e2").click()
```

```python
page.get_by_ref("e2").click()
```

```csharp
await page.GetByRef("e2").ClickAsync();
```

### param: Page.getByRef.ref
* since: v1.64
- `ref` <[string]>

Aria ref of the element, for example `e2` or `f1e3`.

## method: Page.getByRole
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-role-%%

### param: Page.getByRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.27

### option: Page.getByRole.-inline- = %%-locator-get-by-role-option-list-v1.27-%%
* since: v1.27

## method: Page.getByTestId
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-test-id-%%

### param: Page.getByTestId.testId = %%-locator-get-by-test-id-test-id-%%
* since: v1.27

## method: Page.getByText
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-text-%%

## method: Page.getByTitle
* since: v1.27
- returns: <[Locator]>

%%-template-locator-get-by-title-%%

## async method: Page.goBack
* since: v1.8
- returns: <[null]|[Response]>

Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect. If cannot go back, returns `null`.

Navigate to the previous page in history.

:::warning
**Testing Back/Forward Cache (BFCache) is not supported.**
By default, Playwright disables the Back/Forward Cache across all browsers. Even if explicitly enabled, Playwright's internal state relies on network-level navigation events. Because BFCache restores unfreeze the DOM without firing these events, using `page.goBack()` or `page.goForward()` to trigger a BFCache restore will result in timeouts and a desynchronized `Page` state.
:::

### option: Page.goBack.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.goBack.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.goBack.timeout = %%-navigation-timeout-js-%%
* since: v1.8
