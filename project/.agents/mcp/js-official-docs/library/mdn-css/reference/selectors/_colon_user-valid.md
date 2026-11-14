---
title: "`:user-valid` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_user-valid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:user-valid` CSS pseudo-class

The **`:user-valid`** CSS pseudo-class represents any validated form element whose value validates correctly based on its validation constraints. However, unlike `:valid` it only matches once the user has interacted with it.

This pseudo-class is applied if the form control is valid and any of the following has occurred:

- The user made a change to the form control and committed the change such as by moving focus elsewhere.
- The user has attempted to submit the form, even if no change was made to the control.
- The value was invalid when it gained focus, and the user made a change making it valid, even if focus is still in the control.

Once this pseudo-class has been applied, the user-agent re-validates whether the control is valid at every keystroke when the control has focus.

- If the control has focus, and the value was invalid when it gained focus, re-validate on every keystroke.

The result is that if the control was valid when the user started interacting with it, the validity styling is changed only when the user shifts focus to another control. However, if the user is trying to correct a previously-flagged value, the control shows immediately when the value becomes valid. Required items are flagged as invalid only if the user changes them or attempts to submit an unchanged invalid value.

## Syntax

```css
:user-valid {
  /* ... */
}
```

## Examples

### Setting a color and symbol on :user-valid

In the following example, the green border and ✅ only display once the user has interacted with the field.
Try changing the email address to another valid email to see it in action.

```html
<label for="email">Email *: </label>
<input id="email" name="email" type="email" value="user@example.com" required />
<span></span>
```

```css
input:user-valid {
  border: 2px solid green;
}

input:user-valid + span::before {
  content: "✓";
  color: green;
}
```

## See also

- `:valid`
- `:invalid`
- `:required`
- `:optional`
- `:user-invalid`
