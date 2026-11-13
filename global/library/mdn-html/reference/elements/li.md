---
title: "`<li>` HTML list item element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/li/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<li>` HTML list item element

The **``** HTML element is used to represent an item in a list. It must be contained in a parent element: an ordered list (``), an unordered list (``), or a menu (`<menu>`). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.

```html
<p>Apollo astronauts:</p>

<ul>
  <li>Neil Armstrong</li>
  <li>Alan Bean</li>
  <li>Peter Conrad</li>
  <li>Edgar Mitchell</li>
  <li>Alan Shepard</li>
</ul>
```

```css
p,
li {
  font:
    1rem "Fira Sans",
    sans-serif;
}

p {
  font-weight: bold;
}
```

## Attributes

This element includes the global attributes.

- `value`
    This integer attribute indicates the current ordinal value of the list item as defined by the `` element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. This attribute has no meaning for unordered lists (``) or for menus (`<menu>`).
- `type` (deprecated)
    This character attribute indicates the numbering type:
    - `a`: lowercase letters
    - `A`: uppercase letters
    - `i`: lowercase Roman numerals
    - `I`: uppercase Roman numerals
    - `1`: numbers

    This type overrides the one used by its parent `` element, if any.

    > **Note:**
    > This attribute has been deprecated; use the CSS `list-style-type` property instead.

## Examples

For more detailed examples, see the `` and `` pages.

### Ordered list

```html
<ol>
  <li>first item</li>
  <li>second item</li>
  <li>third item</li>
</ol>
```

#### Result

### Ordered list with a custom value

```html
<ol type="I">
  <li value="3">third item</li>
  <li>fourth item</li>
  <li>fifth item</li>
</ol>
```

#### Result

### Unordered list

```html
<ul>
  <li>first item</li>
  <li>second item</li>
  <li>third item</li>
</ul>
```

#### Result

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Flow content.

       | Tag omission
       |
        The end tag can be omitted if the list item is immediately followed by
        another `<li>` element, or if there is no more
        content in its parent element.

       | Permitted parents
       |
        An ``, ``, or
        `<menu>` element. Though not a conforming usage,
        the obsolete `<dir>` can also be a parent.

       | Implicit ARIA role
       |
        <code
          >listitem</code
        >
        when child of an
        <code>ol</code
        >, <code>ul</code> or
        <code>menu</code>

       | Permitted ARIA roles
       |
        `menuitem`,
        `menuitemcheckbox`,
        `menuitemradio`, `option`,
        `none`, `presentation`,
        `radio`, `separator`,
        `tab`, `treeitem`

       | DOM interface
       | `HTMLLIElement`

## See also

- Other list-related HTML Elements: ``, ``, `<menu>`, and the obsolete `<dir>`;
- CSS properties that may be specially useful to style the `` element:
  - the `list-style` property, to choose the way the ordinal is displayed,
  - CSS counters, to handle complex nested lists,
  - the `margin` property, to control the indent of the list item.
