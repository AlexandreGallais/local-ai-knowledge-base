---
id: patterns
title: "Component patterns: role, states, keyboard, focus"
topic: components
summary: For each common component (button to virtual list), the native element, the ARIA role and states, the keys and the focus, with the details that do not fit a table.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base; facts summarized from the ARIA Authoring Practices (W3C) and MDN (CC BY-SA 2.5)
---

# Component patterns: role, states, keyboard, focus

Contents: 1. The table · 2. Details · Sources

## 1. The table (native, role, keyboard, focus)

| Component | Native first | Role and states | Keys | Focus |
| --- | --- | --- | --- | --- |
| Button | `<button type="button">` | `button`; toggle: `aria-pressed`; unavailable: `aria-disabled` | Enter, Space | stays on the button |
| Checkbox | `<input type="checkbox">` | `checkbox`; `aria-checked`: `true`, `false`, `mixed` | Space | one stop |
| Switch | `<button role="switch">` | `switch`; `aria-checked`; fixed label | Space; Enter optional | one stop |
| Radio group | `<input type="radio">` | `radiogroup`, `radio`; `aria-checked`; group name | Tab enters on the checked one; arrows move and check, wrapping | roving tabindex |
| Select-only list | `<select>` | `combobox` with `listbox` and `option`; `aria-expanded`, `aria-controls`, `aria-activedescendant`, `aria-selected` | Down, Up, Enter, Escape; Home, End | DOM focus stays on the combobox |
| Editable combobox | `<input>` and its list | as above, plus `aria-autocomplete` | as above; editing keys left to the browser | as above |
| Action menu | - | button with `aria-haspopup="menu"`, `aria-expanded`; `menu`, `menuitem` | Enter, Space open; arrows; Home, End; Escape closes; Tab leaves | first item at opening; back to the button |
| Tabs | - | `tablist`, `tab`, `tabpanel`; `aria-selected`, `aria-controls` | Tab to the active tab; arrows wrapping; Home, End | roving tabindex |
| Accordion | `<details>` | heading holding one `button`; `aria-expanded`, `aria-controls` | Enter, Space | each header is a stop |
| Dialog | `<dialog>` and `showModal()` | `dialog`; a name | Tab stays inside; Escape closes | enters at opening, back to the trigger |
| Tooltip | - | `tooltip` and `aria-describedby`; text only | shows on focus and hover; Escape | never takes the focus |
| Notification | - | `status` (polite) or `alert` (urgent) | none | never moves the focus |
| Sortable table | `<table>` | `button` in the `th`; `aria-sort` on the sorted column only | those of the button | native |
| Tree | - | `tree`, `treeitem`, `group`; `aria-expanded` on parents only; `aria-selected` | Right, Left open, close, go up; Up, Down; Home, End | roving tabindex or `aria-activedescendant` |
| Slider | `<input type="range">` | `slider`; `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` | arrows; Home, End | on the thumb |
| Progress | `<progress>` | `progressbar`; a name; no `aria-valuenow` when indeterminate | none | none |

Sources of the table: [S1] for each pattern, [S2] for the native elements.

## 2. Details (what the table does not say)

- **Toggle button.** With `aria-pressed`, the label stays the same; without it, change the label. [S1]
- **Select-only list.** `aria-controls` may name the hidden list; `aria-haspopup` only when the layer is
  not a list; Escape gives back the value before. [S1]
- **Listbox.** `aria-selected` or `aria-checked`, never both; options not chosen carry `false`; no
  interactive element inside an option; `aria-multiselectable` for a multiple choice. [S1]
- **Selection follows focus** only when choosing costs nothing: not when it starts a network call. [S1]
- **Menu.** For site navigation, a list of links and disclosure buttons, not menu roles: a menu
  promises an application keyboard. [S3]
- **Accordion.** No `region` role beyond about six panels. [S1]
- **Sortable table.** `aria-sort`: `ascending`, `descending`, `other`, `none`; the sort icon is
  `aria-hidden`; the sort instruction goes in the caption. [S1]
- **Slider.** Hard for touch screen readers: test it on a touch screen. [S1]
- **Progress.** `meter` is not a progress; a loading area gets `aria-busy="true"` and
  `aria-describedby` to the bar. [S2]
- **Allowed roles.** `combobox` and `switch` on `<button>`, `listbox` on `<ul>`, `option` on `<li>`. [S2]

## Sources

- [S1] W3C WAI, 2026, ARIA Authoring Practices Guide, patterns: Button, Checkbox, Switch, Radio Group, Combobox, Listbox, Menu Button, Tabs, Accordion, Dialog (Modal), Tooltip, Alert, Table, Tree View, Slider.
- [S2] MDN contributors, 2026, "ARIA roles" and the HTML elements pages, MDN Web Docs. In the library: `library/mdn-accessibility/`, `library/mdn-html/`.
- [S3] A. Roselli, 2017, updated 2026-09-30, "Don't Use ARIA Menu Roles for Site Nav", adrianroselli.com; S. Judis, 2026, "Notes on relying on the ARIA Authoring Practices Guide", stefanjudis.com.
