---
title: "`initial-letter` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/initial-letter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `initial-letter` CSS property

The **`initial-letter`** CSS property sets the size and sink for dropped, raised, and sunken initial letters. This property applies to `::first-letter` pseudo-elements and inline-level first children of block containers.

## Syntax

```css
/* Keyword value */
initial-letter: normal;

/* One value */
initial-letter: 3; /* 3 lines tall, baseline at line 3 */
initial-letter: 1.5; /* 1.5 lines tall, baseline at line 2 */

/* Two values */
initial-letter: 3 2; /* 3 lines tall, baseline at line 2 (raised 1 line) */
initial-letter: 3 1; /* 3 lines tall, baseline unchanged (raised 2 lines) */

/* Global values */
initial-letter: inherit;
initial-letter: initial;
initial-letter: revert;
initial-letter: revert-layer;
initial-letter: unset;
```

### Values

This property is specified as `normal` or a `<number>` optionally followed by an `<integer>`:

- `normal`
    No special initial-letter effect. Text behaves as normal.
- `<number>`
    Defines the size of the initial letter, in terms of how many lines it occupies. Negative values are not allowed.
- `<integer>`
    Defines the number of lines the initial letter should sink when the size of it is given. Values must be greater than zero. If omitted, it duplicates the size value, floored to the nearest positive whole number.

## Examples

### Setting initial letter size

#### HTML

```html
<p class="normal">Initial letter is normal</p>
<p class="onefive">Initial letter occupies 1.5 lines</p>
<p class="three">Initial letter occupies 3 lines</p>
```

#### CSS

```css
.normal::first-letter {
  -webkit-initial-letter: normal;
  initial-letter: normal;
}

.onefive::first-letter {
  -webkit-initial-letter: 1.5;
  initial-letter: 1.5;
}

.three::first-letter {
  -webkit-initial-letter: 3;
  initial-letter: 3;
}

p {
  outline: 1px dashed red;
}
```

#### Result

### Setting the sink value

In this example, all the initial letters are the same size, but with different sink values.

#### HTML

```html
<p class="four">Initial letter: Sink value = 4</p>
<p class="same">Initial letter: Sink value not declared (same as size)</p>
<p class="two">Initial letter: Sink value = 2</p>
<p class="one">Initial letter: Sink value = 1</p>
```

#### CSS

```css
.four::first-letter {
  -webkit-initial-letter: 3 4;
  initial-letter: 3 4;
}

.same::first-letter {
  -webkit-initial-letter: 3;
  initial-letter: 3;
}

.two::first-letter {
  -webkit-initial-letter: 3 2;
  initial-letter: 3 2;
}

.one::first-letter {
  -webkit-initial-letter: 3 1;
  initial-letter: 3 1;
}

p {
  outline: 1px dashed red;
}
```

#### Result

## See also

- `::first-letter`
- `:first-child`
- Drop caps in CSS via Oddbird (2017)
