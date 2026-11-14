---
title: "`:blank` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_blank/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:blank` CSS pseudo-class

> **Note:**
> The `:blank` selector is considered at risk, as the CSSWG keeps changing it.
>
> See CSSWG issue #1967.

The **`:blank`** CSS pseudo-class selects empty user input elements (e.g., `` or `<textarea>`).

## Syntax

```css
:blank {
  /* ... */
}
```

## Examples

### Basic :blank example

In eventual supporting browsers, the `:blank` pseudo-class will enable developers to highlight in some way input controls that are not required, but still have no content filled in, perhaps as a reminder to users.

#### HTML

```html
<textarea></textarea>
```

#### CSS

```css
textarea:blank {
  border: 3px solid red;
}
```

#### Result

## Browser compatibility

Currently, no browsers support this feature.

## See also

- `:empty`
- CSS selectors module
