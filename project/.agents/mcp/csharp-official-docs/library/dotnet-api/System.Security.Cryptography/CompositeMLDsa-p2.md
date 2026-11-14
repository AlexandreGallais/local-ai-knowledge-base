---
title: "CompositeMLDsa class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CompositeMLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeMLDsa class (part 2 of 3)

## CompositeMLDsa.ImportCompositeMLDsaPublicKey(CompositeMLDsaAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportCompositeMLDsaPublicKey (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA public key.

Parameters:

- `algorithm`: The specific Composite ML-DSA algorithm for this key.
- `source`: The bytes of the public key.

Returns: The imported key.

Exceptions:

- `CryptographicException`: `source` length is the wrong size for the specified algorithm.

-or-

An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support the specified Composite ML-DSA algorithm. Callers can use `CompositeMLDsa.IsAlgorithmSupported` to determine if the algorithm is supported.

To be added.

## CompositeMLDsa.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The EncryptedPrivateKeyInfo indicates the Key <example-value> Function (KDF) to apply is the legacy PKCS#12 KDF, which requires `Char`-based passwords.

-or-

The value does not represent a Composite ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

To be added.

## CompositeMLDsa.ImportEncryptedPkcs8PrivateKey(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA private key from a PKCS#8 EncryptedPrivateKeyInfo structure.

Parameters:

- `password`: The password to use when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The specified password is incorrect.

-or-

The value does not represent a Composite ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

To be added.

## CompositeMLDsa.ImportEncryptedPkcs8PrivateKey(String, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportEncryptedPkcs8PrivateKey (string password, byte[] source);
```

To be added.

Parameters:

- `password`: To be added.
- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `source` is `null`.

To be added.

## CompositeMLDsa.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<byte> passwordBytes);
```

Imports a Composite ML-DSA key from an encrypted RFC 7468 PEM-encoded string.

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

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## CompositeMLDsa.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromEncryptedPem (ReadOnlySpan<char> source, ReadOnlySpan<char> password);
```

Imports a Composite ML-DSA key from an encrypted RFC 7468 PEM-encoded string.

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

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

When the base-64 decoded contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## CompositeMLDsa.ImportFromEncryptedPem(String, Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromEncryptedPem (string source, byte[] passwordBytes);
```

To be added.

Parameters:

- `source`: To be added.
- `passwordBytes`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `passwordBytes` is `null`.

To be added.

## CompositeMLDsa.ImportFromEncryptedPem(String, String) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromEncryptedPem (string source, string password);
```

To be added.

Parameters:

- `source`: To be added.
- `password`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` or `password` is `null`.

To be added.

## CompositeMLDsa.ImportFromPem(Char>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromPem (ReadOnlySpan<char> source);
```

Imports a Composite ML-DSA key from an RFC 7468 PEM-encoded string.

Parameters:

- `source`: The text of the PEM key to import.

Returns: The imported Composite ML-DSA key.

Exceptions:

- `ArgumentException`: `source` contains an encrypted PEM-encoded key.

-or-

`source` contains multiple PEM-encoded Composite ML-DSA keys.

-or-

`source` contains no PEM-encoded Composite ML-DSA keys.
- `CryptographicException`: An error occurred while importing the key.

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- PUBLIC KEY

- PRIVATE KEY

## CompositeMLDsa.ImportFromPem(String) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportFromPem (string source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## CompositeMLDsa.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## CompositeMLDsa.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA private key from a PKCS#8 PrivateKeyInfo structure.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The PrivateKeyInfo value does not represent a Composite ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

To be added.

## CompositeMLDsa.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## CompositeMLDsa.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

Imports a Composite ML-DSA public key from an X.509 SubjectPublicKeyInfo structure.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The SubjectPublicKeyInfo value does not represent a Composite ML-DSA key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.

-or-

The specified Composite ML-DSA algorithm is not supported.
- `PlatformNotSupportedException`: The platform does not support Composite ML-DSA. Callers can use the `CompositeMLDsa.IsSupported` property to determine if the platform supports Composite ML-DSA.

To be added.

## CompositeMLDsa.IsAlgorithmSupported(CompositeMLDsaAlgorithm) method

```csharp
public static bool IsAlgorithmSupported (System.Security.Cryptography.CompositeMLDsaAlgorithm algorithm);
```

Determines whether the specified algorithm is supported by the current platform.

Parameters:

- `algorithm`: The `CompositeMLDsaAlgorithm` to check for support.

Returns: `true` if the algorithm is supported; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `algorithm` is `null`.

On Windows in .NET 11 and later, the native implementation supports `CompositeMLDsaAlgorithm.MLDsa44WithECDsaP256`, `CompositeMLDsaAlgorithm.MLDsa65WithECDsaP256`, `CompositeMLDsaAlgorithm.MLDsa65WithECDsaP384`, and `CompositeMLDsaAlgorithm.MLDsa87WithECDsaP384`. Use this method to check whether a specific algorithm is supported.

## CompositeMLDsa.SignData(Byte[], Byte[]) method

```csharp
public byte[] SignData (byte[] data, byte[]? context = default);
```

Signs the specified data.

Parameters:

- `data`: The data to sign.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is `null`.

Returns: The Composite ML-DSA signature of the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the data.

A `null` context is treated as empty.

## CompositeMLDsa.SignData(Byte>, Byte>, Byte>) method

```csharp
public int SignData (ReadOnlySpan<byte> data, Span<byte> destination, ReadOnlySpan<byte> context = default);
```

Signs the specified data, writing the signature into the provided buffer.

Parameters:

- `data`: The data to sign.
- `destination`: The buffer to receive the signature. Its length must be at least `CompositeMLDsaAlgorithm.MaxSignatureSizeInBytes`.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is an empty buffer.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `ArgumentException`: `destination` is less than `CompositeMLDsaAlgorithm.MaxSignatureSizeInBytes` in length.
- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the data.

To be added.
