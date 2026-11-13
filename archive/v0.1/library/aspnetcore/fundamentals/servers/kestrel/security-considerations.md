---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server

-->
-->

This article describes the security considerations, configurable limits, and behavioral decisions in Kestrel—the cross-platform HTTP server for ASP.NET Core. It's intended for both **application developers** configuring Kestrel in production and **security auditors** reviewing its threat surface.

Kestrel can be deployed as an **edge server** directly exposed to the internet or **behind a reverse proxy** such as YARP, IIS Application Request Routing (ARR), nginx proxy_pass, or Azure App Service frontend. The security posture differs significantly between these topologies, and this article calls out the differences where applicable.

> **Important:**
> Kestrel includes limits, timeouts, protocol validation, and middleware integration points that help reduce the impact of malformed traffic and some resource-exhaustion patterns. It is **not intended to be the primary defense against distributed denial-of-service (DDoS) attacks**. Applications exposed to the public internet should rely on appropriate upstream network and OSI layer 4 proxy protections for volumetric attack mitigation. YARP operates as a layer 7 proxy.

> **Note:**
> The snippets in this article use ASP.NET Core's minimal hosting model:
>
> ```csharp
> var builder = WebApplication.CreateBuilder(args);
>
> builder.WebHost.ConfigureKestrel(options =>
> {
>     // "options" is KestrelServerOptions
> });
>
> var app = builder.Build();
>
> // Middleware goes here
>
> app.Run();
> ```
>
> Unless otherwise noted, snippets show only the relevant portion and omit unrelated service registrations, endpoint mappings, and `app.Run()`.

## Deployment topologies

Kestrel's security posture depends on where it sits in the network architecture. The two primary deployment models have meaningfully different threat surfaces.

### Edge server (direct internet exposure)

When Kestrel is directly accessible from the internet, it is the first line of defense:

- **Kestrel handles all TLS termination.** Configure certificates, TLS protocol versions, and client certificate requirements directly in Kestrel.
- **Host header filtering is critical.** Without a reverse proxy to validate the Host header, Kestrel must do it. Use host-filtering middleware to prevent DNS rebinding and host header attacks.
- **Don't enable Forwarded Headers middleware.** When there is no trusted proxy, processing `X-Forwarded-*` headers allows any client to spoof their IP address, scheme, and host. Also verify the `ASPNETCORE_FORWARDEDHEADERS_ENABLED` environment variable isn't set—see the environment variable warning in the reverse proxy section.
- **Rate limiting must be handled by the application.** There is no upstream proxy to absorb floods.
- **Connection limits should be monitored.** The defaults for `MaxConcurrentConnections` and `MaxConcurrentUpgradedConnections` are unlimited. Setting a limit can DoS legitimate requests if the limits are too low, or there is an unexpected surge in traffic. Metrics can be used to observe traffic patterns.
- **Don't treat Kestrel limits as DDoS protection.** These settings help bound resource usage, but they aren't a substitute for upstream volumetric-attack defenses. Those are better handled by an OSI layer 4 proxy.
- **Monitor with metrics.** Use Kestrel's built-in metrics (`kestrel.active_connections`, `kestrel.rejected_connections`, etc.) to detect anomalous traffic patterns and capacity issues.

### Behind a reverse proxy

When Kestrel sits behind a reverse proxy (YARP, IIS Application Request Routing (ARR), nginx proxy_pass, Azure App Service frontend, etc.), the proxy handles TLS termination and some request validation, but the trust boundary between the proxy and Kestrel requires careful configuration.

> **Note:**
> YARP itself runs on Kestrel. Placing a YARP reverse proxy in front of your application server still provides security value—the proxy Kestrel instance handles TLS termination, Host validation, rate limiting, and connection management at the edge, while the backend Kestrel instance can focus on application logic with a more restrictive configuration.

Key <example-value>:

