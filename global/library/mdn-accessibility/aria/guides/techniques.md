---
title: "Using ARIA: Roles, states, and properties"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/guides/techniques/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using ARIA: Roles, states, and properties

ARIA defines semantics that can be applied to elements, with these divided into **roles** (defining a type of user interface element) and **states** and **properties** that are supported by a role. Authors must assign an ARIA role and the appropriate states and properties to an element during its life-cycle, unless the element already has appropriate ARIA semantics (via use of an appropriate HTML element). Addition of ARIA semantics only exposes extra information to a browser's accessibility API, and does not affect a page's DOM.

## Roles

### Widget roles

- `button`
- `checkbox`
- `gridcell`
- `link`
- `menuitem`
- `menuitemcheckbox`
- `menuitemradio`
- `option`
- `progressbar`
- `radio`
- `scrollbar`
- `searchbox`
- `separator` (when focusable)
- `slider`
- `spinbutton`
- `switch`
- `tab`
- `tabpanel`
- `textbox`
- `treeitem`

### Composite roles

The techniques below describe each composite role as well as their required and optional child roles.

- `combobox`
- `grid` (including `row`, `gridcell`, `rowheader`, `columnheader` roles)
- `listbox` (including `option` role)
- `menu`
- `menubar`
- `radiogroup` (see `radio` role)
- `tablist` (including `tab` and `tabpanel` roles)
- `tree`
- `treegrid`

### Document structure roles

- `application`
- `article`
- `cell`
- `columnheader`
- `definition`
- `directory`
- `document`
- `feed`
- `figure`
- `group`
- `heading`
- `img`
- `list`
- `listitem`
- `math`
- `none`
- `note`
- `presentation`
- `row`
- `rowgroup`
- `rowheader`
- `separator`
- `table`
- `term`
- `toolbar`
- `tooltip`

### Landmark roles

- `banner`
- `complementary`
- `contentinfo`
- `form`
- `main`
- `navigation`
- `region`
- `search`

### Live Region Roles

- `alert`
- `log`
- `marquee`
- `status`
- `timer`

### Window Roles

- `alertdialog`
- `dialog`

## States and properties

### Widget attributes

- `aria-autocomplete`
- `aria-checked`
- `aria-current`
- `aria-disabled`
- `aria-errormessage`
- `aria-expanded`
- `aria-haspopup`
- `aria-hidden`
- `aria-invalid`
- `aria-label`
- `aria-level`
- `aria-modal`
- `aria-multiline`
- `aria-multiselectable`
- `aria-orientation`
- `aria-placeholder`
- `aria-pressed`
- `aria-readonly`
- `aria-required`
- `aria-selected`
- `aria-sort`
- `aria-valuemax`
- `aria-valuemin`
- `aria-valuenow`
- `aria-valuetext`

### Live region attributes

- `aria-live`
- `aria-relevant`
- `aria-atomic`
- `aria-busy`

### Drag & drop attributes

- `aria-dropeffect` (deprecated)
- `aria-grabbed` (deprecated)

### Relationship attributes

- `aria-activedescendant`
- `aria-colcount`
- `aria-colindex`
- `aria-colspan`
- `aria-controls`
- `aria-describedby`
- `aria-details`
- `aria-errormessage`
- `aria-flowto`
- `aria-labelledby`
- `aria-owns`
- `aria-posinset`
- `aria-rowcount`
- `aria-rowindex`
- `aria-rowspan`
- `aria-setsize`

### MicrosoftEdge-specific properties

- `x-ms-aria-flowfrom` (non-standard)
