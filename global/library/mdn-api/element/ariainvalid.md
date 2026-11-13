---
title: "Element: ariaInvalid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariainvalid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaInvalid property

The **`ariaInvalid`** property of the `Element` interface reflects the value of the `aria-invalid` attribute. Relevant for the `application`, `checkbox`, `combobox`, `gridcell`, `listbox`, `radiogroup`, `slider`, `spinbutton`, `textbox`, and `tree` roles, it indicates to the accessibility API whether the entered value does not conform to the format expected by the application.

If the attribute is not present, or is set to the empty string, assistive technology will treat the value as if it were set to `false`. If the attribute is present but set to a value other than `false`, `grammar`, `spelling` or the empty string (`""`), assistive technology treats the value as `true`. The property reflects the attribute value as set, not as handled by assistive technology.

## Value

A string with one of the following values:

- `"true"`
    The element is invalid.
- `"false"` (default)
    The element is not in an invalid state.
- `"grammar"`
    The element is in an invalid state because grammatical error was detected.
- `"spelling"`
    The element is in an invalid state because spelling error was detected.

## Examples

In this example the `aria-invalid` attribute on the element with an ID of `quote` is omitted, returning `null` and treated as `false`. Using `ariaInvalid` we update the value to `grammar` (because there are two errors).

```html
<div id="quote" role="textbox" contenteditable>you are your best thing..</div>
```

```html
<hr />
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
const el = document.getElementById("quote");
log(`Initial value: ${el.ariaInvalid}`);
el.ariaInvalid = "grammar";
log(`Updated value: ${el.ariaInvalid}`);
```

## See also

- `Element.ariaRequired`
- `aria-required`
- `aria-errormessage`
- `Element.ariaErrorMessageElements`
