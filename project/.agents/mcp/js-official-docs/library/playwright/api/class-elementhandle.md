---
title: "class: ElementHandle (part 1 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-elementhandle.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: ElementHandle
* since: v1.8
* extends: [JSHandle]

ElementHandle represents an in-page DOM element. ElementHandles can be created with the [`method: Page.querySelector`] method.

:::warning[Discouraged]
The use of ElementHandle is discouraged, use [Locator] objects and web-first assertions instead.
:::

```js
const hrefElement = await page.$('a');
await hrefElement.click();
```

```java
ElementHandle hrefElement = page.querySelector("a");
hrefElement.click();
```

```python
href_element = await page.query_selector("a")
await href_element.click()
```

```python
href_element = page.query_selector("a")
href_element.click()
```

```csharp
var handle = await page.QuerySelectorAsync("a");
await handle.ClickAsync();
```

ElementHandle prevents DOM element from garbage collection unless the handle is disposed with
[`method: JSHandle.dispose`]. ElementHandles are auto-disposed when their origin frame gets navigated.

ElementHandle instances can be used as an argument in [`method: Page.evalOnSelector`] and [`method: Page.evaluate`] methods.

The difference between the [Locator] and ElementHandle is that the ElementHandle points to a particular element, while [Locator] captures the logic of how to retrieve an element.

In the example below, handle points to a particular DOM element on page. If that element changes text or is used by React to render an entirely different component, handle is still pointing to that very DOM element. This can lead to unexpected behaviors.

```js
const handle = await page.$('text=Submit');
// ...
await handle.hover();
await handle.click();
```

```java
ElementHandle handle = page.querySelector("text=Submit");
handle.hover();
handle.click();
```

```python
handle = await page.query_selector("text=Submit")
await handle.hover()
await handle.click()
```

```python
handle = page.query_selector("text=Submit")
handle.hover()
handle.click()
```

```csharp
var handle = await page.QuerySelectorAsync("text=Submit");
await handle.HoverAsync();
await handle.ClickAsync();
```

With the locator, every time the `element` is used, up-to-date DOM element is located in the page using the selector. So in the snippet below, underlying DOM element is going to be located twice.

```js
const locator = page.getByText('Submit');
// ...
await locator.hover();
await locator.click();
```

```java
Locator locator = page.getByText("Submit");
locator.hover();
locator.click();
```

```python
locator = page.get_by_text("Submit")
await locator.hover()
await locator.click()
```

```python
locator = page.get_by_text("Submit")
locator.hover()
locator.click()
```

```csharp
var locator = page.GetByText("Submit");
await locator.HoverAsync();
await locator.ClickAsync();
```

## async method: ElementHandle.boundingBox
* since: v1.8
- returns: "BoundingBox" <[null]|[Object]>
  * alias-csharp: ElementHandleBoundingBoxResult
  * alias-python: FloatRect
  - `x` <[float]> the x coordinate of the element in pixels.
  - `y` <[float]> the y coordinate of the element in pixels.
  - `width` <[float]> the width of the element in pixels.
  - `height` <[float]> the height of the element in pixels.

This method returns the bounding box of the element, or `null` if the element is not visible. The bounding box is
calculated relative to the main frame viewport - which is usually the same as the browser window.

Scrolling affects the returned bounding box, similarly to
Element.getBoundingClientRect. That
means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the
Element.getBoundingClientRect.

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following
snippet should click the center of the element.

**Usage**

```js
const box = await elementHandle.boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
```

```java
BoundingBox box = elementHandle.boundingBox();
page.mouse().click(box.x + box.width / 2, box.y + box.height / 2);
```

