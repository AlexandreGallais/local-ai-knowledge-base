---
title: "Snapshot testing (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/aria-snapshots.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Snapshot testing (part 2 of 2)

## Generating snapshots

Creating aria snapshots in Playwright helps ensure and maintain your application's structure.
You can generate snapshots in various ways depending on your testing setup and workflow.

### Generating snapshots with the Playwright code generator

If you're using Playwright's Code Generator, generating aria snapshots is streamlined with its
interactive interface:

- **"Assert snapshot" Action**: In the code generator, you can use the "Assert snapshot" action to automatically create
a snapshot assertion for the selected elements. This is a quick way to capture the aria snapshot as part of your
recorded test flow.

- **"Aria snapshot" Tab**: The "Aria snapshot" tab within the code generator interface visually represents the
aria snapshot for a selected locator, letting you explore, inspect, and verify element roles, attributes, and
accessible names to aid snapshot creation and review.

### Updating snapshots with `@playwright/test` and the `--update-snapshots` flag
* langs: js

When using the Playwright test runner (`@playwright/test`), you can automatically update snapshots with the `--update-snapshots` flag, `-u` for short.

Running without the flag uses `default` mode: absent snapshots are generated, but the tests that generate them fail,
so that a run with new snapshots does not silently pass. Use `missing` to generate absent snapshots and keep those
tests passing. Supplying `-u` uses `changed` mode and updates snapshots that do not match. Use `all` to regenerate
every snapshot, including matching ones, or `none` to prevent snapshot updates.

```bash
npx playwright test --update-snapshots
```

Updating snapshots is useful when application structure changes require new snapshots as a baseline. Playwright retries
the assertion until its expect timeout expires. Adjust `--timeout` if snapshot generation takes longer than the test
timeout.

#### Empty template for snapshot generation

Passing an empty string as the template in an assertion generates a snapshot on-the-fly:

```js
await expect(locator).toMatchAriaSnapshot('');
```

This works without `-u` because the default mode generates missing snapshots.

#### Snapshot patch files

For inline snapshot templates, Playwright creates patch files that capture differences. These patch files can be
reviewed and applied. Separate `.aria.yml` snapshots are written directly to their configured snapshot path.

The way source code is updated can be changed using the `--update-source-method` flag. There are several options available:

- **"patch"** (default): Generates a unified diff file that can be applied to the source code using `git apply`.
- **"3way"**: Generates merge conflict markers in your source code, allowing you to choose whether to accept changes.
- **"overwrite"**: Overwrites the source code with the new snapshot values.

```bash
npx playwright test --update-snapshots --update-source-method=3way
```

#### Snapshots as separate files

To store your snapshots in a separate file, use the `toMatchAriaSnapshot` method with the `name` option, specifying a `.aria.yml` file extension.

```js
await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'main.aria.yml' });
```

By default, snapshots from a test file `example.spec.ts` are placed in the `example.spec.ts-snapshots` directory. As snapshots should be the same across browsers, only one snapshot is saved even if testing with multiple browsers. Should you wish, you can customize the snapshot path template using the following configuration:

```js
export default defineConfig({
  expect: {
    toMatchAriaSnapshot: {
      pathTemplate: '__snapshots__/{testFilePath}/{arg}{ext}',
    },
  },
});
```

### Using [`method: Page.ariaSnapshot`] and [`method: Locator.ariaSnapshot`]

Methods [`method: Page.ariaSnapshot`] and [`method: Locator.ariaSnapshot`] allow you to programmatically create a YAML representation of accessible
elements within a locator's scope, especially helpful for generating snapshots dynamically during test execution.

**Example**:

```js
const snapshot = await page.ariaSnapshot();
console.log(snapshot);
```

```python
snapshot = page.aria_snapshot()
print(snapshot)
```

```python
snapshot = await page.aria_snapshot()
print(snapshot)
```

```java
String snapshot = page.ariaSnapshot();
System.out.println(snapshot);
```

```csharp
var snapshot = await page.AriaSnapshotAsync();
Console.WriteLine(snapshot);
```

This command outputs the aria snapshot within the specified locator's scope in YAML format, which you can validate
or store as needed.

## Accessibility tree examples

### Headings with level attributes

Headings can include a `level` attribute indicating their heading level.

```html
<h1>Title</h1>
<h2>Subtitle</h2>
```

```yaml
- heading "Title" [level=1]
- heading "Subtitle" [level=2]
```

### Text nodes

Standalone or descriptive text elements appear as text nodes.

```html
<div>Sample accessible name</div>
```

```yaml
- text: Sample accessible name
```

### Inline multiline text

Multiline text, such as paragraphs, is normalized in the aria snapshot.

```html
<p>Line 1<br>Line 2</p>
```

```yaml
- paragraph: Line 1 Line 2
```

### Links

Links display their text or composed content from pseudo-elements. The link’s destination may be matched using the
`/url` property.

```html
<a href="#more-info">Read more about Accessibility</a>
```

```yaml
- link "Read more about Accessibility":
    - /url: "#more-info"
```

The value of `/url` may also be a regular expression:

```html
<a href="https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg">YouTube channel</a>
```

```yaml
- link:
  - /url: /https://www.youtube.com/channel/.*/
```

### Text boxes

Input elements of type `text` show their `value` attribute content.

```html
<input type="text" value="Enter your name">
```

```yaml
- textbox: Enter your name
```

### Lists with items

Ordered and unordered lists include their list items.

```html
<ul aria-label="Main Features">
  <li>Feature 1</li>
  <li>Feature 2</li>
</ul>
```

```yaml
- list "Main Features":
  - listitem: Feature 1
  - listitem: Feature 2
```

### Grouped elements

Groups capture nested elements, such as `` elements with summary content.

```html
<details>
  <summary>Summary</summary>
  <p>Detail content here</p>
</details>
```

```yaml
- group: Summary
```

### Attributes and states

Commonly used ARIA attributes, like `checked`, `disabled`, `expanded`, `invalid`, `level`, `pressed`, and `selected`, represent
control states.

#### Checkbox with `checked` attribute

```html
<input type="checkbox" checked>
```

```yaml
- checkbox [checked]
```

#### Button with `pressed` attribute

```html
<button aria-pressed="true">Toggle</button>
```

```yaml
- button "Toggle" [pressed=true]
```

#### Input with `aria-invalid` attribute

The `aria-invalid` value is surfaced directly. A value of `true` renders as `[invalid]`, while `grammar`
and `spelling` render as `[invalid=grammar]` and `[invalid=spelling]`. A `false` value is omitted.

```html
<input type="text" aria-label="Email" aria-invalid="true" value="not-an-email">
```

```yaml
- textbox "Email" [invalid]: not-an-email
```

```html
<input type="text" aria-label="Bio" aria-invalid="spelling">
```

```yaml
- textbox "Bio" [invalid=spelling]
```
