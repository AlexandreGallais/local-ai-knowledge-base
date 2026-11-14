---
title: "Actions (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/input.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Actions (part 2 of 2)

## Upload files

You can select input files for upload using the [`method: Locator.setInputFiles`] method. It expects first argument to point to an input element with the type `"file"`. Multiple files can be passed in the array. If some of the file paths are relative, they are resolved relative to the current working directory. Empty array clears the selected files.

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

If you don't have input element in hand (it is created dynamically), you can handle the [`event: Page.fileChooser`] event
or use a corresponding waiting method upon your action:

```js
// Start waiting for file chooser before clicking. Note no await.
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByLabel('Upload file').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, 'myfile.pdf'));
```

```java
FileChooser fileChooser = page.waitForFileChooser(() -> {
  page.getByLabel("Upload file").click();
});
fileChooser.setFiles(Paths.get("myfile.pdf"));
```

```python
async with page.expect_file_chooser() as fc_info:
    await page.get_by_label("Upload file").click()
file_chooser = await fc_info.value
await file_chooser.set_files("myfile.pdf")
```

```python
with page.expect_file_chooser() as fc_info:
    page.get_by_label("Upload file").click()
file_chooser = fc_info.value
file_chooser.set_files("myfile.pdf")
```

```csharp
var fileChooser = page.RunAndWaitForFileChooserAsync(async () =>
{
    await page.GetByLabel("Upload file").ClickAsync();
});
await fileChooser.SetFilesAsync("myfile.pdf");
```

## Focus element

For the dynamic pages that handle focus events, you can focus the given element with [`method: Locator.focus`].

```js
await page.getByLabel('<example-value>').focus();
```

```java
page.getByLabel("<example-value>").focus();
```

```python
await page.get_by_label('<example-value>').focus()
```

```python
page.get_by_label('<example-value>').focus()
```

```csharp
await page.GetByLabel("<example-value>").FocusAsync();
```

## Drag and Drop

You can perform drag&drop operation with [`method: Locator.dragTo`]. This method will:
- Hover the element that will be dragged.
- Press left mouse button.
- Move mouse to the element that will receive the drop.
- Release left mouse button.

```js
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));
```

```java
page.locator("#item-to-be-dragged").dragTo(page.locator("#item-to-drop-at"));
```

```python
await page.locator("#item-to-be-dragged").drag_to(page.locator("#item-to-drop-at"))
```

```python
page.locator("#item-to-be-dragged").drag_to(page.locator("#item-to-drop-at"))
```

```csharp
await page.Locator("#item-to-be-dragged").DragToAsync(page.Locator("#item-to-drop-at"));
```

### Dragging manually

If you want precise control over the drag operation, use lower-level methods like [`method: Locator.hover`], [`method: Mouse.down`], [`method: Mouse.move`] and [`method: Mouse.up`].

```js
await page.locator('#item-to-be-dragged').hover();
await page.mouse.down();
await page.locator('#item-to-drop-at').hover();
await page.mouse.up();
```

```java
page.locator("#item-to-be-dragged").hover();
page.mouse().down();
page.locator("#item-to-drop-at").hover();
page.mouse().up();
```

```python
await page.locator("#item-to-be-dragged").hover()
await page.mouse.down()
await page.locator("#item-to-drop-at").hover()
await page.mouse.up()
```

```python
page.locator("#item-to-be-dragged").hover()
page.mouse.down()
page.locator("#item-to-drop-at").hover()
page.mouse.up()
```

```csharp
await page.Locator("#item-to-be-dragged").HoverAsync();
await page.Mouse.DownAsync();
await page.Locator("#item-to-drop-at").HoverAsync();
await page.Mouse.UpAsync();
```

:::note
If your page relies on the `dragover` event being dispatched, you need at least two mouse moves to trigger it in all browsers. To reliably issue the second mouse move, repeat your [`method: Mouse.move`] or [`method: Locator.hover`] twice. The sequence of operations would be: hover the drag element, mouse down, hover the drop element, hover the drop element second time, mouse up.
:::

## Scrolling

Most of the time, Playwright will automatically scroll for you before doing any actions. Therefore, you do not need to scroll explicitly.

```js
// Scrolls automatically so that button is visible
await page.getByRole('button').click();
```

```java
// Scrolls automatically so that button is visible
page.getByRole(AriaRole.BUTTON).click();
```

```python
# Scrolls automatically so that button is visible
await page.get_by_role("button").click()
```

```python
# Scrolls automatically so that button is visible
page.get_by_role("button").click()
```

```csharp
// Scrolls automatically so that button is visible
await page.GetByRole(AriaRole.Button).ClickAsync();
```

However, in rare cases you might need to manually scroll. For example, you might want to force an "infinite list" to load more elements, or position the page for a specific screenshot. In such a case, the most reliable way is to find an element that you want to make visible at the bottom, and scroll it into view.

```js
// Scroll the footer into view, forcing an "infinite list" to load more content
await page.getByText('Footer text').scrollIntoViewIfNeeded();
```

```java
// Scroll the footer into view, forcing an "infinite list" to load more content
page.getByText("Footer text").scrollIntoViewIfNeeded();
```

```python
# Scroll the footer into view, forcing an "infinite list" to load more content
await page.get_by_text("Footer text").scroll_into_view_if_needed()
```

```python
# Scroll the footer into view, forcing an "infinite list" to load more content
page.get_by_text("Footer text").scroll_into_view_if_needed()
```

```csharp
// Scroll the footer into view, forcing an "infinite list" to load more content
await page.GetByText("Footer text").ScrollIntoViewIfNeededAsync();
```

If you would like to control the scrolling more precisely, use [`method: Mouse.wheel`] or [`method: Locator.evaluate`]:

```js
// Position the mouse and scroll with the mouse wheel
await page.getByTestId('scrolling-container').hover();
await page.mouse.wheel(0, 10);

// Alternatively, programmatically scroll a specific element
await page.getByTestId('scrolling-container').evaluate(e => e.scrollTop += 100);
```

```java
// Position the mouse and scroll with the mouse wheel
page.getByTestId("scrolling-container").hover();
page.mouse.wheel(0, 10);

// Alternatively, programmatically scroll a specific element
page.getByTestId("scrolling-container").evaluate("e => e.scrollTop += 100");
```

```python
# Position the mouse and scroll with the mouse wheel
await page.get_by_test_id("scrolling-container").hover()
await page.mouse.wheel(0, 10)

# Alternatively, programmatically scroll a specific element
await page.get_by_test_id("scrolling-container").evaluate("e => e.scrollTop += 100")
```

```python
# Position the mouse and scroll with the mouse wheel
page.get_by_test_id("scrolling-container").hover()
page.mouse.wheel(0, 10)

# Alternatively, programmatically scroll a specific element
page.get_by_test_id("scrolling-container").evaluate("e => e.scrollTop += 100")
```

```csharp
// Position the mouse and scroll with the mouse wheel
await page.GetByTestId("scrolling-container").HoverAsync();
await page.Mouse.WheelAsync(0, 10);

// Alternatively, programmatically scroll a specific element
await page.GetByTestId("scrolling-container").EvaluateAsync("e => e.scrollTop += 100");
```
