---
title: "WorkerNavigator: languages property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/languages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: languages property

The **`WorkerNavigator.languages`** read-only property
returns an array of strings representing the user's preferred
languages. The language is described using BCP 47 language tags. In the returned
array they are ordered by preference with the most preferred language first.

The value of `navigator.language` is the
first element of the returned array.

When its value changes, as the user's preferred languages are changed a
`languagechange` event is fired on the `WorkerGlobalScope` object.

The `Accept-Language` HTTP header in every HTTP request from the user's
browser uses the same value for the `navigator.languages` property except for
the extra `qvalues` (quality values) field (e.g., `en-US;q=0.8`).

## Value

An array or strings.

## Examples

You can run this insert a web worker:

```js
navigator.language; // "en-US"
navigator.languages; // ["en-US", "zh-CN", "ja-JP"]
```

## See also

- `WorkerNavigator.language`
- `WorkerNavigator`
- `languagechange` event
