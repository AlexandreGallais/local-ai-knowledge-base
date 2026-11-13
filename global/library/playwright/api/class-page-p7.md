---
title: "class: Page (part 7 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 7 of 14)

## method: Page.onceDialog
* since: v1.10
* langs: java

Adds one-off [Dialog] handler. The handler will be removed immediately after next [Dialog] is created.
```java
page.onceDialog(dialog -> {
  dialog.accept("foo");
});

// prints 'foo'
System.out.println(page.evaluate("prompt('Enter string:')"));

// prints 'null' as the dialog will be auto-dismissed because there are no handlers.
System.out.println(page.evaluate("prompt('Enter string:')"));
```

This code above is equivalent to:
```java
Consumer<Dialog> handler = new Consumer<Dialog>() {
  @Override
  public void accept(Dialog dialog) {
    dialog.accept("foo");
    page.offDialog(this);
  }
};
page.onDialog(handler);

// prints 'foo'
System.out.println(page.evaluate("prompt('Enter string:')"));

// prints 'null' as the dialog will be auto-dismissed because there are no handlers.
System.out.println(page.evaluate("prompt('Enter string:')"));
```

### param: Page.onceDialog.handler
* since: v1.10
- `handler` <[function]\([Dialog]\)>

Receives the [Dialog] object, it **must** either [`method: Dialog.accept`] or [`method: Dialog.dismiss`] the dialog - otherwise
the page will freeze waiting for the dialog,
and actions like click will never finish.

## async method: Page.opener
* since: v1.8
- returns: <[null]|[Page]>

Returns the opener for popup pages and `null` for others. If the opener has been closed already the returns `null`.

## async method: Page.pause
* since: v1.9

Pauses script execution. Playwright will stop executing the script and wait for the user to either press the 'Resume'
button in the page overlay or to call `playwright.resume()` in the DevTools console.

User can inspect selectors or perform manual steps while paused. Resume will continue running the original script from
the place it was paused.

:::note
This method requires Playwright to be started in a headed mode, with a falsy [`option: BrowserType.launch.headless`] option.
:::

## async method: Page.pdf
* since: v1.8
- returns: <[Buffer]>

Returns the PDF buffer.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call
[`method: Page.emulateMedia`] before calling `page.pdf()`:

:::note
By default, `page.pdf()` generates a pdf with modified colors for printing. Use the
`-webkit-print-color-adjust` property to
force rendering of exact colors.
:::

**Usage**

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia({ media: 'screen' });
await page.pdf({ path: 'page.pdf' });
```

```java
// Generates a PDF with "screen" media type.
page.emulateMedia(new Page.EmulateMediaOptions().setMedia(Media.SCREEN));
page.pdf(new Page.PdfOptions().setPath(Paths.get("page.pdf")));
```

```python
# generates a pdf with "screen" media type.
await page.emulate_media(media="screen")
await page.pdf(path="page.pdf")
```

```python
# generates a pdf with "screen" media type.
page.emulate_media(media="screen")
page.pdf(path="page.pdf")
```

```csharp
// Generates a PDF with 'screen' media type
await page.EmulateMediaAsync(new() { Media = Media.Screen });
await page.PdfAsync(new() { Path = "page.pdf" });
```

The [`option: width`], [`option: height`], and [`option: margin`] options accept values labeled with units. Unlabeled
values are treated as pixels.

A few examples:
* `page.pdf({width: 100})` - prints with width set to 100 pixels
* `page.pdf({width: '100px'})` - prints with width set to 100 pixels
* `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
* `px` - pixel
* `in` - inch
* `cm` - centimeter
* `mm` - millimeter

The [`option: format`] options are:
* `Letter`: 8.5in x 11in
* `Legal`: 8.5in x 14in
* `Tabloid`: 11in x 17in
* `Ledger`: 17in x 11in
* `A0`: 33.1in x 46.8in
* `A1`: 23.4in x 33.1in
* `A2`: 16.54in x 23.4in
* `A3`: 11.7in x 16.54in
* `A4`: 8.27in x 11.7in
* `A5`: 5.83in x 8.27in
* `A6`: 4.13in x 5.83in

:::note
[`option: headerTemplate`] and [`option: footerTemplate`] markup have the following limitations: > 1. Script tags inside
templates are not evaluated. > 2. Page styles are not visible inside templates.
:::

