---
title: "Matches <span> (part 5 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/params.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Matches <span> (part 5 of 6)

## screenshot-option-path
- `path` <[path]>

The file path to save the image to. The screenshot type will be inferred from file extension. If [`option: path`] is a
relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be
saved to the disk.

## screenshot-option-type
- `type` "ScreenshotType" <"png"|"jpeg"|"webp">

Specify screenshot type, defaults to `png`.

## screenshot-option-mask
- `mask` <[Array]<[Locator]>>

Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with
a pink box `#FF00FF` (customized by [`option: maskColor`]) that completely covers its bounding box.
The mask is also applied to invisible elements, see Matching only visible elements to disable that.

## screenshot-option-mask-color
* since: v1.35
- `maskColor` <[string]>

Specify the color of the overlay box for masked elements, in CSS color format. Default color is pink `#FF00FF`.

## screenshot-option-full-page
- `fullPage` <[boolean]>

When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to
`false`.

## screenshot-option-clip
- `clip` "Clip" <[Object]>
  - `x` <[float]> x-coordinate of top-left corner of clip area
  - `y` <[float]> y-coordinate of top-left corner of clip area
  - `width` <[float]> width of clipping area
  - `height` <[float]> height of clipping area

An object which specifies clipping of the resulting image.

## screenshot-option-scale
- `scale` "ScreenshotScale" <"css"|"device">

When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.

Defaults to `"device"`.

## screenshot-option-scale-default-css
- `scale` "ScreenshotScale" <"css"|"device">

When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.

Defaults to `"css"`.

## screenshot-option-caret
- `caret` "ScreenshotCaret" <"hide"|"initial">

When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.

## screenshot-option-style
- `style` <string>

Text of the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible
or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies
to the inner frames.

## screenshot-option-style-path
- `stylePath` <[string]|[Array]<[string]>>

File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.

## screenshot-options-common-list-v1.8
- %%-screenshot-option-animations-%%
- %%-screenshot-option-omit-background-%%
- %%-screenshot-option-quality-%%
- %%-screenshot-option-path-%%
- %%-screenshot-option-scale-%%
- %%-screenshot-option-caret-%%
- %%-screenshot-option-type-%%
- %%-screenshot-option-mask-%%

## locator-get-by-test-id-test-id
* since: v1.27
- `testId` <[string]|[RegExp]>

Id to locate the element by.

## locator-get-by-text-text
* since: v1.27
- `text` <[string]|[RegExp]>

Text to locate the element for.

## locator-get-by-text-exact
* since: v1.27
- `exact` <[boolean]>

Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

## get-by-role-to-have-role-role
- `role` "AriaRole" <"alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem">

Required aria role.

## locator-get-by-role-option-checked
* since: v1.27
- `checked` <[boolean]>

An attribute that is usually set by `aria-checked` or native `` controls.

Learn more about `aria-checked`.

## locator-get-by-role-option-description
* since: v1.60
- `description` <[string]|[RegExp]>

Option to match the accessible description. By default, matching is case-insensitive and searches for a substring, use [`option: exact`] to control this behavior.

Learn more about accessible description.

## locator-get-by-role-option-disabled
* since: v1.27
- `disabled` <[boolean]>

An attribute that is usually set by `aria-disabled` or `disabled`.

:::note
Unlike most other attributes, `disabled` is inherited through the DOM hierarchy.
Learn more about `aria-disabled`.
:::

## locator-get-by-role-option-expanded
* since: v1.27
- `expanded` <[boolean]>

An attribute that is usually set by `aria-expanded`.

Learn more about `aria-expanded`.

## locator-get-by-role-option-includeHidden
* since: v1.27
- `includeHidden` <[boolean]>

Option that controls whether hidden elements are matched. By default, only non-hidden elements, as defined by ARIA, are matched by role selector.

Learn more about `aria-hidden`.

## locator-get-by-role-option-level
* since: v1.27
- `level` <[int]>

A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.

Learn more about `aria-level`.

## locator-get-by-role-option-name
* since: v1.27
- `name` <[string]|[RegExp]>

Option to match the accessible name. By default, matching is case-insensitive and searches for a substring, use [`option: exact`] to control this behavior.

Learn more about accessible name.

## locator-get-by-role-option-exact
* since: v1.28
- `exact` <[boolean]>

Whether [`option: name`] and [`option: description`] are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.

## locator-get-by-role-option-pressed
* since: v1.27
- `pressed` <[boolean]>

An attribute that is usually set by `aria-pressed`.

Learn more about `aria-pressed`.

## locator-get-by-role-option-selected
* since: v1.27
- `selected` <boolean>

