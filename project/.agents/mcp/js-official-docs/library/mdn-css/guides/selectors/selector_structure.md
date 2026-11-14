---
title: "CSS selector structure"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/selectors/selector_structure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS selector structure

The CSS selector represents a particular pattern of element or elements in a tree structure. The term "selector" can refer to a simple selector, a compound selector, or a complex selector. When included in the `:has()` pseudo-class as a parameter, these selectors are referred to as relative selectors, representing elements relative to one or more anchor elements.

These selectors can be combined into a comma-separated selector list. If any selector in a non-forgiving selector list is invalid, the entire selector list is invalidated.

## Simple selector

A **simple selector** is a selector with a single component, such as a single type selector, attribute selector, or pseudo-class, that's not used in combination with or contains any other selector component or combinator. A given element is said to match a simple selector when that simple selector accurately describes the element. Any selector that contains a single basic <example-value>, attribute selector, pseudo-class, or pseudo-element selector is a simple selector.

```css
#myId {
}

[pattern*="\d"] {
}
```

## Compound selector

A **compound selector** is a sequence of simple selectors that are not separated by a combinator. A compound selector represents a set of simultaneous conditions on a single element. A given element is said to match a compound selector when the element matches all the simple selectors in the compound selector.

```css
a#selected {
}

[type="checkbox"]:checked:focus {
}
```

In a compound selector, the type selector or universal selector must come first in the sequence of selectors. Only one type selector or universal selector is allowed in the sequence. As whitespace represents the descendant combinator, no whitespace is allowed between the simple selectors that make up a compound selector.

## Complex selector

A **complex selector** is a sequence of one or more simple and/or compound selectors that are separated by combinators, including the white space descendant combinator.

A complex selector represents a set of simultaneous conditions on a set of elements.

```css
a#selected > .icon {
}

.box h2 + p {
}
```

Selectors can be read from right to left. For example, `a#selected > .icon` matches all elements with a class of `icon` that are the direct children of the `` element with the id `selected`. The selector `.box h2 + p` matches the first ``s to come immediately after any `<h2>` elements that are descendants of any element with the class of `box`.

## Selector list

A **selector list** is a comma-separated list of simple, compound, and/or complex selectors. A given element is said to match a selector list when the element matches any (at least one) of the selectors in that selector list.

```css
#main,
article.heading {
}
```

If any selector in a non-forgiving selector list is invalid, the entire selector list is invalidated.

```css
#main,
:bad-pseudoclass,
.validClass {
  /* `:bad-pseudoclass` is invalid, invalidating this style block */
}
```

The `:is()` and `:where()` pseudo-classes can be used to construct forgiving selector lists.

## Relative selector

A **relative selector** is a selector representing an element relative to one or more anchor elements preceded by a combinator. Relative selectors that don't begin with an explicit combinator have an implied descendant combinator.

Relative selectors cannot be used in a selector list. Rather, it is accepted within certain contexts, such as the `:has()` pseudo-class.

```css
:has(+ div#topic > #reference) {
}

:has(> .icon) {
}

dt:has(+ img) ~ dd {
}
```

## See also

- CSS selectors and combinators
- Forgiving selector list
- `Document.querySelector()`
- `Document.querySelectorAll()`
- CSS selectors module
- CSS pseudo-elements module
