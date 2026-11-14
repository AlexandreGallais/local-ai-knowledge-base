---
title: "Using container size and style queries (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/containment/container_size_and_style_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container size and style queries

Container queries enable you to apply styles to elements nested within a specific container based on the features of that container. The query returns true or false depending on whether the query condition is true for the container.

Container queries are similar to media queries. The `@media` at-rule enables applying styles to elements based on viewport size or other device characteristics. Similarly, the `@container` at-rule enables applying styles to elements based on a containing element's size or other features, rather than the viewport's. Container queries have the same syntax rules and logical operators as media queries.

```css
@container <container-condition># {
  /* <stylesheet> */
}
```

There are five types of container queries:

- **Container size queries**
    Size queries enable applying styles to elements based on the current size of a containing element, including the orientation and aspect ratio. The containing elements need to be explicitly declared as _size query containers_.

- **Container style queries**
    Style queries enable applying styles to elements based on a containing element's style features, where any non-empty element can be a style query container. A style feature can be a CSS property, CSS custom property, or a valid CSS declaration.
    This allows you to apply styles to any container element's descendants based on its style features — such as whether it has a `display: inline` flex declaration set, or the value of a custom property.

- **Name-only container queries**
    Name-only container queries enable selectively applying styles to an element based on whether it has a specific `container-name` set.

- **Container scroll-state queries**
    Scroll-state queries allow you to selectively apply CSS rules to a container's descendants based on scroll-state conditions, such as whether the queried element is partially scrolled or whether the container is snapped to a scroll snap container. The containing elements need to be explicitly declared as _scroll-state query containers_.

- **Anchored container queries**
    Anchored container queries enable querying whether the container is anchor-positioned and has a position-try fallback option applied to it.

In this guide, we learn the basics of container queries by looking at:

1. container size queries,
2. naming containers to limit their scope, and
3. using the `style()` functional notation within the `@container` at rule's `<container-condition>` to create style queries with custom properties.

## Container size queries

Container size queries are filtered by a size condition. The associated styles are applied to contained elements if the container element has been declared to be a container and the container condition is true for that element. An element's size container is the nearest ancestor with containment.

Elements are declared as _size query containers_ by setting their `container-type` property (or the `container` shorthand) to `size` or `inline-size`.

```css
@container (orientation: landscape) {
  /* styles applied to descendants of this size container */
}

.sizeContainer {
  container-type: size;
}
```

Declaring size query containers adds containment to them. This is a performance necessity — querying the size of every element in the DOM, all the time, would be bad for performance and user experience. Additionally, if a descendant style changed the size of the container element, an infinite loop could occur.

In a container size query, the `<container-condition>` includes one or more `<size-query>`s. Each size query includes a size feature name, a comparison operator, and a value. The size features that can be queried are limited to `width`, `height`, `inline-size`, `block-size`, `aspect-ratio`, and `orientation`. The boolean syntax and logic combining one or more `<size-query>`s is the same as for `@media` size feature queries.

```css
form {
  container-type: inline-size;
}

@container (10em <= width <= 20em) {
  /* styles */
}
```

The `<container-condition>` in this example contains a single `<size-query>` — `(10em <= width <= 20em)`. In this case, all `<form>` elements are potential matches for any unnamed container query. The styles declared within our container query apply to the descendants of all forms between `10em` and `30em` wide, inclusive.

## Naming containers

A `<container-condition>` can include an optional case-sensitive `container-name`. A container name makes the container condition more specific — it is evaluated only against elements that have that name set in the `container-name` property.

The `container-name` property specifies a list of query `<container-name>` values that can be used in `@container` rules to target specific query containers; these are case-sensitive `ident` values. Without a `<container-name>`, the query matches only the nearest container ancestor, and without a `<container-query>`, the query will match elements with the specified `container-name` set on them (see Name-only container queries).

```css
@container [ <container-name>? <container-query>? ]!# {
  /* <stylesheet> */
}
```

Styles inside the named `@container` at rules will be applied only to matching elements inside containers with those names set, which satisfy the container queries.

```css
@container card (orientation: landscape) {
  /* styles */
}

.todo-panel > li {
  container-type: inline-size;
  container-name: card;
}
```

In the above example, the styles within the container query block will apply to the descendants of all `` elements with a width that is greater than their height. Note that other elements with `container-name: card` applied to them that match the size query will also have these styles applied to their elements' descendants.

```css
@container wide (width >= 20em) {
  /* styles applied to descendants of wide .sizeContainer */
}

@container narrow (width < 20em) {
  /* styles applied to descendants of narrow .sizeContainer */
}

.sizeContainer {
  container-type: size;
  container-name: wide narrow;
}
```

In the above example, the element has two container names, `wide` and `narrow`. The descendants of any elements with `class="sizeContainer"` will get the styles from the `wide` or `narrow` query applied.

The default value `container-type: normal` prevents the container from being a size container, but it can still be a style container, and it can still be targeted by a name-only container query. The default value `container-name: none` states the container has no name, but it does not prevent the element from matching unnamed queries.
