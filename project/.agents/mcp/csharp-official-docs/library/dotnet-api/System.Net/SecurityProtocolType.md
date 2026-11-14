---
title: "SecurityProtocolType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/SecurityProtocolType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SecurityProtocolType enum

Namespace: `System.Net`

```csharp
public enum SecurityProtocolType
```

Specifies the security protocols that are supported by the Schannel security package.

#### Remarks
This enumeration defines the set of values that you can use to specify which transport security protocol to use. It is the enumerated type for the `SecurityProtocol` property. Use this enumeration to determine your transport security protocol policy when you're using HTTP APIs such as `WebClient`, `HttpWebRequest`, `HttpClient`, and `SmtpClient` (when using TLS/SSL).

The Transport Layer Security (TLS) protocols assume that a connection-oriented protocol, typically TCP, is in use.

## SecurityProtocolType.Ssl3 field

```csharp
Ssl3
```

Specifies the Secure Socket Layer (SSL) 3.0 security protocol. SSL 3.0 has been superseded by the Transport Layer Security (TLS) protocol and is provided for backward compatibility only.

To be added.

## SecurityProtocolType.SystemDefault field

```csharp
SystemDefault
```

Allows the operating system to choose the best protocol to use, and to block protocols that are not secure. Unless your app has a specific reason not to, you should use this value.

## SecurityProtocolType.Tls field

```csharp
Tls
```

Specifies the Transport Layer Security (TLS) 1.0 security protocol. The TLS 1.0 protocol is defined in IETF RFC 2246.

To be added.

## SecurityProtocolType.Tls11 field

```csharp
Tls11
```

Specifies the Transport Layer Security (TLS) 1.1 security protocol. The TLS 1.1 protocol is defined in IETF RFC 4346. On Windows systems, this value is supported starting with Windows 7.

To be added.

## SecurityProtocolType.Tls12 field

```csharp
Tls12
```

Specifies the Transport Layer Security (TLS) 1.2 security protocol. The TLS 1.2 protocol is defined in IETF RFC 5246. On Windows systems, this value is supported starting with Windows 7.

To be added.

## SecurityProtocolType.Tls13 field

```csharp
Tls13
```

Specifies the TLS 1.3 security protocol. The TLS protocol is defined in IETF RFC 8446.
