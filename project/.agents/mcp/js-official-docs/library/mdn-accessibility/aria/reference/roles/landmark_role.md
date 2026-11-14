---
title: "ARIA: landmark role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/landmark_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: landmark role

A landmark is an important subsection of a page. The `landmark` role is an abstract superclass for the aria role values for sections of content that are important enough that users will likely want to be able to navigate directly to them.

> **Note:**
> The `landmark` role is an abstract role. It is included here for completeness of documentation. It should not be used by web authors.

## Description

A `landmark` is an abstract role for a section of content that is important enough that users will likely want to be able to navigate to the section easily and have it included in a dynamically generated summary of the page. Landmarks allow assistive technologies to navigate and to find content quickly.

To create a landmark role, define the purpose of the content by using a semantic element such as ``, ``, or ``, or adding an ARIA role that is a subclass of the `landmark` role such as `role="banner"`, `role="complementary"`, or `role="region"`. Do not use `role="landmark"`.

Every concrete landmark role has its corresponding HTML semantic element:

| ARIA Role                                                                                | HTML Element               |
| ---------------------------------------------------------------------------------------- | -------------------------- |
| `banner`               | ``  |
| `complementary` | ``   |
| `contentinfo`     | ``  |
| `form`                   | `<form>`    |
| `main`                   | ``    |
| `navigation`       | ``     |
| `region`               | `` |
| `search`               | `<search>`  |

A visible label should be provided, referenced with `aria-labelledby`. If necessary, brief, descriptive, label can be provided with `aria-label`.

For screen reader users, adding landmark roles effectively creates 'skip links' for screen reader users, but don't replace in page navigation as the landmark roles are not otherwise surfaced.

## Best practices

Do not use `role="landmark"`; rather, use subclass landmark roles as appropriate, or semantic HTML if possible. Although no longer necessary, it is considered good practice to redundantly include the subclass landmark roles with the associated semantic element for legacy browsers. This is preferable to using landmark roles on non-semantic elements, such as ``, but do use at least one of `role` or semantic elements for creating landmarks. Otherwise, your content will be less navigable for screen reader users.

## See also

- ARIA: `section` role
- ARIA: `banner` role
- ARIA: `complementary` role
- ARIA: `contentinfo` role
- ARIA: `form` role
- ARIA: `main` role
- ARIA: `navigation` role
- ARIA: `region` role
- ARIA: `search` role
- Using HTML landmark roles to improve accessibility on MDN blog (2023)
