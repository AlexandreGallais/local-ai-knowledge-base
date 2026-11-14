---
title: "Emulation (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/emulation.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Emulation (part 2 of 2)

## Color Scheme and Media

Emulate the users `"colorScheme"`. Supported values are 'light', 'dark', and 'no-preference'. You can also emulate the media type with [`method: Page.emulateMedia`].

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    colorScheme: 'dark',
  },
});
```

```js
import { test, expect } from '@playwright/test';

test.use({
  colorScheme: 'dark' // or 'light'
});

test('my test with dark mode', async ({ page }) => {
  // ...
});
```

```js
// Create context with dark mode
const context = await browser.newContext({
  colorScheme: 'dark' // or 'light'
});

// Create page with dark mode
const page = await browser.newPage({
  colorScheme: 'dark' // or 'light'
});

// Change color scheme for the page
await page.emulateMedia({ colorScheme: 'dark' });

// Change media for page
await page.emulateMedia({ media: 'print' });
```

```java
// Create context with dark mode
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setColorScheme(ColorScheme.DARK)); // or "light"

// Create page with dark mode
Page page = browser.newPage(new Browser.NewPageOptions()
  .setColorScheme(ColorScheme.DARK)); // or "light"

// Change color scheme for the page
page.emulateMedia(new Page.EmulateMediaOptions().setColorScheme(ColorScheme.DARK));

// Change media for page
page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.PRINT));
```

```python
# Create context with dark mode
context = await browser.new_context(
  color_scheme='dark' # or 'light'
)

# Create page with dark mode
page = await browser.new_page(
  color_scheme='dark' # or 'light'
)

# Change color scheme for the page
await page.emulate_media(color_scheme='dark')

# Change media for page
await page.emulate_media(media='print')
```

```python
# Create context with dark mode
context = browser.new_context(
  color_scheme='dark' # or 'light'
)

# Create page with dark mode
page = browser.new_page(
  color_scheme='dark' # or 'light'
)

# Change color scheme for the page
page.emulate_media(color_scheme='dark')

# Change media for page
page.emulate_media(media='print')
```

```csharp
// Create context with dark mode
await using var context = await browser.NewContextAsync(new()
{
    ColorScheme = ColorScheme.Dark
});

// Create page with dark mode
var page = await browser.NewPageAsync(new()
{
    ColorScheme = ColorScheme.Dark
});

// Change color scheme for the page
await page.EmulateMediaAsync(new()
{
    ColorScheme = ColorScheme.Dark
});

// Change media for page
await page.EmulateMediaAsync(new()
{
    Media = Media.Print
});
```

The `"reducedMotion"`, `"forcedColors"` and `"contrast"` options emulate the `prefers-reduced-motion`, `forced-colors` and `prefers-contrast` media features the same way. Supported values are `'reduce'` and `'no-preference'` for reduced motion, `'active'` and `'none'` for forced colors, and `'more'` and `'no-preference'` for contrast. [`method: Page.emulateMedia`] changes them for a single page.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    reducedMotion: 'reduce',
    forcedColors: 'active',
    contrast: 'more',
  },
});
```

```js
import { test, expect } from '@playwright/test';

test.use({
  reducedMotion: 'reduce', // or 'no-preference'
  forcedColors: 'active', // or 'none'
  contrast: 'more', // or 'no-preference'
});

test('my test with reduced motion, forced colors and more contrast', async ({ page }) => {
  // ...
});
```

```js
// Create context with reduced motion, forced colors and more contrast
const context = await browser.newContext({
  reducedMotion: 'reduce', // or 'no-preference'
  forcedColors: 'active', // or 'none'
  contrast: 'more', // or 'no-preference'
});

// Change the media features for the page
await page.emulateMedia({ reducedMotion: 'reduce', forcedColors: 'active', contrast: 'more' });
```

```java
// Create context with reduced motion, forced colors and more contrast
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setReducedMotion(ReducedMotion.REDUCE) // or NO_PREFERENCE
  .setForcedColors(ForcedColors.ACTIVE) // or NONE
  .setContrast(Contrast.MORE)); // or NO_PREFERENCE

// Change the media features for the page
page.emulateMedia(new Page.EmulateMediaOptions()
  .setReducedMotion(ReducedMotion.REDUCE)
  .setForcedColors(ForcedColors.ACTIVE)
  .setContrast(Contrast.MORE));
```

```python
# Create context with reduced motion, forced colors and more contrast
context = await browser.new_context(
  reduced_motion='reduce', # or 'no-preference'
  forced_colors='active', # or 'none'
  contrast='more' # or 'no-preference'
)

# Change the media features for the page
await page.emulate_media(reduced_motion='reduce', forced_colors='active', contrast='more')
```

```python
# Create context with reduced motion, forced colors and more contrast
context = browser.new_context(
  reduced_motion='reduce', # or 'no-preference'
  forced_colors='active', # or 'none'
  contrast='more' # or 'no-preference'
)

# Change the media features for the page
page.emulate_media(reduced_motion='reduce', forced_colors='active', contrast='more')
```

```csharp
// Create context with reduced motion, forced colors and more contrast
await using var context = await browser.NewContextAsync(new()
{
    ReducedMotion = ReducedMotion.Reduce, // or NoPreference
    ForcedColors = ForcedColors.Active, // or None
    Contrast = Contrast.More // or NoPreference
});

// Change the media features for the page
await page.EmulateMediaAsync(new()
{
    ReducedMotion = ReducedMotion.Reduce,
    ForcedColors = ForcedColors.Active,
    Contrast = Contrast.More
});
```
## User Agent

The User Agent is included in the device and therefore you  will rarely need to change it however if you do need to test a different user agent you can override it with the `userAgent` property.

```js
import { test, expect } from '@playwright/test';

test.use({ userAgent: 'My user agent' });

test('my user agent test', async ({ page }) => {
  // ...
});
```

```js
const context = await browser.newContext({
  userAgent: 'My user agent'
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setUserAgent("My user agent"));
```

```python
context = await browser.new_context(
  user_agent='My user agent'
)
```

```python
context = browser.new_context(
  user_agent='My user agent'
)
```

```csharp
var context = await browser.NewContextAsync(new() { UserAgent = "My User Agent" });
```

## Offline

Emulate the network being offline.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    offline: true
  },
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .setOffline(true));
```

```python
context = await browser.new_context(
  offline=True
)
```

```python
context = browser.new_context(
  offline=True
)
```

```csharp
var context = await browser.NewContextAsync(new() { Offline = true });
```

:::note
Offline emulation only affects requests that go through the browser's regular network stack, such as page navigations, `fetch()`, `XMLHttpRequest` and WebSockets. It does not affect WebRTC traffic: established `RTCPeerConnection`s keep sending and receiving media over UDP. To test WebRTC connection loss, interrupt the connection outside the browser, for example by stopping the TURN server or using an OS-level firewall.
:::

## JavaScript Enabled

Emulate a user scenario where JavaScript is disabled.

```js
import { test, expect } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('test with no JavaScript', async ({ page }) => {
  // ...
});
```

```js
const context = await browser.newContext({
  javaScriptEnabled: false
});
```

```java
BrowserContext context = browser.newContext(new Browser.NewContextOptions()
  .javaScriptEnabled(false));
```

```python
context = await browser.new_context(
  java_script_enabled=False
)
```

```python
context = browser.new_context(
  java_script_enabled=False
)
```

```csharp
var context = await browser.NewContextAsync(new() { JavaScriptEnabled = false });
```
