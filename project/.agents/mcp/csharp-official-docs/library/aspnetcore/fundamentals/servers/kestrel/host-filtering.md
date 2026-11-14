---
title: "Host filtering with ASP.NET Core Kestrel web server"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/kestrel/host-filtering.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Host filtering with ASP.NET Core Kestrel web server

While Kestrel supports configuration based on prefixes such as `http://example.com:5000`, Kestrel largely ignores the host name. Host `localhost` is a special case used for binding to loopback addresses. Any host other than an explicit IP address binds to all public IP addresses. `Host` headers aren't validated.

As a workaround, use host-filtering middleware. The middleware is added by `Microsoft.AspNetCore.WebHost.CreateDefaultBuilder*`, which calls `Microsoft.AspNetCore.Builder.HostFilteringServicesExtensions.AddHostFiltering*`:

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
}
```

Host-filtering middleware is disabled by default. To enable the middleware, define an `AllowedHosts` key in `appsettings.json`/`appsettings.{Environment}.json`. The value is a semicolon-delimited list of host names without port numbers:

`appsettings.json`:

```json
{
  "AllowedHosts": "example.com;localhost"
}
```

`AllowedHosts` entries are matched against the request `Host` header. They're unrelated to Kestrel bind addresses (`urls` or `Kestrel` endpoints), where `0.0.0.0` and `[::]` normally appear. The values `*`, `0.0.0.0` (IPv4 any), and `[::]` (IPv6 any) are all treated as the wildcard. If any of them appears in the list, all non-empty `Host` header values are allowed, even if other entries are present. For example, the following setting allows any host:

```json
{
  "AllowedHosts": "example.com;0.0.0.0"
}
```

> **Note:**
> Forwarded headers middleware also has an `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.AllowedHosts` option. Forwarded headers middleware and host-filtering middleware have similar functionality for different scenarios. Setting `AllowedHosts` with forwarded headers middleware is appropriate when the `Host` header isn't preserved while forwarding requests with a reverse proxy server or load balancer. Setting `AllowedHosts` with host-filtering middleware is appropriate when Kestrel is used as a public-facing edge server or when the `Host` header is directly forwarded.
>
> For more information on forwarded headers middleware, see Configure ASP.NET Core to work with proxy servers and load balancers.
