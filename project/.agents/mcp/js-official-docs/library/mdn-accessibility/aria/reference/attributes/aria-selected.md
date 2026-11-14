---
title: "ARIA: aria-selected attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-selected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-selected attribute

The `aria-selected` attribute indicates the current "selected" state of various widgets.

## Description

The `aria-selected` attribute indicates the current "selected" state for `gridcell`, `option`, `row` and `tab` roles.

This attribute is used to indicate which elements within single-selection and multiple-selection composite widgets are selected. If more than one element is selectable at a time, include `aria-multiselectable="true"` on the grid, listbox, tablist, or other owning role, while including `aria-selected` only on the selectable cells, options, and tabs.

For other roles, the currently selected state is set with `aria-current`, or possibly `aria-checked` or `aria-pressed`, depending on the role.

Widgets that support both `aria-selected` and `aria-current` at the same time have different meanings for each. For example, `aria-current="page"` can be used in a navigation tree to indicate which page is currently displayed, while `aria-selected="true"` indicates which page will be displayed if the user activates the `treeitem`.

### Grid

Setting `aria-selected="false"` on a focusable gridcell indicates the cell is selectable. If the grid allows more than one gridcell to be selected at a time, set `aria-multiselectable="true"` on the element with role `grid`. Setting `aria-selected` on a column or row header gridcell does not propagate the state to other cells in the column or row.

### Option

Both `aria-selected` and `aria-checked` are valid for `option`. Some user interfaces indicate selection with `aria-selected` in single-select list boxes and with `aria-checked` in multi-select list boxes.

Don't specify both `aria-selected` and `aria-checked` on `option` elements contained by the same `listbox` unless the meaning and purpose of `aria-selected` is different from the meaning and purpose of aria-checked in the user interface, the meaning and purpose of each state apparent, and the UI provides separate methods for controlling each state.

### Row

The `aria-selected` attribute is supported on `row` but not `column`. If a grid supports selection, when a cell or row is selected, the selected element has `aria-selected="true"` set.

If the grid supports column selection and a column is selected, all cells in the column have `aria-selected` set to `true`.

### Tab

In a tablist, `aria-selected` is used on a tab to indicate the currently-displayed `tabpanel`.

The selected `tab` in a `tablist` should have the attribute `aria-selected="true"` set. All inactive tabs in the tablist should have `aria-selected="false"` set. Setting the state only impacts the accessibility tree: make sure to style the active tab in a way that visual indicates it's selected state. The default value for `aria-selected` on a `tab` role is `false`.

If more than one tab is selectable at a time, include `aria-multiselectable` on the `tablist`.

## Examples

In this `tablist` example, the first `tab` is selected:

```html
<div class="tab-interface">
  <div role="tablist" aria-label="Sample Tabs">
    <span
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      id="tab-1"
      tabindex="0">
      First Tab
    </span>
    <span
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
      tabindex="-1">
      Second Tab
    </span>
    <span
      role="tab"
      aria-selected="false"
      aria-controls="panel-3"
      id="tab-3"
      tabindex="-1">
      Third Tab
    </span>
  </div>
  <div id="panel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1">
    <p>Content for the first panel</p>
  </div>
  <div id="panel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2" hidden>
    <p>Content for the second panel</p>
  </div>
  <div id="panel-3" role="tabpanel" tabindex="0" aria-labelledby="tab-3" hidden>
    <p>Content for the third panel</p>
  </div>
</div>
```

> **Note:**
> ARIA only modifies the accessibility tree for an element and how assistive technology presents the content to users. ARIA doesn't change anything about an element's function or behavior.

## Values

- `true`
    The selectable element is selected.
- `false`
    The selectable element is not selected. Implicit default for `tab`.
- `undefined` (default)
    The element is not selectable.

## Associated interfaces

- `Element.ariaSelected`
    The `ariaSelected` property, part of the `Element` interface, reflects the value of the `aria-selected` attribute.
- `ElementInternals.ariaSelected`
    The `ariaSelected` property, part of the `ElementInternals` interface, reflects the value of the `aria-selected` attribute.

## Associated roles

Used in roles:

- `gridcell`
- `option`
- `row`
- `tab`

Inherited into roles:

- `columnheader`
- `rowheader`
- `treeitem`

## See also

- `aria-pressed`
- `aria-checked`
