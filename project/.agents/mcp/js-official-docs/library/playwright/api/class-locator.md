---
title: "class: Locator (part 1 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator
* since: v1.14

Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent
a way to find element(s) on the page at any moment. A locator can be created with the [`method: Page.locator`] method.

Learn more about locators.

## async method: Locator.all
* since: v1.29
- returns: <[Array]<[Locator]>>

When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.

:::note
[`method: Locator.all`] does not wait for elements to match the locator, and instead immediately returns whatever is present in the page.

When the list of elements changes dynamically, [`method: Locator.all`] will produce unpredictable and flaky results.

When the list of elements is stable, but loaded dynamically, wait for the full list to finish loading before calling [`method: Locator.all`].
:::

**Usage**

```js
for (const li of await page.getByRole('listitem').all())
  await li.click();
```

```python
for li in await page.get_by_role('listitem').all():
  await li.click();
```

```python
for li in page.get_by_role('listitem').all():
  li.click();
```

```java
for (Locator li : page.getByRole("listitem").all())
  li.click();
```

```csharp
foreach (var li in await page.GetByRole("listitem").AllAsync())
  await li.ClickAsync();
```

## async method: Locator.allInnerTexts
* since: v1.14
- returns: <[Array]<[string]>>

Returns an array of `node.innerText` values for all matching nodes.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] with [`option: LocatorAssertions.toHaveText.useInnerText`] option to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const texts = await page.getByRole('link').allInnerTexts();
```

```python
texts = await page.get_by_role("link").all_inner_texts()
```

```python
texts = page.get_by_role("link").all_inner_texts()
```

```java
List<String> texts = page.getByRole(AriaRole.LINK).allInnerTexts();
```

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllInnerTextsAsync();
```

## async method: Locator.allTextContents
* since: v1.14
- returns: <[Array]<[string]>>

Returns an array of `node.textContent` values for all matching nodes.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] to avoid flakiness. See assertions guide for more details.
:::

**Usage**

```js
const texts = await page.getByRole('link').allTextContents();
```

```python
texts = await page.get_by_role("link").all_text_contents()
```

```python
texts = page.get_by_role("link").all_text_contents()
```

```java
List<String> texts = page.getByRole(AriaRole.LINK).allTextContents();
```

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllTextContentsAsync();
```

## method: Locator.and
* since: v1.34
* langs:
  - alias-python: and_
- returns: <[Locator]>

Creates a locator that matches both this locator and the argument locator.

**Usage**

The following example finds a button with a specific title.

```js
const button = page.getByRole('button').and(page.getByTitle('Subscribe'));
```

```java
Locator button = page.getByRole(AriaRole.BUTTON).and(page.getByTitle("Subscribe"));
```

```python
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

```python
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

```csharp
var button = page.GetByRole(AriaRole.Button).And(page.GetByTitle("Subscribe"));
```

### param: Locator.and.locator
* since: v1.34
- `locator` <[Locator]>

Additional locator to match.

## async method: Locator.ariaSnapshot
* since: v1.49
- returns: <[string]>

Captures the aria snapshot of the given element.
Read more about aria snapshots and [`method: LocatorAssertions.toMatchAriaSnapshot`] for the corresponding assertion.

**Usage**

```js
await page.getByRole('link').ariaSnapshot();
```

```java
page.getByRole(AriaRole.LINK).ariaSnapshot();
```

```python
await page.get_by_role("link").aria_snapshot()
```

```python
page.get_by_role("link").aria_snapshot()
```

```csharp
await page.GetByRole(AriaRole.Link).AriaSnapshotAsync();
```

**Details**

This method captures the aria snapshot of the given element. The snapshot is a string that represents the state of the element and its children.
The snapshot can be used to assert the state of the element in the test, or to compare it to state in the future.

The ARIA snapshot is represented using YAML markup language:
* The keys of the objects are the roles and optional accessible names of the elements.
* The values are either text content or an array of child elements.
* Generic static text can be represented with the `text` key.

Below is the HTML markup and the respective ARIA snapshot:

```html
<ul aria-label="Links">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
<ul>
```

```yml
- list "Links":
  - listitem:
    - link "Home"
  - listitem:
    - link "About"
