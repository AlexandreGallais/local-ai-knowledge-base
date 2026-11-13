---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server (part 5 of 6)

## Request rejection and error responses

When Kestrel rejects a request due to a protocol violation or limit breach, it sends a minimal error response and closes the connection. The request **never reaches application middleware or endpoints**—there is no opportunity to customize the response body or headers for rejected requests.

### Status code mapping

| HTTP Status | Rejection Reasons |
|---|---|
| **400 Bad Request** | `InvalidRequestLine`, `InvalidRequestHeader`, `InvalidRequestHeadersNoCRLF`, `InvalidRequestTarget`, `InvalidCharactersInHeaderName`, `InvalidContentLength`, `MultipleContentLengths`, `FinalTransferCodingNotChunked`, `BadChunkSuffix`, `BadChunkSizeData`, `BadChunkExtension`, `ChunkedRequestIncomplete`, `UnexpectedEndOfRequestContent`, `MissingHostHeader`, `MultipleHostHeaders`, `InvalidHostHeader`, `LengthRequiredHttp10` |
| **405 Method Not Allowed** | `OptionsMethodRequired`, `ConnectMethodRequired` |
| **408 Request Timeout** | `RequestHeadersTimeout`, `RequestBodyTimeout` |
| **413 Content Too Large** | `RequestBodyTooLarge` |
| **414 URI Too Long** | `RequestLineTooLong` |
| **431 Request Header Fields Too Large** | `HeadersExceedMaxTotalSize`, `TooManyHeaders` |
| **505 HTTP Version Not Supported** | `UnrecognizedHTTPVersion` |

### Observing rejections

Kestrel provides two ways to observe rejected requests:

**Logging**: Bad requests are logged at `Debug` level under the `Microsoft.AspNetCore.Server.Kestrel.BadRequests` category. To capture these in production, configure logging to include this category at `Debug` level:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore.Server.Kestrel.BadRequests": "Debug"
    }
  }
}
```

**Metrics**: The `kestrel.connection.duration` histogram includes an `error.type` tag with the rejection reason (e.g., `invalid_request_line`, `request_headers_timeout`, `max_concurrent_connections_exceeded`). Use this to alert on spikes in rejected connections:

```csharp
// Example: query with dotnet-counters or OpenTelemetry
// Meter: Microsoft.AspNetCore.Server.Kestrel
// Instrument: kestrel.connection.duration (histogram, seconds)
// Tag: error.type = "invalid_request_headers" | "request_body_too_large" | ...
```

### Monitoring with metrics

Beyond rejection-specific signals, Kestrel emits a set of built-in metrics under the `Microsoft.AspNetCore.Server.Kestrel` meter that are useful for detecting anomalous traffic patterns:

| Metric | What it tells you |
|---|---|
| `kestrel.connection.duration` | Connection lifetime distribution; spikes in short-lived connections may indicate scanning or SYN floods. |
| `kestrel.active_connections` | Current connection count; useful for capacity planning and detecting connection exhaustion. |
| `kestrel.queued_connections` | Connections waiting to be accepted; non-zero values may indicate saturation. |
| `kestrel.upgraded_connections` | Active WebSocket/upgraded connections; monitors long-lived connection accumulation. |
| `kestrel.rejected_connections` | Connections rejected due to limits; alerts on whether limits are being hit. |
| `kestrel.tls_handshake.duration` | TLS handshake time; spikes may indicate computational attacks or client issues. |
| `kestrel.active_tls_handshakes` | Concurrent in-progress TLS handshakes; high values may indicate handshake flooding. |

These metrics integrate with OpenTelemetry, `dotnet-counters`, Prometheus exporters, and Azure Monitor. For full setup guidance, see:

- ASP.NET Core metrics overview
- Kestrel built-in metrics reference

### TLS-over-HTTP detection

Kestrel detects when a client attempts a TLS handshake on a plain HTTP port. This is reported as `TlsOverHttpError` with a `400 Bad Request` response, helping diagnose misconfigured clients.

## Security middleware

Several ASP.NET Core middleware components are critical for securing applications hosted on Kestrel. The order in which middleware is added to the pipeline matters.

### Host filtering

**What it does**: Validates the `Host` header against an allowlist, returning `400 Bad Request` for invalid hosts.

**Why it matters**: The ASP.NET Core framework uses the `Host` header to generate absolute URLs in many places—email confirmation links, password reset URLs, redirect URIs, OpenID Connect callbacks, and any use of `LinkGenerator` or `IUrlHelper`. An attacker who can control the `Host` header can cause the application to generate links pointing to a malicious domain. Host Filtering prevents this by rejecting requests with unrecognized Host values. **This is essential when Kestrel is an edge server**, because there is no upstream proxy to validate the Host header first.

```json
// In appsettings.json
{
  "AllowedHosts": "example.com;*.example.com"
}
```

| Option | Default | Description |
|---|---|---|
| `AllowedHosts` | `*` (all hosts) | Semicolon-separated list. Supports wildcards (`*.example.com`). Port numbers are excluded from comparison. |
| `AllowEmptyHosts` | `true` | Allow requests without a Host header (HTTP/1.0 compatibility). |
| `IncludeFailureMessage` | `true` | Include an error message body in the 400 response. |

### HTTPS redirection

**What it does**: Redirects non-HTTPS requests to HTTPS.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseHttpsRedirection();
```

