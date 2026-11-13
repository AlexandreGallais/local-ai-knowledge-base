---
title: "Locators (part 3 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Locators (part 3 of 5)

### Locate by CSS or XPath

If you absolutely must use CSS or XPath locators, you can use [`method: Page.locator`] to create a locator that takes a selector describing how to find an element in the page. Playwright supports CSS and XPath selectors, and auto-detects them if you omit `css=` or `xpath=` prefix.

```js
await page.locator('css=button').click();
await page.locator('xpath=//button').click();

await page.locator('button').click();
await page.locator('//button').click();
```

```java
page.locator("css=button").click();
page.locator("xpath=//button").click();

page.locator("button").click();
page.locator("//button").click();
```

```python
await page.locator("css=button").click()
await page.locator("xpath=//button").click()

await page.locator("button").click()
await page.locator("//button").click()
```

```python
page.locator("css=button").click()
page.locator("xpath=//button").click()

page.locator("button").click()
page.locator("//button").click()
```

```csharp
await Page.Locator("css=button").ClickAsync();
await Page.Locator("xpath=//button").ClickAsync();

await Page.Locator("button").ClickAsync();
await Page.Locator("//button").ClickAsync();
```

XPath and CSS selectors can be tied to the DOM structure or implementation. These selectors can break when the DOM structure changes. Long CSS or XPath chains below are an example of a **bad practice** that leads to unstable tests:

```js
await page.locator(
    '#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input'
).click();

await page
    .locator('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input')
    .click();
```

```java
page.locator(
    "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
).click();

page.locator("//*[@id='tsf']/div[2]/div[1]/div[1]/div/div[2]/input").click();
```

```python
await page.locator(
    "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
).click()

await page.locator('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input').click()
```

```python
page.locator(
    "#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input"
).click()

page.locator('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input').click()
```

```csharp
await Page.Locator("#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input").ClickAsync();

await Page.Locator("//*[@id='tsf']/div[2]/div[1]/div[1]/div/div[2]/input").ClickAsync();
```

:::note[When to use this]
CSS and XPath are not recommended as the DOM can often change leading to non resilient tests. Instead, try to come up with a locator that is close to how the user perceives the page such as role locators or define an explicit testing contract using test ids.
:::

## Locate in Shadow DOM

All locators in Playwright **by default** work with elements in Shadow DOM. The exceptions are:
- Locating by XPath does not pierce shadow roots.
- Closed-mode shadow roots are not supported.

Consider the following example with a custom web component:

```html
<x-details role=button aria-expanded=true aria-controls=inner-details>
  <div>Title</div>
  #shadow-root
    <div id=inner-details>Details</div>
</x-details>
```

You can locate in the same way as if the shadow root was not present at all.

To click `Details`:

```js
await page.getByText('Details').click();
```
```java
page.getByText("Details").click();
```
```python
await page.get_by_text("Details").click()
```
```python
page.get_by_text("Details").click()
```
```csharp
await page.GetByText("Details").ClickAsync();
```

```html
<x-details role=button aria-expanded=true aria-controls=inner-details>
  <div>Title</div>
  #shadow-root
    <div id=inner-details>Details</div>
</x-details>
```

To click `<x-details>`:

```js
await page.locator('x-details', { hasText: 'Details' }).click();
```
```java
page.locator("x-details", new Page.LocatorOptions().setHasText("Details"))
    .click();
```
```python
await page.locator("x-details", has_text="Details").click()
```
```python
page.locator("x-details", has_text="Details").click()
```
```csharp
await page
    .Locator("x-details", new() { HasText = "Details" })
    .ClickAsync();
```

```html
<x-details role=button aria-expanded=true aria-controls=inner-details>
  <div>Title</div>
  #shadow-root
    <div id=inner-details>Details</div>
</x-details>
```

To ensure that `<x-details>` contains the text "Details":
```js
await expect(page.locator('x-details')).toContainText('Details');
```
```java
assertThat(page.locator("x-details")).containsText("Details");
```
```python
await expect(page.locator("x-details")).to_contain_text("Details")
```
```python
expect(page.locator("x-details")).to_contain_text("Details")
```
```csharp
await Expect(Page.Locator("x-details")).ToContainTextAsync("Details");
```
## Filtering Locators

Consider the following DOM structure where we want to click on the buy button of the second product card. We have a few options in order to filter the locators to get the right one.

```html
<ul>
  <li>
    <h3>Product 1</h3>
    <button>Add to cart</button>
  </li>
  <li>
    <h3>Product 2</h3>
    <button>Add to cart</button>
  </li>
</ul>
```

### Filter by text

Locators can be filtered by text with the [`method: Locator.filter`] method. It will search for a particular string somewhere inside the element, possibly in a descendant element, case-insensitively. You can also pass a regular expression.

```js
await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

```java
page.getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions().setHasText("Product 2"))
    .getByRole(AriaRole.BUTTON,
               new Locator.GetByRoleOptions().setName("Add to cart"))
    .click();
```

```python
await page.get_by_role("listitem").filter(has_text="Product 2").get_by_role(
    "button", name="Add to cart"
).click()
```

```python
page.get_by_role("listitem").filter(has_text="Product 2").get_by_role(
    "button", name="Add to cart"
).click()
```

```csharp
await page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() { HasText = "Product 2" })
    .GetByRole(AriaRole.Button, new() { Name = "Add to cart" })
    .ClickAsync();
```

Use a regular expression:

```js
await page
    .getByRole('listitem')
    .filter({ hasText: /Product 2/ })
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

