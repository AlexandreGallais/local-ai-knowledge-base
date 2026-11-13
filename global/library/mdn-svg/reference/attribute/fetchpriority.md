---
title: "fetchpriority"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/fetchpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# fetchpriority

The `fetchpriority` attribute provides a hint to the browser about the relative priority to use when fetching an external resource. This works the same way as the `fetchpriority` attribute for the HTML `` and `<script>` elements.

You can use this attribute with the following SVG elements:

- `<feimage>`
- `<image>`
- `<script>`

## Examples

This example shows how to set an SVG `<script>` element priority to `high`.

```html
<svg
  viewBox="0 0 10 10"
  height="120px"
  width="120px"
  xmlns="http://www.w3.org/2000/svg">
  <circle id="normal" cx="5" cy="5" r="4" />
  <script href="./color-change.js" fetchpriority="high"></script>
</svg>
```

## Usage notes

       | Value
       | `high` | `low` | `auto`

       | Default value
       | `auto`

- `high`
    Fetches the external resource at a high priority relative to other external resources.
- `low`
    Fetches the external resource at a low priority relative to other external resources.
- `auto`
    Doesn't set a preference for the fetch priority.
    It is used if no value or an invalid value is set.
    This is the default.

## See also

- SVG `<script>` element
- HTML `fetchpriority` attribute
