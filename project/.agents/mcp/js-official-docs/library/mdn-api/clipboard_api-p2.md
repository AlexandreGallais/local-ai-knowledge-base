---
title: "Clipboard API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard API (part 2 of 3)

## Examples

### Reading and writing text

This example copies a line of text with `writeText()` and reads it back with `readText()`.

#### HTML

The HTML defines a `` element for the source text to be copied, `` elements to copy and paste the text, and an element into which the text will be copied.

```html
<p id="source_text">The quick brown fox jumps over the lazy dog.</p>
<button id="copy_text" type="button">Copy</button>
<button id="paste_text" type="button">Paste</button>
<p id="target_text"></p>
```

```css
#target_text {
  min-height: 1.2em;
  border: 1px solid black;
  padding: 0.5rem;
}
```

#### JavaScript

The code below registers click event handlers on the buttons that read and write the text.

```js
const sourceText = document.querySelector("#source_text");
const targetText = document.querySelector("#target_text");

document.querySelector("#copy_text").addEventListener("click", async () => {
  try {
    // Write the text to the clipboard
    await navigator.clipboard.writeText(sourceText.textContent);
    targetText.textContent = "Copied.";
  } catch (error) {
    targetText.textContent = `Copy failed: ${error.message}`;
  }
});

document.querySelector("#paste_text").addEventListener("click", async () => {
  try {
    // Read the text from the clipboard and write it to #target_text
    targetText.textContent = await navigator.clipboard.readText();
  } catch (error) {
    targetText.textContent = `Paste failed: ${error.message}`;
  }
});
```

#### Result

Click "Copy", then click "Paste" to read the text back.

> **Note:**
> If prompted, grant permission in order to copy and paste.

### Reading and writing multiple representations

This example creates a single `ClipboardItem` with representations of the same content, `text/html` and `text/plain`.
It then reads the clipboard and lists every representation found.

#### HTML

```html
<div id="source_multi">
  <p><strong>Bold</strong> and <em>italic</em> text.</p>
</div>
<button id="copy_multi" type="button">Copy (HTML + plain text)</button>
<button id="paste_multi" type="button">Paste</button>
<pre id="target_multi"></pre>
```

```css
#source_multi {
  border: 1px solid black;
  padding: 0.5rem;
  width: fit-content;
}

#target_multi {
  min-height: 3em;
  border: 1px solid black;
  padding: 0.5rem;
  white-space: pre-wrap;
}
```

#### JavaScript

As in the previous example, we create event handlers to copy the source element and paste to the target element.

The code that is run to copy the data is shown below.
Note how the code calls the `ClipboardItem()` constructor with two representations of the same source data.

```js
const sourceMulti = document.querySelector("#source_multi");
const targetMulti = document.querySelector("#target_multi");

document.querySelector("#copy_multi").addEventListener("click", async () => {
  const html = sourceMulti.innerHTML;
  const text = sourceMulti.innerText;
  try {
    const clipboardItem = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob([text], { type: "text/plain" }),
    });
    await navigator.clipboard.write([clipboardItem]);
    targetMulti.textContent = "Copied text/html and text/plain.";
  } catch (error) {
    targetMulti.textContent = `Copy failed: ${error.message}`;
  }
});
```

The handler that is called to paste the data is shown below.
This shows how you can read the clipboard item and then iterate its types to find the one you want (in this case we just log them).
Note that in this case we destructure the returned array of items to get a single `[clipboardItem]`.

```js
document.querySelector("#paste_multi").addEventListener("click", async () => {
  try {
    const [clipboardItem] = await navigator.clipboard.read();
    const lines = [];
    for (const type of clipboardItem.types) {
      const blob = await clipboardItem.getType(type);
      lines.push(`${type} → ${await blob.text()}`);
    }
    targetMulti.textContent = lines.join("\n");
  } catch (error) {
    targetMulti.textContent = `Paste failed: ${error.message}`;
  }
});
```

#### Result

Click "Copy (HTML + plain text)", then click "Paste" to list the representations found.

> **Note:**
> If prompted, grant permission in order to copy and paste.

### Reading and writing custom formats

This example demonstrates how applications can use custom formats to copy and paste a faithful representation of their data when the format is understood, and provide a graceful fallback where it is not.

