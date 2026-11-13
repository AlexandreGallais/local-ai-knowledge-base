---
title: "Error: Permission denied to access property \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/property_access_denied/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error: Permission denied to access property "x"

The JavaScript exception "Permission denied to access property" occurs when there was
an attempt to access an object for which you have no permission.

## Message

```plain
DOMException: Blocked a frame with origin "x" from accessing a cross-origin frame. (Chromium-based)
DOMException: Permission denied to access property "x" on cross-origin object (Firefox)
SecurityError: Blocked a frame with origin "x" from accessing a cross-origin frame. Protocols, domains, and ports must match. (Safari)
```

## Error type

`DOMException`.

## What went wrong?

There was attempt to access an object for which you have no permission. This is likely
an `` element loaded from a different domain for which you
violated the same-origin policy.

## Examples

### No permission to access document

```html
<iframe id="myframe" src="http://www1.w3c-test.org/common/blank.html"></iframe>
```

```js
console.log(frames[0].document);
// Error: Permission denied to access property "document"
```

## See also

- ``
- Same-origin policy
