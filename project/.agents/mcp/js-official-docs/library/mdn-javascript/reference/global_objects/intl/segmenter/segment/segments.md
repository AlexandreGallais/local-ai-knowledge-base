---
title: "Segments"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/segmenter/segment/segments/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Segments

A **`Segments`** object is an iterable collection of the segments of a text string. It is returned by a call to the `segment()` method of an `Intl.Segmenter` object.

## Instance methods

- `Segments.prototype.containing()`
    Returns an object describing the segment in the original string that includes the code unit at a specified index.
- `Segments.prototype[Symbol.iterator]()`
    Returns an iterator to iterate over the segments.

## See also

- `Intl.Segmenter`
- `Intl.Segmenter.prototype.segment()`
