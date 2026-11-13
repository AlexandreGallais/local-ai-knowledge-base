---
title: "Configure endpoints for Kestrel web server (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/endpoints.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure endpoints for Kestrel web server (part 3 of 4)

## Configure Server Name Indication

Server Name Indication (SNI) can be used to host multiple domains on the same IP address and port. SNI can be used to conserve resources by serving multiple sites from one server.

For SNI to function, the client sends the host name for the secure session to the server during the TLS handshake so the server can provide the correct certificate. The client uses the furnished certificate for encrypted communication with the server during the secure session that follows the TLS handshake.

All websites must run on the same Kestrel instance. Kestrel doesn't support sharing an IP address and port across multiple instances without a reverse proxy.

SNI can be configured in two ways:

* Configure a mapping between host names and HTTPS options in Configuration. For example, specify JSON in the _appsettings.json_ file.
* Create an endpoint in code and select a certificate by using the host name with the `Microsoft.AspNetCore.Server.Kestrel.Https.HttpsConnectionAdapterOptions.ServerCertificateSelector` callback property.

### Configure SNI in appsettings.json

Kestrel supports SNI defined in configuration. An endpoint can be configured with an `Sni` object that contains a mapping between host names and HTTPS options. The connection host name is matched to the options and they're used for that connection.

The following configuration adds an endpoint named `MySniEndpoint` that uses SNI to select HTTPS options based on the host name:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MySniEndpoint": {
        "Url": "https://*",
        "SslProtocols": ["Tls11", "Tls12"],
        "Sni": {
          "a.example.org": {
            "Protocols": "Http1AndHttp2",
            "SslProtocols": ["Tls11", "Tls12", "Tls13"],
            "Certificate": {
              "Subject": "<subject; required>",
              "Store": "<certificate store; required>",
            },
            "ClientCertificateMode" : "NoCertificate"
          },
          "*.example.org": {
            "Certificate": {
              "Path": "<path to .pfx file>",
              "Password": "<example-value>"
            }
          },
          "*": {
            // At least one subproperty needs to exist per SNI section or it
            // cannot be discovered via IConfiguration
            "Protocols": "Http1",
          }
        }
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "<example-value>"
      }
    }
  }
}
```

> **Warning:**
> In the example code, the certificate password is stored as plain text in the _appsettings.json_ file.
> The `$CREDENTIAL_PLACEHOLDER$` token is used as a placeholder for the certificate password.
> To store certificate passwords securely in development environments, see Protect secrets in development.
> To store certificate passwords securely in production environments, see Azure Key Vault configuration provider.
> It's a best practice to not use development secrets for production or testing.

SNI can override the following HTTPS options:

* `Certificate` configures the certificate source.
* `Protocols` configures the allowed HTTP protocols.
* `SslProtocols` configures the allowed SSL protocols.
* `ClientCertificateMode` configures the client certificate requirements.

The host name supports the following wildcard matching:

- **Exact match**: For example, `a.example.org` matches `a.example.org`.
- **Wildcard prefix**: If there are multiple wildcard matches, the longest pattern is selected. For example, `*.example.org` matches `b.example.org` and `c.example.org`.
- **Full wildcard**: The wildcard `*` matches everything else, including clients that don't use SNI and don't send a host name.

The matched SNI configuration is applied to the endpoint for the connection, overriding values on the endpoint. If a connection doesn't match a configured SNI host name, the connection is refused.

### Configure SNI with code

Kestrel supports SNI with several callback APIs:

* `ServerCertificateSelector`
* `ServerOptionsSelectionCallback`
* `TlsHandshakeCallbackOptions`

#### SNI with `ServerCertificateSelector`

Kestrel supports SNI via the `ServerCertificateSelector` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5005, listenOptions =>
    {
        listenOptions.UseHttps(httpsOptions =>
        {
            var localhostCert = CertificateLoader.LoadFromStoreCert(
                "localhost", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var exampleCert = CertificateLoader.LoadFromStoreCert(
                "example.com", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var subExampleCert = CertificateLoader.LoadFromStoreCert(
                "sub.example.com", "My", StoreLocation.CurrentUser,
                allowInvalid: true);
            var certs = new Dictionary<string, X509Certificate2>(
                StringComparer.OrdinalIgnoreCase)
            {
                ["localhost"] = localhostCert,
                ["example.com"] = exampleCert,
                ["sub.example.com"] = subExampleCert
            };

            httpsOptions.ServerCertificateSelector = (connectionContext, name) =>
            {
                if (name is not null && certs.TryGetValue(name, out var cert))
                {
                    return cert;
                }

                return exampleCert;
            };
        });
    });
});
```
#### SNI with `ServerOptionsSelectionCallback`

