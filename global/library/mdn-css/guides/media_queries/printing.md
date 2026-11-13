---
title: "Printing"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/media_queries/printing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Printing

There may be times in which your website or application would like to improve the user's experience when printing content. There are several possible scenarios:

- You wish to adjust layout to take advantage of the size and shape of the paper.
- You wish to use different styles to enhance the appearance of your content on paper.
- You wish to use higher resolution images for a better result.
- You want to adjust the user experience of printing, such as presenting a specially-formatted version of your content before printing begins.

There may be other cases in which you want to manage the printing process, but these are some of the most common scenarios. This article provides tips and techniques for helping your web content print better.

## Using a print style sheet

Add the following to your `<head>` tag.

```html
<link href="/path/to/print.css" media="print" rel="stylesheet" />
```

## Using media queries and @page to control printed content

You can use the CSS `@media` at-rule to set different styles for your webpage when it is printed on paper or as a PDF versus when it is displayed on the screen. The `print` media type sets the styles for printed media; these styles will only be used for printed content.

Add this at the end of your stylesheet. Note that specificity and precedence rules still apply:

```css
@media print {
  /* All your print styles go here */
  #header,
  #footer,
  #nav {
    display: none !important;
  }
}
```

You can also use the `@page` at-rule to modify different aspects of printed pages including the page's dimensions, orientation, and margins. The `@page` at-rule can be used to target all pages in a print-out or just a specific subset of pages

## Detecting print requests

Browsers send `beforeprint` and `afterprint` events to determine when printing may have occurred. You can use this to adjust the user interface presented during printing (for example displaying or hiding user interface elements during the print process).

## Examples

Here are some common examples.

### Automatically close the window when finished

The following example will close the window after the user has printed its contents:

```js
window.addEventListener("afterprint", () => self.close);
```

### Print an external page without opening it

If you want to be able to print an external page without opening it, you can utilize a hidden `` (see: HTMLIFrameElement), automatically removing it after the user prints its contents. The following is a possible example which will print a file named `externalPage.html`:

#### HTML

```html
<button id="print_external">Print external page!</button>
```

#### JavaScript

```js
function setPrint() {
  const closePrint = () => {
    document.body.removeChild(this);
  };
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.print();
}

document.getElementById("print_external").addEventListener("click", () => {
  const hideFrame = document.createElement("iframe");
  hideFrame.onload = setPrint;
  hideFrame.style.display = "none"; // hide iframe
  hideFrame.src = "external-page.html";
  document.body.appendChild(hideFrame);
});
```

## See also

- `window.print`
- `beforeprint` event
- `afterprint` event
- Media queries
- `@media`
- CSS paged media module
