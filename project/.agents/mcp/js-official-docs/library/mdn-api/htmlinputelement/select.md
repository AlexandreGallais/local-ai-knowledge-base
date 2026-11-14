---
title: "HTMLInputElement: select() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/select/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: select() method

The **`select()`** method of the `HTMLInputElement` interface selects all the text in an `` element that includes a text field.

Calling `element.select()` will not necessarily focus the input, so it is often used with `HTMLElement.focus()`.

## Syntax

```js
select()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

Click the button in this example to select all the text in the `` element.

### HTML

```html
<input type="text" id="text-box" size="20" value="Hello world!" />
<button>Select text</button>
```

### JavaScript

```js
function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.select();
}

document.querySelector("button").addEventListener("click", selectText);
```

## See also

- `HTMLInputElement`
- `HTMLInputElement.setSelectionRange()`
