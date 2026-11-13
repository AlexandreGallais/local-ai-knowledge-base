---
title: "Emulation (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/emulation.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

With Playwright you can test your app on any browser as well as emulate a real device such as a mobile phone or tablet. Simply configure the devices you would like to emulate and Playwright will simulate the browser behavior such as `"userAgent"`, `"screenSize"`, `"viewport"` and if it `"hasTouch"` enabled. You can also emulate the `"geolocation"`, `"locale"` and `"timezone"` for all tests or for a specific test as well as set the `"permissions"` to show notifications or change the `"colorScheme"`.

## Devices
* langs: js, csharp, python

Playwright comes with a registry of device parameters using [`property: Playwright.devices`] for selected desktop, tablet and mobile devices. It can be used to simulate browser behavior for a specific device such as user agent, screen size, viewport and if it has touch enabled. All tests will run with the specified device parameters.

```js
import { defineConfig, devices } from '@playwright/test'; // import devices

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
      },
    },
  ],
});
```

```js
const { chromium, devices } = require('playwright');
const browser = await chromium.launch();

const iphone13 = devices['iPhone 13'];
const context = await browser.newContext({
  ...iphone13,
});
```

```python
import asyncio
from playwright.async_api import async_playwright, Playwright

async def run(playwright: Playwright):
    iphone_13 = playwright.devices['iPhone 13']
    browser = await playwright.webkit.launch(headless=False)
    context = await browser.new_context(
        **iphone_13,
    )

async def main():
    async with async_playwright() as playwright:
        await run(playwright)
asyncio.run(main())
```

```python
from playwright.sync_api import sync_playwright, Playwright

def run(playwright: Playwright):
    iphone_13 = playwright.devices['iPhone 13']
    browser = playwright.webkit.launch(headless=False)
    context = browser.new_context(
        **iphone_13,
    )

with sync_playwright() as playwright:
    run(playwright)
```

```csharp
using Microsoft.Playwright;
using System.Threading.Tasks;

using var playwright = await Playwright.CreateAsync();
await using var browser = await playwright.Chromium.LaunchAsync(new()
{
    Headless = false
});
var iphone13 = playwright.Devices["iPhone 13"];
await using var context = await browser.NewContextAsync(iphone13);
```

**Note**: Pre-configured devices assume a specific platform. For example, "Desktop Chrome" will provide a Windows-specific user agent string.

If you would like to use the user agent specific to the platform that is running the tests, we recommend unsetting the user agent property.

```js
const context = await browser.newContext({
  ...devices['Desktop Chrome'],
  userAgent: undefined,
});
```

```python
desktop_chrome = playwright.devices["Desktop Chrome"]
context = browser.new_context(**desktop_chrome, user_agent=None)
```

```csharp
var desktopChrome = playwright.Devices["Desktop Chrome"];
desktopChrome.UserAgent = null;
var context = await browser.NewContextAsync(desktopChrome);
```

## Devices
* langs: java

Playwright can emulate various devices by specifying `setDeviceScaleFactor`, `setHasTouch`, `setIsMobile`, `setScreenSize`, `setUserAgent` and `setViewportSize` options when creating a context with [`method: Browser.newContext`].

## Viewport

The viewport is included in the device but you can override it for some tests with [`method: Page.setViewportSize`].

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
        viewport: { width: 1280, height: 720 },
      },
    },
  ]
});
```

```js
// Create context with given viewport
const context = await browser.newContext({
  viewport: { width: 1280, height: 1024 }
});
```

Test file:

```js
import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 1600, height: 1200 },
});

test('my test', async ({ page }) => {
  // ...
});
```

```js
// Create context with given viewport
const context = await browser.newContext({
  viewport: { width: 1280, height: 1024 }
});

// Resize viewport for individual page
await page.setViewportSize({ width: 1600, height: 1200 });

// Emulate high-DPI
const context = await browser.newContext({
  viewport: { width: 2560, height: 1440 },
  deviceScaleFactor: 2,
});
```

The same works inside a test file.

```js
import { test, expect } from '@playwright/test';

test.describe('specific viewport block', () => {
  test.use({ viewport: { width: 1600, height: 1200 } });

  test('my test', async ({ page }) => {
    // ...
  });
});
```

```js
// Create context with given viewport
const context = await browser.newContext({
  viewport: { width: 1600, height: 1200 }
});
const page = await context.newPage();
```

```java
// Create context with given viewport
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setViewportSize(1280, 1024));

// Resize viewport for individual page
page.setViewportSize(1600, 1200);

// Emulate high-DPI
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setViewportSize(2560, 1440)
  .setDeviceScaleFactor(2));
```

```python
# Create context with given viewport
context = await browser.new_context(
  viewport={ 'width': 1280, 'height': 1024 }
)

# Resize viewport for individual page
await page.set_viewport_size({"width": 1600, "height": 1200})

# Emulate high-DPI
context = await browser.new_context(
  viewport={ 'width': 2560, 'height': 1440 },
  device_scale_factor=2,
)
```

```python
# Create context with given viewport
context = browser.new_context(
  viewport={ 'width': 1280, 'height': 1024 }
)

# Resize viewport for individual page
page.set_viewport_size({"width": 1600, "height": 1200})

# Emulate high-DPI
context = browser.new_context(
  viewport={ 'width': 2560, 'height': 1440 },
  device_scale_factor=2,
)
```

```csharp
// Create context with given viewport
await using var context = await browser.NewContextAsync(new()
{
    ViewportSize = new ViewportSize() { Width = 1280, Height = 1024 }
});

