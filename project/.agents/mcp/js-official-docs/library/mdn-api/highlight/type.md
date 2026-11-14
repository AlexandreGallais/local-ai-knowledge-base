---
title: "Highlight: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/highlight/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Highlight: type property

The `type` property of the `Highlight` interface is an enumerated `String` used to specify the meaning of the highlight. This allows assistive technologies, such as screen readers, to include this meaning when exposing the highlight to users.

By default, a highlight object will have its type set to `highlight`, but you can change it to `spelling-error` or `grammar-error`.

## Value

The possible values of the `type` enumerated value are:

- `highlight`
    This is the default highlight type. It does not have any specific meaning.
- `spelling-error`
    Use this type when the highlight is used to emphasize misspelled content.
- `grammar-error`
    Use this type when the highlight is used to emphasize content that is grammatically incorrect.

## Examples

```js
const spellErrorRange = new Range();
spellErrorRange.setStart(textNode, 10);
spellErrorRange.setEnd(textNode, 20);

const spellErrorsHighlight = new Highlight(spellErrorRange);

spellErrorsHighlight.type = "spelling-error";
```

## See also

- `The CSS Custom Highlight API`
- CSS custom highlight API module
- CSS Custom Highlight API: The Future of Highlighting Text Ranges on the Web
