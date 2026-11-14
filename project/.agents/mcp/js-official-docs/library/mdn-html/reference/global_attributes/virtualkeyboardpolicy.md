---
title: "`virtualkeyboardpolicy` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/virtualkeyboardpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `virtualkeyboardpolicy` HTML global attribute

The **`virtualkeyboardpolicy`** global attribute is an enumerated attribute. When specified on an element that the element's content is editable (for example, it is an `` or `<textarea>` element, or an element with the `contenteditable` attribute set), it controls the on-screen virtual keyboard behavior on devices such as tablets, mobile phones, or other devices where a hardware keyboard may not be available.

The attribute must take one of the following values:

- `auto` or an _empty string_, which automatically shows the virtual keyboard when the element is focused or tapped.
- `manual`, which decouples focus and tap on the element from the virtual keyboard's state.

## See also

- All global attributes
- `HTMLElement.contentEditable` and `HTMLElement.isContentEditable`
- `The VirtualKeyboard API`
