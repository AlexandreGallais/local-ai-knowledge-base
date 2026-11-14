---
title: "Breaking change: HttpSys: Client certificate renegotiation disabled by default"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/httpsys-client-certificate-renegotiation-disabled-by-default.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HttpSys: Client certificate renegotiation disabled by default

The option to renegotiate a connection and request a client certificate has been disabled by default. For discussion, see issue dotnet/aspnetcore#23181.

## Version introduced

ASP.NET Core 5.0

## Old behavior

The connection can be renegotiated to request a client certificate.

## New behavior

Client certificates can only be requested during the initial connection handshake. For more information, see pull request dotnet/aspnetcore#23162.

## Reason for change

Renegotiation caused a number of performance and deadlock issues. It's also not supported in HTTP/2. For additional context from when the option to control this behavior was introduced in ASP.NET Core 3.1, see issue dotnet/aspnetcore#14806.

## Recommended action

Apps that require client certificates should use *netsh.exe* to set the `clientcertnegotiation` option to `enabled`. For more information, see netsh http commands.

If you want client certificates enabled for only some parts of your app, see the guidance at Optional client certificates.

If you need the old renegotiate behavior, set `HttpSysOptions.ClientCertificateMethod` to the old value `ClientCertificateMethod.AllowRenegotiate`. This isn't recommended for the reasons outlined above and in the linked guidance.

## Affected APIs

- `Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate`
- `Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync*`
- `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.ClientCertificateMethod`
