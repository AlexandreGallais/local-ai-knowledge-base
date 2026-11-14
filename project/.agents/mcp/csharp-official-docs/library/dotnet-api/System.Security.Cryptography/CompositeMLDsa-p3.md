---
title: "CompositeMLDsa class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CompositeMLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeMLDsa class (part 3 of 3)

## CompositeMLDsa.SignDataCore(Byte>, Byte>, Byte>) method

```csharp
protected abstract int SignDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> context, Span<byte> destination);
```

When overridden in a derived class, computes the signature of the specified data and context, writing it into the provided buffer.

Parameters:

- `data`: The data to sign.
- `context`: The signature context.
- `destination`: The buffer to receive the signature, whose length will be exactly `CompositeMLDsaAlgorithm.MaxSignatureSizeInBytes`.

Returns: The number of bytes written to the `destination` buffer.

Exceptions:

- `CryptographicException`: An error occurred while signing the data.

To be added.

## CompositeMLDsa.TryExportCompositeMLDsaPrivateKey(Byte>, Int32) method

```csharp
public bool TryExportCompositeMLDsaPrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export private key <example-value> of the current key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the private key value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.TryExportCompositeMLDsaPublicKey(Byte>, Int32) method

```csharp
public bool TryExportCompositeMLDsaPublicKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export public key <example-value> of the current key into the provided buffer.

Parameters:

- `destination`: The buffer to receive the public key value.
- `bytesWritten`: When this method returns, contains the number of bytes written to the `destination` buffer.

This parameter is treated as uninitialized.

Returns: `true` if `destination` was large enough to hold the result; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: An error occurred while exporting the key.

To be added.

## CompositeMLDsa.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

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

## CompositeMLDsa.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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

## CompositeMLDsa.TryExportEncryptedPkcs8PrivateKey(String, PbeParameters, Byte>, Int32) method

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

## CompositeMLDsa.TryExportPkcs8PrivateKey(Byte>, Int32) method

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

## CompositeMLDsa.TryExportPkcs8PrivateKeyCore(Byte>, Int32) method

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

## CompositeMLDsa.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

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

## CompositeMLDsa.VerifyData(Byte[], Byte[], Byte[]) method

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

## CompositeMLDsa.VerifyData(Byte>, Byte>, Byte>) method

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

## CompositeMLDsa.VerifyDataCore(Byte>, Byte>, Byte>) method

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
