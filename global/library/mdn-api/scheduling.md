---
title: "Scheduling"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scheduling/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scheduling

The **`Scheduling`** object provides methods and properties to control scheduling tasks within the current document.

> **Warning:**
> The `Scheduling` interface has been superseded by the `Scheduler` interface, the features of which are better designed for addressing scheduling tasks. See Don't use `isInputPending()` for more details.

## Instance methods

- `isInputPending()` (experimental)
    Returns a boolean that indicates whether there are pending input events in the event queue, meaning that the user is attempting to interact with the page.

## Example

See the `Scheduling.isInputPending()` page for a full example.

## See also

- `Scheduler` interface
- `Prioritized Task Scheduling API`
- Faster input events with Facebook's first browser API contribution on engineering.fb.com (2019)
- Better JS scheduling with isInputPending() on developer.chrome.com (2020)
- Optimizing long tasks on web.dev (2022)
