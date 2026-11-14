---
title: "`@container` CSS at-rule (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@container/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@container` CSS at-rule (part 3 of 3)

## Examples

### Setting styles based on a container's size

Consider the following example of a card component with a title and some text:

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

A container context can be created using the `container-type` property, in this case using the `inline-size` value on the `.post` class.
You can then use the `@container` at-rule to apply styles to the element with the `.card` class in a container that's narrower than `650px`.

```js
const post = document.querySelector(".post");
const span = document.createElement("span");
span.textContent = `.post width: ${post.clientWidth}px`;
post.parentNode.insertBefore(span, post.nextSibling);
// update on resize
window.addEventListener("resize", () => {
  span.textContent = `.post width: ${post.clientWidth}px`;
});
```

```css
span {
  display: block;
  text-align: center;
}
.card {
  margin: 10px;
  border: 2px dotted;
  font-size: 1.5em;
}
.post {
  border: 2px solid;
}
```

```css
/* A container context based on inline size */
.post {
  container-type: inline-size;
}

/* Apply styles if the container is narrower than 650px */
@container (width < 650px) {
  .card {
    width: 50%;
    background-color: lightgray;
    font-size: 1em;
  }
}
```

### Creating named container contexts

Given the following HTML example which is a card component with a title and some text:

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

First, create a container context using the `container-type` and `container-name` properties.
The shorthand syntax for this declaration is described in the `container` page.

```css
.post {
  container-type: inline-size;
  container-name: summary;
}
```

Next, target that container by adding the name to the container query:

```css
@container summary (width >= 400px) {
  .card {
    font-size: 1.5em;
  }
}
```

### Nested container queries

It's not possible to target multiple containers in a single container query.
It is possible to nest container queries which has the same effect.

The following query evaluates to true and applies the declared style if the container named `summary` is wider than `400px` and has an ancestor container wider than `800px`:

```css
@container summary (width > 400px) {
  @container (width > 800px) {
    /* <stylesheet> */
  }
}
```

### Container style queries

Container queries can also evaluate the computed style of the container element. A _container style query_ is a `@container` query that uses one or more `style()` functional notations. The boolean syntax and logic combining style features into a style query is the same as for CSS feature queries.

```css
@container style(<style-feature>),
    not style(<style-feature>),
    style(<style-feature>) and style(<style-feature>),
    style(<style-feature>) or style(<style-feature>) {
  /* <stylesheet> */
}
```

The parameter of each `style()` is a single `<style-feature>`. A **`<style-feature>`** can be a valid CSS declaration (the **plain** form), a CSS property or `<custom-property-name>` on its own (the **boolean** form), or a range comparison (the **range** form).

```css
@container style(--themeBackground),
    not style(background-color: red),
    style(color: green) and style(background-color: transparent),
    style(--themeColor: blue) or style(--themeColor: purple) {
  /* <stylesheet> */
}
```

A style feature without a value evaluates to true if the computed value is different from the initial value for the given property.

If the `<style-feature>` passed as the `style()` function's argument is a declaration, the style query evaluates to true if the declaration's value is the same as the computed value of that property for the container being queried. Otherwise, it resolves to false.

The following container query checks if the computed value of the container element's `--accent-color` is `blue`:

```css
@container style(--accent-color: blue) {
  /* <stylesheet> */
}
```

> **Note:**
> If a custom property has a value of `blue`, the equivalent hexadecimal code `#0000ff` will not match unless the property has been defined as a color with `@property` so the browser can properly compare computed values.

Style features that query a shorthand property are true if the computed values match for each of its longhand properties, and false otherwise. For example, `@container style(border: 2px solid red)` will resolve to true if all 12 longhand properties (`border-bottom-style`, etc.) that make up that shorthand are true.

Note that `!important` is allowed in style queries but is ignored.

```css
/* !important is valid but has no effect */
@container style(--themeColor: purple !important) {
  /* <stylesheet> */
}
```

The global `revert` and `revert-layer` are invalid as values in a `<style-feature>` and cause the container style query to be false.

#### Range syntax

In addition to the plain `<style-feature-name>: <value>` form described above, a `<style-feature>` can be written as a **range** comparison using `=`, `<`, `<=`, `>`, or `>=`. Range syntax enables **numeric** comparisons that the plain form can't, such as `style(--columns >= 3)` or `style(--gap = 1rem)`. It compares the resolved values of both sides numerically.

To evaluate a range, the browser:

1. Resolves each side (custom property names are looked up as if used with `var()`).
2. Parses each side as a `<number>`, `<percentage>`, `<length>`, `<angle>`, `<time>`, `<frequency>`, or `<resolution>`. If either side can't be parsed as one of those types, or the two sides don't have the same type, the query is false.
3. Computes each side (evaluating any `calc()` expressions) and performs the numeric comparison.

This means range syntax can't be used to compare keyword-like values: `style(--theme = dark)` is always false because `dark` isn't a numeric type. Use the plain syntax for those, for example `style(--theme: dark)`.

Either side of a range can be a custom property name, a `var()` reference, a literal value, or a `calc()` expression, in either order:

```css
@container style(3 = --n) {
  /* … */
}
@container style(var(--n) = 3) {
  /* … */
}
@container style(calc(6/2) = var(--n)) {
  /* … */
}
```

A range can also take a three-value form, with both comparators pointing the same way, to test whether a value falls within an interval:

```css
@container style(0 < --n < 10) {
  /* true when --n is greater than 0 and less than 10 */
}
@container style(100px > --width > 50px) {
  /* true when --width is less than 100px and greater than 50px */
}
```

In other words, `style(0 < --n < 10)` is equivalent to `style(0 < --n) and style(--n < 10)`. The middle value is tested against both bounds, rather than being chained left-to-right.

> **Note:**
> Plain and range syntax behave differently even when they look similar. Given `--n: calc(6/2)`, the query `style(--n: 3)` is **false** because the plain form compares the property's computed value (`calc(6/2)`) directly against `3`. The equivalent range query `style(--n = 3)` is **true** because the range form computes both sides numerically before comparing. See Plain versus range syntax in style queries in the container style queries guide for more details.

### Scroll-state queries

See Using container scroll-state queries for scroll-state query examples.

### Anchored queries

See Using anchored container queries for anchored query examples.

## See also

- Using container queries
- Using container size and style queries
- Using container scroll-state queries
- Using anchored container queries
- `container-name`
- `container-type`
- `contain`
- `content-visibility`
- `CSSContainerRule` API
- CSS containment module
- CSS at-rule functions
