---
title: "RSA class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSA class (part 2 of 4)

## RSA.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.

-or-

The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks
When the contents of `source` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## RSA.ImportFromEncryptedPem(Char>, Byte>) method

```csharp
public override void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<byte> passwordBytes);
```

Imports an encrypted RFC 7468 PEM-encoded private key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `passwordBytes`: The bytes to use as a password when decrypting the key material.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `input` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `input` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `input` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks

The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by `pbeParameters`. This enables compatibility with other systems that use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## RSA.ImportFromEncryptedPem(Char>, Char>) method

```csharp
public override void ImportFromEncryptedPem (ReadOnlySpan<char> input, ReadOnlySpan<char> password);
```

Imports an encrypted RFC 7468 PEM-encoded private key, replacing the keys for this object.

Parameters:

- `input`: The PEM text of the encrypted key to import.
- `password`: The password to use for decrypting the key material.

Exceptions:

- `ArgumentException`: `input` does not contain a PEM-encoded key with a recognized label.

-or-

`input` contains multiple PEM-encoded keys with a recognized label.
- `CryptographicException`: The password is incorrect.

-or-

The base-64 decoded contents of the PEM text from `input` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The base-64 decoded contents of the PEM text from `input` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The base-64 decoded contents of the PEM text from `input` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks

When the base-64 decoded contents of `input` indicate an algorithm that uses PBKDF1 (Password-Based Key <example-value> Function 1) or PBKDF2 (Password-Based Key <example-value> Function 2), the password is converted to bytes via the UTF-8 encoding.

Unsupported or malformed PEM-encoded objects will be ignored. If multiple supported PEM labels are found, an exception is thrown to prevent importing a key when the key is ambiguous.

This method supports the `ENCRYPTED PRIVATE KEY` PEM label.

## RSA.ImportFromPem(Char>) method

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
- RSA PRIVATE KEY
- RSA PUBLIC KEY

## RSA.ImportParameters(RSAParameters) method

```csharp
public abstract void ImportParameters (System.Security.Cryptography.RSAParameters parameters);
```

When overridden in a derived class, imports the specified `RSAParameters`.

Parameters:

- `parameters`: The parameters for `RSA`.

To be added.

## RSA.ImportPkcs8PrivateKey(Byte>, Int32) method

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

## RSA.ImportRSAPrivateKey(Byte>, Int32) method

```csharp
public virtual void ImportRSAPrivateKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#1 RSAPrivateKey <example-value> after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#1 RSAPrivateKey <example-value> in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#1 RSAPrivateKey structure.

-or-

The key <example-value> failed.

#### Remarks
This method only supports the binary (BER/CER/DER) encoding of RSAPrivateKey.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## RSA.ImportRSAPublicKey(Byte>, Int32) method

```csharp
public virtual void ImportRSAPublicKey (ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public key from a PKCS#1 RSAPublicKey <example-value> after decryption, replacing the keys for this object.

Parameters:

- `source`: The bytes of a PKCS#1 RSAPublicKey <example-value> in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The contents of `source` do not represent an ASN.1-BER-encoded PKCS#1 RSAPublicKey structure.

-or-

The key <example-value> failed.

#### Remarks
This method only supports the binary (BER/CER/DER) encoding of RSAPublicKey.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## RSA.ImportSubjectPublicKeyInfo(Byte>, Int32) method

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

## RSA.SignData(Byte[], HashAlgorithmName, RSASignaturePadding) method

```csharp
public byte[] SignData (byte[] data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the hash value of the specified byte array using the specified hash algorithm and padding mode, and signs the resulting hash value.

Parameters:

- `data`: The input data to hash and sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `padding`: The padding mode.

Returns: The RSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

To be added.

## RSA.SignData(Stream, HashAlgorithmName, RSASignaturePadding) method

```csharp
public virtual byte[] SignData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the hash value of the specified stream using the specified hash algorithm and padding mode, and signs the resulting hash value.

Parameters:

- `data`: The input stream to hash and sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `padding`: The padding mode.

Returns: The RSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.

To be added.

## RSA.SignData(Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public byte[] SignData (ReadOnlySpan<byte> data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the hash value of the specified data and signs it.

Parameters:

- `data`: The input data to hash and sign.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `padding`: The padding mode.

Returns: The RSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `padding` or `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.
- `NotImplementedException`: This implementation has not implemented one of `RSA.TrySignData`, `RSA.TrySignHash`,
or `RSA.SignHash`.

To be added.

## RSA.SignData(Byte>, Byte>, HashAlgorithmName, RSASignaturePadding) method

```csharp
public int SignData (ReadOnlySpan<byte> data, Span<byte> destination, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Computes the hash of the provided data with the specified algorithm and sign the hash with the current key, writing the signature into a provided buffer.

Parameters:

- `data`: The input data to hash and sign.
- `destination`: The buffer to receive the RSA signature.
- `hashAlgorithm`: The hash algorithm to use to create the hash value.
- `padding`: The padding mode.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentNullException`: `padding` or `hashAlgorithm`'s `HashAlgorithmName.Name` is `null`.
- `ArgumentException`: `hashAlgorithm`'s `HashAlgorithmName.Name` is an empty string.

-or-

The buffer in `destination` is too small to hold the signature.
- `CryptographicException`: `padding` is unknown, or not supported by this implementation.

-or-

This instance represents only a public key.

-or-

An error occurred creating the signature.
- `NotImplementedException`: This implementation has not implemented one of `RSA.TrySignData`, `RSA.TrySignHash`,
or `RSA.SignHash`.

To be added.
