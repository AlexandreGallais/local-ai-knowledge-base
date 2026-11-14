---
title: "X509BasicConstraintsExtension class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509BasicConstraintsExtension class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class X509BasicConstraintsExtension : System.Security.Cryptography.X509Certificates.X509Extension
```

Defines the constraints set on a certificate. This class cannot be inherited.

#### Remarks
This class provides properties that define the basic <example-value> set on a certificate.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509BasicConstraintsExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509BasicConstraintsExtension.X509BasicConstraintsExtension() constructor

```csharp
public X509BasicConstraintsExtension ();
```

Initializes a new instance of the `X509BasicConstraintsExtension` class.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509BasicConstraintsExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509BasicConstraintsExtension.X509BasicConstraintsExtension(AsnEncodedData, Boolean) constructor

```csharp
public X509BasicConstraintsExtension (System.Security.Cryptography.AsnEncodedData encodedBasicConstraints, bool critical);
```

Initializes a new instance of the `X509BasicConstraintsExtension` class using an `AsnEncodedData` object and a value that identifies whether the extension is critical.

Parameters:

- `encodedBasicConstraints`: The encoded data to use to create the extension.
- `critical`: `true` if the extension is critical; otherwise, `false`.

#### Remarks
Use this constructor if the information to create an extension is already in an `AsnEncodedData` object.

## X509BasicConstraintsExtension.X509BasicConstraintsExtension(Boolean, Boolean, Int32, Boolean) constructor

```csharp
public X509BasicConstraintsExtension (bool certificateAuthority, bool hasPathLengthConstraint, int pathLengthConstraint, bool critical);
```

Initializes a new instance of the `X509BasicConstraintsExtension` class. Parameters specify a value that indicates whether a certificate is a certificate authority (CA) certificate, a value that indicates whether the certificate has a restriction on the number of path levels it allows, the number of levels allowed in a certificate's path, and a value that indicates whether the extension is critical.

Parameters:

- `certificateAuthority`: `true` if the certificate is a certificate authority (CA) certificate; otherwise, `false`.
- `hasPathLengthConstraint`: `true` if the certificate has a restriction on the number of path levels it allows; otherwise, `false`.
- `pathLengthConstraint`: The number of levels allowed in a certificate's path.
- `critical`: `true` if the extension is critical; otherwise, `false`.

To be added.

## X509BasicConstraintsExtension.CertificateAuthority property

```csharp
public bool CertificateAuthority { get; }
```

Gets a value indicating whether a certificate is a certificate authority (CA) certificate.

Returns: `true` if the certificate is a certificate authority (CA) certificate, otherwise, `false`.

#### Remarks
Use this property to determine if the certificate is a certificate authority (CA) certificate.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509BasicConstraintsExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509BasicConstraintsExtension.HasPathLengthConstraint property

```csharp
public bool HasPathLengthConstraint { get; }
```

Gets a value indicating whether a certificate has a restriction on the number of path levels it allows.

Returns: `true` if the certificate has a restriction on the number of path levels it allows, otherwise, `false`.

Exceptions:

- `CryptographicException`: The extension cannot be decoded.

#### Remarks
A certificate issuer can restrict the number of levels in a certificate path. This property indicates whether the certificate has this restriction. If this value is `true`, you can use the `PathLengthConstraint` property to determine the number of levels allowed.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509BasicConstraintsExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509BasicConstraintsExtension.PathLengthConstraint property

```csharp
public int PathLengthConstraint { get; }
```

Gets the number of levels allowed in a certificate's path.

Returns: An integer indicating the number of levels allowed in a certificate's path.

Exceptions:

- `CryptographicException`: The extension cannot be decoded.

#### Remarks
If a certificate has a constraint on the number of path levels it allows, this property indicates how many levels are allowed.

#### Examples
The following code example demonstrates how to open a user's personal certificate store and display information about each certificate in the store.  This example uses the `X509BasicConstraintsExtension` class to display the information.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509BasicConstraintsExtension/Overview/sample.cs._

## X509BasicConstraintsExtension.CopyFrom(AsnEncodedData) method

```csharp
public override void CopyFrom (System.Security.Cryptography.AsnEncodedData asnEncodedData);
```

Initializes a new instance of the `X509BasicConstraintsExtension` class using an `AsnEncodedData` object.

Parameters:

- `asnEncodedData`: The encoded data to use to create the extension.

#### Remarks
Use this constructor if the information to create an extension is already in an `AsnEncodedData` object.

## X509BasicConstraintsExtension.CreateForCertificateAuthority(Int32>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension CreateForCertificateAuthority (int? pathLengthConstraint = default);
```

Creates an instance of `X509BasicConstraintsExtension` appropriate for a certificate authority, optionally including a path length constraint value.

Parameters:

- `pathLengthConstraint`: The longest valid length of a certificate chain between the certificate containing this extension and an end-entity certificate.
The default is `null`, an unconstrained length.

Returns: The configured basic <example-value> extension.

Exceptions:

- `ArgumentOutOfRangeException`: `pathLengthConstraint` is a non-`null` value less than zero.

Following the guidance from IETF RFC 3280, the extension returned from this method will have the `X509Extension.Critical` property set to `true`.

## X509BasicConstraintsExtension.CreateForEndEntity(Boolean) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509BasicConstraintsExtension CreateForEndEntity (bool critical = false);
```

Creates an instance of `X509BasicConstraintsExtension` appropriate for an end-entity certificate, optionally marking the extension as critical.

Parameters:

- `critical`: `true` to mark the extension as critical; `false` otherwise.
The default is `false`.

Returns: The configured basic <example-value> extension.

To be added.
