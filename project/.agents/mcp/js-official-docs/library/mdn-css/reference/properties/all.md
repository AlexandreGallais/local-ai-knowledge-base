---
title: "`all` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/all/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `all` CSS property

The **`all`** CSS shorthand property resets all of an element's properties except `unicode-bidi`, `direction`, and CSS Custom Properties. It can set properties to their initial or inherited values, or to the values specified in another cascade layer or stylesheet origin.

```css
/* no all property */
```

```css
all: initial;
```

```css
all: inherit;
```

```css
all: unset;
```

```css
all: revert;
```

```html
<section id="default-example">
  <div class="example-container-bg">
    <div class="example-container">
      <p id="example-element">
        This paragraph has a font size of 1.5rem and a color of gold. It also
        has 1rem of vertical margin set by the user-agent. The parent of the
        paragraph is a &lt;div&gt; with a dashed blue border.
      </p>
    </div>
  </div>
</section>
```

```css
#example-element {
  color: gold;
  padding: 10px;
  font-size: 1.5rem;
  text-align: left;
  width: 100%;
}

.example-container {
  border: 2px dashed #2d5ae1;
}

.example-container-bg {
  background-color: #77767b;
  padding: 20px;
}
```

## Constituent properties

This property is a shorthand for all CSS properties except for `unicode-bidi`, `direction`, and custom properties.

## Syntax

```css
/* Global values */
all: initial;
all: inherit;
all: unset;
all: revert;
all: revert-layer;
```

### Values

The `all` property is specified as one of the CSS global keyword values. Note that none of these values affect the `unicode-bidi` and `direction` properties.

- `initial`
    Specifies that all the element's properties should be changed to their initial values.
- `inherit`
    Specifies that all the element's properties should be changed to their inherited values.
- `unset`
    Specifies that all the element's properties should be changed to their inherited values if they inherit by default, or to their initial values if not.
- `revert`
    Specifies behavior that depends on the stylesheet origin to which the declaration belongs:
    - If the rule belongs to the author origin, the `revert` value rolls back the cascade to the user level, so that the specified values are calculated as if no author-level rules were specified for the element. For purposes of `revert`, the author origin includes the Override and Animation origins.
    - If the rule belongs to the user origin, the `revert` value rolls back the cascade to the user-agent level, so that the specified values are calculated as if no author-level or user-level rules were specified for the element.
    - If the rule belongs to the user-agent origin, the `revert` value acts like `unset`.
- `revert-layer`
    Specifies that all the element's properties should roll back the cascade to a previous cascade layer, if one exists. If no other cascade layer exists, the element's properties will roll back to the matching rule, if one exists, in the current layer or to a previous style origin.

## Examples

In this example, the CSS file contains styling for the `` element in addition to some styling for the parent `<body>` element. Various outputs in the Results subsection demonstrate how the styling of the `` element is affected when different values are applied to the `all` property inside the `blockquote` rule.

### HTML

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

### CSS

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
  margin: 0;
  padding: 0;
}

blockquote {
  background-color: skyblue;
  color: red;
}
```

### Results

#### A. No `all` property

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
}
```

This is the scenario in which no `all` property is set inside the `blockquote` rule. The `` element uses the browser's default styling which gives it a margin, together with a specific background and text color as specified in the stylesheet. It also behaves as a _block_ element: the text that follows it is beneath it.

#### B. `all: initial`

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
  all: initial;
}
```

With the `all` property set to `initial` in the `blockquote` rule, the `` element doesn't use the browser default styling anymore: it is an _inline_ element now (initial value), its `background-color` is `transparent` (initial value), its `font-size` is `medium`, and its `color` is `black` (initial value).

#### C. `all: inherit`

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
  all: inherit;
}
```

In this case, the `` element doesn't use the browser default styling. Instead, it inherits style values from its parent `<body>` element: it is a _block_ element now (inherited value), its `background-color` is `#F0F0F0` (inherited value), its `font-size` is `small` (inherited value), and its `color` is `blue` (inherited value).

#### D. `all: unset`

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
  all: unset;
}
```

When the `unset` value is applied to the `all` property in the `blockquote` rule, the `` element doesn't use the browser default styling. Because `background-color` is a non-inherited property and `font-size` and `color` are inherited properties, the `` element is an _inline_ element now (initial value), its `background-color` is `transparent` (initial value), but its `font-size` is still `small` (inherited value), and its `color` is `blue` (inherited value).

#### E. `all: revert`

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
  all: revert;
}
```

When the `all` property is set to `revert` in the `blockquote` rule, the `blockquote` rule is considered to be non-existent and the styling property values are inherited from the ones applied to the parent element `<body>`. So the `` element gets styled as a _block_ element, with `background-color` `#F0F0F0`, `font-size` `small`, and `color` `blue` - all values inherited from the `body` rule.

#### F. `all: revert-layer`

```html
<blockquote id="quote">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</blockquote>
Phasellus eget velit sagittis.
```

```css
body {
  font-size: small;
  background-color: #f0f0f0;
  color: blue;
}
blockquote {
  background-color: skyblue;
  color: red;
  all: revert-layer;
}
```

There are no cascade layers defined in the CSS file, so the `` element inherits its style from the matching `body` rule. The `` element here is styled as a _block_ element, with `background-color` `#F0F0F0`, `font-size` `small`, and `color` `blue` - all values inherited from the `body` rule. This scenario is an example of the case when `all` set to `revert-layer` behaves the same as when `all` is set to `revert`.

## See also

CSS global keyword values: `initial`, `inherit`, `unset`, `revert`, `revert-layer`
