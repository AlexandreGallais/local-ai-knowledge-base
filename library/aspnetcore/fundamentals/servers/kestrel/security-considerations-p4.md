---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server (part 4 of 6)

## HTTP/3 security

Kestrel's HTTP/3 implementation runs over QUIC via `System.Net.Quic`. QUIC mandates TLS 1.3, so there is no clear-text HTTP/3.

Like HTTP/2, HTTP/3's binary framing eliminates common HTTP/1.1-style request smuggling. Each request is carried on an independent QUIC stream with explicit length framing. The primary threat categories for HTTP/3 are denial-of-service through stream and connection resource exhaustion.

### Key threats and mitigations

| Threat | Mitigation |
|---|---|
| **0-RTT Replay** | `System.Net.Quic` doesn't enable TLS 1.3 0-RTT, preventing replay attacks entirely. |
| **Rapid Reset** | Stream creation and cancellation are managed by `System.Net.Quic` with back-pressure for stream creation. |
| **Large Frame (Fast Failure)** | SETTINGS and GOAWAY frames exceeding 10,000 bytes trigger immediate connection closure. |
| **Slow Request Body** | `MinRequestBodyDataRate` (240 B/s default) with 5-second grace period. |
| **Slow Response Read** | `MinResponseDataRate` with caveat—QUIC-level buffering reduces effectiveness, similar to HTTP/2 with TCP. |
| **Cancellation Flood** | Delegated to `System.Net.Quic` stream management and resource limits. |
| **Unknown Frame Types** | Silently ignored per RFC 9114 requirement. |
| **Dynamic QPACK** | Kestrel doesn't create QPACK decoder/encoder streams. References to a dynamic table cause stream closure. |
| **Push Streams** | Server push isn't supported. Push-related frames (PUSH_PROMISE, CANCEL_PUSH, MAX_PUSH_ID) are parsed but payload is ignored. |

### HTTP/3-specific limits

HTTP/3 limits are split between Kestrel's `Http3Limits` (configured via `options.Limits.Http3`) and the QUIC transport layer (`QuicTransportOptions`).

**Kestrel HTTP/3 Limits** (`KestrelServerOptions.Limits.Http3`):

| Setting | Default | Purpose |
|---|---|---|
| `MaxRequestHeaderFieldSize` | 32,768 bytes | Maximum size of a single request header field (name + value). |

**QUIC Transport Limits** (`QuicTransportOptions`):

| Setting | Default | Purpose |
|---|---|---|
| `MaxBidirectionalStreamCount` | 100 | Maximum concurrent bidirectional (request) streams per connection. Analogous to HTTP/2's `MaxStreamsPerConnection`. |
| `MaxUnidirectionalStreamCount` | 10 | Maximum concurrent unidirectional streams per connection (used for control streams, QPACK streams, etc.). |

QUIC transport options are configured separately from Kestrel limits:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // HTTP/3 header limits
    options.Limits.Http3.MaxRequestHeaderFieldSize = 16 * 1024;
});

// QUIC transport stream limits
builder.WebHost.UseQuic(quic =>
{
    quic.MaxBidirectionalStreamCount = 50;
    quic.MaxUnidirectionalStreamCount = 5;
});
```

### Behavioral notes

- **`RequestHeadersTimeout` is per-stream in HTTP/3** (vs. connection-wide in HTTP/2), since HTTP/3 streams are independent.
- **Only one inbound control stream is allowed** per connection. A second control stream triggers connection abort.
- **Streams can arrive out of order**—a request stream may arrive before the control stream.
- **Platform requirements**: HTTP/3 requires Windows 11 / Windows Server 2022 or later (for TLS 1.3 support), or Linux with the `libmsquic` package. Check `QuicListener.IsSupported` at runtime.
- **`DisableAltSvcHeader` per endpoint**: By default, when HTTP/3 is enabled, Kestrel adds an `Alt-Svc` response header to HTTP/1.1 and HTTP/2 responses advertising the HTTP/3 endpoint. Set `DisableAltSvcHeader = true` on individual `ListenOptions` to suppress this for specific endpoints. This is useful when certain endpoints should not advertise HTTP/3 (e.g., internal endpoints, endpoints behind proxies that don't support QUIC, or when you want to control the HTTP/3 rollout gradually).

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(IPAddress.Any, 5001, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
        listenOptions.UseHttps();
        listenOptions.DisableAltSvcHeader = true; // No Alt-Svc advertisement on this endpoint
    });
});
```

## HPACK and QPACK header compression security

Header compression introduces specific security concerns.

### HPACK (HTTP/2)

| Concern | Mitigation |
|---|---|
| **HPACK Bomb** (small compressed headers expand to large uncompressed data) | `MaxDynamicTableSize` (default 4 KB), `MaxRequestHeaderFieldSize` (default 32 KB), and `MaxRequestHeaderCount` (default 100) bound expansion. |
| **Variable-length integer overflow** | Integers are limited to 31 bits. Unnecessary padding in the encoding is treated as an error. |
| **Zero-length header names** (CVE-2019-9516) | Empty header names are treated as an error. Empty header values are special-cased. |
| **Quadratic parsing** (CVE-2023-33953, CVE-2022-41723) | Headers are parsed per-frame, not batch-reparsed across continuation frames. |
| **Dynamic table dangling indices** (CVE-2019-11940) | Dynamic table updates occur after full decoding of the header block, preventing out-of-bounds access from mid-decode insertions. |
| **Information disclosure via shared dynamic table** | In Kestrel, the dynamic table is per-connection. Multi-tenant proxy scenarios (where different clients share a connection) are out of scope for Kestrel itself. |

### QPACK (HTTP/3)

