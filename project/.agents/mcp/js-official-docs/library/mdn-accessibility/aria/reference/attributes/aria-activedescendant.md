---
title: "ARIA: aria-activedescendant attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-activedescendant/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-activedescendant attribute

The `aria-activedescendant` attribute identifies the currently active element when focus is on a `composite` widget, `combobox`, `textbox`, `group`, or `application`.

## Description

The `aria-activedescendant` property provides a method of managing focus for assistive technologies on interactive elements when they contain multiple focusable descendants, such as menus, grids, and toolbars. Instead of the screen reader moving focus between owned elements, `aria-activedescendant` can be used on container elements to refer to the currently active element, informing assistive technology users of the currently active element when focused.

With `aria-activedescendant`, the browser keeps the DOM focus on the container element or on an input element that controls the container element. However, the user agent communicates desktop focus events and states to the assistive technology as if the element referenced by `aria-activedescendant` has focus.

This attribute is only relevant on elements with role of `composite` widget, `combobox`, `textbox`, `group`, or `application` whose `id` is referenced as the attribute value.

The attribute manages providing assistive technologies with information as to which element has focus, but doesn't actually create focus. Changing focus and managing the attributes value is done with JavaScript. In addition to managing that attribute value, make sure the currently active descendant is visible and in view (or scrolls into view) when focused.

In setting the value of `aria-activedescendant` on an element with DOM focus, ensure the value refers to an owned element—either a descendant of the element with DOM focus OR a logical descendant as indicated by the `aria-owns` attribute.

When the element with DOM focus is a combobox, textbox, or searchbox, include `aria-controls` to refer to the element that supports `aria-activedescendant`.

The value of `aria-activedescendant` refers to an owned element of the controlled element. For example, in a combobox, focus may remain on the combobox while the value of `aria-activedescendant` on the combobox element refers to a descendant of a popup listbox that is controlled by the combobox.

> **Note:**
> The attribute is supported only on a few roles. For example, `dialog`s do not support `aria-activedescendant`. When a combobox opens a dialog, DOM focus moves into the dialog from the combobox as it is not referenceable with this attribute.

> **Note:**
> When a descendant of a `listbox`, `grid`, or `tree` popup is focused, DOM focus remains on the combobox and the combobox has `aria-activedescendant` set to a value that refers to the focused element within the popup.

## Values

- ID reference
    takes as its value the `id` of the currently focused element.

## Associated interfaces

- `Element.ariaActiveDescendantElement`
    The `ariaActiveDescendantElement` property is part of each element's interface.
    Its value is an instance of a subclass of `Element` that reflects the `id` reference in the `aria-activedescendant` attribute (with some caveats).
- `ElementInternals.ariaActiveDescendantElement`
    The `ariaActiveDescendantElement` property is part of each custom element's interface.
    Its value is an instance of a subclass of `Element` that reflects the `id` reference in the `aria-activedescendant` attribute (with some caveats).

## Associated roles

Relevant only as an attribute on elements with the following roles:

- `application`
- `combobox`
- `composite`
- `group`
- `textbox`
