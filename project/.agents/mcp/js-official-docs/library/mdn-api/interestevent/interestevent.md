---
title: "InterestEvent: InterestEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interestevent/interestevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InterestEvent: InterestEvent() constructor

The **`InterestEvent()`** constructor creates a new `InterestEvent` object.

## Syntax

```js
new InterestEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. For `InterestEvent`, this is always `interest` or `loseinterest`.
- `init` (optional)
    An object containing the following property:
    - `source` (optional)
        An `Element` representing the interest invoker element on which interest was shown or lost.

## Examples

Normally, you would not use this constructor manually. A new `InterestEvent` object is constructed when a handler is invoked as a result of a relevant event firing.

See the Using interest invokers guide and the `interest` event reference page for examples.

## See also

- Popover API
- Using interest invokers
