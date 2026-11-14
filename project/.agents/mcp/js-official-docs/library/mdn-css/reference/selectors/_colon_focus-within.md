---
title: "`:focus-within` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_focus-within/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:focus-within` CSS pseudo-class

The **`:focus-within`** CSS pseudo-class matches an element if the element or any of its descendants are focused. In other words, it represents an element that is itself matched by the `:focus` pseudo-class or has a descendant that is matched by `:focus`. (This includes descendants in shadow trees.)

This selector is useful, to take a common example, for highlighting an entire `<form>` container when the user focuses on one of its `` fields.

```css
label {
  display: block;
  margin-top: 1em;
}

label:focus-within {
  font-weight: bold;
}
```

```html
<p>Which flavor would you like to order?</p>
<label>Full Name: <input name="firstName" type="text" /></label>
<label
  >Flavor:
  <select name="flavor">
    <option>Cherry</option>
    <option>Green Tea</option>
    <option>Moose Tracks</option>
    <option>Mint Chip</option>
  </select>
</label>
```

## Syntax

```css
:focus-within {
  /* ... */
}
```

## Examples

In this example, the container will receive special coloring styles when either text input receives focus.

### HTML

```html
<ul class="group">
  <li>
    <label for="given-name">Given Name:</label>
    <input id="given-name" type="text" />
  </li>
  <li>
    <label for="family-name">Family Name:</label>
    <input id="family-name" type="text" />
  </li>
</ul>
```

### CSS

```css
.group {
  list-style: none;
  border: 1px solid;
  color: gray;
  padding: 4px;
}

.group:focus-within {
  background: #ffff88;
  color: black;
}

input {
  margin: 4px;
}
```

### Result

Try typing in the text fields.

## See also

- `:focus`
- `:focus-visible`
- Grab your user's attention with the focus-within selector
