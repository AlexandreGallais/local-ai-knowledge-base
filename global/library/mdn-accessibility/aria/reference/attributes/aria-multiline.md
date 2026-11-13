---
title: "ARIA: aria-multiline attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-multiline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-multiline attribute

The `aria-multiline` attribute indicates whether a `textbox` accepts multiple lines of input or only a single line.

## Description

The default behavior of the `Enter` or `Return` key <example-value> between single-line and multi-line text fields. When user focus is in a single-line ``<<input type="text">>``, an `Enter` or `Return` keystroke usually submits the form.

When user focus is in a multi-line `<textarea>`, the keystroke inserts a line break. Only relevant for elements with the `textbox` role set, the `aria-multiline` attribute indicates to assistive technologies whether that text box accepts multiple lines of input or only a single line, setting expectations as to what type of data to enter and what those keystroke will do.

> **Note:**
> Where possible, use the HTML `` or the `<textarea>`, as these have built-in semantics and behaviors, do not require ARIA attributes or scripting, and have keyboard support built in.

If the `aria-multiline="true"` is set, it means the textbox widget will accept line breaks within the input, similar to the HTML `<textarea>`. Elements with a role of `textbox` that do not have the attribute, or with the value set to `false`, are simple text boxes.

Be aware of focus and keystrokes when designing text boxes. ARIA only modifies the accessibility tree and therefore how assistive technology presents the textbox to your users. ARIA doesn't change anything about an element's default function or behavior. When not using semantic HTML elements for their intended purpose and default functionality, you must use JavaScript to manage behavior and functionality, including responding to keystroke events.

## Values

- `true`
    The text box accepts multiple lines of input.

- `false`
    The text box only accepts a single line of input.

## Associated interfaces

- `Element.ariaMultiLine`
    The `ariaMultiLine` property, part of the `Element` interface, reflects the value of the `aria-multiline` attribute.
- `ElementInternals.ariaMultiLine`
    The `ariaMultiLine` property, part of the `ElementInternals` interface, reflects the value of the `aria-multiline` attribute.

## Associated roles

Used in roles:

- `textbox`

Inherits into roles:

- `searchbox`

## See also

- ARIA `textbox` role
- ARIA `searchbox` role
