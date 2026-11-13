---
title: "Migrate SslStream code from .NET Framework to .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/sslstream-migration-from-framework.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migrate SslStream code from .NET Framework to .NET

.NET Core brought many improvements as well as breaking changes to how `System.Net.Security.SslStream` works. The most important change related to network security is that the `System.Net.ServicePointManager` class has been mostly obsoleted and affects only the legacy `System.Net.WebRequest` interface.

For each `System.Net.Security.SslStream` instance, you must configure the allowed TLS protocols and certificate validation callbacks separately via `System.Net.Security.SslServerAuthenticationOptions` or `System.Net.Security.SslClientAuthenticationOptions`. To configure network security options used in HTTPS in `System.Net.Http.HttpClient`, you need to configure the security options in the underlying handler. The default handler used by `System.Net.Http.HttpClient` is `System.Net.Http.SocketsHttpHandler`, which has an `System.Net.Http.SocketsHttpHandler.SslOptions` property that accepts `System.Net.Security.SslClientAuthenticationOptions`.

Consider the following example that demonstrates how to create an `System.Net.Http.HttpClient` with a custom certificate validation callback:

```csharp
bool CustomCertificateValidator(
    object sender,
    X509Certificate? certificate,
    X509Chain? chain,
    SslPolicyErrors sslPolicyErrors)
{
    // TODO: Always returns false. 
    // Need to implement certificate evaluation logic.
    return false;
}

HttpClient httpClient = new(
    new SocketsHttpHandler
    {
        SslOptions =
        {
            RemoteCertificateValidationCallback = CustomCertificateValidator
        }
    });
```

The following table shows how to migrate individual `System.Net.ServicePointManager` properties related to TLS.

| Source API | Target API |
|---|---|
| `System.Net.ServicePointManager.CheckCertificateRevocationList` | Set appropriate `System.Security.Cryptography.X509Certificates.X509RevocationMode` on `System.Net.Security.SslClientAuthenticationOptions.CertificateRevocationCheckMode`. |
| `System.Net.ServicePointManager.EncryptionPolicy` | Use `System.Net.Security.SslClientAuthenticationOptions.EncryptionPolicy`. |
| `System.Net.ServicePointManager.SecurityProtocol` | Use `System.Net.Security.SslClientAuthenticationOptions.EnabledSslProtocols`. |
| `System.Net.ServicePointManager.ServerCertificateValidationCallback` | Use `System.Net.Security.SslClientAuthenticationOptions.RemoteCertificateValidationCallback`. |
