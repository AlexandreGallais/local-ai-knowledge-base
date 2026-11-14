---
title: "ProcessingInstruction: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/processinginstruction/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ProcessingInstruction: target property

The read-only **`target`** property of the `ProcessingInstruction` interface
represent the application to which the `ProcessingInstruction` is targeted.

For example:

```html
<?xml version="1.0"?>
```

is a processing instruction whose `target` is `xml`.

## Value

A string containing the name of the application.

## Example

### In an XML document

```html
<output></output>
```

```js
let parser = new DOMParser();
const doc = parser.parseFromString(
  '<?xml version="1.0"?><test/>',
  "application/xml",
);
const pi = doc.createProcessingInstruction(
  "xml-stylesheet",
  'href="mycss.css" type="text/css"',
);
doc.insertBefore(pi, doc.firstChild);

const output = document.querySelector("output");
output.textContent = `This processing instruction's target is: ${doc.firstChild.target}`;
```

### In an HTML document

The processing instruction line will be considered, and represented, as a `Comment` object.

```html
<?xml version="1.0"?>
<pre></pre>
```

```js
const node = document.querySelector("pre").previousSibling.previousSibling;
const result = `Node with the processing instruction: ${node.nodeName}: ${node.nodeValue}\n`;
document.querySelector("pre").textContent = result;
```

## See also

- The DOM API
