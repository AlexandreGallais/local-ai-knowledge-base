---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server (part 3 of 6)

## HTTP/1.1 request parsing and validation

Kestrel implements HTTP/1.1 parsing per RFC 9112 with several security-motivated constraints.

### Request line validation

- **Method**: Only valid HTTP token <example-value> are accepted. Invalid token <example-value> in the method cause rejection.
- **Request target**: Empty paths and paths starting with `?` or `%` are rejected. Null bytes (`0x00`) are rejected because they can cause issues with native servers when forwarded; non-ASCII bytes (>= `0x80`) are rejected during ASCII string conversion. Kestrel's parser scans for delimiters to find target boundaries but doesn't perform a per-byte VCHAR check (RFC 9112 §4), so bytes in `0x01–0x1F` (excluding `\0`, `\n`, `\r`, space) and `0x7F` (DEL) reach `Request.Path` unchanged. The practical risk is log injection—for example, `0x1B` (ESC) in the path can inject ANSI escape sequences into log viewers. Applications can defend against this with one or more of the following measures: deploying behind a stricter reverse proxy, using a logger provider that escapes control characters, or sanitizing logs before they're displayed.
- **HTTP version**: Only `HTTP/1.0` and `HTTP/1.1` are accepted by the `HTTP/1.1` parser. The `HTTP/2` parser is selected via ALPN or prior-knowledge. Unrecognized versions (including `HTTP/0.9`, `HTTP/2.0`) are rejected with `505 HTTP Version Not Supported`.

### Request-target form validation

Kestrel validates that the request-target form matches the HTTP method per RFC 9110:

- **Asterisk-form** (`OPTIONS * HTTP/1.1`): The single-asterisk target is only accepted for the `OPTIONS` method. Any other method using asterisk-form is rejected with `405 Method Not Allowed` (`OptionsMethodRequired`). This prevents clients from sending arbitrary methods to the server-wide `*` target.
- **Authority-form** (`CONNECT host:port HTTP/1.1`): Authority-form targets (bare `host:port`) are only accepted for the `CONNECT` method. Any other method using authority-form is rejected with `405 Method Not Allowed` (`ConnectMethodRequired`). This prevents misrouting of non-tunnel requests.
- **Absolute-form** (`GET http://example.com/path HTTP/1.1`): Accepted and decomposed into scheme, host, and path components.
- **Origin-form** (`GET /path HTTP/1.1`): The standard form for most requests.

Invalid characters in authority-form targets are also rejected to prevent injection into the host/port value.

### Header validation

Kestrel validates headers to prevent injection and encoding attacks:

- **Null bytes** (`\0`) in header names or values are rejected.
- **CR** (`\r`) in header values is rejected—a standalone CR that isn't part of a CRLF sequence causes a parse error, preventing header injection.
- **LF** (`\n`) in header values: by default, Kestrel recognizes bare LF as a line terminator, consistent with RFC 9112 Section 2.2 which says a recipient MAY treat a single LF as a line terminator. From Kestrel's perspective, the LF ends the current header line—there is no "header value containing LF." This is a robustness accommodation, not a vulnerability. However, if an upstream intermediary treats the same bytes as a single header value and forwards them verbatim, the two systems disagree about message framing. The `DisableHttp1LineFeedTerminators` AppContext switch can be set to reject bare LF as defense-in-depth against such buggy intermediaries.
- **UTF-8 encoding** is enforced with `throwOnInvalidBytes: true`, rejecting malformed UTF-8 sequences. The `RequestHeaderEncodingSelector` callback can override the encoding used for specific header names—use with caution, as non-UTF-8 encodings may bypass <example-value> assumptions in downstream middleware.
- **Header names** must contain a colon separator and can't contain spaces or tabs.
- Trailing and leading whitespace in header values is stripped per the HTTP specification.
- The `ResponseHeaderEncodingSelector` callback allows custom encoding for response header values. By default, response headers are encoded as ASCII. Misconfigured encoding selectors can introduce response header injection vulnerabilities.

### Response header validation

