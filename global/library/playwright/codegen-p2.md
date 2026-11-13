---
title: "Test generator (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/codegen.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Test generator (part 2 of 2)

## Record using custom setup

If you would like to use codegen in some non-standard setup (for example, use [`method: BrowserContext.route`]), it is possible to call [`method: Page.pause`] that will open a separate window with codegen controls.

```js
const { chromium } = require('@playwright/test');

(async () => {
  // Make sure to run headed.
  const browser = await chromium.launch({ headless: false });

  // Setup context however you like.
  const context = await browser.newContext({ /* pass any options */ });
  await context.route('**/*', route => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
  await page.pause();
})();
```

```java
import com.microsoft.playwright.*;

public class Example {
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      BrowserType chromium = playwright.chromium();
      // Make sure to run headed.
      Browser browser = chromium.launch(new BrowserType.LaunchOptions().setHeadless(false));
      // Setup context however you like.
      BrowserContext context = browser.newContext(/* pass any options */);
      context.route("**/*", route -> route.resume());
      // Pause the page, and start recording manually.
      Page page = context.newPage();
      page.pause();
    }
  }
}
```

```python
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        # Make sure to run headed.
        browser = await p.chromium.launch(headless=False)

        # Setup context however you like.
        context = await browser.new_context() # Pass any options
        await context.route('**/*', lambda route: route.continue_())

        # Pause the page, and start recording manually.
        page = await context.new_page()
        await page.pause()

asyncio.run(main())
```

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    # Make sure to run headed.
    browser = p.chromium.launch(headless=False)

    # Setup context however you like.
    context = browser.new_context() # Pass any options
    context.route('**/*', lambda route: route.continue_())

    # Pause the page, and start recording manually.
    page = context.new_page()
    page.pause()
```

```csharp
using Microsoft.Playwright;

using var playwright = await Playwright.CreateAsync();
var chromium = playwright.Chromium;
// Make sure to run headed.
var browser = await chromium.LaunchAsync(new() { Headless = false });

// Setup context however you like.
var context = await browser.NewContextAsync(); // Pass any options
await context.RouteAsync("**/*", route => route.ContinueAsync());

// Pause the page, and start recording manually.
var page = await context.NewPageAsync();
await page.PauseAsync();
```
