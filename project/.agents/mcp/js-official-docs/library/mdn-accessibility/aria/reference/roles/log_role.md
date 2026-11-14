---
title: "ARIA: log role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/log_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: log role

The `log` role is used to identify an element that creates a live region where new information is added in a meaningful order and old information may disappear.

## Description

A log is a type of live region where new information is added in meaningful order and old information may disappear. Examples include chat logs, messaging history, game log, or an error log. In contrast to other live regions, in this role there is a relationship between the arrival of new items in the log and the reading order. The log contains a meaningful sequence and new information is added only to the end of the log, not at arbitrary points.

In contrast to other types of live region, a log is sequentially ordered and new information is only added to the end of the log. When this role is added to an element, the browser will send out an accessible log event to assistive technology products which can then notify the user about it.

By default, updates contain only the changes to the live region and these are announced when the user is idle. Elements with the role `log` have an implicit `aria-live` value of `polite`. Where the user needs to hear the entire live region upon a change `aria-atomic="true"` should be set. To have announcements made as soon as possible and where the user may be interrupted, `aria-live="assertive"` can be set for more aggressive updates.

### Associated WAI-ARIA roles, states, and properties

- `aria-atomic`
    Defines whether assistive technologies should present all, or only parts of, the changed region. Elements with the role `log` have an implicit `aria-atomic` value of `false`.

- `aria-live`
    Defines when assistive technology should inform the user of updates to content. Elements with the role `log` have an implicit `aria-live` value of `polite`, meaning screen readers will announce changes inside the log when the user is idle.

- `aria-label` and `aria-labelledby`
    The `log` is required to have an accessible name. Use `aria-labelledby` if a visible label is present, otherwise use `aria-label`.

## Best practices

With an area that has scrolling text, such as a stock ticker, the `marquee` role should be used instead.

## See also

- ARIA: `alert` role
- ARIA: `marquee` role
- ARIA: `status` role
- ARIA: `timer` role
- ARIA live regions
