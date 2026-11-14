---
title: "Inheritance"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/inheritance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Inheritance

In CSS, **inheritance** controls what happens when no value is specified for a property on an element.

CSS properties can be categorized in two types:

- **inherited properties**, which by default are set to the computed value of the parent element
- **non-inherited properties**, which by default are set to initial value of the property

Refer to any CSS property definition to see whether a specific property inherits by default ("Inherited: yes") or not ("Inherited: no").

## Inherited properties

When no value for an **inherited property** has been specified on an element, the element gets the computed value of that property on its parent element. Only the root element of the document gets the initial value given in the property's summary.

A typical example of an inherited property is the `color` property. Consider the following style rules and the markup:

```css
p {
  color: green;
}
```

```html
<p>This paragraph has <em>emphasized text</em> in it.</p>
```

The words "emphasized text" will appear green, since the `em` element has inherited the value of the `color` property from the `p` element. It does _not_ get the initial value of the property (which is the color that is used for the root element when the page specifies no color).

## Non-inherited properties

When no value for a **non-inherited property** has been specified on an element, the element gets the initial value of that property (as specified in the property's summary).

A typical example of a non-inherited property is the `border` property. Consider the following style rules and the markup:

```css
p {
  border: medium solid;
}
```

```html
<p>This paragraph has <em>emphasized text</em> in it.</p>
```

The words "emphasized text" will not have another border (since the initial value of `border-style` is `none`).

## Notes

The `inherit` keyword allows authors to explicitly specify inheritance. It works on both inherited and non-inherited properties.

You can control inheritance for all properties at once using the `all` shorthand property, which applies its value to all properties. For example:

```css
p {
  all: revert;
  font-size: 200%;
  font-weight: bold;
}
```

This reverts the style of the paragraphs' `font` property to the user agent's default unless a user stylesheet exists, in which case that is used instead. Then it doubles the font size and applies a `font-weight` of `"bold"`.

### Overriding inheritance, an example

Using our previous example with `border`, if we explicitly set the inheritance with `inherit`, we get the following:

```css
p {
  border: medium solid;
}

em {
  border: inherit;
}
```

```html
<p>This paragraph has <em>emphasized text</em> in it.</p>
```

We can see here another border around the word "emphasized text".

## See also

- CSS values for controlling inheritance: `inherit`, `initial`, `revert`, `revert-layer`, and `unset`
- CSS cascading and inheritance module
- CSS error handling
- Introduction to the CSS cascade
- Learn: Handling conflicts
- Learn: Cascade layers
- Introduction to CSS syntax: declarations, rulesets, and statements
- At-rules
- Values: initial, computed, used, and actual
- Value definition syntax
- CSS nesting module
