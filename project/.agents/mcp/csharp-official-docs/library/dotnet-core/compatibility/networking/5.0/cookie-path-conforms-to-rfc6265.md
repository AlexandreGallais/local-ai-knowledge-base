---
title: "Breaking change: Cookie path handling now conforms to RFC 6265"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/5.0/cookie-path-conforms-to-rfc6265.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cookie path handling now conforms to RFC 6265

Path-handling algorithms defined in RFC 6265 were implemented for the `System.Net.Cookie` and `System.Net.CookieContainer` classes.

## Version introduced

5.0

## Change description

- The `System.Net.Cookie.Path` property is no longer required to be a prefix of the request path.
- The calculation of the default value of `System.Net.Cookie.Path` and path-matching algorithms were implemented as defined in section 5.1.4 of RFC 6265.

## Recommended action

In most cases, you won't need to take any action. However, if your code was dependent on `System.Net.Cookie.Path` validation, you'll need to implement required validation in your code. If your code was dependent on default value calculation for `System.Net.Cookie.Path`, consider supplying the `System.Net.Cookie.Path` value manually instead of using the default value.

## Affected APIs

- `System.Net.Cookie`
- `System.Net.CookieContainer`
