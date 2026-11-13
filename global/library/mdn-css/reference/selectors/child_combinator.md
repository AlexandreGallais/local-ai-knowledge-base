---
title: "Child combinator"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/child_combinator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Child combinator

The **child combinator** (`>`) is placed between two CSS selectors. It matches only those elements matched by the second selector that are the direct children of elements matched by the first.

```css
/* List items that are children of the "my-things" list */
ul.my-things > li {
  margin: 2em;
}
```

Elements matched by the second selector must be the immediate children of the elements matched by the first selector. This is stricter than the descendant combinator, which matches all elements matched by the second selector for which there exists an ancestor element matched by the first selector, regardless of the number of "hops" up the DOM.

## Syntax

```css
/* The white space around the > combinator is optional but recommended. */
selector1 > selector2 { /* style properties */ }
```

## Examples

### HTML

```html
<div>
  <span>
    Span #1, in the div.
    <span>Span #2, in the span that's in the div.</span>
  </span>
</div>
<span>Span #3, not in the div at all.</span>
```

### CSS

```css
span {
  background-color: aqua;
}

div > span {
  background-color: yellow;
}
```

## See also

- Descendant combinator