The code provides a source table that represents all the data provided by the application: item, quantity, and SKU.
When this is copied, a `ClipboardItem` is created with a `"web "`-prefixed custom representation that fully describes that data, a `text/html` representation that omits the SKU data, and a `text/plain` version that reduces the data to text.
This can then be pasted into one of three paste areas, which are intended to represent applications that are able to render the different versions of the data.

#### HTML

First we define the HTML for our source table, and buttons for copying the text, resetting the example, and logging how many representations have been copied.
The table body starts empty: we fill it when our script runs.

```html
<table id="source">
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>SKU</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
<button id="copy_custom" type="button">
  Copy (HTML + text + custom format)
</button>
<button id="reload_custom" type="button">Reload</button>
<p id="status_custom"></p>
```

Then we define the three targets and their buttons.
Note that the target elements all allow rich text, but our code will only copy in the type of data that they are supposed to represent.

```html
<div class="targets">
  <div>
    <p>Your app</p>
    <div id="target_app"></div>
    <button id="paste_app" type="button">Paste</button>
  </div>
  <div>
    <p>Arbitrary rich text target</p>
    <div id="target_richtext"></div>
    <button id="paste_richtext" type="button">Paste</button>
  </div>
  <div>
    <p>Arbitrary plain text target</p>
    <div id="target_plaintext"></div>
    <button id="paste_plaintext" type="button">Paste</button>
  </div>
</div>
```

```css
body {
  margin: 1rem;
}

#source {
  border-collapse: collapse;
  margin-bottom: 1rem;
}

#source th,
#source td {
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
}

#status_custom {
  min-height: 1.2em;
  font-style: italic;
}

.targets {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.targets > div {
  flex: 1;
  min-width: 150px;
}

.targets p {
  margin: 0 0 0.25rem;
  font-weight: bold;
}

.targets button {
  margin-top: 0.5rem;
}

#target_app,
#target_richtext,
#target_plaintext {
  box-sizing: border-box;
  width: 100%;
  min-height: 80px;
  border: 1px solid black;
  padding: 0.5rem;
  font-family: inherit;
  font-size: inherit;
  white-space: pre-wrap;
}

#target_app:empty::before,
#target_richtext:empty::before,
#target_plaintext:empty::before {
  content: "Nothing pasted yet";
  color: gray;
}

#target_app table {
  border-collapse: collapse;
}

#target_app th,
#target_app td {
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
}
```

#### JavaScript

```js
const statusElement = document.querySelector("#status_custom");
function log(text) {
  statusElement.textContent = text;
}
```

First we check whether or not custom formats are supported and log this information.
Note that the example still works, but it only includes the default/fall back representations.

```js
const customType = "web text/x-mdn-inventory+json";

log(
  ClipboardItem.supports(customType)
    ? `Custom format supported: ${customType}`
    : `Custom format not supported by this browser: ${customType}`,
);
```

Next we set up the data for our source table, which is defined in the `inventory` array.
This uses `buildRow()` to create a table row from an array of cell values.

```js
const inventory = [
  { item: "Apples", quantity: 12, sku: "A-104" },
  { item: "Pears", quantity: 7, sku: "P-221" },
];

function buildRow(cells, cellTag) {
  const tr = document.createElement("tr");
  for (const value of cells) {
    const cell = document.createElement(cellTag);
    cell.textContent = value;
    tr.appendChild(cell);
  }
  return tr;
}
const sourceBody = document.querySelector("#source tbody");
for (const row of inventory) {
  sourceBody.appendChild(buildRow([row.item, row.quantity, row.sku], "td"));
}
```

We also define `buildTable()` which we later use to build a table from a list of column headers and rows of values (for our `text/html` representation).

```js
function buildTable(headers, rows) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.appendChild(buildRow(headers, "th"));
  const tbody = document.createElement("tbody");
  for (const row of rows) {
    tbody.appendChild(buildRow(row, "td"));
  }
  table.append(thead, tbody);
  return table;
}
```

We also add code to reload and clear the example when the "Reload" button is pressed.

```js
const reload = document.querySelector("#reload_custom");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
```

Next we define our code to copy the data representations into a `ClipboardItem` and write them to the clipboard.

First `copyInventory()` builds a `ClipboardItem` with `text/html` and `text/plain` blobs, and adds the custom-format blob only when `ClipboardItem.supports()` confirms the browser accepts it.
The `text/html` blob is a separate, reduced table with no `SKU` column, built with `buildTable()` rather than reused from the source table (the point is to show that an arbitrary HTML consumer gets less information than the custom format).
It's used both by the "Copy" button and by the table's own `copy` event listener, so a manual selection-and-copy produces the same clipboard content as clicking the button.

