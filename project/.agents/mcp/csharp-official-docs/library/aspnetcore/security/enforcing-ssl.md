---
title: "Enforce HTTPS in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/enforcing-ssl.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Enforce HTTPS in ASP.NET Core

By David Galvan and Rick Anderson

To enforce incoming requests to your ASP.NET Core apps to use HTTPS/TLS, you can:

* Require HTTPS for all requests.
* Redirect all HTTP requests to HTTPS.

No API can prevent a client from sending sensitive data on the first request.

This article describes how to configure your ASP.NET Core apps to require HTTPS/TLS or redirect HTTP requests to HTTPS/TLS for secure interaction. Troubleshooting steps are provided for various platforms to resolve untrusted certificate issues.

## API projects

Projects that use Web APIs should either:

* Not listen on HTTP.
* Close the connection with status code 400 (Bad Request) and not serve the request.

To disable HTTP redirection in an API, set the `ASPNETCORE_URLS` environment variable or use the `--urls` command line flag. For more information, see ASP.NET Core runtime environments and 8 ways to set the URLs for an ASP.NET Core app by Andrew Lock.

> **Warning:**
> Do **not** use `Microsoft.AspNetCore.Mvc.RequireHttpsAttribute` on Web APIs that receive sensitive information.
> `RequireHttpsAttribute` uses HTTP status codes to redirect browsers from HTTP to HTTPS.
> API clients might not understand or obey redirects from HTTP to HTTPS, and they might send information over HTTP.

### HSTS and API projects

The secure approach for HTTP Strict Transport Security (HSTS) protocol is to configure API projects to only listen to and respond over HTTPS.

> **Warning:**
> The default API projects don't include HSTS because it's generally a browser only instruction. Other callers, such as phone or desktop apps, do **not** obey the instruction. Even within browsers, a single authenticated call to an API over HTTP has risks on insecure networks.

### HTTP redirect to HTTPS (ERR_INVALID_REDIRECT on CORS preflight request)

When a request to an endpoint using HTTP is redirected to HTTPS with the `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*` method, the redirection fails with the `ERR_INVALID_REDIRECT` error on the CORS preflight request.

API projects can reject HTTP requests rather than use the `UseHttpsRedirection` method to redirect requests to HTTPS.

## Require HTTPS

For production ASP.NET Core web apps, the following approach is recommended:

* To redirect HTTP requests to HTTPS, use HTTPS redirection middleware (`Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`).

* To send HSTS headers to clients, use HSTS middleware via the UseHsts method.

> **Note:**
> Apps deployed in a reverse proxy configuration allow the proxy to handle connection security (HTTPS). If the proxy also handles HTTPS redirection, there's no need to use HTTPS redirection middleware. If the proxy server also handles writing HSTS headers (for example, native HSTS support in Internet Information Services (IIS) 10.0 version 1709 or later), then the app doesn't require HSTS middleware. For more information, see Opt-out of HTTPS/HSTS on project creation.

### HTTPS redirection middleware (`UseHttpsRedirection`)

The following code calls the `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*` method in the _Program.cs_ file:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

The preceding highlighted code:

* Uses the default `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions.RedirectStatusCode` property with the `Microsoft.AspNetCore.Http.StatusCodes.Status307TemporaryRedirect` code.
* Uses the default `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions.HttpsPort` property (passing null), unless overridden by the `ASPNETCORE_HTTPS_PORT` environment variable or `Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature`.

The recommended approach is to use temporary redirects rather than permanent redirects. Link caching can cause unstable behavior in development environments. If you prefer to send a permanent redirect status code when the app is in a non-`Development` environment, see the Configure permanent redirects in production section. Use HSTS to signal to clients that only secure resource requests should be sent to the app (only in production).

> **Note:**
> Don't confuse the `HTTPS_PORT` configuration key and `ASPNETCORE_HTTPS_PORT` environment variable, which set the port for HTTPS redirection middleware, with the `HTTPS_PORTS` configuration key and `ASPNETCORE_HTTPS_PORTS` environment variable, which set the ports for Kestrel/HTTP.sys endpoint configuration.

### Port configuration

A port must be available for the middleware to redirect an insecure request to HTTPS. If no port is available:

* Redirection to HTTPS doesn't occur.
* The middleware logs the warning _Failed to determine the https port for redirect_.

Specify the HTTPS port by using any of the following approaches:

* Set HttpsRedirectionOptions.HttpsPort.
* Set the `https_port` host setting:
   * In host configuration.
   * By setting the `ASPNETCORE_HTTPS_PORT` environment variable.
   * By adding a top-level entry in the _appsettings.json_ file:

      ```json
{
  "https_port": 443,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

* Indicate a port with the secure scheme by using the ASPNETCORE_URLS environment variable. The environment variable configures the server. The middleware indirectly discovers the HTTPS port via `Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature`. This approach doesn't work in reverse proxy deployments.
* The ASP.NET Core web templates set an HTTPS URL in the _Properties/launchsettings.json_ file for both Kestrel and IIS Express. The _launchsettings.json_ file is used on the local machine only.
* Configure an HTTPS URL endpoint for a public-facing edge deployment of Kestrel server or HTTP.sys server. Only **one HTTPS port** is used by the app. The middleware discovers the port via `Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature`.

> **Note:**
> When an app runs in a reverse proxy configuration, `Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature` isn't available. Set the port by using one of the other approaches described in this section.

### Edge deployments

When Kestrel or HTTP.sys is used as a public-facing edge server, Kestrel or HTTP.sys must be configured to listen on both:

* The secure port where the client is redirected (typically, 443 in production and 5001 in development).
* The insecure port (typically, 80 in production and 5000 in development).

The insecure port must be accessible by the client for the app to receive an insecure request and redirect the client to the secure port.

For more information, see Kestrel endpoint configuration or HTTP.sys web server implementation in ASP.NET Core.

### Deployment scenarios

Any firewall between the client and server must also have communication ports open for traffic.

If requests are forwarded in a reverse proxy configuration, use forwarded headers middleware before calling HTTPS redirection middleware. Forwarded headers middleware updates the `Request.Scheme` by using the `X-Forwarded-Proto` header. The middleware permits redirect URIs and other security policies to work correctly. When forwarded headers middleware isn't used, the back-end app might not receive the correct scheme and get caught in a redirect loop. A common end user error message is there are too many redirects.

When deploying to Azure App Service, follow the guidance in Enable HTTPS for a custom domain in Azure App Service.

### Options

The following highlighted code calls the `Microsoft.AspNetCore.Builder.HttpsRedirectionServicesExtensions.AddHttpsRedirection*` method to configure middleware options:

```csharp
using static Microsoft.AspNetCore.Http.StatusCodes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddHsts(options =>
{
    options.Preload = true;
    options.IncludeSubDomains = true;
    options.MaxAge = TimeSpan.FromDays(60);
    options.ExcludedHosts.Add("example.com");
    options.ExcludedHosts.Add("www.example.com");
});

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = Status307TemporaryRedirect;
    options.HttpsPort = 5001;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

