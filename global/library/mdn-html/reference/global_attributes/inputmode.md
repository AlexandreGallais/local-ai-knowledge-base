---
title: "`inputmode` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/inputmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inputmode` HTML global attribute

The **`inputmode`** global attribute is an enumerated attribute that hints at the type of data that might be entered by the user while editing the element or its contents.
This allows a browser to display an appropriate virtual keyboard.

It is used primarily on `` elements, but is usable on any element in `contenteditable` mode.

It's important to understand that the `inputmode` attribute doesn't cause any validity requirements to be enforced on input. To require that input conforms to a particular data type, choose an appropriate `` element type. For specific guidance on choosing `` types, see the Value section.

## Value

The attribute can have any of the following values:

- `none`
    No virtual keyboard.
    For when the page implements its own keyboard input control.
- `text` (default value)
    Standard input keyboard for the user's current locale.
- `decimal`
    Fractional numeric input keyboard containing the digits and decimal separator for the user's locale (typically `.` or `,`).
    Devices may or may not show a minus key (`-`).
- `numeric`
    Numeric input keyboard, but only requires the digits 0–9.
    Devices may or may not show a minus key.
- `tel`
    A telephone keypad input, including the digits 0–9, the asterisk (`\*`), and the pound (`#`) key.
    Inputs that _require_ a telephone number should typically use ``<<input type="tel">>`` instead.
- `search`
    A virtual keyboard optimized for search input.
    For instance, the return/submit key may be labeled "Search", along with possible other optimizations.
    Inputs that _require_ a search query should typically use ``<<input type="search">>`` instead.
- `email`
    A virtual keyboard optimized for entering email addresses.
    Typically includes the `@`character as well as other optimizations.
    Inputs that _require_ email addresses should typically use ``<<input type="email">>`` instead.
- `url`
    A keypad optimized for entering URLs.
    This may have the `/` key more prominent, for example.
    Enhanced features could include history access and so on.
    Inputs that _require_ a URL should typically use ``<<input type="url">>`` instead.

## See also

- All global attributes.
- `enterkeyhint` global attribute
