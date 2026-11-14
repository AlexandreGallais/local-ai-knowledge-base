---
title: "ECDsa class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsa class (part 3 of 3)

## ECDsa.VerifyData(Byte>, Byte>, HashAlgorithmName) method

```csharp
public virtual bool VerifyData (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is appropriate for the current key and provided data with a specified hash algorithm.

Parameters:

- `data`: The signed data.
- `signature`: The signature to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## ECDsa.VerifyData(Byte[], Byte[], HashAlgorithmName, DSASignatureFormat) method

```csharp
public bool VerifyData (byte[] data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: The signed data.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` or `signature` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyData(Stream, Byte[], HashAlgorithmName, DSASignatureFormat) method

```csharp
public bool VerifyData (System.IO.Stream data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: The signed data.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` or `signature` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyData(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
public bool VerifyData (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: The signed data.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyData(Byte[], Int32, Int32, Byte[], HashAlgorithmName) method

```csharp
public virtual bool VerifyData (byte[] data, int offset, int count, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is appropriate for the current key and provided portion of data with a specified hash algorithm.

Parameters:

- `data`: The signed data.
- `offset`: The starting index at which to compute the hash.
- `count`: The number of bytes to hash.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.

To be added.

## ECDsa.VerifyData(Byte[], Int32, Int32, Byte[], HashAlgorithmName, DSASignatureFormat) method

```csharp
public bool VerifyData (byte[] data, int offset, int count, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: An array that contains the signed data.
- `offset`: The starting index of the signed portion of `data`.
- `count`: The number of bytes in `data` that were signed.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` or `signature` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

-or-

`offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyDataCore(Stream, Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual bool VerifyDataCore (System.IO.Stream data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: The signed data.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyDataCore(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual bool VerifyDataCore (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided data.

Parameters:

- `data`: The signed data.
- `signature`: The signature to verify.
- `hashAlgorithm`: The hash algorithm used to hash the data for the verification process.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or verification operation.

To be added.

## ECDsa.VerifyHash(Byte[], Byte[]) method

```csharp
public abstract bool VerifyHash (byte[] hash, byte[] signature);
```

Verifies that a digital signature is appropriate for the current key and provided data hash.

Parameters:

- `hash`: The hash value of the data to be verified.
- `signature`: The digital signature of the data to be verified against the hash value.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `signature` is `null`.

To be added.

## ECDsa.VerifyHash(Byte>, Byte>) method

```csharp
public virtual bool VerifyHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature);
```

Verifies that a digital signature is appropriate for the current key and provided data hash.

Parameters:

- `hash`: The hash value of the data to be verified.
- `signature`: The digital signature of the data to be verified against the hash value.

Returns: `true` if the signature is valid; otherwise, `false`.

To be added.

## ECDsa.VerifyHash(Byte[], Byte[], DSASignatureFormat) method

```csharp
public bool VerifyHash (byte[] hash, byte[] signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided hash.

Parameters:

- `hash`: The signed hash.
- `signature`: The signature to verify.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `signature` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the verification operation.

To be added.

## ECDsa.VerifyHash(Byte>, Byte>, DSASignatureFormat) method

```csharp
public bool VerifyHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided hash.

Parameters:

- `hash`: The signed hash.
- `signature`: The signature to verify.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the verification operation.

To be added.

## ECDsa.VerifyHashCore(Byte>, Byte>, DSASignatureFormat) method

```csharp
protected virtual bool VerifyHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided hash.

Parameters:

- `hash`: The signed hash.
- `signature`: The signature to verify.
- `signatureFormat`: The encoding format for `signature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the verification operation.

To be added.