```js
const sourceTable = document.querySelector("#source");
const copyButton = document.querySelector("#copy_custom");

async function copyInventory() {
  const reducedTable = buildTable(
    ["Item", "Quantity"],
    inventory.map((row) => [row.item, row.quantity]),
  );
  const html = reducedTable.outerHTML;
  const text = inventory
    .map((row) => `${row.item}\t${row.quantity}`)
    .join("\n");

  const data = {
    "text/html": new Blob([html], { type: "text/html" }),
    "text/plain": new Blob([text], { type: "text/plain" }),
  };
  if (ClipboardItem.supports(customType)) {
    const json = JSON.stringify(inventory);
    data[customType] = new Blob([json], { type: customType });
  }

  try {
    await navigator.clipboard.write([new ClipboardItem(data)]);
    log(`Copied ${Object.keys(data).length} format(s) to the clipboard.`);
  } catch (error) {
    log(`Copy failed: ${error.message}`);
  }
}

copyButton.addEventListener("click", copyInventory);

document.addEventListener("copy", (event) => {
  const selection = document.getSelection();
  if (!sourceTable.contains(selection.anchorNode)) return;
  event.preventDefault();
  copyInventory();
});
```

We then define the code for pasting a representation into each of tje target boxes.

The "Your app" button looks specifically for the custom format representation and rebuilds the full table, including the `SKU` column, from structured data — reproducing the source table exactly.

```js
const targetApp = document.querySelector("#target_app");
const pasteAppButton = document.querySelector("#paste_app");

pasteAppButton.addEventListener("click", async () => {
  try {
    const [clipboardItem] = await navigator.clipboard.read();
    if (clipboardItem.types.includes(customType)) {
      const blob = await clipboardItem.getType(customType);
      const rows = JSON.parse(await blob.text());
      const table = buildTable(
        ["Item", "Quantity", "SKU"],
        rows.map((row) => [row.item, row.quantity, row.sku]),
      );
      targetApp.replaceChildren(table);
    } else {
      targetApp.textContent = "Custom format not on the clipboard.";
    }
  } catch (error) {
    targetApp.textContent = `Paste failed: ${error.message}`;
  }
});
```

The "Arbitrary rich text target" button only ever looks for `text/html`, ignoring the custom format entirely, and renders it with `innerHTML`.
Since the copied HTML only carries `item` and `quantity`, this target shows a table with no `SKU` column.
Note that a real app should sanitize third-party HTML before inserting it this way (see Reading unsanitized HTML from the clipboard); this demo only ever pastes HTML it wrote itself.

```js
const targetRichtext = document.querySelector("#target_richtext");
const pasteRichtextButton = document.querySelector("#paste_richtext");

pasteRichtextButton.addEventListener("click", async () => {
  try {
    const [clipboardItem] = await navigator.clipboard.read();
    if (clipboardItem.types.includes("text/html")) {
      const blob = await clipboardItem.getType("text/html");
      targetRichtext.innerHTML = await blob.text();
    } else {
      targetRichtext.textContent = "No text/html on the clipboard.";
    }
  } catch (error) {
    targetRichtext.textContent = `Paste failed: ${error.message}`;
  }
});
```

The "Arbitrary plain text target" button only ever looks for the `text/plain` format.

```js
const targetPlaintext = document.querySelector("#target_plaintext");
const pastePlaintextButton = document.querySelector("#paste_plaintext");

pastePlaintextButton.addEventListener("click", async () => {
  try {
    const [clipboardItem] = await navigator.clipboard.read();
    if (clipboardItem.types.includes("text/plain")) {
      const blob = await clipboardItem.getType("text/plain");
      targetPlaintext.textContent = await blob.text();
    } else {
      targetPlaintext.textContent = "No text/plain on the clipboard.";
    }
  } catch (error) {
    targetPlaintext.textContent = `Paste failed: ${error.message}`;
  }
});
```

#### Result

Click the Copy button, or select the table and copy it manually, to copy the table as HTML, plain text, and (if supported) the custom format.
Then click each of the three "Paste" buttons below to compare what each target retrieves.
Click "Reload" to reset the example.

> **Note:**
> If prompted, grant permission to copy and paste.