| Option | Default | Description |
| --- | --- | --- |
| `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions.HttpsPort` | Auto-detected | The HTTPS port to redirect to. Auto-detected from the `HTTPS_PORT` configuration key, the `ASPNETCORE_HTTPS_PORT` environment variable, or the `Microsoft.AspNetCore.Hosting.Server.Features.IServerAddressesFeature`. |
| `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionOptions.RedirectStatusCode` | 307 (Temporary Redirect) | Use 308 (Permanent Redirect) for production APIs, where clients should cache the redirect. |

> **Note:**
> **Edge servers:** Enable HTTPS Redirection. **Behind a proxy**: Often unnecessary if the proxy handles TLS termination and all internal traffic is over a private network.
>
> Don't confuse the `HTTPS_PORTS` configuration key and `ASPNETCORE_HTTPS_PORTS` environment variable, which set the ports for Kestrel/HTTP.sys endpoint configuration, with the `HTTPS_PORT` configuration key and `ASPNETCORE_HTTPS_PORT` environment variable, which set the port for HTTPS redirection middleware.

### HTTP strict transport security (HSTS)

**What it does**: Adds the `Strict-Transport-Security` header, telling browsers to only connect via HTTPS for future requests (RFC 6797).

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseHsts();
```

| Option | Default | Description |
|---|---|---|
| `MaxAge` | 30 days | How long browsers remember the HTTPS-only policy. Production deployments often increase this to 1-2 years. |
| `IncludeSubDomains` | `false` | Apply the policy to all subdomains. |
| `Preload` | `false` | Allow inclusion in browser HSTS preload lists. |
| `ExcludedHosts` | `localhost`, `127.0.0.1`, `[::1]` | Hosts that don't receive the header (for local development). |

> **Important:**
> HSTS is a one-way commitment. Once a browser receives an HSTS header, it will refuse HTTP connections to that domain for the `MaxAge` duration. Start with a short `MaxAge` and increase once confident.

### Forwarded headers

**What it does**: Processes `X-Forwarded-For`, `X-Forwarded-Host`, `X-Forwarded-Proto`, and `X-Forwarded-Prefix` headers from reverse proxies to restore the original client information.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
    KnownProxies = { IPAddress.Parse("10.0.0.1") },
    ForwardLimit = 1
});
```

| Option | Default | Description |
|---|---|---|
| `ForwardedHeaders` | `None` | Which headers to process. Must be explicitly set. |
| `KnownProxies` | `IPAddress.IPv6Loopback` (`::1`) | IPs of trusted proxies. **Must be configured.** |
| `KnownIPNetworks` | (empty) | IP ranges of trusted proxies (e.g., `10.0.0.0/8`). |
| `ForwardLimit` | 1 | Maximum number of proxy hops to trust. `null` = unlimited (**dangerous**). |
| `AllowedHosts` | (empty) | Validate `X-Forwarded-Host` values. |
| `RequireHeaderSymmetry` | `false` | Require matching counts across the forwarded headers. |

> **Warning:**
> Forwarded Headers middleware **must be placed before** any middleware that depends on scheme, host, or client IP (authentication, authorization, CORS, etc.). If it runs too late, those components may see the backend hop as plain `http` instead of the original `https` request and fail in subtle ways—for example, authentication handlers may reject requests because the scheme is `http` instead of `https`, and secure cookies won't be sent. Also, **never enable this middleware in edge deployments**—it allows clients to spoof their IP address.
>
> For the full set of configuration options and guidance, see the ASP.NET Core Forwarded Headers middleware documentation.

### Rate limiting

