---
title: "Configure endpoints for Kestrel web server (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/endpoints.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure endpoints for Kestrel web server (part 2 of 4)

## Configure HTTPS

Kestrel supports securing endpoints with HTTPS. Data sent over HTTPS is encrypted by using Transport Layer Security (TLS) to increase the security of data transferred between the client and server.

HTTPS requires a TLS certificate. The TLS certificate is stored on the server, and Kestrel is configured to use it. An app can use the ASP.NET Core HTTPS development certificate in a local development environment. The development certificate isn't installed in nondevelopment environments. In production, a TLS certificate must be explicitly configured. At a minimum, a default certificate must be provided.

How HTTPS and the TLS certificate is configured depends on how endpoints are configured. If URL prefixes or only specified ports are used to define endpoints, HTTPS can be used only if a default certificate is provided in HTTPS endpoint configuration. A default certificate can be configured with the following options:

* Configure HTTPS in appsettings.json
* Configure HTTPS in code

### Configure HTTPS in appsettings.json

A default HTTPS app settings configuration schema is available for Kestrel. Configure multiple endpoints, including the URLs and the certificates to use, either from a file on disk or from a certificate store.

Any HTTPS endpoint that doesn't specify a certificate (`HttpsDefaultCert` in the following example code) falls back to the certificate defined under `Certificates:Default` or the development certificate.

The following example is for the _appsettings.json_ file, but any configuration source can be used:

```json
{
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "HttpsInlineCertFile": {
        "Url": "https://localhost:5001",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertAndKeyFile": {
        "Url": "https://localhost:5002",
        "Certificate": {
          "Path": "<path to .pem/.crt file>",
          "KeyPath": "<path to .key file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
      },
      "HttpsInlineCertStore": {
        "Url": "https://localhost:5003",
        "Certificate": {
          "Subject": "<subject; required>",
          "Store": "<certificate store; required>",
          "Location": "<location; defaults to CurrentUser>",
          "AllowInvalid": "<true or false; defaults to false>"
        }
      },
      "HttpsDefaultCert": {
        "Url": "https://localhost:5004"
      }
    },
    "Certificates": {
      "Default": {
        "Path": "<path to .pfx file>",
        "Password": "$CREDENTIAL_PLACEHOLDER$"
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

#### Schema notes

* Endpoint names are case-insensitive. For example, `HTTPS` and `Https` are equivalent.
* The `Url` parameter is required for each endpoint. The format for this parameter is the same as the top-level `Urls` configuration parameter, but it can have only a single value. For more information, see the URL formats section in this article.
* These endpoints replace the values defined in the top-level `Urls` configuration rather than adding to them. Endpoints defined in code with the `Listen` API are cumulative with the endpoints defined in the configuration section.
* The `Certificate` section is optional. If the `Certificate` section isn't specified, the defaults defined in `Certificates:Default` are used. If no defaults are available, the development certificate is used. If there are no defaults and the development certificate isn't present, the server throws an exception and fails to start.
* The `Certificate` section supports multiple certificate sources.
* Any number of endpoints can be defined in `Configuration`, as long as they don't cause port conflicts.

#### Certificate sources

Certificate nodes can be configured to load certificates from various sources:

* `Path` and `Password`: Load _.pfx_ files.
* `Path`, `KeyPath`, and `Password`: Load _.pem_/_.crt_ and _.key_ files.
* `Subject` and `Store`: Load from the certificate store.

For example, the `Certificates:Default` certificate can be specified from a certificate store with the following JSON:

```json
"Default": {
  "Subject": "contoso.com",
  "Store": "My",
  "Location": "LocalMachine",
  "AllowInvalid": false
}
```

The certificate store configuration options include:

* `Subject`: The certificate subject name to search for. For example, use `contoso.com` for a certificate whose subject is `CN=contoso.com` without the `CN=` prefix.
* `Store`: The certificate store name to search. Common Windows store names include `My` (Personal), `Root` (Trusted Root Certification Authorities), or `CA` (Intermediate Certification Authorities). Custom store names are also supported.
* `Location`: The certificate store location. Supported values correspond to `System.Security.Cryptography.X509Certificates.StoreLocation`: `CurrentUser` (the default if omitted) or `LocalMachine`.
* `AllowInvalid`: A boolean flag (`true` or `false`, defaults to `false`). Setting this to `true` allows self-signed or untrusted certificates to be loaded (useful for development or testing).

#### Configure client certificates in appsettings.json

The ClientCertificateMode is used to configure client certificate behavior.

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "ClientCertificateMode": "AllowCertificate",
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
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

The default value is `ClientCertificateMode.NoCertificate`, where Kestrel doesn't request or require a certificate from the client.

For more information, see Configure certificate authentication in ASP.NET Core.

#### Configure SSL/TLS protocols in appsettings.json

SSL Protocols are protocols used for encrypting and decrypting traffic between two peers, which traditionally are a client and a server.

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpsEndpoint": {
        "Url": "https://localhost:5001",
        "SslProtocols": ["Tls12", "Tls13"],
        "Certificate": {
          "Path": "<path to .pfx file>",
          "Password": "$CREDENTIAL_PLACEHOLDER$"
        }
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

The default value, `SslProtocols.None`, causes Kestrel to use the operating system defaults to choose the best protocol. Unless you have a specific reason to select a protocol, use the default.

### Configure HTTPS in code

When you use the `Listen` API, the `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps*` extension method on `Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions` is available to configure HTTPS.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Loopback, 5000);
    serverOptions.Listen(IPAddress.Loopback, 5001, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");
    });
});
```
The `ListenOptions.UseHttps` parameters include:

