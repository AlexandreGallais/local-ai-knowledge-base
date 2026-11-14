---
title: "Intl.Segmenter() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/intl/segmenter/segmenter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intl.Segmenter() constructor

The **`Intl.Segmenter()`** constructor creates `Intl.Segmenter` objects.

```js
const segmenterFr = new Intl.Segmenter("fr", { granularity: "word" });
const string = "Que ma joie demeure";

const iterator = segmenterFr.segment(string)[Symbol.iterator]();

console.log(iterator.next().value.segment);
// Expected output: 'Que'

console.log(iterator.next().value.segment);
// Expected output: ' '
```

## Syntax

```js
new Intl.Segmenter()
new Intl.Segmenter(locales)
new Intl.Segmenter(locales, options)
```

> **Note:**
> `Intl.Segmenter()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `locales` (optional)
    A string with a BCP 47 language tag or an `Intl.Locale` instance, or an array of such locale identifiers. The runtime's default locale is used when `undefined` is passed or when none of the specified locale identifiers is supported. For the general form and interpretation of the `locales` argument, see the parameter description on the `Intl` main page.
- `options` (optional)
    An object containing the following properties, in the order they are retrieved (all of them are optional):
    - `localeMatcher`
        The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see Locale identification and negotiation.
    - `granularity`
        How granularly should the input be split. Possible values are:
        - `"grapheme"` (default)
            Split the input into segments at grapheme cluster (user-perceived character) boundaries, as determined by the locale.
        - `"word"`
            Split the input into segments at word boundaries, as determined by the locale.
        - `"sentence"`
            Split the input into segments at sentence boundaries, as determined by the locale.

### Return value

A new `Intl.Segmenter` instance.

### Exceptions

- `RangeError`
    Thrown if `locales` or `options` contain invalid values.

## Examples

### Basic usage

The following example shows how to count words in a string using the Japanese language (where splitting the string using `String` methods would have given an incorrect result).

```js
const text = "吾輩は猫である。名前はたぬき。";
const japaneseSegmenter = new Intl.Segmenter("ja-JP", { granularity: "word" });
console.log(
  [...japaneseSegmenter.segment(text)].filter((segment) => segment.isWordLike)
    .length,
);
// 8, as the text is segmented as '吾輩'|'は'|'猫'|'で'|'ある'|'。'|'名前'|'は'|'たぬき'|'。'
```
