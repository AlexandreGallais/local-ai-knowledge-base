---
title: "Other locators (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/other-locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

:::note
Check out the main locators guide for most common and recommended locators.
:::

In addition to recommended locators like [`method: Page.getByRole`] and [`method: Page.getByText`], Playwright supports a variety of other locators described in this guide.

## CSS locator

:::note
We recommend prioritizing user-visible locators like text or accessible role instead of using CSS that is tied to the implementation and could break when the page changes.
:::

Playwright can locate an element by CSS selector.

```js
await page.locator('css=button').click();
```
```java
page.locator("css=button").click();
```
```python
await page.locator("css=button").click()
```
```python
page.locator("css=button").click()
```
```csharp
await page.Locator("css=button").ClickAsync();
```

Playwright augments standard CSS selectors in two ways:
* CSS selectors pierce open shadow DOM.
* Playwright adds custom pseudo-classes like `:visible`, `:has-text()`, `:has()`, `:is()`, `:nth-match()` and more.

### CSS: matching by text

Playwright include a number of CSS pseudo-classes to match elements by their text content.

- `article:has-text("Playwright")` - the `:has-text()` matches any element containing specified text somewhere inside, possibly in a child or a descendant element. Matching is case-insensitive, trims whitespace and searches for a substring.

  For example, `article:has-text("Playwright")` matches `Playwright`.

  Note that `:has-text()` should be used together with other CSS specifiers, otherwise it will match all the elements containing specified text, including the `<body>`.
  ```js
  // Wrong, will match many elements including <body>
  await page.locator(':has-text("Playwright")').click();
  // Correct, only matches the <article> element
  await page.locator('article:has-text("Playwright")').click();
  ```

  ```java
  // Wrong, will match many elements including <body>
  page.locator(":has-text(\"Playwright\")").click();
  // Correct, only matches the <article> element
  page.locator("article:has-text(\"Playwright\")").click();
  ```

  ```python
  # Wrong, will match many elements including <body>
  await page.locator(':has-text("Playwright")').click()
  # Correct, only matches the <article> element
  await page.locator('article:has-text("Playwright")').click()
  ```
  ```python
  # Wrong, will match many elements including <body>
  page.locator(':has-text("Playwright")').click()
  # Correct, only matches the <article> element
  page.locator('article:has-text("All products")').click()
  ```

  ```csharp
  // Wrong, will match many elements including <body>
  await page.Locator(":has-text(\"Playwright\")").ClickAsync();
  // Correct, only matches the <article> element
  await page.Locator("article:has-text(\"Playwright\")").ClickAsync();
  ```

- `#nav-bar :text("Home")` - the `:text()` pseudo-class matches the smallest element containing specified text. Matching is case-insensitive, trims whitespace and searches for a substring.

  For example, this will find an element with text "Home" somewhere inside the `#nav-bar` element:

  ```js
  await page.locator('#nav-bar :text("Home")').click();
  ```
  ```java
  page.locator("#nav-bar :text('Home')").click();
  ```
  ```python
  await page.locator("#nav-bar :text('Home')").click()
  ```
  ```python
  page.locator("#nav-bar :text('Home')").click()
  ```
  ```csharp
  await page.Locator("#nav-bar :text('Home')").ClickAsync();
  ```

- `#nav-bar :text-is("Home")` - the `:text-is()` pseudo-class matches the smallest element with exact text. Exact matching is case-sensitive, trims whitespace and searches for the full string.

  For example, `:text-is("Log")` does not match `Log in` because `` contains a single text node `"Log in"` that is not equal to `"Log"`. However, `:text-is("Log")` matches ` Log in`, because `` contains a text node `" Log "`.

  Similarly, `:text-is("Download")` will not match `download` because it is case-sensitive.

* `#nav-bar :text-matches("reg?ex", "i")` - the `:text-matches()` pseudo-class matches the smallest element with text content matching the JavaScript-like regex.

  For example, `:text-matches("Log\s*in", "i")` matches `Login` and `log IN`.

:::note
Text matching always normalizes whitespace. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.
:::

:::note
Input elements of the type `button` and `submit` are matched by their `value` instead of text content. For example, `:text("Log in")` matches ``.
:::

### CSS: matching only visible elements

