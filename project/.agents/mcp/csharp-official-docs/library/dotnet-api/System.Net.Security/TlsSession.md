---
title: "TlsSession class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/TlsSession.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TlsSession class

Namespace: `System.Net.Security`

```csharp
public abstract class TlsSession : IDisposable
```

To be added.

To be added.

## TlsSession.ClientHelloInfo property

```csharp
public System.Net.Security.SslClientHelloInfo? ClientHelloInfo { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.HasPendingOutput property

```csharp
public bool HasPendingOutput { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.IsHandshakeComplete property

```csharp
public bool IsHandshakeComplete { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.LocalCertificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2? LocalCertificate { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.NegotiatedApplicationProtocol property

```csharp
public System.Net.Security.SslApplicationProtocol NegotiatedApplicationProtocol { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.NegotiatedCipherSuite property

```csharp
public System.Net.Security.TlsCipherSuite NegotiatedCipherSuite { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.NegotiatedProtocol property

```csharp
public System.Security.Authentication.SslProtocols NegotiatedProtocol { get; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.TargetHostName property

```csharp
public string? TargetHostName { get; set; }
```

To be added.

Returns: To be added.

To be added.

## TlsSession.AcceptWithDefaultValidation() method

```csharp
public System.Net.Security.SslPolicyErrors AcceptWithDefaultValidation ();
```

To be added.

Returns: To be added.

To be added.

## TlsSession.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## TlsSession.GetAcceptableIssuers() method

```csharp
public System.Collections.Generic.IReadOnlyList<string>? GetAcceptableIssuers ();
```

To be added.

Returns: To be added.

To be added.

## TlsSession.GetChannelBinding(ChannelBindingKind) method

```csharp
public System.Security.Authentication.ExtendedProtection.ChannelBinding? GetChannelBinding (System.Security.Authentication.ExtendedProtection.ChannelBindingKind kind);
```

To be added.

Parameters:

- `kind`: To be added.

Returns: To be added.

To be added.

## TlsSession.GetClientHelloLength() method

```csharp
public int GetClientHelloLength ();
```

To be added.

Returns: To be added.

To be added.

## TlsSession.GetRemoteCertificate() method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2? GetRemoteCertificate ();
```

To be added.

Returns: To be added.

To be added.

## TlsSession.GetRemoteCertificates() method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2Collection? GetRemoteCertificates ();
```

To be added.

Returns: To be added.

To be added.

## TlsSession.SetClientCertificateContext(SslStreamCertificateContext) method

```csharp
public void SetClientCertificateContext (System.Net.Security.SslStreamCertificateContext? context);
```

To be added.

Parameters:

- `context`: To be added.

To be added.

## TlsSession.SetContext(TlsContext) method

```csharp
public void SetContext (System.Net.Security.TlsContext context);
```

To be added.

Parameters:

- `context`: To be added.

To be added.

## TlsSession.SetRemoteCertificateValidationResult(SslPolicyErrors) method

```csharp
public void SetRemoteCertificateValidationResult (System.Net.Security.SslPolicyErrors errors);
```

To be added.

Parameters:

- `errors`: To be added.

To be added.

## TlsSession.TryGetClientHelloBytes(Byte>, Int32) method

```csharp
public bool TryGetClientHelloBytes (Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
