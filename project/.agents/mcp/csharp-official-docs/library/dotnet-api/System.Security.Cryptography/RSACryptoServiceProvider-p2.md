---
title: "RSACryptoServiceProvider class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSACryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACryptoServiceProvider class (part 2 of 3)

## RSACryptoServiceProvider.UseMachineKeyStore property

```csharp
public static bool UseMachineKeyStore { get; set; }
```

Gets or sets a value indicating whether the key <example-value> be persisted in the computer's key store instead of the user profile store.

Returns: `true` if the key <example-value> be persisted in the computer key store; otherwise, `false`.

Setting this property to `true` is equivalent to passing the `UseMachineKeyStore` flag to a `CspParameters` object. The `UseMachineKeyStore` property applies to all code in the application domain, whereas the `CspParameters` object applies only to classes that explicitly reference it. These settings are useful when impersonating or running under an account whose user profile is not loaded. Setting `RSACryptoServiceProvider.UseMachineKeyStore` affects the key store location only if `RSACryptoServiceProvider` is initialized with no parameters.

#### Examples
The following code example creates an `RSACryptoServiceProvider` object and sets the static `UseMachineKeyStore` property to use the machine key store instead of the user profile key store.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/UseMachineKeyStore/example2.cs._

## RSACryptoServiceProvider.Decrypt(Byte[], Boolean) method

```csharp
public byte[] Decrypt (byte[] rgb, bool fOAEP);
```

Decrypts data with the `RSA` algorithm.

Parameters:

- `rgb`: The data to be decrypted.
- `fOAEP`: `true` to perform direct `RSA` decryption using OAEP padding; otherwise, `false` to use PKCS#1 v1.5 padding.

Returns: The decrypted data, which is the original plain text before encryption.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The `fOAEP` parameter is `true` and the length of the `rgb` parameter is greater than `RSACryptoServiceProvider.KeySize`.

-or-

The key does not match the encrypted data. However, the exception wording may not be accurate. For example, it may say `Not enough storage is available to process this command`.
- `ArgumentNullException`: `rgb` is `null`.

#### Remarks
Use `RSACryptoServiceProvider.Encrypt` to encrypt data for decryption with this method.

#### Examples
The following code example encrypts and decrypts data.

This example uses the `ASCIIEncoding` class; however, the `UnicodeEncoding` class may be preferable in large data operations. The encrypted value can be saved as an `nvarchar` data type in Microsoft SQL Server.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Decrypt/example.cs._

## RSACryptoServiceProvider.Decrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Decrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Decrypts data that was previously encrypted with the `RSA` algorithm by using the specified padding.

Parameters:

- `data`: The data to decrypt.
- `padding`: The padding.

Returns: The decrypted data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: The padding mode is not supported.

#### Remarks
`padding` must be either `RSAEncryptionPadding.Pkcs1` or `RSAEncryptionPadding.OaepSHA1`.

## RSACryptoServiceProvider.DecryptValue(Byte[]) method

```csharp
public override byte[] DecryptValue (byte[] rgb);
```

This method is not supported in the current version.

Parameters:

- `rgb`: The data to be decrypted.

Returns: The decrypted data, which is the original plain text before encryption.

Exceptions:

- `NotSupportedException`: This method is not supported in the current version.

To be added.

## RSACryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `RSACryptoServiceProvider` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## RSACryptoServiceProvider.Encrypt(Byte[], Boolean) method

```csharp
public byte[] Encrypt (byte[] rgb, bool fOAEP);
```

Encrypts data with the `RSA` algorithm.

Parameters:

- `rgb`: The data to be encrypted.
- `fOAEP`: `true` to perform direct `RSA` encryption using OAEP padding; `false` to use PKCS#1 v1.5 padding.

Returns: The encrypted data.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The length of the `rgb` parameter is greater than the maximum allowed length.
- `ArgumentNullException`: `rgb` is `null`.

#### Remarks
The following table describes the padding supported by different versions of Microsoft Windows and the maximum length of `rgb` allowed by the different combinations of operating systems and padding.

