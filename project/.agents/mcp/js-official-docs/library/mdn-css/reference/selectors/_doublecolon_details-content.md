---
title: "`::details-content` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_details-content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::details-content` CSS pseudo-element

The **`::details-content`** CSS pseudo-element represents the expandable/collapsible contents of a `` element.

```css
details[open]::details-content {
  color: dodgerblue;
  padding: 0.5em;
  border: thin solid grey;
}
```

```html
<details open>
  <summary>Example summary</summary>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <p>
    Architecto cupiditate ea optio modi quas sequi, esse libero asperiores
    debitis eveniet commodi hic ad.
  </p>
</details>
```

## Syntax

```css
selector::details-content
```

## Examples

### Basic <example-value>

This example demonstrates basic usage of the `::details-content` pseudo-element to style the content of a `` element.

#### HTML

Our `` element includes a `<summary>` element, whose contents will always be visible. The details content includes a `` element.

```html
<details>
  <summary>Click me</summary>
  <p>Here is some content</p>
</details>
```

#### CSS

We set a `background-color` on the `::details-content` pseudo-element:

```css
details::details-content {
  background-color: #a29bfe;
}
```

#### Result

Click on the summary to view the detail contents.

### Transition example

In this example the `::details-content` pseudo-element is used to set a transition on the content of the `` element so that it smoothly fades into view when expanded, and fades out again when collapsed.

#### HTML

The HTML is the same as in the previous example.

```html
<details>
  <summary>Click me</summary>
  <p>Here is some content</p>
</details>
```

#### CSS

To achieve our transition, we specify two separate transitions inside the `transition` shorthand property:

- The `opacity` property is given a basic <example-value> over `600ms` to create the fade-in/fade-out effect.
- The `content-visibility` property (which is toggled between `hidden` and `visible` when the `` content is expanded/collapsed) is given a `600ms` transition with the `transition-behavior` value `allow-discrete` specified. This opts the browser into having a transition started on `content-visibility`, the animation behavior of which is discrete. The effect is that the content is visible for the entire duration of the transition, allowing other transitions to be seen. If this transition was not included, the content would immediately disappear when the `` content was collapsed — you wouldn't see the smooth fade-out.

```css
details::details-content {
  opacity: 0;
  transition:
    opacity 600ms,
    content-visibility 600ms allow-discrete;
}

details[open]::details-content {
  opacity: 1;
}
```

#### Result

To see the animation, toggle the visibility of the detail contents by clicking on the summary.

## See also

- ``
- `<summary>`
