---
title: "`:enabled` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_enabled/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:enabled` CSS pseudo-class

The **`:enabled`** CSS pseudo-class represents any enabled element. An element is enabled if it can be activated (selected, clicked on, typed into, etc.) or accept focus. The element also has a disabled state, in which it can't be activated or accept focus.

```css
label {
  display: block;
  margin-top: 1em;
}

*:enabled {
  background-color: gold;
}
```

```html
<form>
  <label for="name">Name:</label>
  <input id="name" name="name" type="text" />

  <label for="emp">Employed:</label>
  <select id="emp" name="emp" disabled>
    <option>No</option>
    <option>Yes</option>
  </select>

  <label for="empDate">Employment Date:</label>
  <input id="empDate" name="empDate" type="date" disabled />

  <label for="resume">Resume:</label>
  <input id="resume" name="resume" type="file" />
</form>
```

## Syntax

```css
:enabled {
  /* ... */
}
```

## Examples

The following example makes the color of text and button ``s green when enabled, and gray when disabled. This helps the user understand which elements can be interacted with.

### HTML

```html
<form action="url_of_form">
  <label for="FirstField">First field (enabled):</label>
  <input type="text" id="FirstField" value="Lorem" /><br />

  <label for="SecondField">Second field (disabled):</label>
  <input type="text" id="SecondField" value="Ipsum" disabled /><br />

  <input type="button" value="Submit" />
</form>
```

### CSS

```css
input:enabled {
  color: #22bb22;
}

input:disabled {
  color: #aaaaaa;
}
```

## See also

- `:disabled`
