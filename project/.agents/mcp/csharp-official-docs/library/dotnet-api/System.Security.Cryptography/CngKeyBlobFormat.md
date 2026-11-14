---
title: "CngKeyBlobFormat class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyBlobFormat.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyBlobFormat class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngKeyBlobFormat : IEquatable<System.Security.Cryptography.CngKeyBlobFormat>
```

Specifies a key BLOB format for use with Microsoft Cryptography Next Generation (CNG) objects.

#### Remarks
The `CngKeyBlobFormat` class is a utility class. It consists of static properties, comparison methods, and a private, internally maintained string that specifies the key BLOB format name.

The static properties return `CngKeyBlobFormat` objects. Each object's internal string name is initialized to the key BLOB format name that corresponds to the name of the static property.

You can also use this class to create objects for key BLOB formats that are not covered by the static properties.

Several CNG classes (such as `CngKey`) accept `CngKeyBlobFormat` objects through a `format` parameter. When the class receives the `CngKeyBlobFormat` object, it retrieves the embedded name of the key BLOB format by calling the object's `Format` property.

Therefore, `CngKeyBlobFormat` serves as an enumeration of well-known key BLOB formats. It lets you identify a well-known key BLOB format by using a strongly typed value instead of a string.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngKeyBlobFormat.CngKeyBlobFormat(String) constructor

```csharp
public CngKeyBlobFormat (string format);
```

Initializes a new instance of the `CngKeyBlobFormat` class by using the specified format.

Parameters:

- `format`: The key BLOB format to initialize.

Exceptions:

- `ArgumentNullException`: The `format` parameter is `null`.
- `ArgumentException`: The `format` parameter length is 0 (zero).

#### Remarks
The primary purpose of this constructor is to provide a method for creating `CngKeyBlobFormat` objects for format types that are not represented by the static properties of the `CngKeyBlobFormat` class. This capacity allows future .NET releases and third-party developers to add new key BLOB formats, which can be accessed just like the key BLOB formats that are currently available.

## CngKeyBlobFormat.EccFullPrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat EccFullPrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a private key BLOB for an elliptic curve cryptography (ECC) key which contains explicit curve parameters.

Returns: An object describing a private key BLOB.

To be added.

## CngKeyBlobFormat.EccFullPublicBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat EccFullPublicBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a public key BLOB for an elliptic curve cryptography (ECC) key which contains explicit curve parameters.

Returns: An object describing a public key BLOB.

To be added.

## CngKeyBlobFormat.EccPrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat EccPrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a private key BLOB for an elliptic curve cryptography (ECC) key.

Returns: An object that specifies an ECC private key BLOB.

#### Remarks
The ECC private key BLOB format contains both the public and private portions of an ECC key.

## CngKeyBlobFormat.EccPublicBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat EccPublicBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a public key BLOB for an elliptic curve cryptography (ECC) key.

Returns: An object that specifies an ECC public key BLOB.

#### Remarks
The ECC public key BLOB format contains only the public portion of an ECC key.

## CngKeyBlobFormat.Format property

```csharp
public string Format { get; }
```

Gets the name of the key BLOB format that the current `CngKeyBlobFormat` object specifies.

Returns: The embedded key BLOB format name.

To be added.

## CngKeyBlobFormat.GenericPrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat GenericPrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a generic private key BLOB.

Returns: An object that specifies a generic private key BLOB.

#### Remarks
A generic private key BLOB can contain a private key of any type and does not necessarily contain the corresponding public key. The type of key that the BLOB contains can be determined only by examining the BLOB.

## CngKeyBlobFormat.GenericPublicBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat GenericPublicBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a generic public key BLOB.

Returns: An object that specifies a generic public key BLOB.

#### Remarks
A generic public key BLOB can contain a public key of any type. The type of public key that the BLOB contains can be determined only by examining the BLOB.

## CngKeyBlobFormat.MLKemPrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat MLKemPrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) private key BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) private key BLOB.

The value identified by this blob format is "MLKEMPRIVATEBLOB".

## CngKeyBlobFormat.MLKemPrivateSeedBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat MLKemPrivateSeedBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) private seed BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) private seed BLOB.

The value identified by this blob format is "MLKEMPRIVATESEEDBLOB".

## CngKeyBlobFormat.MLKemPublicBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat MLKemPublicBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) public key BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) public key BLOB.

The value identified by this blob format is "MLKEMPUBLICBLOB".

## CngKeyBlobFormat.OpaqueTransportBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat OpaqueTransportBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies an opaque transport key BLOB.

Returns: An object that specifies an opaque transport key BLOB.

#### Remarks
The format of an opaque transport key BLOB is determined by, and associated with, each key <example-value> provider. Importing and exporting a key in opaque transport format requires using the same key <example-value> provider for both operations.

## CngKeyBlobFormat.Pkcs8PrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat Pkcs8PrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Private Key <example-value> Syntax Standard (PKCS #8) key BLOB.

Returns: An object that specifies a PKCS #8 private key BLOB.

#### Remarks
A PKCS #8 private key BLOB contains both private and public key <example-value> in PKCS #8 format.

## CngKeyBlobFormat.PQDsaPrivateBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat PQDsaPrivateBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm private key BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm private key BLOB.

The value identified by this blob format is "PQDSAPRIVATEBLOB".

## CngKeyBlobFormat.PQDsaPrivateSeedBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat PQDsaPrivateSeedBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm private seed BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm private seed BLOB.

The value identified by this blob format is "PQDSAPRIVATESEEDBLOB".

## CngKeyBlobFormat.PQDsaPublicBlob property

```csharp
public static System.Security.Cryptography.CngKeyBlobFormat PQDsaPublicBlob { get; }
```

Gets a `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm public key BLOB.

