---
title: "ARIA: aria-pressed attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-pressed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-pressed attribute

The `aria-pressed` attribute indicates the current "pressed" state of a toggle button.

## Description

Adding `aria-pressed` to an element with a role of `button` turns the button into a toggle button. The `aria-pressed` attribute is only relevant for toggle buttons. It represents the button's current "pressed" state.

The value is "tri-state", meaning the value can be set to `true`, `false`, `mixed`, or `undefined` values. In the case of `aria-pressed`, like most tri-state value types, the default value is `undefined`.

Toggle buttons require a full press-and-release cycle to change their value. Pressing and releasing it once changes the value to `true`. If it's pressed and released again, the value changes back to `false`.

A value of `mixed` means that the values of more than one item controlled by the button do not all share the same value.

Do not change the contents of the label on a toggle when the state changes. If a button label says "pause", do not change it to "play" when pressed. In this example, when the pressed state is true, the label remains "Pause" so a screen reader would say something like "Pause toggle button pressed".

```html
<button aria-pressed="false">Pause</button>
```

If you want the label to toggle between "Paused" and "Play", don't use `aria-pressed`.

The first rule of ARIA use is "if you can use a native feature with the semantics and behavior you require already built in, instead of repurposing an element and adding an ARIA role, state or property to make it accessible, then do so." If we employ native HTML semantics with ``, we can toggle the label instead of toggling the pressed state, removing the need for the `aria-pressed` attribute.

## Values

- `false`
    The button supports being pressed but is not currently pressed.
- `mixed`
    Indicates a mixed mode value for a tri-state toggle button.
- `true`
    The button is pressed.
- `undefined` (default)
    The element does not support being pressed.

## Associated interfaces

- `Element.ariaPressed`
    The `ariaPressed` property, part of the `Element` interface, reflects the value of the `aria-pressed` attribute.
- `ElementInternals.ariaPressed`
    The `ariaPressed` property, part of the `ElementInternals` interface, reflects the value of the `aria-pressed` attribute.

## Associated roles

Used in roles:

- `button`

## See also

- ``
- ``
- ``
- `aria-checked`
- `aria-selected`
