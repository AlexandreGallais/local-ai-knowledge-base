---
title: "URL Pattern API (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url_pattern_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL Pattern API

The **URL Pattern API** defines a syntax that is used to create URL pattern matchers.
These patterns can be matched against URLs or individual URL components.

## Concepts and usage

Patterns are specified using the `URLPattern` interface.
The pattern syntax is based on the syntax from the path-to-regexp library.
Patterns can contain:

- Literal strings which will be matched exactly.
- Wildcards (`/posts/*`) that match any character.
- Named groups (`/books/:id`) which extract a part of the matched URL.
- Non-capturing groups (`/books{/old}?`) which make parts of a pattern optional or be matched multiple times.
- `RegExp` groups (`/books/(\\d+)`) which make arbitrarily complex regex matches.
  _Note that the parentheses are not part of the regex but instead define their contents as a regex._
  Some APIs prohibit the use of regular expression groups in `URLPattern` objects.
  The `hasRegExpGroups` property indicates whether or not regular expression groups are used.

You can find details about the syntax in the pattern syntax section below.

## Interfaces

- `URLPattern`
    Represents a pattern that can match URLs or parts of URLs. The pattern can contain capturing groups that extract parts of the matched URL.
