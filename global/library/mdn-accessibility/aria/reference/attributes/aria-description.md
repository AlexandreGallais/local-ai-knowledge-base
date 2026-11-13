---
title: "ARIA: aria-description attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-description/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-description attribute

The global `aria-description` attribute defines a string value that describes or annotates the current element.

> **Note:**
> `aria-description` is still in W3C Editor's Draft for ARIA 1.3. For the time being, continue to use `aria-describedby`, which has been supported since ARIA 1.1.

## Description

The global `aria-description` attribute provides a mechanism for the developer to describe or annotate the current element providing greater context for assistive technology users.

```html
<div
  role="application"
  aria-label="calendar"
  aria-description="Game schedule for the Boston Red Sox 2021 Season">
  <h1>Red Sox 2021</h1>
  <div role="grid">…</div>
</div>
```

The `aria-description` attribute is similar to `aria-label` in that both provide a text string to associate with the element, but a label should be short and concise, while the description can be longer as it is intended to provide more context and information.

The `aria-description` and `aria-describedby` properties have the same purpose; both provide the user with additional descriptive text for the object on which it is set. If descriptive text is available in the DOM, use `aria-describedby` instead.

The `aria-description` property should only be used when providing a visible description is not the desired user experience. The `aria-describedby` attribute takes as its value a list of `id`s of the elements that contain descriptive text about the object. The `aria-description` is used when there is no appropriate descriptive text that can be associated with the object by `id` reference. If both attributes are present, `aria-describedby` takes precedence in defining the accessible description property.

The content of the description, whether set by `aria-description` or `aria-describedby`, should be flat text. If the content is very long, has semantic meaning requirements, or has a navigational structure, use `aria-details` instead.

## Values

- `<string>`
    The value is a string, an unconstrained value type, that is intended to be conveyed to the assistive technology user.

## Associated interfaces

- `Element.ariaDescription`
    The `ariaDescription` property, part of the `Element` interface, reflects the value of the `aria-description` attribute, which defines a string value that describes or annotates the current element.

## Associated roles

Used in **ALL** roles.

## See also

- HTML `title` attribute
- `aria-describedby`
- `aria-details`
