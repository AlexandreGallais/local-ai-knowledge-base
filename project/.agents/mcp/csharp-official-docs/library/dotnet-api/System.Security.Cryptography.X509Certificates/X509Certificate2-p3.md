---
title: "X509Certificate2 class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2 class (part 3 of 5)

## X509Certificate2.PublicKey <example-value>

```csharp
public System.Security.Cryptography.X509Certificates.PublicKey <example-value> { get; }
```

Gets a `X509Certificate2.PublicKey` object associated with a certificate.

Returns: A `X509Certificate2.PublicKey` object.

Exceptions:

- `CryptographicException`: The key value is not an RSA or DSA key, or the key is unreadable.

#### Remarks
This property returns a `X509Certificate2.PublicKey` object, which contains the object identifier (`Oid`) representing the public key <example-value>, the ASN.1-encoded parameters, and the ASN.1-encoded key value.

You can also obtain the key as an `AsymmetricAlgorithm` object by referencing the `PublicKey` property. This property supports only RSA or DSA keys, so it returns either an `RSACryptoServiceProvider` or a `DSACryptoServiceProvider` object that represents the public key.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.RawData property

```csharp
public byte[] RawData { get; }
```

Gets the raw X.509 public data of a certificate.

Returns: The raw X.509 public data of a certificate.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.RawDataMemory property

```csharp
public ReadOnlyMemory<byte> RawDataMemory { get; }
```

Gets the raw X.509 public data of a certificate.

Returns: The raw X.509 public data of a certificate.

#### Remarks

Unlike `RawData`, this does not create a fresh copy of the data
every time.

## X509Certificate2.SerialNumber property

```csharp
public string SerialNumber { get; }
```

Gets the serial number of a certificate as a big-endian hexadecimal string.

Returns: The serial number of the certificate as a big-endian hexadecimal string.

#### Remarks
The serial number of the certificate is part of the original X.509 protocol. The serial number is a unique number issued by the certificate issuer, which is also called the Certificate Authority (CA).

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.SignatureAlgorithm property

```csharp
public System.Security.Cryptography.Oid SignatureAlgorithm { get; }
```

Gets the algorithm used to create the signature of a certificate.

Returns: The object identifier of the signature algorithm.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
The object identifier (`Oid`) identifies the type of signature algorithm used by the certificate.

#### Examples
The following code example opens the current user certificate store, selects only active certificates, then allows the user to select one or more certificates. The example then writes certificate information to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Key/certselect.cs._

## X509Certificate2.SubjectName property

```csharp
public System.Security.Cryptography.X509Certificates.X500DistinguishedName SubjectName { get; }
```

Gets the subject distinguished name from a certificate.

Returns: An `X500DistinguishedName` object that represents the name of the certificate subject.

Exceptions:

- `CryptographicException`: The certificate context is invalid.

#### Remarks
The subject distinguished name is the name of the user of the certificate. The distinguished name for the certificate is a textual representation of the subject or issuer of the certificate. This representation consists of name attributes, for example, "CN=MyName, OU=MyOrgUnit, C=US".

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.Thumbprint property

```csharp
public string Thumbprint { get; }
```

Gets the thumbprint of a certificate.

Returns: The thumbprint of the certificate.

#### Remarks
The thumbprint is dynamically generated using the SHA-1 algorithm and does not physically exist in the certificate. Since the thumbprint is a unique value for the certificate, it is commonly used to find a particular certificate in a certificate store.

This property always use the SHA-1 hash algorithm to compute the hash. To get the thumbprint using a different hash algorithm, use `GetCertHashString`.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.Version property

```csharp
public int Version { get; }
```

Gets the X.509 format version of a certificate.

Returns: The certificate format.

Exceptions:

- `CryptographicException`: The certificate is unreadable.

#### Remarks
There are several versions of X.509 certificates. This property identifies which format the certificate uses. For example, "3" is returned for a version 3 certificate.

#### Examples
The following code example creates a command-line executable that takes a certificate file as an argument and prints various certificate properties to the console.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/PublicKey/Overview/certinfo.cs._

## X509Certificate2.CopyWithPrivateKey(CompositeMLDsa) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.CompositeMLDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `privateKey`: The Composite ML-DSA private key that corresponds to the Composite ML-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.
- `PlatformNotSupportedException`: Combining a certificate and a Composite ML-DSA private key is not supported on this platform.

To be added.

## X509Certificate2.CopyWithPrivateKey(CompositeMLKem) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.CompositeMLKem privateKey);
```

To be added.

Parameters:

- `privateKey`: To be added.

Returns: To be added.

To be added.

## X509Certificate2.CopyWithPrivateKey(ECDiffieHellman) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.ECDiffieHellman privateKey);
```

Combines a private key with the public key of an `ECDiffieHellman` certificate to generate a new ECDiffieHellman certificate.

Parameters:

- `privateKey`: The private ECDiffieHellman key.

Returns: A new ECDiffieHellman certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.
The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `privateKey` is `null`.
- `InvalidOperationException`: The certificate already has an associated private key.
- `ArgumentException`: The certificate doesn't have a public key.

-or-

The specified private key doesn't match the public key for this certificate.

To be added.

## X509Certificate2.CopyWithPrivateKey(MLDsa) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.MLDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `privateKey`: The ML-DSA private key that corresponds to the ML-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.

To be added.

## X509Certificate2.CopyWithPrivateKey(MLKem) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.MLKem privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `privateKey`: The ML-KEM private key that corresponds to the ML-KEM public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.

To be added.

## X509Certificate2.CopyWithPrivateKey(SlhDsa) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (System.Security.Cryptography.SlhDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `privateKey`: The SLH-DSA private key that corresponds to the SLH-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.

To be added.

## X509Certificate2.CreateFromEncryptedPem(Char>, Char>, Char>) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CreateFromEncryptedPem (ReadOnlySpan<char> certPem, ReadOnlySpan<char> keyPem, ReadOnlySpan<char> password);
```

Creates a new X509 certificate from the contents of an RFC 7468 PEM-encoded certificate and password <example-value> private key.

Parameters:

- `certPem`: The text of the PEM-encoded X509 certificate.
- `keyPem`: The text of the password <example-value> PEM-encoded private key.
- `password`: The password for the encrypted PEM.

Returns: A new certificate with the private key.

Exceptions:

- `CryptographicException`: The contents of `certPem` do not contain a PEM-encoded certificate, or it is malformed.

-or-

The contents of `keyPem` do not contain a password <example-value> PEM-encoded private key, or it is malformed.

-or-

The contents of `keyPem` contains a key that does not match the public key in the certificate.

-or-

The certificate uses an unknown public key algorithm.

-or-

The password <example-value> for the private key is incorrect.

#### Remarks

Password <example-value> PEM-encoded keys are always expected to have the PEM label "<example-value>".

PEM-encoded items that have a different label are ignored.

If the PEM-encoded certificate and private key are in the same text, use the same string for both `certPem` and `keyPem`, for example, `CreateFromEncryptedPem(combinedCertAndKey, combinedCertAndKey, theKeyPassword);`. Combined PEM-encoded certificates and keys do not require a specific order. For the certificate, the first certificate with a CERTIFICATE label is loaded. For the private key, the first private key with the label "<example-value>" is loaded. More advanced scenarios for loading certificates and private keys can leverage `PemEncoding` to enumerate PEM-encoded values and apply any custom loading behavior.

For PEM-encoded keys without a password, use `CreateFromPem`.