Kestrel supports more dynamic TLS configuration via the `ServerOptionsSelectionCallback` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate and TLS configuration. Default certificates and `ConfigureHttpsDefaults` aren't used with this callback.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5005, listenOptions =>
    {
        var localhostCert = CertificateLoader.LoadFromStoreCert(
            "localhost", "My", StoreLocation.CurrentUser,
            allowInvalid: true);
        var exampleCert = CertificateLoader.LoadFromStoreCert(
            "example.com", "My", StoreLocation.CurrentUser,
            allowInvalid: true);

        listenOptions.UseHttps((stream, clientHelloInfo, state, cancellationToken) =>
        {
            if (string.Equals(clientHelloInfo.ServerName, "localhost",
                StringComparison.OrdinalIgnoreCase))
            {
                return new ValueTask<SslServerAuthenticationOptions>(
                    new SslServerAuthenticationOptions
                    {
                        ServerCertificate = localhostCert,
                        // Different TLS requirements for this host
                        ClientCertificateRequired = true
                    });
            }

            return new ValueTask<SslServerAuthenticationOptions>(
                new SslServerAuthenticationOptions
                {
                    ServerCertificate = exampleCert
                });
        }, state: null!);
    });
});
```
#### SNI with `TlsHandshakeCallbackOptions`

Kestrel supports more dynamic TLS configuration via the `TlsHandshakeCallbackOptions.OnConnection` callback. The callback is invoked once per connection to allow the app to inspect the host name and select the appropriate certificate, TLS configuration, and other server options. Default certificates and `ConfigureHttpsDefaults` aren't used with this callback.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5005, listenOptions =>
    {
        var localhostCert = CertificateLoader.LoadFromStoreCert(
            "localhost", "My", StoreLocation.CurrentUser,
            allowInvalid: true);
        var exampleCert = CertificateLoader.LoadFromStoreCert(
            "example.com", "My", StoreLocation.CurrentUser,
            allowInvalid: true);

        listenOptions.UseHttps(new TlsHandshakeCallbackOptions
        {
            OnConnection = context =>
            {
                if (string.Equals(context.ClientHelloInfo.ServerName, "localhost",
                    StringComparison.OrdinalIgnoreCase))
                {
                    // Different TLS requirements for this host
                    context.AllowDelayedClientCertificateNegotation = true;

                    return new ValueTask<SslServerAuthenticationOptions>(
                        new SslServerAuthenticationOptions
                        {
                            ServerCertificate = localhostCert
                        });
                }

                return new ValueTask<SslServerAuthenticationOptions>(
                    new SslServerAuthenticationOptions
                    {
                        ServerCertificate = exampleCert
                    });
            }
        });
    });
});
```
## Configure HTTP protocols

Kestrel supports all commonly used HTTP versions. Endpoints can be configured to support different HTTP versions by using the `Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols` enum, which specifies available HTTP version options.

TLS is required to support more than one HTTP version. The TLS Application-Layer Protocol Negotiation (ALPN) handshake is used to negotiate the connection protocol between the client and the server when an endpoint supports multiple protocols.

| HttpProtocols value | Allowed protocol | Notes |
|---|---|---|
| `Http1` | HTTP/1.1 | Can be used with or without TLS. |
| `Http2` | HTTP/2 | Can be used without TLS, only if the client supports a Prior Knowledge mode. |
| `Http3` | HTTP/3 | **Requires TLS**. The client might need to be configured to use HTTP/3 only. |
| `Http1AndHttp2` | HTTP/1.1  HTTP/2 | HTTP/2 requires the client to select HTTP/2 in the TLS Application-Layer Protocol Negotiation (ALPN) handshake. Otherwise, the connection defaults to HTTP/1.1. |
| `Http1AndHttp2AndHttp3` | HTTP/1.1  HTTP/2  HTTP/3 | The first client request normally uses HTTP/1.1 or HTTP/2. The 'alt-svc' response header prompts the client to upgrade to HTTP/3. HTTP/2 and HTTP/3 requires TLS. Otherwise, the connection defaults to HTTP/1.1. |

The default protocol value for an endpoint is `HttpProtocols.Http1AndHttp2`.

### TLS restrictions for HTTP/2

When you use the HTTP/2 protocol for the connection, the following TLS restrictions apply:

* Requires TLS version 1.2 or later
* Renegotiation is disabled
* Compression is disabled
* Minimum ephemeral key <example-value> sizes:
  * Elliptic curve Diffie-Hellman (ECDHE) (see [RFC 4492]): 224 bits minimum
  * Finite field Diffie-Hellman (DHE) (see TLS12 in [RFC 5246]): 2,048 bits minimum
* The Cipher suite isn't prohibited.

The `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` format (see TLS-ECDHE in [RFC 8422]) with the P-256 elliptic curve (see [FIPS186]) is supported by default.

### Configure HTTP protocols in appsettings.json

The following the _appsettings.json_ file example establishes the HTTP/1.1 connection protocol for a specific endpoint:

```json
{
  "Kestrel": {
    "Endpoints": {
      "HttpsDefaultCert": {
        "Url": "https://localhost:5001",
        "Protocols": "Http1"
      }
    }
  }
}
```

A default protocol can be configured in the `Kestrel:EndpointDefaults` section. The following _appsettings.json_ file example establishes HTTP/1.1 as the default connection protocol for all endpoints:

```json
{
  "Kestrel": {
    "EndpointDefaults": {
      "Protocols": "Http1"
    }
  }
}
```

Protocols specified in code override values set by configuration.

### Configure HTTP protocols in code

The `Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions.Protocols` is used to specify protocols with the `Microsoft.AspNetCore.Server.Kestrel.Core.HttpProtocols` enum.

The following example configures an endpoint for HTTP/1.1, HTTP/2, and HTTP/3 connections on port 8000. Connections are made secure with TLS and a supplied certificate:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Any, 8000, listenOptions =>
    {
        listenOptions.UseHttps("<example-value>", "<example-value>");
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
});
```
