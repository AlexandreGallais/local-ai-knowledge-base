---
title: "RangeError: form must be one of 'NFC', 'NFD', 'NFKC', or 'NFKD'"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/form_must_be_one_of/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError: form must be one of 'NFC', 'NFD', 'NFKC', or 'NFKD'

The JavaScript exception "form must be one of 'NFC', 'NFD', 'NFKC', or 'NFKD'" occurs when an unrecognized string is passed to the `String.prototype.normalize()` method.

## Message

```plain
RangeError: The normalization form should be one of NFC, NFD, NFKC, NFKD. (V8-based)
RangeError: form must be one of 'NFC', 'NFD', 'NFKC', or 'NFKD' (Firefox)
RangeError: argument does not match any normalization form (Safari)
```

## Error type

`RangeError`

## What went wrong?

The `String.prototype.normalize()` method only accepts the following four values as its `form` argument: `"NFC"`, `"NFD"`, `"NFKC"`, or `"NFKD"`. If you pass any other value, an error will be thrown. Read the reference of `normalize()` to learn about different normalization forms.

## Examples

### Invalid cases

```js
"foo".normalize("nfc"); // RangeError
"foo".normalize(" NFC "); // RangeError
```

### Valid cases

```js
"foo".normalize("NFC"); // 'foo'
```

## See also

- `String.prototype.normalize()`
