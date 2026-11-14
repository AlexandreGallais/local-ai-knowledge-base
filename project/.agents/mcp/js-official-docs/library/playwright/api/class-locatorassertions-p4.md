---
title: "class: LocatorAssertions (part 4 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locatorassertions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: LocatorAssertions (part 4 of 5)

## async method: LocatorAssertions.toHaveAttribute
* since: v1.20
* langs:
  - alias-java: hasAttribute

Ensures the [Locator] points to an element with given attribute.

**Usage**

```js
const locator = page.locator('input');
await expect(locator).toHaveAttribute('type', 'text');
```

```java
assertThat(page.locator("input")).hasAttribute("type", "text");
```

```python
from playwright.async_api import expect

locator = page.locator("input")
await expect(locator).to_have_attribute("type", "text")
await expect(locator).to_have_attribute("disabled")
await expect(locator).not_to_have_attribute("readonly")
```

```python
from playwright.sync_api import expect

locator = page.locator("input")
expect(locator).to_have_attribute("type", "text")
expect(locator).to_have_attribute("disabled")
expect(locator).not_to_have_attribute("readonly")
```

```csharp
var locator = Page.Locator("input");
await Expect(locator).ToHaveAttributeAsync("type", "text");
```

### param: LocatorAssertions.toHaveAttribute.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.toHaveAttribute.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### param: LocatorAssertions.toHaveAttribute.value
* since: v1.62
* langs: python
- `value` ?<[string]|[RegExp]>

Expected attribute value. If not specified, the assertion verifies that the attribute is present.

### option: LocatorAssertions.toHaveAttribute.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveAttribute.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveAttribute.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveAttribute.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.40

## async method: LocatorAssertions.toHaveAttribute#2
* since: v1.39
* langs: js

Ensures the [Locator] points to an element with given attribute. The method will assert attribute
presence.

```js
const locator = page.locator('input');
// Assert attribute existence.
await expect(locator).toHaveAttribute('disabled');
await expect(locator).not.toHaveAttribute('open');
```

### param: LocatorAssertions.toHaveAttribute#2.name
* since: v1.39
- `name` <[string]>

Attribute name.

### option: LocatorAssertions.toHaveAttribute#2.timeout = %%-js-assertions-timeout-%%
* since: v1.39

### option: LocatorAssertions.toHaveAttribute#2.signal = %%-js-assertions-signal-%%
* since: v1.62

## async method: LocatorAssertions.toHaveClass
* since: v1.20
* langs:
  - alias-java: hasClass

Ensures the [Locator] points to an element with given CSS classes. When a string is provided, it must fully match the element's `class` attribute. To match individual classes use [`method: LocatorAssertions.toContainClass`].

**Usage**

```html
<div class='middle selected row' id='component'></div>
```

```js
const locator = page.locator('#component');
await expect(locator).toHaveClass('middle selected row');
await expect(locator).toHaveClass(/(^|\s)selected(\s|$)/);
```

```java
assertThat(page.locator("#component")).hasClass("middle selected row");
assertThat(page.locator("#component")).hasClass(Pattern.compile("(^|\\s)selected(\\s|$)"));
```

```python
from playwright.async_api import expect

locator = page.locator("#component")
await expect(locator).to_have_class("middle selected row")
await expect(locator).to_have_class(re.compile(r"(^|\\s)selected(\\s|$)"))
```

```python
from playwright.sync_api import expect

locator = page.locator("#component")
expect(locator).to_have_class("middle selected row")
expect(locator).to_have_class(re.compile(r"(^|\\s)selected(\\s|$)"))
```

```csharp
var locator = Page.Locator("#component");
await Expect(locator).ToHaveClassAsync("middle selected row");
await Expect(locator).ToHaveClassAsync(new Regex("(^|\\s)selected(\\s|$)"));
```

When an array is passed, the method asserts that the list of elements located matches the corresponding list of expected class values. Each element's class attribute is matched against the corresponding string or regular expression in the array:

```js
const locator = page.locator('.list > .component');
await expect(locator).toHaveClass(['component', 'component selected', 'component']);
```

```java
assertThat(page.locator(".list > .component")).hasClass(new String[] {"component", "component selected", "component"});
```

```python
from playwright.async_api import expect

locator = page.locator(".list > .component")
await expect(locator).to_have_class(["component", "component selected", "component"])
```

```python
from playwright.sync_api import expect

locator = page.locator(".list > .component")
expect(locator).to_have_class(["component", "component selected", "component"])
```

```csharp
var locator = Page.Locator(".list > .component");
await Expect(locator).ToHaveClassAsync(new string[]{"component", "component selected", "component"});
```

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: js
- `expected` <[string]|[RegExp]|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: python
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### param: LocatorAssertions.toHaveClass.expected
* since: v1.18
* langs: java, csharp
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.toHaveClass.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveClass.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveCount
* since: v1.20
* langs:
  - alias-java: hasCount

Ensures the [Locator] resolves to an exact number of DOM nodes.

**Usage**

```js
const list = page.locator('list > .component');
await expect(list).toHaveCount(3);
```

```java
assertThat(page.locator("list > .component")).hasCount(3);
```

```python
from playwright.async_api import expect

locator = page.locator("list > .component")
await expect(locator).to_have_count(3)
```

```python
from playwright.sync_api import expect

locator = page.locator("list > .component")
expect(locator).to_have_count(3)
```

```csharp
var locator = Page.Locator("list > .component");
await Expect(locator).ToHaveCountAsync(3);
```

