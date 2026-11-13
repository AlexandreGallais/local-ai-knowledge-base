---
title: "`:in-range` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_in-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:in-range` CSS pseudo-class

The **`:in-range`** CSS pseudo-class represents an `` element whose current value is within the range limits specified by the `min` and `max` attributes.

```css
label {
  display: block;
  margin-top: 1em;
}

input:in-range {
  background-color: palegreen;
}
```

```html
<label for="amount">How many tickets? (You can buy 2-6 tickets)</label>
<input id="amount" name="amount" type="number" min="2" max="6" value="4" />

<label for="dep">Departure Date: (Whole year 2022 is acceptable)</label>
<input
  id="dep"
  name="dep"
  type="date"
  min="2022-01-01"
  max="2022-12-31"
  value="2025-05-05" />

<label for="ret">Return Date: (Whole year 2022 is acceptable)</label>
<input id="ret" name="ret" type="date" min="2022-01-01" max="2022-12-31" />
```

This pseudo-class is useful for giving the user a visual indication that a field's current value is within the permitted limits.

> **Note:**
> This pseudo-class only applies to elements that have (and can take) a range limitation. In the absence of such a limitation, the element can neither be "in-range" nor "out-of-range."

## Syntax

```css
:in-range {
  /* ... */
}
```

## Examples

### HTML

```html
<p>
  <label for="value1">How many toes? Values between 1 and 10 are valid.</label>
  <input
    id="value1"
    name="value1"
    type="number"
    placeholder="1 to 10"
    min="1"
    max="10"
    value="12"
    required />
  <span></span>
</p>
```

### CSS

```css
input {
  border: 1px solid black;
}

input:in-range {
  background-color: rgb(0 255 0 / 25%);
}

input:out-of-range {
  background-color: rgb(255 0 0 / 25%);
  border: 2px solid red;
}

input:in-range + span::after {
  content: "Your value is okay.";
}

input:out-of-range + span::after {
  content: "Your value is out of range!";
}
```

### Result

> **Note:**
> An empty `` does not count as out of range, and will not be selected using the `:out-of-range` pseudo-class selector. The `:blank` pseudo-class exists to select blank inputs, although at the time of writing this is experimental and not well-supported. You could also use the `required` attribute and the `:invalid` pseudo-class to provide more general logic and styling for making inputs mandatory (`:invalid` will style blank _and_ out-of-range inputs).

## See also

- `:out-of-range`
- Form data validation