### option: Page.pdf.path
* since: v1.8
- `path` <[path]>

The file path to save the PDF to. If [`option: path`] is a relative path, then it is resolved relative to the current
working directory. If no path is provided, the PDF won't be saved to the disk.

### option: Page.pdf.scale
* since: v1.8
- `scale` <[float]>

Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.

### option: Page.pdf.displayHeaderFooter
* since: v1.8
- `displayHeaderFooter` <[boolean]>

Display header and footer. Defaults to `false`.

### option: Page.pdf.headerTemplate
* since: v1.8
- `headerTemplate` <[string]>

HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values
into them:
* `'date'` formatted print date
* `'title'` document title
* `'url'` document location
* `'pageNumber'` current page number
* `'totalPages'` total pages in the document

### option: Page.pdf.footerTemplate
* since: v1.8
- `footerTemplate` <[string]>

HTML template for the print footer. Should use the same format as the [`option: headerTemplate`].

### option: Page.pdf.printBackground
* since: v1.8
- `printBackground` <[boolean]>

Print background graphics. Defaults to `false`.

### option: Page.pdf.landscape
* since: v1.8
- `landscape` <[boolean]>

Paper orientation. Defaults to `false`.

### option: Page.pdf.pageRanges
* since: v1.8
- `pageRanges` <[string]>

Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.

### option: Page.pdf.format
* since: v1.8
- `format` <[string]>

Paper format. If set, takes priority over [`option: width`] or [`option: height`] options. Defaults to 'Letter'.

### option: Page.pdf.width
* since: v1.8
* langs: js, python
- `width` <[string]|[float]>

Paper width, accepts values labeled with units.

### option: Page.pdf.width
* since: v1.8
* langs: csharp, java
- `width` <[string]>

Paper width, accepts values labeled with units.

### option: Page.pdf.height
* since: v1.8
* langs: js, python
- `height` <[string]|[float]>

Paper height, accepts values labeled with units.

### option: Page.pdf.height
* since: v1.8
* langs: csharp, java
- `height` <[string]>

Paper height, accepts values labeled with units.

### option: Page.pdf.margin
* since: v1.8
* langs: js, python
- `margin` "PdfMargins" <[Object]>
  - `top` ?<[string]|[float]> Top margin, accepts values labeled with units. Defaults to `0`.
  - `right` ?<[string]|[float]> Right margin, accepts values labeled with units. Defaults to `0`.
  - `bottom` ?<[string]|[float]> Bottom margin, accepts values labeled with units. Defaults to `0`.
  - `left` ?<[string]|[float]> Left margin, accepts values labeled with units. Defaults to `0`.

Paper margins, defaults to none.

### option: Page.pdf.margin
* since: v1.8
* langs: csharp, java
- `margin` <[Object]>
  * alias-java: Margin
  - `top` ?<[string]> Top margin, accepts values labeled with units. Defaults to `0`.
  - `right` ?<[string]> Right margin, accepts values labeled with units. Defaults to `0`.
  - `bottom` ?<[string]> Bottom margin, accepts values labeled with units. Defaults to `0`.
  - `left` ?<[string]> Left margin, accepts values labeled with units. Defaults to `0`.

Paper margins, defaults to none.

### option: Page.pdf.preferCSSPageSize
* since: v1.8
- `preferCSSPageSize` <[boolean]>

Give any CSS `@page` size declared in the page priority over what is declared in [`option: width`] and
[`option: height`] or [`option: format`] options. Defaults to `false`, which will scale the content to fit the paper
size.

### option: Page.pdf.tagged
* since: v1.42
- `tagged` <[boolean]>

Whether or not to generate tagged (accessible) PDF. Defaults to `false`.

### option: Page.pdf.outline
* since: v1.42
- `outline` <[boolean]>

Whether or not to embed the document outline into the PDF. Defaults to `false`.

## async method: Page.pickLocator
* since: v1.59
- returns: <[Locator]>

Enters pick locator mode where hovering over page elements highlights them and shows the corresponding locator.
Once the user clicks an element, the mode is deactivated and the [Locator] for the picked element is returned.

**Usage**

```js
const locator = await page.pickLocator();
console.log(locator);
```

```java
Locator locator = page.pickLocator();
System.out.println(locator);
```

```python
locator = await page.pick_locator()
print(locator)
```

```python
locator = page.pick_locator()
print(locator)
```

