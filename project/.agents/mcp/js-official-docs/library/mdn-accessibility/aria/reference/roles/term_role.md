---
title: "ARIA: term role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/term_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: term role

The `term` role can be used for a word or phrase with an optional corresponding `definition`.

## Description

The `term` role can be used for a word or phrase with an optional corresponding `definition`. It is equivalent in semantics to the HTML `` element and the definition term (``) element within a definition list (`` ).

The `term` role is used to explicitly identify a word or phrase for which a definition has been provided by the author or is expected to be provided by the user. If there is an existing definition, or a form or form control to enter a definition, authors SHOULD set `aria-details` to point to the related element.

Don't use the `role="term"` on interactive elements like links because it can interfere with assistive technology users ability to interact with the element. Also, the term itself is the accessible name, so do not use `aria-label` or `aria-labelledby`.

> **Warning:**
> The accessible name should be the term itself, so DO NOT use `aria-label` or `aria-labelledby`.

### Associated WAI-ARIA roles, states, and properties

None.

### Keyboard interactions

None.

### Required JavaScript features

None.

## Examples

```html
<p>
  <span role="term">Mansplaining</span>,
  <span role="definition"
    >a portmanteau of "man" and "explain", is the patronizing act of explaining
    without being asked to do so, to someone already learned on the topic, often
    after someone has already explained it</span
  >.
</p>
```

Including better semantics, the above could also be written:

```html
<p>
  <dfn role="term">Mansplaining</dfn>,
  <span role="definition"
    >a portmanteau of "man" and "explain", is the patronizing act of explaining
    without being asked to do so, to someone already learned on the topic, often
    after someone has already explained it</span
  >.
</p>
```

or without any ARIA (but possibly not how you want it presented)

```html
<dl>
  <dt>Mansplaining</dt>
  <dd>
    A portmanteau of "man" and "explain", is the patronizing act of explaining
    without being asked to do so, to someone already learned on the topic, often
    after someone has already explained it.
  </dd>
</dl>
```

## Accessibility concerns

Don't use the `role="term"` on interactive elements such as links as it can interfere with the assistive technology user's ability to interact with the element.

## Best practices

Allow the term itself to define the accessible name. Do not use `aria-label` or `aria-labelledby`.

## See also

- ARIA: `definition` role.
- The HTML `` element
