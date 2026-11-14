---
title: "ARIA: list role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/list_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: list role

The ARIA `list` role can be used to identify a list of items. It is normally used in conjunction with the `listitem` role, which is used to identify a list item contained inside the list.

```html
<div role="list">
  <div role="listitem">List item 1</div>
  <div role="listitem">List item 2</div>
  <div role="listitem">List item 3</div>
</div>
```

## Description

Any content that consists of an outer container with a list of elements inside can be identified to assistive technologies using the `list` and `listitem` containers, respectively. A `list` can only contain zero or more `listitem` children.

There are no hard and fast rules about which elements you should use to mark up the list and list items, but you should make sure that the list items make sense in the context of a list, e.g., a shopping list, recipe steps, driving directions.

> **Note:**
> Best practices dictate using the appropriate semantic HTML elements over ARIA roles to mark up lists and listitems — ``, `` and ``. See Best practices for a full example.

### Associated WAI-ARIA roles, states, and properties

- `listitem` role
    A single item in a list. Elements with role `listitem` can only be found in an element with the role `list`.

## Best practices

Only use `role="list"` and `role="listitem"` if you have to — for example if you don't have control over your HTML but are able to improve accessibility dynamically after the fact with JavaScript.

Unlike the HTML `` and ``, the ARIA `list` roles doesn't distinguish between ordered and unordered lists. If at all possible, you should use the appropriate semantic HTML elements to mark up a list (`` and ``) and list items (``). For example, our above example should be rewritten as follows:

```html
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
```

or use an ordered list if the order of the list items matters:

```html
<ol>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ol>
```

> **Note:**
> The ARIA `list` / `listitem` roles don't distinguish between ordered and unordered lists.

As an aside, note that if you are using the semantic HTML elements of `` or `` and apply a role of `presentation`, each child `` element inherits the `presentation` role because ARIA requires the `listitem` elements to have the parent `list` element. So, the `` elements are not exposed to assistive technologies, but elements contained inside of those `` elements, including nested lists, are visible to assistive technologies.

> **Note:**
> If you are marking up a list of items that will function as a tabbed interface, you should instead use the `tab`, `tabpanel`, and `tablist` roles.

## See also

- The `` element
- The `` element
- The `` element
- ARIA: listitem role
- ARIA Lists examples — by Scott O'Hara
- Accessibility Object Model
- ARIA in HTML
