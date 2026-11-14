---
title: "class: Locator (part 2 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator (part 2 of 6)

## async method: Locator.click
* since: v1.14

Click an element.

**Details**

This method clicks the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element, or the specified [`option: position`].
1. Wait for initiated navigations to either succeed or fail, unless [`option: noWaitAfter`] option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

**Usage**

Click a button:

```js
await page.getByRole('button').click();
```

```java
page.getByRole(AriaRole.BUTTON).click();
```

```python
await page.get_by_role("button").click()
```

```python
page.get_by_role("button").click()
```

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync();
```

Shift-right-click at a specific position on a canvas:

```js
await page.locator('canvas').click({
  button: 'right',
  modifiers: ['Shift'],
  position: { x: 23, y: 32 },
});
```

```java
page.locator("canvas").click(new Locator.ClickOptions()
  .setButton(MouseButton.RIGHT)
  .setModifiers(Arrays.asList(KeyboardModifier.SHIFT))
  .setPosition(23, 32));
```

```python
await page.locator("canvas").click(
    button="right", modifiers=["Shift"], position={"x": 23, "y": 32}
)
```

```python
page.locator("canvas").click(
    button="right", modifiers=["Shift"], position={"x": 23, "y": 32}
)
```

```csharp
await page.Locator("canvas").ClickAsync(new() {
  Button = MouseButton.Right,
  Modifiers = new[] { KeyboardModifier.Shift },
  Position = new Position { X = 0, Y = 0 }
});
```

### option: Locator.click.button = %%-input-button-%%
* since: v1.14

### option: Locator.click.clickCount = %%-input-click-count-%%
* since: v1.14

### option: Locator.click.delay = %%-input-down-up-delay-%%
* since: v1.14

### option: Locator.click.position = %%-input-position-%%
* since: v1.14

### option: Locator.click.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.click.force = %%-input-force-%%
* since: v1.14

### option: Locator.click.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.click.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.14

### option: Locator.click.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.click.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.click.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.click.steps = %%-input-mousemove-steps-%%
* since: v1.57

## async method: Locator.count
* since: v1.14
- returns: <[int]>

Returns the number of elements matching the locator.

:::warning[Asserting count]
If you need to assert the number of elements on the page, prefer [`method: LocatorAssertions.toHaveCount`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const count = await page.getByRole('listitem').count();
```

```python
count = await page.get_by_role("listitem").count()
```

```python
count = page.get_by_role("listitem").count()
```

```java
int count = page.getByRole(AriaRole.LISTITEM).count();
```

```csharp
int count = await page.GetByRole(AriaRole.Listitem).CountAsync();
```

## async method: Locator.dblclick
* since: v1.14
* langs:
  - alias-csharp: DblClickAsync

Double-click an element.

**Details**

This method double clicks the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to double click in the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`element.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

### option: Locator.dblclick.button = %%-input-button-%%
* since: v1.14

### option: Locator.dblclick.delay = %%-input-down-up-delay-%%
* since: v1.14

### option: Locator.dblclick.position = %%-input-position-%%
* since: v1.14

### option: Locator.dblclick.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.dblclick.force = %%-input-force-%%
* since: v1.14

### option: Locator.dblclick.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.dblclick.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.dblclick.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.dblclick.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.dblclick.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.dblclick.steps = %%-input-mousemove-steps-%%
* since: v1.57

## method: Locator.describe
* since: v1.53
- returns: <[Locator]>

Describes the locator, description is used in the trace viewer and reports.
Returns the locator pointing to the same element.

**Usage**

```js
const button = page.getByTestId('btn-sub').describe('Subscribe button');
await button.click();
```

```java
Locator button = page.getByTestId("btn-sub").describe("Subscribe button");
button.click();
```

```python
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
await button.click()
```

```python
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
button.click()
```

```csharp
var button = Page.GetByTestId("btn-sub").Describe("Subscribe button");
await button.ClickAsync();
```

### param: Locator.describe.description
* since: v1.53
- `description` <[string]>

Locator description.

## method: Locator.description
* since: v1.57
* langs: python, java, csharp
- returns: <[null]|[string]>

Returns locator description previously set with [`method: Locator.describe`]. Returns `null` if no custom description has been set.

**Usage**

```python
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

```python
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

```java
Locator button = page.getByRole(AriaRole.BUTTON).describe("Subscribe button");
System.out.println(button.description()); // "Subscribe button"

Locator input = page.getByRole(AriaRole.TEXTBOX);
System.out.println(input.description()); // null
```

```csharp
var button = Page.GetByRole(AriaRole.Button).Describe("Subscribe button");
Console.WriteLine(button.Description()); // "Subscribe button"

var input = Page.GetByRole(AriaRole.Textbox);
Console.WriteLine(input.Description()); // null
```

## method: Locator.description
* since: v1.57
* langs: js
- returns: <[null]|[string]>

Returns locator description previously set with [`method: Locator.describe`]. Returns `null` if no custom description has been set. Prefer [`method: Locator.toString`] for a human-readable representation, as it uses the description when available.

**Usage**

```js
const button = page.getByRole('button').describe('Subscribe button');
console.log(button.description()); // "Subscribe button"

