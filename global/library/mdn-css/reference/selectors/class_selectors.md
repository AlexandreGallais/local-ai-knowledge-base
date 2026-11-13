---
title: "Class selectors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/class_selectors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Class selectors

The CSS **class selector** matches elements based on the contents of their `class` attribute.

```css
/* All elements with class="spacious" */
.spacious {
  margin: 2em;
}

/* All <li> elements with class="spacious" */
li.spacious {
  margin: 2em;
}

/* All <li> elements with a class list that includes both "spacious" and "elegant" */
/* For example, class="elegant retro spacious" */
li.spacious.elegant {
  margin: 2em;
}
```

## Syntax

```css
.class_name {
  /* … */
}
```

Note that this is equivalent to the following attribute selector:

```css
[class~="class_name"] {
  /* … */
}
```

The `class_name` value must be a valid CSS identifier. HTML `class` attributes which are not valid CSS identifiers must be escaped before they can be used in class selectors.

## Examples

### Valid class selectors

#### HTML

```html
<p class="red">This paragraph has red text.</p>
<p class="red yellow-bg">
  This paragraph has red text and a yellow background.
</p>
<p class="red fancy">This paragraph has red text and "fancy" styling.</p>
<p>This is just a regular paragraph.</p>
```

```html
<!-- The next two paragraphs have class attributes
that contain characters which must be escaped in CSS -->

<p class="item?one">This paragraph has a pink background.</p>
<p class="123item">This paragraph has a yellow background.</p>
```

#### CSS

```css
.red {
  color: #ff3333;
}

.yellow-bg {
  background: #ffffaa;
}

.fancy {
  font-weight: bold;
  text-shadow: 4px 4px 3px #7777ff;
}
```

```css
/* In the next two rules, the class attributes must be escaped */

.item\?one {
  background-color: pink;
}

.\00003123item {
  background-color: yellow;
}
```

#### Result

### Invalid class selectors

The class selectors in the following rules are not valid CSS identifiers, and will be ignored.

```css
.item?one {
  background-color: green;
}

.123item {
  background-color: green;
}
```

## See also

- CSS Selectors
- Learn CSS: Basic <example-value>