Returns: A `CngKeyBlobFormat` object that specifies a Post-Quantum Digital Signature Algorithm public key BLOB.

The value identified by this blob format is "PQDSAPUBLICBLOB".

## CngKeyBlobFormat.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to the current `CngKeyBlobFormat` object.

Parameters:

- `obj`: An object to be compared to the current `CngKeyBlobFormat` object.

Returns: `true` if the `obj` parameter is a `CngKeyBlobFormat` object that specifies the same key BLOB format as the current object; otherwise, `false`.

To be added.

## CngKeyBlobFormat.Equals(CngKeyBlobFormat) method

```csharp
public bool Equals (System.Security.Cryptography.CngKeyBlobFormat? other);
```

Compares the specified `CngKeyBlobFormat` object to the current `CngKeyBlobFormat` object.

Parameters:

- `other`: An object to be compared to the current `CngKeyBlobFormat` object.

Returns: `true` if the `other` parameter specifies the same key BLOB format as the current object; otherwise, `false`.

To be added.

## CngKeyBlobFormat.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash value for the embedded key BLOB format in the current `CngKeyBlobFormat` object.

Returns: The hash value of the embedded key BLOB format.

To be added.

## CngKeyBlobFormat.op_Equality(CngKeyBlobFormat, CngKeyBlobFormat) method

```csharp
public static bool operator == (System.Security.Cryptography.CngKeyBlobFormat? left, System.Security.Cryptography.CngKeyBlobFormat? right);
```

Determines whether two `CngKeyBlobFormat` objects specify the same key BLOB format.

Parameters:

- `left`: An object that specifies a key BLOB format.
- `right`: A second object, to be compared to the object identified by the `left` parameter.

Returns: `true` if the two objects specify the same key BLOB format; otherwise, `false`.

To be added.

## CngKeyBlobFormat.op_Inequality(CngKeyBlobFormat, CngKeyBlobFormat) method

```csharp
public static bool operator != (System.Security.Cryptography.CngKeyBlobFormat? left, System.Security.Cryptography.CngKeyBlobFormat? right);
```

Determines whether two `CngKeyBlobFormat` objects do not specify the same key BLOB format.

Parameters:

- `left`: An object that specifies a key BLOB format.
- `right`: A second object, to be compared to the object identified by the `left` parameter.

Returns: `true` if the two objects do not specify the same key BLOB format; otherwise, `false`.

To be added.

## CngKeyBlobFormat.ToString() method

```csharp
public override string ToString ();
```

Gets the name of the key BLOB format that the current `CngKeyBlobFormat` object specifies.

Returns: The embedded key BLOB format name.

To be added.
