---
title: "`:user-invalid` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_user-invalid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:user-invalid` CSS pseudo-class

The **`:user-invalid`** CSS pseudo-class represents any validated form element whose value isn't valid based on their validation constraints, after the user has interacted with it.

The `:user-invalid` pseudo-class must match an `:invalid`, `:out-of-range`, or blank-but `:required` element between the time the user has attempted to submit the form and before the user has interacted again with the form element.

## Syntax

```css
:user-invalid {
  /* ... */
}
```

## Examples

### Setting a color and symbol on :user-invalid

In the following example, the red border and ❌ only display once the user has interacted with the field.
Try typing something other than an email address to see it in action.

```html
<label for="email">Email *: </label>
<input id="email" name="email" type="email" required />
<span></span>
```

```css
input:user-invalid {
  border: 2px solid red;
}

input:user-invalid + span::before {
  content: "✖";
  color: red;
}
```

## See also

- `:valid`
- `:invalid`
- `:required`
- `:optional`
- `:user-valid`
