---
title: "ARIA: group role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/group_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: group role

The `group` role identifies a set of user interface objects that is not intended to be included in a page summary or table of contents by assistive technologies.

## Description

Most closely related to HTML's `<fieldset>` element, the `group` document structure role is used to identify a set of user interface objects which, as compared to `region`, is not intended to be included in the page's summary or table of contents.

The `group` role should be used to form a logical collection of items with related functionality, such as children in a `tree` widget forming a collection of siblings in a hierarchy, or a collection of items having the same container in a `directory`.

When a `group` is used in the context of `list`, limit the children of the `group` to `listitem` elements. In this case, it is recommended to use multiple ordered or unordered lists, `` or ``, with nested `` children.

When used in the context of a `listbox`, the only children allowed are `<option>` elements. In this case, it is recommended to use `<select>`, `<option>` and `<optgroup>` instead.

`Group` elements may be nested.

The `group` role should not be used for major perceivable sections of a page. If a section is significant enough that it should be included in the page's table of contents, use the `region` role or a standard landmark role.

When the role is added to an element, the browser will send out an accessible group event to assistive technology products, which can then notify the user about it.

### Scrollable content areas

A visually overflowing container may need `tabindex="0"` so that keyboard-only users can focus it and scroll. A focusable container should have a role and an accessible name. If there is no appropriate native role and the content does not warrant a page landmark, use the `group` role.

```html
<div
  role="group"
  aria-labelledby="transcript-heading"
  tabindex="0"
  style="max-height: 12rem; overflow: auto;">
  <h3 id="transcript-heading">Interview transcript</h3>
  <!-- Long transcript content -->
</div>
```

## Examples

The HTML code example below uses the `group` role with a `tree` view:

```html
<div id="tree1" role="tree" tabindex="-1">
  <div
    id="animals"
    class="groupHeader"
    role="presentation"
    aria-owns="animalGroup"
    aria-expanded="true">
    <img
      role="presentation"
      tabindex="-1"
      src="images/treeExpanded.gif"
      alt="" />
    <span role="treeitem" tabindex="0">Animals</span>
  </div>
  <div id="animalGroup" role="group">
    <div id="birds" role="treeitem">
      <span tabindex="-1">Birds</span>
    </div>
    <div
      id="cats"
      class="groupHeader"
      role="presentation"
      aria-owns="catGroup"
      aria-expanded="false">
      <img
        role="presentation"
        tabindex="-1"
        src="images/treeContracted.gif"
        alt="" />
      <span role="treeitem" tabindex="0">Cats</span>
    </div>
    <div id="catGroup" role="group">
      <div id="siamese" role="treeitem">
        <span tabindex="-1">Siamese</span>
      </div>
      <div id="tabby" role="treeitem">
        <span tabindex="-1">Tabby</span>
      </div>
    </div>
  </div>
</div>
```

The following example uses the `group` role with a drop-down `menu` containing `menuitem`s:

```html
<div role="menu">
  <ul role="group">
    <li role="menuitem">Inbox</li>
    <li role="menuitem">Archive</li>
    <li role="menuitem">Trash</li>
  </ul>
  <ul role="group">
    <li role="menuitem">Custom Folder 1</li>
    <li role="menuitem">Custom Folder 2</li>
    <li role="menuitem">Custom Folder 3</li>
  </ul>
  <ul role="group">
    <li role="menuitem">New Folder</li>
  </ul>
</div>
```

This menu could be constructed using `<select>` and `<option>` elements. In this case, the `group` role would be most similar to the `<optgroup>` element.

## See also

- The `<fieldset>` Element
- ARIA: `graphics-object` role
- ARIA: `section` role
- ARIA: `row` role
- ARIA: `select` role
- ARIA: `toolbar` role
