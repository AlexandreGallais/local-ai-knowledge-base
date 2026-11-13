---
title: "Using container size and style queries (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/containment/container_size_and_style_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container size and style queries (part 3 of 3)

### Plain versus range syntax in style queries

When a `<style-feature>` includes a value, you can express the comparison in two different ways. They look similar but behave very differently, and choosing the right one matters.

The **plain syntax** uses a colon, the same syntax used in a CSS declaration:

```css
@container style(--n: 3) {
  /* … */
}
```

This form is true if the computed value of the property matches the value on the right. For an unregistered custom property, the computed value is the property'<example-value>'t evaluate `calc()` or other expressions inside it. The match is essentially a comparison of the two values' tokens. To match equivalent values (such as `blue` and `#0000ff`), register the custom property with `@property` and a `syntax` descriptor.

The **range syntax** uses a comparison operator (`=`, `<`, `<=`, `>`, or `>=`):

```css
@container style(--n = 3) {
  /* … */
}
```

To evaluate this form, the browser:

1. Resolves each side (custom property names are looked up as if used with `var()`).
2. Parses each side as one of `<number>`, `<percentage>`, `<length>`, `<angle>`, `<time>`, `<frequency>`, or `<resolution>`. If either side can't be parsed as one of those types, the query is false.
3. If both sides have the same type, computes each side (evaluating any `calc()` expressions) and performs the numeric comparison. Otherwise, the query is false.

Consider the following example, where `--n` is set to a `calc()` expression:

```css
.box {
  --n: calc(6/2);
}

/* Evaluates to FALSE: */
/* the computed value of --n is the string `calc(6/2)`, which is */
/* not equal to the string `3`. */
@container style(--n: 3) {
  /* … */
}

/* Evaluates to TRUE: */
/* both sides are parsed as <integer>, calc(6/2) is computed to 3, */
/* and 3 = 3. */
@container style(--n = 3) {
  /* … */
}
```

The range syntax also supports a three-value form for testing whether a value falls within an interval. Both comparators must point the same way:

```css
@container style(0 < --n < 10) {
  /* true when --n is greater than 0 and less than 10 */
}

@container style(100px > --width > 50px) {
  /* true when --width is less than 100px and greater than 50px */
}
```

The range syntax is also more flexible in how each side is written. Either side can be a custom property name, a `var()` reference, a literal value, or a `calc()` expression, and the operands can appear in any order. The following are all valid:

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

The plain syntax is more restrictive: the left-hand side must be the custom property name (without `var()`), and the value goes on the right. The following are all **invalid**:

```css
@container style(var(--n): 3) {
  /* … */
}
@container style(3: --n) {
  /* … */
}
```

Because the range syntax requires both sides to parse as one of the listed numeric types, it can't be used to compare keyword-like values. For example, given `--s: new`, the query `style(--s = new)` is false (because `new` isn't a number, length, etc.), while `style(--s: new)` is true.

In short:

- Use **`style(--variable: value)`** for keyword-like or string-like matching, such as `style(--stock: low)` or `style(--theme: dark)`.
- Use **`style(--variable = value)`** (or `<`, `<=`, `>`, `>=`) for numeric comparisons, such as `style(--columns >= 3)` or `style(--gap = 1rem)`.

### Nested queries

Container queries can be nested within other container queries. The styles defined inside multiple nested container queries are applied when all of the wrapping container queries are true.

```css
@container style(--theme: red) {
  output {
    outline: 1px dotted;
  }
  @container style(--theme: purple) {
    output {
      outline: 5px dotted;
    }
  }
}
```

In this case, the `<output>` will have a 5px dotted border if it's nested in a container where `--theme: purple` is set, and that container is nested within a container whose `--theme` value is `red`.

### Style query CSS declarations and properties

Not yet supported in any browser, the `style()` functional notation can include regular CSS declarations including CSS properties and property value pairs.

```css
@container style(font-weight: bold) {
  b,
  strong {
    background: yellow;
  }
}
```

When supported, this basic <example-value> will make the background color of any `` and `` elements yellow when the parent is already `bold`.

The matching is done against the computed value of the parent container; if the parent's computed `font-weight` is `bold` (not `bolder` or `900`), there is a match. Just as with custom property container style queries, we did not have to define any elements as style containers as all elements are style containers by default. As long as an element doesn't have a `container-name` set, if it has `font-weight: bold` set or inherited, it will match.

Style features that query a shorthand property will be true if the computed values match for each of its longhand properties, and false otherwise. For example, `@container style(`border`: 2px solid red)` will resolve to true if all 12 longhand properties (`border-bottom-style`, etc.) that make up that shorthand are set to the same equivalent values.

The global CSS values `revert` and `revert-layer` are invalid as values in a `<style-feature>` and cause the container style query to be false.

Do not apply the styles you are querying in the style query to the element you are styling with that query as this may cause an infinite loop.

It is expected that style queries will also accept properties in a boolean context. The style query will return false if the value of the property is the initial value for that property (if it has not been changed), and true otherwise.

```css
@container style(font-weight) {
}
```

The above example will return true for any element that has a value for `font-weight` that differs from its initial value. User-agent stylesheets set `font-weight: bold` for `<heading>` and ` | ` elements, for example. Some browsers set `` and `` to `bold`, others to `bolder`. `<optgroup>` also sometimes has a `font-weight` other than `normal` set by the user agent. As long as the element's `font-weight` is not the default value for that user-agent, the style query will return true.

These features are not yet supported in any browser.

## See also

- Media queries
- CSS `@container` at-rule
- CSS `contain` property
- CSS `container` shorthand property
- CSS `container-name` property
- Using container scroll-state queries
- Understanding `aspect-ratio`
- Getting Started with Style Queries (2022)
- Style queries via una.im (2022)
