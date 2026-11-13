---
title: "class: Frame (part 4 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-frame.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Frame (part 4 of 5)

## async method: Frame.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about locators.

[`param: key`] can specify the intended
keyboardEvent.key value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
here. Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

### param: Frame.press.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Frame.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Frame.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Frame.press.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Frame.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

Returns the ElementHandle pointing to the frame element.

:::caution
The use of [ElementHandle] is discouraged, use [Locator] objects and web-first assertions instead.
:::

The method finds an element matching the specified selector within the frame. If no elements match the selector,
returns `null`.

### param: Frame.querySelector.selector = %%-query-selector-%%
* since: v1.9

### option: Frame.querySelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Frame.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Frame.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

Returns the ElementHandles pointing to the frame elements.

:::caution
The use of [ElementHandle] is discouraged, use [Locator] objects instead.
:::

The method finds all elements matching the specified selector within the frame. If no elements match the selector,
returns empty array.

### param: Frame.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9

## async method: Frame.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about locators.
- returns: <[Array]<[string]>>

This method waits for an element matching [`param: selector`], waits for actionability checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
frame.selectOption('select#colors', 'blue');

// single selection matching both the value and the label
frame.selectOption('select#colors', { label: 'Blue' });

// multiple selection
frame.selectOption('select#colors', ['red', 'green', 'blue']);
```

```java
// Single selection matching the value or label
frame.selectOption("select#colors", "blue");
// single selection matching both the value and the label
frame.selectOption("select#colors", new SelectOption().setLabel("Blue"));
// multiple selection
frame.selectOption("select#colors", new String[] {"red", "green", "blue"});
```

```python
# Single selection matching the value or label
await frame.select_option("select#colors", "blue")
# single selection matching the label
await frame.select_option("select#colors", label="blue")
# multiple selection
await frame.select_option("select#colors", value=["red", "green", "blue"])
```

```python
# Single selection matching the value or label
frame.select_option("select#colors", "blue")
# single selection matching both the label
frame.select_option("select#colors", label="blue")
# multiple selection
frame.select_option("select#colors", value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await frame.SelectOptionAsync("select#colors", new[] { "blue" });
// single selection matching both the value and the label
await frame.SelectOptionAsync("select#colors", new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await frame.SelectOptionAsync("select#colors", new[] { "red", "green", "blue" });
```

### param: Frame.selectOption.selector = %%-query-selector-%%
* since: v1.8

### param: Frame.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: Frame.selectOption.force = %%-input-force-%%
* since: v1.13

### option: Frame.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.selectOption.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### option: Frame.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: Frame.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### option: Frame.selectOption.label = %%-python-select-options-label-%%
* since: v1.8

## async method: Frame.setChecked
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

### param: Frame.setChecked.selector = %%-input-selector-%%
* since: v1.15

### param: Frame.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Frame.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Frame.setChecked.scroll = %%-input-scroll-%%
* since: v1.62

### option: Frame.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Frame.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Frame.setChecked.strict = %%-input-strict-%%
* since: v1.15

### option: Frame.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Frame.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Frame.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: Frame.setContent
* since: v1.8

This method internally calls document.write(), inheriting all its specific characteristics and behaviors.

### param: Frame.setContent.html
* since: v1.8
- `html` <[string]>

HTML markup to assign to the page.

### option: Frame.setContent.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Frame.setContent.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### option: Frame.setContent.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

## async method: Frame.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about locators.

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [`param: selector`] to point to an
input element. However, if the element is inside the `` element that has an associated control, targets the control instead.

### param: Frame.setInputFiles.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: Frame.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.setInputFiles.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.tap
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
`frame.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### param: Frame.tap.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.tap.force = %%-input-force-%%
* since: v1.8

### option: Frame.tap.scroll = %%-input-scroll-%%
* since: v1.62

### option: Frame.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: Frame.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.tap.position = %%-input-position-%%
* since: v1.8

### option: Frame.tap.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.11

## async method: Frame.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about locators.
- returns: <[null]|[string]>

Returns `element.textContent`.

### param: Frame.textContent.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.textContent.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.textContent.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.textContent.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.title
* since: v1.8
- returns: <[string]>

Returns the page title.

## async method: Frame.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text. `frame.type` can be used to
send fine-grained keyboard events. To fill values in form fields, use [`method: Frame.fill`].

To press a special key, like `Control` or `ArrowDown`, use [`method: Keyboard.press`].

**Usage**

### param: Frame.type.selector = %%-input-selector-%%
* since: v1.8

### param: Frame.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: Frame.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key <example-value> in milliseconds. Defaults to 0.

### option: Frame.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.type.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Frame.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about locators.

This method checks an element matching [`param: selector`] by performing the following steps:
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

### param: Frame.uncheck.selector = %%-input-selector-%%
* since: v1.8

### option: Frame.uncheck.force = %%-input-force-%%
* since: v1.8

### option: Frame.uncheck.scroll = %%-input-scroll-%%
* since: v1.62

### option: Frame.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: Frame.uncheck.position = %%-input-position-%%
* since: v1.11

### option: Frame.uncheck.strict = %%-input-strict-%%
* since: v1.14

### option: Frame.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: Frame.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: Frame.uncheck.trial = %%-input-trial-%%
* since: v1.11
