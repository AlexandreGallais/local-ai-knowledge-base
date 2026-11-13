---
title: "Navigator: languages property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/languages/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: languages property

The **`languages`** read-only property of the `Navigator` interface
returns an array of strings representing the user's preferred
languages. The language is described using a BCP 47 language tag. In the returned
array they are ordered by preference with the most preferred language first.

The value of `navigator.language` is the
first element of the returned array.

When its value changes, as the user's preferred languages are changed a
`languagechange` event is fired on the `Window` object.

The `Accept-Language` HTTP header in every HTTP request from the user's browser generally lists the same locales as the `navigator.languages` property, with decreasing `q` values (quality values). Some browsers (Chrome and Safari) add language-only fallback tags in `Accept-Language`—for example, `en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7` when `navigator.languages` is `["en-US", "zh-CN"]`. For privacy purposes (reducing fingerprinting), both `Accept-Language` and `navigator.languages` may not include the full list of user preferences, such as in Safari (always) and Chrome's incognito mode, where only one language is listed.

## Value

An array of strings.

## Examples

### Listing the contents of navigator.language and navigator.languages

```js
navigator.language; // "en-US"
navigator.languages; // ["en-US", "zh-CN", "ja-JP"]
```

### Using Intl constructors to do language-specific formatting, with fallback

The array of language identifiers contained in `navigator.languages` can be passed directly to the `Intl` constructors to implement preference-based fallback selection of locales, where the first entry in the list that matches a locale supported by `Intl` is used:

```js
const date = new Date("2012-05-24");

const formattedDate = new Intl.DateTimeFormat(navigator.languages).format(date);
```

## See also

- `navigator.language`
- `navigator`
- `languagechange` event
- `Intl`