```python
box = await element_handle.bounding_box()
await page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```python
box = element_handle.bounding_box()
page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```csharp
var box = await elementHandle.BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

## async method: ElementHandle.check
* since: v1.8
* discouraged: Use locator-based [`method: Locator.check`] instead. Read more about locators.

This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.check.position = %%-input-position-%%
* since: v1.11

### option: ElementHandle.check.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.check.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.check.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.check.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.check.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.click
* since: v1.8
* discouraged: Use locator-based [`method: Locator.click`] instead. Read more about locators.

This method clicks the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.click.button = %%-input-button-%%
* since: v1.8

### option: ElementHandle.click.clickCount = %%-input-click-count-%%
* since: v1.8

### option: ElementHandle.click.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: ElementHandle.click.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.click.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.click.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.click.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: ElementHandle.click.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.click.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.click.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.click.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: ElementHandle.contentFrame
* since: v1.8
- returns: <[null]|[Frame]>

Returns the content frame for element handles referencing iframe nodes, or `null` otherwise

## async method: ElementHandle.dblclick
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dblclick`] instead. Read more about locators.
* langs:
  - alias-csharp: DblClickAsync

This method double clicks the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`elementHandle.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### option: ElementHandle.dblclick.button = %%-input-button-%%
* since: v1.8

### option: ElementHandle.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.8

### option: ElementHandle.dblclick.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.dblclick.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.dblclick.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.dblclick.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.dblclick.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.dblclick.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: ElementHandle.dispatchEvent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.dispatchEvent`] instead. Read more about locators.

The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
element.click().

**Usage**

```js
await elementHandle.dispatchEvent('click');
```

```java
elementHandle.dispatchEvent("click");
```

```python
await element_handle.dispatch_event("click")
```

```python
element_handle.dispatch_event("click")
```

```csharp
await elementHandle.DispatchEventAsync("click");
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
await elementHandle.dispatchEvent('dragstart', { dataTransfer });
```

```java
// Note you can only create DataTransfer in Chromium and Firefox
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
elementHandle.dispatchEvent("dragstart", arg);
```

```python
# note you can only create data_transfer in chromium and firefox
data_transfer = await page.evaluate_handle("new DataTransfer()")
await element_handle.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```python
# note you can only create data_transfer in chromium and firefox
data_transfer = page.evaluate_handle("new DataTransfer()")
element_handle.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await elementHandle.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

### param: ElementHandle.dispatchEvent.type
* since: v1.8
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: ElementHandle.dispatchEvent.eventInit
* since: v1.8
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

## async method: ElementHandle.evalOnSelector
* since: v1.9
* discouraged: This method does not wait for the element to pass <example-value>
  checks and therefore can lead to the flaky tests. Use [`method: Locator.evaluate`],
  other [Locator] helper methods or web-first assertions instead.
* langs:
  - alias-python: eval_on_selector
  - alias-js: $eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds an element matching the specified selector in the `ElementHandle`s subtree and passes it as a first
argument to [`param: expression`]. If no elements match the selector, the method throws an error.

If [`param: expression`] returns a [Promise], then [`method: ElementHandle.evalOnSelector`] would wait for the promise to resolve and return its
value.

**Usage**

```js
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
```

```java
ElementHandle tweetHandle = page.querySelector(".tweet");
assertEquals("100", tweetHandle.evalOnSelector(".like", "node => node.innerText"));
assertEquals("10", tweetHandle.evalOnSelector(".retweets", "node => node.innerText"));
```

```python
tweet_handle = await page.query_selector(".tweet")
assert await tweet_handle.eval_on_selector(".like", "node => node.innerText") == "100"
assert await tweet_handle.eval_on_selector(".retweets", "node => node.innerText") == "10"
```

```python
tweet_handle = page.query_selector(".tweet")
assert tweet_handle.eval_on_selector(".like", "node => node.innerText") == "100"
assert tweet_handle.eval_on_selector(".retweets", "node => node.innerText") == "10"
```

```csharp
var tweetHandle = await page.QuerySelectorAsync(".tweet");
Assert.AreEqual("100", await tweetHandle.EvalOnSelectorAsync(".like", "node => node.innerText"));
Assert.AreEqual("10", await tweetHandle.EvalOnSelectorAsync(".retweets", "node => node.innerText"));
```

### param: ElementHandle.evalOnSelector.selector = %%-query-selector-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.expression = %%-js-evalonselector-pagefunction-%%
* since: v1.9

### param: ElementHandle.evalOnSelector.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].
