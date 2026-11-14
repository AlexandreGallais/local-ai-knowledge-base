---
title: "RSACng class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSACng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACng class (part 2 of 2)

## RSACng.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

```csharp
public override bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a char-based password.

Parameters:

- `password`: The password to use when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.

## RSACng.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

To be added.

## RSACng.TrySignHash(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding, Int32) method

```csharp
public override bool TrySignHash (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding, out int bytesWritten);
```

Attempts to sign the hash with the current key, writing the signature into a provided buffer.

Parameters:

- `hash`: The hash value of the data to be signed.
- `destination`: The buffer to receive the RSA signature.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.
- `padding`: The padding.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the RSA signature; otherwise, `false`.

To be added.

## RSACng.VerifyHash(Byte[], Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public override bool VerifyHash (byte[] hash, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies data that was signed and already hashed with the specified algorithm and padding mode.

Parameters:

- `hash`: The hash to verify.
- `signature`: The signature of the data.
- `hashAlgorithm`: The hash algorithm name.
- `padding`: The padding mode.

Returns: `true` if the signature verifies for the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` is `null`.

-or-

`signature` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: The value of the `HashAlgorithmName.Name` property of `hashAlgorithm` is `null` or `String.Empty`.
- `CryptographicException`: `padding` does not equal `RSASignaturePadding.Pkcs1` or `RSASignaturePadding.Pss`.

To be added.

## RSACng.VerifyHash(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public override bool VerifyHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Verifies that a digital signature is valid by determining the hash value in the signature using the specified hash algorithm and padding, and comparing it to the provided hash value.

Parameters:

- `hash`: The hash value of the signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value.
- `padding`: The padding mode.

Returns: `true` if the signature is valid; otherwise, `false`.

To be added.
