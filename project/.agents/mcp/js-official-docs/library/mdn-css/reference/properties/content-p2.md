---
title: "`content` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `content` CSS property (part 2 of 2)

## Examples

The first five examples create generated content on pseudo-elements. The last three are examples of element replacement.

### Appending strings based on an element's class

This example inserts generated text after the text of elements that have a particular class name. The text is colored red.

#### HTML

```html
<h2>Paperback Best Sellers</h2>
<ol>
  <li>Political Thriller</li>
  <li class="new-entry">Halloween Stories</li>
  <li>My Biography</li>
  <li class="new-entry">Vampire Romance</li>
</ol>
```

#### CSS

```css
.new-entry::after {
  content: " New!"; /* The leading space creates separation
                       between the DOM node's content and the generated content
                       being added. */
  color: red;
}
```

#### Result

### Quotes

This example inserts differently colored quotation marks around quotes.

#### HTML

```html
<p>
  According to Sir Tim Berners-Lee,
  <q cite="http://www.w3.org/People/Berners-Lee/FAQ.html#Internet">
    I was lucky enough to invent the Web at the time when the Internet already
    existed - and had for a decade and a half.
  </q>
  We must understand that there is nothing fundamentally wrong with building on
  the contributions of others.
</p>
<p lang="fr-fr">
  Mais c'est Magritte qui a dit,
  <q lang="fr-fr"> Ceci n'est pas une pipe. </q>.
</p>
```

#### CSS

```css
q {
  color: blue;
}

q::before,
q::after {
  font-size: larger;
  color: red;
  background: #cccccc;
}

q::before {
  content: open-quote;
}

q::after {
  content: close-quote;
}
```

#### Result

Note the type of quotes generated is based on the language. Browsers add open- and close-quotes before and after `<q>` elements by default, so the quotes in this example would appear without them being explicitly set. They could have been turned off by setting the respective `content` property values to `no-open-quote` and `no-close-quote`, or by setting them both to `none`. They can also be turned off by setting the `quotes` property to `none` instead.

### Adding text to list item counters

This example combines a counter sandwiched between two `<string>`s prepended to all list items, creating a more detailed marker for list items (``) within unordered lists (``).

#### HTML

```html
<ol>
  <li>Dogs</li>
  <li>Cats</li>
  <li>
    Birds
    <ol>
      <li>Owls</li>
      <li>Ducks</li>
      <li>Flightless</li>
    </ol>
  </li>
  <li>Marsupials</li>
</ol>
```

#### CSS

```css
ol {
  counter-reset: items;
  margin-left: 2em;
}
li {
  counter-increment: items;
}
li::marker {
  content: "item " counters(items, ".", numeric) ": ";
}
```

#### Result

The generated content on each list item's marker adds the text "item " as a prefix, including a space to separate the prefix from the counter, which is followed by ": ", a colon and an additional space. The `counters()` function defines a numeric `items` counter, in which the numbers of nested ordered lists have their numbers separated with a period (`.`) in most browsers.

### Strings with attribute values

This example is useful for print stylesheets. It uses an attribute selector to select every fully qualified secure link, adding the value of the `href` attribute after the link text as the content of the `::after` pseudo-element.

#### HTML

```html
<ul>
  <li><a href="https://mozilla.com">Mozilla</a></li>
  <li><a href="/">MDN</a></li>
  <li><a href="https://openwebdocs.org">OpenWebDocs</a></li>
</ul>
```

#### CSS

```css
a[href^="https://"]::after {
  content: " (URL: " attr(href) ")";
  color: darkgreen;
}
```

#### Result

The generated content is the value of the `href` attribute, prepended by "URL: ", with a space, all in parentheses.

### Adding an image with alternative text

This example inserts an image before all links. Two `content` values are provided. The later `content` value includes an image with alternative text that a screen reader can output as speech.

#### HTML

```html
<a href="https://www.mozilla.org/en-US/">Mozilla Home Page</a>
```

#### CSS

The CSS to show the image and set the alternative text is shown below.
This also sets the font and color for the content.

```css
a::before {
  content: url("https://mozorg.cdn.mozilla.net/media/img/favicon.ico") /
    " MOZILLA: ";
}
```

#### Result

> **Note:**
> The alternative text value is exposed in the browser's accessibility tree. Refer to the See also section for browser-specific accessibility panels.

