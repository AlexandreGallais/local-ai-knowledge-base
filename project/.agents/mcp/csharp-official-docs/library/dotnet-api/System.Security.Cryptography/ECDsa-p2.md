---
title: "ECDsa class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsa class (part 2 of 3)

## ECDsa.SignDataCore(Stream, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual byte[] SignDataCore (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## ECDsa.SignDataCore(Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual byte[] SignDataCore (ReadOnlySpan<byte> data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## ECDsa.SignHash(Byte[]) method

```csharp
public abstract byte[] SignHash (byte[] hash);
```

Generates a digital signature for the specified hash value.

Parameters:

- `hash`: The hash value of the data that is being signed.

Returns: A digital signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: The `hash` parameter is `null`.

To be added.

## ECDsa.SignHash(Byte>) method

```csharp
public byte[] SignHash (ReadOnlySpan<byte> hash);
```

Computes the ECDSA signature for the specified hash value.

Parameters:

- `hash`: The hash value of the data that is being signed.

Returns: A digital signature for the specified hash value.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

This method will use `DSASignatureFormat.IeeeP1363FixedFieldConcatenation` to encode the the signature. To use a different signature format, use `ECDsa.SignHash`.

## ECDsa.SignHash(Byte[], DSASignatureFormat) method

```csharp
public byte[] SignHash (byte[] hash, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the ECDSA signature for the specified hash value in the indicated format.

Parameters:

- `hash`: The hash value to sign.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `hash` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.SignHash(Byte>, DSASignatureFormat) method

```csharp
public byte[] SignHash (ReadOnlySpan<byte> hash, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the ECDSA signature for the specified hash value in the indicated format.

Parameters:

- `hash`: The hash value of the data that is being signed.
- `signatureFormat`: The encoding format to use for the signature.

Returns: A digital signature for the specified hash value.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.SignHash(Byte>, Byte>) method

```csharp
public int SignHash (ReadOnlySpan<byte> hash, Span<byte> destination);
```

Computes the ECDSA signature for the specified hash value into the provided buffer.

Parameters:

- `hash`: The hash value of the data that is being signed.
- `destination`: The buffer to receive the signature.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.
- `ArgumentException`: The buffer in `destination` is too small to hold the signature.

This method will use `DSASignatureFormat.IeeeP1363FixedFieldConcatenation` to encode the the signature. To use a different signature format, use `ECDsa.SignHash`.

## ECDsa.SignHash(Byte>, Byte>, DSASignatureFormat) method

```csharp
public int SignHash (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the ECDSA signature for the specified hash value in the indicated format into the provided buffer.

Parameters:

- `hash`: The hash value of the data that is being signed.
- `destination`: The buffer to receive the signature.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.
- `ArgumentException`: The buffer in `destination` is too small to hold the signature.

To be added.

## ECDsa.SignHashCore(Byte>, DSASignatureFormat) method

```csharp
protected virtual byte[] SignHashCore (ReadOnlySpan<byte> hash, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the ECDSA signature for the specified hash value in the indicated format.

Parameters:

- `hash`: The hash value to sign.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The ECDSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.ToXmlString(Boolean) method

```csharp
public override string ToXmlString (bool includePrivateParameters);
```

This method throws in all cases.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: This method does not return a value.

Exceptions:

- `NotImplementedException`: In all cases.

To be added.

## ECDsa.TryHashData(Byte>, Byte>, HashAlgorithmName, Int32) method

```csharp
protected virtual bool TryHashData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, out int bytesWritten);
```

Attempts to compute the hash value of the specified read-only span of bytes into the provided destination by using the specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `destination`: The buffer to receive the hash value.
- `hashAlgorithm`: The algorithm to use to hash the data.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `false` if `destination` is not long enough to receive the hash value.

#### Remarks

The default implementation of this method is to call `HashData` and copy the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

## ECDsa.TrySignData(Byte>, Byte>, HashAlgorithmName, Int32) method

```csharp
public virtual bool TrySignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, out int bytesWritten);
```

Attempts to compute the ECDSA digital signature for the specified read-only span of bytes into the provided destination by using the specified hashing algorithm and the current key.

Parameters:

- `data`: The data to be signed.
- `destination`: The buffer to receive the signature.
- `hashAlgorithm`: The algorithm to use to hash the data for signing.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `false` if `destination` is not long enough to receive the signature.

To be added.

## ECDsa.TrySignData(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat, Int32) method

```csharp
public bool TrySignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the ECDSA signature for the specified data in the indicated format into the provided buffer.

Parameters:

- `data`: The data to hash and sign.
- `destination`: The buffer to receive the signature.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the signature; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.TrySignDataCore(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat, Int32) method

```csharp
protected virtual bool TrySignDataCore (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the ECDSA signature for the specified data in the indicated format into the provided buffer.

Parameters:

- `data`: The data to hash and sign.
- `destination`: The buffer to receive the signature.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the signature; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.TrySignHash(Byte>, Byte>, Int32) method

```csharp
public virtual bool TrySignHash (ReadOnlySpan<byte> hash, Span<byte> destination, out int bytesWritten);
```

Attempts to compute the ECDSA digital signature for the specified read-only span of bytes representing a data hash into the provided destination by using the current key.

Parameters:

- `hash`: The hash value of the data that is being signed.
- `destination`: The buffer to receive the signature.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `false` if `destination` is not long enough to receive the signature.

To be added.

## ECDsa.TrySignHash(Byte>, Byte>, DSASignatureFormat, Int32) method

```csharp
public bool TrySignHash (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the ECDSA signature for the specified hash value in the indicated format into the provided buffer.

Parameters:

- `hash`: The hash value to sign.
- `destination`: The buffer to receive the signature.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the signature; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.TrySignHashCore(Byte>, Byte>, DSASignatureFormat, Int32) method

```csharp
protected virtual bool TrySignHashCore (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the ECDSA signature for the specified hash value in the indicated format into the provided buffer.

Parameters:

- `hash`: The hash value to sign.
- `destination`: The buffer to receive the signature.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the signature; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

To be added.

## ECDsa.VerifyData(Byte[], Byte[], HashAlgorithmName) method

```csharp
public bool VerifyData (byte[] data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is appropriate for the current key and provided data with a specified hash algorithm.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## ECDsa.VerifyData(Stream, Byte[], HashAlgorithmName) method

```csharp
public bool VerifyData (System.IO.Stream data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is appropriate for the current key and provided data with a specified hash algorithm.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.
