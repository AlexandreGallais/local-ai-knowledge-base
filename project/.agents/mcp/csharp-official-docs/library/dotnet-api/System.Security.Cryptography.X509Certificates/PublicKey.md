---
title: "PublicKey class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/PublicKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PublicKey class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class PublicKey
```

Represents a certificate's public key information. This class cannot be inherited.

#### Remarks
The `PublicKey` object contains the object identifier (`PublicKey.Oid`) representing the public key <example-value>, the ASN-encoded parameters, and the ASN.1-encoded key value.

#### Examples
The following example demonstrates how to use the public key from a `X509Certificate2` object to encrypt a file. It also shows how to decrypt the encrypted file using the private key for that certificate.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/program.cs._

The following example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## PublicKey.PublicKey(AsymmetricAlgorithm) constructor

```csharp
public PublicKey (System.Security.Cryptography.AsymmetricAlgorithm key);
```

Initializes a new instance of the `PublicKey` class using SubjectPublicKeyInfo from an `AsymmetricAlgorithm`.

Parameters:

- `key`: An asymmetric algorithm to obtain the SubjectPublicKeyInfo from.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded. The `AsymmetricAlgorithm.ExportSubjectPublicKeyInfo` must return a valid ASN.1-DER encoded X.509 SubjectPublicKeyInfo.
- `NotImplementedException`: `AsymmetricAlgorithm.ExportSubjectPublicKeyInfo` has not been overridden in a derived class.

To be added.

## PublicKey.PublicKey(CompositeMLDsa) constructor

```csharp
public PublicKey (System.Security.Cryptography.CompositeMLDsa key);
```

Initializes a new instance of the `PublicKey` class using SubjectPublicKeyInfo from an `CompositeMLDsa`.

Parameters:

- `key`: An `CompositeMLDsa` key to obtain the SubjectPublicKeyInfo from.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded. The `CompositeMLDsa.ExportSubjectPublicKeyInfo` must return a valid ASN.1-DER encoded X.509 SubjectPublicKeyInfo.

To be added.

## PublicKey.PublicKey(MLDsa) constructor

```csharp
public PublicKey (System.Security.Cryptography.MLDsa key);
```

Initializes a new instance of the `PublicKey` class using SubjectPublicKeyInfo from an `MLDsa`.

Parameters:

- `key`: An `MLDsa` key to obtain the SubjectPublicKeyInfo from.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded. The `MLDsa.ExportSubjectPublicKeyInfo` must return a valid ASN.1-DER encoded X.509 SubjectPublicKeyInfo.

To be added.

## PublicKey.PublicKey(MLKem) constructor

```csharp
public PublicKey (System.Security.Cryptography.MLKem key);
```

Initializes a new instance of the `PublicKey` class using SubjectPublicKeyInfo from an `MLKem`.

Parameters:

- `key`: An `MLKem` key to obtain the SubjectPublicKeyInfo from.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded. The `MLKem.ExportSubjectPublicKeyInfo` must return a valid ASN.1-DER encoded X.509 SubjectPublicKeyInfo.

To be added.

## PublicKey.PublicKey(SlhDsa) constructor

```csharp
public PublicKey (System.Security.Cryptography.SlhDsa key);
```

Initializes a new instance of the `PublicKey` class using SubjectPublicKeyInfo from an `SlhDsa`.

Parameters:

- `key`: An `SlhDsa` key to obtain the SubjectPublicKeyInfo from.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded. The `SlhDsa.ExportSubjectPublicKeyInfo` must return a valid ASN.1-DER encoded X.509 SubjectPublicKeyInfo.

To be added.

## PublicKey.PublicKey(Oid, AsnEncodedData, AsnEncodedData) constructor

```csharp
public PublicKey (System.Security.Cryptography.Oid oid, System.Security.Cryptography.AsnEncodedData? parameters, System.Security.Cryptography.AsnEncodedData keyValue);
```

Initializes a new instance of the `PublicKey` class using an object identifier (OID) object of the public key, an ASN.1-encoded representation of the public key <example-value>, and an ASN.1-encoded representation of the public key value.

Parameters:

- `oid`: An object identifier (OID) object that represents the public key.
- `parameters`: An ASN.1-encoded representation of the public key parameters.
- `keyValue`: An ASN.1-encoded representation of the public key value.

To be added.

## PublicKey.EncodedKeyValue property

```csharp
public System.Security.Cryptography.AsnEncodedData EncodedKeyValue { get; }
```

Gets the ASN.1-encoded representation of the public key value.

Returns: The ASN.1-encoded representation of the public key value.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## PublicKey.EncodedParameters property

```csharp
public System.Security.Cryptography.AsnEncodedData? EncodedParameters { get; }
```

Gets the ASN.1-encoded representation of the public key parameters.

Returns: The ASN.1-encoded representation of the public key parameters.

To be added.

## PublicKey.Key <example-value>

```csharp
public System.Security.Cryptography.AsymmetricAlgorithm Key { get; }
```

Gets an `RSA` derived object or a `DSA` derived object representing the public key.

Returns: An `AsymmetricAlgorithm` object representing the public key.

Exceptions:

- `NotSupportedException`: The key <example-value> is not supported.

To be added.

## PublicKey.Oid property

```csharp
public System.Security.Cryptography.Oid Oid { get; }
```

Gets an object identifier (OID) object of the public key.

Returns: An object identifier (OID) object of the public key.

#### Remarks
An object identifier (OID) is a number that uniquely identifies an object class or attribute. An object identifier is represented as a dotted decimal string, such as "1.2.3.4." Object identifiers are organized into a global hierarchy. National registration authorities issue root object identifiers to individuals or organizations, who manage the hierarchy of OIDs grouped below their root object identifier.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## PublicKey.CreateFromSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public static System.Security.Cryptography.X509Certificates.PublicKey <example-value> (ReadOnlySpan<byte> source, out int bytesRead);
```

