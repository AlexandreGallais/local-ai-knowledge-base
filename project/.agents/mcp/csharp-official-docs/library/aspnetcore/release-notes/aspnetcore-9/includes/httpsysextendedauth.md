---
title: "httpsysextendedauth"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-9/includes/httpsysextendedauth.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# httpsysextendedauth

### Configure HTTP.sys extended authentication flags

You can now configure the `HTTP_AUTH_EX_FLAG_ENABLE_KERBEROS_CREDENTIAL_CACHING` and `HTTP_AUTH_EX_FLAG_CAPTURE_CREDENTIAL` HTTP.sys flags by using the new `EnableKerberosCredentialCaching` and `CaptureCredentials` properties on the HTTP.sys `Microsoft.AspNetCore.Server.HttpSys.AuthenticationManager` to optimize how Windows authentication is handled. For example:

```csharp
webBuilder.UseHttpSys(options =>
{
    options.Authentication.Schemes = AuthenticationSchemes.Negotiate;
    options.Authentication.EnableKerberosCredentialCaching = true;
    options.Authentication.CaptureCredentials = true;
});
```
