---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 6 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server (part 6 of 6)

## Named pipes transport security

Kestrel supports named pipes as a transport for inter-process communication on Windows.

### Pipe instance security

Kestrel uses `FILE_FLAG_FIRST_PIPE_INSTANCE` when creating the named pipe. If an attacker pre-creates a pipe with the same name (name squatting), Kestrel's startup **fails** rather than inheriting the attacker's weaker ACLs. This is a deliberate security decision.

Kestrel also maintains a pending server stream at all times to preserve the security settings established at startup, preventing a window where an attacker could create a replacement pipe.

### Access control

| Option | Default | Description |
|---|---|---|
| `CurrentUserOnly` | `true` | Restricts pipe access to the same user account running Kestrel. |
| Custom `PipeSecurity` |—| Allows fine-grained ACL configuration via `PipeAccessRule` for scenarios requiring access from different users or services. |

### Limitations

- Named pipes are connection-scoped (single stream per connection). HTTP/1.1 and HTTP/2 are supported; **HTTP/3 isn't supported**.
- The concept of graceful vs. ungraceful close doesn't map cleanly to named pipes—Kestrel relies on HTTP-level protocol boundaries (Content-Length, chunked encoding, frames) for message delimitation.

## Unix domain sockets transport security

Kestrel supports Unix domain sockets (UDS) as a transport, commonly used for communication between a reverse proxy (e.g., nginx) and Kestrel on the same machine.

### File permissions

Unix domain sockets are represented as files in the filesystem. Access control is governed by file permissions (owner, group, other). **Kestrel doesn't explicitly set file permissions on the socket file**—the socket inherits permissions based on the process's `umask` at the time of creation.

For production deployments, ensure the socket file's permissions restrict access to the intended user or group (`www-data` in the example below):

```bash
# After Kestrel creates the socket, restrict permissions
chmod 660 /var/run/myapp/kestrel.sock
chown www-data:www-data /var/run/myapp/kestrel.sock
```

Alternatively, configure the process `umask` before starting Kestrel to control the default permissions.

### Configuration

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenUnixSocket("/var/run/myapp/kestrel.sock");
});
```

The socket path must be an absolute path. Kestrel validates this and rejects relative paths.

### Considerations

- **No network exposure**: Unix domain sockets are only accessible from the local machine, significantly reducing the attack surface compared to TCP. This makes them a good choice for the proxy-to-Kestrel link.
- **Socket file cleanup**: If Kestrel exits without cleaning up the socket file, the next startup may fail. Ensure the deployment process handles stale socket files.
- **Permissions are the primary access control**: Unlike named pipes on Windows, there is no built-in API in Kestrel for configuring socket permissions. This must be handled at the OS level.

## Memory safety and System.IO.Pipelines

Kestrel uses `System.IO.Pipelines` for internal I/O buffering. While this is an implementation detail for most developers, it has security implications for advanced scenarios such as custom middleware or transport implementations.

### Key concerns

- **Buffer reuse and information disclosure**: `System.IO.Pipelines` uses memory pooling. Buffers are **not** zeroed between uses. If a `PipeWriter` calls `GetMemory()` and advances by the full `Memory<byte>.Length` (which may be larger than requested), it can inadvertently include stale data from a previous use of that buffer.
- **Backpressure thresholds**: `PauseWriterThreshold` and `ResumeWriterThreshold` control when writers are back-pressured. Incorrect `AdvanceTo()` usage (setting `examined` to `buffer.End` without consuming data) releases backpressure and can lead to unbounded memory growth.
- **Holding references after completion**: Accessing `Memory<byte>` or `ReadOnlySequence<byte>` after calling `Complete()` on a `PipeWriter`/`PipeReader` accesses memory that may have been returned to the pool and reused, causing data corruption or information disclosure.

### Opting out of pooled memory (advanced)

For extremely security-sensitive deployments, Kestrel's memory-pool factory can be replaced in DI with an implementation that returns **fresh arrays** instead of pooled blocks. This reduces the chance of stale data reappearing through buffer reuse, at the cost of substantially higher allocation and GC pressure.

```csharp
using System.Buffers;
using Microsoft.AspNetCore.Connections;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Replace(ServiceDescriptor.Singleton<IMemoryPoolFactory<byte>, FreshArrayMemoryPoolFactory>());

sealed class FreshArrayMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create(MemoryPoolOptions? options = null)
        => new FreshArrayMemoryPool();
}

sealed class FreshArrayMemoryPool : MemoryPool<byte>
{
    public override int MaxBufferSize => int.MaxValue;

    public override IMemoryOwner<byte> Rent(int minBufferSize = -1)
    {
        var size = minBufferSize <= 0 ? 4096 : minBufferSize;
        return new FreshArrayOwner(new byte[size]);
    }

    protected override void Dispose(bool disposing)
    {
    }

    private sealed class FreshArrayOwner : IMemoryOwner<byte>
    {
        private byte[]? _buffer;

        public FreshArrayOwner(byte[] buffer)
        {
            _buffer = buffer;
        }

        public Memory<byte> Memory => _buffer is null ? Memory<byte>.Empty : _buffer;