- **Forwarded Headers middleware is required** to preserve the original client IP, scheme, and host. Without it, `HttpContext.Connection.RemoteIpAddress` returns the proxy's IP, not the client's. For full configuration details, see the Forwarded Headers middleware documentation.
- **Authentication and secure-cookie behavior often depend on the restored scheme.** If the proxy terminates TLS but Kestrel still sees the request as `http`, authentication handlers may generate incorrect redirect URIs, secure cookies may not be issued or returned as expected, and policies that require HTTPS can fail.
- **Configure `KnownProxies` or `KnownIPNetworks` explicitly.** By default, Forwarded Headers middleware only trusts the IPv6 loopback address (`::1`). If your proxy's IP isn't in the trusted list, the original client information is discarded.
- **Keep `ForwardLimit` at `1`** unless you have a chain of multiple proxies. Setting it to `null` (unlimited) means any number of `X-Forwarded-For` entries are processed, which can be exploited.
- **Host filtering can be relaxed** if the reverse proxy validates the Host header, but defense-in-depth suggests keeping it enabled.
- **HTTPS redirection may be unnecessary** if the proxy terminates TLS and communicates with Kestrel over a private network. If using forwarded headers then `UseHttpsRedirection()` will noop as it will see the `X-Forwarded-Proto` header as HTTPS, recommend keeping it in that case.

> **Note:**
> **Proxy-specific guidance:** The recommendations above are general guidelines. Each reverse proxy has its own configuration model and security features. Consult your proxy's documentation for specifics—for example, see the YARP documentation if you are using YARP as your reverse proxy.

> **Warning:**
> The Forwarded Headers middleware can be silently enabled with **no proxy restrictions** by setting the environment variable `ASPNETCORE_FORWARDEDHEADERS_ENABLED=true` (or `DOTNET_FORWARDEDHEADERS_ENABLED=true`, or the configuration key `ForwardedHeaders_Enabled`). When enabled this way, the framework **clears `KnownProxies` and `KnownIPNetworks`**, meaning every upstream IP is trusted. This is far more permissive than what is achievable through the C# API, where `KnownProxies` defaults to loopback only. **Verify this variable isn't set in edge deployments**—check your Dockerfiles, orchestrator configs, CI/CD pipelines, and hosting platform defaults.

**Edge deployment**: `CLIENT --[TLS]--> KESTREL`—Kestrel validates everything (TLS, Host, limits).

**Behind a proxy**: `CLIENT --[TLS]--> REVERSE PROXY --[HTTP]--> KESTREL`—the proxy validates Host, rate limits, and terminates TLS; Kestrel trusts the proxy and uses Forwarded Headers with `KnownProxies`.

> **Important:**
> **Key <example-value>:** Forwarded Headers middleware should only be enabled when there is a trusted proxy in front of Kestrel. In edge deployments, enabling it allows clients to forge their identity.

### TLS pass-through (proxy without TLS termination)

Some TLS passthrough reverse proxies and load balancers forward encrypted traffic to Kestrel without decrypting it—for example, TCP-level load balancers and SNI-based routers. In this topology, **Kestrel handles TLS termination** even though it sits behind a proxy:

**TLS pass-through**: `CLIENT --[TLS]-- (TCP load balancer) --[TLS]--> KESTREL`—the proxy routes by SNI or port but can't read headers; Kestrel terminates TLS, sees the client cert, and handles everything.

This creates a hybrid security posture:

- **Kestrel must be configured for TLS** (certificates, protocol versions, client certificates) as if it were an edge server. The proxy can't help with TLS configuration or certificate management.
- **`X-Forwarded-*` headers are unavailable.** Because the proxy can't decrypt the traffic, it can't inject HTTP headers. `HttpContext.Connection.RemoteIpAddress` will show the proxy's IP, not the client's. To obtain the original client IP, the proxy must use a transport-level mechanism such as the PROXY protocol, which Kestrel doesn't natively support.
- **Forwarded Headers middleware should not be enabled.** There are no forwarded headers to process, and enabling the middleware would allow a malicious client to inject fake `X-Forwarded-*` headers in the encrypted request.
- **Host Filtering is still relevant** since Kestrel sees the actual HTTP request after TLS termination.
- **Client certificates are visible to Kestrel** since the TLS handshake happens directly with Kestrel. mTLS works normally.

