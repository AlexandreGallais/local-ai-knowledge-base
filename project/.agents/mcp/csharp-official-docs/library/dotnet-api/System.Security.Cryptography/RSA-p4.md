---
title: "RSA class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSA class (part 4 of 4)

## RSA.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public override bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the X.509 SubjectPublicKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the X.509 SubjectPublicKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## RSA.TryHashData(Byte>, Byte>, HashAlgorithmName, Int32) method

```csharp
protected virtual bool TryHashData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, out int bytesWritten);
```

Attempts to compute the hash of the provided data by using the specified algorithm, writing the results into a provided buffer.

Parameters:

- `data`: The data to be hashed.
- `destination`: The buffer to receive the hash value.
- `hashAlgorithm`: The algorithm to use in hash the data.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the hash value; otherwise, `false`.

#### Remarks
The default implementation of this method calls `HashData` and copies the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

## RSA.TrySignData(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding, Int32) method

```csharp
public virtual bool TrySignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding, out int bytesWritten);
```

Attempts to hash the provided data with the specified algorithm and sign the hash with the current key, writing the signature into a provided buffer.

Parameters:

- `data`: The input data to hash and sign.
- `destination`: The buffer to receive the RSA signature.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding mode.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the RSA signature; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: This instance represents only a public key.

-or-

An error occurred creating the signature.

#### Remarks
The RSA signature algorithm will always produce an output equal to the number of bytes required for `KeySize` bits.

## RSA.TrySignHash(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding, Int32) method

```csharp
public virtual bool TrySignHash (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding, out int bytesWritten);
```

Attempts to sign the hash with the current key, writing the signature into a provided buffer.

Parameters:

- `hash`: The hash value of the data to be signed.
- `destination`: The buffer to receive the RSA signature.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the RSA signature; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

#### Remarks
The default implementation of this method calls `SignHash` and copies the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

The RSA signature algorithm will always produce an output equal to the number of bytes required for `KeySize` bits.

## RSA.VerifyData(Byte[], Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public bool VerifyData (byte[] data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by calculating the hash value of the specified data using the specified hash algorithm and padding, and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.

## RSA.VerifyData(Stream, Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public bool VerifyData (System.IO.Stream data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by calculating the hash value of the specified stream using the specified hash algorithm and padding, and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.

## RSA.VerifyData(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual bool VerifyData (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by calculating the hash value of the specified data using the specified hash algorithm and padding, and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.

## RSA.VerifyData(Byte[], Int32, Int32, Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual bool VerifyData (byte[] data, int offset, int count, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by calculating the hash value of the data in a portion of a byte array using the specified hash algorithm and padding, and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `offset`: The starting index at which to compute the hash.
- `count`: The number of bytes to hash.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.

## RSA.VerifyHash(Byte[], Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual bool VerifyHash (byte[] hash, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the specified hash algorithm and padding, and comparing it to the provided hash value.

Parameters:

- `hash`: The hash value of the signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `NotImplementedException`: A derived class must override this method.
- `ArgumentNullException`: `hash` or `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

To be added.

## RSA.VerifyHash(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual bool VerifyHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the specified hash algorithm and padding, and comparing it to the provided hash value.

Parameters:

- `hash`: The hash value of the signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

#### Remarks
The default implementation of this method is to copy `hash` and `signature` to new arrays and call `VerifyHash`.
Derived types should override this method to avoid the intermediate array creation.
