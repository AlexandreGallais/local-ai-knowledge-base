---
title: "Breaking change: AllowRenegotiation default is false"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/7.0/allowrenegotiation-default.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# AllowRenegotiation default is false

The default value of `System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation` has been changed to `false`.

## Previous behavior

In previous versions, client-side renegotiation was allowed by the server by default.

## New behavior

Starting in .NET 7, client-side renegotiation must be explicitly enabled on the server side.

## Version introduced

.NET 7

## Type of breaking change

This change can affect binary compatibility and source compatibility.

## Reason for change

Client-side renegotiation is viewed as insecure by the industry. For example, it has been removed from TLS 1.3 entirely. Therefore, we should disable it by default.

## Recommended action

If client-side renegotiation is required, set `System.Net.Security.SslServerAuthenticationOptions.AllowRenegotiation` to `true` when initializing the server side of the `System.Net.Security.SslStream`.

## Affected APIs

- `System.Net.Security.SslServerAuthenticationOptions`
- `System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate,System.Boolean,System.Boolean)`
- `System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate,System.Boolean,System.Security.Authentication.SslProtocols,System.Boolean)`
- `System.Net.Security.SslStream.AuthenticateAsServer(System.Security.Cryptography.X509Certificates.X509Certificate)`