Playwright supports the `:visible` pseudo class in CSS selectors. For example, `css=button` matches all the buttons on the page, while `css=button:visible` only matches visible buttons. This is useful to distinguish elements that are very similar but differ in visibility.

:::note
Prefer the [`method: Locator.visible`] shortcut over the `:visible` pseudo-class.
:::

Consider a page with two buttons, first invisible and second visible.

```html
<button style='display: none'>Invisible</button>
<button>Visible</button>
```

* This will find both buttons and throw a strictness violation error:

  ```js
  await page.locator('button').click();
  ```

  ```java
  page.locator("button").click();
  ```

  ```python
  await page.locator("button").click()
  ```

  ```python
  page.locator("button").click()
  ```

  ```csharp
  await page.Locator("button").ClickAsync();
  ```

* This will only find a second button, because it is visible, and then click it.

  ```js
  await page.locator('button:visible').click();
  ```
  ```java
  page.locator("button:visible").click();
  ```
  ```python
  await page.locator("button:visible").click()
  ```
  ```python
  page.locator("button:visible").click()
  ```
  ```csharp
  await page.Locator("button:visible").ClickAsync();
  ```

### CSS: elements that contain other elements

The `:has()` pseudo-class is a CSS pseudo-class. It returns an element if any of the selectors passed as parameters
relative to the `:scope` of the given element match at least one element.

Following snippet returns text content of an `` element that has a `` inside.

```js
await page.locator('article:has(div.promo)').textContent();
```

```java
page.locator("article:has(div.promo)").textContent();
```

```python
await page.locator("article:has(div.promo)").text_content()
```

```python
page.locator("article:has(div.promo)").text_content()
```

```csharp
await page.Locator("article:has(div.promo)").TextContentAsync();
```

### CSS: elements matching one of the conditions

Comma-separated list of CSS selectors will match all elements that can be selected by
one of the selectors in that list.

```js
// Clicks a <button> that has either a "Log in" or "Sign in" text.
await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click();
```

```java
// Clicks a <button> that has either a "Log in" or "Sign in" text.
page.locator("button:has-text(\"Log in\"), button:has-text(\"Sign in\")").click();
```

```python
# Clicks a <button> that has either a "Log in" or "Sign in" text.
await page.locator('button:has-text("Log in"), button:has-text("Sign in")').click()
```

```python
# Clicks a <button> that has either a "Log in" or "Sign in" text.
page.locator('button:has-text("Log in"), button:has-text("Sign in")').click()
```

```csharp
// Clicks a <button> that has either a "Log in" or "Sign in" text.
await page.Locator("button:has-text(\"Log in\"), button:has-text(\"Sign in\")").ClickAsync();
```

The `:is()` pseudo-class is a CSS pseudo-class that
may be useful for specifying a list of extra conditions on an element.

### CSS: matching elements based on layout

:::warning
Layout selectors are deprecated and may be removed in the future. Matching based on layout may produce unexpected results. For example, a different element could be matched when layout changes by one pixel.

We recommend prioritizing user-visible locators instead.
:::

Sometimes, it is hard to come up with a good selector to the target element when it lacks distinctive features. In this case, using Playwright layout CSS pseudo-classes could help. These can be combined with regular CSS to pinpoint one of the multiple choices.

For example, `input:right-of(:text("<example-value>"))` matches an input field that is to the right of text "<example-value>" - useful when the page has multiple inputs that are hard to distinguish between each other.

Note that layout pseudo-classes are useful in addition to something else, like `input`. If you use a layout pseudo-class alone, like `:right-of(:text("<example-value>"))`, most likely you'll get not the input you are looking for, but some empty element in between the text and the target input.

Layout pseudo-classes use bounding client rect
to compute distance and relative position of the elements.
* `:right-of(div > button)` - Matches elements that are to the right of any element matching the inner selector, at any vertical position.
* `:left-of(div > button)` - Matches elements that are to the left of any element matching the inner selector, at any vertical position.
* `:above(div > button)` - Matches elements that are above any of the elements matching the inner selector, at any horizontal position.
* `:below(div > button)` - Matches elements that are below any of the elements matching the inner selector, at any horizontal position.
* `:near(div > button)` - Matches elements that are near (within 50 CSS pixels) any of the elements matching the inner selector.

