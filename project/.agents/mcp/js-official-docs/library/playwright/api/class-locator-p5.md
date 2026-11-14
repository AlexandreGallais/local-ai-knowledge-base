---
title: "class: Locator (part 5 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator (part 5 of 6)

## async method: Locator.press
* since: v1.14

Focuses the matching element and presses a combination of the keys.

**Usage**

```js
await page.getByRole('textbox').press('Backspace');
```

```java
page.getByRole(AriaRole.TEXTBOX).press("Backspace");
```

```python
await page.get_by_role("textbox").press("Backspace")
```

```python
page.get_by_role("textbox").press("Backspace")
```

```csharp
await page.GetByRole(AriaRole.Textbox).PressAsync("Backspace");
```

**Details**

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

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

### param: Locator.press.key
* since: v1.14
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Locator.press.delay
* since: v1.14
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Locator.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.14

### option: Locator.press.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.press.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.pressSequentially
* since: v1.38

:::tip
In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page.
:::

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: Locator.press`].

**Usage**

```js
await locator.pressSequentially('Hello'); // Types instantly
await locator.pressSequentially('World', { delay: 100 }); // Types slower, like a user
```

```java
locator.pressSequentially("Hello"); // Types instantly
locator.pressSequentially("World", new Locator.pressSequentiallyOptions().setDelay(100)); // Types slower, like a user
```

```python
await locator.press_sequentially("hello") # types instantly
await locator.press_sequentially("world", delay=100) # types slower, like a user
```

```python
locator.press_sequentially("hello") # types instantly
locator.press_sequentially("world", delay=100) # types slower, like a user
```

```csharp
await locator.PressSequentiallyAsync("Hello"); // Types instantly
await locator.PressSequentiallyAsync("World", new() { Delay = 100 }); // Types slower, like a user
```

An example of typing into a text field and then submitting the form:

```js
const locator = page.getByLabel('<example-value>');
await locator.pressSequentially('<example-value>');
await locator.press('Enter');
```

```java
Locator locator = page.getByLabel("<example-value>");
locator.pressSequentially("<example-value>");
locator.press("Enter");
```

```python
locator = page.get_by_label("<example-value>")
await locator.press_sequentially("<example-value>")
await locator.press("Enter")
```

```python
locator = page.get_by_label("<example-value>")
locator.press_sequentially("<example-value>")
locator.press("Enter")
```

```csharp
var locator = page.GetByLabel("<example-value>");
await locator.PressSequentiallyAsync("<example-value>");
await locator.PressAsync("Enter");
```

### param: Locator.pressSequentially.text
* since: v1.38
- `text` <[string]>

String of characters to sequentially press into a focused element.

### option: Locator.pressSequentially.delay
* since: v1.38
- `delay` <[float]>

Time to wait between key <example-value> in milliseconds. Defaults to 0.

### option: Locator.pressSequentially.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.38

### option: Locator.pressSequentially.timeout = %%-input-timeout-%%
* since: v1.38

### option: Locator.pressSequentially.timeout = %%-input-timeout-js-%%
* since: v1.38

## async method: Locator.screenshot
* since: v1.14
- returns: <[Buffer]>

Take a screenshot of the element matching the locator.

**Usage**

```js
await page.getByRole('link').screenshot();
```

```java
page.getByRole(AriaRole.LINK).screenshot();
```

```python
await page.get_by_role("link").screenshot()
```

```python
page.get_by_role("link").screenshot()
```

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync();
```

Disable animations and save screenshot to a file:

```js
await page.getByRole('link').screenshot({ animations: 'disabled', path: 'link.png' });
```

```java
page.getByRole(AriaRole.LINK).screenshot(new Locator.ScreenshotOptions()
    .setAnimations(ScreenshotAnimations.DISABLED)
    .setPath(Paths.get("example.png")));
```

```python
await page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

```python
page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync(new() {
  Animations = ScreenshotAnimations.Disabled,
  Path = "link.png"
});
```

**Details**

This method captures a screenshot of the page, clipped to the size and position of a particular element matching the locator. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the actionability checks, then scrolls element into view before taking a
screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

### option: Locator.screenshot.-inline- = %%-screenshot-options-common-list-v1.8-%%
* since: v1.14

### option: Locator.screenshot.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.screenshot.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.screenshot.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.34

### option: Locator.screenshot.style = %%-screenshot-option-style-%%
* since: v1.41

## async method: Locator.scrollIntoViewIfNeeded
* since: v1.14

This method waits for actionability checks, then tries to scroll element into view, unless it is
completely visible as defined by
IntersectionObserver's `ratio`.

See scrolling for alternative ways to scroll.

### option: Locator.scrollIntoViewIfNeeded.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.scrollIntoViewIfNeeded.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.selectOption
* since: v1.14
- returns: <[Array]<[string]>>

Selects option or options in `<select>`.

**Details**

This method waits for actionability checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```html
<select multiple>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

```js
// single selection matching the value or label
element.selectOption('blue');

// single selection matching the label
element.selectOption({ label: 'Blue' });

// multiple selection for red, green and blue options
element.selectOption(['red', 'green', 'blue']);
```

```java
// single selection matching the value or label
element.selectOption("blue");
// single selection matching the label
element.selectOption(new SelectOption().setLabel("Blue"));
// multiple selection for blue, red and second option
element.selectOption(new String[] {"red", "green", "blue"});
```

```python
# single selection matching the value or label
await element.select_option("blue")
# single selection matching the label
await element.select_option(label="blue")
# multiple selection for blue, red and second option
await element.select_option(value=["red", "green", "blue"])
```

```python
# single selection matching the value or label
element.select_option("blue")
# single selection matching the label
element.select_option(label="blue")
# multiple selection for blue, red and second option
element.select_option(value=["red", "green", "blue"])
```

```csharp
// single selection matching the value or label
await element.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await element.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection for blue, red and second option
await element.SelectOptionAsync(new[] { "red", "green", "blue" });
```

### param: Locator.selectOption.values = %%-select-options-values-%%
* since: v1.14

### option: Locator.selectOption.force = %%-input-force-%%
* since: v1.14

### option: Locator.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.selectOption.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.selectOption.element = %%-python-select-options-element-%%
* since: v1.14

### option: Locator.selectOption.index = %%-python-select-options-index-%%
* since: v1.14

### param: Locator.selectOption.value = %%-python-select-options-value-%%
* since: v1.14

### option: Locator.selectOption.label = %%-python-select-options-label-%%
* since: v1.14

## async method: Locator.selectText
* since: v1.14

This method waits for actionability checks, then focuses the element and selects all its text
content.

If the element is inside the `` element that has an associated control, focuses and selects text in the control instead.

### option: Locator.selectText.force = %%-input-force-%%
* since: v1.14

### option: Locator.selectText.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.selectText.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.setChecked
* since: v1.15

Set the state of a checkbox or a radio element.

**Usage**

```js
await page.getByRole('checkbox').setChecked(true);
```

```java
page.getByRole(AriaRole.CHECKBOX).setChecked(true);
```

```python
await page.get_by_role("checkbox").set_checked(True)
```

```python
page.get_by_role("checkbox").set_checked(True)
```

```csharp
await page.GetByRole(AriaRole.Checkbox).SetCheckedAsync(true);
```

**Details**

This method checks or unchecks an element by performing the following steps:
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: Locator.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: Locator.setChecked.force = %%-input-force-%%
* since: v1.15

### option: Locator.setChecked.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: Locator.setChecked.position = %%-input-position-%%
* since: v1.15

### option: Locator.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: Locator.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: Locator.setChecked.trial = %%-input-trial-%%
* since: v1.15
