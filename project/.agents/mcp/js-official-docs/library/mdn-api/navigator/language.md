---
title: "Navigator: language property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/language/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: language property

The **`language`** read-only property of the `Navigator` interface returns a string representing the preferred language of the user, usually the language of the browser UI.

## Value

A string representing the language version in BCP 47 language tag format. Examples of valid language tags include `en`, `en-US`, `fr`, `fr-FR`, `es-ES`, etc.

Note that in Safari on iOS prior to 10.2, the country code returned is lowercase: "en-us", "fr-fr" etc.

## Examples

### Using Intl constructors to do language-specific formatting

The `Intl` constructors allow formatting content to match the rules of a given locale. You can pass `navigator.language` to them to format content in the locale corresponding to the user's preferred language:

```js
const date = new Date("2012-05-24");

const formattedDate = new Intl.DateTimeFormat(navigator.language).format(date);
```

## See also

- `navigator.languages`
- `navigator`
- `Intl`
