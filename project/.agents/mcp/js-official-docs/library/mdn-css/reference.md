---
title: "CSS reference"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS reference

Use this **CSS reference** to browse an alphabetical index of all of the standard CSS properties, pseudo-classes, pseudo-elements, data types, functional notations and at-rules. You can also browse key CSS concepts and a list of selectors organized by type. Also included is a brief DOM-CSS / CSSOM reference.

## Basic rule syntax

### Style rule syntax

```plain
style-rule ::=
    selectors-list {
      properties-list
    }
```

Where:

```plain
selectors-list ::=
    selector[:pseudo-class] [::pseudo-element]
    [, selectors-list]

properties-list ::=
    [property : value] [; properties-list]
```

See the index of _selectors_, _pseudo-classes_, and _pseudo-elements_ below. The syntax for each specified _value_ depends on the data type defined for each specified _property_.

#### Style rule examples

```css
strong {
  color: red;
}

div.menu-bar li:hover > ul {
  display: block;
}
```

For a beginner-level introduction to the syntax of selectors, see our guide on CSS Selectors. Be aware that any syntax error in a rule definition invalidates the entire rule. Invalid rules are ignored by the browser. Note that CSS rule definitions are entirely (Unicode) text-based, whereas DOM-CSS / CSSOM (the rule management system) is object-based.

### At-rule syntax

As the structure of at-rules varies widely, please see At-rule to find the syntax of the specific one you want.

## Index

> **Note:**
> This index does not include SVG-exclusive presentation attributes, which can be used as CSS properties on SVG elements.

> **Note:**
> The property names in this index do **not** include the JavaScript names which do differ from the CSS standard names.

## Selectors

The following are the various selectors, which allow styles to be conditional based on various features of elements within the DOM.

### Basic <example-value>

**Basic <example-value>** are fundamental selectors; these are the most basic <example-value> that are frequently combined to create other, more complex selectors.

- Universal selector `*`
- Type selector `elementname`
- Class selector `.classname`
- ID selector `#idname`
- Attribute selector `[attr=value]`

### Grouping selectors

- Selector list `A, B`
    Specifies that both `A` and `B` elements are selected. This is a grouping method to select several matching elements.

### Combinators

Combinators are selectors that establish a relationship between two or more simple selectors, such as "`A` is a child of `B`" or "`A` is adjacent to `B`", creating a complex selector.

- Next-sibling combinator `A + B`
    Specifies that the elements selected by both `A` and `B` have the same parent and that the element selected by `B` immediately follows the element selected by `A` horizontally.
- Subsequent-sibling combinator `A ~ B`
    Specifies that the elements selected by both `A` and `B` share the same parent and that the element selected by `A` comes before—but not necessarily immediately before—the element selected by `B`.
- Child combinator `A > B`
    Specifies that the element selected by `B` is the direct child of the element selected by `A`.
- Descendant combinator `A B`
    Specifies that the element selected by `B` is a descendant of the element selected by `A`, but is not necessarily a direct child.
- Column combinator `A || B` (experimental)
    Specifies that the element selected by `B` is located within the table column specified by `A`. Elements which span multiple columns are considered to be a member of all of those columns.

### Pseudo

- Pseudo classes `:`
    Specifies a special state of the selected element(s).
- Pseudo elements `::`
    Represents entities that are not included in HTML.

> [!CALLOUT]
>
> See also selectors in the Selectors specification and the pseudo-element specification.

## Concepts

### Syntax and semantics

- CSS syntax
- At-rules
- Cascade
- Comments
- Descriptor
- Inheritance
- Shorthand properties
- Specificity
- Values
- Value definition syntax
- CSS values and units
- CSS functional notations

### Values

- Actual value
- Computed value
- Initial value
- Resolved value
- Specified value
- Used value

### Layout

- Block formatting context
- Box model
- Containing block
- Layout mode
- Margin collapsing
- Replaced elements
- Stacking context
- Visual formatting model

## DOM-CSS / CSSOM

### Major object types

- `Document.styleSheets`
- `HTMLElement.style`
- `Element.className`
- `Element.classList`
- `StyleSheetList`
- `CSSRuleList`
- `CSSRule`
- `CSSStyleRule`
- `CSSStyleDeclaration`

### Important methods

- `CSSStyleSheet.insertRule()`
- `CSSStyleSheet.deleteRule()`

## See also

- Mozilla CSS extensions (prefixed with `-moz-`)
- WebKit CSS extensions (mostly prefixed with `-webkit-`)

## External Links

- CSS Indices (w3.org)
