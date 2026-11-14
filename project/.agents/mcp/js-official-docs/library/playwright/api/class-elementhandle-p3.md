---
title: "class: ElementHandle (part 3 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-elementhandle.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: ElementHandle (part 3 of 3)

## async method: ElementHandle.selectOption
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectOption`] instead. Read more about locators.
- returns: <[Array]<[string]>>

This method waits for actionability checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```js
// Single selection matching the value or label
handle.selectOption('blue');

// single selection matching the label
handle.selectOption({ label: 'Blue' });

// multiple selection
handle.selectOption(['red', 'green', 'blue']);
```

```java
// Single selection matching the value or label
handle.selectOption("blue");
// single selection matching the label
handle.selectOption(new SelectOption().setLabel("Blue"));
// multiple selection
handle.selectOption(new String[] {"red", "green", "blue"});
```

```python
# Single selection matching the value or label
await handle.select_option("blue")
# single selection matching the label
await handle.select_option(label="blue")
# multiple selection
await handle.select_option(value=["red", "green", "blue"])
```

```python
# Single selection matching the value or label
handle.select_option("blue")
# single selection matching both the label
handle.select_option(label="blue")
# multiple selection
handle.select_option(value=["red", "green", "blue"])
```

```csharp
// Single selection matching the value or label
await handle.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await handle.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await handle.SelectOptionAsync(new[] { "red", "green", "blue" });
// multiple selection for blue, red and second option
await handle.SelectOptionAsync(new[] {
    new SelectOptionValue() { Label = "blue" },
    new SelectOptionValue() { Index = 2 },
    new SelectOptionValue() { Value = "red" }});
```

### param: ElementHandle.selectOption.values = %%-select-options-values-%%
* since: v1.8

### option: ElementHandle.selectOption.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.selectOption.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.selectOption.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.selectOption.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.selectOption.element = %%-python-select-options-element-%%
* since: v1.8

### option: ElementHandle.selectOption.index = %%-python-select-options-index-%%
* since: v1.8

### param: ElementHandle.selectOption.value = %%-python-select-options-value-%%
* since: v1.8

### option: ElementHandle.selectOption.label = %%-python-select-options-label-%%
* since: v1.8

## async method: ElementHandle.selectText
* since: v1.8
* discouraged: Use locator-based [`method: Locator.selectText`] instead. Read more about locators.

This method waits for actionability checks, then focuses the element and selects all its text
content.

If the element is inside the `` element that has an associated control, focuses and selects text in the control instead.

### option: ElementHandle.selectText.force = %%-input-force-%%
* since: v1.13

### option: ElementHandle.selectText.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.selectText.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.setChecked
* discouraged: Use locator-based [`method: Locator.setChecked`] instead. Read more about locators.
* since: v1.15

This method checks or unchecks an element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for actionability checks on the matched element, unless [`option: force`] option is
   set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### param: ElementHandle.setChecked.checked = %%-input-checked-%%
* since: v1.15

### option: ElementHandle.setChecked.force = %%-input-force-%%
* since: v1.15

### option: ElementHandle.setChecked.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.setChecked.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.15

### option: ElementHandle.setChecked.position = %%-input-position-%%
* since: v1.15

### option: ElementHandle.setChecked.timeout = %%-input-timeout-%%
* since: v1.15

### option: ElementHandle.setChecked.timeout = %%-input-timeout-js-%%
* since: v1.15

### option: ElementHandle.setChecked.trial = %%-input-trial-%%
* since: v1.15

## async method: ElementHandle.setInputFiles
* since: v1.8
* discouraged: Use locator-based [`method: Locator.setInputFiles`] instead. Read more about locators.

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

This method expects [ElementHandle] to point to an
input element. However, if the element is inside the `` element that has an associated control, targets the control instead.

### param: ElementHandle.setInputFiles.files = %%-input-files-%%
* since: v1.8

### option: ElementHandle.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.tap
* since: v1.8
* discouraged: Use locator-based [`method: Locator.tap`] instead. Read more about locators.

This method taps the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`elementHandle.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### option: ElementHandle.tap.position = %%-input-position-%%
* since: v1.8

### option: ElementHandle.tap.modifiers = %%-input-modifiers-%%
* since: v1.8

### option: ElementHandle.tap.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.tap.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.tap.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.tap.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.tap.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.textContent
* since: v1.8
* discouraged: Use locator-based [`method: Locator.textContent`] instead. Read more about locators.
- returns: <[null]|[string]>

