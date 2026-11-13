---
title: "`:out-of-range` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_out-of-range/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:out-of-range` CSS pseudo-class

The **`:out-of-range`** CSS pseudo-class represents an `` element whose current value is outside the range limits specified by the `min` and `max` attributes.

```css
label {
  display: block;
  margin-top: 1em;
}

input:out-of-range {
  background-color: orangered;
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

This pseudo-class is useful for giving the user a visual indication that a field's current value is outside the permitted limits.

> **Note:**
> This pseudo-class only applies to elements that have (and can take) a range limitation. In the absence of such a limitation, the element can neither be "in-range" nor "out-of-range."

## Syntax

```css
:out-of-range {
  /* ... */
}
```

## Examples

### HTML

```html
<p>Values between 1 and 10 are valid.</p>
<ul>
  <li>
    <input
      id="value1"
      name="value1"
      type="number"
      placeholder="1 to 10"
      min="1"
      max="10"
      value="12" />
    <label for="value1">Your value is </label>
  </li>
</ul>
```

### CSS

```css
li {
  list-style: none;
  margin-bottom: 1em;
}

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

input:in-range + label::after {
  content: "okay.";
}

input:out-of-range + label::after {
  content: "out of range!";
}
```

## See also

- `:in-range`
- Form data validation
