---
title: "Consistent list indentation"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/lists/indenting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Consistent list indentation

One of the most common style changes made to lists is a change in the indentation distance—that is, how far the list items are pushed over to the right. This article will help you understand indenting list items so that list item markers are visible.

To understand why this is the case, and more importantly how to avoid the problem altogether, it's necessary to examine the details of list construction.

## Creating a list

### Stand-alone list item

First, we consider the pure list item, not nested in a list of items. When using the HTML `` element, the browser sets the `display` value to `list-item`. Whether list items not nested in a list are provided a marker (otherwise known as a "bullet") depends on the browser. We can remove that bullet with `list-style-type: none`.

```css
li {
  border: 1px dashed red;
}
li:nth-of-type(n + 4) {
  list-style-type: none;
}
```

```css
li {
  width: 15em;
}
```

```html
<p>Default bullets depend on the browser:</p>
<li>A list item</li>
<li>A list item</li>
<li>A list item</li>
<p>These list items have their bullets removed:</p>
<li>A list item</li>
<li>A list item</li>
<li>A list item</li>
```

That dotted red border represents the outer edges of the content area of each list item. At this point, the list items have no padding or borders.

### Nested list items

Now we wrap these in a parent element; in this case, we'll wrap them in an unordered list (i.e., ``). According to the CSS box model, the list items' boxes must be displayed within the parent element's content area.

```css
ul {
  border: 1px dashed blue;
}
li {
  border: 1px dashed red;
  list-style-type: none;
}
```

```css
body {
  width: 15em;
}
```

```html
<ul>
  <li>A list item</li>
  <li>A list item</li>
  <li>A list item</li>
</ul>
```

The dotted blue border shows us the edges of the `` element's content area. That parent comes with both margin and padding. Browsers set the following default styles on unordered lists:

```css
ul {
  /* user-agent styles */
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  padding-inline-start: 40px;
}
```

### Default bullet position

Now we put the list item markers back in. Since this is an unordered list, the list items inherit `list-style-type: disc;` browser styles, which are filled-circle "bullets," from their `` parent.

```css
li {
  border: 1px dashed red;
}
ul {
  border: 1px dotted blue;
}
ul:last-of-type {
  list-style-position: inside;
}
```

```css
ul {
  width: 15em;
}
```

```html
<p>These default to <code>list-style-position: outside</code>.</p>
<ul>
  <li>A list item</li>
  <li>A list item</li>
  <li>A list item</li>
</ul>
<p>These have <code>list-style-position: inside</code> set.</p>
<ul>
  <li>A list item</li>
  <li>A list item</li>
  <li>A list item</li>
</ul>
```

Visually, the markers are _outside_ the content area of the ``, but that's not the important part here. What's key is that the markers are placed outside the "principal box" of the `` elements, not the ``. They're sort of like appendages to the list items, hanging outside the content-area of the `` but still attached to the ``.

This is why, in every modern browser, markers are placed outside any border set for an `` element when the value of `list-style-position` defaults to or is explicitly set to `outside`. When we changed it to `inside`, the markers were brought inside the ``'s content, as though they're an inline box placed at the very beginning of the ``.

## Default indentation

As noted above, all browsers provide the `` parent both margin and padding. While user agents CSS differ somewhat, they all include:

```css
ul,
ol {
  /* user-agent styles */
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  padding-inline-start: 40px;
}
ol {
  list-style-type: decimal;
}
li {
  display: list-item;
  text-align: match-parent;
}
::marker {
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
  text-transform: none;
}
```

All browsers set `padding-inline-start` to 40 pixels for the `` element by default. In left-to-right languages, like English, this is the left _padding_. Any padding set in the author style sheets (that's your stylesheet) takes precedence.

If you want to be explicit, set the following in your style sheets to ensure, unless otherwise overridden, the list items in the main content area of your document, contained in the `` section, are properly indented:

```css
:where(main ol, main ul) {
  margin-inline-start: 0;
  padding-inline-start: 40px;
}
```

And always nest your `` elements in a `` or ``.
