---
title: "WorkerNavigator: language property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/language/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: language property

The **`WorkerNavigator.language`** read-only property returns
a string representing the preferred language of the user, usually the language of the
browser UI.

## Value

A string representing the
language version as a BCP 47 language tag, for example `en`, `en-US`, `fr`, `fr-FR`, `es-ES`, etc.

Note that in Safari on iOS prior to 10.2, the country code returned is lowercase:
"en-us", "fr-fr" etc.

## Examples

You can run this insert a web worker:

```js
if (/^en\b/.test(navigator.language)) {
  doLangSelect(window.navigator.language);
}
```

## See also

- `WorkerNavigator.languages`
- `WorkerNavigator`
