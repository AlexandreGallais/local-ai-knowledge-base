---
title: "ARIA: tablist role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/tablist_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: tablist role

The `tablist` role identifies the element that serves as the container for a set of `tabs`. The tab content are referred to as `tabpanel` elements.

## Description

You may be interacting with a tabbed interface as you read this! Browser tabs allow a user have multiple web pages open in a single window. Clicking on a tab in the tablist at the top of the browser window enables the user to display the associated content in the main content area, the tabpanel, one site at a time. This is called a "tab design pattern".

When implementing a tab design pattern, the `tab`, `tablist` and `tabpanel` roles are used.

Tabs are a set of layered sections of content, known as tab panels, that display one panel of content at a time. Each tab panel has an associated `tab` element, that, when activated, displays the panel. The list of tab elements is arranged along one edge of the currently displayed panel, most commonly the top edge, nested in a `tablist` element.

Each `tab` in a `tablist` serves as a label for one `tabpanel` and can be activated to display that panel. The `tablist` is the containing element for the set of tab elements contained.

When a tabbed interface is initialized, one tab panel is displayed and its associated tab is styled to indicate that it is active. When the user activates one of the other tab elements, the previously displayed tab panel is hidden, the tab panel associated with the activated tab becomes visible, and the tab is considered "active".

For a single-selectable tablist, the non-active tabpanel elements should be hidden from the user until the user selects the tab associated with that tabpanel.

When creating a multi-selectable tablist, include `aria-multiselectable="true"` on the `tablist element`.

The `tab` elements not the `tablist`, have the `aria-selected` attribute. Set to `aria-selected="true"` for the tabs associated with each visible tabpanel. The tabs associated with hidden tabpanel elements have their `aria-selected` attributes set to `false`.

If the tab list has a visible label, set `aria-labelledby` to the `id` of the labeling element. If not, use `aria-label` to provide a label.

To be keyboard accessible, focus must be managed for the descendants of this role.

Elements with the `tablist` role have an implicit `aria-orientation` value of `horizontal`.

### Associated WAI-ARIA roles, states, and properties

- `tab` role
    Required Owned Elements. Every tablist must have one or more `tab` children.
- `aria-multiselectable`
    When set to `true`, indicates the user may select more than one `tab` from the `tablist` descendants.
- `aria-orientation`
    If the tablist element is vertically oriented, set `aria-orientation="vertical"`. The default is `horizontal`.

### Keyboard interactions

For the tab list:

- `Tab`
    When focus moves into the tab list, places focus on the active `tab` element. When the tab list contains the focus, moves focus to the next element in the page tab sequence outside the tablist, which is the tabpanel unless the first element containing meaningful content inside the tabpanel is focusable.

When focus is on a tab element in a horizontal tab list:

- `Left Arrow`
    moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab
- `Right Arrow`
    Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab

When focus is on a tab element in a vertical tab list:

- `Up Arrow`
    moves focus to the previous tab. If focus is on the first tab, moves focus to the last tab. Optionally, activates the newly focused tab
- `Down Arrow`
    Moves focus to the next tab. If focus is on the last tab element, moves focus to the first tab. Optionally, activates the newly focused tab

If the tab list is horizontal, it does not listen for `Down Arrow` or `Up Arrow` so those keys can provide their normal browser scrolling functions even when focus is inside the tab list.

When focus is on a tab in a tablist with either horizontal or vertical orientation:

- `Space` or `Enter`
    Activates the tab if it was not activated automatically on focus.
- `Home` (Optional)
    Moves focus to the first tab. Optionally, activates the newly focused tab
- `End` (Optional)
    Moves focus to the last tab. Optionally, activates the newly focused tab
- `Shift + F10`
    If the tab has an associated popup menu, opens the menu.
- `Delete` (Optional)
    If deletion is allowed, deletes (closes) the current tab element and its associated tab panel, sets focus on the tab following the tab that was closed, and optionally activates the newly focused tab. If there is not a tab that followed the tab that was deleted, e.g., the deleted tab was the right-most tab in a left-to-right horizontal tab list, sets focus on and optionally activates the tab that preceded the deleted tab. If the application allows all tabs to be deleted, and the user deletes the last remaining tab in the tab list, the application moves focus to another element that provides a logical work flow. As an alternative to Delete, or in addition to supporting Delete, the delete function is available in a context menu.

## Examples

See the `tabpanel`, `tab`, and `tablist` example in the `tab` role definition.

## See also

- `tab` role
- `tabpanel` role