### param: LocatorAssertions.toHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.toHaveCount.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveCount.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveCSS
* since: v1.20
* langs:
  - alias-java: hasCSS

Ensures the [Locator] resolves to an element with the given computed CSS style.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveCSS('display', 'flex');
```

```java
assertThat(page.getByRole(AriaRole.BUTTON)).hasCSS("display", "flex");
```

```python
from playwright.async_api import expect

locator = page.get_by_role("button")
await expect(locator).to_have_css("display", "flex")
```

```python
from playwright.sync_api import expect

locator = page.get_by_role("button")
expect(locator).to_have_css("display", "flex")
```

```csharp
var locator = Page.GetByRole(AriaRole.Button);
await Expect(locator).ToHaveCSSAsync("display", "flex");
```

### param: LocatorAssertions.toHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.toHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.toHaveCSS.pseudo
* since: v1.60
- `pseudo` "PseudoElement" <"before"|"after">

Pseudo-element to read computed styles from.

### option: LocatorAssertions.toHaveCSS.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveCSS.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveId
* since: v1.20
* langs:
  - alias-java: hasId

Ensures the [Locator] points to an element with the given DOM Node ID.

**Usage**

```js
const locator = page.getByRole('textbox');
await expect(locator).toHaveId('lastname');
```

```java
assertThat(page.getByRole(AriaRole.TEXTBOX)).hasId("lastname");
```

```python
from playwright.async_api import expect

locator = page.get_by_role("textbox")
await expect(locator).to_have_id("lastname")
```

```python
from playwright.sync_api import expect

locator = page.get_by_role("textbox")
expect(locator).to_have_id("lastname")
```

```csharp
var locator = Page.GetByRole(AriaRole.Textbox);
await Expect(locator).ToHaveIdAsync("lastname");
```

### param: LocatorAssertions.toHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.toHaveId.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveId.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveJSProperty
* since: v1.20
* langs:
  - alias-java: hasJSProperty

Ensures the [Locator] points to an element with given JavaScript property. Note that this property can be
of a primitive type as well as a plain serializable JavaScript object.

**Usage**

```js
const locator = page.locator('.component');
await expect(locator).toHaveJSProperty('loaded', true);
```

```java
assertThat(page.locator("input")).hasJSProperty("loaded", true);
```

```python
from playwright.async_api import expect

locator = page.locator(".component")
await expect(locator).to_have_js_property("loaded", True)
```

```python
from playwright.sync_api import expect

locator = page.locator(".component")
expect(locator).to_have_js_property("loaded", True)
```

```csharp
var locator = Page.Locator(".component");
await Expect(locator).ToHaveJSPropertyAsync("loaded", true);
```

### param: LocatorAssertions.toHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.toHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.toHaveJSProperty.timeout = %%-js-assertions-timeout-%%
* since: v1.18

### option: LocatorAssertions.toHaveJSProperty.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.toHaveRole
* since: v1.44
* langs:
  - alias-java: hasRole

Ensures the [Locator] points to an element with a given ARIA role.

Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass role `"checkbox"` on an element with a subclass role `"switch"` will fail.

**Usage**

```js
const locator = page.getByTestId('save-button');
await expect(locator).toHaveRole('button');
```

```java
Locator locator = page.getByTestId("save-button");
assertThat(locator).hasRole(AriaRole.BUTTON);
```

```python
locator = page.get_by_test_id("save-button")
await expect(locator).to_have_role("button")
```

```python
locator = page.get_by_test_id("save-button")
expect(locator).to_have_role("button")
```

```csharp
var locator = Page.GetByTestId("save-button");
await Expect(locator).ToHaveRoleAsync(AriaRole.Button);
```

### param: LocatorAssertions.toHaveRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.44

### option: LocatorAssertions.toHaveRole.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.toHaveRole.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveRole.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

## async method: LocatorAssertions.toHaveScreenshot#1
* since: v1.23
* langs: js

This function will wait until two consecutive locator screenshots
yield the same result, and then compare the last screenshot with the expectation.

**Usage**

```js
const locator = page.getByRole('button');
await expect(locator).toHaveScreenshot('image.png');

// Store the snapshot in the WebP format.
await expect(locator).toHaveScreenshot('image.webp');
```

Note that screenshot assertions only work with Playwright test runner.

### param: LocatorAssertions.toHaveScreenshot#1.name
* since: v1.23
- `name` <[string]|[Array]<[string]>>

Snapshot name. Must have a `.png` or `.webp` extension, the screenshot is captured in the corresponding format. Both formats are lossless.

### option: LocatorAssertions.toHaveScreenshot#1.timeout = %%-js-assertions-timeout-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toHaveScreenshot#1.animations = %%-screenshot-option-animations-default-disabled-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.caret = %%-screenshot-option-caret-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.mask = %%-screenshot-option-mask-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maskColor = %%-screenshot-option-mask-color-%%
* since: v1.35

### option: LocatorAssertions.toHaveScreenshot#1.stylePath = %%-screenshot-option-style-path-%%
* since: v1.41

### option: LocatorAssertions.toHaveScreenshot#1.omitBackground = %%-screenshot-option-omit-background-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.scale = %%-screenshot-option-scale-default-css-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixels = %%-assertions-max-diff-pixels-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.maxDiffPixelRatio = %%-assertions-max-diff-pixel-ratio-%%
* since: v1.23

### option: LocatorAssertions.toHaveScreenshot#1.threshold = %%-assertions-threshold-%%
* since: v1.23
