---
title: "X509ChainStatus struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainStatus struct

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public struct X509ChainStatus
```

Provides a simple structure for storing X509 chain status and error information.

#### Remarks
This structure is used in conjunction with the `ChainStatus` property.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainStatus.Status property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainStatusFlags Status { get; set; }
```

Specifies the status of the X509 chain.

Returns: An `X509ChainStatusFlags` value.

#### Remarks
The flag can be used to determine the details of a chain error.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509ChainStatus.StatusInformation property

```csharp
public string StatusInformation { get; set; }
```

Specifies a description of the `X509Chain.ChainStatus` value.

Returns: A localizable string.

#### Remarks
This property is a localized string that provides a description of the `X509Chain.ChainStatus` enumeration.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._
