---
title: "SlhDsa class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SlhDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlhDsa class (part 2 of 3)

## SlhDsa.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `source` is `null`.

To be added.

## SlhDsa.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

Imports an SLH-DSA key from an encrypted RFC 7468 PEM-encoded string.

Parameters:

- `source`: The PEM text of the encrypted key to import.
- `passwordBytes`: The bytes to use as a password when decrypting the key material.

Returns: To be added.

Exceptions:

- `ArgumentException`: `source` does not contain a PEM-encoded key with a recognized label.

-or-

`source` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `source` represent the key in a format that is not supported.

-or-

An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## SlhDsa.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

Imports an SLH-DSA key from an encrypted RFC 7468 PEM-encoded string.

Parameters:

- `source`: The PEM text of the encrypted key to import.
- `password`: The password to use for decrypting the key material.

Returns: To be added.

Exceptions:

- `ArgumentException`: `source` does not contain a PEM-encoded key with a recognized label.

-or-

`source` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `source` represent the key in a format that is not supported.

-or-

An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

When the base-64 decoded contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## SlhDsa.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `passwordBytes` is `null`.

To be added.

## SlhDsa.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `password` is `null`.

To be added.

## SlhDsa.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromPem (ReadOnlySpan<char> source);
```

Imports an SLH-DSA key from an RFC 7468 PEM-encoded string.

Parameters:

- `source`: The text of the PEM key to import.

Returns: The imported SLH-DSA key.

Exceptions:

- `ArgumentException`: `source` contains an encrypted PEM-encoded key.

-or-

`source` contains multiple PEM-encoded SLH-DSA keys.

-or-

`source` contains no PEM-encoded SLH-DSA keys.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- PUBLIC KEY

- PRIVATE KEY

## SlhDsa.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## SlhDsa.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## SlhDsa.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

Imports an SLH-DSA private key from a PKCS#8 PrivateKeyInfo structure.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The PrivateKeyInfo value does not represent an SLH-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.ImportSlhDsaPrivateKey(SlhDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSlhDsaPrivateKey (System.Security.Cryptography.SlhDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## SlhDsa.ImportSlhDsaPrivateKey(SlhDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSlhDsaPrivateKey (System.Security.Cryptography.SlhDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an SLH-DSA private key in the FIPS 205 private key format.

Parameters:

- `algorithm`: The specific SLH-DSA algorithm for this key.
- `source`: The bytes of a FIPS 205 private key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the SLH-DSA algorithm.
- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.ImportSlhDsaPublicKey(SlhDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSlhDsaPublicKey (System.Security.Cryptography.SlhDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## SlhDsa.ImportSlhDsaPublicKey(SlhDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSlhDsaPublicKey (System.Security.Cryptography.SlhDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an SLH-DSA public key in the FIPS 205 public key format.

Parameters:

- `algorithm`: The specific SLH-DSA algorithm for this key.
- `source`: The bytes of a FIPS 205 public key.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not valid for the SLH-DSA algorithm.
- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## SlhDsa.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.SlhDsa ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

Imports an SLH-DSA public key from an X.509 SubjectPublicKeyInfo structure.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The SubjectPublicKeyInfo value does not represent an SLH-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support SLH-DSA. Callers can use the `SlhDsa.IsSupported` property to determine if the platform supports SLH-DSA.

To be added.

## SlhDsa.SignData(Byte[], Byte[]) method

```csharp
public byte[] SignData (byte[] data, byte[]? context = default);
```

Signs the specified data.

Parameters:

- `data`: The data to sign.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is `null`.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the data.

A `null` context is treated as empty.

## SlhDsa.SignData(Byte>, Byte>, Byte>) method

```csharp
public void SignData (ReadOnlySpan<byte> data, Span<byte> destination, ReadOnlySpan<byte> context = default);
```

Signs the specified data, writing the signature into the provided buffer.

Parameters:

- `data`: The data to sign.
- `destination`: The buffer to receive the signature. Its length must be exactly `SlhDsaAlgorithm.SignatureSizeInBytes`.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is an empty buffer.

Returns: To be added.

Exceptions:

- `ArgumentException`: The buffer in `destination` is the incorrect length to receive the signature.
- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the data.

To be added.

## SlhDsa.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected abstract void SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

When overridden in a derived class, computes the signature of the specified data and context, writing it into the provided buffer.

Parameters:

- `data`: The data to sign.
- `context`: The signature context.
- `destination`: The buffer to receive the signature, which will always be the exactly correct size for the algorithm.

Exceptions:

- `CryptographicException`: An error occurred while signing the data.

To be added.

## SlhDsa.SignPreHash(Byte[], String, Byte[]) method

```csharp
public byte[] SignPreHash (byte[] hash, string hashAlgorithmOid, byte[]? context = default);
```

Signs the specified hash using the FIPS 205 pre-hash signing algorithm.

Parameters:

- `hash`: The hash to sign.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is `null`.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `hash` or `hashAlgorithmOid` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

The instance represents only a public key.

-or-

An error occurred while signing the hash.

A `null` context is treated as empty.
