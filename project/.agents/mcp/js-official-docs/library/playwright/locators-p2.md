---
title: "Locators (part 2 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Locators (part 2 of 5)

## Locating elements

Playwright comes with multiple built-in locators. To make tests resilient, we recommend prioritizing user-facing attributes and explicit contracts such as [`method: Page.getByRole`].

For example, consider the following DOM structure.

```html
<button>Sign in</button>
```

Locate the element by its role of `button` with name "Sign in".

```js
await page.getByRole('button', { name: 'Sign in' }).click();
```

```java
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .click();
```

```python
await page.get_by_role("button", name="Sign in").click()
```

```python
page.get_by_role("button", name="Sign in").click()
```

```csharp
await Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" }).ClickAsync();
```

:::note
Use the code generator to generate a locator, and then edit it as you'd like.
:::

Every time a locator is used for an action, an up-to-date DOM element is located in the page. In the snippet
below, the underlying DOM element will be located twice, once prior to every action. This means that if the
DOM changes in between the calls due to re-render, the new element corresponding to the
locator will be used.

```js
const locator = page.getByRole('button', { name: 'Sign in' });

await locator.hover();
await locator.click();
```

```java
Locator locator = page.getByRole(AriaRole.BUTTON,
                                 new Page.GetByRoleOptions().setName("Sign in"));

locator.hover();
locator.click();
```

```python
locator = page.get_by_role("button", name="Sign in")

await locator.hover()
await locator.click()
```

```python
locator = page.get_by_role("button", name="Sign in")

locator.hover()
locator.click()
```

```csharp
var locator = Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" });

await locator.HoverAsync();
await locator.ClickAsync();
```

Note that all methods that create a locator, such as [`method: Page.getByLabel`], are also available on the [Locator] and [FrameLocator] classes, so you can chain them and iteratively narrow down your locator.

```js
const locator = page
    .frameLocator('#my-frame')
    .getByRole('button', { name: 'Sign in' });

await locator.click();
```

```java
Locator locator = page
    .frameLocator("#my-frame")
    .getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"));

locator.click();
```

```python
locator = page.frame_locator("#my-frame").get_by_role("button", name="Sign in")

await locator.click()
```

```python
locator = page.frame_locator("my-frame").get_by_role("button", name="Sign in")

locator.click()
```

```csharp
var locator = Page
    .FrameLocator("#my-frame")
    .GetByRole(AriaRole.Button, new() { Name = "Sign in" });

await locator.ClickAsync();
```

### Locate by role

The [`method: Page.getByRole`] locator reflects how users and assistive technology perceive the page, for example whether some element is a button or a checkbox. When locating by role, you should usually pass the accessible name as well, so that the locator pinpoints the exact element.

For example, consider the following DOM structure.

```html
<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>
```

You can locate each element by its implicit role:

```js
await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

await page.getByRole('checkbox', { name: 'Subscribe' }).check();

await page.getByRole('button', { name: /submit/i }).click();
```

```python
await expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

await page.get_by_role("checkbox", name="Subscribe").check()

await page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

```python
expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

page.get_by_role("checkbox", name="Subscribe").check()

page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

```java
assertThat(page
    .getByRole(AriaRole.HEADING,
               new Page.GetByRoleOptions().setName("Sign up")))
    .isVisible();

page.getByRole(AriaRole.CHECKBOX,
               new Page.GetByRoleOptions().setName("Subscribe"))
    .check();

page.getByRole(AriaRole.BUTTON,
               new Page.GetByRoleOptions().setName(
                   Pattern.compile("submit", Pattern.CASE_INSENSITIVE)))
    .click();
```

```csharp
await Expect(Page
    .GetByRole(AriaRole.Heading, new() { Name = "Sign up" }))
    .ToBeVisibleAsync();

await Page
    .GetByRole(AriaRole.Checkbox, new() { Name = "Subscribe" })
    .CheckAsync();

await Page
    .GetByRole(AriaRole.Button, new() {
        NameRegex = new Regex("submit", RegexOptions.IgnoreCase)
    })
    .ClickAsync();
```

Role locators include buttons, checkboxes, headings, links, lists, tables, and many more and follow W3C specifications for ARIA role, ARIA attributes and accessible name. Note that many html elements like `` have an implicitly defined role that is recognized by the role locator.

Note that role locators **do not replace** accessibility audits and conformance tests, but rather give early feedback about the ARIA guidelines.

:::note[When to use role locators]
We recommend prioritizing role locators to locate elements, as it is the closest way to how users and assistive technology perceive the page.
:::

### Locate by label

Most form controls usually have dedicated labels that could be conveniently used to interact with the form. In this case, you can locate the control by its associated label using [`method: Page.getByLabel`].

For example, consider the following DOM structure.

```html
<label>Password <input type="<example-value>" /></label>

```

You can fill the input after locating it by the label text:

```js
await page.getByLabel('<example-value>').fill('<example-value>');
```

```java
page.getByLabel("<example-value>").fill("<example-value>");
```

```python
await page.get_by_label("<example-value>").fill("<example-value>")
```

```python
page.get_by_label("<example-value>").fill("<example-value>")
```

```csharp
await Page.GetByLabel("<example-value>").FillAsync("<example-value>");
```

