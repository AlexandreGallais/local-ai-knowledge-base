---
title: "DSA class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSA class (part 3 of 4)

## DSA.TryExportEncryptedPkcs8PrivateKey(Byte>, PbeParameters, Byte>, Int32) method

```csharp
public override bool TryExportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, System.Security.Cryptography.PbeParameters pbeParameters, Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 EncryptedPrivateKeyInfo format into a provided buffer, using a byte-based password.

Parameters:

- `passwordBytes`: The bytes to use as a password when encrypting the key material.
- `pbeParameters`: The password-based encryption (PBE) parameters to use when encrypting the key material.
- `destination`: The byte span to receive the PKCS#8 EncryptedPrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

-or-

`pbeParameters` indicates that `PbeEncryptionAlgorithm.TripleDes3KeyPkcs12` should be used, which requires `Char`-based passwords.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

## DSA.TryExportEncryptedPkcs8PrivateKey(Char>, PbeParameters, Byte>, Int32) method

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

Exceptions:

- `CryptographicException`: The key could not be exported.

#### Remarks
When `pbeParameters` indicates an algorithm that uses PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

## DSA.TryExportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override bool TryExportPkcs8PrivateKey (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the PKCS#8 PrivateKeyInfo format into a provided buffer.

Parameters:

- `destination`: The byte span to receive the PKCS#8 PrivateKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `CryptographicException`: The key could not be exported.

To be added.

## DSA.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

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

## DSA.TryHashData(Byte>, Byte>, HashAlgorithmName, Int32) method

```csharp
protected virtual bool TryHashData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, out int bytesWritten);
```

Attempts to compute the hash value of the provided data into a provided buffer.

Parameters:

- `data`: The data to be hashed.
- `destination`: The byte span to receive the hash value.
- `hashAlgorithm`: The name of the hash algorithm to use.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`.

Returns: `true` if `destination` is large enough to receive the result; otherwise, `false`.

#### Remarks
The default implementation of this method is to call `HashData` and copy the result to `destination`.

Derived types should override this method to avoid the intermediate array creation.

## DSA.TrySignData(Byte>, Byte>, HashAlgorithmName, Int32) method

```csharp
public virtual bool TrySignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, out int bytesWritten);
```

Attempts to create the DSA signature for the specified data into the provided buffer.

Parameters:

- `data`: The data to hash and sign.
- `destination`: The byte span to receive the signature.
- `hashAlgorithm`: The name of the hash algorithm to use.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`.

Returns: `true` if `destination` is large enough to receive the result; otherwise, `false`.

To be added.

## DSA.TrySignData(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat, Int32) method

```csharp
public bool TrySignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the DSA signature for the specified data in the indicated format and place it into the provided buffer.

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

## DSA.TrySignDataCore(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat, Int32) method

```csharp
protected virtual bool TrySignDataCore (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the DSA signature for the specified data in the indicated format and place it into the provided buffer.

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

## DSA.VerifyData(Byte[], Byte[], HashAlgorithmName) method

```csharp
public bool VerifyData (byte[] data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is valid by calculating the hash value of the specified data using the specified hash algorithm and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the digital signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.
- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash algorithm is not SHA-1.

-or-

Verifying the signature otherwise failed.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## DSA.VerifyData(Stream, Byte[], HashAlgorithmName) method

```csharp
public virtual bool VerifyData (System.IO.Stream data, byte[] signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is valid by calculating the hash value of the specified stream using the specified hash algorithm and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature data to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the digital signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`signature` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash algorithm is not SHA-1.

-or-

Verifying the signature otherwise failed.

To be added.

## DSA.VerifyData(Byte>, Byte>, HashAlgorithmName) method

```csharp
public virtual bool VerifyData (ReadOnlySpan<byte> data, ReadOnlySpan<byte> signature, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Verifies that a digital signature is valid by calculating the hash value of the data in a byte span using the specified hash algorithm and comparing it to the provided signature.

Parameters:

- `data`: The signed data.
- `signature`: The signature to be verified.
- `hashAlgorithm`: The hash algorithm used to create the hash value of the data.

Returns: `true` if the digital signature is valid; otherwise, `false`.

Exceptions:

- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: The implementation type only supports legacy DSA (FIPS 186-2), and the hash algorithm is not SHA-1.

-or-

Verifying the signature otherwise failed.

To be added.

## DSA.VerifyData(Byte[], Byte[], HashAlgorithmName, DSASignatureFormat) method

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

## DSA.VerifyData(Stream, Byte[], HashAlgorithmName, DSASignatureFormat) method

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

## DSA.VerifyData(Byte>, Byte>, HashAlgorithmName, DSASignatureFormat) method

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
