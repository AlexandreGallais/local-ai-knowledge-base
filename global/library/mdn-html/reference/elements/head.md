---
title: "`<head>` HTML document metadata (header) element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/head/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<head>` HTML document metadata (header) element

The **`<head>`** HTML element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets. There can be only one `<head>` element in an HTML document.

> **Note:**
> `<head>` primarily holds information for machine processing, not human-readability. For human-visible information, like top-level headings and listed authors, see the `` element.

## Attributes

This element includes the global attributes.

- `profile` (deprecated)
    The URIs of one or more metadata profiles, separated by white space.

## Examples

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Document title</title>
  </head>
</html>
```

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |

          If the document is an ``
          `srcdoc` document, or if title
          information is available from a higher level protocol (like the
          subject line in HTML email), zero or more elements of metadata
          content.

          Otherwise, one or more elements of metadata content where exactly one
          is a `<title>` element.

       | Tag omission
       |
        The start tag may be omitted if the first thing inside the
        `&#x3C;head>` element is an element.The end tag may be
        omitted if the first thing following the
        `&#x3C;head>` element is not a space character or a comment.

       | Permitted parents
       | An `<html>` element, as its first child.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLHeadElement`

## See also

- Elements that can be used inside the `<head>`:
  - `<title>`
  - `<base>`
  - `<link>`
  - `<style>`
  - `<meta>`
  - `<script>`
  - `<noscript>`
  - `<template>`
