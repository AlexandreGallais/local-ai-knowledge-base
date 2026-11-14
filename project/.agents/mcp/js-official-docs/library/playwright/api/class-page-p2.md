---
title: "class: Page (part 2 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 2 of 14)

## async method: Page.addInitScript
* since: v1.8
- returns: <[Disposable]>

Adds a script which would be evaluated in one of the following scenarios:
* Whenever the page is navigated.
* Whenever the child frame is attached or navigated. In this case, the script is evaluated in the context of the newly
  attached frame.

The script is evaluated after the document was created but before any of its scripts were run. This is useful to amend
the JavaScript environment, e.g. to seed `Math.random`.

**Usage**

An example of overriding `Math.random` before the page loads:

```js
// preload.js
Math.random = () => 42;
```

```js
// In your playwright script, assuming the preload.js file is in same directory
await page.addInitScript({ path: './preload.js' });
```

```js
await page.addInitScript(mock => {
  window.mock = mock;
}, mock);
```

```java
// In your playwright script, assuming the preload.js file is in same directory
page.addInitScript(Paths.get("./preload.js"));
```

```python
# in your playwright script, assuming the preload.js file is in same directory
await page.add_init_script(path="./preload.js")
```

```python
# in your playwright script, assuming the preload.js file is in same directory
page.add_init_script(path="./preload.js")
```

```csharp
await Page.AddInitScriptAsync(scriptPath: "./preload.js");
```

:::note
The order of evaluation of multiple scripts installed via [`method: BrowserContext.addInitScript`] and
[`method: Page.addInitScript`] is not defined.
:::

### param: Page.addInitScript.script
* since: v1.8
* langs: js
- `script` <[function]|[string]|[Object]>
  - `path` ?<[path]> Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the
    current working directory. Optional.
  - `content` ?<[string]> Raw script content. Optional.

Script to be evaluated in the page.

### param: Page.addInitScript.script
* since: v1.8
* langs: csharp, java
- `script` <[string]|[path]>

Script to be evaluated in all pages in the browser context.

### param: Page.addInitScript.arg
* since: v1.8
* langs: js
- `arg` ?<[Serializable]>

Optional argument to pass to [`param: script`] (only supported when passing a function).

### option: Page.addInitScript.path
* since: v1.8
* langs: python
- `path` ?<[path]>

Path to the JavaScript file. If `path` is a relative path, then it is resolved relative to the current working directory. Optional.

### param: Page.addInitScript.script
* since: v1.8
* langs: python
- `script` ?<[string]>

Script to be evaluated in all pages in the browser context. Optional.

### option: Page.addInitScript.exposeFunctions = %%-js-init-script-expose-functions-%%
* since: v1.62

## async method: Page.addScriptTag
* since: v1.8
- returns: <[ElementHandle]>

Adds a `<script>` tag into the page with the desired url or content. Returns the added tag when the script's onload
fires or when the script content was injected into frame.

### option: Page.addScriptTag.url
* since: v1.8
- `url` <[string]>

URL of a script to be added.

### option: Page.addScriptTag.path
* since: v1.8
- `path` <[path]>

Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Page.addScriptTag.content
* since: v1.8
- `content` <[string]>

Raw JavaScript content to be injected into frame.

### option: Page.addScriptTag.type
* since: v1.8
- `type` <[string]>

Script type. Use 'module' in order to load a JavaScript ES6 module. See
script for more details.

## async method: Page.addStyleTag
* since: v1.8
- returns: <[ElementHandle]>

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the
content. Returns the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

### option: Page.addStyleTag.url
* since: v1.8
- `url` <[string]>

URL of the `<link>` tag.

### option: Page.addStyleTag.path
* since: v1.8
- `path` <[path]>

Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to the
current working directory.

### option: Page.addStyleTag.content
* since: v1.8
- `content` <[string]>

Raw CSS content to be injected into frame.

## async method: Page.bringToFront
* since: v1.8

Brings page to front (activates tab).

## async method: Page.cancelPickLocator
* since: v1.59

Cancels an ongoing [`method: Page.pickLocator`] call by deactivating pick locator mode.
If no pick locator mode is active, this method is a no-op.

## async method: Page.check
* since: v1.8
* discouraged: Use locator-based [`method: Locator.check`] instead. Read more about locators.

This method checks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.check.selector = %%-input-selector-%%
* since: v1.8

### option: Page.check.force = %%-input-force-%%
* since: v1.8

### option: Page.check.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.check.position = %%-input-position-%%
* since: v1.11

### option: Page.check.strict = %%-input-strict-%%
* since: v1.14

### option: Page.check.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.check.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.check.trial = %%-input-trial-%%
* since: v1.11

