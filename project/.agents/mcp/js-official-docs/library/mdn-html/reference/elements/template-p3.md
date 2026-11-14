---
title: "`<template>` HTML content template element (part 3 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/template/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<template>` HTML content template element (part 3 of 3)

### Including markers in `<template for>` to allow contents to be repatched later

You can also insert markers inside `<template for>` elements, creating new placeholders to enable patching the same content multiple times. You can reuse existing `name` attributes.

For example, if you are building a Single Page Application (SPA) with `<template for>`, you may wish to allow the `<title>` to be patched on each route update, which could be achieved like this:

```html
<head>
  ...
  <?start name="title">
  <title>Loading...</title>
  <?end>
  ...
</head>
<body>
  ...
  <template for="title"><?start name="title"><title>The actual title of the page</title><?end></template>
  ...
</body>
```

This will result in the following once the `<template>` element is parsed:

```html
<head>
  ...
  <?start name="title"><title>The actual title of the page</title><?end>
  ...
</head>
<body>
  ...
</body>
```

Later on, a new `<template for="title">` could be inserted into the DOM to replace the `<title>` again.

## Technical summary

       |
        Content categories

       |
        Metadata content,
        flow content,
        phrasing content,
        script-supporting element

       | Permitted content
       | Nothing (see Usage notes)

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        metadata content,
        phrasing content, or
        script-supporting elements. Also allowed as a child of a ``
        element that does not have a
        `span` attribute.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLTemplateElement`

## See also

- `part` and `exportparts` HTML attributes
- `<slot>` HTML element
- `:has-slotted`, `:host`, `:host()`, and `:host-context()` CSS pseudo-classes
- `::part` and `::slotted` CSS pseudo-elements
- `ShadowRoot` interface
- Using templates and slots
- CSS scoping module
- Declarative Shadow DOM (with html) in _Using Shadow DOM_
- Declarative shadow DOM on web.dev (2023)