:::note[When to use label locators]
Use this locator when locating form fields.
:::
### Locate by placeholder

Inputs may have a placeholder attribute to hint to the user what value should be entered. You can locate such an input using [`method: Page.getByPlaceholder`].

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
await Page
    .GetByPlaceholder("user@example.com")
    .FillAsync("user@example.com");
```

:::note[When to use placeholder locators]
Use this locator when locating form elements that do not have labels but do have placeholder texts.
:::

### Locate by text

Find an element by the text it contains. You can match by a substring, exact string, or a regular expression when using [`method: Page.getByText`].

For example, consider the following DOM structure.

```html
<span>Welcome, John</span>
```

You can locate the element by the text it contains:

```js
await expect(page.getByText('Welcome, John')).toBeVisible();
```

```java
assertThat(page.getByText("Welcome, John")).isVisible();
```

```python
await expect(page.get_by_text("Welcome, John")).to_be_visible()
```

```python
expect(page.get_by_text("Welcome, John")).to_be_visible()
```

```csharp
await Expect(Page.GetByText("Welcome, John")).ToBeVisibleAsync();
```

Set an exact match:
```js
await expect(page.getByText('Welcome, John', { exact: true })).toBeVisible();
```

```java
assertThat(page
    .getByText("Welcome, John", new Page.GetByTextOptions().setExact(true)))
    .isVisible();
```

```python
await expect(page.get_by_text("Welcome, John", exact=True)).to_be_visible()
```

```python
expect(page.get_by_text("Welcome, John", exact=True)).to_be_visible()
```

```csharp
await Expect(Page
    .GetByText("Welcome, John", new() { Exact = true }))
    .ToBeVisibleAsync();
```

Match with a regular expression:

```js
await expect(page.getByText(/welcome, [A-Za-z]+$/i)).toBeVisible();
```

```java
assertThat(page
    .getByText(Pattern.compile("welcome, john$", Pattern.CASE_INSENSITIVE)))
    .isVisible();
```

```python
await expect(
    page.get_by_text(re.compile("welcome, john", re.IGNORECASE))
).to_be_visible()
```

```python
expect(page.get_by_text(re.compile("welcome, john", re.IGNORECASE))).to_be_visible()
```

```csharp
await Expect(Page
    .GetByText(new Regex("welcome, john", RegexOptions.IgnoreCase)))
    .ToBeVisibleAsync();
```

:::note
Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.
:::

:::note[When to use text locators]
We recommend using text locators to find non interactive elements like `div`, `span`, `p`, etc. For interactive elements like `button`, `a`, `input`, etc. use role locators.
:::

You can also filter by text which can be useful when trying to find a particular item in a list.

### Locate by alt text

All images should have an `alt` attribute that describes the image. You can locate an image based on the text alternative using [`method: Page.getByAltText`].

For example, consider the following DOM structure.

```html
<img alt="playwright logo" src="/img/playwright-logo.svg" width="100" />
```

You can click on the image after locating it by the text alternative:

```js
await page.getByAltText('playwright logo').click();
```

```java
page.getByAltText("playwright logo").click();
```

```python
await page.get_by_alt_text("playwright logo").click()
```

```python
page.get_by_alt_text("playwright logo").click()
```

```csharp
await Page.GetByAltText("playwright logo").ClickAsync();
```

:::note[When to use alt locators]
Use this locator when your element supports alt text such as `img` and `area` elements.
:::

### Locate by title

Locate an element with a matching title attribute using [`method: Page.getByTitle`].

For example, consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

```js
await expect(page.getByTitle('Issues count')).toHaveText('25 issues');
```

```java
assertThat(page.getByTitle("Issues count")).hasText("25 issues");
```

```python
await expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

```python
expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

```csharp
await Expect(Page.GetByTitle("Issues count")).toHaveText("25 issues");
```

:::note[When to use title locators]
Use this locator when your element has the `title` attribute.
:::

### Locate by test id

Testing by test ids is the most resilient way of testing as even if your text or role of the attribute changes, the test will still pass. QA's and developers should define explicit test ids and query them with [`method: Page.getByTestId`]. However testing by test ids is not user facing. If the role or text value is important to you then consider using user facing locators such as role and text locators.

For example, consider the following DOM structure.

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
await Page.GetByTestId("directions").ClickAsync();
```

:::note[When to use testid locators]
You can also use test ids when you choose to use the test id methodology or when you can't locate by role or text.
:::

#### Set a custom test id attribute

By default, [`method: Page.getByTestId`] will locate elements based on the `data-testid` attribute, but you can configure it in your test config or by calling [`method: Selectors.setTestIdAttribute`].

Set the test id to use a custom data attribute for your tests.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw'
  }
});
```

```java
playwright.selectors().setTestIdAttribute("data-pw");
```

```python
playwright.selectors.set_test_id_attribute("data-pw")
```

```python
playwright.selectors.set_test_id_attribute("data-pw")
```

```csharp
playwright.Selectors.SetTestIdAttribute("data-pw");
```

In your html you can now use `data-pw` as your test id instead of the default `data-testid`.

```html
<button data-pw="directions">Itinéraire</button>
```

And then locate the element as you would normally do:

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
await Page.GetByTestId("directions").ClickAsync();
```
