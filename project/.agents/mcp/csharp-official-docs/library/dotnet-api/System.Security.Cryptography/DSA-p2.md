---
title: "DSA class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSA class (part 2 of 4)

## DSA.ImportFromPem(Char>) method

```csharp
public override void ImportFromPem (ReadOnlySpan<char> input);
```

Imports an RFC 7468 PEM-encoded key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the key to import.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.

-or-

`input` contains an encrypted PEM-encoded key.

#### Remarks

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is raised to prevent importing a key when the key is ambiguous.

This method supports the following PEM labels:

- PUBLIC KEY
- PRIVATE KEY

## DSA.ImportParameters(DSAParameters) method

```csharp
public abstract void ImportParameters (System.Security.Cryptography.DSAParameters parameters);
```

When overridden in a derived class, imports the specified `DSAParameters`.

Parameters:

- `parameters`: The parameters for `DSA`.

Exceptions:

- `ArgumentException`: `parameters` is missing required fields.

-or-

`parameters` has fields with inconsistent lengths for a valid key.
- `CryptographicException`: `parameters` does not represent a valid DSA key <example-value> set.

To be added.

## DSA.ImportPkcs8PrivateKey(Byte>, Int32) method

```csharp
public override void ImportPkcs8PrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 PrivateKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#8 PrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 PrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks
This method only supports the binary (BER/CER/DER) encoding of PrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## DSA.ImportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public override void ImportSubjectPublicKeyInfo (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public key from an X.509 SubjectPublicKeyInfo structure after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of an X.509 SubjectPublicKeyInfo structure in the ASN.1-DER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-DER-encoded X.509 SubjectPublicKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks
This method only supports the binary (DER) encoding of SubjectPublicKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## DSA.SignData(Byte[], HashAlgorithmName) method

```csharp
public byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified byte array using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input data for which to compute the hash.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## DSA.SignData(Stream, HashAlgorithmName) method

```csharp
public virtual byte[] SignData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of the specified stream using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input stream for which to compute the hash.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## DSA.SignData(Byte[], HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## DSA.SignData(Stream, HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## DSA.SignData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
public virtual byte[] SignData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a portion of the specified byte array using the specified hash algorithm and signs the resulting hash value.

Parameters:

- `data`: The input data for which to compute the hash.
- `offset`: The offset into the array at which to begin using data.
- `count`: The number of bytes in the array to use as data.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`count` is less than zero.

-or-

`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.

To be added.

## DSA.SignData(Byte[], Int32, Int32, HashAlgorithmName, DSASignatureFormat) method

```csharp
public byte[] SignData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `offset`: The offset into `data` at which to begin hashing.
- `count`: The number of bytes to read from `data`.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

-or-
`offset` is less than zero.

-or-
`count` is less than zero.

-or-
`offset` + `count` - 1 results in an index that is beyond the upper bound of `data`.
- `ArgumentException`: `hashAlgorithm` has a `null` or empty `HashAlgorithmName.Name`.
- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## DSA.SignDataCore(Stream, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual byte[] SignDataCore (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## DSA.SignDataCore(Byte>, HashAlgorithmName, DSASignatureFormat) method

```csharp
protected virtual byte[] SignDataCore (ReadOnlySpan<byte> data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Computes the hash value of the specified data and signs it using the specified signature format.

Parameters:

- `data`: The data to sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the hashing or signing operation.

To be added.

## DSA.ToXmlString(Boolean) method

```csharp
public override string ToXmlString (bool includePrivateParameters);
```

Creates and returns an XML string representation of the current `DSA` object.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: An XML string encoding of the current `DSA` object.

To be added.

## DSA.TryCreateSignature(Byte>, Byte>, Int32) method

```csharp
public virtual bool TryCreateSignature (ReadOnlySpan<byte> hash, Span<byte> destination, out int bytesWritten);
```

Attempts to create the DSA signature for the specified hash into the provided buffer.

Parameters:

- `hash`: The hash to sign.
- `destination`: The byte span to receive the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`.

Returns: `true` if `destination` is large enough to receive the result; otherwise, `false`.

Exceptions:

- `CryptographicException`: This instance represents only a public key.

-or-

The implementation type only supports legacy DSA (FIPS 186-2), and `hash` is not a 20-byte value.

-or-

Creating the signature otherwise failed.

#### Remarks
The default implementation of this method is to call `CreateSignature` and copy the result to `destination`.
Derived types should override this method to avoid the intermediate array creation.

## DSA.TryCreateSignature(Byte>, Byte>, DSASignatureFormat, Int32) method

```csharp
public bool TryCreateSignature (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the DSA signature for the specified hash value in the indicated format and place it into the provided buffer.

Parameters:

- `hash`: The hash value to sign.
- `destination`: The buffer to receive the signature.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is large enough to receive the signature; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## DSA.TryCreateSignatureCore(Byte>, Byte>, DSASignatureFormat, Int32) method

```csharp
protected virtual bool TryCreateSignatureCore (ReadOnlySpan<byte> hash, Span<byte> destination, System.Security.Cryptography.DSASignatureFormat signatureFormat, out int bytesWritten);
```

Attempts to create the DSA signature for the specified hash value in the indicated format and place it into the provided buffer.

Parameters:

- `hash`: The hash value to sign.
- `destination`: The buffer to receive the signature.
- `signatureFormat`: The encoding format to use for the signature.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is large enough to receive the signature; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

To be added.