Kestrel **doesn't use dynamic QPACK tables**. The `HeaderTableSize` for HTTP/3 is set to `0`, meaning:

- Kestrel never creates QPACK encoder or decoder streams.
- If a client references a dynamic table entry, the stream is closed with an error.
- This eliminates the QPACK-specific attack surface at the cost of slightly reduced compression efficiency.

## Configurable limits

All limits are configured via `KestrelServerOptions.Limits` (a `KestrelServerLimits` instance).

### Request limits

| Property | Default | Valid Values | Protection |
|---|---|---|---|
| `MaxRequestBodySize` | 30,000,000 bytes (~28.6 MB) | `null` = unlimited, `0`+ | Prevents upload-based denial of service. Can be overridden per-request via `IHttpMaxRequestBodySizeFeature`. |
| `MaxRequestBufferSize` | 1,048,576 bytes (1 MB) | `null` = unlimited, `>= MaxRequestLineSize` | Bounds internal read buffer. Prevents memory exhaustion from connection-level buffering. |
| `MaxRequestLineSize` | 8,192 bytes (8 KB) | > 0 | Limits the HTTP request line (`METHOD URI VERSION`). Requests exceeding this return `414 URI Too Long`. |
| `MaxRequestHeadersTotalSize` | 32,768 bytes (32 KB) | > 0 | Total size of all headers combined. Exceeding this returns `431 Request Header Fields Too Large`. |
| `MaxRequestHeaderCount` | 100 | > 0 | Number of header fields. Prevents slowloris-style header accumulation. |

### Response limits

| Property | Default | Valid Values | Protection |
|---|---|---|---|
| `MaxResponseBufferSize` | 65,536 bytes (64 KB) | `null` = unlimited, `0`+ | Controls when write operations block waiting for the client to consume data. `0` means every write blocks until flushed. |

### Connection limits

| Property | Default | Valid Values | Protection |
|---|---|---|---|
| `MaxConcurrentConnections` | `null` (unlimited) | `null` or > 0 | Limits total concurrent HTTP connections. |
| `MaxConcurrentUpgradedConnections` | `null` (unlimited) | `null` or > 0 | Separately limits concurrent WebSocket and other upgraded connections. |

> **Note:**
> The `MaxRequestBodySize` default (30 MB) is chosen for compatibility with IIS defaults. For APIs that don't accept large uploads, consider lowering this significantly. See the Security Checklist for topology-specific guidance.

### Per-request body size override

The `IHttpMaxRequestBodySizeFeature` allows overriding `MaxRequestBodySize` on a per-request basis. This can only be set **before** the request body is read. Setting it to `null` removes the limit for that request.

```csharp
var app = builder.Build();

app.Use(async (context, next) =>
{
    var bodySizeFeature = context.Features.Get<IHttpMaxRequestBodySizeFeature>();
    if (bodySizeFeature is not null && !bodySizeFeature.IsReadOnly)
    {
        bodySizeFeature.MaxRequestBodySize = 100 * 1024 * 1024; // 100 MB for this request
    }

    await next(context);
});
```

### Synchronous I/O protection

`AllowSynchronousIO` (default `false`) controls whether synchronous read/write operations are permitted on request and response streams. When `false`, calling `Read()`, `Write()`, or `Flush()` on `Request.Body` or `Response.Body` throws an `InvalidOperationException`.

This default protects against **thread starvation denial-of-service**: synchronous I/O blocks the calling thread while waiting for network I/O to complete. Under load, this can exhaust the thread pool and make the application unresponsive. Asynchronous operations (`ReadAsync()`, `WriteAsync()`, `FlushAsync()`) don't block threads.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    // Default is false -- only enable if legacy code requires synchronous I/O
    options.AllowSynchronousIO = true;
});
```

Per-request override is available via `IHttpBodyControlFeature`:

```csharp
var syncIoFeature = context.Features.Get<IHttpBodyControlFeature>();
if (syncIoFeature is not null)
{
    syncIoFeature.AllowSynchronousIO = true;
}
```

> **Tip:**
> Keep the default (`false`). If legacy middleware or libraries require synchronous I/O, prefer the per-request override rather than enabling it server-wide.

## Timeouts and data rate limits

Timeouts and minimum data rates protect against slow-client denial-of-service attacks (slowloris, slow POST, slow read).

### Timeouts

| Timeout | Default | Scope | Protection |
|---|---|---|---|
| `KeepAliveTimeout` | 130 seconds | Between requests on a keep-alive connection | Closes idle connections to free resources. |
| `RequestHeadersTimeout` | 30 seconds | Time to receive complete request headers | Prevents slowloris attacks that send headers one byte at a time. In HTTP/2, this is connection-wide. In HTTP/3, it applies per-stream. |
| `HandshakeTimeout` (HTTPS) | 10 seconds | TLS handshake completion | Prevents slowloris attacks at the TLS layer. |

### Minimum data rates

| Rate | Default | Grace Period | Protection |
|---|---|---|---|
| `MinRequestBodyDataRate` | 240 bytes/second | 5 seconds | Rejects clients that send request body data too slowly (slow POST attacks). The grace period allows for initial connection setup and TCP slow-start. |
| `MinResponseDataRate` | 240 bytes/second | 5 seconds | Rejects clients that consume response data too slowly (slow read attacks). |

> **Warning:**
> `MinResponseDataRate` may be **less effective** in HTTP/2 and HTTP/3. OS-level TCP buffering (HTTP/2) and QUIC-level buffering (HTTP/3) can absorb writes between Kestrel and the client, which may delay detection of slow-reading clients.

Data rates can be set to `null` to disable enforcement:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MinRequestBodyDataRate = null; // (not recommended)  Disable minimum request rate
});
```
