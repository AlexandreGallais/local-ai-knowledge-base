---
title: "Locators (part 5 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Locators (part 5 of 5)

## Lists

### Count items in a list

You can assert locators in order to count the items in a list.

For example, consider the following DOM structure:

```html
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

Use the count assertion to ensure that the list has 3 items.

```js
await expect(page.getByRole('listitem')).toHaveCount(3);
```

```python
await expect(page.get_by_role("listitem")).to_have_count(3)
```

```python
expect(page.get_by_role("listitem")).to_have_count(3)
```

```java
assertThat(page.getByRole(AriaRole.LISTITEM)).hasCount(3);
```

```csharp
await Expect(Page.GetByRole(AriaRole.Listitem)).ToHaveCountAsync(3);
```

### Assert all text in a list

You can assert locators in order to find all the text in a list.

For example, consider the following DOM structure:

```html
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

Use [`method: LocatorAssertions.toHaveText`] to ensure that the list has the text "apple", "banana" and "orange".

```js
await expect(page
    .getByRole('listitem'))
    .toHaveText(['apple', 'banana', 'orange']);
```

```python
await expect(page.get_by_role("listitem")).to_have_text(["apple", "banana", "orange"])
```

```python
expect(page.get_by_role("listitem")).to_have_text(["apple", "banana", "orange"])
```

```java
assertThat(page
    .getByRole(AriaRole.LISTITEM))
    .hasText(new String[] { "apple", "banana", "orange" });
```

```csharp
await Expect(Page
    .GetByRole(AriaRole.Listitem))
    .ToHaveTextAsync(new string[] {"apple", "banana", "orange"});
```

### Get a specific item

There are many ways to get a specific item in a list.
#### Get by text

Use the [`method: Page.getByText`] method to locate an element in a list by its text content and then click on it.

For example, consider the following DOM structure:

```html
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

Locate an item by its text content and click it.

```js
await page.getByText('orange').click();
```

```python
await page.get_by_text("orange").click()
```

```python
page.get_by_text("orange").click()
```

```java
page.getByText("orange").click();
```

```csharp
await page.GetByText("orange").ClickAsync();
```

#### Filter by text
Use the [`method: Locator.filter`] to locate a specific item in a list.

For example, consider the following DOM structure:

```html
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

Locate an item by the role of "listitem" and then filter by the text of "orange" and then click it.

```js
await page
    .getByRole('listitem')
    .filter({ hasText: 'orange' })
    .click();
```

```python
await page.get_by_role("listitem").filter(has_text="orange").click()
```

```python
page.get_by_role("listitem").filter(has_text="orange").click()
```

```java
page.getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions().setHasText("orange"))
    .click();
```

```csharp
await page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() { HasText = "orange" })
    .ClickAsync();
```

#### Get by test id

Use the [`method: Page.getByTestId`] method to locate an element in a list. You may need to modify the html and add a test id if you don't already have a test id.

For example, consider the following DOM structure:

```html
<ul>
  <li data-testid='apple'>apple</li>
  <li data-testid='banana'>banana</li>
  <li data-testid='orange'>orange</li>
</ul>
```

Locate an item by its test id of "orange" and then click it.

```js
await page.getByTestId('orange').click();
```

```python
await page.get_by_test_id("orange").click()
```

```python
page.get_by_test_id("orange").click()
```

```java
page.getByTestId("orange").click();
```

```csharp
await page.GetByTestId("orange").ClickAsync();
```

#### Get by nth item

If you have a list of identical elements, and the only way to distinguish between them is the order, you can choose a specific element from a list with [`method: Locator.first`], [`method: Locator.last`] or [`method: Locator.nth`].

```js
const banana = await page.getByRole('listitem').nth(1);
```

```python
banana = await page.get_by_role("listitem").nth(1)
```

```python
banana = page.get_by_role("listitem").nth(1)
```

```java
Locator banana = page.getByRole(AriaRole.LISTITEM).nth(1);
```

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Nth(1);
```
However, use this method with caution. Often times, the page might change, and the locator will point to a completely different element from the one you expected. Instead, try to come up with a unique locator that will pass the strictness criteria.

### Chaining filters

When you have elements with various similarities, you can use the [`method: Locator.filter`] method to select the right one. You can also chain multiple filters to narrow down the selection.

For example, consider the following DOM structure:

```html
<ul>
  <li>
    <div>John</div>
    <div><button>Say hello</button></div>
  </li>
  <li>
    <div>Mary</div>
    <div><button>Say hello</button></div>
  </li>
  <li>
    <div>John</div>
    <div><button>Say goodbye</button></div>
  </li>
  <li>
    <div>Mary</div>
    <div><button>Say goodbye</button></div>
  </li>
</ul>
```

To take a screenshot of the row with "Mary" and "Say goodbye":

```js
const rowLocator = page.getByRole('listitem');

await rowLocator
    .filter({ hasText: 'Mary' })
    .filter({ has: page.getByRole('button', { name: 'Say goodbye' }) })
    .screenshot({ path: 'screenshot.png' });
