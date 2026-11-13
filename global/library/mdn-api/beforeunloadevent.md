---
title: "BeforeUnloadEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/beforeunloadevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BeforeUnloadEvent

The **`BeforeUnloadEvent`** interface represents the event object for the `beforeunload` event, which is fired when the current window, contained document, and associated resources are about to be unloaded.

See the `beforeunload` event reference for detailed guidance on using this event.

## Instance properties

_Inherits properties from its parent, `Event`._

- `returnValue` (deprecated)
    When set to a truthy value, triggers a browser-controlled confirmation dialog asking users to confirm if they want to leave the page when they try to close or reload it. This is a legacy feature, and best practice is to trigger the dialog by invoking `event.preventDefault()`, while also setting `returnValue` to support legacy cases.

## Instance methods

_Inherits methods from its parent, `Event`._

## See also

- `beforeunload` event
