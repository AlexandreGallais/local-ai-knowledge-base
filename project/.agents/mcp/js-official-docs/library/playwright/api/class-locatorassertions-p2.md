---
title: "class: LocatorAssertions (part 2 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locatorassertions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: LocatorAssertions (part 2 of 5)

## async method: LocatorAssertions.toBeChecked
* since: v1.20
* langs:
  - alias-java: isChecked

Ensures the [Locator] points to a checked input.

**Usage**

```js
const locator = page.getByLabel('Subscribe to newsletter');
await expect(locator).toBeChecked();
```

```java
assertThat(page.getByLabel("Subscribe to newsletter")).isChecked();
```

```python
from playwright.async_api import expect

locator = page.get_by_label("Subscribe to newsletter")
await expect(locator).to_be_checked()
```

```python
from playwright.sync_api import expect

locator = page.get_by_label("Subscribe to newsletter")
expect(locator).to_be_checked()
```

```csharp
var locator = Page.GetByLabel("Subscribe to newsletter");
await Expect(locator).ToBeCheckedAsync();
```

### option: LocatorAssertions.toBeChecked.checked
* since: v1.18
- `checked` <[boolean]>

Provides state to assert for. Asserts for input to be checked by default.
This option can't be used when [`option: LocatorAssertions.toBeChecked.indeterminate`] is set to true.

### option: LocatorAssertions.toBeChecked.indeterminate
* since: v1.50
- `indeterminate` <[boolean]>

Asserts that the element is in the indeterminate (mixed) state. Only supported for checkboxes and radio buttons.
This option can't be true when [`option: LocatorAssertions.toBeChecked.checked`] is provided.

### option: LocatorAssertions.toBeChecked.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeChecked.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeDisabled
* since: v1.20
* langs:
  - alias-java: isDisabled

Ensures the [Locator] points to a disabled element. Element is disabled if it has "disabled" attribute
or is disabled via 'aria-disabled'.
Note that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup`
can be disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored
by the browser.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeDisabled();
```

```java
assertThat(page.locator("button.submit")).isDisabled();
```

```python
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_disabled()
```

```python
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_disabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeDisabledAsync();
```

### option: LocatorAssertions.toBeDisabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeDisabled.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEditable
* since: v1.20
* langs:
  - alias-java: isEditable

Ensures the [Locator] points to an editable element.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeEditable();
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isEditable();
```

```python
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_be_editable()
```

```python
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_be_editable()
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeEditableAsync();
```

### option: LocatorAssertions.toBeEditable.editable
* since: v1.26
- `editable` <[boolean]>

### option: LocatorAssertions.toBeEditable.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEditable.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEmpty
* since: v1.20
* langs:
  - alias-java: isEmpty

Ensures the [Locator] points to an empty editable element or to a DOM node that has no text.

**Usage**

```js
const locator = page.locator('div.warning');
await expect(locator).toBeEmpty();
```

```java
assertThat(page.locator("div.warning")).isEmpty();
```

```python
from playwright.async_api import expect

locator = page.locator("div.warning")
await expect(locator).to_be_empty()
```

```python
from playwright.sync_api import expect

locator = page.locator("div.warning")
expect(locator).to_be_empty()
```

```csharp
var locator = Page.Locator("div.warning");
await Expect(locator).ToBeEmptyAsync();
```

### option: LocatorAssertions.toBeEmpty.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEmpty.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeEnabled
* since: v1.20
* langs:
  - alias-java: isEnabled

Ensures the [Locator] points to an enabled element.

**Usage**

```js
const locator = page.locator('button.submit');
await expect(locator).toBeEnabled();
```

```java
assertThat(page.locator("button.submit")).isEnabled();
```

```python
from playwright.async_api import expect

locator = page.locator("button.submit")
await expect(locator).to_be_enabled()
```

```python
from playwright.sync_api import expect

locator = page.locator("button.submit")
expect(locator).to_be_enabled()
```

```csharp
var locator = Page.Locator("button.submit");
await Expect(locator).ToBeEnabledAsync();
```

### option: LocatorAssertions.toBeEnabled.enabled
* since: v1.26
- `enabled` <[boolean]>

### option: LocatorAssertions.toBeEnabled.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeEnabled.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeFocused
* since: v1.20
* langs:
  - alias-java: isFocused

Ensures the [Locator] points to a focused DOM node.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toBeFocused();
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).isFocused();
```

```python
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_be_focused()
```

```python
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_be_focused()
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToBeFocusedAsync();
```

### option: LocatorAssertions.toBeFocused.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeFocused.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeHidden
* since: v1.20
* langs:
  - alias-java: isHidden

Ensures that [Locator] either does not resolve to any DOM node, or resolves to a non-visible one.

**Usage**

```js
const locator = page.locator('.my-element');
await expect(locator).toBeHidden();
```

```java
assertThat(page.locator(".my-element")).isHidden();
```

```python
from playwright.async_api import expect

locator = page.locator('.my-element')
await expect(locator).to_be_hidden()
```

```python
from playwright.sync_api import expect

locator = page.locator('.my-element')
expect(locator).to_be_hidden()
```

