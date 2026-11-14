---
title: "`white-space-collapse` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/white-space-collapse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `white-space-collapse` CSS property

The **`white-space-collapse`** CSS property controls how white space inside an element is collapsed.

> **Note:**
> The `white-space-collapse` and `text-wrap-mode` properties can be declared together using the `white-space` shorthand property.

## Syntax

```css
/* Keyword values */
white-space-collapse: collapse;
white-space-collapse: preserve;
white-space-collapse: preserve-breaks;
white-space-collapse: preserve-spaces;
white-space-collapse: break-spaces;

/* Global values */
white-space-collapse: inherit;
white-space-collapse: initial;
white-space-collapse: revert;
white-space-collapse: revert-layer;
white-space-collapse: unset;
```

The `white-space-collapse` property is specified as a single keyword chosen from the list of values below.

### Values

- `collapse`
    White space sequences are collapsed.
- `preserve`
    White space sequences and segment break characters are preserved.
- `preserve-breaks`
    White space sequences are collapsed, while segment break characters are preserved.
- `preserve-spaces`
    White space sequences are preserved, while tabs and segment break characters are converted to spaces.
- `break-spaces`
    The behavior is identical to `preserve`, except that:
    - Any sequence of preserved white space always takes up space, including at the end of the line.
    - A line-breaking opportunity exists after every preserved white space character, including between white space characters.
    - Preserved spaces take up space and do not hang, thus affecting the box's intrinsic sizes (`min-content` size and `max-content` size).

> **Note:**
> _Segment break characters_ are characters such as line feeds that cause text to break onto new lines.

> **Note:**
> The CSS text module defines a `discard` value for the `white-space-collapse` property to discard all white space in the element, however, this is not supported in any browsers.

## Examples

### HTML

```html
<h2 class="collapse">Default behavior;
  all   whitespace   is   collapsed
  in    the          heading       .</h2>

<h2 class="preserve">In this case
  all   whitespace   is   preserved
  in    the          heading       .</h2>

<h2 class="preserve-breaks">In this case only
  the   line breaks  are  preserved
  in    the          heading       .</h2>

<h2 class="preserve-spaces">In this case only
  the   spaces       are  preserved
  in    the          heading       .</h2>
```

### CSS

```css
.collapse {
  white-space-collapse: collapse;
}

.preserve {
  white-space-collapse: preserve;
}

.preserve-breaks {
  white-space-collapse: preserve-breaks;
}

.preserve-spaces {
  white-space-collapse: preserve-spaces;
}

h2 {
  font-size: 1.6rem;
  font-family: monospace;
  border-bottom: 1px dotted #cccccc;
}
```

## See also

- Shorthand for `white-space-collapse` and `text-wrap-mode`: The `white-space` property.
- CSS text module
- Handling whitespace in CSS
