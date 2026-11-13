---
title: "`:only-child` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_only-child/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:only-child` CSS pseudo-class

The **`:only-child`** CSS pseudo-class represents an element without any siblings. This is the same as `:first-child:last-child` or `:nth-child(1):nth-last-child(1)`, but with a lower specificity.

```css
li:only-child {
  color: fuchsia;
}

b:only-child {
  text-decoration: underline;
}
```

```html
<p>Stars expected to attend:</p>
<ol>
  <li>Robert Downey, Jr.</li>
</ol>

<p>Stars yet to confirm:</p>
<ol>
  <li>Scarlett Johansson</li>
  <li>Samuel L. Jackson</li>
  <li>Chris Pratt</li>
</ol>

<p>The ceremony is going to be held in <b>The Dolby Theatre</b>.</p>
```

## Syntax

```css
:only-child {
  /* ... */
}
```

## Examples

### Basic <example-value>

#### HTML

```html
<div>
  <div>I am an only child.</div>
</div>

<div>
  <div>I am the 1st sibling.</div>
  <div>I am the 2nd sibling.</div>
  <div>
    I am the 3rd sibling,
    <div>but this is an only child.</div>
  </div>
</div>
```

#### CSS

```css
div:only-child {
  color: red;
}

div {
  display: inline-block;
  margin: 6px;
  outline: 1px solid;
}
```

#### Result

### A list example

#### HTML

```html
<ol>
  <li>
    First
    <ul>
      <li>This list has just one element.</li>
    </ul>
  </li>
  <li>
    Second
    <ul>
      <li>This list has three elements.</li>
      <li>This list has three elements.</li>
      <li>This list has three elements.</li>
    </ul>
  </li>
</ol>
```

#### CSS

```css
li li {
  list-style-type: disc;
}

li:only-child {
  color: red;
  list-style-type: square;
}
```

#### Result

## See also

- `:only-of-type`
- `:first-child`
- `:last-child`
- `:nth-child`
