---
title: "ID selectors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/id_selectors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ID selectors

The CSS **ID selector** matches an element based on the value of the element's `id` attribute. In order for the element to be selected, its `id` attribute must match exactly the value given in the selector.

```css
/* The element with id="demo" */
#demo {
  border: red 2px solid;
}
```

## Syntax

```css
#id_value {
  /* … */
}
```

Note that syntactically (but not specificity-wise), this is equivalent to the following attribute selector:

```css
[id="id_value"] {
  /* … */
}
```

The `id_value` value must be a valid CSS identifier. HTML `id` attributes which are not valid CSS identifiers must be escaped before they can be used in ID selectors.

## Examples

### Valid ID selectors

#### HTML

```html
<p id="blue">This paragraph has a blue background.</p>
<p>This is just a regular paragraph.</p>
```

```html
<!-- The next two paragraphs have id attributes
that contain characters which must be escaped in CSS -->

<p id="item?one">This paragraph has a pink background.</p>
<p id="123item">This paragraph has a yellow background.</p>
```

#### CSS

```css
#blue {
  background-color: skyblue;
}
```

```css
/* In the next two rules, the id attributes must be escaped */

#item\?one {
  background-color: pink;
}

#\00003123item {
  background-color: yellow;
}
```

#### Result

### Invalid ID selectors

The ID selectors in the following rules are not valid CSS identifiers, and will be ignored.

```css
#item?one {
  background-color: green;
}

#123item {
  background-color: green;
}
```

## See also

- CSS Selectors
- Learn CSS: Basic <example-value>
