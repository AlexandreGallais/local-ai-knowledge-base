---
title: "CSS combinators"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/combinators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS combinators

CSS **combinators** define relationships between selectors. They allow you to select elements based on their relationship to other elements in the document tree.

For example, to style only paragraph elements that are direct children of a ``, you can use the child combinator (`>`):

```css
/* Set top margin on <p> elements that are direct children of <div> */
div > p {
  margin-top: 0;
}
```

## Syntax

```css
/* Combine selectors to express relationships */
selector1 combinator selector2 {
  property: value;
}
```

## Index of combinators

- Child combinator (`>`)
- Column combinator (`||`)
- Descendant combinator (" ")
- Next-sibling combinator (`+`)
- Subsequent-sibling combinator (`~`)

## See also

- CSS selectors module
- Selectors and combinators
