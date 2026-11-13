---
title: "CSS selectors and combinators"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/selectors/selectors_and_combinators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS selectors and combinators

CSS selectors are used to define a pattern of the elements that you want to select for applying a set of CSS rules on the selected elements. Combinators define the relationship between the selectors. Using various selectors and combinators, you can precisely select and style the desired elements based on their type, attributes, state, or relationship to other elements.

## Types of selectors

There are over 80 selectors and combinators. CSS selectors can be grouped into the following categories based on the type of elements they can select.

### Basic <example-value>

The type selector selects all elements that have the given node name. For example, `div` will select all `` elements and `input` will match any `` element. The universal selector, denoted with an asterisk (`*`), is a special type selector that selects all elements.

The class selector selects all elements that have the given `class` attribute denoted by the class name prefixed with a period (`.`). For example, `.index` will match any element that has `class="index"`. The ID selector selects an element based on the value of its `id` attribute. The selector is the `id` prefixed with a "number sign" (U+0023, `#`). For example, `#toc` will match the element that has `id="toc"`. Both `class` and `id` are global attributes. There should be only one element with a given `id` in a document; but if there is more than one, the ID selector will match all the elements with that `id`.

When combining a type or universal selector with a class or id selector to create a compound selector, the type or universal selector must precede the class or id.

#### HTML

```html
<p class="myClass" id="myId">I match everything.</p>
<p>I match the universal and type selectors only.</p>
```

#### CSS

In this example, we declare four simple selectors and one compound selector using the four basic <example-value> types, as described above.

```css
* {
  font-style: italic;
}
p {
  color: red;
}
.myClass {
  text-decoration: underline;
}
#myId {
  font-family: monospace;
}
p.myClass#myId {
  font-size: 1.5rem;
}
```

#### Result

## Combinators

Using CSS combinators, we can combine selectors to select DOM nodes based on their relationship to other elements within the document node tree. This combining of selectors with combinators creates complex selectors.

### Descendant combinator

The descendant combinator, denoted with one or more spaces, selects nodes that are descendants of the first element. For example, `div span` will match all `` elements that are inside a `` element.

### Child combinator

The child combinator is more specific than the descendant combinator. Denoted with the greater than character (`>`), the child combinator selects nodes that are direct children of the first element. Comparing with our previous example, `div > span` will match only the `` elements that are direct children of a `` element.

### Subsequent-sibling combinator

In addition to descendant selectors, CSS also enables selecting elements based on their siblings. The subsequent-sibling combinator, denoted with a tilde (`~`), selects siblings. Given `A ~ B`, all elements matching `B` will be selected if they are preceded by `A`, provided both `A` and `B` share the same parent. For example, `h2 ~ p` will match all `` elements that follow an `<h2>`, immediately or not.

### Next-sibling combinator

The next-sibling combinator, denoted by the plus symbol (`+`), is similar to the subsequent-sibling. However, given `A + B`, it only matches `B` if `B` is immediately preceded by `A`, with both sharing the same parent. Amending our previous example, `h2 + p` will match only the single `` element that _immediately_ follows an `<h2>` element.

### Column combinator

There is also a column combinator, denoted by two pipe characters (`||`), which, when supported, selects nodes that belong to a column. For example, `col || td` will match all ` | ` elements that belong to the scope of the ``.

### Namespace separator

The namespace separator is another combinator that is generally used in conjunction with the `@namespace` at-rule. This combinator is denoted by a single pipe character (`|`). It enables limiting type selectors and the universal selector to a specific namespace. For example, by defining a namespace such as `@namespace SVG url('http://www.w3.org/2000/svg');`, you can include selectors that target elements nested in an SVG namespace only. Declaring `SVG|a` would match links within SVGs and not those in the rest of the document. Namespacing can be useful to target MathML, SVG, or other XML-based content within your HTML.

#### HTML

