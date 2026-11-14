---
title: "class: LocatorAssertions (part 1 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locatorassertions.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: LocatorAssertions
* since: v1.17

The [LocatorAssertions] class provides assertion methods that can be used to make assertions about the [Locator] state in the tests.

```js
import { test, expect } from '@playwright/test';

test('status becomes submitted', async ({ page }) => {
  // ...
  await page.getByRole('button').click();
  await expect(page.locator('.status')).toHaveText('Submitted');
});
```

```java
// ...
import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

public class TestLocator {
  // ...
  @Test
  void statusBecomesSubmitted() {
    // ...
    page.getByRole(AriaRole.BUTTON).click();
    assertThat(page.locator(".status")).hasText("Submitted");
  }
}
```

```python
from playwright.async_api import Page, expect

async def test_status_becomes_submitted(page: Page) -> None:
    # ..
    await page.get_by_role("button").click()
    await expect(page.locator(".status")).to_have_text("Submitted")
```

```python
from playwright.sync_api import Page, expect

def test_status_becomes_submitted(page: Page) -> None:
    # ..
    page.get_by_role("button").click()
    expect(page.locator(".status")).to_have_text("Submitted")
```

```csharp
using Microsoft.Playwright;
using Microsoft.Playwright.MSTest;

namespace PlaywrightTests;

[TestClass]
public class ExampleTests : PageTest
{
    [TestMethod]
    public async Task StatusBecomesSubmitted()
    {
        // ...
        await Page.GetByRole(AriaRole.Button, new() { Name = "Sign In" }).ClickAsync();
        await Expect(Page.Locator(".status")).ToHaveTextAsync("Submitted");
    }
}
```

## property: LocatorAssertions.not
* since: v1.20
* langs: java, js, csharp
- returns: <[LocatorAssertions]>

Makes the assertion check for the opposite condition.

**Usage**

For example, this code tests that the Locator doesn't contain text `"error"`:

```js
await expect(locator).not.toContainText('error');
```

```java
assertThat(locator).not().containsText("error");
```

```csharp
await Expect(locator).Not.ToContainTextAsync("error");
```

## async method: LocatorAssertions.NotToBeAttached
* since: v1.33
* langs: python

The opposite of [`method: LocatorAssertions.toBeAttached`].

### option: LocatorAssertions.NotToBeAttached.attached
* since: v1.33
- `attached` <[boolean]>

### option: LocatorAssertions.NotToBeAttached.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.33

## async method: LocatorAssertions.NotToBeChecked
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeChecked`].

### option: LocatorAssertions.NotToBeChecked.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeDisabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeDisabled`].

### option: LocatorAssertions.NotToBeDisabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEditable
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEditable`].

### option: LocatorAssertions.NotToBeEditable.editable
* since: v1.26
- `editable` <[boolean]>

### option: LocatorAssertions.NotToBeEditable.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEmpty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEmpty`].

### option: LocatorAssertions.NotToBeEmpty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeEnabled
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeEnabled`].

### option: LocatorAssertions.NotToBeEnabled.enabled
* since: v1.26
- `enabled` <[boolean]>

### option: LocatorAssertions.NotToBeEnabled.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeFocused
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeFocused`].

### option: LocatorAssertions.NotToBeFocused.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeHidden
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeHidden`].

### option: LocatorAssertions.NotToBeHidden.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToBeInViewport
* since: v1.31
* langs: python

The opposite of [`method: LocatorAssertions.toBeInViewport`].

### option: LocatorAssertions.NotToBeInViewport.ratio
* since: v1.31
* langs: python
- `ratio` <[float]>

### option: LocatorAssertions.NotToBeInViewport.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.31
* langs: python

## async method: LocatorAssertions.NotToBeVisible
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toBeVisible`].

### option: LocatorAssertions.NotToBeVisible.visible
* since: v1.26
- `visible` <[boolean]>

### option: LocatorAssertions.NotToBeVisible.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToContainClass
* since: v1.52
* langs: python

The opposite of [`method: LocatorAssertions.toContainClass`].

### param: LocatorAssertions.NotToContainClass.expected
* since: v1.52
- `expected` <[string]|[Array]<[string]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.NotToContainClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.52

## async method: LocatorAssertions.NotToContainText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toContainText`].

### param: LocatorAssertions.NotToContainText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected substring or RegExp or a list of those.

### option: LocatorAssertions.NotToContainText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.NotToContainText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToContainText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveAccessibleDescription
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleDescription`].

### param: LocatorAssertions.NotToHaveAccessibleDescription.description
* since: v1.44
- `description` <[string]|[RegExp]>

Expected accessible description.

### option: LocatorAssertions.NotToHaveAccessibleDescription.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveAccessibleDescription.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

## async method: LocatorAssertions.NotToHaveAccessibleErrorMessage
* since: v1.50
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleErrorMessage`].

### param: LocatorAssertions.NotToHaveAccessibleErrorMessage.errorMessage
* since: v1.50
- `errorMessage` <[string]|[RegExp]>

Expected accessible error message.

### option: LocatorAssertions.NotToHaveAccessibleErrorMessage.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.50

### option: LocatorAssertions.NotToHaveAccessibleErrorMessage.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.50

