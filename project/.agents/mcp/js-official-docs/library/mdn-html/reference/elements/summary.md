---
title: "`<summary>` HTML disclosure summary element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/summary/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<summary>` HTML disclosure summary element

The **`<summary>`** HTML element specifies a summary, caption, or legend for a `` element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `` element open and closed.

```html
<details>
  <summary>
    I have keys but no doors. I have space but no room. You can enter but can't
    leave. What am I?
  </summary>
  A keyboard.
</details>
```

```css
details {
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  padding: 0.5em 0.5em 0;
}

summary {
  font-weight: bold;
  margin: -0.5em -0.5em 0;
  padding: 0.5em;
}

details[open] {
  padding: 0.5em;
}

details[open] summary {
  border-bottom: 1px solid #aaaaaa;
  margin-bottom: 0.5em;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The `<summary>` element's contents can be any heading content, plain text, or HTML that can be used within a paragraph.

A `<summary>` element may _only_ be used as the first child of a `` element. When the user clicks on the summary, the parent `` element is toggled open or closed, and then a `toggle` event is sent to the `` element, which can be used to let you know when this state change occurs.

The content of the `` provides the accessible description for the `<summary>`.

### Default label text

If a `` element's first child is not a `<summary>` element, the user agent will use a default string (typically "Details") as the label for the disclosure box.

### Default style

Per the HTML specification, the default style for `<summary>` elements includes `display: list-item`. This makes it possible to change or remove the icon displayed as the disclosure widget next to the label from the default, which is typically a triangle.

You can also change the style to `display: block` to remove the disclosure triangle.

See the Browser compatibility section for details, as not all browsers support full functionality of this element yet.

For WebKit-based browsers, such as Safari, it is possible to control the icon display through the non-standard CSS pseudo-element `::-webkit-details-marker`. To remove the disclosure triangle, use `summary::-webkit-details-marker { display: none }`.

## Examples

Below are some examples showing `<summary>` in use. You can find more examples in the documentation for the `` element.

### Basic <example-value>

A basic <example-value> showing the use of `<summary>` in a `` element:

```html
<details open>
  <summary>Overview</summary>
  <ol>
    <li>Cash on hand: $500.00</li>
    <li>Current invoice: $75.30</li>
    <li>Due date: 5/6/19</li>
  </ol>
</details>
```

#### Result

### Summaries as headings

You can use heading elements in `<summary>`, like this:

```html
<details open>
  <summary><h4>Overview</h4></summary>
  <ol>
    <li>Cash on hand: $500.00</li>
    <li>Current invoice: $75.30</li>
    <li>Due date: 5/6/19</li>
  </ol>
</details>
```

#### Result

This currently has some spacing issues that could be addressed using CSS.

> **Warning:**
> The role assigned to the `<summary>` element varies across browsers. Some still assign it a default `button` role, which removes all roles from its children. This inconsistency can cause issues for users of assistive technologies such as screen readers (`<h4>` in the previous example will have its role removed and will not be treated as a heading for these users). You should test your `<summary>` implementation on multiple platforms to ensure there's consistent accessibility support.

### HTML in summaries

This example adds some semantics to the `<summary>` element to indicate the label as important:

```html
<details open>
  <summary><strong>Overview</strong></summary>
  <ol>
    <li>Cash on hand: $500.00</li>
    <li>Current invoice: $75.30</li>
    <li>Due date: 5/6/19</li>
  </ol>
</details>
```

#### Result

### Changing the summary's icon

The `<summary>` element's marker, the disclosure triangle, can be customized with CSS. The marker can be targeted using the `::marker` pseudo-element. which accepts the `list-style` shorthand property and its longhand component properties, such as `list-style-type`. This enables changing the triangle to an image (usually with `list-style-image`) or a string (including emojis). In this example, we replace the content of one disclosure widget and remove the icon from another by setting `list-style: none` before adding a custom disclosure icon via generated content.

#### HTML

```html
<h1>Quotes from Helen Keller</h1>

<details>
  <summary>On women's rights</summary>
  <p>
    <q>We have prayed, we have coaxed, we have begged, for the vote, with the
      hope that men, out of chivalry, would bestow equal rights upon women and
      take them into partnership in the affairs of the state. We hoped that
      their common sense would triumph over prejudices and stupidity. We thought
      their boasted sense of justice would overcome the errors that so often
      fetter the human spirit; but we have always gone away empty-handed. We
      shall beg no more.</q>
  </p>
</details>

<details>
  <summary>On optimism</summary>
  <p>
    <q>Optimism is the faith that leads to achievement; nothing can be done
      without hope.</q>
  </p>
</details>
```

#### CSS

In the first disclosure widget, we style the `::marker`, changing the `content` based on the `` element's `[open]` attribute. For the second widget, we remove the marker with `list-style` properties, then add styled generated content with the `::after` pseudo-element. We also include styles for `::-webkit-details-marker` to target Safari. The selector for the browser-specific pseudo-element is included in an `:is()` pseudo-class so it doesn't invalidate the selector list.

```css
details {
  font-size: 1rem;
  font-family: "Open Sans", "Calibri", sans-serif;
  border: solid;
  padding: 2px 6px;
  margin-bottom: 1em;
}

details:first-of-type summary::marker,
:is(::-webkit-details-marker) {
  content: "+ ";
  font-family: monospace;
  color: red;
  font-weight: bold;
}

details[open]:first-of-type summary::marker {
  content: "− ";
}

details:last-of-type summary {
  list-style: none;
  &::after {
    content: "+";
    color: white;
    background-color: darkgreen;
    border-radius: 1em;
    font-weight: bold;
    padding: 0 5px;
    margin-inline-start: 5px;
  }
  [open] &::after {
    content: "−";
  }
}
details:last-of-type summary::-webkit-details-marker {
  display: none;
}
```

The CSS includes the `[open]` attribute selector, matching only when the `open` attribute is present (when the `` are open). The `:first-of-type` and `:last-of-type` pseudo-classes target the first and sibling elements of the same type. We included the prefixed `-webkit-` pseudo-element within a `:is()` pseudo-class as it takes a forgiving selector list, so if the prefixed pseudo-element is invalid in a browser, the whole selector block will not be invalid. We also used CSS nesting. See the CSS selectors module.

#### Result

## Technical summary

       |
        Content categories

       |
        none

       | Permitted content
       |
        Phrasing content, optionally intermixed with
        Heading content

       | Tag omission
       | None; both the start tag and the end tag are mandatory.

       | Permitted parents
       | The `` element.

       | Implicit ARIA role
       |  No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLElement`

## See also

- ``
