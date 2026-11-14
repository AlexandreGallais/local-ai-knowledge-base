---
title: "X509Extension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Extension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Extension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public class X509Extension : System.Security.Cryptography.AsnEncodedData
```

Represents an X509 extension.

#### Remarks
X509 extensions are dynamic, extended properties that can be added to an X509 certificate and changed. The `X509Extension` class can be used to create extensions that are associated with a certificate but are not part of a certificate as issued by a certification authority (CA).

In its most basic form, an X509 extension has an object identifier (OID), a Boolean value describing whether the extension is considered critical or not, and ASN-encoded data. Custom extensions can be registered in a `CryptoConfig` file.

.NET includes implementations of several common X509 extensions:

- `X509KeyUsageExtension`. Describes the key <example-value> of a certificate.
- `X509BasicConstraintsExtension`. Describes the constraints for a certificate.
- `X509EnhancedKeyUsageExtension`. Describes the enhanced key <example-value> of a certificate.
- `X509SubjectKeyIdentifierExtension`. Describes the key identifier. For example, used with XMLDSIG.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.X509Extension() constructor

```csharp
protected X509Extension ();
```

Initializes a new instance of the `X509Extension` class.

#### Remarks
This constructor creates an empty `X509Extension` object, unlike the other constructors for this class that use certificate information from either a byte array, a pointer or a certificate file to create the object.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.X509Extension(AsnEncodedData, Boolean) constructor

```csharp
public X509Extension (System.Security.Cryptography.AsnEncodedData encodedExtension, bool critical);
```

Initializes a new instance of the `X509Extension` class.

Parameters:

- `encodedExtension`: The encoded data to be used to create the extension.
- `critical`: `true` if the extension is critical; otherwise `false`.

#### Remarks
Use this constructor if the information to create the extension is already in an `AsnEncodedData` object.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.X509Extension(Oid, Byte[], Boolean) constructor

```csharp
public X509Extension (System.Security.Cryptography.Oid oid, byte[] rawData, bool critical);
```

Initializes a new instance of the `X509Extension` class.

Parameters:

- `oid`: The object identifier used to identify the extension.
- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `oid` is `null`.
- `ArgumentException`: `oid` is an empty string ("").

#### Remarks
This constructor uses information from the `oid` parameter to provide an object identifier for the extension.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.X509Extension(Oid, Byte>, Boolean) constructor

```csharp
public X509Extension (System.Security.Cryptography.Oid oid, ReadOnlySpan<byte> rawData, bool critical);
```

Initializes a new instance of the `X509Extension` class.

Parameters:

- `oid`: The object identifier used to identify the extension.
- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509Extension.X509Extension(String, Byte[], Boolean) constructor

```csharp
public X509Extension (string oid, byte[] rawData, bool critical);
```

Initializes a new instance of the `X509Extension` class.

Parameters:

- `oid`: A string representing the object identifier.
- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise `false`.

#### Remarks
This constructor uses information from the `oid` parameter to provide an object identifier for the extension.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.X509Extension(String, Byte>, Boolean) constructor

```csharp
public X509Extension (string oid, ReadOnlySpan<byte> rawData, bool critical);
```

Initializes a new instance of the `X509Extension` class.

Parameters:

- `oid`: The object identifier used to identify the extension.
- `rawData`: The encoded data used to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509Extension.Critical property

```csharp
public bool Critical { get; set; }
```

Gets a Boolean value indicating whether the extension is critical.

Returns: `true` if the extension is critical; otherwise, `false`.

#### Remarks
Use this property to designate whether an extension is critical.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509Extension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Copies the extension properties of the specified `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` to be copied.

Exceptions:

- `ArgumentNullException`: `asnEncodedData` is `null`.
- `ArgumentException`: `asnEncodedData` does not have a valid X.509 extension.

#### Remarks
Use this method to copy the extension properties of the specified `X509Extension` and add them to the instance of the `X509Extension` class from which this method is called.

#### Examples
The following code example demonstrates using the `X509Extension` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._