        public void Dispose()
        {
            if (_buffer is not null)
            {
                Array.Clear(_buffer);
                _buffer = null;
            }
        }
    }
}
```

This is an advanced hardening tradeoff, not a general recommendation. Most applications should keep Kestrel's default pooling behavior for performance.

### Impact on application developers

These concerns primarily affect developers writing:
- Custom transport implementations
- Custom connection middleware
- Direct `PipeReader`/`PipeWriter` usage in request/response processing

Standard ASP.NET Core request/response patterns (reading `Request.Body`, writing to `Response.Body`) are safe—Kestrel handles the pipeline management internally.

## Server identity and information disclosure

### Server header

`AddServerHeader` (default `true`) causes Kestrel to include `Server: Kestrel` in every response. Disable it to prevent server identification:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.AddServerHeader = false;
});
```

While this is "security through obscurity," it reduces information available to automated scanners and is a common hardening step.

### Header string reuse

`DisableStringReuse` (default `false`) controls whether Kestrel caches and reuses string values for common headers across requests on the same connection. In most scenarios this is safe, but it can be disabled for defense-in-depth in high-security environments.

### Scheme enforcement

`AllowAlternateSchemes` (default `false`) controls whether HTTP/2 and HTTP/3 `:scheme` pseudo-headers can differ from the transport protocol. When `false`, a request received over TLS must have `:scheme` set to `https`. Enable this only when behind a trusted proxy that uses a different scheme (e.g., a proxy that terminates TLS and forwards with `:scheme: https` over a plain-text backend connection).

### Reserved bits

In HTTP/2 frame headers, Kestrel explicitly zeroes reserved bits. Without this, pooled memory could leak a single bit of stale data from a previous frame. While the information disclosure is minimal (one bit), it is prevented as a matter of correctness.

## AppContext compatibility switches

Kestrel provides several AppContext switches that change protocol-parsing and connection behavior. Each switch has different security implications—some strengthen security, some weaken it, and others are operationally neutral. Review the effect of each switch before enabling it.

AppContext switches can be set in code (before the host is built), in a `.runtimeconfig.json` file, or via an environment variable:

```csharp
// In code -- must be called before building the host
AppContext.SetSwitch("Microsoft.AspNetCore.Server.Kestrel.DisableHttp1LineFeedTerminators", true);
```

```json
// In runtimeconfig.template.json (applied at publish time)
{
  "configProperties": {
    "Microsoft.AspNetCore.Server.Kestrel.DisableHttp1LineFeedTerminators": true
  }
}
```

| Switch | Default | Effect |
|---|---|---|
| `Microsoft.AspNetCore.Server.Kestrel.DisableHttp1LineFeedTerminators` | `false` | When `true`, bare LF (`\n`) line terminators are **rejected** in HTTP/1.1. The default (`false`) accepts bare LF as permitted by RFC 9112 Section 2.2. Setting this to `true` provides defense-in-depth against intermediaries that treat bare LF differently than Kestrel. |
| `Microsoft.AspNetCore.Server.Kestrel.AllowKeepAliveAfterCLTE` | `false` | When `true`, the connection is allowed to be kept alive after a request that contains **both** Content-Length and Transfer-Encoding headers. When `false` (default), Kestrel closes the connection after processing such a request, eliminating potential smuggling risk from pipeline reuse. **Setting this to `true` weakens request smuggling protections.** |
| `Microsoft.AspNetCore.Server.Kestrel.EnableInsecureChunkedRequestParsing` | `false` | When `true`, allows lenient parsing of chunk extensions (unpaired `\r` or `\n`). **This weakens request smuggling protections and isn't available in .NET 11.** |
| `Microsoft.AspNetCore.Server.Kestrel.FinOnError` | `false` | Controls connection close behavior on protocol errors. When `true`, sends FIN instead of RST. FIN helps avoid response truncation but might use more resources to close abusive connections. |
| `Microsoft.AspNetCore.Server.Kestrel.DisableCertificateFileWatching` | `false` | When `true`, disables automatic certificate file reload on change. |
| `Microsoft.AspNetCore.Server.Kestrel.Experimental.WebTransportAndH3Datagrams` | `false` | When `true`, enables experimental WebTransport and HTTP/3 Datagram support. **Experimental features may have unresolved security implications and aren't recommended for production.** |

### AppContext properties (HTTP/2)

These are set via `AppContext.SetData()` rather than `AppContext.SetSwitch()`:

| Property | Default | Effect |
|---|---|---|
| `Microsoft.AspNetCore.Server.Kestrel.Http2.MaxEnhanceYourCalmCount` | (allows bursty clients) | Controls the rate of ENHANCE_YOUR_CALM (error code 11) responses sent to misbehaving HTTP/2 clients. Averaged over a 5-second window. |
| `Microsoft.AspNetCore.Server.Kestrel.Http2.MaxConnectionFlowControlQueueSize` | (internal default) | Caps the outbound message queue size per HTTP/2 connection. Prevents memory exhaustion from queued SETTINGS ACKs, PING responses, and WINDOW_UPDATE frames. |

> **Important:**
> **Guidance:** `DisableHttp1LineFeedTerminators` provides defense-in-depth when set to `true`—the default (`false`) is RFC-compliant but can cause framing disagreements with intermediaries that handle bare LF differently. `AllowKeepAliveAfterCLTE` defaults to the secure posture (`false`)—setting it to `true` weakens it. `EnableInsecureChunkedRequestParsing` weakens security when enabled. The remaining switches (`FinOnError`, `DisableCertificateFileWatching`) are operational and don't directly affect request-parsing security.
