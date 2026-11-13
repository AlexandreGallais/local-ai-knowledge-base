---
title: "class: Locator (part 6 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-locator.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Locator (part 6 of 6)

## async method: Locator.setInputFiles
* since: v1.14

Upload file or multiple files into ``.
For inputs with a `[webkitdirectory]` attribute, only a single directory path is supported.

**Usage**

```js
// Select one file
await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));

// Select multiple files
await page.getByLabel('Upload files').setInputFiles([
  path.join(__dirname, 'file1.txt'),
  path.join(__dirname, 'file2.txt'),
]);

// Select a directory
await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir'));

// Remove all the selected files
await page.getByLabel('Upload file').setInputFiles([]);

// Upload buffer from memory
await page.getByLabel('Upload file').setInputFiles({
  name: 'file.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('this is test')
});
```

```java
// Select one file
page.getByLabel("Upload file").setInputFiles(Paths.get("myfile.pdf"));

// Select multiple files
page.getByLabel("Upload files").setInputFiles(new Path[] {Paths.get("file1.txt"), Paths.get("file2.txt")});

// Select a directory
page.getByLabel("Upload directory").setInputFiles(Paths.get("mydir"));

// Remove all the selected files
page.getByLabel("Upload file").setInputFiles(new Path[0]);

// Upload buffer from memory
page.getByLabel("Upload file").setInputFiles(new FilePayload(
  "file.txt", "text/plain", "this is test".getBytes(StandardCharsets.UTF_8)));
```

```python
# Select one file
await page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
await page.get_by_label("Upload files").set_input_files(['file1.txt', 'file2.txt'])

# Select a directory
await page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
await page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
await page.get_by_label("Upload file").set_input_files(
    files=[
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ],
)
```

```python
# Select one file
page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
page.get_by_label("Upload files").set_input_files(['file1.txt', 'file2.txt'])

# Select a directory
page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
page.get_by_label("Upload file").set_input_files(
    files=[
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ],
)
```

```csharp
// Select one file
await page.GetByLabel("Upload file").SetInputFilesAsync("myfile.pdf");

// Select multiple files
await page.GetByLabel("Upload files").SetInputFilesAsync(new[] { "file1.txt", "file12.txt" });

// Select a directory
await page.GetByLabel("Upload directory").SetInputFilesAsync("mydir");

// Remove all the selected files
await page.GetByLabel("Upload file").SetInputFilesAsync(new[] {});

// Upload buffer from memory
await page.GetByLabel("Upload file").SetInputFilesAsync(new FilePayload
{
    Name = "file.txt",
    MimeType = "text/plain",
    Buffer = System.Text.Encoding.UTF8.GetBytes("this is a test"),
});
```

**Details**

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they
are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects [Locator] to point to an
input element. However, if the element is inside the `` element that has an associated control, targets the control instead.

### param: Locator.setInputFiles.files = %%-input-files-%%
* since: v1.14

### option: Locator.setInputFiles.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.setInputFiles.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.setInputFiles.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.tap
* since: v1.14

Perform a tap gesture on the element matching the locator. For examples of emulating other gestures by manually dispatching touch events, see the emulating legacy touch events page.

**Details**

This method taps the element by performing the following steps:
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.touchscreen`] to tap the center of the element, or the specified [`option: position`].

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

:::note
`element.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

### option: Locator.tap.position = %%-input-position-%%
* since: v1.14

### option: Locator.tap.modifiers = %%-input-modifiers-%%
* since: v1.14

### option: Locator.tap.force = %%-input-force-%%
* since: v1.14

### option: Locator.tap.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.tap.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.tap.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.tap.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.tap.trial = %%-input-trial-with-modifiers-%%
* since: v1.14

## async method: Locator.textContent
* since: v1.14
- returns: <[null]|[string]>

Returns the `node.textContent`.

:::warning[Asserting text]
If you need to assert text on the page, prefer [`method: LocatorAssertions.toHaveText`] to avoid flakiness. See assertions guide for more details.
:::

### option: Locator.textContent.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.textContent.timeout = %%-input-timeout-js-%%
* since: v1.14

## method: Locator.toString
* since: v1.57
* langs: js
- returns: <[string]>

Returns a human-readable representation of the locator, using the [`method: Locator.description`] if one exists; otherwise, it generates a string based on the locator's selector.

## async method: Locator.type
* since: v1.14
* deprecated: In most cases, you should use [`method: Locator.fill`] instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [`method: Locator.pressSequentially`].

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`method: Locator.press`].

**Usage**

### param: Locator.type.text
* since: v1.14
- `text` <[string]>

A text to type into a focused element.

### option: Locator.type.delay
* since: v1.14
- `delay` <[float]>

Time to wait between key <example-value> in milliseconds. Defaults to 0.

### option: Locator.type.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.type.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.type.timeout = %%-input-timeout-js-%%
* since: v1.14

## async method: Locator.uncheck
* since: v1.14

Ensure that checkbox or radio element is unchecked.

**Usage**

```js
await page.getByRole('checkbox').uncheck();
```

```java
page.getByRole(AriaRole.CHECKBOX).uncheck();
```

```python
await page.get_by_role("checkbox").uncheck()
```

```python
page.get_by_role("checkbox").uncheck()
```

```csharp
await page.GetByRole(AriaRole.Checkbox).UncheckAsync();
```

**Details**

This method unchecks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already
   unchecked, this method returns immediately.
