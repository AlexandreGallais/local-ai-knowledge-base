---
title: "StyleSheet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/stylesheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StyleSheet

An object implementing the `StyleSheet` interface represents a single style sheet. CSS style sheets will further implement the more specialized `CSSStyleSheet` interface.

## Instance properties

- `StyleSheet.disabled`
    A boolean value representing whether the current stylesheet has been applied or not.
- `StyleSheet.href` (read-only)
    Returns a string representing the location of the stylesheet.
- `StyleSheet.media` (read-only)
    Returns a `MediaList` representing the intended destination medium for style information.
- `StyleSheet.ownerNode` (read-only)
    Returns a `Node` associating this style sheet with the current document.
- `StyleSheet.parentStyleSheet` (read-only)
    Returns a `StyleSheet` including this one, if any; returns `null` if there aren't any.
- `StyleSheet.title` (read-only)
    Returns a string representing the advisory title of the current style sheet.
- `StyleSheet.type` (read-only)
    Returns a string representing the style sheet language for this style sheet.

## See also

- `CSSStyleSheet`
