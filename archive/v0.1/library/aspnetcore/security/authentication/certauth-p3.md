---
title: "Configure certificate authentication in ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/certauth.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure certificate authentication in ASP.NET Core (part 3 of 3)

## Cache certificate validation results

.NET 5 and later versions support the ability to enable caching of validation results. The caching dramatically improves performance of certificate authentication because validation is an expensive operation.

By default, certificate authentication disables caching. To enable caching, call the `AddCertificateCache` method in the _Program.cs_ file:

```csharp
builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate()
    .AddCertificateCache(options =>
    {
        options.CacheSize = 1024;
        options.CacheEntryExpiration = TimeSpan.FromMinutes(2);
    });
```
When `Microsoft.Extensions.DependencyInjection.CertificateAuthenticationAppBuilderExtensions.AddCertificateCache*` is enabled, the result produced by `Microsoft.AspNetCore.Authentication.Certificate.CertificateAuthenticationEvents.OnCertificateValidated` must be a pure function of the authentication scheme and certificate. Don't base the result on request context because the cached result is reused for subsequent requests. Place request-context-dependent decisions in an authorization policy or provide a context-aware implementation of `Microsoft.AspNetCore.Authentication.Certificate.ICertificateValidationCache`.

The cache stores both successful and failed validation results for the configured cache entry lifetime.

The default caching implementation stores results in memory. You can provide your own cache by implementing `ICertificateValidationCache` and registering it with dependency injection. For example, `services.AddSingleton<ICertificateValidationCache, YourCache>()`.

## Use optional client certificates

This section provides information for apps that must protect a subset of the app with a certificate. For example, a Razor Page or controller in the app might require client certificates. This scenario presents some challenges:

* Client certificates are a TLS feature, not an HTTP feature.
* Client certificates are negotiated per-connection and usually at the start of the connection before any HTTP data is available.

There are two approaches for implementing optional client certificates:

- Option 1: Use separate host names (SNI) and redirection. While this option involves more work to configure, the approach is recommended because it works in most environments and protocols.
- Option 2: Renegotiation during an HTTP request. This approach has several limitations and isn't recommended.

### Separate hosts (SNI)

At the start of the connection, only the Server Name Indication (SNI)&dagger; is known. Client certificates can be configured per host name so one host requires the certificates and another doesn't.

- Set up binding for the domain and subdomain.

   For example, set up bindings on `contoso.com` and `myClient.contoso.com`. The `contoso.com` host doesn't require a client certificate but `myClient.contoso.com` does.

   For more information, see the following resources:

   - Kestrel web server
      - Configure HTTPS in code (listenOptions.UseHttps)
      - `Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ClientCertificateMode` property

   - IIS
      - Create the IIS site
      - Configure security on IIS

   - HTTP.sys
      - Configure Windows Server

   .NET 5 and later offers more convenient support for redirecting to acquire optional client certificates. For more information, see the Optional certificates sample.

- For requests to the web app that require a client certificate and don't have one, redirect to the same page by using the client certificate protected subdomain.

   For example, redirect to `myClient.contoso.com/requestedPage`. Because the request to `myClient.contoso.com/requestedPage` is a different hostname than `contoso.com/requestedPage`, the client establishes a different connection and the client certificate is provided.

   For more information, see Introduction to authorization in ASP.NET Core.

&dagger; Server Name Indication (SNI) is a TLS extension that's used to include a virtual domain as a part of SSL negotiation. This approach effectively means the virtual domain name, or a hostname, can be used to identify the network end point.

### TLS renegotiation

TLS renegotiation is a process by which the client and server can reassess the encryption requirements for an individual connection, including requesting a client certificate if not previously provided. TLS renegotiation is a security risk and isn't recommended because:

* In HTTP/1.1, the server must first buffer or consume any in-flight HTTP data such as POST request bodies to make sure the connection is clear for the renegotiation. Otherwise, the renegotiation can stop responding or fail.
* HTTP/2 and HTTP/3 explicitly prohibit renegotiation.
* There are security risks associated with renegotiation. TLS 1.3 removed renegotiation of the whole connection and replaced it with a new extension for requesting only the client certificate after the start of the connection. This mechanism is exposed via the same APIs and is still subject to the prior constraints of buffering and HTTP protocol versions.

The implementation and configuration of this feature varies by server and framework version, as described in the following sections.

#### IIS

IIS manages the client certificate negotiation on your behalf. A subsection of the application can enable the `SslRequireCert` option to negotiate the client certificate for those requests. For more information, see Configuration in the IIS documentation.

IIS automatically buffers any request body data up to a configured size limit before renegotiating. Requests that exceed the limit are rejected with a 413 response. This limit defaults to 48 KB and is configurable by setting the uploadReadAheadSize property.

#### HttpSys

HttpSys has two settings that control the client certificate negotiation and both should be set. The first is in the _netsh.exe_ file under `http add sslcert clientcertnegotiation=enable/disable`. This flag indicates whether to negotiate the client certificate at the start of a connection. Set the value to `disable` for optional client certificates. For more information, see the `http add sslcert` parameter usage in the netsh docs.

The other setting is the `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.ClientCertificateMethod` property. When set to `AllowRenegotation`, the client certificate can be renegotiated during a request.

> **Note:**
> The application should buffer or consume any request body data before attempting the renegotiation. Otherwise, the request might become unresponsive.

An application can first check the `Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate` property to see if the certificate is available. If it isn't available, ensure the request body is consumed before calling the `Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync*` method to negotiate one. `GetClientCertificateAsync` can return a null certificate if the client declines to provide one.

> **Note:**
> The behavior of the `ClientCertificate` property changed in .NET 6. For more information, see GitHub issue #466.

#### Kestrel

Kestrel controls client certificate negotiation with the `Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ClientCertificateMode` property.

.NET 6 and later provides the `DelayCertificate` option for the `Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode` property. When this option is set, an app can check the `Microsoft.AspNetCore.Http.ConnectionInfo.ClientCertificate` property to see if the certificate is available. If it isn't available, ensure the request body is consumed before calling the `Microsoft.AspNetCore.Http.ConnectionInfo.GetClientCertificateAsync*` method to negotiate one. `GetClientCertificateAsync` can return a null certificate if the client declines to provide one.

> **Note:**
> The application should buffer or consume any request body data before attempting the renegotiation. Otherwise, `GetClientCertificateAsync` might throw the exception, _InvalidOperationException: Client stream needs to be drained before renegotiation_.

If you programmatically configure the TLS settings per SNI host name, call the UseHttps
overload (.NET 6 or later) that takes a `Microsoft.AspNetCore.Server.Kestrel.Https.TlsHandshakeCallbackOptions` class object. This option controls client certificate renegotiation via the `Microsoft.AspNetCore.Server.Kestrel.Https.TlsHandshakeCallbackContext.AllowDelayedClientCertificateNegotation` property. For more information, see the ListenOptionsHttpsExtensions.UseHttps method.

Leave questions, comments, and other feedback on optional client certificates in the discussion thread for GitHub issue #18720.

## Related content

- Overview of ASP.NET Core authentication
- Introduction to authorization in ASP.NET Core
- Use TLS/SSL certificates in your app code (Azure documentation)
- Important changes to App Service managed certificates (Blog, November 2025)
