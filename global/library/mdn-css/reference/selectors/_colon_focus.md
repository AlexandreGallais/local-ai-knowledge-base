---
title: "`:focus` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_focus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:focus` CSS pseudo-class

The **`:focus`** CSS pseudo-class represents an element (such as a form input) that has received focus. It is generally triggered when the user clicks or taps on an element or selects it with the keyboard's `Tab` key.

```css
label {
  display: block;
  margin-top: 1em;
}

input:focus {
  background-color: lightblue;
}

select:focus {
  background-color: ivory;
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

> **Note:**
> This pseudo-class applies only to the focused element itself. Use `:focus-within` if you want to select an element that _contains_ a focused element.

## Syntax

```css
:focus {
  /* ... */
}
```

## Accessibility

Make sure the visual focus indicator can be seen by people with low vision. This will also benefit anyone use a screen in a brightly lit space (like outside in the sun). WCAG 2.1 SC 1.4.11 Non-Text Contrast requires that the visual focus indicator be at least 3 to 1.

- Accessible Visual Focus Indicators: Give Your Site Some Focus! Tips for Designing Useful and Usable Focus Indicators

### `:focus { outline: none; }`

Never just remove the focus outline (visible focus indicator) without replacing it with a focus outline that will pass WCAG 2.1 SC 1.4.11 Non-Text Contrast.

- Quick Tip: Never remove CSS outlines

## Examples

### HTML

```html
<div><input class="red-input" value="I'll be red when focused." /></div>
<div><input class="blue-input" value="I'll be blue when focused." /></div>
```

### CSS

```css
.red-input:focus {
  background: yellow;
  color: red;
}

.blue-input:focus {
  background: yellow;
  color: blue;
}
```

## See also

- `:focus-visible`
- `:focus-within`
