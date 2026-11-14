---
title: "Snapshot testing (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/aria-snapshots.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Snapshot testing

import LiteYouTube from '@site/src/components/LiteYouTube';

## Overview

With Playwright's Snapshot testing you can assert the accessibility tree of a page against a predefined snapshot template.

```js
await page.goto('https://playwright.dev/');
await expect(page).toMatchAriaSnapshot(`
  - banner:
    - heading /Playwright enables reliable end-to-end/ [level=1]
    - link "Get started":
      - /url: /docs/intro
    - link "Star microsoft/playwright on GitHub":
      - /url: https://github.com/microsoft/playwright
    - link /[\\d]+k\\+ stargazers on GitHub/
`);
```

```python
page.goto('https://playwright.dev/')
expect(page).to_match_aria_snapshot("""
  - banner:
    - heading /Playwright enables reliable end-to-end/ [level=1]
    - link "Get started":
      - /url: /docs/intro
    - link "Star microsoft/playwright on GitHub":
      - /url: https://github.com/microsoft/playwright
    - link /[\\d]+k\\+ stargazers on GitHub/
""")
```

```python
await page.goto('https://playwright.dev/')
await expect(page).to_match_aria_snapshot("""
  - banner:
    - heading /Playwright enables reliable end-to-end/ [level=1]
    - link "Get started":
      - /url: /docs/intro
    - link "Star microsoft/playwright on GitHub":
      - /url: https://github.com/microsoft/playwright
    - link /[\\d]+k\\+ stargazers on GitHub/
""")
```

```java
page.navigate("https://playwright.dev/");
assertThat(page).matchesAriaSnapshot("""
  - banner:
    - heading /Playwright enables reliable end-to-end/ [level=1]
    - link "Get started":
      - /url: /docs/intro
    - link "Star microsoft/playwright on GitHub":
      - /url: https://github.com/microsoft/playwright
    - link /[\\d]+k\\+ stargazers on GitHub/
""");
```

```csharp
await page.GotoAsync("https://playwright.dev/");
await Expect(page).ToMatchAriaSnapshotAsync(@"
  - banner:
    - heading ""Playwright enables reliable end-to-end testing for modern web apps."" [level=1]
    - link ""Get started"":
      - /url: /docs/intro
    - link ""Star microsoft/playwright on GitHub"":
      - /url: https://github.com/microsoft/playwright
    - link /[\d]+k\+ stargazers on GitHub/
");
```

<LiteYouTube
    id="P4R6hnsE0UY"
    title="Getting started with ARIA Snapshots"
/>

## Assertion testing vs Snapshot testing

Snapshot testing and assertion testing serve different purposes in test automation:

### Assertion testing
Assertion testing is a targeted approach where you assert specific values or conditions about elements or components. For instance, with Playwright, [`method: LocatorAssertions.toHaveText`]
verifies that an element contains the expected text, and [`method: LocatorAssertions.toHaveValue`]
confirms that an input field has the expected value.
Assertion tests are specific and generally check the current state of an element or property
against an expected, predefined state.
They work well for predictable, single-value checks but are limited in scope when testing the
broader structure or variations.

**Advantages**
- **Clarity**: The intent of the test is explicit and easy to understand.
- **Specificity**: Tests focus on particular aspects of functionality, making them more robust
  against unrelated changes.
- **Debugging**: Failures provide targeted feedback, pointing directly to the problematic aspect.

**Disadvantages**
- **Verbose for complex outputs**: Writing assertions for complex data structures or large outputs
  can be cumbersome and error-prone.
- **Maintenance overhead**: As code evolves, manually updating assertions can be time-consuming.

### Snapshot testing
Snapshot testing captures a “snapshot” or representation of the entire
state of an element, component, or data at a given moment, which is then saved for future
comparisons. When re-running tests, the current state is compared to the snapshot, and if there
are differences, the test fails. This approach is especially useful for complex or dynamic
structures, where manually asserting each detail would be too time-consuming. Snapshot testing
is broader and more holistic than assertion testing, allowing you to track more complex changes over time.

**Advantages**
- **Simplifies complex outputs**: For example, testing a UI component's rendered output can be tedious with traditional assertions. Snapshots capture the entire output for easy comparison.
- **Quick Feedback loop**: Developers can easily spot unintended changes in the output.
- **Encourages consistency**: Helps maintain consistent output as code evolves.

**Disadvantages**
- **Over-Reliance**: It can be tempting to accept changes to snapshots without fully understanding
  them, potentially hiding bugs.
- **Granularity**: Large snapshots may be hard to interpret when differences arise, especially
  if minor changes affect large portions of the output.
- **Suitability**: Not ideal for highly dynamic content where outputs change frequently or
  unpredictably.

### When to use

- **Snapshot testing** is ideal for:
  - UI testing of whole pages and components.
  - Broad structural checks for complex UI components.
  - Regression testing for outputs that rarely change structure.

- **Assertion testing** is ideal for:
  - Core logic validation.
  - Computed value testing.
  - Fine-grained tests requiring precise conditions.

By combining snapshot testing for broad, structural checks and assertion testing for specific functionality, you can achieve a well-rounded testing strategy.

## Aria snapshots