```csharp
var locator = Page.Locator(".my-element");
await Expect(locator).ToBeHiddenAsync();
```

### option: LocatorAssertions.toBeHidden.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeHidden.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toBeInViewport
* since: v1.31
* langs:
  - alias-java: isInViewport

Ensures the [Locator] points to an element that intersects viewport, according to the intersection observer API.

**Usage**

```js
const locator = page.getByRole('button');
// Make sure at least some part of element intersects viewport.
await expect(locator).toBeInViewport();
// Make sure element is fully outside of viewport.
await expect(locator).not.toBeInViewport();
// Make sure that at least half of the element intersects viewport.
await expect(locator).toBeInViewport({ ratio: 0.5 });
```

```java
Locator locator = page.getByRole(AriaRole.BUTTON);
// Make sure at least some part of element intersects viewport.
assertThat(locator).isInViewport();
// Make sure element is fully outside of viewport.
assertThat(locator).not().isInViewport();
// Make sure that at least half of the element intersects viewport.
assertThat(locator).isInViewport(new LocatorAssertions.IsInViewportOptions().setRatio(0.5));
```

```csharp
var locator = Page.GetByRole(AriaRole.Button);
// Make sure at least some part of element intersects viewport.
await Expect(locator).ToBeInViewportAsync();
// Make sure element is fully outside of viewport.
await Expect(locator).Not.ToBeInViewportAsync();
// Make sure that at least half of the element intersects viewport.
await Expect(locator).ToBeInViewportAsync(new() { Ratio = 0.5 });
```

```python
from playwright.async_api import expect

locator = page.get_by_role("button")
# Make sure at least some part of element intersects viewport.
await expect(locator).to_be_in_viewport()
# Make sure element is fully outside of viewport.
await expect(locator).not_to_be_in_viewport()
# Make sure that at least half of the element intersects viewport.
await expect(locator).to_be_in_viewport(ratio=0.5)
```

```python
from playwright.sync_api import expect

locator = page.get_by_role("button")
# Make sure at least some part of element intersects viewport.
expect(locator).to_be_in_viewport()
# Make sure element is fully outside of viewport.
expect(locator).not_to_be_in_viewport()
# Make sure that at least half of the element intersects viewport.
expect(locator).to_be_in_viewport(ratio=0.5)
```

### option: LocatorAssertions.toBeInViewport.ratio
* since: v1.31
- `ratio` <[float]>

The minimal ratio of the element to intersect viewport. If equals to `0`, then
element should intersect viewport at any positive ratio. Defaults to `0`.

### option: LocatorAssertions.toBeInViewport.timeout = %%-js-assertions-timeout-%%
* since: v1.31

### option: LocatorAssertions.toBeInViewport.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeInViewport.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.31

## async method: LocatorAssertions.toBeVisible
* since: v1.20
* langs:
  - alias-java: isVisible

Ensures that [Locator] points to an attached and visible DOM node.

To check that at least one element from the list is visible, use [`method: Locator.first`].

**Usage**

```js
// A specific element is visible.
await expect(page.getByText('Welcome')).toBeVisible();

// At least one item in the list is visible.
await expect(page.getByTestId('todo-item').first()).toBeVisible();

// At least one of the two elements is visible, possibly both.
await expect(
    page.getByRole('button', { name: 'Sign in' })
        .or(page.getByRole('button', { name: 'Sign up' }))
        .first()
).toBeVisible();
```

```java
// A specific element is visible.
assertThat(page.getByText("Welcome")).isVisible();

// At least one item in the list is visible.
assertThat(page.getByTestId("todo-item").first()).isVisible();

// At least one of the two elements is visible, possibly both.
assertThat(
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .or(page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign up")))
    .first()
).isVisible();
```

```python
# A specific element is visible.
await expect(page.get_by_text("Welcome")).to_be_visible()

# At least one item in the list is visible.
await expect(page.get_by_test_id("todo-item").first).to_be_visible()

# At least one of the two elements is visible, possibly both.
await expect(
    page.get_by_role("button", name="Sign in")
    .or_(page.get_by_role("button", name="Sign up"))
    .first
).to_be_visible()
```

```python
# A specific element is visible.
expect(page.get_by_text("Welcome")).to_be_visible()

# At least one item in the list is visible.
expect(page.get_by_test_id("todo-item").first).to_be_visible()

# At least one of the two elements is visible, possibly both.
expect(
    page.get_by_role("button", name="Sign in")
    .or_(page.get_by_role("button", name="Sign up"))
    .first
).to_be_visible()
```

```csharp
// A specific element is visible.
await Expect(Page.GetByText("Welcome")).ToBeVisibleAsync();

// At least one item in the list is visible.
await Expect(Page.GetByTestId("todo-item").First).ToBeVisibleAsync();

// At least one of the two elements is visible, possibly both.
await Expect(
  Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" })
    .Or(Page.GetByRole(AriaRole.Button, new() { Name = "Sign up" }))
    .First
).ToBeVisibleAsync();
```

### option: LocatorAssertions.toBeVisible.visible
* since: v1.26
- `visible` <[boolean]>

### option: LocatorAssertions.toBeVisible.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toBeVisible.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18
