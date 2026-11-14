---
title: "DSA class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSA.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSA class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class DSA : System.Security.Cryptography.AsymmetricAlgorithm
```

Represents the abstract base class from which all implementations of the Digital Signature Algorithm (`DSA`) must inherit.

#### Remarks
You can use the `DSA` class and derived classes to create digital signatures that help protect the integrity of your data.  The `DSACryptoServiceProvider` provides an implementation of this class.

To use a public-key <example-value> to digitally sign a message, the sender first applies a hash function to the message to create a message digest. The sender then encrypts the message digest with the sender's private key to create the sender's personal signature. Upon receiving the message and signature, the receiver decrypts the signature using the sender's public key to recover the message digest and hashes the message using the same hash algorithm that the sender used. If the message digest that the receiver computes exactly matches the message digest received from the sender, the receiver can assume that the message was not altered while in transit. Note that a signature can be verified by anyone, because the sender's public key is common knowledge.

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

In .NET 11 and later, DSA isn't supported on macOS. Operations that use DSA throw `PlatformNotSupportedException`.

Two different versions of the DSA algorithm exist.
The original form, described in FIPS 186-2, requires the use of SHA-1 as the hash algorithm and supports key <example-value> from 512 bits to 1024 bits in increments of 64 bits.
An updated version of the algorithm was described in FIPS 186-3, which enabled the use of the SHA-2 family of hash algorithms and added support for 2048 bit keys and 3072 bit keys.
Not all derived implementations of this type support the FIPS 186-3 enhancements to DSA. Support can be detected via the `LegalKeySizes` property.

## DSA.DSA() constructor

```csharp
protected DSA ();
```

Initializes a new instance of the `DSA` class.

To be added.

## DSA.Create() method

```csharp
public static System.Security.Cryptography.DSA Create ();
```

Creates the default cryptographic object used to perform the asymmetric algorithm.

Returns: A cryptographic object used to perform the asymmetric algorithm.

Exceptions:

- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSA.Create(Int32) method

```csharp
public static System.Security.Cryptography.DSA Create (int keySizeInBits);
```

Creates a new ephemeral DSA key with the specified key size.

Parameters:

- `keySizeInBits`: The key size, in bits.

Returns: A new ephemeral DSA key with the specified key size.

Exceptions:

- `CryptographicException`: `keySizeInBits` is not permitted by `AsymmetricAlgorithm.LegalKeySizes`.
- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSA.Create(DSAParameters) method

```csharp
public static System.Security.Cryptography.DSA Create (System.Security.Cryptography.DSAParameters parameters);
```

Creates a new ephemeral DSA key with the specified DSA key parameters.

Parameters:

- `parameters`: The parameters for the `DSA` algorithm.

Returns: A new ephemeral DSA key.

Exceptions:

- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSA.Create(String) method

```csharp
public static System.Security.Cryptography.DSA? Create (string algName);
```

Creates the specified cryptographic object used to perform the asymmetric algorithm.

Parameters:

- `algName`: The name of the specific implementation of `DSA` to use.

Returns: A cryptographic object used to perform the asymmetric algorithm.

To be added.

## DSA.CreateSignature(Byte[]) method

```csharp
public abstract byte[] CreateSignature (byte[] rgbHash);
```

When overridden in a derived class, creates the `DSA` signature for the specified hash value.

Parameters:

- `rgbHash`: The hash value to be signed.

Returns: The digital signature for the specified hash value.

To be added.

## DSA.CreateSignature(Byte[], DSASignatureFormat) method

```csharp
public byte[] CreateSignature (byte[] rgbHash, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Creates the DSA signature for the specified hash value in the indicated format.

Parameters:

- `rgbHash`: The hash value to sign.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `ArgumentNullException`: `rgbHash` is `null`.
- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.
- `CryptographicException`: An error occurred in the signing operation.

To be added.

## DSA.CreateSignatureCore(Byte>, DSASignatureFormat) method

```csharp
protected virtual byte[] CreateSignatureCore (ReadOnlySpan<byte> hash, System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Creates the DSA signature for the specified hash value in the indicated format.

Parameters:

- `hash`: The hash value to sign.
- `signatureFormat`: The encoding format to use for the signature.

Returns: The DSA signature for the specified data.

Exceptions:

- `CryptographicException`: An error occurred in the signing operation.

To be added.

## DSA.ExportParameters(Boolean) method

```csharp
public abstract System.Security.Cryptography.DSAParameters ExportParameters (bool includePrivateParameters);
```

When overridden in a derived class, exports the `DSAParameters`.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The parameters for `DSA`.

To be added.

## DSA.FromXmlString(String) method

```csharp
public override void FromXmlString (string xmlString);
```

Reconstructs a `DSA` object from an XML string.

Parameters:

- `xmlString`: The XML string to use to reconstruct the `DSA` object.

Exceptions:

- `ArgumentNullException`: The `xmlString` parameter is `null`.
- `CryptographicException`: The format of the `xmlString` parameter is not valid.

To be added.

## DSA.GetMaxSignatureSize(DSASignatureFormat) method

```csharp
public int GetMaxSignatureSize (System.Security.Cryptography.DSASignatureFormat signatureFormat);
```

Gets the largest size, in bytes, for a signature produced by this key in the indicated format.

Parameters:

- `signatureFormat`: The encoding format for a signature.

Returns: The largest size, in bytes, for a signature produced by this key in the indicated format.

Exceptions:

- `ArgumentOutOfRangeException`: `signatureFormat` is not a known format.

To be added.

## DSA.HashData(Stream, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## DSA.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected virtual byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified portion of a byte array by using a specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` that is to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

Exceptions:

- `NotImplementedException`: A derived class must override this method.

To be added.

## DSA.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

Exceptions:

- `CryptographicException`: The password is incorrect.

-or-

The contents of `source` indicate the Key <example-value> Function (KDF) to apply is the legacy PKCS#12 KDF, which requires `Char`-based passwords.

-or-

The contents of `source` do not represent an ASN.1-BER-encoded PKCS#8 EncryptedPrivateKeyInfo structure.

-or-

The contents of `source` indicate the key is for an algorithm other than the algorithm represented by this instance.

-or-

The contents of `source` represent the key in a format that is not supported.

-or-

The algorithm-specific key <example-value> failed.

#### Remarks
The password bytes are passed directly into the Key <example-value> Function (KDF) used by the algorithm indicated by the EncryptedPrivateKeyInfo contents.
This enables compatibility with other systems which use a text encoding other than UTF-8 when processing passwords with PBKDF2 (Password-Based Key <example-value> Function 2).
This method only supports the binary (BER/CER/DER) encoding of EncryptedPrivateKeyInfo.
If the value is Base64-encoded or in the PEM text format, the caller must Base64-decode the contents before calling this method.

## DSA.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

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

## DSA.ImportFromEncryptedPem(Char>, Byte>) method

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

## DSA.ImportFromEncryptedPem(Char>, Char>) method

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
