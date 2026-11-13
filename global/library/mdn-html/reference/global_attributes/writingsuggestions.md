---
title: "`writingsuggestions` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/writingsuggestions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `writingsuggestions` HTML global attribute

The **`writingsuggestions`** global attribute is an enumerated attribute indicating if browser-provided writing suggestions should be enabled under the scope of the element or not.

Some browsers provide writing suggestions to users as they type in editable fields. Suggestions usually appear as grayed-out text positioned after the text cursor, completing the user's sentence. While this can be helpful to users, developers might want to turn writing suggestions off in some cases, such as when providing site-specific writing suggestions.

The `writingsuggestions` attribute can be set on editable fields such as `` or `<textarea>` elements, or on other HTML elements to control the behavior of the browser's suggestions on sections of a page, or on the entire page.

## Syntax

In browsers that support them, writing suggestions are enabled by default. To disable them, set the `writingsuggestions` attribute's value to `false`. Setting the attribute's value to `true`, or omitting the value, enables writing suggestions.

To disable writing suggestions:

```html
<input type="text" writingsuggestions="false" />
```

To enable writing suggestions:

```html
<input type="text" />
<input type="text" writingsuggestions />
<input type="text" writingsuggestions="true" />
```

## See also

- `autocomplete` attribute
- `spellcheck` attribute
- `contenteditable` attribute
- `<textarea>`
- ``
- `<datalist>` and `list` attribute
