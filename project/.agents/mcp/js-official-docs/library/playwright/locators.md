---
title: "Locators (part 1 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/locators.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

[Locator]s are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent
a way to find element(s) on the page at any moment.

### Quick Guide

These are the recommended built-in locators.

- `method: Page.getByRole` to locate by explicit and implicit accessibility attributes.
- `method: Page.getByText` to locate by text content.
- `method: Page.getByLabel` to locate a form control by associated label's text.
- `method: Page.getByPlaceholder` to locate an input by placeholder.
- `method: Page.getByAltText` to locate an element, usually image, by its text alternative.
- `method: Page.getByTitle` to locate an element by its title attribute.
- `method: Page.getByTestId` to locate an element based on its `data-testid` attribute (other attributes can be configured).

```js
await page.getByLabel('User Name').fill('John');

await page.getByLabel('<example-value>').fill('<example-value>');

await page.getByRole('button', { name: 'Sign in' }).click();

await expect(page.getByText('Welcome, John!')).toBeVisible();
```

```java
page.getByLabel("User Name").fill("John");

page.getByLabel("<example-value>").fill("<example-value>");

page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .click();

assertThat(page.getByText("Welcome, John!")).isVisible();
```

```python
await page.get_by_label("User Name").fill("John")

await page.get_by_label("<example-value>").fill("<example-value>")

await page.get_by_role("button", name="Sign in").click()

await expect(page.get_by_text("Welcome, John!")).to_be_visible()
```

```python
page.get_by_label("User Name").fill("John")

page.get_by_label("<example-value>").fill("<example-value>")

page.get_by_role("button", name="Sign in").click()

expect(page.get_by_text("Welcome, John!")).to_be_visible()
```

```csharp
await Page.GetByLabel("User Name").FillAsync("John");

await Page.GetByLabel("<example-value>").FillAsync("<example-value>");

await Page.GetByRole(AriaRole.Button, new() { Name = "Sign in" }).ClickAsync();

await Expect(Page.GetByText("Welcome, John!")).ToBeVisibleAsync();
```
