---
title: "ARIA: status role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/status_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: status role

The `status` role defines a live region containing advisory information for the user that is not important enough to be an `alert`.

## Description

A `status` is a type of live region providing advisory information that is not important enough to justify an alert, which would immediately interrupt the announcement of a user's current activity. It is often, but not necessarily, presented as a status bar.

Do not give focus to the status when its content updates. Live regions are meant to inform users of dynamic updates that have occurred in other areas of the current web page, but which do not necessitate interrupting the user's current activity with a change in context. If a situation requires that focus needs to be moved, then using a `status`, or other live region, are likely not appropriate.

Elements with the role status have an implicit `aria-live` value of `polite` and an implicit `aria-atomic` value of `true`.

### Associated WAI-ARIA roles, states, and properties

- `aria-atomic`
    Defines whether assistive technologies should present all, or only parts of, the changed region. Elements with the role `status` have an implicit `aria-atomic` value of `true`.

- `aria-live`
    Defines when assistive technology should inform the user of updates to content. Elements with the role `status` have an implicit `aria-live` value of `polite`, meaning screen readers will announce changes inside the log when the user is idle.

- `aria-label` or `aria-labelledby`
    Some screen readers announce the name of a status element before announcing its contents. If a name is visible, reference it using `aria-labelledby`. Including an `aria-label` provides a method for prefacing the visible content of a status element with text that is not displayed when a screen reader reads the content. Naming a status is not required so if nothing is appropriate both these attributes can be omitted.

## See also

- ARIA: `alert` role
- ARIA: `log` role
- ARIA: `marquee` role
- ARIA: `timer` role
- ARIA live regions
