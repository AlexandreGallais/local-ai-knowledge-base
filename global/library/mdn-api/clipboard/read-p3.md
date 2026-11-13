---
title: "Clipboard: read() method (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clipboard/read/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clipboard: read() method (part 3 of 3)

### Reading a custom format from the clipboard

This example uses the same code as Reading and writing custom formats in the Clipboard API overview, but shows only the code that's specific to `read()`.
For more detail see that example.

#### HTML

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

```js
const reload = document.querySelector("#reload_custom");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
```

Here we define the custom media ("MIME") type that we will use in the following code.
We also use `ClipboardItem.supports()` to check whether that particular format is supported and log that to the output.
Note that this example works either way, we just won't be able to write (or read) the custom type.

```js
const customType = "web text/x-mdn-inventory+json";

log(
  ClipboardItem.supports(customType)
    ? `Custom format supported: ${customType}`
    : `Custom format not supported by this browser: ${customType}`,
);
```

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

This code shows the listener for the button that pastes the clipboard to the "Your app" box.
This reads the clipboard, gets the first item, checks that it include our custom type (defined above) and then gets that representation.
It then uses it to build the table and writes it to the box.

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

The "Arbitrary rich text target" button handler does the same thing, but uses the `text/html` representation and renders it with `innerHTML`.
Since the copied HTML only carries `item` and `quantity`, this target shows a table with no `SKU` column.

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

The "Arbitrary plain text target" button uses the `text/plain` representation.

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

Click the "Copy" button, or select the table and copy it manually, to copy the table as HTML, plain text, and (if supported) the custom format.
Then click each of the three "Paste" buttons to compare what each target retrieves.
Click "Reload" to reset the example.

> **Note:**
> If prompted, grant permission in order to copy and paste.

## See also

- Clipboard API
- Unblocking clipboard access on web.dev
- Unsanitized HTML in the Async Clipboard API on developer.chrome.com
- `Clipboard.readText()`
- `Clipboard.writeText()`
- `Clipboard.write()`