Note that resulting matches are sorted by their distance to the anchor element, so you can use [`method: Locator.first`] to pick the closest one. This is only useful if you have something like a list of similar elements, where the closest is obviously the right one. However, using [`method: Locator.first`] in other cases most likely won't work as expected - it will not target the element you are searching for, but some other element that happens to be the closest like a random empty ``, or an element that is scrolled out and is not currently visible.

```js
// Fill an input to the right of "Username".
await page.locator('input:right-of(:text("Username"))').fill('value');

// Click a button near the promo card.
await page.locator('button:near(.promo-card)').click();

// Click the radio input in the list closest to the "Label 3".
await page.locator('[type=radio]:left-of(:text("Label 3"))').first().click();
```

```java
// Fill an input to the right of "Username".
page.locator("input:right-of(:text(\"Username\"))").fill("value");

// Click a button near the promo card.
page.locator("button:near(.promo-card)").click();

// Click the radio input in the list closest to the "Label 3".
page.locator("[type=radio]:left-of(:text(\"Label 3\"))").first().click();
```

```python
# Fill an input to the right of "Username".
await page.locator("input:right-of(:text(\"Username\"))").fill("value")

# Click a button near the promo card.
await page.locator("button:near(.promo-card)").click()

# Click the radio input in the list closest to the "Label 3".
await page.locator("[type=radio]:left-of(:text(\"Label 3\"))").first.click()
```

```python
# Fill an input to the right of "Username".
page.locator("input:right-of(:text(\"Username\"))").fill("value")

# Click a button near the promo card.
page.locator("button:near(.promo-card)").click()

# Click the radio input in the list closest to the "Label 3".
page.locator("[type=radio]:left-of(:text(\"Label 3\"))").first.click()
```

```csharp
// Fill an input to the right of "Username".
await page.Locator("input:right-of(:text(\"Username\"))").FillAsync("value");

// Click a button near the promo card.
await page.Locator("button:near(.promo-card)").ClickAsync();

// Click the radio input in the list closest to the "Label 3".
await page.Locator("[type=radio]:left-of(:text(\"Label 3\"))").First.ClickAsync();
```

All layout pseudo-classes support optional maximum pixel distance as the last argument. For example
`button:near(:text("Username"), 120)` matches a button that is at most 120 CSS pixels away from the element with the text "Username".

### CSS: pick n-th match from the query result

:::note
It is usually possible to distinguish elements by some attribute or text content, which is more resilient to page changes.
:::

Sometimes page contains a number of similar elements, and it is hard to select a particular one. For example:

```html
<section>
  <button>Buy</button>
</section>
<article>
  <div>
    <button>Buy</button>
  </div>
</article>
<div>
  <div>
    <button>Buy</button>
  </div>
</div>
```

In this case, `:nth-match(:text("Buy"), 3)` will select the third button from the snippet above. Note that index is one-based.

```js
// Click the third "Buy" button
await page.locator(':nth-match(:text("Buy"), 3)').click();
```

```java
// Click the third "Buy" button
page.locator(":nth-match(:text('Buy'), 3)").click();
```

```python
# Click the third "Buy" button
await page.locator(":nth-match(:text('Buy'), 3)").click()
```

```python
# Click the third "Buy" button
page.locator(":nth-match(:text('Buy'), 3)").click()
```

```csharp
// Click the third "Buy" button
await page.Locator(":nth-match(:text('Buy'), 3)").ClickAsync();
```

`:nth-match()` is also useful to wait until a specified number of elements appear, using [`method: Locator.waitFor`].

```js
// Wait until all three buttons are visible
await page.locator(':nth-match(:text("Buy"), 3)').waitFor();
```

```java
// Wait until all three buttons are visible
page.locator(":nth-match(:text('Buy'), 3)").waitFor();
```

```python
# Wait until all three buttons are visible
await page.locator(":nth-match(:text('Buy'), 3)").wait_for()
```

```python
# Wait until all three buttons are visible
page.locator(":nth-match(:text('Buy'), 3)").wait_for()
```

```csharp
// Wait until all three buttons are visible
await page.Locator(":nth-match(:text('Buy'), 3)").WaitForAsync();
```

:::note
Unlike `:nth-child()`, elements do not have to be siblings, they could be anywhere on the page. In the snippet above, all three buttons match `:text("Buy")` selector, and `:nth-match()` selects the third button.
:::
