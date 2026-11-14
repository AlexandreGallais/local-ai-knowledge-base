---
title: "X509KeyUsageExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509KeyUsageExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509KeyUsageExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509KeyUsageExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Defines the usage of a key <example-value> within an X.509 certificate.  This class cannot be inherited.

#### Remarks
The `X509KeyUsageExtension` class uses the flags in the `X509KeyUsageFlags` enumeration to define or determine key usage.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509KeyUsageExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509KeyUsageExtension.X509KeyUsageExtension() constructor

```csharp
public X509KeyUsageExtension ();
```

Initializes a new instance of the `X509KeyUsageExtension` class.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509KeyUsageExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509KeyUsageExtension.X509KeyUsageExtension(AsnEncodedData, Boolean) constructor

```csharp
public X509KeyUsageExtension (System.Security.Cryptography.AsnEncodedData encodedKeyUsage, bool critical);
```

Initializes a new instance of the `X509KeyUsageExtension` class using an `AsnEncodedData` object and a value that identifies whether the extension is critical.

Parameters:

- `encodedKeyUsage`: The encoded data to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

#### Remarks
Use this constructor if the information to create the extension is already in an `AsnEncodedData` object.

## X509KeyUsageExtension.X509KeyUsageExtension(X509KeyUsageFlags, Boolean) constructor

```csharp
public X509KeyUsageExtension (System.Security.Cryptography.X509Certificates.X509KeyUsageFlags keyUsages, bool critical);
```

Initializes a new instance of the `X509KeyUsageExtension` class using the specified `X509KeyUsageFlags` value and a value that identifies whether the extension is critical.

Parameters:

- `keyUsages`: One of the `X509KeyUsageFlags` values that describes how to use the key.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509KeyUsageExtension.KeyUsages property

```csharp
public System.Security.Cryptography.X509Certificates.X509KeyUsageFlags KeyUsages { get; }
```

Gets the key usage flag associated with the certificate.

Returns: One of the `X509KeyUsageExtension.KeyUsages` values.

Exceptions:

- `CryptographicException`: The extension cannot be decoded.

#### Remarks
This property returns a value from the `X509KeyUsageExtension.KeyUsages` enumeration that indicates how to use the certificate key.

## X509KeyUsageExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Initializes a new instance of the `X509KeyUsageExtension` class using an `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The encoded data to use to create the extension.

To be added.
