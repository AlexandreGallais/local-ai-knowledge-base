---
title: "class: BrowserContext (part 5 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsercontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserContext (part 5 of 5)

## async method: BrowserContext.waitForEvent2
* since: v1.8
* langs: python
  - alias-python: wait_for_event
- returns: <[any]>

:::note
In most cases, you should use [`method: BrowserContext.waitForEvent`].
:::

Waits for given `event` to fire. If predicate is provided, it passes
event's value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the browser context is closed before the `event` is fired.

### param: BrowserContext.waitForEvent2.event = %%-wait-for-event-event-%%
* since: v1.8

### option: BrowserContext.waitForEvent2.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: BrowserContext.waitForEvent2.timeout = %%-wait-for-event-timeout-%%
* since: v1.8