If using a screen reader, it should speak the word "MOZILLA" when it reaches the image. You can select the `::before` pseudo-element with your developer tools selection tool, and view the accessible name in the accessibility panel.

### Including counters in alternative text

This example features a list of links to a set of book chapters, and shows how to use generated content to include a book icon and a counter before each one, with alternative text that includes the literal word "Chapter" in place of the icon. This results in the word "chapter" and the chapter number preceding the text in each link's accessible name, which will be announced to screen reader users when the link receives focus.

#### HTML

We include a heading followed by an ordered list of chapter title links using ``, ``, and `` elements.

```html
<h2>Chapter list</h2>
<ol>
  <li><a href="#">A stranger calls</a></li>
  <li><a href="#">Two owls</a></li>
  <li><a href="#">Dinner was bland</a></li>
  <li><a href="#">Three owls</a></li>
  <li><a href="#">No-one answered the door</a></li>
  <li><a href="#">The stranger leaves</a></li>
  <li><a href="#">Bedtime</a></li>
</ol>
```

#### CSS

The CSS includes a `counter-reset` for the `chapter` counter on the `` element. We also increment the `chapter` counter on each `` element using `counter-increment`, and remove the list markers by setting a `list-style-type` value of `none`.

```css
ol {
  counter-reset: chapter;
}

li {
  counter-increment: chapter;
  list-style-type: none;
}
```

Next, we set the `` elements' `::before` pseudo-elements to have generated `content` equal to a book emoji to represent a chapter, plus the current `chapter` counter value, and a space character so that the generated content is separated from the link text. Finally, we set the generated content's alt text to the current `chapter` counter value preceded by the word "Chapter".

```css
a::before {
  content: "📖 " counter(chapter) " " / "Chapter " counter(chapter);
}
```

#### Result

When a screen reader navigates to a link within the list, supporting browsers will announce "Chapter" followed by the current counter number, followed by the link text, for example, "Chapter 1 A stranger calls" and "Chapter 2 Two owls".

### Element replacement with URL

This example replaces a regular element! The element's contents are replaced with an SVG using the `<url>` type.

Pseudo-elements aren't rendered on replaced elements. As this element is replaced, any matching `::after` or `::before` are not generated or applied. To demonstrate this, we include an `::after` declaration block, attempting to add the `id` as generated content. This pseudo-element will not be generated as the element is replaced.

#### HTML

```html
<div id="replaced">This content is replaced!</div>
```

#### CSS

```css
#replaced {
  content: url("mdn.svg");
}

/* will not show if element replacement is supported */
div::after {
  content: " (" attr(id) ")";
}
```

#### Result

When generating content on regular elements (rather than just on pseudo-elements), the entire element is replaced. This means that `::before` and `::after` pseudo-elements are not generated.

### Element replacement with `<gradient>`

This example demonstrates how an element's contents can be replaced by any type of `<image>`, in this case, a CSS gradient. The element's contents are replaced with a `linear-gradient()`. We provide alt text because all images should be described for accessibility.

#### HTML

```html
<div id="replaced">I disappear</div>
```

#### CSS

```css
div {
  border: 1px solid;
  background-color: #cccccc;
  min-height: 100px;
  min-width: 100px;
}

#replaced {
  content: repeating-linear-gradient(blue 0, orange 10%) /
    "Gradients and alt text are supported";
}
```

#### Result

Check the browser compatibility chart. All browsers support gradients and all browsers support replacing elements with images, but not all browsers support gradients as a `content` value.

### Element replacement with `image-set()`

This example replaces an element's content with an `image-set()`. If the users display has normal resolution the `1x.png` will be displayed. Screens with a higher resolution will display the `2x.png` image.

#### HTML

```html
<div id="replaced">I disappear!</div>
```

#### CSS

```css
div {
  width: 100px;
  border: 1px solid lightgrey;
}
```

```css
#replaced {
  content: image-set(
    "1x.png" 1x,
    "2x.png" 2x
  ) / "DPI";
}
```

#### Result

## See also

- `::after`
- `::before`
- `::marker`
- `::scroll-button()`
- `::scroll-marker`
- `:target-current`
- `contain`
- `quotes`
- `<gradient>`
- `image-set()`
- `<url>`
- Replaced elements
- CSS generated content module
- CSS lists and counters module
- Browser accessibility panels: Firefox Accessibility inspector, Chrome Accessibility pane, and Safari Accessibility tree
