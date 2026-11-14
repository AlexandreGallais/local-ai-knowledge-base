---
title: "ARIA: aria-haspopup attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-haspopup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-haspopup attribute

The `aria-haspopup` attribute indicates the availability and type of interactive popup element that can be triggered by the element on which the attribute is set.

## Description

In ARIA, interactive menus, listboxes, trees, grids, and dialogs that appear on top of other content when triggered to appear are considered "popups". These popups are triggered by one or more interactive elements on the page. The availability and type of popup the interactive element will trigger should be identified with the `aria-haspopup` state.

The presence of the `aria-haspopup`, with one of six enumerated values - `menu`, `listbox`, `tree`, `grid`, `dialog`, or `true` - indicates the element can trigger a popup and what kind of popup will be displayed. In turn, the element that pops up must be of the role indicated. The value `true` is the same as `menu`. Any other value, including an empty string or other role, is treated as if `false` were set.

A `tooltip` is not considered to be a popup in this context, as it is not interactive.

> **Note:**
> Make sure the role of the element that serves as the container for the popup content is a `menu`, `listbox`, `tree`, `grid` or `dialog` and that the value of `aria-haspopup` matches the role of the popup container.

The `aria-haspopup` state informs assistive technology users that there is a popup and the type of popup it is, but provides no interactivity. For the popup to be keyboard accessible, make sure the element with `aria-haspopup` is focusable and can trigger the popup, that there is a keyboard mechanism for opening the popup, and that the popup element manages focus of all its descendants.

> **Note:**
> ARIA does not enable accessible functionality. ARIA only conveys the intended behavior of your functionality.

When creating a `menubar`, a parent `menuitem` should have `aria-haspopup="menu"` (or `true`) set. Any button that open a menu should have a role of `button` or, preferably, be a ``, and also have `aria-haspopup="menu"` (or `true`) set. `Tab` elements with popup menus should also have `aria-haspopup="menu"` set. Note that `menubar`s should not be used to create website navigation.

> **Note:**
> Elements with role `combobox` have an implicit `aria-haspopup` value of `listbox`.

## Values

- `false` (default)
    The element does not have a popup.
- `true`
    The popup is a menu.
- `menu`
    The popup is a menu.
- `listbox`
    The popup is a listbox.
- `tree`
    The popup is a tree.
- `grid`
    The popup is a grid.
- `dialog`
    The popup is a dialog.

## Associated interfaces

- `Element.ariaHasPopup`
    The `ariaHasPopup` property, part of the `Element` interface, reflects the value of the `aria-haspopup` attribute, which indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.
- `ElementInternals.ariaHasPopup`
    The `ariaHasPopup` property of the `ElementInternals` interface reflects the value of the `aria-haspopup` attribute.

## Associated roles

Used in roles:

- `application`
- `button`
- `combobox`
- `gridcell`
- `link`
- `menuitem`
- `slider`
- `tab`
- `textbox`
- `treeitem`

Inherited into roles:

- `columnheader`
- `menuitemcheckbox`
- `menuitemradio`
- `rowheader`
- `searchbox`

## See also

- `aria-controls`
- `menu`
- `listbox`
- `tree`
- `grid`
- `dialog`
- Toolbar example - W3C WAI ARIA practices
