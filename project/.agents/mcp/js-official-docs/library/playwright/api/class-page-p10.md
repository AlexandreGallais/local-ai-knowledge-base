---
title: "class: Page (part 10 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 10 of 14)

## async method: Page.setChecked
* since: v1.15
* discouraged: Use locator-based [`method: Locator.setChecked`] instead. Read more about locators.

This method checks or unchecks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.setChecked.selector = %%-input-selector-%%
* since: v1.15

### param: Page.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Page.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Page.setChecked.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Page.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Page.setChecked.strict = %%-input-strict-%%
* since: v1.15

### option: Page.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Page.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Page.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: Page.setContent
* since: v1.8

This method internally calls document.write(), inheriting all its specific characteristics and behaviors.

### param: Page.setContent.html
* since: v1.8
- `html` <[string]>

HTML markup to assign to the page.

### option: Page.setContent.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.setContent.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Page.setContent.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

## method: Page.setDefaultNavigationTimeout
* since: v1.8

This setting will change the default maximum navigation time for the following methods and related shortcuts:
* [`method: Page.goBack`]
* [`method: Page.goForward`]
* [`method: Page.goto`]
* [`method: Page.reload`]
* [`method: Page.setContent`]
* [`method: Page.waitForNavigation`]
* [`method: Page.waitForURL`]

:::note
[`method: Page.setDefaultNavigationTimeout`] takes priority over [`method: Page.setDefaultTimeout`],
[`method: BrowserContext.setDefaultTimeout`] and [`method: BrowserContext.setDefaultNavigationTimeout`].
:::

### param: Page.setDefaultNavigationTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum navigation time in milliseconds

## method: Page.setDefaultTimeout
* since: v1.8

This setting will change the default maximum time for all the methods accepting [`param: timeout`] option.

:::note
[`method: Page.setDefaultNavigationTimeout`] takes priority over [`method: Page.setDefaultTimeout`].
:::

### param: Page.setDefaultTimeout.timeout
* since: v1.8
- `timeout` <[float]>

Maximum time in milliseconds. Pass `0` to disable timeout.

## async method: Page.setExtraHTTPHeaders
* since: v1.8

The extra HTTP headers will be sent with every request the page initiates.

:::note
[`method: Page.setExtraHTTPHeaders`] does not guarantee the order of headers in the outgoing requests.
:::

### param: Page.setExtraHTTPHeaders.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. All header values must be strings.

## async method: Page.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about locators.

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

This method expects [`param: selector`] to point to an
input element. However, if the element is inside the `` element that has an associated control, targets the control instead.

### param: Page.setInputFiles.selector = %%-input-selector-%%
* since: v1.8

### param: Page.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: Page.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.setInputFiles.strict = %%-input-strict-%%
* since: v1.14

### option: Page.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.setViewportSize
* since: v1.8

In the case of multiple pages in a single browser, each page can have its own viewport size. However,
[`method: Browser.newContext`] allows to set viewport size (and more) for all pages in the context at once.

[`method: Page.setViewportSize`] will resize the page. A lot of websites don't expect phones to change size, so you should set the
viewport size before navigating to the page. [`method: Page.setViewportSize`] will also reset `screen` size, use [`method: Browser.newContext`] with `screen` and `viewport` parameters if you need better control of these properties.

**Usage**

```js
const page = await browser.newPage();
await page.setViewportSize({
  width: 640,
  height: 480,
});
await page.goto('https://example.com');
```

```java
Page page = browser.newPage();
page.setViewportSize(640, 480);
page.navigate("https://example.com");
```

```python
page = await browser.new_page()
await page.set_viewport_size({"width": 640, "height": 480})
await page.goto("https://example.com")
```

```python
page = browser.new_page()
page.set_viewport_size({"width": 640, "height": 480})
page.goto("https://example.com")
```

```csharp
var page = await browser.NewPageAsync();
await page.SetViewportSizeAsync(640, 480);
await page.GotoAsync("https://www.microsoft.com");
```

