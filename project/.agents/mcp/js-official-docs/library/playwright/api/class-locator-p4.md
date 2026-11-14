---
title: "class: Locator (part 4 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator (part 4 of 6)

## async method: Locator.hover
* since: v1.14

Hover over the matching element.

**Usage**

```js
await page.getByRole('link').hover();
```

```python
await page.get_by_role("link").hover()
```

```python
page.get_by_role("link").hover()
```

```java
page.getByRole(AriaRole.LINK).hover();
```

```csharp
await page.GetByRole(AriaRole.Link).HoverAsync();
```

**Details**

This method hovers over the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to hover over the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: Locator.hover.position = %%-input-position-%%
* since: v1.14

### option: Locator.hover.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.hover.force = %%-input-force-%%
* since: v1.14

### option: Locator.hover.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.hover.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.hover.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.hover.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

### option: Locator.hover.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

## async method: Locator.innerHTML
* since: v1.14
- returns: <[string]>

Returns the `element.innerHTML`.

### option: Locator.innerHTML.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.innerHTML.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.innerText
* since: v1.14
- returns: <[string]>

Returns the `element.innerText`.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] with [`option: LocatorAssertions.toHaveText.useInnerText`] option to avoid flakiness. See assertions guide for more details.
:::

### option: Locator.innerText.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.innerText.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.inputValue
* since: v1.14
- returns: <[string]>

Returns the value for the matching `` or `<textarea>` or `<select>` element.

