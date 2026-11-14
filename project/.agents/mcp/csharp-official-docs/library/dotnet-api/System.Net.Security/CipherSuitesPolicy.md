---
title: "CipherSuitesPolicy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/CipherSuitesPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CipherSuitesPolicy class

Namespace: `System.Net.Security`

```csharp
public sealed class CipherSuitesPolicy
```

Specifies allowed cipher suites.

To be added.

## CipherSuitesPolicy.CipherSuitesPolicy(TlsCipherSuite>) constructor

```csharp
public CipherSuitesPolicy (System.Collections.Generic.IEnumerable<System.Net.Security.TlsCipherSuite> allowedCipherSuites);
```

Initializes a new instance of the `CipherSuitesPolicy` class that can be used for client or server authentication.

Parameters:

- `allowedCipherSuites`: The collection of cipher suites allowed in this policy for negotiation.

Exceptions:

- `PlatformNotSupportedException`: Platform is not a Linux system with OpenSSL 1.1.1 or higher or a macOS.

> **Note:**
> Defining a cipher suite policy on `SslStream` authentication will prevent the OS from deciding which are the best cipher suites to negotiate with and requires that you manually check and update this code. We strongly recommend that you avoid using this feature and rely on your constantly updated OS policy.

#### Remarks

Unlike the operating system's underlying SSL/TLS implementation, the order of the `TlsCipherSuite` elements in `allowedCipherSuites` doesn't guarantee their priority in client-server negotiation. You can only initialize an instance of this class if you're using Linux systems with OpenSSL 1.1.1 or higher or macOS.

## CipherSuitesPolicy.AllowedCipherSuites property

```csharp
public System.Collections.Generic.IEnumerable<System.Net.Security.TlsCipherSuite> AllowedCipherSuites { get; }
```

Gets a subset of valid cipher suites passed into `CipherSuitesPolicy.#ctor` constructor as a collection of cipher suites allowed in this policy for negotiation.

Returns: The collection of cipher suites allowed in this policy for negotiation.

> **Note:**
> Defining a cipher suite policy on `SslStream` authentication will prevent the OS from deciding which are the best cipher suites to negotiate with and requires that you manually check and update this code. We strongly recommend that you avoid using this feature and rely on your constantly updated OS policy.

#### Remarks
Unlike the operating system's underlying SSL/TLS implementation, the order of the `TlsCipherSuite` elements in `allowedCipherSuites` doesn't guarantee their priority in client-server negotiation. You can only initialize an instance of this class if you're using Linux systems with OpenSSL 1.1.1 or higher or macOS.
