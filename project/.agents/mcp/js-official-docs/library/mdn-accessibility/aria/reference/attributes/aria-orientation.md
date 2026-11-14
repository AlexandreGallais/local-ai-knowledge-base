---
title: "ARIA: aria-orientation attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-orientation attribute

The `aria-orientation` attribute indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

## Description

It may be important for the user to know the orientation to know how to navigate certain widgets, as orientation impacts the expected behaviors of the left, right, up and down arrows. The `aria-orientation` attribute is used to indicate to assistive technology users whether an element's orientation is `horizontal` or `vertical`, or `undefined`.

Several widgets have default orientations:

Horizontal by default:

- `slider`
- `tablist`
- `toolbar`
- `menubar`

Vertical by default:

- `scrollbar`
- `tree`
- `listbox`
- `menu`

Each `separator` should have `aria-orientation` consistent with the separator's orientation.

When nodes in a tree are arranged horizontally instead of its default vertical orientation, or when a tab list is vertical instead of its default horizontal, the down arrow performs as a right arrow normally would, and the up arrow performs as a left arrow normally would. In these instances, assistive technology users need to know the widget's orientation so as to navigate correctly.

Up and down arrows are generally available for normal browser scrolling, even when focus is inside a tree or tab list. Include `aria-orientation` to enable alerting users when a widget doesn't have the default, expected orientation and associated navigation.

Always remember that ARIA only modifies how assistive technology presents content to your users; altering the behavior of arrow keys requires JavaScript.

## Values

- `horizontal`
    The element is oriented horizontally.
- `undefined` (default)
    The element's orientation is unknown/ambiguous.
- `vertical`
    The element is oriented vertically.

## Associated interfaces

- `Element.ariaOrientation`
    The `ariaOrientation` property, part of the `Element` interface, reflects the value of the `aria-orientation` attribute.
- `ElementInternals.ariaOrientation`
    The `ariaOrientation` property, part of the `ElementInternals` interface, reflects the value of the `aria-orientation` attribute.

## Associated roles

Used in roles:

- `scrollbar`
- `select`
- `separator`
- `slider`
- `tablist`
- `toolbar`

Inherited into roles:

- `listbox`
- `menu`
- `menubar`
- `radiogroup`
- `tree`
- `treegrid`

## See also

- Understanding WCAG: Keyboard
