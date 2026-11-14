---
title: "Locators (part 4 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Locators (part 4 of 5)

## Locator operators

### Matching inside a locator

You can chain methods that create a locator, like [`method: Page.getByText`] or [`method: Locator.getByRole`], to narrow down the search to a particular part of the page.

In this example we first create a locator called product by locating its role of `listitem`. We then filter by text. We can use the product locator again to get by role of button and click it and then use an assertion to make sure there is only one product with the text "Product 2".

```js
const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });

await product.getByRole('button', { name: 'Add to cart' }).click();

await expect(product).toHaveCount(1);
```

```python
product = page.get_by_role("listitem").filter(has_text="Product 2")

await product.get_by_role("button", name="Add to cart").click()
```

```python
product = page.get_by_role("listitem").filter(has_text="Product 2")

product.get_by_role("button", name="Add to cart").click()
```

```java
Locator product = page
    .getByRole(AriaRole.LISTITEM)
    .filter(new Locator.FilterOptions().setHasText("Product 2"));

product
    .getByRole(AriaRole.BUTTON,
               new Locator.GetByRoleOptions().setName("Add to cart"))
    .click();
```

```csharp
var product = page
    .GetByRole(AriaRole.Listitem)
    .Filter(new() { HasText = "Product 2" });

await product
    .GetByRole(AriaRole.Button, new() { Name = "Add to cart" })
    .ClickAsync();
```

You can also combine two locators with [`method: Locator.within`], for example to find a "Save" button inside a particular dialog:

```js
const saveButton = page.getByRole('button', { name: 'Save' });
// ...
const dialog = page.getByTestId('settings-dialog');
await saveButton.within(dialog).click();
```

```python
save_button = page.get_by_role("button", name="Save")
# ...
dialog = page.get_by_test_id("settings-dialog")
await save_button.within(dialog).click()
```

```python
save_button = page.get_by_role("button", name="Save")
# ...
dialog = page.get_by_test_id("settings-dialog")
save_button.within(dialog).click()
```

```java
Locator saveButton = page.getByRole(AriaRole.BUTTON,
                                    new Page.GetByRoleOptions().setName("Save"));
// ...
Locator dialog = page.getByTestId("settings-dialog");
saveButton.within(dialog).click();
```

```csharp
var saveButton = page.GetByRole(AriaRole.Button, new() { Name = "Save" });
// ...
var dialog = page.GetByTestId("settings-dialog");
await saveButton.Within(dialog).ClickAsync();
```

### Matching two locators simultaneously

Method [`method: Locator.and`] narrows down an existing locator by matching an additional locator. For example, you can combine [`method: Page.getByRole`] and [`method: Page.getByTitle`] to match by both role and title.
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

### Matching one of the two alternative locators

If you'd like to target one of the two or more elements, and you don't know which one it will be, use [`method: Locator.or`] to create a locator that matches any one or both of the alternatives.

For example, consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead. In this case, you can wait for either a "New email" button, or a dialog and act accordingly.

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

### Matching only visible elements

:::note
It's usually better to find a more reliable way to uniquely identify the element instead of checking the visibility.
:::

Consider a page with two buttons, the first invisible and the second visible.

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
  await page.locator('button').visible().click();
  ```
  ```java
  page.locator("button").visible().click();
  ```
  ```python
  await page.locator("button").visible.click()
  ```
  ```python
  page.locator("button").visible.click()
  ```
  ```csharp
  await page.Locator("button").Visible.ClickAsync();
  ```

To match invisible elements instead, use [`method: Locator.filter`] with the [`option: Locator.filter.visible`] option set to `false`.
