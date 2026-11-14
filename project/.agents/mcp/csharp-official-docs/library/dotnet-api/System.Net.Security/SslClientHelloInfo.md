---
title: "SslClientHelloInfo struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslClientHelloInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslClientHelloInfo struct

Namespace: `System.Net.Security`

```csharp
public readonly struct SslClientHelloInfo
```

This struct contains information from received TLS Client Hello frame.

To be added.

## SslClientHelloInfo.SslClientHelloInfo(String, SslProtocols) constructor

```csharp
public SslClientHelloInfo (string serverName, System.Security.Authentication.SslProtocols sslProtocols);
```

Initializes a new instance of the `SslClientHelloInfo`.

Parameters:

- `serverName`: Host server value specified by the client.
- `sslProtocols`: TLS/SSL protocols offered by the client.

To be added.

## SslClientHelloInfo.ServerName property

```csharp
public string ServerName { get; }
```

Gets the host server specified by the client.

Returns: To be added.

#### Remarks
The host server name requires Server Name extension (SNI). If the SNI extension is not present, this property returns an empty string.

## SslClientHelloInfo.SslProtocols property

```csharp
public System.Security.Authentication.SslProtocols SslProtocols { get; }
```

Gets the TLS/SSL protocols offered by client.

Returns: A bitwise combination of the enumeration values that specify the TLS or SSL protocols.

This value is based on information provided by the client in the TLS ClientHello message. It doesn't represent the protocol negotiated for the connection. Don't use this value to make security-related decisions.
