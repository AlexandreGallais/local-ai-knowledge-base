---
title: "Other locators (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/other-locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Other locators (part 2 of 2)

## N-th element locator

You can narrow down query to the n-th match using the `nth=` locator passing a zero-based index.

```js
// Click first button
await page.locator('button').locator('nth=0').click();

// Click last button
await page.locator('button').locator('nth=-1').click();
```

```java
// Click first button
page.locator("button").locator("nth=0").click();

// Click last button
page.locator("button").locator("nth=-1").click();
```

```python
# Click first button
await page.locator("button").locator("nth=0").click()

# Click last button
await page.locator("button").locator("nth=-1").click()
```

```python
# Click first button
page.locator("button").locator("nth=0").click()

# Click last button
page.locator("button").locator("nth=-1").click()
```

```csharp
// Click first button
await page.Locator("button").Locator("nth=0").ClickAsync();

// Click last button
await page.Locator("button").Locator("nth=-1").ClickAsync();
```

## Parent element locator

When you need to target a parent element of some other element, most of the time you should [`method: Locator.filter`] by the child locator. For example, consider the following DOM structure:

```html
<li><label>Hello</label></li>
<li><label>World</label></li>
```

If you'd like to target the parent `` of a label with text `"Hello"`, using [`method: Locator.filter`] works best:

```js
const child = page.getByText('Hello');
const parent = page.getByRole('listitem').filter({ has: child });
```

```java
Locator child = page.getByText("Hello");
Locator parent = page.getByRole(AriaRole.LISTITEM).filter(new Locator.FilterOptions().setHas(child));
```

```python
child = page.get_by_text("Hello")
parent = page.get_by_role("listitem").filter(has=child)
```

```python
child = page.get_by_text("Hello")
parent = page.get_by_role("listitem").filter(has=child)
```

```csharp
var child = page.GetByText("Hello");
var parent = page.GetByRole(AriaRole.Listitem).Filter(new () { Has = child });
```

Alternatively, if you cannot find a suitable locator for the parent element, use `xpath=..`. Note that this method is not as reliable, because any changes to the DOM structure will break your tests. Prefer [`method: Locator.filter`] when possible.

```js
const parent = page.getByText('Hello').locator('xpath=..');
```

```java
Locator parent = page.getByText("Hello").locator("xpath=..");
```

```python
parent = page.get_by_text("Hello").locator('xpath=..')
```

```python
parent = page.get_by_text("Hello").locator('xpath=..')
```

```csharp
var parent = page.GetByText("Hello").Locator("xpath=..");
```

## XPath locator

:::warning
We recommend prioritizing user-visible locators like text or accessible role instead of using XPath that is tied to the implementation and easily break when the page changes.
:::

XPath locators are equivalent to calling `Document.evaluate`.

```js
await page.locator('xpath=//button').click();
```
```java
page.locator("xpath=//button").click();
```
```python
await page.locator("xpath=//button").click()
```
```python
page.locator("xpath=//button").click()
```
```csharp
await page.Locator("xpath=//button").ClickAsync();
```

:::note
Any selector string starting with `//` or `..` are assumed to be an xpath selector. For example, Playwright converts `'//html/body'` to `'xpath=//html/body'`.
:::

:::note
XPath does not pierce shadow roots.
:::

### XPath union

Pipe operator (`|`) can be used to specify multiple selectors in XPath. It will match all
elements that can be selected by one of the selectors in that list.