> **Important:**
> **Key <example-value>:** TLS pass-through deployments have the TLS responsibilities of an edge server but the IP-visibility limitations of a proxied deployment. Evaluate both the edge server and reverse proxy checklists when securing this topology.

### Protocol selection per endpoint

Kestrel allows configuring which HTTP protocol versions are accepted on each listen endpoint (e.g. IP/port pair, named pipe) via the `Protocols` property on `ListenOptions`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
        listenOptions.UseHttps();
    });

    options.ListenLocalhost(5002, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1; // HTTP/1.1 only -- no HTTP/2
        listenOptions.UseHttps();
    });
});
```

| Value | Protocols Enabled |
|---|---|
| `Http1` | HTTP/1.1 only |
| `Http2` | HTTP/2 only |
| `Http3` | HTTP/3 only |
| `Http1AndHttp2` (default with HTTPS) | HTTP/1.1 and HTTP/2 |
| `Http1AndHttp2AndHttp3` | All three protocols |

## Security checklist

Quick reference for production deployments. Each row links to the detailed section.

| Feature | Default | Edge Server | Behind Proxy | Details |
|---|---|---|---|---|
| **Host Filtering** | All hosts allowed | Configure `AllowedHosts` | Optional (defense-in-depth) | Security middleware |
| **HTTPS Redirection** | Not enabled | Enable | Depends on proxy config | Security middleware |
| **HSTS** | Not enabled | Enable | Enable | Security middleware |
| **Forwarded Headers** | Not enabled | **Don't enable** | Enable with `KnownProxies` | Security middleware |
| **Rate Limiting** | Disabled | Enable | Enable (app-level) | Security middleware |
| **CORS** | Disabled | Configure per API (if needed) | Configure per API (if needed) | Security middleware |
| **MaxRequestBodySize** | 30 MB | Review and lower | Review and lower | Configurable Limits |
| **TLS Protocol Versions** | OS default | Review—ensure TLS 1.0/1.1 disabled | N/A (proxy terminates) | Transport Security |
| **Client Certificates** | `NoCertificate` | Configure if mTLS needed | N/A (proxy handles) | Transport Security |
| **Certificate Revocation** | `false` | Consider enabling | N/A | Transport Security |
| **Server Header** | `Server: Kestrel` | Consider disabling | Consider disabling | Server Identity |
| **AllowHostHeaderOverride** | `false` | Keep `false` | Keep `false` unless proxy requires | HTTP/1.1 Parsing |
| **AllowAlternateSchemes** | `false` | Keep `false` | Enable only if proxy requires | Server Identity |
| **AllowSynchronousIO** | `false` | Keep `false` | Keep `false` | Configurable Limits |

### Minimum recommended configuration (edge server)

The following demonstrates the key <example-value> to review when deploying Kestrel as an edge server. Appropriate values depend on your application's requirements and expected traffic patterns:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // Review request size limits -- the 30 MB default may be larger than needed
    options.Limits.MaxRequestBodySize = /* appropriate for your endpoints */;

    // Consider tightening header limits from the defaults
    options.Limits.MaxRequestHeaderCount = /* appropriate for your application */;

    // Review timeout values
    options.Limits.KeepAliveTimeout = /* balance between resource usage and client experience */;
    options.Limits.RequestHeadersTimeout = /* shorter values improve slowloris resistance */;

    // Enable HTTP/2 keep-alive pings (disabled by default)
    options.Limits.Http2.KeepAlivePingDelay = /* enable to detect zombie connections */;
    options.Limits.Http2.KeepAlivePingTimeout = TimeSpan.FromSeconds(20);
});

var app = builder.Build();

app.UseHostFiltering();
app.UseHttpsRedirection();
app.UseHsts();
app.UseRateLimiter();
```