```

An AI-optimized snapshot, controlled by [`option: Locator.ariaSnapshot.mode`], is different from a default snapshot:
1. Includes element references `[ref=e2]`.
2. Does not wait for an element matching the locator, and throws when no elements match.
3. Includes snapshots of ``s inside the target.
4. Can omit names that repeat printed descendants, such as a heading containing a link. Names that identify dialogs, landmarks, groups, tables and table headers are retained.

### option: Locator.ariaSnapshot.mode
* since: v1.59
- `mode` "AriaSnapshotMode" <"ai"|"default">

When set to `"ai"`, returns a snapshot optimized for AI consumption. Defaults to `"default"`. See details for more information.

### option: Locator.ariaSnapshot.timeout = %%-input-timeout-%%
* since: v1.49

### option: Locator.ariaSnapshot.timeout = %%-input-timeout-js-%%
* since: v1.49

### option: Locator.ariaSnapshot.depth
* since: v1.59
- `depth` <[int]>

When specified, limits the depth of the snapshot.

### option: Locator.ariaSnapshot.boxes
* since: v1.60
- `boxes` <[boolean]>

When `true`, appends each element's bounding box as `[box=x,y,width,height]` to the snapshot. Coordinates are
relative to the viewport, in CSS pixels, as returned by `Element.getBoundingClientRect()`.
Defaults to `false`.

## async method: Locator.ariaSnapshotJSON
* since: v1.63
* langs: js
- returns: <[Serializable]>

Captures the aria snapshot of the given element as a free form JSON object.

**Usage**

```js
await page.getByRole('list').ariaSnapshotJSON();
```

**Details**

This method returns the same tree as [`method: Locator.ariaSnapshot`], serialized as a JSON value instead of YAML markup.
The result is a list of nodes, each node being an object with the following properties:
* `role` Aria role of the element, or `"text"` for a static text fragment.
* `name` Accessible name of the element, if any.
* `text` Text content of the element when it is the only child, or the content of a static text fragment.
* `children` Child nodes and text fragments.
* Boolean and value properties for element state flags: `checked`, `disabled`, `expanded`, `active`, `invalid`, `level`, `pressed` and `selected`.
* Additional element properties, for example `url` for links and `placeholder` for text boxes.
* `ref` Element reference for AI-optimized snapshots.
* `cursor` Set to `"pointer"` for clickable elements in AI-optimized snapshots.
* `box` Bounding box of the element when [`option: Locator.ariaSnapshotJSON.boxes`] is set.

### option: Locator.ariaSnapshotJSON.mode
* since: v1.63
- `mode` "AriaSnapshotMode" <"ai"|"default">

When set to `"ai"`, returns a snapshot optimized for AI consumption. Defaults to `"default"`. See details in [`method: Locator.ariaSnapshot`].

### option: Locator.ariaSnapshotJSON.timeout = %%-input-timeout-%%
* since: v1.63

### option: Locator.ariaSnapshotJSON.timeout = %%-input-timeout-js-%%
* since: v1.63

### option: Locator.ariaSnapshotJSON.depth
* since: v1.63
- `depth` <[int]>

When specified, limits the depth of the snapshot.

### option: Locator.ariaSnapshotJSON.boxes
* since: v1.63
- `boxes` <[boolean]>

When `true`, includes each element's bounding box as a `box` property with `x`, `y`, `width` and `height`. Coordinates are
relative to the viewport, in CSS pixels, as returned by `Element.getBoundingClientRect()`.
Defaults to `false`.

## async method: Locator.blur
* since: v1.28

Calls blur on the element.

### option: Locator.blur.timeout = %%-input-timeout-%%
* since: v1.28

### option: Locator.blur.timeout = %%-input-timeout-js-%%
* since: v1.28

## async method: Locator.boundingBox
* since: v1.14
- returns: "BoundingBox" <[null]|[Object]>
  * alias-csharp: LocatorBoundingBoxResult
  * alias-python: FloatRect
  - `x` <[float]> the x coordinate of the element in pixels.
  - `y` <[float]> the y coordinate of the element in pixels.
  - `width` <[float]> the width of the element in pixels.
  - `height` <[float]> the height of the element in pixels.

This method returns the bounding box of the element matching the locator, or `null` if the element is not visible. The bounding box is
calculated relative to the main frame viewport - which is usually the same as the browser window.

**Details**

Scrolling affects the returned bounding box, similarly to
Element.getBoundingClientRect. That
means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the
Element.getBoundingClientRect.

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following
snippet should click the center of the element.

**Usage**

```js
const box = await page.getByRole('button').boundingBox();
await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
```

```java
BoundingBox box = page.getByRole(AriaRole.BUTTON).boundingBox();
page.mouse().click(box.x + box.width / 2, box.y + box.height / 2);
```

```python
box = await page.get_by_role("button").bounding_box()
await page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```python
box = page.get_by_role("button").bounding_box()
page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
```

```csharp
var box = await page.GetByRole(AriaRole.Button).BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

### option: Locator.boundingBox.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.boundingBox.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.check
* since: v1.14

Ensure that checkbox or radio element is checked.

**Details**

Performs the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   checked, this method returns immediately.
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

**Usage**

```js
await page.getByRole('checkbox').check();
```

```java
page.getByRole(AriaRole.CHECKBOX).check();
```

```python
await page.get_by_role("checkbox").check()
```

```python
page.get_by_role("checkbox").check()
```

```csharp
await page.GetByRole(AriaRole.Checkbox).CheckAsync();
```

### option: Locator.check.position = %%-input-position-%%
* since: v1.14

### option: Locator.check.force = %%-input-force-%%
* since: v1.14

### option: Locator.check.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.check.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.check.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.check.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.check.trial = %%-input-trial-%%
* since: v1.14

## async method: Locator.clear
* since: v1.28

Clear the input field.

**Details**

This method waits for actionability checks, focuses the element, clears it and triggers an `input` event after clearing.

If the target element is not an ``, `<textarea>` or `[contenteditable]` element, this method throws an error. However, if the element is inside the `` element that has an associated control, the control will be cleared instead.

**Usage**

```js
await page.getByRole('textbox').clear();
```

```java
page.getByRole(AriaRole.TEXTBOX).clear();
```

```python
await page.get_by_role("textbox").clear()
```

```python
page.get_by_role("textbox").clear()
```

```csharp
await page.GetByRole(AriaRole.Textbox).ClearAsync();
```

### option: Locator.clear.force = %%-input-force-%%
* since: v1.28

### option: Locator.clear.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.28

### option: Locator.clear.timeout = %%-input-timeout-%%
* since: v1.28

### option: Locator.clear.timeout = %%-input-timeout-js-%%
* since: v1.28
