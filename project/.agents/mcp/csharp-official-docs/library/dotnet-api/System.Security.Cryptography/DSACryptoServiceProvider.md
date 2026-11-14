---
title: "DSACryptoServiceProvider class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSACryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSACryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class DSACryptoServiceProvider : System.Security.Cryptography.DSA, System.Security.Cryptography.ICspAsymmetricAlgorithm
```

Defines a wrapper object to access the cryptographic service provider (CSP) implementation of the `DSA` algorithm. This class cannot be inherited.

#### Remarks
You can use the `DSACryptoServiceProvider` class to create digital signatures and protect the integrity of your data.

To use a public-key <example-value> to digitally sign a message, the sender first applies a hash function to the message to create a message digest. The sender then encrypts the message digest with the sender's private key to create the sender's personal signature. Upon receiving the message and signature, the receiver decrypts the signature using the sender's public key to recover the message digest and hashes the message using the same hash algorithm that the sender used. If the message digest that the receiver computes exactly matches the message digest received from the sender, the receiver can be sure that the message was not altered while in transit. Note that a signature can be verified by anyone, because the sender's public key is common knowledge.

> **Note:**
>  The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSACryptoServiceProvider` class instead of the `DSACryptoServiceProvider` class. Use `DSACryptoServiceProvider` only for compatibility with legacy applications and data.

This algorithm supports key <example-value> from 512 bits to 1024 bits in increments of 64 bits.

## DSACryptoServiceProvider.DSACryptoServiceProvider() constructor

```csharp
public DSACryptoServiceProvider ();
```

Initializes a new instance of the `DSACryptoServiceProvider` class.

Exceptions:

- `PlatformNotSupportedException`: The current operating system is not Windows.

To be added.

## DSACryptoServiceProvider.DSACryptoServiceProvider(Int32) constructor

```csharp
public DSACryptoServiceProvider (int dwKeySize);
```

Initializes a new instance of the `DSACryptoServiceProvider` class with the specified key size.

Parameters:

- `dwKeySize`: The size of the key for the asymmetric algorithm in bits.

Exceptions:

- `PlatformNotSupportedException`: The current operating system is not Windows.

To be added.

## DSACryptoServiceProvider.DSACryptoServiceProvider(CspParameters) constructor

```csharp
public DSACryptoServiceProvider (System.Security.Cryptography.CspParameters? parameters);
```

Initializes a new instance of the `DSACryptoServiceProvider` class with the specified parameters for the cryptographic service provider (CSP).

Parameters:

- `parameters`: The parameters for the CSP.

Exceptions:

- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSACryptoServiceProvider.DSACryptoServiceProvider(Int32, CspParameters) constructor

```csharp
public DSACryptoServiceProvider (int dwKeySize, System.Security.Cryptography.CspParameters? parameters);
```

Initializes a new instance of the `DSACryptoServiceProvider` class with the specified key size and parameters for the cryptographic service provider (CSP).

Parameters:

- `dwKeySize`: The size of the key for the cryptographic algorithm in bits.
- `parameters`: The parameters for the CSP.

Exceptions:

- `CryptographicException`: The CSP cannot be acquired.

-or-

The key <example-value> be created.
- `ArgumentOutOfRangeException`: `dwKeySize` is out of range.
- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSACryptoServiceProvider.CspKeyContainerInfo property

```csharp
public System.Security.Cryptography.CspKeyContainerInfo CspKeyContainerInfo { get; }
```