* `filename`: The path and file name of a certificate file, relative to the directory that contains the app's content files.
* `password`: The password required to access the X.509 certificate data.
* `configureOptions`: An `Action` to configure the `HttpsConnectionAdapterOptions`. Returns the `ListenOptions`.
* `storeName`: The certificate store from which to load the certificate.
* `subject`: The subject name for the certificate.
* `allowInvalid`: Indicates whether to consider invalid certificates, such as self-signed certificates.
* `location`: The store location to load the certificate from.
* `serverCertificate`: The X.509 certificate.

For a complete list of `UseHttps` overloads, see `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps*`.

#### Configure client certificates in code

The `Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode` configures the client certificate requirements.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.ClientCertificateMode = ClientCertificateMode.AllowCertificate;
    });
});
```
The default value is `Microsoft.AspNetCore.Server.Kestrel.Https.ClientCertificateMode.NoCertificate` (0), where Kestrel doesn't request or require a certificate from the client.

For more information, see Configure certificate authentication in ASP.NET Core.

#### Configure HTTPS defaults in code

The ConfigureHttpsDefaults(Action\<HttpsConnectionAdapterOptions>)) specifies a configuration `Action` to run for each HTTPS endpoint. Multiple calls to `ConfigureHttpsDefaults` replace prior `Action` instances with the last `Action` specified.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        // ...
    });
});
```
> **Note:**
> Endpoints created by calling the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen*` **before** calling the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureHttpsDefaults*` don't have the defaults applied.

#### Configure SSL/TLS protocols in code

SSL protocols are protocols used for encrypting and decrypting traffic between two peers, which traditionally are a client and a server.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.SslProtocols = SslProtocols.Tls13;
    });
});
```
#### Configure TLS cipher suites filter in code

On Linux, a `System.Net.Security.CipherSuitesPolicy` object can be used to filter TLS handshakes on a per-connection basis:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.ConfigureHttpsDefaults(listenOptions =>
    {
        listenOptions.OnAuthenticate = (context, sslOptions) =>
        {
            sslOptions.CipherSuitesPolicy = new CipherSuitesPolicy(
                new[]
                {
                    TlsCipherSuite.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
                    TlsCipherSuite.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
                    // ...
                });
        };
    });
});
```
