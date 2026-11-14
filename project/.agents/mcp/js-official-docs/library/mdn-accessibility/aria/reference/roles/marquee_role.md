---
title: "ARIA: marquee role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/marquee_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: marquee role

A `marquee` is a type of live region containing non-essential information which changes frequently.

## Description

The `marquee` role defines an area as a type of live region that presents non-essential information that changes frequently. Examples of marquees include stock tickers and ad banners; information that is not necessarily sought out by the user that may be presented in any order. The main difference between a `marquee` and a `log` is that log information is presented in a meaningful order such as a by date.

Elements with the role marquee have an implicit aria-live value of `off`.

The marquee is required to have an accessible name. Use `aria-labelledby` if a visible label is present, otherwise use `aria-label`.

### Associated WAI-ARIA roles, states, and properties

- `aria-live`
    Defines when assistive technology should inform the user of updates to content. Elements with the role `marquee` have an implicit `aria-live` value of `off`, meaning screen readers will not announce changes inside the marquee, even when the user is idle.

- `aria-label` or `aria-labelledby`
    The `marquee` is required to have an accessible name. Use `aria-labelledby` if a visible label is present, otherwise use `aria-label`.

## See also

- ARIA: `alert` role
- ARIA: `log` role
- ARIA: `status` role
- ARIA: `timer` role
- ARIA live regions
