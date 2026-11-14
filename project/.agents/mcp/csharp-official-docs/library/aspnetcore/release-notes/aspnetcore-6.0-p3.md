---
title: "What's new in ASP.NET Core in .NET 6 (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-6.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 6 (part 3 of 5)

## Authentication and authorization

### Authentication servers

.NET 3 to .NET 5 used IdentityServer4 as part of our template to support the issuing of JWT tokens for SPA and Blazor applications. The templates now use the Duende Identity Server.

If you are extending the identity models and are updating existing projects, update the namespaces in your code from `IdentityServer4.IdentityServer` to `Duende.IdentityServer` and follow their migration instructions.

The license model for Duende Identity Server has changed to a reciprocal license, which may require license fees when it's used commercially in production. See the Duende license page for more details.

### Delayed client certificate negotiation

Developers can now opt-in to using delayed client certificate negotiation by specifying ClientCertificateMode.DelayCertificate on the `Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions`. This only works with HTTP/1.1 connections because HTTP/2 forbids delayed certificate renegotiation. The caller of this API must buffer the request body before requesting the client certificate:

```csharp
using Microsoft.AspNetCore.Server.Kestrel.Https;
using Microsoft.AspNetCore.WebUtilities;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseKestrel(options =>
{
    options.ConfigureHttpsDefaults(adapterOptions =>
    {
        adapterOptions.ClientCertificateMode = ClientCertificateMode.DelayCertificate;
    });
});

var app = builder.Build();
app.Use(async (context, next) =>
{
    bool desiredState = GetDesiredState();
    // Check if your desired criteria is met
    if (desiredState)
    {
        // Buffer the request body
        context.Request.EnableBuffering();
        var body = context.Request.Body;
        await body.DrainAsync(context.RequestAborted);
        body.Position = 0;

        // Request client certificate
        var cert = await context.Connection.GetClientCertificateAsync();

        //  Disable buffering on future requests if the client doesn't provide a cert
    }
    await next(context);
});

app.MapGet("/", () => "Hello World!");
app.Run();
```

### `OnCheckSlidingExpiration` event for controlling cookie renewal

Cookie authentication sliding expiration can now be customized or suppressed using the new `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnCheckSlidingExpiration`. For example, this event can be used by a single-page app that needs to periodically ping the server without affecting the authentication session.
