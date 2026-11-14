---
title: "HTMLElement: inputMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/inputmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: inputMode property

The `HTMLElement` property **`inputMode`** reflects the value of the element's `inputmode` attribute.

It provides a hint about the type of data that might be entered by the user while editing the element or its contents. This allows the browser to display an appropriate virtual keyboard.

It is used primarily on `` elements, but is usable on any element in `contenteditable` mode.

## Value

This attribute may have one of the following values:

- `decimal`
    Fractional numeric input keyboard that contains the digits and decimal separator for the user's locale (typically `.` or `,`).
- `email`
    A virtual keyboard optimized for entering email addresses.
    Typically includes the `@`character as well as other optimizations.
- `none`
    No virtual keyboard. This is used when the page implements its own keyboard input control.
- `numeric`
    Numeric input keyboard that only requires the digits 0–9.
    Devices may or may not show a minus key.
- `search`
    A virtual keyboard optimized for search input.
    For instance, the return/submit key may be labeled "Search".
- `tel`
    A telephone keypad input that includes the digits 0–9, the asterisk (`\*`), and the pound (`#`) key.
- `text`
    Standard input keyboard for the user's current locale.
- `url`
    A keypad optimized for entering URLs.
    This may have the `/` key more prominent, for example.

For details on the usage of this attribute, see the page for the `inputmode` HTML attribute that this property reflects.

## See also

- inputmode attribute
