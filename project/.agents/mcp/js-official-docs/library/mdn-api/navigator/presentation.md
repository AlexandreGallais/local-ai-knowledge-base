---
title: "Navigator: presentation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/presentation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: presentation property

The `presentation` read-only property of `Navigator` serves as the entry
point for the Presentation API and
returns a reference to `Presentation` object.

## Value

A reference to `Presentation` object.

## Examples

Currently, the `navigator.presentation` property is most useful for feature checking, and, for the receiving user agent, to access the `PresentationReceiver`.

```js
// Check if the Presentation API is available in the current browser
if ("presentation" in navigator) {
  footer.textContent = navigator.presentation.receiver
    ? "Receiving presentation"
    : "(idle)";
} else {
  console.error("Presentation API is not available in this browser.");
}
```

## See also

- Presentation API
- `Presentation`