```csharp
var locator = await page.PickLocatorAsync();
Console.WriteLine(locator);
```

## async method: Page.press
* since: v1.8
* discouraged: Use locator-based [`method: Locator.press`] instead. Read more about locators.

Focuses the element, and then uses [`method: Keyboard.down`] and [`method: Keyboard.up`].

[`param: key`] can specify the intended
keyboardEvent.key value or a single character to
generate the text for. A superset of the [`param: key`] values can be found
here. Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`,
`Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.
`ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [`param: key`] in the upper case.

If [`param: key`] is a single character, it is case-sensitive, so the values `a` and `A` will generate different
respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the
modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```js
const page = await browser.newPage();
await page.goto('https://keycode.info');
await page.press('body', 'A');
await page.screenshot({ path: 'A.png' });
await page.press('body', 'ArrowLeft');
await page.screenshot({ path: 'ArrowLeft.png' });
await page.press('body', 'Shift+O');
await page.screenshot({ path: 'O.png' });
await browser.close();
```

```java
Page page = browser.newPage();
page.navigate("https://keycode.info");
page.press("body", "A");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("A.png")));
page.press("body", "ArrowLeft");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("ArrowLeft.png" )));
page.press("body", "Shift+O");
page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("O.png" )));
```

```python
page = await browser.new_page()
await page.goto("https://keycode.info")
await page.press("body", "A")
await page.screenshot(path="a.png")
await page.press("body", "ArrowLeft")
await page.screenshot(path="arrow_left.png")
await page.press("body", "Shift+O")
await page.screenshot(path="o.png")
await browser.close()
```

```python
page = browser.new_page()
page.goto("https://keycode.info")
page.press("body", "A")
page.screenshot(path="a.png")
page.press("body", "ArrowLeft")
page.screenshot(path="arrow_left.png")
page.press("body", "Shift+O")
page.screenshot(path="o.png")
browser.close()
```

```csharp
var page = await browser.NewPageAsync();
await page.GotoAsync("https://keycode.info");
await page.PressAsync("body", "A");
await page.ScreenshotAsync(new() { Path = "A.png" });
await page.PressAsync("body", "ArrowLeft");
await page.ScreenshotAsync(new() { Path = "ArrowLeft.png" });
await page.PressAsync("body", "Shift+O");
await page.ScreenshotAsync(new() { Path = "O.png" });
```

### param: Page.press.selector = %%-input-selector-%%
* since: v1.8

### param: Page.press.key
* since: v1.8
- `key` <[string]>

Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.

### option: Page.press.delay
* since: v1.8
- `delay` <[float]>

Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.

### option: Page.press.noWaitAfter = %%-input-no-wait-after-%%
* since: v1.8

### option: Page.press.strict = %%-input-strict-%%
* since: v1.14

### option: Page.press.timeout = %%-input-timeout-%%
* since: v1.8

### option: Page.press.timeout = %%-input-timeout-js-%%
* since: v1.8

## async method: Page.querySelector
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector
  - alias-js: $
- returns: <[null]|[ElementHandle]>

The method finds an element matching the specified selector within the page. If no elements match the selector, the
return value resolves to `null`. To wait for an element on the page, use [`method: Locator.waitFor`].

### param: Page.querySelector.selector = %%-query-selector-%%
* since: v1.9

### option: Page.querySelector.strict = %%-input-strict-%%
* since: v1.14

## async method: Page.querySelectorAll
* since: v1.9
* discouraged: Use locator-based [`method: Page.locator`] instead. Read more about locators.
* langs:
  - alias-python: query_selector_all
  - alias-js: $$
- returns: <[Array]<[ElementHandle]>>

The method finds all elements matching the specified selector within the page. If no elements match the selector, the
return value resolves to `[]`.

### param: Page.querySelectorAll.selector = %%-query-selector-%%
* since: v1.9

## async method: Page.requests
* since: v1.56
- returns: <[Array]<[Request]>>

Returns up to (currently) 100 last network request from this page. See [`event: Page.request`] for more details.

Returned requests should be accessed immediately, otherwise they might be collected to prevent unbounded memory growth as new requests come in. Once collected, retrieving most information about the request is impossible.

Note that requests reported through the [`event: Page.request`] request are not collected, so there is a trade off between efficient memory usage with [`method: Page.requests`] and the amount of available information reported through [`event: Page.request`].
