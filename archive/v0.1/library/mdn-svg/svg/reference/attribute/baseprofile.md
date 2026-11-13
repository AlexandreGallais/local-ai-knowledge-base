---
title: "baseProfile"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/baseprofile/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# baseProfile

The **`baseProfile`** attribute describes the minimum SVG language profile that the author believes is necessary to correctly render the content. The attribute does not specify any processing restrictions; it can be considered metadata.

For example, the value of the attribute could be used by an authoring tool to warn the user when they are modifying the document beyond the scope of the specified base profile.

Each SVG profile should define the text that is appropriate for this attribute.

You can use this attribute with the following SVG elements:

- ``

## Context notes

       | Value
       | Profile name

       | Default value
       | `none`

       | Animatable
       | No

## Example

```svg
<svg width="120" height="120" version="1.1"
 xmlns="http://www.w3.org/2000/svg" baseProfile="full">

  ...

</svg>
```
