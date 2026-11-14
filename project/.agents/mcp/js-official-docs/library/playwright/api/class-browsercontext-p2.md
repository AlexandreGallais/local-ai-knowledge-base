---
title: "class: BrowserContext (part 2 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsercontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserContext (part 2 of 5)

## async method: BrowserContext.clearCookies
* since: v1.8

Removes cookies from context. Accepts optional filter.

**Usage**

```js
await context.clearCookies();
await context.clearCookies({ name: 'session-id' });
await context.clearCookies({ domain: 'my-origin.com' });
await context.clearCookies({ domain: /.*my-origin\.com/ });
await context.clearCookies({ path: '/api/v1' });
await context.clearCookies({ name: 'session-id', domain: 'my-origin.com' });
```

```java
context.clearCookies();
context.clearCookies(new BrowserContext.ClearCookiesOptions().setName("session-id"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setDomain("my-origin.com"));
context.clearCookies(new BrowserContext.ClearCookiesOptions().setPath("/api/v1"));
context.clearCookies(new BrowserContext.ClearCookiesOptions()
                         .setName("session-id")
                         .setDomain("my-origin.com"));
```

```python
await context.clear_cookies()
await context.clear_cookies(name="session-id")
await context.clear_cookies(domain="my-origin.com")
await context.clear_cookies(path="/api/v1")
await context.clear_cookies(name="session-id", domain="my-origin.com")
```

```python
context.clear_cookies()
context.clear_cookies(name="session-id")
context.clear_cookies(domain="my-origin.com")
context.clear_cookies(path="/api/v1")
context.clear_cookies(name="session-id", domain="my-origin.com")
```

```csharp
await context.ClearCookiesAsync();
await context.ClearCookiesAsync(new() { Name = "session-id" });
await context.ClearCookiesAsync(new() { Domain = "my-origin.com" });
await context.ClearCookiesAsync(new() { Path = "/api/v1" });
await context.ClearCookiesAsync(new() { Name = "session-id", Domain = "my-origin.com" });
```

### option: BrowserContext.clearCookies.name = %%-clear-cookies-option-name-%%
* since: v1.43

### option: BrowserContext.clearCookies.domain = %%-clear-cookies-option-domain-%%
* since: v1.43

### option: BrowserContext.clearCookies.path = %%-clear-cookies-option-path-%%
* since: v1.43

## async method: BrowserContext.clearPermissions
* since: v1.8

Clears all permission overrides for the browser context.

**Usage**

```js
const context = await browser.newContext();
await context.grantPermissions(['clipboard-read']);
// do stuff ..
context.clearPermissions();
```

```java
BrowserContext context = browser.newContext();
context.grantPermissions(Arrays.asList("clipboard-read"));
// do stuff ..
context.clearPermissions();
```

```python
context = await browser.new_context()
await context.grant_permissions(["clipboard-read"])
# do stuff ..
context.clear_permissions()
```

```python
context = browser.new_context()
context.grant_permissions(["clipboard-read"])
# do stuff ..
context.clear_permissions()
```

```csharp
var context = await browser.NewContextAsync();
await context.GrantPermissionsAsync(new[] { "clipboard-read" });
// Alternatively, you can use the helper class ContextPermissions
//  to specify the permissions...
// do stuff ...
await context.ClearPermissionsAsync();
```

## async method: BrowserContext.close
* since: v1.8

Closes the browser context. All the pages that belong to the browser context will be closed.

:::note
The default browser context cannot be closed.
:::

## async method: BrowserContext.cookies
* since: v1.8
- returns: "Cookie" <[Array]<[Object]>>
  * alias-csharp: BrowserContextCookiesResult
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[float]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` "SameSiteAttribute" <"Strict"|"Lax"|"None">
  - `partitionKey` ?<[string]>

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs
are returned.

### param: BrowserContext.cookies.urls = %%-cookies-param-urls-%%
* since: v1.8

## async method: BrowserContext.exposeBinding
* since: v1.8
- returns: <[Disposable]>

The method adds a function called [`param: name`] on the `window` object of every frame in every page in the context.
When called, the function executes [`param: callback`] and returns a [Promise] which resolves to the return value of
[`param: callback`]. If the [`param: callback`] returns a [Promise], it will be awaited.

The first argument of the [`param: callback`] function contains information about the caller: `{ browserContext:
BrowserContext, page: Page, frame: Frame }`.

See [`method: Page.exposeBinding`] for page-only version.

**Usage**

An example of exposing page URL to all frames in all pages in the context:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeBinding('pageURL', ({ page }) => page.url());
  const page = await context.newPage();
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.getByRole('button').click();
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
      context.exposeBinding("pageURL", (source, args) -> source.page().url());
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.pageURL();\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");
      page.getByRole(AriaRole.BUTTON).click();
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
    await context.expose_binding("pageURL", lambda source: source["page"].url)
    page = await context.new_page()
    await page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    await page.get_by_role("button").click()

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
    context.expose_binding("pageURL", lambda source: source["page"].url)
    page = context.new_page()
    page.set_content("""
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.pageURL();
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
var context = await browser.NewContextAsync();

await context.ExposeBindingAsync("pageURL", source => source.Page.Url);
var page = await context.NewPageAsync();
await page.SetContentAsync("<script>\n" +
"  async function onClick() {\n" +
"    document.querySelector('div').textContent = await window.pageURL();\n" +
"  }\n" +
"</script>\n" +
"<button onclick=\"onClick()\">Click me</button>\n" +
"<div></div>");
await page.GetByRole(AriaRole.Button).ClickAsync();
```