// Resize viewport for individual page
await page.SetViewportSizeAsync(1600, 1200);

// Emulate high-DPI
await using var context = await browser.NewContextAsync(new()
{
    ViewportSize = new ViewportSize() { Width = 2560, Height = 1440 },
    DeviceScaleFactor = 2
});
```

## isMobile

Whether the meta viewport tag is taken into account and touch events are enabled.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // It is important to define the `isMobile` property after destructuring `devices`,
        // since devices also define the `isMobile` for that device.
        isMobile: false,
      },
    },
  ]
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .isMobile(false));
```

```python
context = await browser.new_context(
  is_mobile=False
)
```

```python
context = browser.new_context(
  is_mobile=False
)
```

```csharp
await using var context = await browser.NewContextAsync(new()
{
    IsMobile = false
});
```

## Locale & Timezone

Emulate the browser Locale and Timezone which can be set globally for all tests in the config and then overridden for particular tests.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Emulates the browser locale.
    locale: 'en-GB',

    // Emulates the browser timezone.
    timezoneId: 'Europe/Paris',
  },
});
```

```js
import { test, expect } from '@playwright/test';

test.use({
  locale: 'de-DE',
  timezoneId: 'Europe/Berlin',
});

test('my test for de lang in Berlin timezone', async ({ page }) => {
  await page.goto('https://www.bing.com');
  // ...
});
```

```js
const context = await browser.newContext({
  locale: 'de-DE',
  timezoneId: 'Europe/Berlin',
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setLocale("de-DE")
  .setTimezoneId("Europe/Berlin"));
```

```python
context = await browser.new_context(
  locale='de-DE',
  timezone_id='Europe/Berlin',
)
```

```python
context = browser.new_context(
  locale='de-DE',
  timezone_id='Europe/Berlin',
)
```

```csharp
await using var context = await browser.NewContextAsync(new()
{
    Locale = "de-DE",
    TimezoneId = "Europe/Berlin"
});
```

######
* langs: js

Note that this only affects the browser timezone and locale, not the test runner timezone.
To set the test runner timezone, you can use the `TZ` environment variable.

## Permissions

Allow app to show system notifications.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Grants specified permissions to the browser context.
    permissions: ['notifications'],
  },
});
```

```js
const context = await browser.newContext({
  permissions: ['notifications'],
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setPermissions(Arrays.asList("notifications")));
```

```python
context = await browser.new_context(
  permissions=['notifications'],
)
```

```python
context = browser.new_context(
  permissions=['notifications'],
)
```

Allow notifications for a specific domain.

```js
import { test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  // Runs before each test and signs in each page.
  await context.grantPermissions(['notifications'], { origin: 'https://skype.com' });
});

test('first', async ({ page }) => {
  // page has notifications permission for https://skype.com.
});
```

```js
await context.grantPermissions(['notifications'], { origin: 'https://skype.com' });
```

```java
context.grantPermissions(Arrays.asList("notifications"),
  new BrowserContext.GrantPermissionsOptions().setOrigin("https://skype.com"));
```

```python
await context.grant_permissions(['notifications'], origin='https://skype.com')
```

```python
context.grant_permissions(['notifications'], origin='https://skype.com')
```

```csharp
await context.GrantPermissionsAsync(new[] { "notifications" }, origin: "https://skype.com");
```

Revoke all permissions with [`method: BrowserContext.clearPermissions`].

```js
// Library
await context.clearPermissions();
```

```java
context.clearPermissions();
```

```python
await context.clear_permissions()
```

```python
context.clear_permissions()
```

```csharp
await context.ClearPermissionsAsync();
```

## Geolocation

Grant `"geolocation"` permissions and set geolocation to a specific area.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // Context geolocation
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ['geolocation'],
  },
});
```

```js
import { test, expect } from '@playwright/test';

test.use({
  geolocation: { longitude: 41.890221, latitude: 12.492348 },
  permissions: ['geolocation'],
});

test('my test with geolocation', async ({ page }) => {
  // ...
});
```

```js
const context = await browser.newContext({
  geolocation: { longitude: 41.890221, latitude: 12.492348 },
  permissions: ['geolocation']
});

```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setGeolocation(41.890221, 12.492348)
  .setPermissions(Arrays.asList("geolocation")));
```

```python
context = await browser.new_context(
  geolocation={"longitude": 41.890221, "latitude": 12.492348},
  permissions=["geolocation"]
)
```

```python
context = browser.new_context(
  geolocation={"longitude": 41.890221, "latitude": 12.492348},
  permissions=["geolocation"]
)
```

```csharp
await using var context = await browser.NewContextAsync(new()
{
    Permissions = new[] { "geolocation" },
    Geolocation = new Geolocation() { Longitude = 41.890221, Latitude = 12.492348 }
});
```

Change the location later:

```js
import { test, expect } from '@playwright/test';

test.use({
  geolocation: { longitude: 41.890221, latitude: 12.492348 },
  permissions: ['geolocation'],
});

test('my test with geolocation', async ({ page, context }) => {
  // overwrite the location for this test
  await context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 });
});
```

```js
await context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 });
```

```java
context.setGeolocation(new Geolocation(48.858455, 2.294474));
```

```python
await context.set_geolocation({"longitude": 48.858455, "latitude": 2.294474})
```

```python
context.set_geolocation({"longitude": 48.858455, "latitude": 2.294474})
```

```csharp
await context.SetGeolocationAsync(new Geolocation() { Longitude = 48.858455, Latitude = 2.294474 });
```

**Note** you can only change geolocation for all pages in the context.
