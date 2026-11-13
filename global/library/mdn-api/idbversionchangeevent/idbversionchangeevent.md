---
title: "IDBVersionChangeEvent: IDBVersionChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbversionchangeevent/idbversionchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBVersionChangeEvent: IDBVersionChangeEvent() constructor

The **`IDBVersionChangeEvent()`** constructor
creates a new `IDBVersionChangeEvent` object, which is used to represent
when a version of the database has changed, as a result of the
`onupgradeneeded` event handler.

## Syntax

```js
new IDBVersionChangeEvent(type)
new IDBVersionChangeEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `versionchange`, `success`, or `blocked`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `oldVersion` (optional)
        A number representing the previous version of the database. It defaults to `0`.
    - `newVersion` (optional)
        An unsigned long representing the new version of the database,
        or `null` if the database is being deleted. It defaults is `null`.

### Return value

A new `IDBVersionChangeEvent` object.

## Examples

For a full working example, see our To-do Notifications app (view example live).
