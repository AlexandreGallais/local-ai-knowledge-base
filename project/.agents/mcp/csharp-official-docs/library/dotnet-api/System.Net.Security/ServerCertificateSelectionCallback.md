---
title: "ServerCertificateSelectionCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/ServerCertificateSelectionCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServerCertificateSelectionCallback delegate

Namespace: `System.Net.Security`

```csharp
public delegate System.Security.Cryptography.X509Certificates.X509Certificate ServerCertificateSelectionCallback(object sender, string? hostName);
```

Selects the server Secure Sockets Layer (SSL) certificate.

Parameters:

- `sender`: A `SslStream` object.
- `hostName`: The host name requested by the client. If the client doesn't use the host_name TLS extension, the `hostName` is an empty string.

Returns: An `X509Certificate` used for establishing an SSL connection.

#### Remarks

The server uses this delegate to select a server connection certificate.

This delegate is used by the `SslStream` class. The `SslStream` class is used to help secure information exchanged between a client and server.