```html
<h2 class="myClass" id="myId">
  No selectors match. <span class="myClass">This span has an outline</span> as
  it is both myClass and a child of #myId.
</h2>
<p>The first paragraph is underlined. All the paragraphs are 1.1rem.</p>
<p>
  The second paragraph is red. This and the following paragraphs are italic.
</p>
<p>The third paragraph is NOT red. It is italic and 1.1rem.</p>
<p class="myClass">
  Does not have an outline; this is a sibling of H2, not a child. It is italic
  and 1.1rem.
</p>
```

#### CSS

In this example, we declare five relative selectors using simple selectors combined with combinators.

```css
h2 + p ~ p {
  font-style: italic;
}
h2 + p + p {
  color: red;
}
.myClass + p {
  text-decoration: underline;
}
#myId > .myClass {
  outline: 3px dashed red;
}
* > p {
  font-size: 1.1rem;
}
```

#### Result

### Creating complex selectors with CSS nesting

The above complex selectors can also be defined using simple selectors, combinators, and CSS nesting, with or without the `&` nesting selector.

#### HTML

```html
<h2 class="myClass" id="myId">
  No selectors match. <span class="myClass">This span has an outline</span> as
  it is both myClass and a child of #myId.
</h2>
<p>The first paragraph is underlined. All the paragraphs are 1.1rem.</p>
<p>
  The second paragraph is red. This and the following paragraphs are italic.
</p>
<p>The third paragraph is NOT red. It is italic and 1.1rem.</p>
<p class="myClass">
  Does not have an outline; this is a sibling of H2, not a child. It is italic
  and 1.1rem.
</p>
```

#### CSS

In this example, we replicate the same five relative selectors using simple selectors combined with combinators, but this time with CSS nesting.

```css
h2 {
  & + p {
    & ~ p {
      font-style: italic;
    }
    & + p {
      color: red;
    }
  }
}
.myClass {
  & + p {
    text-decoration: underline;
  }
}
#myId {
  & > .myClass {
    outline: 3px dashed red;
  }
}
* {
  & > p {
    font-size: 1.1rem;
  }
}
```

#### Result

## Attribute selectors

Attribute selectors select all elements that, depending on how the selector is written, either have the given attribute or have the given attribute with a substring value match.
For example, `[type]` will match all elements that have the `type` attribute set (to any value), and `[type="submit"]` will match `` and ``, or any element with `type="submit"` set, even though this attribute-value pair is only supported on `` and `` elements. The match is case-insensitive.

The case sensitivity of the attribute depends on the language. Generally, in HTML, if an attribute is enumerated, the value in the selector is case-insensitive, even if the value is not one of the enumerated values or if the attribute is not a valid value for the element on which it is set. For non-enumerated attributes, like `class`, `id`, or any `data-*` attribute, or for non-HTML attributes, like `role` or `aria-*` attributes, the value match is case-sensitive; the match can be made case-insensitive with a case-insensitive modifier (`i`).

## Pseudo-class selectors

The CSS selectors module defines over 60 pseudo-classes. Pseudo-classes are simple selectors, prefixed with a colon (`:`), that allow the selection of elements based on state information that is not contained in the document tree. `pseudo-classes` can be used to style an element based on its _state_.
For example, the `:target` simple selector targets element of a URL containing a fragment identifier, and the `a:visited` compound selector matches all `` elements that have been visited by a user.

The pseudo-classes can be categorized as element display state, input, linguistic, location, resource state, time-dimensional, tree-structural, user action, and functional.

Multiple pseudo-classes can be combined to create compound selectors. When combining a pseudo-class into a compound selector with a type or universal selector, the pseudo-class must follow the type selector or universal selector, if present.

## Pseudo-element selectors

Not all CSS selectors are defined in the CSS selectors module. CSS pseudo-element selectors are defined in the CSS pseudo-elements module.

CSS pseudo-elements, prefixed with two colons (`::`), represent entities that are not included in HTML. For example, the simple `::marker` selector selects list item bullets, and the compound selector `p::first-line` matches the first line of all `` elements.

## Specifications

See the pseudo-classes and pseudo-elements specification tables for details on those.

## See also

- Selector list
- CSS selector structure
- Specificity
- CSS nesting module