:::warning[Asserting value]
If you need to assert input value, prefer [`method: LocatorAssertions.toHaveValue`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const value = await page.getByRole('textbox').inputValue();
```

```python
value = await page.get_by_role("textbox").input_value()
```

```python
value = page.get_by_role("textbox").input_value()
```

```java
String value = page.getByRole(AriaRole.TEXTBOX).inputValue();
```

```csharp
String value = await page.GetByRole(AriaRole.Textbox).InputValueAsync();
```

**Details**

Throws elements that are not an input, textarea or a select. However, if the element is inside the `` element that has an associated control, returns the value of the control.

### option: Locator.inputValue.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.inputValue.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isChecked
* since: v1.14
- returns: <[boolean]>

Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

:::warning[Asserting checked state]
If you need to assert that checkbox is checked, prefer [`method: LocatorAssertions.toBeChecked`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const checked = await page.getByRole('checkbox').isChecked();
```

```java
boolean checked = page.getByRole(AriaRole.CHECKBOX).isChecked();
```

```python
checked = await page.get_by_role("checkbox").is_checked()
```

```python
checked = page.get_by_role("checkbox").is_checked()
```

```csharp
var isChecked = await page.GetByRole(AriaRole.Checkbox).IsCheckedAsync();
```

### option: Locator.isChecked.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isChecked.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isDisabled
* since: v1.14
- returns: <[boolean]>

Returns whether the element is disabled, the opposite of enabled.

:::warning[Asserting disabled state]
If you need to assert that an element is disabled, prefer [`method: LocatorAssertions.toBeDisabled`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const disabled = await page.getByRole('button').isDisabled();
```

```java
boolean disabled = page.getByRole(AriaRole.BUTTON).isDisabled();
```

```python
disabled = await page.get_by_role("button").is_disabled()
```

```python
disabled = page.get_by_role("button").is_disabled()
```

```csharp
Boolean disabled = await page.GetByRole(AriaRole.Button).IsDisabledAsync();
```

### option: Locator.isDisabled.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isDisabled.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isEditable
* since: v1.14
- returns: <[boolean]>

Returns whether the element is editable. If the target element is not an ``, `<textarea>`, `<select>`, `[contenteditable]` and does not have a role allowing `[aria-readonly]`, this method throws an error.

:::warning[Asserting editable state]
If you need to assert that an element is editable, prefer [`method: LocatorAssertions.toBeEditable`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const editable = await page.getByRole('textbox').isEditable();
```

```java
boolean editable = page.getByRole(AriaRole.TEXTBOX).isEditable();
```

```python
editable = await page.get_by_role("textbox").is_editable()
```

```python
editable = page.get_by_role("textbox").is_editable()
```

```csharp
Boolean editable = await page.GetByRole(AriaRole.Textbox).IsEditableAsync();
```

### option: Locator.isEditable.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isEditable.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isEnabled
* since: v1.14
- returns: <[boolean]>

Returns whether the element is enabled.

:::warning[Asserting enabled state]
If you need to assert that an element is enabled, prefer [`method: LocatorAssertions.toBeEnabled`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const enabled = await page.getByRole('button').isEnabled();
```

```java
boolean enabled = page.getByRole(AriaRole.BUTTON).isEnabled();
```

```python
enabled = await page.get_by_role("button").is_enabled()
```

```python
enabled = page.get_by_role("button").is_enabled()
```

```csharp
Boolean enabled = await page.GetByRole(AriaRole.Button).IsEnabledAsync();
```

### option: Locator.isEnabled.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.isEnabled.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.isHidden
* since: v1.14
- returns: <[boolean]>

Returns whether the element is hidden, the opposite of visible.

:::warning[Asserting visibility]
If you need to assert that element is hidden, prefer [`method: LocatorAssertions.toBeHidden`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const hidden = await page.getByRole('button').isHidden();
```

```java
boolean hidden = page.getByRole(AriaRole.BUTTON).isHidden();
```

```python
hidden = await page.get_by_role("button").is_hidden()
```

```python
hidden = page.get_by_role("button").is_hidden()
```

```csharp
Boolean hidden = await page.GetByRole(AriaRole.Button).IsHiddenAsync();
```

### option: Locator.isHidden.timeout
* since: v1.14
* deprecated: This option is ignored. [`method: Locator.isHidden`] does not wait for the element to become hidden and returns immediately.
- `timeout` <[float]>

## async method: Locator.isVisible
* since: v1.14
- returns: <[boolean]>

Returns whether the element is visible.

:::warning[Asserting visibility]
If you need to assert that element is visible, prefer [`method: LocatorAssertions.toBeVisible`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const visible = await page.getByRole('button').isVisible();
```

```java
boolean visible = page.getByRole(AriaRole.BUTTON).isVisible();
```

```python
visible = await page.get_by_role("button").is_visible()
```

```python
visible = page.get_by_role("button").is_visible()
```

```csharp
Boolean visible = await page.GetByRole(AriaRole.Button).IsVisibleAsync();
```

### option: Locator.isVisible.timeout
* since: v1.14
* deprecated: This option is ignored. [`method: Locator.isVisible`] does not wait for the element to become visible and returns immediately.
- `timeout` <[float]>

## method: Locator.last
* since: v1.14
- returns: <[Locator]>

Returns locator to the last matching element.

**Usage**

```js
const banana = await page.getByRole('listitem').last();
```

```python
banana = await page.get_by_role("listitem").last
```

```python
banana = page.get_by_role("listitem").last
```

```java
Locator banana = page.getByRole(AriaRole.LISTITEM).last();
```

```csharp
var banana = page.GetByRole(AriaRole.Listitem).Last;
```

## method: Locator.locator
* since: v1.14
- returns: <[Locator]>

%%-template-locator-locator-%%

### param: Locator.locator.selectorOrLocator = %%-find-selector-or-locator-%%
* since: v1.14

### option: Locator.locator.-inline- = %%-locator-options-list-v1.14-%%
* since: v1.14

### option: Locator.locator.hasNot = %%-locator-option-has-not-%%
* since: v1.33

### option: Locator.locator.hasNotText = %%-locator-option-has-not-text-%%
* since: v1.33

## async method: Locator.normalize
* since: v1.59
- returns: <[Locator]>

Returns a new locator that uses best practices for referencing the matched element, prioritizing test ids,
aria roles, and other user-facing attributes over CSS selectors. This is useful for converting implementation-detail selectors into more resilient, human-readable locators.

**Usage**

An agent can pick an element by its ref from an [`method: Page.ariaSnapshot`] taken in the `"ai"` mode. Refs only
work for the latest snapshot. Normalize the ref locator and convert it to a string to get resilient locator code
in your language, the same way `codegen` does.

Consider the following aria snapshot.

```yaml
- button "Submit" [ref=e2]
```

You can turn the ref into locator code:

```js
const normalized = await page.getByRef('e2').normalize();
console.log(normalized.toString());
// getByRole('button', { name: 'Submit' })
```

```python
normalized = await page.get_by_ref("e2").normalize()
print(str(normalized))
# get_by_role("button", name="Submit")
```

```python
normalized = page.get_by_ref("e2").normalize()
print(str(normalized))
# get_by_role("button", name="Submit")
```

```java
Locator normalized = page.getByRef("e2").normalize();
System.out.println(normalized.toString());
// getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Submit"))
```

```csharp
var normalized = await page.GetByRef("e2").NormalizeAsync();
Console.WriteLine(normalized.ToString());
// GetByRole(AriaRole.Button, new() { Name = "Submit" })
```

## method: Locator.nth
* since: v1.14
- returns: <[Locator]>

Returns locator to the n-th matching element. It's zero based, `nth(0)` selects the first element.

**Usage**

```js
const banana = await page.getByRole('listitem').nth(2);
```

```python
banana = await page.get_by_role("listitem").nth(2)
```

```python
banana = page.get_by_role("listitem").nth(2)
```

```java
Locator banana = page.getByRole(AriaRole.LISTITEM).nth(2);
```

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Nth(2);
```

### param: Locator.nth.index
* since: v1.14
- `index` <[int]>

## method: Locator.or
* since: v1.33
* langs:
  - alias-python: or_
- returns: <[Locator]>

Creates a locator matching all elements that match one or both of the two locators.

Note that when both locators match something, the resulting locator will have multiple matches, potentially causing a locator strictness violation.

**Usage**

Consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead. In this case, you can wait for either a "New email" button, or a dialog and act accordingly.

:::note
If both "New email" button and security dialog appear on screen, the "or" locator will match both of them,
possibly throwing the "strict mode violation" error. In this case, you can use [`method: Locator.first`] to only match one of them.
:::

```js
const newEmail = page.getByRole('button', { name: 'New' });
const dialog = page.getByText('Confirm security settings');
await expect(newEmail.or(dialog).first()).toBeVisible();
if (await dialog.isVisible())
  await page.getByRole('button', { name: 'Dismiss' }).click();
await newEmail.click();
```

```java
Locator newEmail = page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("New"));
Locator dialog = page.getByText("Confirm security settings");
assertThat(newEmail.or(dialog).first()).isVisible();
if (dialog.isVisible())
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Dismiss")).click();
newEmail.click();
```

```python
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
await expect(new_email.or_(dialog).first).to_be_visible()
if (await dialog.is_visible()):
  await page.get_by_role("button", name="Dismiss").click()
await new_email.click()
```

```python
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
expect(new_email.or_(dialog).first).to_be_visible()
if (dialog.is_visible()):
  page.get_by_role("button", name="Dismiss").click()
new_email.click()
```

```csharp
var newEmail = page.GetByRole(AriaRole.Button, new() { Name = "New" });
var dialog = page.GetByText("Confirm security settings");
await Expect(newEmail.Or(dialog).First).ToBeVisibleAsync();
if (await dialog.IsVisibleAsync())
  await page.GetByRole(AriaRole.Button, new() { Name = "Dismiss" }).ClickAsync();
await newEmail.ClickAsync();
```

### param: Locator.or.locator
* since: v1.33
- `locator` <[Locator]>

Alternative locator to match.

## method: Locator.page
* since: v1.19
- returns: <[Page]>

A page this locator belongs to.
