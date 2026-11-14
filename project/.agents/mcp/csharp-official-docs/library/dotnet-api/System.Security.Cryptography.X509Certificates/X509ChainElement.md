---
title: "X509ChainElement class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainElement class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509ChainElement
```

Represents an element of an X.509 chain.

#### Remarks
This object is constructed internally and is returned as part of an `X509ChainElementCollection` when calling the `ChainElements` property.

## X509ChainElement.Certificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Certificate { get; }
```

Gets the X.509 certificate at a particular chain element.

Returns: An `X509Certificate2` object.

#### Remarks
This property returns an X.509 certificate for this element.

#### Examples
The following code example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainElement.ChainElementStatus property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainStatus[] ChainElementStatus { get; }
```

Gets the error status of the current X.509 certificate in a chain.

Returns: An array of `X509ChainStatus` objects.

#### Remarks
This property returns an array of `X509ChainStatus` objects, each consisting of an error code bit and a descriptive localized error message.

## X509ChainElement.Information property

```csharp
public string Information { get; }
```

Gets additional error information from an unmanaged certificate chain structure.

Returns: A string representing the `pwszExtendedErrorInfo` member of the unmanaged `CERT_CHAIN_ELEMENT` structure in the Crypto API.

#### Examples

The following code example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._
