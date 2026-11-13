---
title: "HTMLInputElement: setSelectionRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/setselectionrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: setSelectionRange() method

The **`setSelectionRange()`** method of the `HTMLInputElement` interface sets the start and end positions of the current text selection in an `` element. This updates the selection state immediately, though the visual highlight only appears when the element is focused.

This method updates the `HTMLInputElement.selectionStart`, `HTMLInputElement.selectionEnd`, and `HTMLInputElement.selectionDirection` properties in one call. If you wish to select **all** text of an input element, you can use the `select()` method instead.

The selection of an input element can either be a range of characters or a caret (if nothing is selected). Therefore, by setting `selectionStart` and `selectionEnd` to the same value, you can effectively move the caret to a specific position in the text field.

## Syntax

```js
setSelectionRange(selectionStart, selectionEnd)
setSelectionRange(selectionStart, selectionEnd, selectionDirection)
```

### Parameters

- `selectionStart`
    The 0-based index of the first selected character. An index greater than the length of the element's value is treated as pointing to the end of the value. See the `selectionStart` property.
- `selectionEnd`
    The 0-based index of the character _after_ the last selected character. An index greater than the length of the element's value is treated as pointing to the end of the value. If `selectionEnd` is less than `selectionStart`, then both are treated as the value of `selectionEnd`. See the `selectionEnd` property.
- `selectionDirection` (optional)
    A string indicating the direction in which the selection is considered to have been performed. See the `selectionDirection` property. Possible values:
    - `"forward"`
    - `"backward"`
    - `"none"` if the direction is unknown or irrelevant. Default value.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the element is not one of the following input types: `password`, `search`, `tel`, `text`, or `url`.

## Examples

### Selecting text

Click the button in this example to select the third, fourth, and fifth characters in
the text box ("zil" in the word "Mozilla").

#### HTML

```html
<input type="text" id="text-box" size="20" value="Mozilla" />
<button>Select text</button>
```

#### JavaScript

```js
function selectText() {
  const input = document.getElementById("text-box");
  input.focus();
  input.setSelectionRange(2, 5);
}

document.querySelector("button").addEventListener("click", selectText);
```

#### Result

### Moving the caret

Passing the same value for `selectionStart` and `selectionEnd` moves the caret without selecting any text. Choose a position and click the button to move the caret there. Position `0` is before the first character, and position `7` is after the last one.

#### HTML

```html
<input type="text" id="caret-box" size="20" value="Mozilla" />
<label>
  Position
  <input type="number" id="caret-position" min="0" max="7" value="2" />
</label>
<button>Move caret</button>
```

#### JavaScript

```js
const input = document.getElementById("caret-box");
const position = document.getElementById("caret-position");

document.querySelector("button").addEventListener("click", () => {
  const index = position.valueAsNumber;
  input.focus();
  input.setSelectionRange(index, index);
});
```

#### Result

## See also

- ``
- `<textarea>`
- `HTMLInputElement`
- `Selection`
