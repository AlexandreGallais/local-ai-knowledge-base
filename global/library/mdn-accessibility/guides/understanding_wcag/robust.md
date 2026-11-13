---
title: "Robust"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/understanding_wcag/robust/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Robust

This article provides practical advice on how to write your web content so that it conforms to the success criteria outlined in the **Robust** principle of the Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1. Robust states that content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. This can generally be achieved by following web standards and testing rigorously.

> **Note:**
> To read the W3C definitions for Robust and its guidelines and success criteria, see Principle 4: Robust — Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Guideline 4.1 — Compatible: Maximize compatibility with current and future user agents, including assistive technologies

This guideline focuses on making content as compatible as possible, not only with current user agents (e.g., browsers), but also with future ones too.

       | Success criteria
       | How to conform to the criteria
       | Practical resource

       | 4.1.1 Parsing (A)
       |

          Content should be well-formed so it can be parsed successfully by
          browsers and other user agents such as screen readers.

          To pass this criterion, make sure that your HTML is as valid as
          possible. Use the
          W3C validator to validate your
          markup.

       |
        See
        Debugging HTML
        for a practical guide.

       | 4.1.2 Name, Role, Value (A)
       |

          The name and role of user interface components (e.g., form inputs,
          buttons, links, etc.) should be programmatically determinable.

          When using semantic elements correctly for their intended purpose,
          this criterion should be passed automatically. When scripting custom
          components, you will need to use WAI-ARIA roles and other features to
          make sure your controls will be interpreted and are able to be used as
          intended, e.g., not only by sighted mouse users, but also by
          screen reader users, keyboard-only users, etc.

       |
        See
        HTML: A good basis for accessibility
        and
        WAI-ARIA basics.

       |
        4.1.3 Status Messages (AA)

       |

          Assistive technology users are made aware of new status messages added
          to the page.

       |
        Understanding Status Messages

> **Note:**
> Also see the WCAG description for Guideline 4.1: Compatible: Maximize compatibility with current and future user agents, including assistive technologies.

## See also

- WCAG
  1. Perceivable
  2. Operable
  3. Understandable
  4. Robust