### param: BrowserContext.exposeBinding.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: BrowserContext.exposeBinding.callback
* since: v1.8
- `callback` "BindingCallback" <[function]>

Callback function that will be called in the Playwright's context.

## async method: BrowserContext.exposeFunction
* since: v1.8
- returns: <[Disposable]>

The method adds a function called [`param: name`] on the `window` object of every frame in every page in the context.
When called, the function executes [`param: callback`] and returns a [Promise] which resolves to the return value of
[`param: callback`].

If the [`param: callback`] returns a [Promise], it will be awaited.

See [`method: Page.exposeFunction`] for page-only version.

**Usage**

An example of adding a `sha256` function to all pages in the context:

```js
const { webkit } = require('playwright');  // Or 'chromium' or 'firefox'.
const crypto = require('crypto');

(async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  await context.exposeFunction('sha256', text =>
    crypto.createHash('sha256').update(text).digest('hex'),
  );
  const page = await context.newPage();
  await page.setContent(`
    <script>
      async function onClick() {
        document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
      }
    </script>
    <button onclick="onClick()">Click me</button>
    <div></div>
  `);
  await page.getByRole('button').click();
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
      BrowserContext context = browser.newContext();
      context.exposeFunction("sha256", args -> {
        String text = (String) args[0];
        MessageDigest crypto;
        try {
          crypto = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
          return null;
        }
        byte[] token = crypto.digest(text.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(token);
      });
      Page page = context.newPage();
      page.setContent("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>\n");
      page.getByRole(AriaRole.BUTTON).click();
    }
  }
}
```

```python
import asyncio
import hashlib
from playwright.async_api import async_playwright, Playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()

async def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = await webkit.launch(headless=False)
    context = await browser.new_context()
    await context.expose_function("sha256", sha256)
    page = await context.new_page()
    await page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    await page.get_by_role("button").click()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python
import hashlib
from playwright.sync_api import sync_playwright

def sha256(text: str) -> str:
    m = hashlib.sha256()
    m.update(bytes(text, "utf8"))
    return m.hexdigest()

def run(playwright: Playwright):
    webkit = playwright.webkit
    browser = webkit.launch(headless=False)
    context = browser.new_context()
    context.expose_function("sha256", sha256)
    page = context.new_page()
    page.set_content("""
        <script>
          async function onClick() {
            document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');
          }
        </script>
        <button onclick="onClick()">Click me</button>
        <div></div>
    """)
    page.get_by_role("button").click()

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

class BrowserContextExamples
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        var browser = await playwright.Webkit.LaunchAsync(new() { Headless = false });
        var context = await browser.NewContextAsync();

        await context.ExposeFunctionAsync("sha256", (string input) =>
        {
            return Convert.ToBase64String(
                SHA256.Create().ComputeHash(System.Text.Encoding.UTF8.GetBytes(input)));
        });

        var page = await context.NewPageAsync();
        await page.SetContentAsync("<script>\n" +
        "  async function onClick() {\n" +
        "    document.querySelector('div').textContent = await window.sha256('PLAYWRIGHT');\n" +
        "  }\n" +
        "</script>\n" +
        "<button onclick=\"onClick()\">Click me</button>\n" +
        "<div></div>");

        await page.GetByRole(AriaRole.Button).ClickAsync();
        Console.WriteLine(await page.TextContentAsync("div"));
    }
}
```

### param: BrowserContext.exposeFunction.name
* since: v1.8
- `name` <[string]>

Name of the function on the window object.

### param: BrowserContext.exposeFunction.callback
* since: v1.8
- `callback` "FunctionCallback" <[function]>

Callback function that will be called in the Playwright's context.