### param: Page.setViewportSize.viewportSize
* since: v1.8
* langs: js, python
- `viewportSize` "ViewportSize" <[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

### param: Page.setViewportSize.width
* since: v1.10
* langs: csharp, java
- `width` <[int]>

Page width in pixels.

### param: Page.setViewportSize.height
* since: v1.10
* langs: csharp, java
- `height` <[int]>

Page height in pixels.

## async method: Page.ariaSnapshot
* since: v1.59
- returns: <[string]>

Captures the aria snapshot of the page. Read more about aria snapshots.

### option: Page.ariaSnapshot.mode
* since: v1.59
- `mode` "AriaSnapshotMode" <"ai"|"default">

When set to `"ai"`, returns a snapshot optimized for AI consumption: including element references like `[ref=e2]` and snapshots of ``s. Defaults to `"default"`.

### option: Page.ariaSnapshot.timeout = %%-input-timeout-%%
* since: v1.59

### option: Page.ariaSnapshot.timeout = %%-input-timeout-js-%%
* since: v1.59

### option: Page.ariaSnapshot.depth
* since: v1.59
- `depth` <[int]>

When specified, limits the depth of the snapshot.

### option: Page.ariaSnapshot.boxes
* since: v1.60
- `boxes` <[boolean]>

When `true`, appends each element's bounding box as `[box=x,y,width,height]` to the snapshot. Coordinates are
relative to the viewport, in CSS pixels, as returned by `Element.getBoundingClientRect()`.
Defaults to `false`.

## async method: Page.ariaSnapshotJSON
* since: v1.63
* langs: js
- returns: <[Serializable]>

Captures the aria snapshot of the page as a free form JSON object.
Returns the same tree as [`method: Page.ariaSnapshot`], serialized as a JSON value instead of YAML markup.
See [`method: Locator.ariaSnapshotJSON`] for the details of the format.

### option: Page.ariaSnapshotJSON.mode
* since: v1.63
- `mode` "AriaSnapshotMode" <"ai"|"default">

When set to `"ai"`, returns a snapshot optimized for AI consumption: including element references like `[ref=e2]` and snapshots of ``s. Defaults to `"default"`.

### option: Page.ariaSnapshotJSON.timeout = %%-input-timeout-%%
* since: v1.63

### option: Page.ariaSnapshotJSON.timeout = %%-input-timeout-js-%%
* since: v1.63

### option: Page.ariaSnapshotJSON.depth
* since: v1.63
- `depth` <[int]>

When specified, limits the depth of the snapshot.

### option: Page.ariaSnapshotJSON.boxes
* since: v1.63
- `boxes` <[boolean]>

When `true`, includes each element's bounding box as a `box` property with `x`, `y`, `width` and `height`. Coordinates are
relative to the viewport, in CSS pixels, as returned by `Element.getBoundingClientRect()`.
Defaults to `false`.

## async method: Page.tap
* since: v1.8
* discouraged: Use locator-based [`method: Locator.tap`] instead. Read more about locators.

This method taps an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
[`method: Page.tap`] will throw if the [`option: Browser.newContext.hasTouch`] option of the browser context is false.
:::

### param: Page.tap.selector = %%-input-selector-%%
* since: v1.8

### option: Page.tap.force = %%-input-force-%%
* since: v1.8

### option: Page.tap.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.tap.position = %%-input-position-%%
* since: v1.8

### option: Page.tap.strict = %%-input-strict-%%
* since: v1.14

### option: Page.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about locators.
- returns: <[null]|[string]>

Returns `element.textContent`.

### param: Page.textContent.selector = %%-input-selector-%%
* since: v1.8

### option: Page.textContent.strict = %%-input-strict-%%
* since: v1.14

### option: Page.textContent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.textContent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.title
* since: v1.8
- returns: <[string]>

Returns the page's title.

## property: Page.touchscreen
* since: v1.8
- type: <[Touchscreen]>

## async method: Page.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `page.type` can be used to send
fine-grained keyboard events. To fill values in form fields, use [`method: Page.fill`].

To press a special key, like `Control` or `ArrowDown`, use [`method: Keyboard.press`].

**Usage**

### param: Page.type.selector = %%-input-selector-%%
* since: v1.8

### param: Page.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: Page.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key <example-value> in milliseconds. Defaults to 0.

### option: Page.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.type.strict = %%-input-strict-%%
* since: v1.14

### option: Page.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about locators.

This method unchecks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.uncheck.selector = %%-input-selector-%%
* since: v1.8

### option: Page.uncheck.force = %%-input-force-%%
* since: v1.8

### option: Page.uncheck.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.uncheck.position = %%-input-position-%%
* since: v1.11

### option: Page.uncheck.strict = %%-input-strict-%%
* since: v1.14

### option: Page.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.uncheck.trial = %%-input-trial-%%
* since: v1.11

## async method: Page.unrouteAll
* since: v1.41

Removes all routes created with [`method: Page.route`] and [`method: Page.routeFromHAR`].

### option: Page.unrouteAll.behavior = %%-unroute-all-options-behavior-%%
* since: v1.41
