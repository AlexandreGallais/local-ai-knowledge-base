---
title: "`autofocus` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/autofocus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `autofocus` HTML global attribute

The **`autofocus`** global attribute is a Boolean attribute indicating whether the element should be focused on page load or, if it is nested inside a `<dialog>` or `popover` element, when the `<dialog>` or popover is shown.

```html
<input name="q" autofocus />
```

Only one element inside a document, `<dialog>` element, or popover may have this attribute specified. If applied to multiple elements, the first focusable one will receive focus.

> **Note:**
> The `autofocus` attribute applies to all elements, not just form controls. For example, it might be used on a contenteditable area.

> **Note:**
> On page load, if a URI fragment identifier is specified and identifies an element, the element with the `autofocus` attribute does not receive focus via the `autofocus` attribute. Generally, the element indicated by the fragment receives focus instead.

## Accessibility concerns

Automatically focusing a form control can confuse visually-impaired people using screen-reading technology and people with cognitive impairments. When `autofocus` is assigned, screen-readers "teleport" their user to the form control without warning them beforehand.

Use careful consideration for accessibility when applying the `autofocus` attribute. Automatically focusing on a control can cause the page to scroll on load. The focus can also cause dynamic keyboards to display on some touch devices. While a screen reader will announce the label of the form control receiving focus, the screen reader will not announce anything before the label, and the sighted user on a small device will equally miss the context created by the preceding content.
