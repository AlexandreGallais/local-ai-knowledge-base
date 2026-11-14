---
title: "Content categories"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/guides/content_categories/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Content categories

Most HTML elements are a member of one or more **content categories** — these categories group elements that share common characteristics. This is a loose grouping (it doesn't actually create a relationship among elements of these categories), but they help define and describe the categories' shared behavior and their associated rules. It's possible for elements to not be a member of _any_ of these categories.

The content categories are used to define the _content model_ of elements, in other words, what each element can take as descendants. For example, the `` element can only contain _phrasing content_, while the `` element can contain _flow content_. Some elements, like ``, have a _transparent_ content model.

There are seven main content categories, which can be summarized with the Venn diagram below:

> **Note:**
> A more detailed discussion of these content categories and their comparative functionalities is beyond the scope of this article; for that, you may wish to read the relevant portions of the HTML specification.

## Metadata content

Elements belonging to the _metadata content_ category modify the presentation or the behavior of the rest of the document, set up links to other documents, or convey other _out-of-band_ information. Everything in the `<head>`, including the `<title>`, `<link>`, `<script>`, `<style>`, and the lesser used `<base>`, is metadata content. There is a `<meta>` element for metadata that cannot be represented by these other elements.

The metadata elements are:

- `<base>`
- `<link>`
- `<meta>`
- `<noscript>`
- `<script>`
- `<style>`
- `<template>`
- `<title>`

Some of these elements belong to more than one content category. For example, `<script>` is a member of the metadata, flow, and phrasing content categories, and is a script-supporting element; `<script>` can be used where metadata content, phrasing content, or script-supporting elements are expected.

## Flow content

Flow content is a broad category that encompasses most elements that can go inside the `<body>` element, including heading elements, sectioning elements, phrasing elements, embedding elements, interactive elements, and form-related elements. It also includes text nodes (but not those that only consist of white space characters).

The flow elements are:

- ``
- ``
- `<address>`
- ``
- ``
- `<audio>`
- ``
- `<bdi>`
- `<bdo>`
- ``
- ``
- ``
- `<canvas>`
- ``
- `<code>`
- `<data>`
- `<datalist>`
- ``
- ``
- ``
- `<dialog>`
- ``
- ``
- ``
- ``
- `<fieldset>`
- ``
- ``
- `<form>`
- `<geolocation>`
- `<`<h1>`-`<h6>`>`
- ``
- `<hgroup>`
- ``
- ``
- ``
- ``
- ``
- ``
- `<kbd>`
- ``
- ``
- `<map>`
- ``
-
- `<menu>`
- `<meter>`
- ``
- `<noscript>`
- `<object>`
- ``
- `<output>`
- ``
- ``
- `<pre>`
- `<progress>`
- `<q>`
- `<ruby>`
- ``
- ``
- `<script>`
- `<search>`
- ``
- `<select>`
- `<slot>`
- ``
- ``
- ``
- `<style>`
- ``
- ``
- ``
- ``
- `<template>`
- `<textarea>`
- `<time>`
- ``
- ``
- ``
- ``
- ``
- Autonomous custom elements
- Plain text

A few other elements belong to this category, but only if a specific condition is fulfilled:

- `<area>`, if it is a descendant of a `<map>` element
- `<link>`, if the `itemprop` attribute is present
- `<meta>`, if the `itemprop` attribute is present

## Sectioning content

Sectioning content, a subset of flow content, creates a section in the current outline defining the scope of `` and `` elements.

The sectioning elements are:

- ``
- ``
- ``
- ``

## Heading content

Heading content, a subset of flow content, defines the title of a section. This definition applies both to sections marked by an explicit sectioning content elements and to those implicitly defined by the heading content itself.

The heading elements are:

- `<`<h1>`-`<h6>`>`
- `<hgroup>`

> **Note:**
> Though likely to contain heading content, the `` is not heading content itself.

## Phrasing content

Phrasing content, a subset of flow content, refers to the text and the markup within a document. Sequences of phrasing content make up paragraphs.

The phrasing elements are:

- ``
- `<audio>`
- ``
- `<bdi>`
- `<bdo>`
- ``
- ``
- `<canvas>`
- ``
- `<code>`
- `<data>`
- `<datalist>`
- ``
- ``
- ``
- ``
- ``
- ``
- ``
- `<kbd>`
- ``
- ``
-
- `<meter>`
- `<noscript>`
- `<object>`
- `<output>`
- ``
- `<progress>`
- `<q>`
- `<ruby>`
- ``
- ``
- `<script>`
- `<select>`
- `<slot>`
- ``
- ``
- ``
- ``
- ``
- ``
- `<template>`
- `<textarea>`
- `<time>`
- ``
- ``
- ``
- ``
- Autonomous custom elements
- Plain text

A few other elements belong to this category, but only if a specific condition is fulfilled:

- ``, if it contains only phrasing content
- `<area>`, if it is a descendant of a `<map>` element
- ``, if it contains only phrasing content
- ``, if it contains only phrasing content
- `<link>`, if the `itemprop` attribute is present
- `<map>`, if it contains only phrasing content
- `<meta>`, if the `itemprop` attribute is present

## Embedded content

Embedded content, a subset of flow content, imports another resource or inserts content from another markup language or namespace into the document.

The embedded content elements are:

- `<audio>`
- `<canvas>`
- ``
- ``
- ``
-
- `<object>`
- ``
- ``
- ``

## Interactive content

Interactive content, a subset of flow content, includes elements that are specifically designed for user interaction.

The interactive content elements are:

- ``
- ``
- ``
- ``
- ``
- `<select>`
- `<textarea>`

Some elements belong to this category only under specific conditions:

- ``, if the `href` attribute is present
- `<audio>`, if the `controls` attribute is present
- ``, if the `usemap` attribute is present
- ``, if the `type` attribute is not in the hidden state
- `<object>`, if the `usemap` attribute is present
- ``, if the `controls` attribute is present

## Palpable content

**Palpable content** is content that is neither empty nor hidden; it is content that is rendered and substantive. Palpable content is not used to define content models but is used to define a general rule: Elements whose content model allows any flow content or phrasing content should have at least one node in its contents that is palpable content and that does not have the `hidden` attribute specified.

The palpable elements are:

- ``
- ``
- `<address>`
- ``
- ``
- ``
- `<bdi>`
- `<bdo>`
- ``
- ``
- `<canvas>`
- ``
- `<code>`
- `<data>`
- ``
- ``
- ``
- ``
- ``
- ``
- `<fieldset>`
- ``
- ``
- `<form>`
- ``
- ``
- ``
- `<kbd>`
- ``
- ``
- `<map>`
- ``
-
- `<meter>`
- ``
- `<object>`
- ``
- ``
- `<pre>`
- `<progress>`
- `<q>`
- `<ruby>`
- ``
- ``
- `<search>`
- ``
- `<select>`
- ``
- ``
- ``
- ``
- ``
- ``
- ``
- `<textarea>`
- `<time>`
- ``
- ``
- ``
- Autonomous custom elements
- Plain text that is not inter-element whitespace

Some elements belong to this category only under specific conditions:

- `<audio>`, if the `controls` attribute is present
- ``, if the element's children include at least one name-value group
- ``, if the type attribute is not in the hidden state
- ``, if its children include at least one `` element
- ``, if its children include at least one `` element

## Elements without a category

Several elements are not a member of _any_ content category. These include:

- ``
- ``
- ``
- ``
- ``
- ``
- `<head>`
- `<html>`
- `<legend>`
- ``
- `<optgroup>`
- `<option>`
- `<param>`
- `<rb>`
- `<rp>`
- `<rt>`
- `<rtc>`
- ``
- ``
- ``
- ` | `
- ``
- ``
- `<track>`

## Script-supporting elements

**Script-supporting elements** are elements that don't directly contribute to a document's rendered output. Instead, they serve to support scripts, either by containing or specifying script code directly or by specifying data that will be used by scripts. Nearly all elements, including those that only take specific elements (such as ``, which takes `` elements), can contain script-supporting elements.

The script-supporting elements are:

- `<script>`
- `<template>`

## Form-associated content

Form-associated content is a subset of flow content comprising elements that have a form owner and can be used everywhere flow content is expected. A form owner is either the containing `<form>` element or the `<form>` whose `id` is specified in the element's `form` attribute.

The form-associated elements are:

- ``
- `<fieldset>`
- ``
- `<object>`
- `<output>`
- `<select>`
- `<textarea>`
- ``

This category contains several sub-categories:

- listed
    Elements that are listed in the `HTMLFormElement.elements` and `HTMLFieldSetElement.elements` collections. Includes ``, `<fieldset>`, ``, `<object>`, `<output>`, `<select>`, and `<textarea>`.
- submittable
    Elements that can be used for constructing the form data set when the form is submitted. Includes ``, ``, `<select>`, and `<textarea>`.
- resettable
    Elements that can be affected when a form is reset. Includes ``, `<output>`, `<select>`, and `<textarea>`.
- autocapitalize-and-autocorrect-inheriting
    Elements that inherit the `autocapitalize` and `autocorrect` attributes from their form owner. Includes ``, `<fieldset>`, ``, `<output>`, `<select>`, and `<textarea>`.
- labelable
    Elements that can be associated with `` elements. Includes ``, `` (all types other than `hidden`), `<meter>`, `<output>`, `<progress>`, `<select>`, and `<textarea>`.

## Transparent content model

In addition to the listed content categories, an element's content model may also be defined as "transparent". If an element X's permitted content is "transparent", then we look at the parent of X. We intersect the permitted content of X's parent with the content categories of X, and the result is what "transparent" means in this context. If the parent of X also has a transparent content model, then we continue up the tree until we find a non-transparent content model. When there's no such parent, "transparent" means "flow content".

For example, a `<ruby>` element accepts phrasing content. The `` element is of category phrasing content when it contains only phrasing content. Therefore, an `` element can be placed inside a `<ruby>` element. The `` element's permitted content is "transparent", which when nested in `<ruby>` means "phrasing content". However, `<rt>` elements are not phrasing content. Therefore, an `<rt>` element cannot be nested inside this `` element, even though both `<rt>` and `` can be inside `<ruby>`, and `` is "transparent".

```html
<ruby>
  Text before
  <ins>
    <!-- Invalid: rt cannot be placed inside ins here -->
    <rt>Pronunciation</rt>
  </ins>
</ruby>
```

```html
<ruby>
  Text before
  <!-- Valid: ins can be inside ruby, and rt can be inside ruby -->
  <ins>Inserted text</ins>
  <rt>Pronunciation</rt>
</ruby>
```

```html
<ruby>
  Text before
  <!-- Valid: rt can be inside ruby, and ins can be inside rt -->
  <rt><ins>Pronunciation</ins></rt>
</ruby>
```

Transparent is a _content model_, not a _content category_, so it only defines what an element can contain, not where the element can be placed. That is, when determining an element's children's licitness, you cannot "see through" transparent children. For example, a `` element accepts only `` elements and script-supporting elements, and does not allow `` or ``, even if the `` only contains `` elements.

```html
<ul>
  <del>
    <li>Oranges</li>
    <li>Toilet paper</li>
  </del>
  <li>Toothpaste</li>
</ul>
```

```html
<ul>
  <li><del>Oranges</del></li>
  <li><del>Toilet paper</del></li>
  <li>Toothpaste</li>
</ul>
```