```java
page.getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions()
        .setHasText(Pattern.compile("Product 2")))
    .getByRole(AriaRole.BUTTON,
               new Locator.GetByRoleOptions().setName("Add to cart"))
    .click();
```

```python
await page.get_by_role("listitem").filter(has_text=re.compile("Product 2")).get_by_role(
    "button", name="Add to cart"
).click()
```

```python
page.get_by_role("listitem").filter(has_text=re.compile("Product 2")).get_by_role(
    "button", name="Add to cart"
).click()
```

```csharp
await page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() { HasTextRegex = new Regex("Product 2") })
    .GetByRole(AriaRole.Button, new() { Name = "Add to cart" })
    .ClickAsync();
```

### Filter by not having text

Alternatively, filter by **not having** text:

```js
// 5 in-stock items
await expect(page.getByRole('listitem').filter({ hasNotText: 'Out of stock' })).toHaveCount(5);
```

```java
// 5 in-stock items
assertThat(page.getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions().setHasNotText("Out of stock")))
    .hasCount(5);
```

```python
# 5 in-stock items
await expect(page.get_by_role("listitem").filter(has_not_text="Out of stock")).to_have_count(5)
```

```python
# 5 in-stock items
expect(page.get_by_role("listitem").filter(has_not_text="Out of stock")).to_have_count(5)
```

```csharp
// 5 in-stock items
await Expect(Page.GetByRole(AriaRole.Listitem).Filter(new() { HasNotText = "Out of stock" }))
    .ToHaveCountAsync(5);
```

### Filter by child/descendant

Locators support an option to only select elements that have or have not a descendant matching another locator. You can therefore filter by any other locator such as a [`method: Locator.getByRole`], [`method: Locator.getByTestId`], [`method: Locator.getByText`] etc.

```html
<ul>
  <li>
    <h3>Product 1</h3>
    <button>Add to cart</button>
  </li>
  <li>
    <h3>Product 2</h3>
    <button>Add to cart</button>
  </li>
</ul>
```

```js
await page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: 'Product 2' }) })
    .getByRole('button', { name: 'Add to cart' })
    .click();
```

```java
page.getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions()
        .setHas(page.getByRole(AriaRole.HEADING, new Page.GetByRoleOptions()
        .setName("Product 2"))))
    .getByRole(AriaRole.BUTTON,
               new Locator.GetByRoleOptions().setName("Add to cart"))
    .click();
```

```python
await page.get_by_role("listitem").filter(
    has=page.get_by_role("heading", name="Product 2")
).get_by_role("button", name="Add to cart").click()
```

```python
page.get_by_role("listitem").filter(
    has=page.get_by_role("heading", name="Product 2")
).get_by_role("button", name="Add to cart").click()
```

```csharp
await page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Heading, new() {
            Name = "Product 2"
        })
    })
    .GetByRole(AriaRole.Button, new() { Name = "Add to cart" })
    .ClickAsync();
```

We can also assert the product card to make sure there is only one:

```js
await expect(page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: 'Product 2' }) }))
    .toHaveCount(1);
```

```java
assertThat(page
    .getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions()
        .setHas(page.getByRole(AriaRole.HEADING,
                               new Page.GetByRoleOptions().setName("Product 2")))))
    .hasCount(1);
```

```python
await expect(
    page.get_by_role("listitem").filter(
        has=page.get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```python
expect(
    page.get_by_role("listitem").filter(
        has=page.get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```csharp
await Expect(Page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Heading, new() { Name = "Product 2" })
    }))
    .ToHaveCountAsync(1);
```

The filtering locator **must be relative** to the original locator and is queried starting with the original locator match, not the document root. Therefore, the following will not work, because the filtering locator starts matching from the `` list element that is outside of the `` list item matched by the original locator:

```js
// ✖ WRONG
await expect(page
    .getByRole('listitem')
    .filter({ has: page.getByRole('list').getByText('Product 2') }))
    .toHaveCount(1);
```

```java
// ✖ WRONG
assertThat(page
    .getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions()
        .setHas(page.getByRole(AriaRole.LIST)
                    .getByRole(AriaRole.HEADING,
                               new Locator.GetByRoleOptions().setName("Product 2")))))
    .hasCount(1);
```

```python
# ✖ WRONG
await expect(
    page.get_by_role("listitem").filter(
        has=page.get_by_role("list").get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```python
# ✖ WRONG
expect(
    page.get_by_role("listitem").filter(
        has=page.get_by_role("list").get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```csharp
// ✖ WRONG
await Expect(Page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() {
        Has = page.GetByRole(AriaRole.List).GetByRole(AriaRole.Heading, new() { Name = "Product 2" })
    }))
    .ToHaveCountAsync(1);
```

### Filter by not having child/descendant

We can also filter by **not having** a matching element inside.

```js
await expect(page
    .getByRole('listitem')
    .filter({ hasNot: page.getByText('Product 2') }))
    .toHaveCount(1);
```

```java
assertThat(page
    .getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions().setHasNot(page.getByText("Product 2"))))
    .hasCount(1);
```

```python
await expect(
    page.get_by_role("listitem").filter(
        has_not=page.get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```python
expect(
    page.get_by_role("listitem").filter(
        has_not=page.get_by_role("heading", name="Product 2")
    )
).to_have_count(1)
```

```csharp
await Expect(Page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() {
        HasNot = page.GetByRole(AriaRole.Heading, new() { Name = "Product 2" })
    }))
    .ToHaveCountAsync(1);
```

Note that the inner locator is matched starting from the outer one, not from the document root.
