---
title: "`fetchpriority` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/fetchpriority/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `fetchpriority` HTML attribute

The **`fetchpriority`** attribute allows a developer to signal that fetching a particular image early in the loading process has more or less impact on user experience than a browser can reasonably infer when assigning an internal priority.
This in turn allows the browser to increase or decrease the priority, and potentially load the image earlier or later than it would otherwise.

This attribute may be applied to ``, `<link>`, and `<script>` elements. It also has an SVG counterpart.

The fetch priority can be used to complement preloading, allowing a developer to boost the priority ahead of less-impactful resources that have a higher default priority.
For example, if a developer knows that a particular image significantly contributes to the website's Largest Contentful Paint (LCP) they could add `<link rel="preload">` for the image and then further boost the priority using the `fetchpriority` attribute.

Note that both the internal priority of any fetch operation, and the impact of `fetchpriority` on the priority, are entirely browser dependent.

This attribute is enumerated and can have one of the following values:

- `high`
    Fetches the external resource at a high priority relative to other external resources.
- `low`
    Fetches the external resource at a low priority relative to other external resources.
- `auto`
    Doesn't set a preference for the fetch priority.
    It is used if no value or an invalid value is set.
    This is the default.

## Usage notes

The attribute should be used sparingly, as excessive or incorrect prioritization can degrade performance.

## See also

- SVG `fetchpriority` attribute
