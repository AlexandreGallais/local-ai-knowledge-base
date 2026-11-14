---
title: "`<template>` HTML content template element (part 1 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/template/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<template>` HTML content template element

The **`<template>`** HTML element serves as a mechanism for holding HTML fragments, which can either be used later via JavaScript, generated immediately and inserted into a shadow DOM, or used as part of out-of-order patching with `<template for="...">`.

## Attributes

This element includes the global attributes.

- `for` (experimental)
    The `for` attribute is used for out-of-order patching with `<template for="...">`, matching an equivalent `<?start id="...">` or `<?marker "...">` marker. See the out-of-order patching section and examples section.

- `shadowrootmode`
    Creates a shadow root for the parent element.
    It is a declarative version of the `Element.attachShadow()` method and accepts the same enumerated values.
    - `open`
        Exposes the internal shadow root DOM for JavaScript (recommended for most use cases).

    - `closed`
        Hides the internal shadow root DOM from JavaScript.

    > **Note:**
    > The HTML parser creates a `ShadowRoot` object in the DOM for the first `<template>` in a node with this attribute set to an allowed value.
    > If the attribute is not set, or not set to an allowed value — or if a `ShadowRoot` has already been declaratively created in the same parent — then an `HTMLTemplateElement` is constructed.
    > A `HTMLTemplateElement` cannot subsequently be changed into a shadow root after parsing, for example, by setting `HTMLTemplateElement.shadowRootMode`.

    > **Note:**
    > You may find the non-standard `shadowroot` attribute in older tutorials and examples that used to be supported in Chrome 90-110. This attribute has since been removed and replaced by the standard `shadowrootmode` attribute.

- `shadowrootclonable`
    Sets the value of the `clonable` property of a `ShadowRoot` created using this element to `true`.
    If set, a clone of the shadow host (the parent element of this `<template>`) created with `Node.cloneNode()` or `Document.importNode()` will include a shadow root in the copy.

- `shadowrootcustomelementregistry`
    Sets the `customElementRegistry` property of a `ShadowRoot` created using this element to `null`, rather than the document's custom element registry.
    This allows a scoped `CustomElementRegistry` to be attached later using `CustomElementRegistry.initialize()`.

- `shadowrootdelegatesfocus`
    Sets the value of the `delegatesFocus` property of a `ShadowRoot` created using this element to `true`.
    If this is set and a non-focusable element in the shadow tree is selected, then focus is delegated to the first focusable element in the tree.
    The value defaults to `false`.

- `shadowrootreferencetarget` (experimental) (non-standard)
    Sets the value of the `referenceTarget` property of a `ShadowRoot` created using this element. The value should be the ID of an element inside the shadow DOM. If set, target references to the host element from outside the shadow DOM will cause the referenced target element to become the effective target of the reference to the host element.

- `shadowrootserializable`
    Sets the value of the `serializable` property of a `ShadowRoot` created using this element to `true`.
    If set, the shadow root may be serialized by calling the `Element.getHTML()` or `ShadowRoot.getHTML()` methods with the `options.serializableShadowRoots` parameter set `true`.
    The value defaults to `false`.

- `shadowrootslotassignment` (experimental)
    Sets the `slotAssignment` property of a `ShadowRoot` created using this element.
    This is the declarative equivalent of the `slotAssignment` option of the `Element.attachShadow()` method.
    - `named`
        Elements are automatically assigned to `<slot>` elements within this shadow root.
        This is the default value.

        Elements with the `slot` attribute are assigned to the first `<slot>` in the template that has the corresponding `name` attribute.
        If multiple elements specify the same slot name, they are all added to the first slot in the template that has that name, and rendered in the order they are declared.
        All unnamed elements — elements that don't specify a `slot` attribute — are assigned to the default slot in the order they are declared.
        This is the first unnamed `<slot>` in the template.

    - `manual`
        Elements are manually assigned to particular slot elements using `HTMLSlotElement.assign()`.
        No automatic assignment takes place.

## Usage notes