|Padding|Maximum Length of rgb Parameter|
|-------------|-------------------------------------|
|OAEP padding (PKCS#1 v2)|Modulus size -2 -2*hLen, where hLen is the size of the hash.|
|Direct Encryption (PKCS#1 v1.5)|Modulus size - 11. (11 bytes is the minimum padding possible.)|

Use `RSACryptoServiceProvider.Decrypt` to decrypt the results of this method.

#### Examples
The following code example initializes an `RSACryptoServiceProvider` object to the value of a public key (sent by another party), generates a session key using the `Aes` algorithm, and then encrypts the session key using the `RSACryptoServiceProvider` object.  Using this scheme, the session key could be sent back to the owner of the private RSA key and the two parties could use the session key to exchange encrypted data.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Encrypt/sample.cs._

## RSACryptoServiceProvider.Encrypt(Byte[], RSAEncryptionPadding) method

```csharp
public override byte[] Encrypt (byte[] data, System.Security.Cryptography.RSAEncryptionPadding padding);
```

Encrypts data with the `RSA` algorithm using the specified padding.

Parameters:

- `data`: The data to encrypt.
- `padding`: The padding.

Returns: The encrypted data.

Exceptions:

- `ArgumentNullException`: `data` is `null`.

-or-

`padding` is `null`.
- `CryptographicException`: The padding mode is not supported.

#### Remarks
`padding` must be either `RSAEncryptionPadding.Pkcs1` or `RSAEncryptionPadding.OaepSHA1`.

## RSACryptoServiceProvider.EncryptValue(Byte[]) method

```csharp
public override byte[] EncryptValue (byte[] rgb);
```

This method is not supported in the current version.

Parameters:

- `rgb`: The data to be encrypted.

Returns: The encrypted data.

Exceptions:

- `NotSupportedException`: This method is not supported in the current version.

To be added.

## RSACryptoServiceProvider.ExportCspBlob(Boolean) method

```csharp
public byte[] ExportCspBlob (bool includePrivateParameters);
```

Exports a blob containing the key <example-value> associated with an `RSACryptoServiceProvider` object.

Parameters:

- `includePrivateParameters`: `true` to include the private key; otherwise, `false`.

Returns: A byte array containing the key <example-value> associated with an `RSACryptoServiceProvider` object.

#### Remarks
The `RSACryptoServiceProvider.ExportCspBlob` method returns a blob containing key <example-value> that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## RSACryptoServiceProvider.ExportParameters(Boolean) method

```csharp
public override System.Security.Cryptography.RSAParameters ExportParameters (bool includePrivateParameters);
```

Exports the `RSAParameters`.

Parameters:

- `includePrivateParameters`: `true` to include private parameters; otherwise, `false`.

Returns: The parameters for `RSA`.

Exceptions:

- `CryptographicException`: The key <example-value> be exported.

#### Examples
The following code example exports the key <example-value> created using the `RSACryptoServiceProvider` into an `RSAParameters` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/Overview/sample1.cs._

## RSACryptoServiceProvider.ImportCspBlob(Byte[]) method

```csharp
public void ImportCspBlob (byte[] keyBlob);
```

Imports a blob that represents RSA key information.

Parameters:

- `keyBlob`: A byte array that represents an RSA key blob.

#### Remarks
The `RSACryptoServiceProvider.ImportCspBlob` method initializes the key data of an `RSACryptoServiceProvider` object using a blob that is compatible with the unmanaged Microsoft Cryptographic API (CAPI).

## RSACryptoServiceProvider.ImportEncryptedPkcs8PrivateKey(Byte>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<byte> passwordBytes, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a byte-based password, replacing the keys for this object.

Parameters:

- `passwordBytes`: The bytes to use as a password when decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## RSACryptoServiceProvider.ImportEncryptedPkcs8PrivateKey(Char>, Byte>, Int32) method

```csharp
public override void ImportEncryptedPkcs8PrivateKey (ReadOnlySpan<char> password, ReadOnlySpan<byte> source, out int bytesRead);
```

Imports the public/private keypair from a PKCS#8 EncryptedPrivateKeyInfo structure after decrypting with a char-based password, replacing the keys for this object.

Parameters:

- `password`: The password to use for decrypting the key material.
- `source`: The bytes of a PKCS#8 EncryptedPrivateKeyInfo structure in the ASN.1-BER encoding.
- `bytesRead`: When this method returns, contains a value that indicates the number of bytes read from `source`. This parameter is treated as uninitialized.

To be added.

## RSACryptoServiceProvider.ImportParameters(RSAParameters) method

```csharp
public override void ImportParameters (System.Security.Cryptography.RSAParameters parameters);
```

Imports the specified `RSAParameters`.

Parameters:

- `parameters`: The parameters for `RSA`.

Exceptions:

- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The `parameters` parameter has missing fields.

#### Examples
The following code example imports key <example-value> created from an `RSAParameters` object into an `RSACryptoServiceProvider` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/ImportParameters/sample.cs._

## RSACryptoServiceProvider.SignData(Byte[], Object) method

```csharp
public byte[] SignData (byte[] buffer, object halg);
```

Computes the hash value of the specified byte array using the specified hash algorithm, and signs the resulting hash value.

Parameters:

- `buffer`: The input data to hash and sign.
- `halg`: The hash algorithm to use to create the hash value.

Returns: The `RSA` signature for the specified data.

Exceptions:

- `ArgumentNullException`: The `halg` parameter is `null`.
- `ArgumentException`: The `halg` parameter is not a valid type.

#### Remarks
This method creates a digital signature that is verified using the `RSACryptoServiceProvider.VerifyData` method.

The `halg` parameter can accept a `String`, a `HashAlgorithm`, or a `Type`.

#### Examples
The following code example signs and verifies data.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignData/example1.cs._

## RSACryptoServiceProvider.SignData(Stream, Object) method

```csharp
public byte[] SignData (System.IO.Stream inputStream, object halg);
```

Computes the hash value of the specified input stream using the specified hash algorithm, and signs the resulting hash value.

Parameters:

- `inputStream`: The input stream to hash and sign.
- `halg`: The hash algorithm to use to create the hash value.

Returns: The `RSA` signature for the specified data.

Exceptions:

- `ArgumentNullException`: The `halg` parameter is `null`.
- `ArgumentException`: The `halg` parameter is not a valid type.

#### Remarks
The `halg` parameter can accept a `String`, a `HashAlgorithm`, or a `Type`.

#### Examples
The following code example signs and verifies data.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignData/example2.cs._

## RSACryptoServiceProvider.SignData(Byte[], Int32, Int32, Object) method

```csharp
public byte[] SignData (byte[] buffer, int offset, int count, object halg);
```

Computes the hash value of a subset of the specified byte array using the specified hash algorithm, and signs the resulting hash value.

Parameters:

- `buffer`: The input data to hash and sign.
- `offset`: The offset into the array from which to begin using data.
- `count`: The number of bytes in the array to use as data.
- `halg`: The hash algorithm to use to create the hash value.

Returns: The `RSA` signature for the specified data.

Exceptions:

- `ArgumentNullException`: The `halg` parameter is `null`.
- `ArgumentException`: The `halg` parameter is not a valid type.

#### Remarks
This method creates a digital signature that is verified using the `RSACryptoServiceProvider.VerifyData` method.

The `halg` parameter can accept a `String`, a `HashAlgorithm`, or a `Type`. The string value can be one of the following:

- The object identifier (OID) friendly name of the hash algorithm to use, either a name registered in the crypto config file or one in the Crypto API OID table.

- The OID value. The OID must be one recognized by the Crypto API.

For example, you could use SignData(new byte[5], "1.3.14.3.2.26") or SignData(new byte[5], "sha1"), or SignData(new byte[5], "SHA1").

#### Examples
The following code example signs and verifies data.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RSACryptoServiceProvider/SignData/example.cs._