An attribute that is usually set by `aria-selected`.

Learn more about `aria-selected`.

## locator-get-by-role-option-list-v1.27
- %%-locator-get-by-role-option-checked-%%
- %%-locator-get-by-role-option-disabled-%%
- %%-locator-get-by-role-option-expanded-%%
- %%-locator-get-by-role-option-includeHidden-%%
- %%-locator-get-by-role-option-level-%%
- %%-locator-get-by-role-option-name-%%
- %%-locator-get-by-role-option-pressed-%%
- %%-locator-get-by-role-option-selected-%%

## template-locator-locator

The method finds an element matching the specified selector in the locator's subtree. It also accepts filter options, similar to [`method: Locator.filter`] method.

Learn more about locators.

## template-locator-root-locator

The method returns an element locator that can be used to perform actions on this page / frame.
Locator is resolved to the element immediately before performing an action, so a series of actions on the same locator can in fact be performed on different DOM elements. That would happen if the DOM structure between those actions has changed.

Learn more about locators.

## template-locator-get-by-test-id

Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

```js
await page.getByTestId('directions').click();
```

```java
page.getByTestId("directions").click();
```

```python
await page.get_by_test_id("directions").click()
```

```python
page.get_by_test_id("directions").click()
```

```csharp
await page.GetByTestId("directions").ClickAsync();
```

**Details**

By default, the `data-testid` attribute is used as a test id. Use [`method: Selectors.setTestIdAttribute`] to configure a different test id attribute if necessary.

```js
// Set custom test id attribute from @playwright/test config:
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw'
  },
});
```

## template-locator-get-by-text

Allows locating elements that contain given text.

See also [`method: Locator.filter`] that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

```js
// Matches <span>
page.getByText('world');

// Matches first <div>
page.getByText('Hello world');

// Matches second <div>
page.getByText('Hello', { exact: true });

// Matches both <div>s
page.getByText(/Hello/);

// Matches second <div>
page.getByText(/^hello$/i);
```

```python
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

```python
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

```java
// Matches <span>
page.getByText("world");

// Matches first <div>
page.getByText("Hello world");

// Matches second <div>
page.getByText("Hello", new Page.GetByTextOptions().setExact(true));

// Matches both <div>s
page.getByText(Pattern.compile("Hello"));

// Matches second <div>
page.getByText(Pattern.compile("^hello$", Pattern.CASE_INSENSITIVE));
```

```csharp
// Matches <span>
page.GetByText("world");

// Matches first <div>
page.GetByText("Hello world");

// Matches second <div>
page.GetByText("Hello", new() { Exact = true });

// Matches both <div>s
page.GetByText(new Regex("Hello"));

// Matches second <div>
page.GetByText(new Regex("^hello$", RegexOptions.IgnoreCase));
```

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches ``.

## template-locator-get-by-alt-text

Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

```js
await page.getByAltText('Playwright logo').click();
```

```java
page.getByAltText("Playwright logo").click();
```

```python
await page.get_by_alt_text("Playwright logo").click()
```

```python
page.get_by_alt_text("Playwright logo").click()
```

```csharp
await page.GetByAltText("Playwright logo").ClickAsync();
```

## template-locator-get-by-label-text

Allows locating input elements by the text of the associated `` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "<example-value>" and "<example-value>" in the following DOM:

```html
<input aria-label="Username">
<label for="<example-value>">Password:</label>
<input id="<example-value>">
```

```js
await page.getByLabel('Username').fill('john');
await page.getByLabel('<example-value>').fill('<example-value>');
```

```java
page.getByLabel("Username").fill("john");
page.getByLabel("<example-value>").fill("<example-value>");
```

```python
await page.get_by_label("Username").fill("john")
await page.get_by_label("<example-value>").fill("<example-value>")
```

```python
page.get_by_label("Username").fill("john")
page.get_by_label("<example-value>").fill("<example-value>")
```

```csharp
await page.GetByLabel("Username").FillAsync("john");
await page.GetByLabel("<example-value>").FillAsync("<example-value>");
```

## template-locator-get-by-placeholder-text

Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="user@example.com" />
```

You can fill the input after locating it by the placeholder text:

```js
await page
    .getByPlaceholder('user@example.com')
    .fill('user@example.com');
```

```java
page.getByPlaceholder("user@example.com").fill("user@example.com");
```

```python
await page.get_by_placeholder("user@example.com").fill("user@example.com")
```

```python
page.get_by_placeholder("user@example.com").fill("user@example.com")
```

```csharp
await page
    .GetByPlaceholder("user@example.com")
    .FillAsync("user@example.com");
```