## async method: LocatorAssertions.NotToHaveAccessibleName
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAccessibleName`].

### param: LocatorAssertions.NotToHaveAccessibleName.name
* since: v1.44
- `name` <[string]|[RegExp]>

Expected accessible name.

### option: LocatorAssertions.NotToHaveAccessibleName.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveAccessibleName.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

## async method: LocatorAssertions.NotToHaveAttribute
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveAttribute`].

### param: LocatorAssertions.NotToHaveAttribute.name
* since: v1.18
- `name` <[string]>

Attribute name.

### param: LocatorAssertions.NotToHaveAttribute.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected attribute value.

### param: LocatorAssertions.NotToHaveAttribute.value
* since: v1.62
* langs: python
- `value` ?<[string]|[RegExp]>

Expected attribute value. If not specified, the assertion verifies that the attribute is absent.

### option: LocatorAssertions.NotToHaveAttribute.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.40

### option: LocatorAssertions.NotToHaveAttribute.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveClass
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveClass`].

### param: LocatorAssertions.NotToHaveClass.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected class or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveClass.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCount
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCount`].

### param: LocatorAssertions.NotToHaveCount.count
* since: v1.18
- `count` <[int]>

Expected count.

### option: LocatorAssertions.NotToHaveCount.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveCSS
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveCSS`].

### param: LocatorAssertions.NotToHaveCSS.name
* since: v1.18
- `name` <[string]>

CSS property name.

### param: LocatorAssertions.NotToHaveCSS.value
* since: v1.18
- `value` <[string]|[RegExp]>

CSS property value.

### option: LocatorAssertions.NotToHaveCSS.pseudo
* since: v1.65
- `pseudo` "PseudoElement" <"before"|"after">

Pseudo-element to read computed styles from.

### option: LocatorAssertions.NotToHaveCSS.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveId
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveId`].

### param: LocatorAssertions.NotToHaveId.id
* since: v1.18
- `id` <[string]|[RegExp]>

Element id.

### option: LocatorAssertions.NotToHaveId.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveJSProperty
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveJSProperty`].

### param: LocatorAssertions.NotToHaveJSProperty.name
* since: v1.18
- `name` <[string]>

Property name.

### param: LocatorAssertions.NotToHaveJSProperty.value
* since: v1.18
- `value` <[any]>

Property value.

### option: LocatorAssertions.NotToHaveJSProperty.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveRole
* since: v1.44
* langs: python

The opposite of [`method: LocatorAssertions.toHaveRole`].

### param: LocatorAssertions.NotToHaveRole.role = %%-get-by-role-to-have-role-role-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveRole.timeout = %%-js-assertions-timeout-%%
* since: v1.44

### option: LocatorAssertions.NotToHaveRole.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.44

## async method: LocatorAssertions.NotToHaveText
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveText`].

### param: LocatorAssertions.NotToHaveText.expected
* since: v1.18
- `expected` <[string]|[RegExp]|[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected string or RegExp or a list of those.

### option: LocatorAssertions.NotToHaveText.ignoreCase = %%-assertions-ignore-case-%%
* since: v1.23

### option: LocatorAssertions.NotToHaveText.useInnerText
* since: v1.18
- `useInnerText` <[boolean]>

Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.

### option: LocatorAssertions.NotToHaveText.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValue
* since: v1.20
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValue`].

### param: LocatorAssertions.NotToHaveValue.value
* since: v1.18
- `value` <[string]|[RegExp]>

Expected value.

### option: LocatorAssertions.NotToHaveValue.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.18

## async method: LocatorAssertions.NotToHaveValues
* since: v1.23
* langs: python

The opposite of [`method: LocatorAssertions.toHaveValues`].

### param: LocatorAssertions.NotToHaveValues.values
* since: v1.23
- `values` <[Array]<[string]>|[Array]<[RegExp]>|[Array]<[string]|[RegExp]>>

Expected options currently selected.

### option: LocatorAssertions.NotToHaveValues.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.23

## async method: LocatorAssertions.NotToMatchAriaSnapshot
* since: v1.49
* langs: python

The opposite of [`method: LocatorAssertions.toMatchAriaSnapshot`].

### param: LocatorAssertions.NotToMatchAriaSnapshot.expected
* since: v1.49
- `expected` <string>

### option: LocatorAssertions.NotToMatchAriaSnapshot.timeout = %%-js-assertions-timeout-%%
* since: v1.49

### option: LocatorAssertions.NotToMatchAriaSnapshot.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.49

## async method: LocatorAssertions.toBeAttached
* since: v1.33
* langs:
  - alias-java: isAttached

Ensures that [Locator] points to an element that is connected to a Document or a ShadowRoot.

**Usage**

```js
await expect(page.getByText('Hidden text')).toBeAttached();
```

```java
assertThat(page.getByText("Hidden text")).isAttached();
```

```python
await expect(page.get_by_text("Hidden text")).to_be_attached()
```

```python
expect(page.get_by_text("Hidden text")).to_be_attached()
```

```csharp
await Expect(Page.GetByText("Hidden text")).ToBeAttachedAsync();
```

### option: LocatorAssertions.toBeAttached.attached
* since: v1.33
- `attached` <[boolean]>

### option: LocatorAssertions.toBeAttached.timeout = %%-js-assertions-timeout-%%
* since: v1.33

### option: LocatorAssertions.toBeAttached.signal = %%-js-assertions-signal-%%
* since: v1.62

### option: LocatorAssertions.toBeAttached.timeout = %%-csharp-java-python-assertions-timeout-%%
* since: v1.33