**What it does**: Limits request rate per endpoint or globally using `System.Threading.RateLimiting`.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseRateLimiter();
```

| Option | Default | Description |
|---|---|---|
| `GlobalLimiter` | `null` | A `PartitionedRateLimiter<HttpContext>` applied to all requests. |
| `RejectionStatusCode` | 503 | HTTP status code for rate-limited requests. Consider `429 Too Many Requests` for public APIs. |
| `OnRejected` | `null` | Custom rejection handler for adding `Retry-After` headers or logging. |

Rate limiting policies can be applied per-endpoint with `[EnableRateLimiting("policyName")]` and disabled with `[DisableRateLimiting]`. Common partition keys include client IP, authenticated user ID, and API key.

### CORS

**What it does**: Handles Cross-Origin Resource Sharing preflight requests and validates cross-origin access.

For APIs consumed by browser clients on different domains, CORS policies prevent unauthorized cross-domain data access. Key considerations:

- Avoid `AllowAnyOrigin` with `AllowCredentials`—this is insecure and rejected by browsers.
- Be specific about allowed origins, methods, and headers.
- `PreflightMaxAge` controls how long browsers cache preflight responses.

### Recommended middleware order

**Edge server:**
```csharp
app.UseHostFiltering();         // Validate Host header
app.UseHttpsRedirection();      // Redirect HTTP -> HTTPS
app.UseHsts();                  // Add Strict-Transport-Security
app.UseRateLimiter();           // Rate limiting
app.UseCors();                  // CORS (if needed)
app.UseAuthentication();
app.UseAuthorization();
```

**Behind a reverse proxy:**
```csharp
app.UseForwardedHeaders();      // MUST come first -- restores client IP/scheme/host
app.UseHostFiltering();         // Optional -- defense-in-depth
app.UseHsts();                  // HSTS (may also be set by proxy)
app.UseRateLimiter();           // Rate limiting (may also be done at proxy)
app.UseCors();                  // CORS (if needed)
app.UseAuthentication();
app.UseAuthorization();
```

## WebSocket security

WebSocket connections bypass many HTTP-level protections (rate limiting, request size limits) since they are long-lived upgraded connections. The WebSocket middleware provides its own security controls.

### Cross-site WebSocket hijacking (origin validation)

By default, WebSocket connections are accepted from **any origin**. This makes applications vulnerable to cross-site WebSocket hijacking, where a malicious webpage opens a WebSocket to your server using the victim's cookies.

Configure `AllowedOrigins` to restrict which origins can establish WebSocket connections:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseWebSockets(new WebSocketOptions
{
    AllowedOrigins = { "https://example.com", "https://www.example.com" }
});
```

| Option | Default | Description |
|---|---|---|
| `AllowedOrigins` | Empty (all origins allowed) | Origins permitted to establish WebSocket connections. `"*"` explicitly allows all. Origins are compared case-insensitively. |

When origin validation fails, the middleware returns `403 Forbidden`. Note that origin validation only applies when the `Origin` header is present—non-browser clients may omit it entirely.

### Keep-alive and timeout

| Option | Default | Description |
|---|---|---|
| `KeepAliveInterval` | 2 minutes | Interval between WebSocket Ping frames. Detects unresponsive clients. |
| `KeepAliveTimeout` | `Timeout.InfiniteTimeSpan` (disabled) | Time to wait for a Pong response after sending a Ping. If exceeded, the WebSocket is aborted. Consider enabling this in production. |

### WebSocket connection limits

WebSocket and other upgraded connections count toward `MaxConcurrentUpgradedConnections` (unlimited by default). Monitor connection counts and expected traffic before deciding whether to set a limit. A limit that's too low or an unexpected traffic surge can reject legitimate connections. See the edge server guidance. If needed, configure an explicit limit:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxConcurrentUpgradedConnections = /* null or >= 0 */;
});
```

### Considerations

- **Message size**: WebSocket message sizes aren't limited by `MaxRequestBodySize`. Application code should validate message sizes.
- **Authentication**: WebSocket connections can't send custom headers during the handshake from browsers. Authentication typically relies on cookies or query string tokens. Validate authentication before accepting the WebSocket.
- **Rate limiting**: Standard HTTP rate limiting middleware doesn't apply to messages sent over an established WebSocket connection. Implement application-level rate limiting if needed.
- **Per-message deflate (compression)**: WebSocket supports optional per-message deflate compression (RFC 7692), which is **disabled by default** in ASP.NET Core. If enabled, it introduces compression-oracle risks similar to CRIME/BREACH—an attacker who can inject known plaintext into a message and observe the compressed size can infer secret content byte-by-byte. Only enable per-message deflate if the messages don't mix attacker-controlled and secret data.