1. Wait for actionability checks on the element, unless [`option: force`] option is set.
1. Scroll the element into view if needed.
1. Use [`property: Page.mouse`] to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [`option: timeout`], this method throws a
[TimeoutError]. Passing zero timeout disables this.

### option: Locator.uncheck.position = %%-input-position-%%
* since: v1.14

### option: Locator.uncheck.force = %%-input-force-%%
* since: v1.14

### option: Locator.uncheck.scroll = %%-input-scroll-%%
* since: v1.62

### option: Locator.uncheck.noWaitAfter = %%-input-no-wait-after-removed-%%
* since: v1.14

### option: Locator.uncheck.timeout = %%-input-timeout-%%
* since: v1.14

### option: Locator.uncheck.timeout = %%-input-timeout-js-%%
* since: v1.14

### option: Locator.uncheck.trial = %%-input-trial-%%
* since: v1.14

## method: Locator.visible
* since: v1.63
- returns: <[Locator]>

Returns a locator that matches only visible elements, ignoring the invisible ones. This is the recommended way to distinguish elements by visibility, as opposed to the `:visible` CSS pseudo-class.

Note that visibility is checked every time the locator is used, and not at the moment of the [`method: Locator.visible`] call.

**Usage**

Consider a page with two buttons, the first invisible and the second visible.

```html
<button style='display: none'>Invisible</button>
<button>Visible</button>
```

This will only find the second button, because it is visible, and then click it.

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

## async method: Locator.waitFor
* since: v1.16

Returns when element specified by locator satisfies the [`option: state`] option.

If target element already satisfies the condition, the method returns immediately. Otherwise, waits for up to
[`option: timeout`] milliseconds until the condition is met.

**Usage**

```js
const orderSent = page.locator('#order-sent');
await orderSent.waitFor();
```

```java
Locator orderSent = page.locator("#order-sent");
orderSent.waitFor();
```

```python
order_sent = page.locator("#order-sent")
await order_sent.wait_for()
```

```python
order_sent = page.locator("#order-sent")
order_sent.wait_for()
```

```csharp
var orderSent = page.Locator("#order-sent");
orderSent.WaitForAsync();
```

### option: Locator.waitFor.state = %%-wait-for-selector-state-%%
* since: v1.16

### option: Locator.waitFor.timeout = %%-input-timeout-%%
* since: v1.16

### option: Locator.waitFor.timeout = %%-input-timeout-js-%%
* since: v1.16

## async method: Locator.waitForFunction
* since: v1.62

Returns when [`param: expression`] returns a truthy value, called with the matching element as a first argument, and [`param: arg`] as a second argument.

This is a generic way to wait for an element to reach a custom condition without asserting it. The locator is re-resolved on each retry, so it tolerates the element being re-rendered while waiting.

If [`param: expression`] returns a [Promise], this method will wait for the promise to resolve before checking its value.

If [`param: expression`] throws or rejects, this method throws.

**Usage**

Wait for an attribute to appear:

```js
const toggle = page.getByRole('button', { name: 'Menu' });
await toggle.click();
await toggle.waitForFunction(element => element.hasAttribute('aria-expanded'));
```

Passing argument to [`param: expression`]:

```js
await page.getByTestId('status').waitForFunction((element, value) => {
  return element.textContent === value;
}, 'Ready');
```

### param: Locator.waitForFunction.expression = %%-evaluate-expression-%%
* since: v1.62

### param: Locator.waitForFunction.expression = %%-js-evaluate-pagefunction-%%
* since: v1.62

### param: Locator.waitForFunction.arg
* since: v1.62
* langs: js, java, csharp
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.waitForFunction.arg
* since: v1.62
* langs: python
- `arg` ?<[EvaluationArgument]>

Optional argument to pass to [`param: expression`].

### option: Locator.waitForFunction.timeout = %%-wait-for-function-timeout-%%
* since: v1.62

### option: Locator.waitForFunction.timeout = %%-wait-for-function-timeout-js-%%
* since: v1.62

### option: Locator.waitForFunction.signal = %%-input-signal-%%
* since: v1.62

## method: Locator.within
* since: v1.64
- returns: <[Locator]>

Returns a locator that matches this locator's elements inside each element matched by [`param: locator`].

Note that relative locators, such as [`method: Locator.nth`] or [`method: Locator.first`], are resolved separately inside each matched parent. In the example below, `page.getByRole('cell').nth(2)` picks the third cell of every row, not the third cell in the whole table.

**Usage**

```js
const thirdColumn = page.getByRole('cell').nth(2).within(page.getByRole('row'));
await expect(thirdColumn).toHaveText(['Apple', 'Banana', 'Cherry']);
```

```python
third_column = page.get_by_role("cell").nth(2).within(page.get_by_role("row"))
await expect(third_column).to_have_text(["Apple", "Banana", "Cherry"])
```

```python
third_column = page.get_by_role("cell").nth(2).within(page.get_by_role("row"))
expect(third_column).to_have_text(["Apple", "Banana", "Cherry"])
```

```java
Locator thirdColumn = page.getByRole(AriaRole.CELL).nth(2).within(page.getByRole(AriaRole.ROW));
assertThat(thirdColumn).hasText(new String[] {"Apple", "Banana", "Cherry"});
```

```csharp
var thirdColumn = page.GetByRole(AriaRole.Cell).Nth(2).Within(page.GetByRole(AriaRole.Row));
await Expect(thirdColumn).ToHaveTextAsync(new[] { "Apple", "Banana", "Cherry" });
```

### param: Locator.within.locator
* since: v1.64
- `locator` <[Locator]>

Locator matching the parent elements to search within.