In Playwright, aria snapshots provide a YAML representation of the accessibility tree of a page.
These snapshots can be stored and compared later to verify if the page structure remains consistent or meets defined
expectations. A template is a constraint, not necessarily a complete serialization of the accessibility tree.

The YAML format describes the hierarchical structure of accessible elements on the page, detailing **roles**, **attributes**, **values**, and **text content**.
The structure follows a tree-like syntax, where each node represents an accessible element, and indentation indicates
nested elements.

Each accessible element in the tree is represented as a YAML node:

```yaml
- role "name" [attribute=value]
```

- **role**: Specifies the ARIA or HTML role of the element (e.g., `heading`, `list`, `listitem`, `button`).
- **"name"**: Accessible name of the element. Quoted strings indicate exact values, `/patterns/` are used for regular expression.
- **[attribute=value]**: Attributes and values, in square brackets, represent specific ARIA attributes, such
  as `checked`, `disabled`, `expanded`, `invalid`, `level`, `pressed`, or `selected`. Attributes can constrain a
  specific value, such as `[pressed=mixed]`.

These values are derived from ARIA attributes or calculated based on HTML semantics. To inspect the accessibility tree
structure of a page, use the Chrome DevTools Accessibility Tab.

## Snapshot matching

The [`method: PageAssertions.toMatchAriaSnapshot`] assertion method in Playwright compares the accessible
structure of the page with a predefined aria snapshot template, helping validate the page's state against
testing requirements. You can also use [`method: LocatorAssertions.toMatchAriaSnapshot`] to match a specific part of the page.

For the following DOM:

```html
<h1>title</h1>
```

You can match it using the following snapshot template:

```js
await expect(page).toMatchAriaSnapshot(`
  - heading "title"
`);
```

```python
expect(page).to_match_aria_snapshot("""
  - heading "title"
""")
```

```python
await expect(page).to_match_aria_snapshot("""
  - heading "title"
""")
```

```java
assertThat(page).matchesAriaSnapshot("""
  - heading "title"
""");
```

```csharp
await Expect(page).ToMatchAriaSnapshotAsync(@"
  - heading ""title""
");
```

When matching, the snapshot template is compared to the current accessibility tree of the page:

* If the tree structure matches the template, the test passes; otherwise, it fails, indicating a mismatch between
  expected and actual accessibility states.
* The comparison is case-sensitive and normalizes whitespace within names and text values. YAML indentation
  determines nesting.
* The comparison is order-sensitive, meaning the order of elements in the snapshot template must match the order in the
  page's accessibility tree.
* A single-node template can match at any depth within the selected page or locator. Multiple top-level nodes must match
  under the same parent, in order.

### Partial matching

You can perform partial matches on nodes by omitting attributes or accessible names, enabling verification of specific
parts of the accessibility tree without requiring exact matches. This flexibility is helpful for dynamic or irrelevant
attributes.

```html
<button>Submit</button>
```

```yaml
- button
```

In this example, the button role is matched, but the accessible name ("Submit") is not specified, allowing the test to
pass <example-value> of the button's label.

For elements with ARIA attributes like `checked` or `disabled`, omitting these attributes allows partial matching,
focusing solely on role and hierarchy.

```html
<input type="checkbox" checked>
```

```yaml
- checkbox
```

In this partial match, the `checked` attribute is ignored, so the test will pass <example-value> of the checkbox state.

Similarly, you can partially match children in lists or groups by omitting specific list items or nested elements.

```html
<ul>
  <li>Feature A</li>
  <li>Feature B</li>
  <li>Feature C</li>
</ul>
```

```yaml
- list:
  - listitem: Feature B
```

Partial matches let you create flexible snapshot tests that verify essential page structure without enforcing
specific content or attributes.

### Strict matching

By default, a template containing the subset of children will be matched:

```html
<ul>
  <li>Feature A</li>
  <li>Feature B</li>
  <li>Feature C</li>
</ul>
```

```yaml
- list:
  - listitem: Feature B
```

The `/children` property controls children for the node where it appears:
- `contain` (default): Matches if all specified children are present in order.
- `equal`: Matches if direct children exactly match the specified list in order.
- `deep-equal`: Matches if children and nested children exactly match the specified list in order.

With no expected child entries, `contain` allows any children, while `equal` and `deep-equal` require none. Add
`/children: contain` to a nested node to override inherited `deep-equal` matching and allow extra children there.

```html
<ul>
  <li>Feature A</li>
  <li>Feature B</li>
  <li>Feature C</li>
</ul>
```

Following snapshot will fail due to Feature C not being in the template:

```yaml
- list:
  - /children: equal
  - listitem: Feature A
  - listitem: Feature B
```

#### Setting `children` mode globally

Instead of adding a `/children` property to every snapshot, you can set the default children matching mode for all
`toMatchAriaSnapshot` calls in the configuration file:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  expect: {
    toMatchAriaSnapshot: {
      children: 'equal',
    },
  },
});
```

Individual snapshots can still override the global setting by including an explicit `/children` property in the template.

### Matching with regular expressions

Regular expressions allow flexible matching for elements with dynamic or variable text. Accessible names and text can
support regex patterns.

```html
<h1>Issues 12</h1>
```

```yaml
- heading /Issues \d+/
```