Gets a `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

Returns: A `CspKeyContainerInfo` object that describes additional information about a cryptographic key pair.

#### Remarks
Use the `CspKeyContainerInfo` property to retrieve additional information about a cryptographic key pair.  The returned `CspKeyContainerInfo` object describes whether the key is exportable, and specifies the key <example-value> name, information about the provider, and other information.

In cases where a random key is generated, a key <example-value> will not be created until you call a method that uses the key.  Some properties of the `CspKeyContainerInfo` object returned by the `CspKeyContainerInfo` property will throw a `CryptographicException` if a key <example-value> has not been created.  To make sure that a key <example-value> has been created, call a method such as `DSACryptoServiceProvider.SignData`, `DSACryptoServiceProvider.SignHash`, `DSACryptoServiceProvider.VerifyData`, `DSACryptoServiceProvider.VerifyHash`, and so on, before you call the `CspKeyContainerInfo` property.

## DSACryptoServiceProvider.KeyExchangeAlgorithm property

```csharp
public override string? KeyExchangeAlgorithm { get; }
```

Gets the name of the key <example-value> algorithm.

Returns: The name of the key <example-value> algorithm.

To be added.

## DSACryptoServiceProvider.KeySize property

```csharp
public override int KeySize { get; }
```

Gets the size of the key used by the asymmetric algorithm in bits.

Returns: The size of the key used by the asymmetric algorithm.

#### Remarks
This algorithm supports key <example-value> from 512 bits to 1024 bits in increments of 64 bits.

The `DSACryptoServiceProvider` class does not allow you to change key sizes using the `KeySize` property.  Any value written to this property will fail to update the property without error.  To change the key size, use one of the constructor overloads.

## DSACryptoServiceProvider.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes that are supported by the asymmetric algorithm.

Returns: Only key sizes that match an entry in this array are supported by the asymmetric algorithm.

#### Remarks
Only values represented in this array are valid for the property `KeySize`.

This algorithm supports key <example-value> from 512 bits to 1024 bits in increments of 64 bits.

## DSACryptoServiceProvider.PersistKeyInCsp property

```csharp
public bool PersistKeyInCsp { get; set; }
```

Gets or sets a value indicating whether the key <example-value> be persisted in the cryptographic service provider (CSP).

Returns: `true` if the key <example-value> be persisted in the CSP; otherwise, `false`.

#### Remarks
Use this property when you want to persist a key in a key container.

## DSACryptoServiceProvider.PublicOnly property

```csharp
public bool PublicOnly { get; }
```

Gets a value that indicates whether the `DSACryptoServiceProvider` object contains only a public key.

Returns: `true` if the `DSACryptoServiceProvider` object contains only a public key; otherwise, `false`.

#### Remarks
The `DSACryptoServiceProvider` class can be initialized either with a public key only or with both a public and private key.  Use the `PublicOnly` property to determine whether the current instance contains only a public key or both a public and private key.

## DSACryptoServiceProvider.SignatureAlgorithm property

```csharp
public override string SignatureAlgorithm { get; }
```

Gets the name of the signature algorithm.

Returns: The name of the signature algorithm.

To be added.

## DSACryptoServiceProvider.UseMachineKeyStore property

```csharp
public static bool UseMachineKeyStore { get; set; }
```

Gets or sets a value indicating whether the key <example-value> be persisted in the computer's key store instead of the user profile store.

Returns: `true` if the key <example-value> be persisted in the computer key store; otherwise, `false`.

Setting this property to `true` is equivalent to passing the `DSACryptoServiceProvider.UseMachineKeyStore` flag to a `CspParameters` object. The `UseMachineKeyStore` property applies to all code in the application domain, while the `CspParameters` object applies only to classes that explicitly reference it. These settings are useful when impersonating or running under an account whose user profile is not loaded.

## DSACryptoServiceProvider.CreateSignature(Byte[]) method

```csharp
public override byte[] CreateSignature (byte[] rgbHash);
```

Creates the `DSA` signature for the specified data.

Parameters:

- `rgbHash`: The data to be signed.

Returns: The digital signature for the specified data.

To be added.

## DSACryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the resources used by the current instance of the `DSACryptoServiceProvider` class.

Parameters:

- `disposing`: `true` to release managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## DSACryptoServiceProvider.ExportCspBlob(Boolean) method

```csharp
public byte[] ExportCspBlob (bool includePrivateParameters);
```

Exports a blob containing the key <example-value> associated with a `DSACryptoServiceProvider` object.

Parameters:

- `includePrivateParameters`: `true` to include the private key; otherwise, `false`.

Returns: A byte array containing the key <example-value> associated with a `DSACryptoServiceProvider` object.

#### Remarks
The `DSACryptoServiceProvider.ExportCspBlob` method returns a blob containing key <example-value> that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## DSACryptoServiceProvider.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.DSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the `DSAParameters`.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The parameters for `DSA`.

Exceptions:

- `CryptographicException`: The key <example-value> be exported.

To be added.

## DSACryptoServiceProvider.HashData(Stream, HashAlgorithmName) method

```csharp
protected override byte[] HashData (System.IO.Stream data, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Computes the hash value of a specified binary stream by using a specified hashing algorithm.

Parameters:

- `data`: The binary stream to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## DSACryptoServiceProvider.HashData(Byte[], Int32, Int32, HashAlgorithmName) method

```csharp
protected override byte[] HashData (byte[] data, int offset, int count, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

When overridden in a derived class, computes the hash value of a specified portion of a byte array by using a specified hashing algorithm.

Parameters:

- `data`: The data to be hashed.
- `offset`: The index of the first byte in `data` to be hashed.
- `count`: The number of bytes to hash.
- `hashAlgorithm`: The algorithm to use to hash the data.

Returns: The hashed data.

To be added.

## DSACryptoServiceProvider.ImportCspBlob(Byte[]) method

```csharp
public void ImportCspBlob (byte[] keyBlob);
```

Imports a blob that represents DSA key information.

Parameters:

- `keyBlob`: A byte array that represents a DSA key blob.

#### Remarks
The `DSACryptoServiceProvider.ImportCspBlob` method initializes the key data of a `DSACryptoServiceProvider` object using a blob that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## DSACryptoServiceProvider.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## DSACryptoServiceProvider.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## DSACryptoServiceProvider.ImportParameters(DSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.DSAParameters parameters);
```

Imports the specified `DSAParameters`.

Parameters:

- `parameters`: The parameters for `DSA`.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The `parameters` parameter has missing fields.

To be added.

## DSACryptoServiceProvider.SignData(Byte[]) method

```csharp
public byte[] SignData (byte[] buffer);
```

Computes the hash value of the specified byte array and signs the resulting hash value.

Parameters:

- `buffer`: The input data for which to compute the hash.

Returns: The `DSA` signature for the specified data.

#### Remarks
This method creates a digital signature that is verified using the `DSACryptoServiceProvider.VerifyData` method.

`DSA` uses the `SHA1` hash algorithm.

## DSACryptoServiceProvider.SignData(Stream) method

```csharp
public byte[] SignData (System.IO.Stream inputStream);
```

Computes the hash value of the specified input stream and signs the resulting hash value.

Parameters:

- `inputStream`: The input data for which to compute the hash.

Returns: The `DSA` signature for the specified data.

#### Remarks
`DSA` uses the `SHA1` hash algorithm.
