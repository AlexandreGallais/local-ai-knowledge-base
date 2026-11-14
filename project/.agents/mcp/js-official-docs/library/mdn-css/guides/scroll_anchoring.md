---
title: "CSS scroll anchoring"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll_anchoring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS scroll anchoring

The **CSS scroll anchoring** module defines a mechanism to prevent page movement due to DOM changes above the visible region of a scrolling box while the user is consuming the visible content.

Scroll anchoring attempts to keep the user's view of the document stable across layout changes. It works by selecting a DOM node (the anchor node) whose movement is used to determine adjustments to the scroll position. The anchor node is always a descendant of the scrolling box.

For scroll containers that are snapped to an element, scroll anchoring is limited to adjustments that would be allowed by re-snapping.

## Reference

### Properties

- `overflow-anchor`

## Glossary terms

- Scroll container
- Scroll snap

## Guides

- Overview of scroll anchoring
    What is scroll anchoring, suppression triggers, and when and how to enable and disable this browser feature.

## Related concepts

- `overscroll-behavior`

## See also

- CSS overflow module
- CSS scroll snap module
- CSS overscroll behavior module
