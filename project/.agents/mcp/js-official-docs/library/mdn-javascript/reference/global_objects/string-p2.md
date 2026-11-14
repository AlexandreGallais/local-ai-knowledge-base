---
title: "String (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String (part 2 of 2)

## Instance methods

- `String.prototype.at()`
    Returns the character (exactly one UTF-16 code unit) at the specified `index`. Accepts negative integers, which count back from the last string character.
- `String.prototype.charAt()`
    Returns the character (exactly one UTF-16 code unit) at the specified
    `index`.
- `String.prototype.charCodeAt()`
    Returns a number that is the UTF-16 code unit value at the given
    `index`.
- `String.prototype.codePointAt()`
    Returns a nonnegative integer Number that is the code point value of the UTF-16
    encoded code point starting at the specified `pos`.
- `String.prototype.concat()`
    Combines the text of two (or more) strings and returns a new string.
- `String.prototype.endsWith()`
    Determines whether a string ends with the characters of the string
    `searchString`.
- `String.prototype.includes()`
    Determines whether the calling string contains `searchString`.
- `String.prototype.indexOf()`
    Returns the index within this string of the first
    occurrence of `searchValue`, or `-1` if not found.
- `String.prototype.isWellFormed()`
    Returns a boolean indicating whether this string contains any lone surrogates.
- `String.prototype.lastIndexOf()`
    Returns the index within this string of the last
    occurrence of `searchValue`, or `-1` if not found.
- `String.prototype.localeCompare()`
    Returns a number indicating whether the reference string
    `compareString` comes before, after, or is equivalent to the
    given string in sort order.
- `String.prototype.match()`
    Used to match regular expression `regexp` against a string.
- `String.prototype.matchAll()`
    Returns an iterator of all `regexp`'s matches.
- `String.prototype.normalize()`
    Returns the Unicode Normalization Form of the calling string value.
- `String.prototype.padEnd()`
    Pads the current string from the end with a given string and returns a new string of
    the length `targetLength`.
- `String.prototype.padStart()`
    Pads the current string from the start with a given string and returns a new string
    of the length `targetLength`.
- `String.prototype.repeat()`
    Returns a string consisting of the elements of the object repeated
    `count` times.
- `String.prototype.replace()`
    Used to replace occurrences of `searchFor` using
    `replaceWith`. `searchFor` may be a string
    or Regular Expression, and `replaceWith` may be a string or
    function.
- `String.prototype.replaceAll()`
    Used to replace all occurrences of `searchFor` using
    `replaceWith`. `searchFor` may be a string
    or Regular Expression, and `replaceWith` may be a string or
    function.
- `String.prototype.search()`
    Search for a match between a regular expression `regexp` and
    the calling string.
- `String.prototype.slice()`
    Extracts a section of a string and returns a new string.
- `String.prototype.split()`
    Returns an array of strings populated by splitting the calling string at occurrences
    of the substring `sep`.
- `String.prototype.startsWith()`
    Determines whether the calling string begins with the characters of string
    `searchString`.
- `String.prototype.substr()` (deprecated)
    Returns a portion of the string, starting at the specified index and extending for a given number of characters afterwards.
- `String.prototype.substring()`
    Returns a new string containing characters of the calling string from (or between)
    the specified index (or indices).
- `String.prototype.toLocaleLowerCase()`
    The characters within a string are converted to lowercase while respecting the
    current locale.

    For most languages, this will return the same as
    `toLowerCase()`.

- `String.prototype.toLocaleUpperCase()`
    The characters within a string are converted to uppercase while respecting the
    current locale.

    For most languages, this will return the same as
    `toUpperCase()`.

- `String.prototype.toLowerCase()`
    Returns the calling string value converted to lowercase.
- `String.prototype.toString()`
    Returns a string representing the specified object. Overrides the
    `Object.prototype.toString()` method.
- `String.prototype.toUpperCase()`
    Returns the calling string value converted to uppercase.
- `String.prototype.toWellFormed()`
    Returns a string where all lone surrogates of this string are replaced with the Unicode replacement character U+FFFD.
- `String.prototype.trim()`
    Trims whitespace from the beginning and end of the string.
- `String.prototype.trimEnd()`
    Trims whitespace from the end of the string.
- `String.prototype.trimStart()`
    Trims whitespace from the beginning of the string.
- `String.prototype.valueOf()`
    Returns the primitive value of the specified object. Overrides the
    `Object.prototype.valueOf()` method.
- `String.prototype[Symbol.iterator]()`
    Returns a new iterator object that iterates over the code points of a String value,
    returning each code point as a String value.

### HTML wrapper methods

> **Warning:**
> Deprecated. Avoid these methods.
>
> They are of limited use, as they are based on a very old HTML standard and provide only a subset of the currently available HTML tags and attributes. Many of them create deprecated or non-standard markup today. In addition, they do string concatenation without any validation or sanitation, which makes them a potential security threat when directly inserted using `innerHTML`. Use DOM APIs such as `document.createElement()` instead.

- `String.prototype.anchor()` (deprecated)
    `` (hypertext target)
- `String.prototype.big()` (deprecated)
    `<big>`
- `String.prototype.blink()` (deprecated)
    `<blink>`
- `String.prototype.bold()` (deprecated)
    ``
- `String.prototype.fixed()` (deprecated)
    `<tt>`
- `String.prototype.fontcolor()` (deprecated)
    ``
- `String.prototype.fontsize()` (deprecated)
    ``
- `String.prototype.italics()` (deprecated)
    ``
- `String.prototype.link()` (deprecated)
    `` (link to URL)
- `String.prototype.small()` (deprecated)
    ``
- `String.prototype.strike()` (deprecated)
    `<strike>`
- `String.prototype.sub()` (deprecated)
    ``
- `String.prototype.sup()` (deprecated)
    ``

Note that these methods do not check if the string itself contains HTML tags, so it's possible to create invalid HTML:

```js
"</b>".bold(); // <b></b></b>
```

The only escaping they do is to replace `"` in the attribute value (for `anchor()`, `fontcolor()`, `fontsize()`, and `link()`) with `"`.

```js
"foo".anchor('"Hello"'); // <a name="&quot;Hello&quot;">foo</a>
```

## Examples

### String conversion

The `String()` function is a more reliable way of converting values to strings than calling the `toString()` method of the value, as the former works when used on `null` and `undefined`. For example:

```js
// You cannot access properties on null or undefined

const nullVar = null;
nullVar.toString(); // TypeError: Cannot read properties of null
String(nullVar); // "null"

const undefinedVar = undefined;
undefinedVar.toString(); // TypeError: Cannot read properties of undefined
String(undefinedVar); // "undefined"
```

## See also

- Numbers and strings guide
- `RegExp`
