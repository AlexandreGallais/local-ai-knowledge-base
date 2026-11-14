---
title: "DSA class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSA class (part 4 of 4)

## DSA.VerifyData(Byte[], Int32, Int32, Byte[], HashAlgorithmName) method

```csharp
public virtual bool VerifyData (byte[] data, int offset, int count, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is valid by calculating the hash value of the data in a portion of a byte array using the specified hash algorithm and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `offset`: The starting index at which to compute the hash.
- `count`: The number of bytes to hash.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the digital signature is valid; otherwise, `false`.

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
- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash algorithm is not SHA-1.

-or-

Verifying the signature otherwise failed.

To be added.

## DSA.VerifyData(Byte[], Int32, Int32, Byte[], HashAlgorithmName, DSASignatureFormat) method

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

## DSA.VerifyDataCore(Stream, Byte>, HashAlgorithmName, DSASignatureFormat) method

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

## DSA.VerifyDataCore(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat) method

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

## DSA.VerifySignature(Byte[], Byte[]) method

```csharp
public abstract bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

When overridden in a derived class, verifies the `DSA` signature for the specified data.

Parameters:

- `rgbHash`: The hash of the data signed with `rgbSignature`.
- `rgbSignature`: The signature to be verified for `rgbData`.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash algorithm and key on `rgbHash`; otherwise, `false`.

Exceptions:

- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash value is not 20 bytes long.

-or-

Verifying the signature otherwise failed.

To be added.

## DSA.VerifySignature(Byte>, Byte>) method

```csharp
public virtual bool VerifySignature (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature);
```

Verifies that a digital signature is valid for a provided data hash.

Parameters:

- `hash`: The data hash to verify.
- `signature`: The signature to be verify.

Returns: `true` if the digital signature is valid for the hash; otherwise, `false`.

Exceptions:

- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash value is not 20 bytes long.

-or-

Verifying the signature otherwise failed.

#### Remarks
The default implementation of this method calls `VerifySignature` after copying the spans to arrays.
Derived types should override this method to avoid the intermediate array creation.

## DSA.VerifySignature(Byte[], Byte[], DSASignatureFormat) method

```csharp
public bool VerifySignature (byte[] rgbHash, byte[] rgbSignature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Verifies that a digital signature is valid for the provided hash.

Parameters:

- `rgbHash`: The signed hash.
- `rgbSignature`: The signature to verify.
- `signatureFormat`: The encoding format for `rgbSignature`.

Returns: `true` if the digital signature is valid for the provided data; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `rgbHash` or `rgbSignature` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the verification operation.

To be added.

## DSA.VerifySignature(Byte>, Byte>, DSASignatureFormat) method

```csharp
public bool VerifySignature (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
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

## DSA.VerifySignatureCore(Byte>, Byte>, DSASignatureFormat) method

```csharp
protected virtual bool VerifySignatureCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.DSASignatureFormat signatureFormat);
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
