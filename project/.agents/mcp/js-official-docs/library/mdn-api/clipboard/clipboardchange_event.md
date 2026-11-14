---
title: "Clipboard: clipboardchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/clipboardchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: clipboardchange event

The **`clipboardchange`** event of the `Clipboard` interface is fired when the system clipboard contents are changed in any way, for example via a system copy command, or via an API method such as `Clipboard.writeText()`.

The `clipboardchange` event is only fired with sticky activation or after the `clipboard-read` permission is granted.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("clipboardchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclipboardchange = (event) => { }
```

## Event type

A `ClipboardChangeEvent`. Inherits from `Event`.

## Examples

### Listening for system copy commands

This example shows how to listen for system copy commands and display the content that was copied to the clipboard.

#### HTML

The HTML consists of three `` elements — one to display the clipboard contents and two containing sample text to copy.

```html
<p id="output">Copied text:</p>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a mattis purus.
  Donec at ipsum libero. Maecenas at dictum turpis. Vivamus eget aliquet augue.
  Aenean tempor dictum posuere. Vestibulum vehicula, nulla ac convallis feugiat,
  tortor velit lobortis est, vitae convallis velit libero vel urna. Suspendisse
  potenti. In bibendum ex et pellentesque gravida. Phasellus magna risus,
  euismod vitae sem in, viverra venenatis lacus. Sed dignissim risus eu congue
  consequat. Vestibulum nec feugiat libero. Maecenas quis sodales lorem, eu
  luctus nisl. Cras vel diam sed lacus finibus elementum sed sed nunc.
</p>

<p>
  Nam ac metus eget est bibendum pulvinar. Nunc a venenatis lorem. Lorem ipsum
  dolor sit amet, consectetur adipiscing elit. In dignissim, arcu ornare luctus
  pharetra, dui velit faucibus leo, ac posuere ipsum risus vel ligula. Morbi
  varius, felis et ornare efficitur, tortor erat imperdiet lacus, non rhoncus
  lectus sapien sit amet augue. Suspendisse potenti. Sed fringilla mi augue, at
  laoreet felis varius in. Donec venenatis gravida lacus ut rutrum. Donec
  suscipit egestas justo. Proin semper nibh tortor, sit amet elementum metus
  placerat quis. Sed consectetur leo sed lorem varius, sit amet ultrices sem
  tincidunt. Vivamus facilisis at velit eget commodo.
</p>
```

```css
body {
  margin: 0 5px;
}
#output {
  font-family: "Helvetica", "Arial";
  padding: 10px;
  border: 2px solid #cccccc;
  border-radius: 5px;
}
```

#### JavaScript

In our script, we first grab a reference to the output `` element. We then define a `clipboardchange` event handler on the browser's `Clipboard` object. When the event fires, we invoke the `Clipboard.readText()` method to read the text that was just copied to the clipboard. When the result is returned, we set it as the value of the output paragraph's `textContent`.

```js
const outputPara = document.querySelector("#output");

navigator.clipboard.addEventListener("clipboardchange", (event) => {
  navigator.clipboard
    .readText()
    .then((text) => (outputPara.textContent = `Copied text: ${text}`));
});
```

#### Result

The rendered example is as follows:

Try selecting some text from the example and then copying it to the clipboard using `Ctrl` + `C` (or `Cmd` + `C` if you are using a Mac). On your first attempt, you will see a permission prompt asking you to allow permission to read the clipboard contents. After that (or immediately, on subsequent attempts), you should see the text that you copied printed to the output paragraph at the top of the UI.

## See also

- `ClipboardChangeEvent`
- Clipboard API
