---
title: "X509SubjectKeyIdentifierExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509SubjectKeyIdentifierExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509SubjectKeyIdentifierExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509SubjectKeyIdentifierExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Defines a string that identifies a certificate's subject key <example-value> (SKI). This class cannot be inherited.

#### Remarks
There are several ways to identify a certificate: by the hash of the certificate, by the issuer and serial number, and by the subject key <example-value> (SKI). The SKI provides a unique identification for the certificate's subject and is often used when working with XML digital signing.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509SubjectKeyIdentifierExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension() constructor

```csharp
public X509SubjectKeyIdentifierExtension ();
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509SubjectKeyIdentifierExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(Byte[], Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (byte[] subjectKeyIdentifier, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using a byte array and a value that identifies whether the extension is critical.

Parameters:

- `subjectKeyIdentifier`: A byte array that represents data to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(Byte>, Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (ReadOnlySpan<byte> subjectKeyIdentifier, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using a read-only span of bytes and a value that identifies whether the extension is critical.

Parameters:

- `subjectKeyIdentifier`: A read-only span of bytes that represents data to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(AsnEncodedData, Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (System.Security.Cryptography.AsnEncodedData encodedSubjectKeyIdentifier, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using encoded data and a value that identifies whether the extension is critical.

Parameters:

- `encodedSubjectKeyIdentifier`: The `AsnEncodedData` object to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

#### Remarks
Use this constructor if the information to create the extension is already in an `AsnEncodedData` object.

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(PublicKey, Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (System.Security.Cryptography.X509Certificates.PublicKey key, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using a public key and a value indicating whether the extension is critical.

Parameters:

- `key`: A `PublicKey` object to create a subject key <example-value> (SKI) from.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(String, Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (string subjectKeyIdentifier, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using a string and a value that identifies whether the extension is critical.

Parameters:

- `subjectKeyIdentifier`: A string, encoded in hexadecimal format, that represents the subject key <example-value> (SKI) for a certificate.
- `critical`: `true` if the extension is critical; otherwise, `false`.

#### Remarks
The subject key <example-value> (SKI) can be used to identify the certificate and is often used when working with XML digital signing.

## X509SubjectKeyIdentifierExtension.X509SubjectKeyIdentifierExtension(PublicKey, X509SubjectKeyIdentifierHashAlgorithm, Boolean) constructor

```csharp
public X509SubjectKeyIdentifierExtension (System.Security.Cryptography.X509Certificates.PublicKey key, System.Security.Cryptography.X509Certificates.X509SubjectKeyIdentifierHashAlgorithm algorithm, bool critical);
```

Initializes a new instance of the `X509SubjectKeyIdentifierExtension` class using a public key, a hash algorithm identifier, and a value indicating whether the extension is critical.

Parameters:

- `key`: A `PublicKey` object to create a subject key <example-value> (SKI) from.
- `algorithm`: One of the `X509SubjectKeyIdentifierHashAlgorithm` values that identifies which hash algorithm to use.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509SubjectKeyIdentifierExtension.SubjectKeyIdentifier property

```csharp
public string? SubjectKeyIdentifier { get; }
```

Gets a string that represents the subject key <example-value> (SKI) for a certificate.

Returns: A string, encoded in hexadecimal format, that represents the subject key <example-value> (SKI).

Exceptions:

- `CryptographicException`: The extension cannot be decoded.

#### Remarks
The subject key <example-value> (SKI) can be used to identify the certificate and is often used when working with XML digital signing.

## X509SubjectKeyIdentifierExtension.SubjectKeyIdentifierBytes property

```csharp
public ReadOnlyMemory<byte> SubjectKeyIdentifierBytes { get; }
```

Gets a value whose contents represent the subject key <example-value> (SKI) for a certificate.

Returns: The subject key <example-value> (SKI) for a certificate.

To be added.

## X509SubjectKeyIdentifierExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Creates a new instance of the `X509SubjectKeyIdentifierExtension` class by copying information from encoded data.

Parameters:

- `asnEncodedData`: The `AsnEncodedData` object to use to create the extension.

To be added.
