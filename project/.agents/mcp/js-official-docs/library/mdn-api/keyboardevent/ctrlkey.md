---
title: "KeyboardEvent: ctrlKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/ctrlkey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: ctrlKey property

The **`KeyboardEvent.ctrlKey`** read-only property returns a
boolean value that indicates if the `control` key was pressed
(`true`) or not (`false`) when the event occurred.

When the `Control` key <example-value> is pressed or released, this property is `true` for its `keydown` event and `false` for its `keyup` event, because both events fire _after_ the state change.

## Value

A boolean value.

## Examples

```html
<p>
  Press any character key, with or without holding down the CTRL key.<br />
  You can also use the SHIFT key <example-value> with the CTRL key.
</p>
<pre id="output"></pre>
```

```js
const output = document.getElementById("output");

function showChar(e) {
  output.textContent = `Key <example-value>: "${e.key}"
CTRL key <example-value>: ${e.ctrlKey}
`;
}

document.addEventListener("keydown", showChar);
```

## See also

- `KeyboardEvent`