```

```python
row_locator = page.get_by_role("listitem")

await row_locator.filter(has_text="Mary").filter(
    has=page.get_by_role("button", name="Say goodbye")
).screenshot(path="screenshot.png")
```

```python
row_locator = page.get_by_role("listitem")

row_locator.filter(has_text="Mary").filter(
    has=page.get_by_role("button", name="Say goodbye")
).screenshot(path="screenshot.png")
```

```java
Locator rowLocator = page.getByRole(AriaRole.LISTITEM);

rowLocator
    .filter(new Locator.FilterOptions().setHasText("Mary"))
    .filter(new Locator.FilterOptions()
        .setHas(page.getByRole(
            AriaRole.BUTTON,
            new Page.GetByRoleOptions().setName("Say goodbye"))))
    .screenshot(new Locator.ScreenshotOptions().setPath(Paths.get("screenshot.png")));
```

```csharp
var rowLocator = page.GetByRole(AriaRole.Listitem);

await rowLocator
    .Filter(new() { HasText = "Mary" })
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Button, new() { Name = "Say goodbye" })
    })
    .ScreenshotAsync(new() { Path = "screenshot.png" });
```

You should now have a "screenshot.png" file in your project's root directory.

### Rare use cases

#### Do something with each element in the list

Iterate elements:

```js
for (const row of await page.getByRole('listitem').all())
  console.log(await row.textContent());
```

```python
for row in await page.get_by_role("listitem").all():
    print(await row.text_content())
```

```python
for row in page.get_by_role("listitem").all():
    print(row.text_content())
```

```java
for (Locator row : page.getByRole(AriaRole.LISTITEM).all())
  System.out.println(row.textContent());
```

```csharp
foreach (var row in await page.GetByRole(AriaRole.Listitem).AllAsync())
  Console.WriteLine(await row.TextContentAsync());
```

Iterate using regular for loop:

```js
const rows = page.getByRole('listitem');
const count = await rows.count();
for (let i = 0; i < count; ++i)
  console.log(await rows.nth(i).textContent());
```

```python
rows = page.get_by_role("listitem")
count = await rows.count()
for i in range(count):
    print(await rows.nth(i).text_content())
```

```python
rows = page.get_by_role("listitem")
count = rows.count()
for i in range(count):
    print(rows.nth(i).text_content())
```

```java
Locator rows = page.getByRole(AriaRole.LISTITEM);
int count = rows.count();
for (int i = 0; i < count; ++i)
  System.out.println(rows.nth(i).textContent());
```

```csharp
var rows = page.GetByRole(AriaRole.Listitem);
var count = await rows.CountAsync();
for (int i = 0; i < count; ++i)
  Console.WriteLine(await rows.Nth(i).TextContentAsync());
```

#### Evaluate in the page

The code inside [`method: Locator.evaluateAll`] runs in the page, you can call any DOM apis there.

```js
const rows = page.getByRole('listitem');
const texts = await rows.evaluateAll(
    list => list.map(element => element.textContent));
```

```python
rows = page.get_by_role("listitem")
texts = await rows.evaluate_all("list => list.map(element => element.textContent)")
```

```python
rows = page.get_by_role("listitem")
texts = rows.evaluate_all("list => list.map(element => element.textContent)")
```

```java
Locator rows = page.getByRole(AriaRole.LISTITEM);
Object texts = rows.evaluateAll(
    "list => list.map(element => element.textContent)");
```
```csharp
var rows = page.GetByRole(AriaRole.Listitem);
var texts = await rows.EvaluateAllAsync(
    "list => list.map(element => element.textContent)");
```
## Strictness

Locators are strict. This means that all operations on locators that imply
some target DOM element will throw an exception if more than one element matches. For example, the following call throws if there are several buttons in the DOM:

#### Throws an error if more than one
```js
await page.getByRole('button').click();
```

```python
await page.get_by_role("button").click()
```

```python
page.get_by_role("button").click()
```

```java
page.getByRole(AriaRole.BUTTON).click();
```

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync();
```

On the other hand, Playwright understands when you perform a multiple-element operation,
so the following call works perfectly fine when the locator resolves to multiple elements.

#### Works fine with multiple elements

```js
await page.getByRole('button').count();
```

```python
await page.get_by_role("button").count()
```

```python
page.get_by_role("button").count()
```

```java
page.getByRole(AriaRole.BUTTON).count();
```

```csharp
await page.GetByRole(AriaRole.Button).CountAsync();
```

You can explicitly opt-out from strictness check by telling Playwright which element to use when multiple elements match, through [`method: Locator.first`], [`method: Locator.last`], and [`method: Locator.nth`]. These methods are **not recommended** because when your page changes, Playwright may click on an element you did not intend. Instead, follow best practices above to create a locator that uniquely identifies the target element.

## More Locators

For less commonly used locators, look at the other locators guide.