Calling `AddHttpsRedirection` is only necessary to change the values of `HttpsPort` or `RedirectStatusCode`.

The preceding highlighted code:

* Sets the `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions.RedirectStatusCode` property to the `Microsoft.AspNetCore.Http.StatusCodes.Status307TemporaryRedirect` code, which is the default value. Use the fields of the `Microsoft.AspNetCore.Http.StatusCodes` class for assignments to `RedirectStatusCode`.
* Sets the HTTPS port to 5001.

#### Configure permanent redirects in production

The middleware defaults to sending a `Microsoft.AspNetCore.Http.StatusCodes.Status307TemporaryRedirect` code with all redirects. If you prefer to send a permanent redirect status code when the app is in a non-`Development` environment, wrap the middleware options configuration in a conditional check for a non-`Development` environment.

The following code shows configuration of services in the _Program.cs_ file:

```csharp
using static Microsoft.AspNetCore.Http.StatusCodes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

if (!builder.Environment.IsDevelopment())
{
    builder.Services.AddHttpsRedirection(options =>
    {
        options.RedirectStatusCode = Status308PermanentRedirect;
        options.HttpsPort = 443;
    });
}

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");

    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

## HTTPS redirection middleware alternative approach

An alternative to using HTTPS redirection middleware (with the `UseHttpsRedirection` method) is to use URL rewriting middleware (via the `AddRedirectToHttps` method). `AddRedirectToHttps` can also set the status code and port when the redirect is executed. For more information, see URL rewriting middleware.

When the app redirects to HTTPS without the requirement for other redirect rules, the recommendation is to use HTTPS redirection middleware (`UseHttpsRedirection`) as described in this article.

## HTTP Strict Transport Security (HSTS) protocol

Per OWASP, HSTS is an opt-in security enhancement specified by a web app via a response header. When a browser that supports HSTS receives this header:

* The browser stores configuration for the domain that prevents sending any communication over HTTP. The browser forces all communication over HTTPS.
* The browser prevents the user from using untrusted or invalid certificates. The browser disables prompts that allow a user to temporarily trust such a certificate.

Because the client enforces HSTS, there are some limitations:

* The client must support HSTS.
* HSTS requires at least one successful HTTPS request to establish the HSTS policy.
* The application must check every HTTP request and redirect or reject the HTTP request.

ASP.NET Core implements HSTS with the `Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*` extension method. The following code calls `UseHsts` when the app isn't in development mode:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

`UseHsts` isn't recommended in development because the HSTS settings are highly cacheable by browsers. By default, `UseHsts` excludes the local loopback address.

For production environments that are implementing HTTPS for the first time, set the initial `Microsoft.AspNetCore.HttpsPolicy.HstsOptions.MaxAge` property value to a small amount by using one of the `System.TimeSpan` methods. Set the value from hours to no more than a single day, in case you need to revert the HTTPS infrastructure to HTTP. After you're confident in the sustainability of the HTTPS configuration, increase the HSTS `max-age` value (commonly, one year).

The following highlighted code:

```csharp
using static Microsoft.AspNetCore.Http.StatusCodes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddHsts(options =>
{
    options.Preload = true;
    options.IncludeSubDomains = true;
    options.MaxAge = TimeSpan.FromDays(60);
    options.ExcludedHosts.Add("example.com");
    options.ExcludedHosts.Add("www.example.com");
});

builder.Services.AddHttpsRedirection(options =>
{
    options.RedirectStatusCode = Status307TemporaryRedirect;
    options.HttpsPort = 5001;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

* Sets the preload parameter of the `Strict-Transport-Security` header. Preload isn't part of the RFC 6797 HSTS specification. Web browsers support preload of HSTS sites on fresh install. For more information, see https://hstspreload.org/.
* Enables the `includeSubDomain` directive, which applies the HSTS policy to host subdomains. For more information, see RFC 6797 HSTS specification (Section 6.1.2).
* Explicitly sets the `max-age` parameter of the `Strict-Transport-Security` header to 60 days. If not set, it defaults to 30 days. For more information, see the `max-age` directive in RFC 6797 HSTS specification (Section 6.1.1).
* Adds `example.com` to the list of hosts to exclude.

`UseHsts` excludes the following loopback hosts:

* `localhost`: The IPv4 loopback address.
* `127.0.0.1`: The IPv4 loopback address.
* `[::1]`: The IPv6 loopback address.