Returns the `node.textContent`.

## async method: ElementHandle.type
* since: v1.8
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: ElementHandle.press`].

**Usage**

### param: ElementHandle.type.text
* since: v1.8
- `text` <[string]>

A text to type into a focused element.

### option: ElementHandle.type.delay
* since: v1.8
- `delay` <[float]>

Time to wait between key <example-value> in milliseconds. Defaults to 0.

### option: ElementHandle.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.type.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.type.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.uncheck
* since: v1.8
* discouraged: Use locator-based [`method: Locator.uncheck`] instead. Read more about locators.

This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: ElementHandle.uncheck.position = %%-input-position-%%
* since: v1.11

### option: ElementHandle.uncheck.force = %%-input-force-%%
* since: v1.8

### option: ElementHandle.uncheck.scroll = %%-input-scroll-%%
* since: v1.62

### option: ElementHandle.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.8

### option: ElementHandle.uncheck.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.uncheck.trial = %%-input-trial-%%
* since: v1.11

## async method: ElementHandle.waitForElementState
* since: v1.8

Returns when the element satisfies the [`param: state`].

Depending on the [`param: state`] parameter, this method waits for one of the actionability checks
to pass. This method throws when the element is detached while waiting, unless waiting for the `"hidden"` state.
* `"visible"` Wait until the element is visible.
* `"hidden"` Wait until the element is not visible or
  not attached. Note that waiting for hidden does not throw when the element detaches.
* `"stable"` Wait until the element is both visible and
  stable.
* `"enabled"` Wait until the element is enabled.
* `"disabled"` Wait until the element is not enabled.
* `"editable"` Wait until the element is editable.

If the element does not satisfy the condition for the [`option: timeout`] milliseconds, this method will throw.

### param: ElementHandle.waitForElementState.state
* since: v1.8
- `state` "ElementState" <"visible"|"hidden"|"stable"|"enabled"|"disabled"|"editable">

A state to wait for, see below for more details.

### option: ElementHandle.waitForElementState.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.waitForElementState.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: ElementHandle.waitForSelector
* since: v1.8
* discouraged: Use web assertions that assert visibility or a locator-based [`method: Locator.waitFor`] instead.
- returns: <[null]|[ElementHandle]>

Returns element specified by selector when it satisfies [`option: state`] option. Returns `null` if waiting for `hidden`
or `detached`.

Wait for the [`param: selector`] relative to the element handle to satisfy [`option: state`] option (either
appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [`param: selector`] already
satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the
[`option: timeout`] milliseconds, the function will throw.

**Usage**

```js
await page.setContent(`<div><span></span></div>`);
const div = await page.$('div');
// Waiting for the 'span' selector relative to the div.
const span = await div.waitForSelector('span', { state: 'attached' });
```

```java
page.setContent("<div><span></span></div>");
ElementHandle div = page.querySelector("div");
// Waiting for the "span" selector relative to the div.
ElementHandle span = div.waitForSelector("span", new ElementHandle.WaitForSelectorOptions()
  .setState(WaitForSelectorState.ATTACHED));
```

```python
await page.set_content("<div><span></span></div>")
div = await page.query_selector("div")
# waiting for the "span" selector relative to the div.
span = await div.wait_for_selector("span", state="attached")
```

```python
page.set_content("<div><span></span></div>")
div = page.query_selector("div")
# waiting for the "span" selector relative to the div.
span = div.wait_for_selector("span", state="attached")
```

```csharp
await page.SetContentAsync("<div><span></span></div>");
var div = await page.QuerySelectorAsync("div");
// Waiting for the "span" selector relative to the div.
var span = await div.WaitForSelectorAsync("span", new() { State = WaitForSelectorState.Attached });
```

:::note
This method does not work across navigations, use [`method: Page.waitForSelector`] instead.
:::

### param: ElementHandle.waitForSelector.selector = %%-query-selector-%%
* since: v1.8

### option: ElementHandle.waitForSelector.state = %%-wait-for-selector-state-%%
* since: v1.8

### option: ElementHandle.waitForSelector.timeout = %%-input-timeout-%%
* since: v1.8

### option: ElementHandle.waitForSelector.timeout = %%-input-timeout-js-%%
* since: v1.8

### option: ElementHandle.waitForSelector.strict = %%-input-strict-%%
* since: v1.15
