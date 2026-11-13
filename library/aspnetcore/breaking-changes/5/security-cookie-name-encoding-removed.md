---
title: "Breaking change: Security: Cookie name encoding removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/5/security-cookie-name-encoding-removed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security: Cookie name encoding removed

The HTTP cookie standard allows only specific characters in cookie names and values. To support disallowed characters, ASP.NET Core:

* Encodes when creating a response cookie.
* Decodes when reading a request cookie.

In ASP.NET Core 5.0, this encoding behavior changed in response to a security concern.

For discussion, see GitHub issue dotnet/aspnetcore#23578.

## Version introduced

5.0 Preview 8

## Old behavior

Response cookie names are encoded. Request cookie names are decoded.

## New behavior

Encoding and decoding of cookie names was removed. For prior supported versions of ASP.NET Core, the team plans to mitigate the decoding issue in-place. Additionally, calling `Microsoft.AspNetCore.Http.IResponseCookies.Append*` with an invalid cookie name throws an exception of type `System.ArgumentException`. Encoding and decoding of cookie values remains unchanged.

## Reason for change

An issue was discovered in multiple web frameworks. The encoding and decoding could allow an attacker to bypass a security feature called cookie prefixes by spoofing reserved prefixes like `__Host-` with encoded values like `__%48ost-`. The attack requires a secondary exploit to inject the spoofed cookies, such as a cross-site scripting (XSS) vulnerability, in the website. These prefixes aren't used by default in ASP.NET Core or `Microsoft.Owin` libraries or templates.

## Recommended action

If you're moving projects to ASP.NET Core 5.0 or later, ensure that their cookie names conform to the token <example-value> requirements: ASCII characters excluding controls and separators `"<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>"> | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | "<example-value>" | SP | HT`. The use of non-ASCII characters in cookie names or other HTTP headers may cause an exception from the server or be improperly round-tripped by the client.

## Affected APIs

- `Microsoft.AspNetCore.Http.HttpRequest.Cookies`
- `Microsoft.AspNetCore.Http.HttpResponse.Cookies`
- `Microsoft.Owin.IOwinRequest.Cookies`
- `Microsoft.Owin.IOwinResponse.Cookies`
