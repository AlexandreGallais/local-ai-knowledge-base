---
title: "MLDsa class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsa class (part 3 of 4)

## MLDsa.SignMu(Byte>) method

```csharp
public byte[] SignMu (ReadOnlySpan<byte> externalMu);
```

Signs the specified externally computed signature mu (μ) value.

Parameters:

- `externalMu`: The signature mu value to sign.

Returns: ML-DSA signature for the specified mu value.

Exceptions:

- `ArgumentException`: The buffer in `externalMu` is the incorrect length for the signature mu value.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the hash.
- `PlatformNotSupportedException`: The current platform does not support signing with an externally computed mu value.

To be added.

## MLDsa.SignMu(Byte>, Byte>) method

```csharp
public void SignMu (ReadOnlySpan<byte> externalMu, Span<byte> destination);
```

Signs the specified externally computed signature mu (μ) value, writing the signature into the provided buffer.

Parameters:

- `externalMu`: The signature mu value to sign.
- `destination`: The buffer to receive the signature. Its length must be exactly `MLDsaAlgorithm.SignatureSizeInBytes`.

Exceptions:

- `ArgumentException`: The buffer in `externalMu` is the incorrect length for the signature mu value.

-or-

The buffer in `destination` is the incorrect length to receive the signature.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while signing the hash.
- `PlatformNotSupportedException`: The current platform does not support signing with an externally computed mu value.

To be added.

## MLDsa.SignMuCore(Byte>, Byte>) method

```csharp
protected abstract void SignMuCore (ReadOnlySpan<byte> externalMu, Span<byte> destination);
```

When overridden in a derived class, computes the remainder of the signature from the precomputed mu (μ) value, writing it into the provided buffer.

Parameters:

- `externalMu`: The signature mu value to sign.
- `destination`: The buffer to receive the signature, which will always be the exactly correct size for the algorithm.

Exceptions:

- `CryptographicException`: An error occurred while computing the signature.

To be added.

## MLDsa.SignPreHash(Byte[], String, Byte[]) method

```csharp
public byte[] SignPreHash (byte[] hash, string hashAlgorithmOid, byte[]? context = default);
```

Signs the specified hash using the FIPS 204 pre-hash signing algorithm.

Parameters:

- `hash`: The hash to sign.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is `null`.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `hash` or `hashAlgorithmOid` is `null`.

An error occurred while verifying the data.

`hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

The instance represents only a public key.

-or-

An error occurred while signing the hash.

To be added.

## MLDsa.SignPreHash(Byte>, Byte>, String, Byte>) method

```csharp
public void SignPreHash (ReadOnlySpan<byte> hash, Span<byte> destination, string hashAlgorithmOid, ReadOnlySpan<byte> context = default);
```

Signs the specified hash using the FIPS 204 pre-hash signing algorithm, writing the signature into the provided buffer.

Parameters:

- `hash`: The hash to sign.
- `destination`: The buffer to receive the signature. Its length must be exactly `MLDsaAlgorithm.SignatureSizeInBytes`.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: An optional context-specific value to limit the scope of the signature.

The default value is an empty buffer.

Exceptions:

- `ArgumentNullException`: `hashAlgorithmOid` is `null`.
- `ArgumentException`: The buffer in `destination` is the incorrect length to receive the signature.
- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

The instance represents only a public key.

-or-

An error occurred while signing the hash.

To be added.

## MLDsa.SignPreHashCore(Byte>, Byte>, String, Byte>) method

```csharp
protected abstract void SignPreHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> context, string hashAlgorithmOid, Span<byte> destination);
```

When overridden in a derived class, computes the pre-hash signature of the specified hash and context, writing it into the provided buffer.

Parameters:

- `hash`: The hash to sign.
- `context`: The signature context.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `destination`: The buffer to receive the signature, which will always be the exactly correct size for the algorithm.

Exceptions:

- `CryptographicException`: An error occurred while signing the hash.

To be added.

## MLDsa.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The buffer to receive the PKCS#8 EncryptedPrivateKeyInfo value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `pbeParameters` is `null`.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `pbeParameters` specifies a KDF that requires a char-based password.

-or-

`pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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
- `CryptographicException`: `pbeParameters` does not represent a valid password-based encryption algorithm.

-or-

This instance only represents a public key.

-or-

The private key is not exportable.

-or-

An error occurred while exporting the key.

To be added.

## MLDsa.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

```csharp
public bool TryExportEncryptedPkcs8PrivateKey (string password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `password`: To be added.
- `pbeParameters`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `password` or `pbeParameters` is `null`.

To be added.

## MLDsa.TryExportPkcs8PrivateKey(Byte>, Int32) method

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

## MLDsa.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

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

## MLDsa.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

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

## MLDsa.VerifyData(Byte[], Byte[], Byte[]) method

```csharp
public bool VerifyData (byte[] data, byte[] signature, byte[]? context = default);
```

Verifies that the specified signature is valid for this key and the provided data.

Parameters:

- `data`: The data to verify.
- `signature`: The signature to verify.
- `context`: The context value which was provided during signing.

The default value is `null`.

Returns: `true` if the signature validates the data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` or `signature` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while verifying the data.

A `null` context is treated as empty.

## MLDsa.VerifyData(Byte>, Byte>, Byte>) method

```csharp
public bool VerifyData (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, ReadOnlySpan<byte> context = default);
```

Verifies that the specified signature is valid for this key and the provided data.

Parameters:

- `data`: The data to verify.
- `signature`: The signature to verify.
- `context`: The context value which was provided during signing.

The default value is an empty buffer.

Returns: `true` if the signature validates the data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: The instance represents only a public key.

-or-

An error occurred while verifying the data.

To be added.

## MLDsa.VerifyDataCore(Byte>, Byte>, Byte>) method

```csharp
protected abstract bool VerifyDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, ReadOnlySpan<byte> signature);
```

When overridden in a derived class, verifies the signature of the specified data and context.

Parameters:

- `data`: The data to verify.
- `context`: The signature context.
- `signature`: The signature to verify.

Returns: `true` if the signature validates the data; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred while verifying the data.

To be added.

## MLDsa.VerifyMu(Byte[], Byte[]) method

```csharp
public bool VerifyMu (byte[] externalMu, byte[] signature);
```

To be added.

Parameters:

- `externalMu`: To be added.
- `signature`: To be added.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `externalMu` or `signature` is `null`.

To be added.

## MLDsa.VerifyMu(Byte>, Byte>) method

```csharp
public bool VerifyMu (ReadOnlySpan<byte> externalMu, ReadOnlySpan<byte> signature);
```

Verifies that a digital signature is valid for the provided externally computed signature mu (μ) value.

Parameters:

- `externalMu`: The signature mu value.
- `signature`: The signature to verify.

Returns: `true` if the digital signature is valid for the provided mu value; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while verifying the mu value.
- `PlatformNotSupportedException`: The current platform does not support verification with an externally computed mu value.

To be added.

## MLDsa.VerifyMuCore(Byte>, Byte>) method

```csharp
protected abstract bool VerifyMuCore (ReadOnlySpan<byte> externalMu, ReadOnlySpan<byte> signature);
```

When overridden in a derived class, verifies that a digital signature is valid for the provided externally computed signature mu (μ) value.

Parameters:

- `externalMu`: The signature mu value.
- `signature`: The signature to verify.

Returns: `true` if the mu value is valid; otherwise, `false`.

To be added.
