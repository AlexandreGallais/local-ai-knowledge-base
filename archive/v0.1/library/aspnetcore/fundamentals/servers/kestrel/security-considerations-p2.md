---
title: "Security considerations for the ASP.NET Core Kestrel web server (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/security-considerations.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security considerations for the ASP.NET Core Kestrel web server (part 2 of 6)

## Transport security (TLS/HTTPS)

Kestrel supports TLS termination directly, including TLS 1.2, TLS 1.3, SNI, and mutual TLS (mTLS).

### Certificate configuration

| Configuration | Description |
|---|---|
| `ServerCertificate` | A static `X509Certificate2` for HTTPS. Must include the Server Authentication EKU (OID `1.3.6.1.5.5.7.3.1`). |
| `ServerCertificateSelector` | A callback for dynamic per-connection certificate selection, typically used for SNI (Server Name Indication) to serve different certificates for different domains. |
| `ServerCertificateChain` | The full certificate chain to present to clients for trust validation. |

Kestrel watches certificate files for changes and reloads them automatically. This can be disabled with the `Microsoft.AspNetCore.Server.Kestrel.DisableCertificateFileWatching` AppContext switch.

### TLS protocol versions

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ConfigureHttpsDefaults(https =>
    {
        https.SslProtocols = SslProtocols.Tls12 | SslProtocols.Tls13;
    });
});
```

The default value of `SslProtocols` is `SslProtocols.None`, which defers to the operating system's default. On modern systems this typically means TLS 1.2 and TLS 1.3. We recommend keeping the default as it will automatically work with the latest supported protocol on the OS. If you need to restrict versions explicitly (for example, to prohibit TLS 1.0 and 1.1 in environments with older OS defaults), set the property.

### Client certificate modes (mTLS)

The `ClientCertificateMode` enum controls mutual TLS behavior:

| Mode | Behavior |
|---|---|
| `NoCertificate` (default) | Client certificate isn't requested. |
| `AllowCertificate` | Client certificate is requested but not required. The connection succeeds without one. |
| `RequireCertificate` | Client certificate is mandatory. The TLS handshake fails without one. |
| `DelayCertificate` | Client certificate isn't requested during the initial handshake but can be requested later via renegotiation/post-handshake authentication. |

The `ClientCertificateValidation` callback allows custom validation logic beyond the default chain validation. The convenience method `AllowAnyClientCertificate()` bypasses all validation—**use only in development/testing**.

### Certificate revocation

`CheckCertificateRevocation` defaults to `false`. When set to `true`, Kestrel performs CRL/OCSP checking during the TLS handshake. Consider the performance and availability implications—if the OCSP responder is unreachable, handshakes may fail or be delayed.

### TLS handshake timeout

The `HandshakeTimeout` defaults to **10 seconds**. This limits how long a client has to complete the TLS handshake, preventing slowloris-style attacks at the TLS layer.

### Advanced TLS configuration

- **`OnAuthenticate`**: A callback providing direct access to `SslServerAuthenticationOptions` per connection for advanced scenarios (cipher suite selection, ALPN negotiation, etc.).
- **`UseTlsClientHelloListener`** (.NET 11+): A connection middleware (on `ListenOptions`) that inspects the raw TLS Client Hello bytes before the handshake begins. This enables custom logic based on the client's TLS capabilities (e.g., SNI-based routing, fingerprinting). It must be called **before** `UseHttps()` in the middleware pipeline. It has its own timeout (default 8 seconds), which is **additive** with the TLS handshake timeout—consider reducing each timeout to keep the total bounded (e.g., 5s + 5s instead of 8s + 10s).
- **`TlsClientHelloBytesCallback`** (.NET 10): A property on `HttpsConnectionAdapterOptions` and `TlsHandshakeCallbackOptions` that provides raw Client Hello inspection. In .NET 11 this property is obsolete in favor of `UseTlsClientHelloListener`.
- **`ITlsHandshakeFeature.Exception`** (.NET 11+): The `Microsoft.AspNetCore.Connections.Features.ITlsHandshakeFeature` feature exposes an `Exception` property holding the exception thrown during a **failed** TLS handshake (`null` when the handshake succeeded or hasn't completed). Connection middleware and logging can record *why* a connection failed instead of seeing only a bare `IOException` higher in the stack. Kestrel snapshots the relevant fields off the underlying `SslStream` before it's disposed, so the value is still readable after the failure. Read it from connection middleware registered with `ListenOptions.Use`:

  Register this middleware before `UseHttps` so it wraps the HTTPS middleware. Failed TLS handshakes don't reach middleware registered after `UseHttps`.

  ```csharp
  listenOptions.Use(next => async context =>
  {
      try
      {
          await next(context);
      }
      finally
      {
          var handshake = context.Features.Get<ITlsHandshakeFeature>();
          if (handshake?.Exception is { } ex)
          {
              // Log ex.GetType().Name and ex.Message to diagnose the failed handshake.
          }
      }
  });

  listenOptions.UseHttps();
  ```
