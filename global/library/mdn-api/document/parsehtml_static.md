---
title: "Document: parseHTML() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/parsehtml_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: parseHTML() static method

The **`parseHTML()`** static method of the `Document` object provides an XSS-safe method to parse and sanitize a string of HTML in order to create a new `Document` instance.

## Syntax

```js
Document.parseHTML(input)
Document.parseHTML(input, options)
```

### Parameters

- `input`
    A string defining HTML to be sanitized and injected into the shadow root.
- `options` (optional)
    An options object with the following optional parameters:
    - `sanitizer`
        A `Sanitizer` or `SanitizerConfig` object which defines what elements of the input will be allowed or removed, or the string `"default"` for the default sanitizer configuration.
        The method will remove any XSS-unsafe elements and attributes, even if allowed by the sanitizer.
        If not specified, the default `Sanitizer` configuration is used.

        Note that if you're using the same configuration multiple times, it's expected to be more efficient to use a `Sanitizer` and modify it when you need to.

### Return value

A `Document`.

### Exceptions

- `TypeError`
    This is thrown if `options.sanitizer` is passed a:
    - `SanitizerConfig` that isn't valid.
      For example, a configuration that includes both "allowed" and "removed" configuration settings.
    - string that does not have the value `"default"`.
    - value that is not a `Sanitizer`, `SanitizerConfig`, or string.

## Description

The **`parseHTML()`** method parses and sanitize a string of HTML in order to create a new `Document` instance that is XSS-safe.
The resulting `Document` will have a content type of "text/html", a character set of UTF-8, and a URL of "about:blank".

If no sanitizer is specified in the `options.sanitizer` parameter, `parseHTML()` is used with the default sanitizer configuration.
This configuration is suitable for the majority of use cases as it prevents XSS attacks, as well as other attacks like clickjacking or spoofing.

A custom `Sanitizer` or `SanitizerConfig` can be specified to choose which elements, attributes, and comments are allowed or removed.
Note that even if unsafe options are allowed by the sanitizer, they will still be removed when using this method (it removes the same elements as a sanitizer on which `Sanitizer.removeUnsafe()` has been called).

The input HTML may include declarative shadow roots.
If the string of HTML defines more than one declarative shadow root in a particular shadow host then only the first `ShadowRoot` is created — subsequent declarations are parsed as `<template>` elements within that shadow root.

`parseHTML()` should be used instead of `Document.parseHTMLUnsafe()`, unless there is a specific need to allow unsafe elements and attributes.
If the HTML to be parsed doesn't need to contain unsafe HTML entities, then you should use `Document.parseHTML()`.

Note that since this method always sanitizes input strings of XSS-unsafe entities, it is not secured or validated using the Trusted Types API.

## See also

- `Document.parseHTMLUnsafe()`
- `Element.setHTML()` and `Element.setHTMLUnsafe()`
- `ShadowRoot.setHTML()` and `ShadowRoot.setHTMLUnsafe()`
- `DOMParser.parseFromString()` for parsing HTML or XML into a DOM tree
- HTML Sanitizer API