const input = page.getByRole('textbox');
console.log(input.description()); // null
```

## async method: Locator.dispatchEvent
* since: v1.14

Programmatically dispatch an event on the matching element.

**Usage**

```js
await locator.dispatchEvent('click');
```

```java
locator.dispatchEvent("click");
```

```python
await locator.dispatch_event("click")
```

```python
locator.dispatch_event("click")
```

```csharp
await locator.DispatchEventAsync("click");
```

**Details**

The snippet above dispatches the `click` event on the element. Regardless of the visibility state of the element, `click`
is dispatched. This is equivalent to calling
element.click().

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

You can also specify [JSHandle] as the property value if you want live objects to be passed into the event:

```js
const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
await locator.dispatchEvent('dragstart', { dataTransfer });
```

```java
JSHandle dataTransfer = page.evaluateHandle("() => new DataTransfer()");
Map<String, Object> arg = new HashMap<>();
arg.put("dataTransfer", dataTransfer);
locator.dispatchEvent("dragstart", arg);
```

```python
data_transfer = await page.evaluate_handle("new DataTransfer()")
await locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```python
data_transfer = page.evaluate_handle("new DataTransfer()")
locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await locator.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

### param: Locator.dispatchEvent.type
* since: v1.14
- `type` <[string]>

DOM event type: `"click"`, `"dragstart"`, etc.

### param: Locator.dispatchEvent.eventInit
* since: v1.14
- `eventInit` ?<[EvaluationArgument]>

Optional event-specific initialization properties.

### option: Locator.dispatchEvent.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.dispatchEvent.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.dragTo
* since: v1.18

Drag the source element towards the target element and drop it.

**Details**

This method drags the locator to another target locator or target position. It will
first move to the source element, perform a `mousedown`, then move to the target
element or position and perform a `mouseup`.

**Usage**

```js
const source = page.locator('#source');
const target = page.locator('#target');

await source.dragTo(target);
// or specify exact positions relative to the top-left corners of the elements:
await source.dragTo(target, {
  sourcePosition: { x: 34, y: 7 },
  targetPosition: { x: 10, y: 20 },
});
```

```java
Locator source = page.locator("#source");
Locator target = page.locator("#target");

source.dragTo(target);
// or specify exact positions relative to the top-left corners of the elements:
source.dragTo(target, new Locator.DragToOptions()
  .setSourcePosition(34, 7).setTargetPosition(10, 20));
```

```python
source = page.locator("#source")
target = page.locator("#target")

await source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
await source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```python
source = page.locator("#source")
target = page.locator("#target")

source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

```csharp
var source = Page.Locator("#source");
var target = Page.Locator("#target");

await source.DragToAsync(target);
// or specify exact positions relative to the top-left corners of the elements:
await source.DragToAsync(target, new()
{
    SourcePosition = new() { X = 34, Y = 7 },
    TargetPosition = new() { X = 10, Y = 20 },
});
```

### param: Locator.dragTo.target
* since: v1.18
- `target` <[Locator]>

Locator of the element to drag to.

### option: Locator.dragTo.force = %%-input-force-%%
* since: v1.18

### option: Locator.dragTo.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.dragTo.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.18

### option: Locator.dragTo.timeout = %%-input-timeout-%%
* since: v1.18

### option: Locator.dragTo.timeout = %%-input-timeout-js-%%
* since: v1.18

### option: Locator.dragTo.trial = %%-input-trial-%%
* since: v1.18

### option: Locator.dragTo.sourcePosition = %%-input-source-position-%%
* since: v1.18

### option: Locator.dragTo.targetPosition = %%-input-target-position-%%
* since: v1.18

### option: Locator.dragTo.steps = %%-input-drag-steps-%%
* since: v1.57

## async method: Locator.drop
* since: v1.60

Simulate an external drag-and-drop of files or clipboard-like data onto this locator.

**Details**

Dispatches the native `dragenter`, `dragover`, and `drop` events at the center of the
target element with a synthetic [DataTransfer] carrying the provided files and/or data
entries. Works cross-browser by constructing the [DataTransfer] in the page context.

If the target element's `dragover` listener does not call `preventDefault()`, the target
is considered to have rejected the drop: Playwright dispatches `dragleave` and this
method throws.

**Usage**

Drop a file buffer onto an upload area:

```js
await page.locator('#dropzone').drop({
  files: { name: 'note.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') },
});
```

Drop plain text and a URL together:

```js
await page.locator('#dropzone').drop({
  data: {
    'text/plain': 'hello world',
    'text/uri-list': 'https://example.com',
  },
});
```

### param: Locator.drop.payload = %%-drop-payload-%%
* since: v1.60

### option: Locator.drop.position = %%-input-position-%%
* since: v1.60

### option: Locator.drop.timeout = %%-input-timeout-%%
* since: v1.60

### option: Locator.drop.timeout = %%-input-timeout-js-%%
* since: v1.60

## async method: Locator.elementHandle
* since: v1.14
* discouraged: Always prefer using [Locator]s and web assertions over [ElementHandle]s because latter are inherently racy.
- returns: <[ElementHandle]>

Resolves given locator to the first matching DOM element. If there are no matching elements, waits for one. If multiple elements match the locator, throws.

### option: Locator.elementHandle.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.elementHandle.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.elementHandles
* since: v1.14
* discouraged: Always prefer using [Locator]s and web assertions over [ElementHandle]s because latter are inherently racy.
- returns: <[Array]<[ElementHandle]>>

Resolves given locator to all matching DOM elements. If there are no matching elements, returns an empty list.
