---
title: "Configure certificate authentication in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/certauth.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure certificate authentication in ASP.NET Core

`Microsoft.AspNetCore.Authentication.Certificate` contains an implementation similar to Certificate Authentication for ASP.NET Core. Certificate authentication happens at the TLS level before it ever gets to ASP.NET Core. More accurately, this functionality is an authentication handler that validates the certificate and then gives you an event where you can resolve that certificate to a `ClaimsPrincipal`.

You **must** configure your server for certificate authentication with IIS, Kestrel, Azure Web Apps, or your preferred solution.

This article describes how to configure certificate authentication in ASP.NET Core for IIS and HTTP.sys, and provides examples for calling various methods and working with properties.

## Review proxy and load balancer scenarios

Certificate authentication is a stateful scenario primarily used where a proxy or load balancer doesn't handle traffic between clients and servers. If a proxy or load balancer is used, certificate authentication only works if the proxy or load balancer:

* Handles the authentication.
* Passes the user authentication information to the app (for example, in a request header), which acts on the authentication information.

An alternative to certificate authentication in environments where proxies and load balancers are used is Active Directory Federated Services (ADFS) with OpenID Connect (OIDC).

## Get started

Acquire an HTTPS certificate, apply it, and configure your server to require certificates.

In the web app:

- Add a reference to the Microsoft.AspNetCore.Authentication.Certificate NuGet package.

- In the _Program.cs_ file, call the
`builder.Services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme).AddCertificate(...);` method. Provide a delegate for the `OnCertificateValidated` event handler to complete any supplementary validation on the client certificate sent with requests. Turn that information into a `ClaimsPrincipal` value and set it on the `context.Principal` property.

If authentication fails, this handler returns a `403 (Forbidden)` response rather than a `401 (Unauthorized)`, as you might expect. The handler returns a different response because it expects authentication to occur during the initial TLS connection. By the time it reaches the handler, it's too late. There's no way to upgrade the connection from an anonymous connection to one with a certificate.

The `UseAuthentication` method is required to set `HttpContext.User` to a `ClaimsPrincipal` value created from the certificate. For example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate();

var app = builder.Build();

app.UseAuthentication();

app.MapGet("/", () => "Hello World!");

app.Run();
```
The preceding example demonstrates the default way to add certificate authentication. The handler constructs a user principal by using the common certificate properties.

## Configure certificate validation

The `CertificateAuthenticationOptions` handler has some built-in validations that are the minimum validations you should perform on a certificate. Each of these settings is enabled by default. The following sections describe how to work with the settings.

### AllowedCertificateTypes = Chained, SelfSigned, or All (Chained | SelfSigned)

Default value: `CertificateTypes.Chained`

This check validates that only the appropriate certificate type is allowed. If the app is using self-signed certificates, this option needs to be set to `CertificateTypes.All` or `CertificateTypes.SelfSigned`.

### ChainTrustValidationMode

Default value: X509ChainTrustMode.System

The certificate presented by the client must chain to a trusted root certificate. This check controls which trust store contains these root certificates.

By default, the handler uses the system trust store. If the presented client certificate needs to chain to a root certificate that doesn't appear in the system trust store, you can set the option to X509ChainTrustMode.CustomRootTrust so the handler uses the `CustomTrustStore` property.

### CustomTrustStore

Default value: Empty `System.Security.Cryptography.X509Certificates.X509Certificate2Collection`

If the handler's `Microsoft.AspNetCore.Authentication.Certificate.CertificateAuthenticationOptions.ChainTrustValidationMode` property is set to `X509ChainTrustMode.CustomRootTrust`, this `System.Security.Cryptography.X509Certificates.X509Certificate2Collection` object contains every certificate used to validate the client certificate up to a trusted root, including the trusted root.

When the client presents a certificate that's part of a multi-level certificate chain, the `CustomTrustStore` property must contain every issuing certificate in the chain.

### ValidateCertificateUse

Default value: `true`

This check validates that the certificate presented by the client has the Client Authentication extended key use (EKU), or no EKUs at all. As the specifications say, if no EKU is specified, then all EKUs are deemed valid.

### ValidateValidityPeriod

Default value: `true`

This check validates that the certificate is within its validity period. On each request, the handler ensures that a certificate that was valid when it was presented hasn't expired during its current session.

### RevocationFlag

Default value: `X509RevocationFlag.ExcludeRoot`

A flag that specifies which certificates in the chain are checked for revocation.

Revocation checks are only performed when the certificate is chained to a root certificate.

### RevocationMode

Default value: `X509RevocationMode.Online`

A flag that specifies how revocation checks are performed.

Specifying an online check can result in a long delay while the certificate authority is contacted.

Revocation checks are performed only when the certificate is chained to a root certificate.

### FAQ: Can I configure my app to require a certificate only on certain paths?

This approach isn't possible. The certificate exchange is completed at the start of the HTTPS conversation. The operation is done by the server before the first request is received on that connection, so it isn't possible to scope based on any request fields.

## Process handler events

The handler has two events:

* `OnAuthenticationFailed`: Called if an exception happens during authentication and allows you to react.

* `OnCertificateValidated`: Called after the certificate is validated, passed validation, and a default principal is created. This event allows you to perform your own validation and augment or replace the principal. Examples include:
  * Determining if the certificate is known to your services.
  * Constructing your own principal, such as in the following example:

```csharp
builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate(options =>
    {
        options.Events = new CertificateAuthenticationEvents
        {
            OnCertificateValidated = context =>
            {
                var claims = new[]
                {
                    new Claim(
                        ClaimTypes.NameIdentifier,
                        context.ClientCertificate.Subject,
                        ClaimValueTypes.String, context.Options.ClaimsIssuer),
                    new Claim(
                        ClaimTypes.Name,
                        context.ClientCertificate.Subject,
                        ClaimValueTypes.String, context.Options.ClaimsIssuer)
                };

                context.Principal = new ClaimsPrincipal(
                    new ClaimsIdentity(claims, context.Scheme.Name));
                context.Success();

                return Task.CompletedTask;
            }
        };
    });
```
If the inbound certificate doesn't satisfy your extra validation, call `context.Fail("failure reason")` with a failure reason.

For better functionality, call a service registered in dependency injection that connects to a database or other type of user store. Access the service by using the context passed into the delegate. Consider the following example:

```csharp
builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate(options =>
    {
        options.Events = new CertificateAuthenticationEvents
        {
            OnCertificateValidated = context =>
            {
                var validationService = context.HttpContext.RequestServices
                    .GetRequiredService<ICertificateValidationService>();

                if (validationService.ValidateCertificate(context.ClientCertificate))
                {
                    var claims = new[]
                    {
                        new Claim(
                            ClaimTypes.NameIdentifier,
                            context.ClientCertificate.Subject,
                            ClaimValueTypes.String, context.Options.ClaimsIssuer),
                        new Claim(
                            ClaimTypes.Name,
                            context.ClientCertificate.Subject,
                            ClaimValueTypes.String, context.Options.ClaimsIssuer)
                    };

                    context.Principal = new ClaimsPrincipal(
                        new ClaimsIdentity(claims, context.Scheme.Name));
                    context.Success();
                }

                return Task.CompletedTask;
            }
        };
    });
```
Conceptually, the validation of the certificate is an authorization concern. For example, you can add a check on an issuer or thumbprint in an authorization policy rather than inside the `OnCertificateValidated` handler.
