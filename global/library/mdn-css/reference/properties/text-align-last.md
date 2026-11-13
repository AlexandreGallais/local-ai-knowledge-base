---
title: "`text-align-last` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-align-last/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-align-last` CSS property

The **`text-align-last`** CSS property sets how the last line of a block or a line, right before a forced line break, is aligned.

```css
text-align-last: right;
```

```css
text-align-last: center;
```

```css
text-align-last: left;
```

```html
<section id="default-example">
  <div>
    <p id="example-element">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
  </div>
</section>
```

```css
section {
  font-size: 1.5em;
}

#default-example > div {
  width: 250px;
}

#example-element {
  text-align: justify;
}
```

## Syntax

```css
/* Keyword values */
text-align-last: auto;
text-align-last: start;
text-align-last: end;
text-align-last: left;
text-align-last: right;
text-align-last: center;
text-align-last: justify;

/* Global values */
text-align-last: inherit;
text-align-last: initial;
text-align-last: revert;
text-align-last: revert-layer;
text-align-last: unset;
```

### Values

This property is specified as one of the following keyword values:

- `auto`
    The affected line is aligned per the value of `text-align`, unless `text-align` is `justify`, in which case the effect is the same as setting `text-align-last` to `start`.
- `start`
    The same as `left` if direction is left-to-right and `right` if direction is right-to-left.
- `end`
    The same as `right` if direction is left-to-right and `left` if direction is right-to-left.
- `left`
    The inline contents are aligned to the left edge of the line box.
- `right`
    The inline contents are aligned to the right edge of the line box.
- `center`
    The inline contents are centered within the line box.
- `justify`
    The text is justified. Text should line up their left and right edges to the left and right content edges of the paragraph.

## Examples

### Justifying the last line

```html
<p>
  Integer elementum massa at nulla placerat varius. Suspendisse in libero risus,
  in interdum massa. Vestibulum ac leo vitae metus faucibus gravida ac in neque.
  Nullam est eros, suscipit sed dictum quis, accumsan a ligula.
</p>
```

#### CSS

```css
p {
  font-size: 1.4em;
  text-align: justify;
  text-align-last: center;
}
```

#### Results

## See also

- `text-align`