Kestrel validates response header names written by application code. When application code sets a response header with a non-standard name (one that isn't a well-known header), the name is checked against the HTTP token <example-value> set (RFC 9110 Section 5.6.2). Invalid characters cause an `InvalidOperationException`, preventing the application from injecting malformed headers into the response.

This is a defense against **response header injection**: if application code constructs a header name from untrusted input (e.g., user-provided data), this validation prevents control characters or delimiter characters from escaping into the response stream. Well-known headers (e.g., `Content-Type`, `Cache-Control`) bypass this check because they are pre-validated constants.

### Host header enforcement

Per RFC 9110 Section 7.2, Kestrel enforces Host header requirements:

- **HTTP/1.1 requests without a Host header are rejected** with `400 Bad Request`.
- **Multiple Host headers are rejected.** A request with more than one Host header is considered malformed.
- **Host header format is validated.** Invalid host values (e.g., containing prohibited characters) are rejected.

When the request target is in absolute-form (e.g., `GET http://example.com/path`), the `AllowHostHeaderOverride` option (default `false`) controls whether the Host header in the request target overrides the standalone Host header. Keep this `false` unless behind a trusted proxy that requires absolute-form URIs (RFC 9112 Section 3.2.2).

### Request smuggling protection (Transfer-Encoding and Content-Length)

Kestrel implements protections against HTTP request smuggling per RFC 9112 Section 6.3 and Section 11:

1. **When both Transfer-Encoding and Content-Length are present**, Transfer-Encoding takes precedence. The Content-Length header is removed, and Kestrel attempts to preserve its value as `X-Content-Length` for diagnostic purposes. **The connection is closed after the response** to prevent pipeline-based smuggling. The `AllowKeepAliveAfterCLTE` AppContext switch can restore keep-alive behavior for backwards compatibility—see AppContext Compatibility Switches.
2. **The final Transfer-Encoding must be `chunked`.** If Transfer-Encoding is present but the final coding isn't `chunked`, the request is rejected. This prevents ambiguous body-framing.
3. **HTTP/2 forbids chunked Transfer-Encoding** per RFC 9113 Section 8.1. Kestrel rejects HTTP/2 requests with chunked encoding.

The `X-Content-Length` header is best-effort diagnostic metadata, not a guaranteed Kestrel-generated copy of `Content-Length`. Kestrel uses `TryAdd` to add it only if it's absent. If the client supplies `X-Content-Length`, Kestrel preserves that value instead of replacing it with the removed `Content-Length` value.

```text
# Rejected: Transfer-Encoding is present but final coding is not chunked
Transfer-Encoding: gzip
-> 400 Bad Request

# Accepted: No client-supplied X-Content-Length; body read as chunked
Transfer-Encoding: chunked
Content-Length: 42
-> Content-Length removed, X-Content-Length: 42 added

# Accepted: Client-supplied X-Content-Length preserved; body read as chunked
Transfer-Encoding: chunked
Content-Length: 42
X-Content-Length: 7
-> Content-Length removed, X-Content-Length: 7 unchanged

# Accepted by Kestrel's HTTP/1 parser: upgrade requests can still carry a body
# and are not rejected solely because body framing headers are present.
Connection: upgrade
Transfer-Encoding: chunked
-> Request accepted; body handling is application/protocol-specific
```

### Chunked encoding validation

Kestrel validates chunked transfer encoding per RFC 9112 Section 7.1:

- Chunk format: `chunk-size [chunk-ext] CRLF chunk-data CRLF`
- Maximum chunk size length: 8 bytes (supports chunk sizes up to `0x7FFFFFFF`)
- Chunk extensions are validated: unpaired `\r` or `\n` in extensions cause rejection.
- `BadChunkSuffix`, `BadChunkSizeData`, `BadChunkExtension`, and `ChunkedRequestIncomplete` errors each produce `400 Bad Request`

An `EnableInsecureChunkedRequestParsing` AppContext switch exists in .NET 8, 9, and 10 for backwards compatibility but is disabled by default. See AppContext Compatibility Switches.

### Content-Length validation

- Negative Content-Length values are rejected.
- Multiple Content-Length headers are rejected, even when the repeated values are identical.
- Requests with `Content-Length` that don't deliver the full body before the body timeout are aborted. In practice this typically surfaces as `408 Request Timeout`, though clients may observe the connection closing.

### HTTP/1.0 behavior

Kestrel accepts HTTP/1.0 requests with these differences from HTTP/1.1:

- **Host header isn't required.** HTTP/1.0 predates the Host header requirement (RFC 9110 Section 7.2 only mandates it for HTTP/1.1).
- **POST and PUT requests require Content-Length.** Unlike HTTP/1.1 which supports chunked transfer encoding, HTTP/1.0 has no chunked encoding. If an HTTP/1.0 POST or PUT request arrives without a Content-Length header, Kestrel rejects it with `400 Bad Request` (`LengthRequiredHttp10`).
- **Connections close by default.** HTTP/1.0 doesn't have persistent connections by default. Even if the client sends `Connection: keep-alive`, Kestrel may still close the connection when the response body length isn't known in advance (since HTTP/1.0 doesn't support chunked transfer encoding, `Connection: close` is the only way to signal end-of-body for dynamic responses).

### Request body draining

On keep-alive connections, Kestrel must ensure the previous request's body is fully consumed before reading the next request. If the application doesn't read the entire request body, Kestrel automatically drains the remaining bytes. This prevents **request smuggling via unconsumed body data**—without draining, leftover bytes from one request could be interpreted as the start of the next.

Draining is subject to the `MinRequestBodyDataRate` enforcement. If the client sends the remaining body too slowly, the connection is closed rather than held open indefinitely.

### HTTP trailers

Kestrel supports HTTP trailers (headers sent after the body) in both HTTP/1.1 chunked transfer encoding and HTTP/2. Trailers are accessible via `HttpRequest.GetTrailer()`.

Security consideration: most middleware processes request headers **before** the request body is read. Trailers arrive **after** the body, so they bypass <example-value> middleware (authentication, CORS, etc.). Don't rely on trailer values for security decisions, and be aware that proxies may strip or add trailers.

## HTTP/2 security

Kestrel's HTTP/2 implementation addresses numerous CVEs and denial-of-service attack patterns.

HTTP/2's binary framing eliminates the primary class of request smuggling vulnerabilities that affect HTTP/1.1. Each request is carried on an explicit stream with length-prefixed frames, so there is no ambiguity about where one message ends and the next begins. There is no Transfer-Encoding/Content-Length conflict to exploit. However, HTTP/2 introduces its own denial-of-service attack surface through stream multiplexing, flow control, and header compression.

### Key <example-value> and mitigations

| Threat | CVE(s) | Mitigation |
|---|---|---|
| **Continuation Flood** | Widespread | Headers parsed per-frame (not batch-reparsed), preventing quadratic work. `MaxRequestHeaderCount` and `MaxRequestHeadersTotalSize` bound accumulation. |
| **Rapid Reset** | CVE-2023-44487 | Stream creation/cancellation rate is monitored. Excessive resets trigger ENHANCE_YOUR_CALM (HTTP/2 error code 11). Rate governed by `MaxEnhanceYourCalmCount` AppContext property. |
| **RST Stream Flood** | CVE-2019-9514 | Reset accumulation is bounded. Streams are drained with a 5-second timeout on request bodies. |
| **Slow Read Attack** | CVE-2019-9517 | `MinResponseDataRate` enforces minimum data consumption rate. Note: OS-level TCP buffering can reduce the effectiveness of this mitigation. |
| **Settings/Ping Flood** | CVE-2019-9512, CVE-2019-9515, CVE-2019-9518 | Outbound message queue capped by `MaxConnectionFlowControlQueueSize`. |
| **Priority Shuffling** | CVE-2019-9513 | Stream priority is **not implemented**—PRIORITY frames are silently ignored, eliminating this attack surface entirely. |
| **Stream Self-Dependency** |—| HEADERS frames with priority and PRIORITY frames that declare a stream as dependent on itself are rejected with `PROTOCOL_ERROR` per RFC 9113 Section 5.3.1. This prevents degenerate dependency trees that could confuse priority scheduling. |
| **HPACK Bomb** |—| Dynamic table size limited (`HeaderTableSize`, default 4 KB). Per-header and total header size limits enforced. |

### HTTP/2-specific limits

| Setting | Default | Valid Range | Purpose |
|---|---|---|---|
| `MaxStreamsPerConnection` | 100 | > 0 | Concurrent streams per connection. Maps to `SETTINGS_MAX_CONCURRENT_STREAMS`. |
| `HeaderTableSize` | 4,096 bytes | >= 0 | HPACK dynamic table size. Lower values reduce compression but limit HPACK bomb impact. |
| `MaxFrameSize` | 16,384 bytes | 16 KB - 16 MB | Maximum HTTP/2 frame payload size. Maps to `SETTINGS_MAX_FRAME_SIZE`. |
| `MaxRequestHeaderFieldSize` | 32,768 bytes | > 0 | Maximum size of a single compressed header field. |
| `InitialConnectionWindowSize` | 1 MB | 64 KB - 2 GB | HTTP/2 connection-level flow control window. |
| `InitialStreamWindowSize` | 768 KB | 64 KB - 2 GB | HTTP/2 per-stream flow control window. |
| `KeepAlivePingDelay` | `TimeSpan.MaxValue` (disabled) | >= 1 second | Interval between keep-alive PINGs. Enable to detect zombie connections. |
| `KeepAlivePingTimeout` | 20 seconds | >= 1 second | How long to wait for PING response before closing. |

HTTP/2 limits are configured via `KestrelServerOptions.Limits.Http2`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.Http2.MaxStreamsPerConnection = 50;
});
```

### Behavioral notes

- **No PUSH_PROMISE support.** Kestrel doesn't support server push, reducing attack surface.
- **Clear-text HTTP/2 (h2c) is supported but discouraged.** It is available for scenarios where Kestrel is behind a TLS-terminating proxy.
- **SETTINGS are processed atomically** per RFC 9113 Section 6.5.3.
- **Window size can go negative** per RFC 9113 Section 6.9.2, which Kestrel handles correctly.
- **Reserved bit in frame headers is explicitly set to 0**, preventing information disclosure from pooled memory.
