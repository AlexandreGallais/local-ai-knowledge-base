---
title: "class: ElementHandle (part 2 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-elementhandle.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: ElementHandle (part 2 of 3)

## async method: ElementHandle.evalOnSelectorAll
* since: v1.9
* discouraged: In most cases, [`method: Locator.evaluateAll`],
  other [Locator] helper methods and web-first assertions do a better job.
* langs:
  - alias-python: eval_on_selector_all
  - alias-js: $$eval
- returns: <[Serializable]>

Returns the return value of [`param: expression`].

The method finds all elements matching the specified selector in the `ElementHandle`'s subtree and passes an array of
matched elements as a first argument to [`param: expression`].

If [`param: expression`] returns a [Promise], then [`method: ElementHandle.evalOnSelectorAll`] would wait for the promise to resolve and return its
value.

**Usage**

```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```

```js
const feedHandle = await page.$('.feed');
expect(await feedHandle.$$eval('.tweet', nodes =>
  nodes.map(n => n.innerText))).toEqual(['Hello!', 'Hi!'],
);
```

```java
ElementHandle feedHandle = page.querySelector(".feed");
assertEquals(Arrays.asList("Hello!", "Hi!"), feedHandle.evalOnSelectorAll(".tweet", "nodes => nodes.map(n => n.innerText)"));
```

```python
feed_handle = await page.query_selector(".feed")
assert await feed_handle.eval_on_selector_all(".tweet", "nodes => nodes.map(n => n.innerText)") == ["hello!", "hi!"]
```

```python
feed_handle = page.query_selector(".feed")
assert feed_handle.eval_on_selector_all(".tweet", "nodes => nodes.map(n => n.innerText)") == ["hello!", "hi!"]
```

```csharp
var feedHandle = await page.QuerySelectorAsync(".feed");
Assert.AreEqual(new [] { "Hello!", "Hi!" }, await feedHandle.EvalOnSelectorAllAsync<string[]>(".tweet", "nodes => nodes.map(n => n.innerText)"));
```

### param: ElementHandle.evalOnSelectorAll.selector = %%-query-selector-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.expression = %%-evaluate-expression-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.expression = %%-js-evalonselectorall-pagefunction-%%
* since: v1.9

### param: ElementHandle.evalOnSelectorAll.arg
* since: v1.9
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

## async method: ElementHandle.fill
* since: v1.8
* discouraged: Use locator-based [`method: Locator.fill`] instead. Read more about locators.

This method waits for actionability checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an ``, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be filled instead.

To send fine-grained keyboard events, use [`method: Locator.pressSequentially`].

### param: ElementHandle.fill.value
* since: v1.8
- `value` <[string]>

Value to set for the ``, `<textarea>` or `[contenteditable]` element.

### option: ElementHandle.fill.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.fill.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.fill.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.fill.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.focus
* since: v1.8
* discouraged: Use locator-based [`method: Locator.focus`] instead. Read more about locators.

Calls focus on the element.

## async method: ElementHandle.getAttribute
* since: v1.8
* discouraged: Use locator-based [`method: Locator.getAttribute`] instead. Read more about locators.
- returns: <[null]|[string]>

Returns element attribute value.

### param: ElementHandle.getAttribute.name
* since: v1.8
- `name` <[string]>

Attribute name to get the value for.

## async method: ElementHandle.hover
* since: v1.8
* discouraged: Use locator-based [`method: Locator.hover`] instead. Read more about locators.

This method hovers over the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.hover.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.hover.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.hover.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.hover.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.hover.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.hover.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.hover.trial = %%-input-trial-%%
* since: v1.11

### option: ElementHandle.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: ElementHandle.innerHTML
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerHTML`] instead. Read more about locators.
- returns: <[string]>

Returns the `element.innerHTML`.

## async method: ElementHandle.innerText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.innerText`] instead. Read more about locators.
- returns: <[string]>

Returns the `element.innerText`.

## async method: ElementHandle.inputValue
* since: v1.13
* discouraged: Use locator-based [`method: Locator.inputValue`] instead. Read more about locators.
- returns: <[string]>

Returns `input.value` for the selected `` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `` element that has an associated control, returns the value of the control.

### option: ElementHandle.inputValue.timeout
* since: v1.13
* deprecated: This option is ignored. The value is returned immediately.
- `timeout` <[float]>

## async method: ElementHandle.isChecked
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isChecked`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

## async method: ElementHandle.isDisabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isDisabled`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of enabled.

## async method: ElementHandle.isEditable
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEditable`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is editable.

## async method: ElementHandle.isEnabled
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isEnabled`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is enabled.

## async method: ElementHandle.isHidden
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isHidden`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of visible.

## async method: ElementHandle.isVisible
* since: v1.8
* discouraged: Use locator-based [`method: Locator.isVisible`] instead. Read more about locators.
- returns: <[boolean]>

Returns whether the element is visible.

## async method: ElementHandle.ownerFrame
* since: v1.8
- returns: <[null]|[Frame]>

Returns the frame containing the given element.

## async method: ElementHandle.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about locators.

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

[`param: key`] can specify the intended
keyboardEvent.key value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
here. Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

### param: ElementHandle.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: ElementHandle.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: ElementHandle.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: ElementHandle.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

The method finds an element matching the specified selector in the `ElementHandle`'s subtree. If no elements match the selector,
returns `null`.

### param: ElementHandle.querySelector.selector = %%-query-selector-%%
* since: v1.9

## async method: ElementHandle.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

The method finds all elements matching the specified selector in the `ElementHandle`s subtree. If no elements match the selector,
returns empty array.

### param: ElementHandle.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9

## async method: ElementHandle.screenshot
* since: v1.8
* discouraged: Use locator-based [`method: Locator.screenshot`] instead. Read more about locators.
- returns: <[Buffer]>

This method captures a screenshot of the page, clipped to the size and position of this particular element. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the actionability checks, then scrolls element into view before taking a
screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

### option: ElementHandle.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.8

### option: ElementHandle.screenshot.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: ElementHandle.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: ElementHandle.scrollIntoViewIfNeeded
* discouraged: Use locator-based [`method: Locator.scrollIntoViewIfNeeded`] instead. Read more about locators.
* since: v1.8

This method waits for actionability checks, then tries to scroll element into view, unless it is
completely visible as defined by
IntersectionObserver's `ratio`.

Throws when `elementHandle` does not point to an element
connected to a Document or a ShadowRoot.

See scrolling for alternative ways to scroll.

### option: ElementHandle.scrollIntoViewIfNeeded.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.scrollIntoViewIfNeeded.timeout = %%-input-timeout-js-%%
* since: v1.8
