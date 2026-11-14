---
title: "`<hr>` HTML thematic break (horizontal rule) element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/hr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<hr>` HTML thematic break (horizontal rule) element

The **``** HTML element represents a thematic break between elements: for example, a change of scene in a story, or a shift of topic within a section.

```html
<p>§1: The first rule of Fight Club is: You do not talk about Fight Club.</p>

<hr />

<p>§2: The second rule of Fight Club is: Always bring cupcakes.</p>
```

```css
hr {
  border: none;
  border-top: 3px double #333333;
  color: #333333;
  overflow: visible;
  text-align: center;
  height: 5px;
}

hr::after {
  background: white;
  content: "§";
  padding: 0 4px;
  position: relative;
  top: -13px;
}
```

## Attributes

This element's attributes include the global attributes.

- `align` (deprecated) (non-standard)
    Sets the alignment of the rule on the page. If no value is specified, the default value is `left`.
- `color` (deprecated) (non-standard)
    Sets the color of the rule through color name or hexadecimal value.
- `noshade` (deprecated) (non-standard)
    Sets the rule to have no shading.
- `size` (deprecated) (non-standard)
    Sets the height, in pixels, of the rule.
- `width` (deprecated) (non-standard)
    Sets the length of the rule on the page through a pixel or percentage value.

## Usage notes

Historically, the `` element has always been presented as a horizontal rule or line. While it may still be displayed as a horizontal rule in visual browsers, this element is now defined in semantic terms, rather than presentational terms. Therefore, if you wish to draw a horizontal line, you should do so by adding a border to an existing element using CSS.

The `border-*` properties (for example, `border-style` and `border-color`) allow you to significantly customize a line's appearance, whether you are customizing an `` element or a border drawn on a different element.

## Example

### Thematic break between paragraphs

The following example adds a thematic break between paragraph-level elements.

#### HTML

```html
<article>
  <p>
    This is the first paragraph of text. This is the first paragraph of text.
    This is the first paragraph of text. This is the first paragraph of text.
  </p>
  <hr />
  <p>
    This is the second paragraph of text. This is the second paragraph of text.
    This is the second paragraph of text. This is the second paragraph of text.
  </p>
</article>
```

#### Result

### Thematic break between list items

The `` tag can be placed within a list item for visual separation, to create a separator between sections of a list.

#### HTML

```html
<ul>
  <li>Cut</li>
  <li>Copy</li>
  <li>Paste</li>
  <li role="presentation"><hr /></li>
  <li>Delete</li>
</ul>
```

```css
ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100px;
  margin: 0.75rem;
  padding: 0.75rem;
  border: 1px solid lightgrey;
}
hr {
  margin-block: 0.2rem;
  color: lightgrey;
}
```

#### Result

### Thematic break between select options

The `` element is allowed inside a `<select>` element to create a visual separator between `<option>` elements.

#### HTML

```html
<select>
  <option value="">--Choose an option--</option>
  <hr />
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <hr />
  <option value="option3">Option 3</option>
  <option value="option4">Option 4</option>
</select>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |

          Any element that accepts flow content
          `<select>` element

       | Implicit ARIA role
       | `separator`

       | Permitted ARIA roles
       |
        `presentation` or `none`

       | DOM interface
       | `HTMLHRElement`

## See also

- ``
- `` in `<select>`
