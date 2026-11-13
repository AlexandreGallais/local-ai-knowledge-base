---
title: "ARIA: aria-controls attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-controls/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-controls attribute

The global `aria-controls` property identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set.

## Description

When an interactive widget or element, be it a combobox, tab, button, etc., is used to adjust or modify another element or component in a document or application, the `aria-controls` attribute can be used to programmatically associate the corresponding element or elements with the controlling element. The `aria-controls` attribute identifies the element (or elements) whose contents or presence are controlled by the element on which the attribute is set, regardless of what type of interaction initiates the impacted behavior.

A combobox element has `aria-controls` set to a value that refers to the element that serves as the popup. The `aria-controls` only needs to be set when the popup is visible, but it is valid and easier to program to reference an element that is not visible.

Other examples of controls include:

- The button parts of an accordion widget that toggle the visibility of their associated panel content. Each button may have an `aria-controls` specified, referencing the ID of the element containing the content associated with the invoking control.
- An element with a role of `scrollbar`: the scrollbar requires an `aria-controls` attribute referencing the ID of the element it controls.
- A group of tabs that each display a different tab panel: each element with `role="tab"` has an `aria-controls` attribute referencing its associated `tabpanel`.

## Example

In this tabs example, each tab controls one tabpanel:

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
  <div
    id="panel-2"
    role="tabpanel"
    tabindex="0"
    aria-labelledby="tab-2"
    class="display-none">
    <p>Content for the second panel</p>
  </div>
  <div
    id="panel-3"
    role="tabpanel"
    tabindex="0"
    aria-labelledby="tab-3"
    class="display-none">
    <p>Content for the third panel</p>
  </div>
</div>
```

> **Note:**
> ARIA only modifies the accessibility tree for an element, identifying how assistive technology can present the content to users. ARIA doesn't change any implicit functionality or styling.

## Values

- `id` list
    A space-separated list of one or more ID values referencing the elements being controlled by the current element

## Associated interfaces

- `Element.ariaControlsElements`
    The `ariaControlsElements` property is part of each element's interface.
    Its value is an array of instances of subclasses of `Element` that reflect the `id` references in the `aria-controls` attribute (with some caveats).
- `ElementInternals.ariaControlsElements`
    The `ariaControlsElements` property is part of each custom element's interface.
    Its value is an array of instances of subclasses of `Element` that reflect the `id` references in the `aria-controls` attribute (with some caveats).

## Associated roles

Used in **ALL** roles.

## See also

- `aria-owns`
