---
title: "Configure ASP.NET Core to work with proxy servers and load balancers (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/proxy-load-balancer.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core to work with proxy servers and load balancers (part 3 of 3)

## Certificate forwarding

### Azure

To configure Azure App Service for certificate forwarding, see Configure TLS mutual authentication for Azure App Service. The following guidance pertains to configuring the ASP.NET Core app.

* Configure certificate-forwarding middleware to specify the header name that Azure uses. Add the following code to configure the header from which the middleware builds a certificate.
* Call `Microsoft.AspNetCore.Builder.CertificateForwardingBuilderExtensions.UseCertificateForwarding*` before the call to `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddCertificateForwarding(options =>
    options.CertificateHeader = "X-ARR-ClientCert");

var app = builder.Build();

app.UseCertificateForwarding();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();
app.UseAuthentication();

app.MapRazorPages();

app.Run();
```

### Other web proxies

If a proxy is used that isn't IIS or Azure App Service's Application Request Routing (ARR), configure the proxy to forward the certificate that it received in an HTTP header.

* Configure certificate-forwarding middleware to specify the header name. Add the following code to configure the header from which the middleware builds a certificate.
* Call `Microsoft.AspNetCore.Builder.CertificateForwardingBuilderExtensions.UseCertificateForwarding*` before the call to `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddCertificateForwarding(options =>
    options.CertificateHeader = "YOUR_CERTIFICATE_HEADER_NAME");

var app = builder.Build();

app.UseCertificateForwarding();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();
app.UseAuthentication();

app.MapRazorPages();

app.Run();
```

If the proxy isn't base64-encoding the certificate, as is the case with Nginx, set the `HeaderConverter` option. Consider the following example:
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddCertificateForwarding(options =>
{
    options.CertificateHeader = "YOUR_CUSTOM_HEADER_NAME";
    options.HeaderConverter = (headerValue) =>
    {
        // Conversion logic to create an X509Certificate2.
        var clientCertificate = ConversionLogic.CreateAnX509Certificate2();
        return clientCertificate;
    };
});

var app = builder.Build();

app.UseCertificateForwarding();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();
app.UseAuthentication();

app.MapRazorPages();

app.Run();
```

## Troubleshoot

When headers aren't forwarded as expected, enable `debug` level logging and HTTP request logging. `Microsoft.AspNetCore.Builder.HttpLoggingBuilderExtensions.UseHttpLogging*` must be called after `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*`:

<!-- COMMENTED OUT DELETE after review
 If the logs don't provide sufficient information to troubleshoot the problem, enumerate the request headers received by the server. Use inline middleware to write request headers to an app response or log the headers.

To write the headers to the app's response, place the following terminal inline middleware after the call to `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*`:

```csharp
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders;
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

app.UseForwardedHeaders();
app.UseHttpLogging();

app.Run(async (context) =>
{
    context.Response.ContentType = "text/plain";
    // Connection: RemoteIp
    await context.Response.WriteAsync(
        $"Request RemoteIp: {context.Connection.RemoteIpAddress}");
});

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

You can write to logs instead of the response body. Writing to logs allows the site to function normally while debugging.

To write logs rather than to the response body, place the following inline middleware immediately after the call to `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*`:
END of COMMENTED OUT -->

```csharp
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders;
});

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

app.UseForwardedHeaders();
app.UseHttpLogging();

app.Use(async (context, next) =>
{
    // Connection: RemoteIp
    app.Logger.LogInformation("Request RemoteIp: {RemoteIpAddress}",
        context.Connection.RemoteIpAddress);

    await next(context);
});

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

If there are multiple values in a given header, forwarded headers middleware processes headers in reverse order from right to left. The default `ForwardLimit` is `1` (one), so only the rightmost value from the headers is processed unless the value of `ForwardLimit` is increased.

The request's original remote IP must match an entry in the `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies` or `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks` lists before forwarded headers are processed. This limits header spoofing by not accepting forwarders from untrusted proxies. When an unknown proxy is detected, logging indicates the address of the proxy:

```console
September 20th 2018, 15:49:44.168 Unknown proxy: 10.0.0.100:54321
```

In the preceding example, 10.0.0.100 is a proxy server. If the server is a trusted proxy, add the server's IP address to `KnownProxies`, or add a trusted network to `KnownNetworks`. For more information, see the forwarded headers middleware options section.

```csharp
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseForwardedHeaders();
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseForwardedHeaders();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

To display the logs, add `"Microsoft.AspNetCore.HttpLogging": "Information"` to the `appsettings.Development.json` file:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.HttpLogging": "Information"
    }
  }
}
```

> **Important:**
> Only allow trusted proxies and networks to forward headers. Otherwise, IP spoofing attacks are possible.

## Additional resources

* Host ASP.NET Core in a web farm
* Microsoft Security Advisory CVE-2018-0787: ASP.NET Core Elevation Of Privilege Vulnerability
* YARP: Yet Another Reverse Proxy