Creates a new instance of `PublicKey` from a X.509 SubjectPublicKeyInfo.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Returns: A public key <example-value> the SubjectPublicKeyInfo.

Exceptions:

- `CryptographicException`: The SubjectPublicKeyInfo could not be decoded.

To be added.

## PublicKey.ExportSubjectPublicKeyInfo() method

```csharp
public byte[] ExportSubjectPublicKeyInfo ();
```

Exports the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of this key.

To be added.

## PublicKey.GetCompositeMLDsaPublicKey() method

```csharp
public System.Security.Cryptography.CompositeMLDsa? GetCompositeMLDsaPublicKey ();
```

Gets the `CompositeMLDsa` public key, or `null` if the key is not a Composite ML-DSA key.

Returns: The public key, or `null` if the key is not a Composite ML-DSA key.

Exceptions:

- `PlatformNotSupportedException`: The object represents a Composite ML-DSA public key, but the platform does not support the algorithm.
- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetDSAPublicKey() method

```csharp
public System.Security.Cryptography.DSA? GetDSAPublicKey ();
```

Gets the `DSA` public key, or `null` if the key is not an DSA key.

Returns: The public key, or `null` if the key is not an DSA key.

Exceptions:

- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetECDiffieHellmanPublicKey() method

```csharp
public System.Security.Cryptography.ECDiffieHellman? GetECDiffieHellmanPublicKey ();
```

Gets the `ECDiffieHellman` public key, or `null` if the key is not an ECDiffieHellman key.

Returns: The public key, or `null` if the key is not an ECDiffieHellman key.

Exceptions:

- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetECDsaPublicKey() method

```csharp
public System.Security.Cryptography.ECDsa? GetECDsaPublicKey ();
```

Gets the `ECDsa` public key, or `null` if the key is not an ECDsa key.

Returns: The public key, or `null` if the key is not an ECDsa key.

Exceptions:

- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetMLDsaPublicKey() method

```csharp
public System.Security.Cryptography.MLDsa? GetMLDsaPublicKey ();
```

Gets the `MLDsa` public key, or `null` if the key is not an ML-DSA key.

Returns: The public key, or `null` if the key is not an ML-DSA key.

Exceptions:

- `PlatformNotSupportedException`: The object represents an ML-DSA public key, but the platform does not support the algorithm.
- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetMLKemPublicKey() method

```csharp
public System.Security.Cryptography.MLKem? GetMLKemPublicKey ();
```

Gets the `MLKem` public key, or `null` if the key is not an ML-KEM key.

Returns: The public key, or `null` if the key is not an ML-KEM key.

Exceptions:

- `PlatformNotSupportedException`: The object represents an ML-KEM public key, but the platform does not support the algorithm.
- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetRSAPublicKey() method

```csharp
public System.Security.Cryptography.RSA? GetRSAPublicKey ();
```

Gets the `RSA` public key, or `null` if the key is not an RSA key.

Returns: The public key, or `null` if the key is not an RSA key.

Exceptions:

- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.GetSlhDsaPublicKey() method

```csharp
public System.Security.Cryptography.SlhDsa? GetSlhDsaPublicKey ();
```

Gets the `SlhDsa` public key, or `null` if the key is not an SLH-DSA key.

Returns: The public key, or `null` if the key is not an SLH-DSA key.

Exceptions:

- `PlatformNotSupportedException`: The object represents an SLH-DSA public key, but the platform does not support the algorithm.
- `CryptographicException`: The key <example-value> are corrupt or could not be read successfully.

To be added.

## PublicKey.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the X.509 SubjectPublicKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the X.509 SubjectPublicKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.
