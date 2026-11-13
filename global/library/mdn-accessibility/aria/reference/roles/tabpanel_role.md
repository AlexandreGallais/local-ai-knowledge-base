---
title: "ARIA: tabpanel role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/tabpanel_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: tabpanel role

The ARIA `tabpanel` is a container for the resources of layered content associated with a `tab`.

## Description

The `tabpanel` role indicates the element is a container for the resources associated with a `tab` role, where each `tab` is contained in a `tablist`.

A `tabpanel` is part of a tab interface, a common user experience pattern in which a group of visual tabs allow for quickly switching between multiple layered views. Each tab is defined as such with the `tab` role, and these tabs are contained within an element with the `tablist` role. The `tablist` is often visually positioned above or to the side of a content area, containing the associated tabpanels. The `tabpanel` is the role of the container for each pane of content that is associated with a corresponding `tab` in the tab interface's `tablist`.

In many tab interfaces, only a single `tabpanel` will be visible at a time. However, some interfaces may require multiple tab panels to be displayed at once. In these cases the `tablist` would be provided the `aria-multiselectable` attribute, and the `tab` elements would then use the `aria-expanded` attribute to indicate whether its associated `tabpanel` was visible or not. The tab's selected state would instead be used to indicate which tabpanel is the currently 'active' panel. For example, this could indicate which tabpanel keyboard focus would move to if someone were to press the `tab` key when focused on a tab within the multi-select `tablist`.

In single-select tab interfaces, only the `tabpanel` associated with the currently selected tab is displayed. All other `tabpanel` elements associated with the unselected tabs must be hidden from users. So when tab selection changes, the displayed tabpanel would also, while the previously-displayed tabpanel would then become hidden.

In multi-select tab interfaces, multiple `tabpanel` elements may be displayed, matching the expanded state of their associated `tab` elements.

Tabs do not act as anchor links to individual panels — and upon activation, keyboard focus should remain on the current `tab` element and not automatically move to the newly displayed `tabpanel`. While a tab interface may be progressively enhanced based on an underlying markup pattern of in-page hyperlinks pointing to their associated sections of content, when JavaScript is used to modify these elements into a tabbed interface, the hyperlinks' default behavior should be prevented. Ideally, this could be done by removing or modifying the `href` attribute, as this would have the added benefit of removing the hyperlink-specific menu items from the element's browser context menu.

When keyboard focus is on a `tablist`, or a `tab` within the `tablist`, the `Tab` key <example-value> be programmed to move from the focused tab — which may or may not be the selected tab — to the `tabpanel` which represents the currently selected tab.

Each `tab` in a `tablist` can serve as the label for its corresponding `tabpanel`. Include the `id` of each `tab` as the value for each `tabpanel`'s `aria-labelledby` attribute.

You can also optionally associate each `tabpanel` with its associated `tab` by including the `id` of the `tabpanel` as the value of the `tab`'s `aria-controls` attribute.

When a tabbed interface is initialized, one `tabpanel` is displayed and its associated `tab` is styled to indicate that it is active, reflecting its programmatic state. All inactive `tabpanel` elements must be hidden to all users. This is most commonly achieved by use of CSS's `display: none`.

See the ARIA `tab` role article for more information specific to the use of this role.

Include `tabindex="-1"` to allow a `tabpanel` to receive focus without including the `tabpanel` in the page's keyboard focus order.

Make sure to define styles for a `tabpanel` for when it receives focus, optimally using the CSS `:focus` pseudo-class, so keyboard users know there was a change in focus and are aware of what content currently has focus.

Carousels can be created using this tab pattern: A slide picker controls can be marked up as `tabs` in a `tablist` with the slide represented by a `tabpanel` element.

If a tab panel is empty (for example, because its data is still loading or the record is empty), there are three options:

- Keep the empty panel accessible and focusable with `tabindex="0"` and preserve its accessible name
- Render some content explaining the state, such as "Loading..." or "No results"
- Remove the tab and panel from the DOM

There is no empty-panel-specific ARIA requirement. Choosing between these approaches is primarily a product-design decision. Generally, avoid empty panels because they are confusing to both sighted users and screen reader users (screen readers may announce the panel's name followed by nothing). Removing the tab and panel avoids an additional item to navigate past, but may be confusing if users expect that tab to exist (e.g., because the same set of tabs has appeared multiple times) or the tab will appear later (e.g., because it's still loading).

### Associated roles and attributes

- `tab` role
    Controls the visibility of the associated `tabpanel`
- `tablist` role
    Group of `tab` elements.
- `aria-labelledby`
    Provides an accessible name. References the `tab` element that controls the panel
- `aria-expanded`
    Should be used on the necessary `tab` elements if a multi-selectable `tablist` is used.

### Keyboard interactions

See the `tablist` keyboard interactions in the `tablist` role definition.

## Example

See the `tabpanel`, `tab`, and `tablist` example in the `tab` role definition.

## See also

- ARIA `tab` role
- ARIA `tablist` role
- Example: Tabs with Automatic Activation - W3C
- Example: Tabs with Manual Activation -W3C
