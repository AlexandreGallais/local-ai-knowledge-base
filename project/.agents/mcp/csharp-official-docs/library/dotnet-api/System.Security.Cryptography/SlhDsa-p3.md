---
title: "SlhDsa class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SlhDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SlhDsa class (part 3 of 3)

## SlhDsa.SignPreHash(Byte>, Byte>, String, Byte>) method

```csharp
public void SignPreHash (ReadOnlySpan<byte> hash, Span<byte> destination, string hashAlgorithmOid, ReadOnlySpan<byte> context = default);
```

Signs the specified hash using the FIPS 205 pre-hash signing algorithm, writing the signature into the provided buffer.

Parameters:

- `hash`: The hash to sign.
- `destination`: The buffer to receive the signature. Its length must be exactly `SlhDsaAlgorithm.SignatureSizeInBytes`.
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

## SlhDsa.SignPreHashCore(Byte>, Byte>, String, Byte>) method

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

## SlhDsa.ThrowIfDisposed() method

```csharp
protected void ThrowIfDisposed ();
```

To be added.

To be added.

## SlhDsa.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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

## SlhDsa.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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

## SlhDsa.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

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

## SlhDsa.TryExportPkcs8PrivateKey(Byte>, Int32) method

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

## SlhDsa.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

```csharp
protected virtual bool TryExportPkcs8PrivateKeyCore (Span<byte> destination, out int bytesWritten);
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

## SlhDsa.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

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

## SlhDsa.VerifyData(Byte[], Byte[], Byte[]) method

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

## SlhDsa.VerifyData(Byte>, Byte>, Byte>) method

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
- `CryptographicException`: An error occurred while verifying the data.

To be added.

## SlhDsa.VerifyDataCore(Byte>, Byte>, Byte>) method

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

## SlhDsa.VerifyPreHash(Byte[], Byte[], String, Byte[]) method

```csharp
public bool VerifyPreHash (byte[] hash, byte[] signature, string hashAlgorithmOid, byte[]? context = default);
```

Verifies that the specified FIPS 205 pre-hash signature is valid for this key and the provided hash.

Parameters:

- `hash`: The hash to verify.
- `signature`: The signature to verify.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: The context value which was provided during signing.

The default value is `null`.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `signature` or `hashAlgorithmOid` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

An error occurred while verifying the hash.

A `null` context is treated as empty.

## SlhDsa.VerifyPreHash(Byte>, Byte>, String, Byte>) method

```csharp
public bool VerifyPreHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, string hashAlgorithmOid, ReadOnlySpan<byte> context = default);
```

Verifies that the specified FIPS 205 pre-hash signature is valid for this key and the provided hash.

Parameters:

- `hash`: The hash to verify.
- `signature`: The signature to verify.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: The context value which was provided during signing.

The default value is an empty buffer.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hashAlgorithmOid` is `null`.
- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

An error occurred while verifying the hash.

To be added.

## SlhDsa.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

```csharp
protected abstract bool VerifyPreHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> context, string hashAlgorithmOid, ReadOnlySpan<byte> signature);
```

When overridden in a derived class, verifies the pre-hash signature of the specified hash and context.

Parameters:

- `hash`: The data to verify.
- `context`: The signature context.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `signature`: The signature to verify.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred while verifying the hash.

To be added.
