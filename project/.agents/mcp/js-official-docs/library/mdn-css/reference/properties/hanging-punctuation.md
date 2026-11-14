---
title: "`hanging-punctuation` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/hanging-punctuation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `hanging-punctuation` CSS property

The **`hanging-punctuation`** CSS property specifies whether a punctuation mark should hang at the start or end of a line of text. Hanging punctuation may be placed outside the line box.

## Syntax

```css
/* Keyword values */
hanging-punctuation: none;
hanging-punctuation: first;
hanging-punctuation: last;
hanging-punctuation: allow-end;

/* Two keywords */
hanging-punctuation: first allow-end;
hanging-punctuation: first last;
hanging-punctuation: last allow-end;

/* Three keywords */
hanging-punctuation: first allow-end last;

/* Global values */
hanging-punctuation: inherit;
hanging-punctuation: initial;
hanging-punctuation: revert;
hanging-punctuation: revert-layer;
hanging-punctuation: unset;
```

The `hanging-punctuation` property may be specified with one, two, or three space-separated values.

### Values

- `none`
    No character hangs.
- `first`
    An opening bracket or quote at the start of the first formatted line of an element hangs. This applies to:
    - all characters in the Unicode categories Ps, Pf, Pi
    - the quote marks `U+0027` APOSTROPHE (`'`) and `U+0022` QUOTATION MARK (`"`).

- `last`
    A closing bracket or quote at the end of the last formatted line of an element hangs. This applies to:
    - all characters in the Unicode categories Pe, Pf, Pi
    - the quote marks `U+0027` APOSTROPHE (`'`) and `U+0022` QUOTATION MARK (`"`).
- `allow-end`
    A stop or comma at the end of a line hangs if it does not otherwise fit prior to justification.

Stops and commas that are allowed to hang include:

- `U+002C`, COMMA
- `U+002E`, FULL STOP
- `U+060C`, ARABIC COMMA
- `U+06D4`, ARABIC FULL STOP
- `U+3001`, IDEOGRAPHIC COMMA
- `U+3002`, IDEOGRAPHIC FULL STOP
- `U+FF0C`, FULLWIDTH COMMA
- `U+FF0E`, FULLWIDTH FULL STOP
- `U+FE50`, SMALL COMMA
- `U+FE51`, SMALL IDEOGRAPHIC COMMA
- `U+FE52`, SMALL FULL STOP
- `U+FF61`, HALFWIDTH IDEOGRAPHIC FULL STOP
- `U+FF64`, HALFWIDTH IDEOGRAPHIC COMMA

User agents may include additional characters.

## Examples

### Setting opening and closing quotes to hang

#### HTML

```html
<p>
  «For a moment, nothing happened. Then, after a second or so, nothing continued
  to happen.»
</p>

<p class="hanging">
  «For a moment, nothing happened. Then, after a second or so, nothing continued
  to happen.»
</p>

<p class="hanging right">
  «For a moment, nothing happened. Then, after a second or so, nothing continued
  to happen.»
</p>
```

#### CSS

```css
p {
  width: 15em;
  border: 1px solid #cccccc;
  font-size: 2rem;
  font-style: italic;
  margin: 1em;
}

p.hanging {
  hanging-punctuation: first last;
}

p.right {
  text-align: right;
}
```

#### Result

## See also

- `text-indent`
- CSS Tricks: Hanging punctuation
