---
title: "`counter-increment` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/counter-increment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `counter-increment` CSS property

The **`counter-increment`** CSS property can be used to increase or decrease the value of the named CSS counters by the specified values, or to prevent all counters or an individual counter's value from being changed.

If a named counter in the list of space-separated counters and values doesn't exist, it will be created. If no value is provided for a counter in the list of counters, the counter will be increased by `1`.

The counter's value can be reset to any integer value with the `counter-reset` CSS property.

```css
counter-increment: chapter-count;
```

```css
counter-increment: chapter-count 0;
```

```css
counter-increment: chapter-count 5;
```

```css
counter-increment: chapter-count -5;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="chapters">
    <h1>Alice's Adventures in Wonderland</h1>
    <h2>Down the Rabbit-Hole</h2>
    <h2 id="example-element">The Pool of Tears</h2>
    <h2>A Caucus-Race and a Long Tale</h2>
    <h2>The Rabbit Sends in a Little Bill</h2>
  </div>
</section>
```

```css
#default-example {
  text-align: left;
  counter-reset: chapter-count;
}

#example-element {
  background-color: lightblue;
  color: black;
}

h2 {
  counter-increment: chapter-count;
  font-size: 1em;
}

h2::before {
  content: "Chapter " counter(chapter-count) ": ";
}
```

## Syntax

```css
/* Increases "my-counter" by 1 */
counter-increment: my-counter;

/* Decreases "my-counter" by 1 */
counter-increment: my-counter -1;

/* Increases "counter1" by 1 and decreases "counter2" by 4 */
counter-increment: counter1 counter2 -4;

/* Increases "page" by 1, "section" by 2, while "chapter" doesn't change */
counter-increment: chapter 0 section 2 page;

/* Do not increment/decrement anything: used to override less specific rules */
counter-increment: none;

/* Global values */
counter-increment: inherit;
counter-increment: initial;
counter-increment: revert;
counter-increment: revert-layer;
counter-increment: unset;
```

### Values

This property is specified as a space-separated list of `<custom-ident>` values, each optionally followed by an `<integer>`, or the keyword `none`:

- `<custom-ident>`
    Specifies the name of the counter to increase or decrease.
- `<integer>`
    Specifies the value to add to the counter. If the integer is preceded by a `-` sign, the value will be subtracted from the counter. Defaults to `1` if no value is specified.
- `none`
    Indicates that no counter must be increased or decreased. This value can also be used to cancel all counters from being increased or decreased in more specific rules. This is the default value of the property.

> **Note:**
> Using the `none` value prevents all counters from being increased or decreased for the selected elements where this rule applies. To prevent only specific counters from being increased or decreased, set the `integer` value as `0` on the relevant counter(s).

## Examples

### Decreasing the counter value

In this example, we display a sequence of numbers counting backward. To do this, we use a counter to display numbers starting from 100 and decreasing by 7 each time.

#### HTML

```html
<div>
  <i></i><i></i><i></i><i></i><i></i><i></i><i></i> <i></i><i></i><i></i><i></i
  ><i></i><i></i><i></i> <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
</div>
```

#### CSS

We set the initial value of the counter named `sevens` to `100` by using `counter-reset`. Then, for each ``, we decrease the counter by `7`.

To set the first count at `100`, we target the first `` element by using the `:first-of-type` pseudo-class and setting `counter-increment: none;`. Additionally, the `content` property is used in the `::before` pseudo-element to display the value of the counter using the `counter()` function.

```css
div {
  counter-reset: sevens 100;
}
i {
  counter-increment: sevens -7;
}
i:first-of-type {
  counter-increment: none;
}
i::before {
  content: counter(sevens);
}
```

```css
div {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 300px;
  width: 200px;
}
i {
  flex: 0 0 2em;
}
```

#### Result

Had we not used `counter-reset` (or `counter-set`) to create the counter and set the value to `100`, the `sevens` counter would still have been created, but with an initial value `0`.

## See also

- Counter properties: `counter-set`, `counter-reset`
- Counter at-rule: `@counter-style`
- Counter functions: `counter()`, `counters()`
- Using CSS counters guide
- CSS lists and counters module
- CSS counter styles module
