---
title: "`counter-set` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/counter-set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `counter-set` CSS property

The **`counter-set`** CSS property sets CSS counters on the element to the given values.

If the counters don't exist the `counter-set` property creates a new counter for each named counter in the list of space-separated counter and value pairs. However, to create a new counter it is recommended to use the `counter-reset` CSS property.

If a named counter in the list is missing a value, the value of the counter will be set to `0`.

> **Note:**
> The counter's value can be incremented or decremented using the `counter-increment` CSS property.

```css
counter-set: none;
```

```css
counter-set: chapter-count 0;
```

```css
counter-set: chapter-count;
```

```css
counter-set: chapter-count 5;
```

```css
counter-set: chapter-count -5;
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
  counter-set: chapter-count;
}

#example-element {
  background-color: #37077c;
  color: white;
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
/* Set "my-counter" to 0 */
counter-set: my-counter;

/* Set "my-counter" to -1 */
counter-set: my-counter -1;

/* Set "counter1" to 1, and "counter2" to 4 */
counter-set: counter1 1 counter2 4;

/* Cancel any counter that could have been set in less specific rules */
counter-set: none;

/* Global values */
counter-set: inherit;
counter-set: initial;
counter-set: revert;
counter-set: revert-layer;
counter-set: unset;
```

### Values

This property is specified as either a space-separated list of `<custom-ident>` values, each optionally followed by an `<integer>`, or the keyword `none`:

- `<custom-ident>`
    The name of the counter to set.
- `<integer>`
    The value to set the counter to on each occurrence of the element. Defaults to `0` if not specified. If there isn't currently a counter of the given name on the element, the element will create a new counter of the given name with a starting value of `0` (though it may then immediately set or increment that value to something different).
- `none`
    No counter set is to be performed. This can be used to override a `counter-set` defined in a less specific rule.

## Examples

### Setting named counters

```css
h1 {
  counter-set: chapter section 1 page;
  /* Sets the chapter and page counters to 0,
     and the section counter to 1 */
}
```

## See also

- Using CSS Counters
- `counter-increment`
- `counter-reset`
- `@counter-style`
- `counter()` and `counters()` functions
- `content` property
- CSS lists and counters module
- CSS counter styles module
