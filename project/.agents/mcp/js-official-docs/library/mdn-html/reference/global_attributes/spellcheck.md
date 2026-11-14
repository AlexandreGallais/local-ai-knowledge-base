---
title: "`spellcheck` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/spellcheck/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `spellcheck` HTML global attribute

The **`spellcheck`** global attribute is an enumerated attribute that defines whether the element may be checked for spelling errors.

> **Note:**
> This attribute is merely a hint for the browser: browsers are not required to check for spelling errors. Typically non-editable elements are not checked for spelling errors, even if the `spellcheck` attribute is set to `true` and the browser supports spellchecking.

```html
<textarea spellcheck="true">
This exampull will be checkd fur spellung when you try to edit it.</textarea>

<textarea spellcheck="false">
This exampull will nut be checkd fur spellung when you try to edit it.</textarea>
```

It may have the following values:

- empty string or `true`, which indicates that the element should be, if possible, checked for spelling errors;
- `false`, which indicates that the element should not be checked for spelling errors.

If this attribute is not set, its default value is element-type and browser-defined. This default value may also be _inherited_, which means that the element content will be checked for spelling errors only if its nearest ancestor has a _spellcheck_ state of `true`.

## Security and privacy concerns

Using spellchecking can have consequences for users' security and privacy.
The specification does not regulate _how_ spellchecking is done and the content of the element may be sent to a third party for spellchecking results (see enhanced spellchecking and "spell-jacking").

You should consider setting `spellcheck` to `false` for elements that can contain sensitive information.

## See also

- All global attributes.
- `autocorrect`.
