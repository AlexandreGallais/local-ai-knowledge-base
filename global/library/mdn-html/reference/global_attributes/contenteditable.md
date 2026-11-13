---
title: "`contenteditable` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/contenteditable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `contenteditable` HTML global attribute

The **`contenteditable`** global attribute is an enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing.

```html
<blockquote contenteditable="true">
  <p>Edit this content to add your own quote</p>
</blockquote>

<cite contenteditable="true">-- Write your own name here</cite>
```

```css
blockquote {
  background: #eeeeee;
  border-radius: 5px;
  margin: 16px 0;
}

blockquote p {
  padding: 15px;
}

cite {
  margin: 16px 32px;
  font-weight: bold;
}

blockquote p::before {
  content: "\201C";
}

blockquote p::after {
  content: "\201D";
}

[contenteditable="true"] {
  caret-color: red;
}
```

## Value

The attribute must take one of the following values:

- `true` or an _empty string_, which indicates that the element is editable.
- `false`, which indicates that the element is not editable.
- `plaintext-only`, which indicates that the element's raw text is editable, but rich text formatting is disabled.

If the attribute is given without a value, like `Example Label`, its value is treated as an empty string.

If this attribute is missing or its value is invalid, its value is _inherited_ from its parent element: so the element is editable if its parent is editable.

Note that although its allowed values include `true` and `false`, this attribute is an _enumerated_ one and not a _Boolean_ one.

You can set the color used to draw the text insertion caret with the CSS `caret-color` property.

Elements that are made editable, and therefore interactive, by using the `contenteditable` attribute can be focused. They participate in sequential keyboard navigation. However, elements with the `contenteditable` attribute nested within other `contenteditable` elements are not added to the tabbing sequence by default. You can add the nested `contenteditable` elements to the keyboard navigation sequence by specifying the `tabindex` value (`tabindex="0"`).

If content is pasted into an element with `contenteditable="true"`, all formatting is retained. If content is pasted into an element with `contenteditable="plaintext-only"`, all formatting is removed.

## Examples

### Pasting content into contenteditable

This example has two `` elements with `contenteditable`, the first with the value `true` and the second with the value `plaintext-only`. Copy the content below and paste it into each `div` to see their effects.

#### HTML

```html
<h2>Content to copy</h2>
<p class="instructions">
  Copy all the text in the block below and paste it into each of the
  contenteditable blocks to compare the results.
</p>
<section class="copying">
  <div class="copy">
    <p>
      This is a paragraph containing <strong>Bold</strong>, <em>Italic</em>, and
      <span class="red">red</span> text, followed by an ordered list:
    </p>
    <ol>
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </ol>
  </div>
</section>
```

```html
<h2>Pasting areas</h2>
<section class="pasting">
  <div class="wrapper">
    <h3>contenteditable="true"</h3>
    <div contenteditable="true"></div>
  </div>
  <div class="wrapper">
    <h3>contenteditable="plaintext-only"</h3>
    <div contenteditable="plaintext-only"></div>
  </div>
</section>
```

```css
h2 {
  margin-bottom: 0;
}
.copying {
  font-family: "Georgia", serif;
  margin: 1rem;
  padding: 1rem;
  border: solid black 1px;
}
.red {
  color: red;
}
.pasting {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  .wrapper {
    flex: 1 1;
    margin: 0;
    padding: 0;
  }
  h3 {
    font-family: monospace;
  }
  [contenteditable] {
    min-height: 3rem;
    border: solid 1px;
    padding: 0.5rem;
    background-color: whitesmoke;
  }
  [contenteditable="true"] {
    caret-color: blue;
  }
  [contenteditable="plaintext-only"] {
    caret-color: red;
  }
}
```

## See also

- All global attributes
- `HTMLElement.contentEditable` and `HTMLElement.isContentEditable`
- The CSS `caret-color` property
- HTMLElement `input` event
