---
title: "Breaking change: WebRequest, WebClient, and ServicePoint are obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/6.0/webrequest-deprecated.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# WebRequest, WebClient, and ServicePoint are obsolete

`System.Net.WebRequest`, `System.Net.WebClient`, and `System.Net.ServicePoint` classes are marked as obsolete and generate a `SYSLIB0014` warning at compile time.

## Version introduced

6.0

## Change description

`System.Net.WebRequest`, `System.Net.WebClient`, and `System.Net.ServicePoint` classes were added to .NET Core in version 2.0 for backward compatibility. However, they introduced several runtime breaking changes, for example, `WebRequest.GetRequestStream` allocates memory for the whole response, and `WebClient.CancelAsync` doesn't always cancel immediately.

Starting in .NET 6, the `System.Net.WebRequest`, `System.Net.WebClient`, and `System.Net.ServicePoint` classes are deprecated. The classes are still available, but they're not recommended for new development. To reduce the number of analyzer warnings, only construction methods are decorated with the `System.ObsoleteAttribute` attribute.

## Recommended action

Use the `System.Net.Http.HttpClient` class instead.

For FTP, since `System.Net.Http.HttpClient` doesn't support it, we recommend using a third-party library.

## Affected APIs

- `System.Net.WebRequest`
- `System.Net.HttpWebRequest`
- `System.Net.FtpWebRequest`
- `System.Net.WebClient`
- `System.Net.ServicePoint`

## See also

- HttpWebRequest to HttpClient migration guide
