---
title: "`prefix` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/prefix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `prefix` CSS at-rule descriptor

The `@counter-style` rule's **`prefix`** descriptor specifies content that will be added to the beginning of the counter's marker representation.

When the counter value is negative, the `prefix` comes before the negative sign and any other `<symbol>`s added by the `negative` descriptor.

## Syntax

```css
/* <symbol> value: string, image, or identifier */
prefix: "»";
prefix: "Page ";
prefix: url("bullet.png");
```

### Values

The **`prefix`** descriptor takes as its value a single `<symbol>`:

- `<symbol>`
    Specifies a `<symbol>` — a `<string>`, `image`, or `<custom-ident>` — that is prepended to the marker representation.

## Examples

### Adding a prefix to a counter

In this example, each counter number is prefixed by "Book " (with a space) and followed by a colon (`:`). The colon is added with the `suffix` descriptor.

#### HTML

```html
<ol class="books">
  <li>Flamer, by Mike Curato</li>
  <li>Gender Queer: A Memoir, by Maia Kobabe</li>
  <li>Tricks, by Ellen Hopkins</li>
  <li>The Handmaid's Tale: The Graphic Novel, by Margaret Atwood</li>
  <li>Crank, by Ellen Hopkins</li>
</ol>
```

#### CSS

```css
@counter-style books {
  system: numeric;
  symbols: "0" "1" "2" "3" "4" "5" "6" "7" "8" "9";
  prefix: "Book ";
  suffix: ": ";
}

.books {
  list-style: books;
  padding-left: 15ch;
}
```

#### Result

## See also

- Other `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `negative`, `suffix`, `range`, `pad`, `speak-as`, and `fallback`
- `list-style`, `list-style-image`, `list-style-position`
- `symbols()`: the functional notation for creating anonymous counter styles
- CSS counter styles module
- CSS lists and counters module