This element has no permitted content, because everything nested inside it in the HTML source does not actually become the children of the `<template>` element. The `Node.childNodes` property of the `<template>` element is always empty, and you can only access said nested content via the special `content` property. However, if you call `Node.appendChild()` or similar methods on the `<template>` element, then you would be inserting children into the `<template>` element itself, which is a violation of its content model and does not actually update the `DocumentFragment` returned by the `content` property.

Due to the way the `<template>` element is parsed, all `<html>`, `<head>`, and `<body>` opening and closing tags inside the template are syntax errors and are ignored by the parser, so `<template><head><title>Test</title></head></template>` is the same as `<template><title>Test</title></template>`.

There are three main ways to use the `<template>` element.

### Template document fragment

By default, the element's content is not rendered.
The corresponding `HTMLTemplateElement` interface includes a standard `content` property (without an equivalent content/markup attribute). This `content` property is read-only and holds a `DocumentFragment` that contains the DOM subtree represented by the template.

The `Node.cloneNode()` and `Document.importNode()` methods both create a copy of a node. The difference is that `importNode()` clones the node in the context of the calling document, whereas `cloneNode()` uses the document of the node being cloned. The document context determines the `CustomElementRegistry` for constructing any custom elements. For this reason, use `document.importNode()` to clone the `content` fragment so that custom element descendants are constructed using the definitions in the current document, rather than the separate document that owns the template content. See the `Node.cloneNode()` page's examples for more details.

Note that the `DocumentFragment` container itself should not have data attached to it. See the Data on the DocumentFragment is not cloned example for more details.

### Declarative Shadow DOM

If the `<template>` element contains the `shadowrootmode` attribute with a value of either `open` or `closed`, the HTML parser will immediately generate a shadow DOM. The element is replaced in the DOM by its content wrapped in a `ShadowRoot`, which is attached to the parent element.
This is the declarative equivalent of calling `Element.attachShadow()` to attach a shadow root to an element.

If the element has any other value for `shadowrootmode`, or does not have the `shadowrootmode` attribute, the parser generates a `HTMLTemplateElement`.
Similarly, if there are multiple declarative shadow roots, only the first one is replaced by a `ShadowRoot` — subsequent instances are parsed as `HTMLTemplateElement` objects.

Other attributes prefixed with `shadowroot` allow declarative customization of the `ShadowRoot`, such as controlling how slots are assigned.

### Out-of-order patching

> **Note:**
> This use case is still experimental and has limited browser support.
> See the browser compatibility table for browser support information.

Traditionally, HTML is delivered in order and read, processed, and displayed from top to bottom. To change that order, you can either hide or rearrange elements with CSS or update the DOM produced by the HTML afterwards with JavaScript. However, many pages are composed of multiple parts that may be ready to render at different times, or that may be more important to deliver to the user earlier.

The `<template>` element allows for delivering HTML out-of-order, which involves replacing processing instruction markers with the contents of the `<template>` element (also referred to as **patching**).

For example, a `<?marker name="my-identifier">` processing instruction marker can be patched with the contents of a `<template for="my-identifier">` element supplied much later in the HTML. See the Using `<template for>` for patching example.

As well as the `<?marker>` processing instructions marker, a `<?start>` and `<?end>` pair can be used to contain temporary content (for example, `<?start name="my-identifier">Loading...<?end>`), which is temporarily shown until the `<template for="my-identifier">` is processed and the whole section is replaced. See the Using `<template for>` for range patching example.

When written in HTML, processing instructions can be provided with or without the trailing `?`, and the browser will add it if not supplied when parsing the DOM. Both `<?start?>` and `<?start>` are therefore valid and parsed as `<?start?>`. XML is stricter and requires the trailing `?`.

If the `for` attribute does not match any marker processing instruction `name`, the `<template>` content will remain hidden in the DOM and won't be used in any patch.

To prevent components from updating unrelated parts of the DOM, `<template for="...">` elements can only patch markers inside the `<template>` parent's DOM tree. The only exception is `<template>` elements that are direct children of the `<body>` element — they can also patch `<head>` elements to allow updating `<title>` and other `<head>` elements.
