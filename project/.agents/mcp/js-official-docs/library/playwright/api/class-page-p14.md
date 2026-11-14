---
title: "class: Page (part 14 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 14 of 14)

## async method: Page.waitForEvent2
* since: v1.8
* langs: python
  - alias-python: wait_for_event
- returns: <[any]>

:::note
In most cases, you should use [`method: Page.waitForEvent`].
:::

Waits for given `event` to fire. If predicate is provided, it passes
event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the page is closed before the `event` is fired.

### param: Page.waitForEvent2.event = %%-wait-for-event-event-%%
* since: v1.8

### option: Page.waitForEvent2.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: Page.waitForEvent2.timeout = %%-wait-for-event-timeout-%%
* since: v1.8