## async method: Page.click
* since: v1.8
* discouraged: Use locator-based [`method: Locator.click`] instead. Read more about locators.

This method clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Page.click.selector = %%-input-selector-%%
* since: v1.8

### option: Page.click.button = %%-input-button-%%
* since: v1.8

### option: Page.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: Page.click.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Page.click.force = %%-input-force-%%
* since: v1.8

### option: Page.click.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.click.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Page.click.position = %%-input-position-%%
* since: v1.8

### option: Page.click.strict = %%-input-strict-%%
* since: v1.14

### option: Page.click.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.click.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.click.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.close
* since: v1.8

If [`option: runBeforeUnload`] is `false`, does not run any unload handlers and waits for the page to be closed. If
[`option: runBeforeUnload`] is `true` the method will run unload handlers, but will **not** wait for the page to close.

By default, `page.close()` **does not** run `beforeunload` handlers.

:::note
if [`option: runBeforeUnload`] is passed as true, a `beforeunload` dialog might be summoned and should be handled
manually via [`event: Page.dialog`] event.
:::

### option: Page.close.reason
* since: v1.40
- `reason` <[string]>

The reason to be reported to the operations interrupted by the page closure.

### option: Page.close.runBeforeUnload
* since: v1.8
- `runBeforeUnload` <[boolean]>

Defaults to `false`. Whether to run the
before unload page handlers.

## async method: Page.content
* since: v1.8
- returns: <[string]>

Gets the full HTML contents of the page, including the doctype.

### option: Page.content.includeShadow = %%-content-option-include-shadow-%%
* since: v1.64

## method: Page.context
* since: v1.8
- returns: <[BrowserContext]>

Get the browser context that the page belongs to.

## property: Page.coverage
* since: v1.8
* langs: js
- type: <[Coverage]>

:::note
Only available for Chromium atm.
:::

Browser-specific Coverage implementation. See Coverage for more details.

## async method: Page.dblclick
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dblclick`] instead. Read more about locators.
* langs:
  - alias-csharp: DblClickAsync

This method double clicks an element matching [`param: selector`] by performing the following steps:
1. Find an element matching [`param: selector`]. If there is none, wait until a matching element is attached to
   the DOM.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`page.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### param: Page.dblclick.selector = %%-input-selector-%%
* since: v1.8

### option: Page.dblclick.button = %%-input-button-%%
* since: v1.8

### option: Page.dblclick.force = %%-input-force-%%
* since: v1.8

### option: Page.dblclick.scroll = %%-input-scroll-%%
* since: v1.62

### option: Page.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: Page.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Page.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Page.dblclick.position = %%-input-position-%%
* since: v1.8

### option: Page.dblclick.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dblclick.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Page.dblclick.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Page.dispatchEvent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dispatchEvent`] instead. Read more about locators.

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
element.click().

**Usage**

```js
await page.dispatchEvent('button#submit', 'click');
```

```java
page.dispatchEvent("button#submit", "click");
```

```python
await page.dispatch_event("button#submit", "click")
```

```python
page.dispatch_event("button#submit", "click")
```

```csharp
await page.DispatchEventAsync("button#submit", "click");
```

Under the hood, it creates an instance of an event based on the given [`param: type`], initializes it with
[`param: eventInit`] properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by
default.

Since [`param: eventInit`] is event-specific, please refer to the events documentation for the lists of initial
properties:
* DeviceMotionEvent
* DeviceOrientationEvent
* DragEvent
* Event
* FocusEvent
* KeyboardEvent
* MouseEvent
* PointerEvent
* TouchEvent
* WheelEvent

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```js
// Note you can only create DataTransfer in Chromium and Firefox
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await page.dispatchEvent('#source', 'dragstart', { dataTransfer });
```

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
page.dispatchEvent("#source", "dragstart", arg);
```

```python
# note you can only create data_transfer in chromium and firefox
data_transfer = await page.evaluate_handle("new DataTransfer()")
await page.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```python
# note you can only create data_transfer in chromium and firefox
data_transfer = page.evaluate_handle("new DataTransfer()")
page.dispatch_event("#source", "dragstart", { "dataTransfer": data_transfer })
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await page.DispatchEventAsync("#source", "dragstart", new { dataTransfer });
```

### param: Page.dispatchEvent.selector = %%-input-selector-%%
* since: v1.8

### param: Page.dispatchEvent.type
* since: v1.8
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: Page.dispatchEvent.eventInit
* since: v1.8
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

### option: Page.dispatchEvent.strict = %%-input-strict-%%
* since: v1.14

### option: Page.dispatchEvent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.dispatchEvent.timeout = %%-input-timeout-js-%%
* since: v1.8
