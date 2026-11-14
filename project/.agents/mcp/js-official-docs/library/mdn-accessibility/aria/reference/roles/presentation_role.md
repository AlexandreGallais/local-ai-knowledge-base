---
title: "ARIA: presentation role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/presentation_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: presentation role

The `presentation` role and its synonym `none` remove an element's implicit ARIA semantics from being exposed to the accessibility tree.

The content of the element will still be available to assistive technologies; it is only the semantics of the container — and in some instance, required associated descendants — which will no longer expose their mappings to the accessibility API.

## Description

While ARIA is primarily used to express semantics, there are some situations where hiding an element's semantics from assistive technologies is helpful. This is done with the `presentation` role or its synonym role `none`, which declare that an element is being used only for presentation and therefore does not have any accessibility semantics.

Writing `<h2 role="presentation">Democracy Dies in Darkness</h2>` removes the heading semantics of the `<h2>` element, making it the equivalent of `Democracy Dies in Darkness`. The heading role semantics are removed, but the content itself is still available.

When an element has required descendants, such as the various ``, elements and ``s children of a `` or ``, the `presentation` or `none` role on the table or list removes the default semantics of the element on which it was applied and their required descendant elements.

If `presentation` or `none` is applied to a `` element, the descendant ``, ``, ``, ``, ``, ` | `, and ` | ` elements inherit the role and are thus not exposed to assistive technologies. But, elements inside of the ` | ` and ` | ` elements, including nested tables, are exposed to assistive technologies.

```html
<ul role="presentation">
  <li>
    <a href="#">Link 1</a>
  </li>
  <li>
    <a href="#">Link 2</a>
  </li>
  <li>
    <a href="#">Link 3</a>
  </li>
</ul>
```

Because the `presentation` role was applied to the `` element, every child `` element inherits the `presentation` role. This is because ARIA requires the `listitem` elements to have a parent `list` element. While the `` elements, in this case, are not exposed to assistive technologies, descendants of those required elements are exposed. If we had nested a list within one of those ``'s, they would be visible to assistive technologies. For elements with no required children, any elements nested inside the element with `role="presentation"` or `role="none"` preserve their semantics. In this case, the `` elements contained inside of those `` elements are exposed.

The `` is a special case. Its role would have been exposed even if it had the `presentation` or `none` role directly applied to it. Browsers ignore `role="presentation"` and `role="none"` on focusable elements, including link and inputs, or anything with a tabindex attribute set. Browsers also ignore the inclusion of the role if any of the element contains any global ARIA states and properties, such as `aria-describedby`.

> **Note:**
> The element with `role="presentation"` is not part of the accessibility tree and should not have an accessible name. Do **not** use `aria-labelledby` or `aria-label`.

### Associated WAI-ARIA roles, states, and properties

None. If a global ARIA state and property is set, `presentation` or `none` will be ignored, and the implicit role of the element will be used.

## Examples

```html
<hr role="none" />
```

## See also

- `aria-hidden` versus `role="presentation/none"` - by Scott O'Hara