```js
// Waits for either confirmation dialog or load spinner.
await page.locator(
    `//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']`
).waitFor();
```

```java
// Waits for either confirmation dialog or load spinner.
page.locator("//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']").waitFor();
```

```python
# Waits for either confirmation dialog or load spinner.
await page.locator("//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']").wait_for()
```

```python
# Waits for either confirmation dialog or load spinner.
page.locator("//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']").wait_for()
```

```csharp
// Waits for either confirmation dialog or load spinner.
await page.Locator("//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']").WaitForAsync();
```

## Label to form control retargeting

:::warning
We recommend locating by label text instead of relying to label-to-control retargeting.
:::

Targeted input actions in Playwright automatically distinguish between labels and controls, so you can target the label to perform an action on the associated control.

For example, consider the following DOM structure: `Password:`. You can target the label by its "<example-value>" text using [`method: Page.getByText`]. However, the following actions will be performed on the input instead of the label:
- [`method: Locator.click`] will click the label and automatically focus the input field;
- [`method: Locator.fill`] will fill the input field;
- [`method: Locator.inputValue`] will return the value of the input field;
- [`method: Locator.selectText`] will select text in the input field;
- [`method: Locator.setInputFiles`] will set files for the input field with `type=file`;
- [`method: Locator.selectOption`] will select an option from the select box.

```js
// Fill the input by targeting the label.
await page.getByText('<example-value>').fill('<example-value>');
```

```java
// Fill the input by targeting the label.
page.getByText("<example-value>").fill("<example-value>");
```

```python
# Fill the input by targeting the label.
await page.get_by_text("<example-value>").fill("<example-value>")
```

```python
# Fill the input by targeting the label.
page.get_by_text("<example-value>").fill("<example-value>")
```

```csharp
// Fill the input by targeting the label.
await page.GetByText("<example-value>").FillAsync("<example-value>");
```

However, other methods will target the label itself, for example [`method: LocatorAssertions.toHaveText`] will assert the text content of the label, not the input field.

```js
// Fill the input by targeting the label.
await expect(page.locator('<example-value>')).toHaveText('<example-value>');
```

```java
// Fill the input by targeting the label.
assertThat(page.locator("<example-value>")).hasText("<example-value>");
```

```python
# Fill the input by targeting the label.
await expect(page.locator("<example-value>")).to_have_text("<example-value>")
```

```python
# Fill the input by targeting the label.
expect(page.locator("<example-value>")).to_have_text("<example-value>")
```

```csharp
// Fill the input by targeting the label.
await Expect(Page.Locator("<example-value>")).ToHaveTextAsync("<example-value>");
```

## Legacy text locator

:::warning
We recommend the modern text locator instead.
:::

Legacy text locator matches elements that contain passed text.

```js
await page.locator('text=Log in').click();
```
```java
page.locator("text=Log in").click();
```
```python
await page.locator("text=Log in").click()
```
```python
page.locator("text=Log in").click()
```
```csharp
await page.Locator("text=Log in").ClickAsync();
```

Legacy text locator has a few variations:

- `text=Log in` - default matching is case-insensitive, trims whitespace and searches for a substring. For example, `text=Log` matches `Log in`.

  ```js
  await page.locator('text=Log in').click();
  ```
  ```java
  page.locator("text=Log in").click();
  ```
  ```python
  await page.locator("text=Log in").click()
  ```
  ```python
  page.locator("text=Log in").click()
  ```
  ```csharp
  await page.Locator("text=Log in").ClickAsync();
  ```

- `text="Log in"` - text body can be escaped with single or double quotes to search for a text node with exact content after trimming whitespace.

  For example, `text="Log"` does not match `Log in` because `` contains a single text node `"Log in"` that is not equal to `"Log"`. However, `text="Log"` matches ` Log in`, because `` contains a text node `" Log "`. This exact mode implies case-sensitive matching, so `text="Download"` will not match `download`.

  Quoted body follows the usual escaping rules, e.g. use `\"` to escape double quote in a double-quoted string: `text="foo\"bar"`.

  ```js
  await page.locator('text="Log in"').click();
  ```
  ```java
  page.locator("text='Log in'").click();
  ```
  ```python
  await page.locator("text='Log in'").click()
  ```
  ```python
  page.locator("text='Log in'").click()
  ```
  ```csharp
  await page.Locator("text='Log in'").ClickAsync();
  ```

- `/Log\s*in/i` - body can be a JavaScript-like regex wrapped in `/` symbols. For example, `text=/Log\s*in/i` matches `Login` and `log IN`.

  ```js
  await page.locator('text=/Log\\s*in/i').click();
  ```
  ```java
  page.locator("text=/Log\\s*in/i").click();
  ```
  ```python
  await page.locator("text=/Log\s*in/i").click()
  ```
  ```python
  page.locator("text=/Log\s*in/i").click()
  ```
  ```csharp
  await page.Locator("text=/Log\\s*in/i").ClickAsync();
  ```

:::note
String selectors starting and ending with a quote (either `"` or `'`) are assumed to be a legacy text locators. For example, `"Log in"` is converted to `text="Log in"` internally.
:::

:::note
Matching always normalizes whitespace. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.
:::

:::note
Input elements of the type `button` and `submit` are matched by their `value` instead of text content. For example, `text=Log in` matches ``.
:::

## id, data-testid, data-test-id, data-test selectors

:::warning
We recommend locating by test id instead.
:::

Playwright supports shorthand for selecting elements using certain attributes. Currently, only
the following attributes are supported:

- `id`
- `data-testid`
- `data-test-id`
- `data-test`

```js
// Fill an input with the id "username"
await page.locator('id=username').fill('value');

// Click an element with data-test-id "submit"
await page.locator('data-test-id=submit').click();
```

```java
// Fill an input with the id "username"
page.locator("id=username").fill("value");

// Click an element with data-test-id "submit"
page.locator("data-test-id=submit").click();
```

```python
# Fill an input with the id "username"
await page.locator('id=username').fill('value')

# Click an element with data-test-id "submit"
await page.locator('data-test-id=submit').click()
```

```python
# Fill an input with the id "username"
page.locator('id=username').fill('value')

# Click an element with data-test-id "submit"
page.locator('data-test-id=submit').click()
```

```csharp
// Fill an input with the id "username"
await page.Locator("id=username").FillAsync("value");

// Click an element with data-test-id "submit"
await page.Locator("data-test-id=submit").ClickAsync();
```

:::note
Attribute selectors are not CSS selectors, so anything CSS-specific like `:enabled` is not supported. For more features, use a proper css selector, e.g. `css=[data-test="login"]:enabled`.
:::

## Chaining selectors

:::warning
We recommend chaining locators instead.
:::

Selectors defined as `engine=body` or in short-form can be combined with the `>>` token, e.g. `selector1 >> selector2 >> selectors3`. When selectors are chained, the next one is queried relative to the previous one's result.

For example,

```txt
css=article >> css=.bar > .baz >> css=span[attr=value]
```

is equivalent to

```js
document
    .querySelector('article')
    .querySelector('.bar > .baz')
    .querySelector('span[attr=value]');
```

If a selector needs to include `>>` in the body, it should be escaped inside a string to not be confused with chaining separator, e.g. `text="some >> text"`.

### Intermediate matches

:::warning
We recommend filtering by another locator to locate elements that contain other elements.
:::

By default, chained selectors resolve to an element queried by the last selector. A selector can be prefixed with `*` to capture elements that are queried by an intermediate selector.

For example, `css=article >> text=Hello` captures the element with the text `Hello`, and `*css=article >> text=Hello` (note the `*`) captures the `article` element that contains some element with the text `Hello`.
