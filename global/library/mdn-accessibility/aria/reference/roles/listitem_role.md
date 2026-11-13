---
title: "ARIA: listitem role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/listitem_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: listitem role

The ARIA `listitem` role can be used to identify an item inside a list of items. It is normally used in conjunction with the `list` role, which is used to identify a list container.

```html
<section role="list">
  <div role="listitem">List item 1</div>
  <div role="listitem">List item 2</div>
  <div role="listitem">List item 3</div>
</section>
```

## Description

Any content that consists of an outer container with a list of elements inside it can be identified to assistive technologies using the `list` and `listitem` containers respectively.

There are no hard and fast rules about which elements you should use to mark up the list and list items, but you should make sure that the list items make sense in the context of a list, e.g., a shopping list, recipe steps, driving directions.

> **Note:**
> If at all possible in your work, you should use the appropriate semantic HTML elements to mark up a list and its listitems — ``/`` and ``. See Best practices for a full example.

### Associated WAI-ARIA Roles, States, and Properties

- `list`
    A list of items. Elements with role `list` must have one or more elements with the role `listitem` as children, or one or more elements with the role of `group` that have one or more elements with the `listitem` role as children.
- `group`
    A collection of related objects, limited to list items when nested in a list, not important enough to have their own place in a page's table of contents.

## Best practices

Only use `role="list"` and `role="listitem"` if you have to — for example if you don't have control over your HTML but are able to improve accessibility dynamically after the fact with JavaScript.

If at all possible, you should use the appropriate semantic HTML elements to mark up a list and listitems — ``, `` and ``. For example, our above example should be rewritten as follows:

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

> **Note:**
> Styling a list with `list-style: none;` in CSS removes the list semantics. Adding `role="listitem"` returns the semantics.

> **Note:**
> If you are marking up a list of items that will function as a tabbed interface, you should instead use the `tab`, `tabpanel`, and `tablist` roles.

## See also

- HTML `` element
- HTML `` element
- HTML `` element
- ARIA: `list` role
- ARIA: `group` role
- Accessibility Object Model
- ARIA in HTML
- ARIA Lists examples — by Scott O'Hara
