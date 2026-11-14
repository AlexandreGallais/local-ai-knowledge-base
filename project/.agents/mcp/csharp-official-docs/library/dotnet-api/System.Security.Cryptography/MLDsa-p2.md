---
title: "MLDsa class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsa class (part 2 of 4)

## MLDsa.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

Imports an ML-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The value does not represent an ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

To be added.

## MLDsa.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `source` is `null`.

To be added.

## MLDsa.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

Imports an ML-DSA key from an encrypted RFC 7468 PEM-encoded string.

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
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## MLDsa.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

Imports an ML-DSA key from an encrypted RFC 7468 PEM-encoded string.

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
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

When the base-64 decoded contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## MLDsa.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `passwordBytes` is `null`.

To be added.

## MLDsa.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `password` is `null`.

To be added.

## MLDsa.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromPem (ReadOnlySpan<char> source);
```

Imports an ML-DSA key from an RFC 7468 PEM-encoded string.

Parameters:

- `source`: The text of the PEM key to import.

Returns: The imported ML-DSA key.

Exceptions:

- `ArgumentException`: `source` contains an encrypted PEM-encoded key.

-or-

`source` contains multiple PEM-encoded ML-DSA keys.

-or-

`source` contains no PEM-encoded ML-DSA keys.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- PUBLIC KEY

- PRIVATE KEY

## MLDsa.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.MLDsa ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## MLDsa.ImportMLDsaPrivateKey(MLDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPrivateKey (System.Security.Cryptography.MLDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## MLDsa.ImportMLDsaPrivateKey(MLDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPrivateKey (System.Security.Cryptography.MLDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-DSA private key in the FIPS 204 private key format.

Parameters:

- `algorithm`: The specific ML-DSA algorithm for this key.
- `source`: The bytes of a FIPS 204 private key.

Returns: The imported key.

Exceptions:

- `CryptographicException`: `algorithm` is not a valid ML-DSA algorithm identifier.

-or-

`source` is not the correct size for the specified algorithm.

-or-

An error occurred while importing the key.

To be added.

## MLDsa.ImportMLDsaPrivateSeed(MLDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPrivateSeed (System.Security.Cryptography.MLDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## MLDsa.ImportMLDsaPrivateSeed(MLDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPrivateSeed (System.Security.Cryptography.MLDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-DSA private key from its private seed value.

Parameters:

- `algorithm`: The specific ML-DSA algorithm for this key.
- `source`: The bytes the key seed.

Returns: The imported key.

Exceptions:

- `CryptographicException`: `algorithm` is not a valid ML-DSA algorithm identifier.

-or-

`source` is not the correct size for the specified algorithm.

-or-

An error occurred while importing the key.

To be added.

## MLDsa.ImportMLDsaPublicKey(MLDsaAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPublicKey (System.Security.Cryptography.MLDsaAlgorithm algorithm, byte[] source);
```

To be added.

Parameters:

- `algorithm`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `algorithm` or `source` is `null`.

To be added.

## MLDsa.ImportMLDsaPublicKey(MLDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportMLDsaPublicKey (System.Security.Cryptography.MLDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-DSA public key in the FIPS 204 public key format.

Parameters:

- `algorithm`: The specific ML-DSA algorithm for this key.
- `source`: The bytes of a FIPS 204 public key.

Returns: The imported key.

Exceptions:

- `CryptographicException`: `algorithm` is not a valid ML-DSA algorithm identifier.

-or-

`source` is not the correct size for the specified algorithm.

-or-

An error occurred while importing the key.

To be added.

## MLDsa.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## MLDsa.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

Imports an ML-DSA private key from a PKCS#8 PrivateKeyInfo structure.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The PrivateKeyInfo value does not represent an ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

To be added.

## MLDsa.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.MLDsa ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## MLDsa.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.MLDsa ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

Imports an ML-DSA public key from an X.509 SubjectPublicKeyInfo structure.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The SubjectPublicKeyInfo value does not represent an ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-DSA. Callers can use the `MLDsa.IsSupported` property to determine if the platform supports ML-DSA.

To be added.

## MLDsa.SignData(Byte[], Byte[]) method

```csharp
public byte[] SignData (byte[] data, byte[]? context = default);
```

Signs the specified data.

Parameters:

- `data`: The data to sign.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is `null`.

Returns: ML-DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the data.

A `null` context is treated as empty.

## MLDsa.SignData(Byte>, Byte>, Byte>) method

```csharp
public void SignData (ReadOnlySpan<byte> data, Span<byte> destination, ReadOnlySpan<byte> context = default);
```

Signs the specified data, writing the signature into the provided buffer.

Parameters:

- `data`: The data to sign.
- `destination`: The buffer to receive the signature. Its length must be exactly `MLDsaAlgorithm.SignatureSizeInBytes`.
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

## MLDsa.SignDataCore(Byte>, Byte>, Byte>) method

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

## MLDsa.SignMu(Byte[]) method

```csharp
public byte[] SignMu (byte[] externalMu);
```

To be added.

Parameters:

- `externalMu`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `externalMu` is `null`.

To be added.
