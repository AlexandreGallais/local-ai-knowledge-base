---
title: "URLPattern"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlpattern/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLPattern

The **`URLPattern`** interface of the `URL Pattern API` matches URLs or parts of URLs against a pattern. The pattern can contain capturing groups that extract parts of the matched URL.

More information about the syntax of patterns can be found on the API overview
page: `URL Pattern API`.

## Constructor

- `URLPattern()`
    Returns a new `URLPattern` object based on the given pattern and base URL.

## Instance properties

- `hash` (read-only)
    A string containing a pattern to match the _hash_ part
    of a URL.
- `hasRegExpGroups` (read-only)
    A boolean indicating whether or not any of the `URLPattern` components contain regular expression capturing groups.
- `hostname` (read-only)
    A string containing a pattern to match the _hostname_
    part of a URL.
- `password` (read-only)
    A string containing a pattern to match the _password_
    part of a URL.
- `pathname` (read-only)
    A string containing a pattern to match the _pathname_
    part of a URL.
- `port` (read-only)
    A string containing a pattern to match the _port_ part
    of a URL.
- `protocol` (read-only)
    A string containing a pattern to match the _protocol_
    part of a URL.
- `search` (read-only)
    A string containing a pattern to match the _search_ part
    of a URL.
- `username` (read-only)
    A string containing a pattern to match the _username_
    part of a URL.

## Instance methods

- `exec()`
    Returns an object with the matched parts of the URL or `null` if the URL
    does not match.
- `test()`
    Returns `true` if the URL matches the given pattern, `false` otherwise.

## See also

- A polyfill of `URLPattern` is available
  on GitHub
- The pattern syntax used by URLPattern is similar to the syntax used by
  path-to-regexp
