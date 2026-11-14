---
title: "MLKem class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLKem.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLKem class (part 3 of 3)

## MLKem.ImportPkcs8PrivateKey(Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportPkcs8PrivateKey (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`

To be added.

## MLKem.ImportPkcs8PrivateKey(Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportPkcs8PrivateKey (ReadOnlySpan<byte> source);
```

Imports an ML-KEM private key from a PKCS#8 PrivateKeyInfo structure.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The PrivateKeyInfo value does not represent an ML-KEM key.

-or-

`source` contains trailing data after the ASN.1 structure.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportPrivateSeed(MLKemAlgorithm, Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportPrivateSeed (System.Security.Cryptography.MLKemAlgorithm algorithm, byte[] source);
```

Imports an ML-KEM key from its private seed value.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The private seed.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not the `MLKemAlgorithm.PrivateSeedSizeInBytes` from `algorithm`.
- `ArgumentNullException`: `algorithm` is `null`.

-or-

`source` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportPrivateSeed(MLKemAlgorithm, Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportPrivateSeed (System.Security.Cryptography.MLKemAlgorithm algorithm, ReadOnlySpan<byte> source);
```

Imports an ML-KEM key from its private seed value.

Parameters:

- `algorithm`: The specific ML-KEM algorithm for this key.
- `source`: The private seed.

Returns: The imported key.

Exceptions:

- `ArgumentException`: `source` has a length that is not the `MLKemAlgorithm.PrivateSeedSizeInBytes` from `algorithm`.
- `ArgumentNullException`: `algorithm` is `null`.
- `CryptographicException`: An error occurred while importing the key.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.ImportSubjectPublicKeyInfo(Byte[]) method

```csharp
public static System.Security.Cryptography.MLKem ImportSubjectPublicKeyInfo (byte[] source);
```

To be added.

Parameters:

- `source`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `source` is `null`

To be added.

## MLKem.ImportSubjectPublicKeyInfo(Byte>) method

```csharp
public static System.Security.Cryptography.MLKem ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source);
```

Imports an ML-KEM encapsulation key from an X.509 SubjectPublicKeyInfo structure.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.

Returns: The imported key.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The SubjectPublicKeyInfo value does not represent an ML-KEM key.

-or-

The algorithm-specific import failed.
- `PlatformNotSupportedException`: The platform does not support ML-KEM. Callers can use the `MLKem.IsSupported` property to determine if the platform supports ML-KEM.

To be added.

## MLKem.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a byte-based password.

Parameters:

- `passwordBytes`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The buffer to receive the PKCS#8 EncryptedPrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The buffer to receive the PKCS#8 EncryptedPrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The buffer to receive the PKCS#8 EncryptedPrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `password` or `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

To be added.

## MLKem.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into the provided buffer.

Parameters:

- `destination`: The buffer to receive the PKCS#8 PrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLKem.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected abstract bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
```

When overridden in a derived class, attempts to export the current key in the PKCS#8 PrivateKeyInfo format into the provided buffer.

Parameters:

- `destination`: The buffer to receive the PKCS#8 PrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## MLKem.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

Attempts to export the public-key <example-value> of the current key in the X.509 SubjectPublicKeyInfo format into the provided buffer.

Parameters:

- `destination`: The buffer to receive the X.509 SubjectPublicKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.
