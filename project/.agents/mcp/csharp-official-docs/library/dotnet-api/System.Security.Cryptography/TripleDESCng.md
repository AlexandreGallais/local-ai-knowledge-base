---
title: "TripleDESCng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/TripleDESCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TripleDESCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class TripleDESCng : System.Security.Cryptography.TripleDES
```

Provides a Cryptography Next Generation (CNG) implementation of the Triple Data Encryption Standard (3DES) algorithm.

#### Remarks

> **Important:**
> A newer symmetric encryption algorithm, Advanced Encryption Standard (AES), is available. Consider using the `Aes` class and its derived classes instead of the `TripleDES` class. Use `TripleDES` only for compatibility with legacy applications and data.

## TripleDESCng.TripleDESCng() constructor

```csharp
public TripleDESCng ();
```

Initializes a new instance of the `TripleDESCng` class with an ephemeral key.

To be added.

## TripleDESCng.TripleDESCng(String) constructor

```csharp
public TripleDESCng (string keyName);
```

Initializes a new instance of the `TripleDESCng` class with the specified key name, which represents an existing persisted 3DES key.

Parameters:

- `keyName`: The name of the key.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
This constructor uses a default `CngKeyOpenOptions` value of `None` and `CngProvider.MicrosoftSoftwareKeyStorageProvider` as the default key <example-value> provider (KSP) to open the key.

## TripleDESCng.TripleDESCng(String, CngProvider) constructor

```csharp
public TripleDESCng (string keyName, System.Security.Cryptography.CngProvider provider);
```

Initializes a new instance of the `TripleDESCng` class with the specified key name, which represents an existing persisted 3DES key, and the specified key <example-value> provider (KSP).

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.

-or-

`provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
A default `CngKeyOpenOptions` value of `None` is used to open the key.

## TripleDESCng.TripleDESCng(String, CngProvider, CngKeyOpenOptions) constructor

```csharp
public TripleDESCng (string keyName, System.Security.Cryptography.CngProvider provider, System.Security.Cryptography.CngKeyOpenOptions openOptions);
```

Initializes a new instance of the `TripleDESCng` class with the specified key name, which represents an existing persisted 3DES key,  the specified key <example-value> provider (KSP) and key open options.

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.
- `openOptions`: A bitwise combination of the enumeration values that specify options for opening the key, such as where the key is opened from (machine or user storage) and whether to suppress UI prompting.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.

-or-

`provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

To be added.

## TripleDESCng.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key for the `TripleDESCng` algorithm.

Returns: The key for the `TripleDESCng` algorithm.

#### Remarks
If you've created the `TripleDESCng` object using an existing persisted key, when you read the value of the `Key` property, an attempt to export the key will be made. In this case, if the key is not exportable, a `CryptographicException` will be thrown.

In addition to that, if you set the value of the `Key` property,  the persisted key will no longer be used and a temporary key will be used instead. If you need to use the persisted key again, a new instance of `TripleDESCng` class needs to be created.

## TripleDESCng.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key used by the `TripleDESCng` algorithm.

Returns: The size, in bits, of the secret key used by the `TripleDESCng` algorithm.

#### Remarks
If you've created the `TripleDESCng` object using an existing persisted key and you set the value of the `KeySize` property,  the persisted key will no longer be used and a temporary key will be used instead. If you need to use the persisted key again, a new instance of `TripleDESCng` class needs to be created.

## TripleDESCng.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric 3DES decryptor object with the current key and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric 3DES decryptor object.

Exceptions:

- `CryptographicException`: CFB64 mode is selected and the key is persisted.

#### Remarks
This method decrypts an encrypted message created using the `CreateEncryptor` overload with the same signature.

## TripleDESCng.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric 3DES decryptor object with the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the 3DES algorithm. The key size must be 192 bits.
- `rgbIV`: The initialization vector to use for the 3DES algorithm.

Returns: A symmetric 3DES decryptor object.

Exceptions:

- `ArgumentNullException`: `rgbKey` is `null`.
- `ArgumentException`: `rgbKey` is not a valid size for this algorithm.

-or-

`rgbIV` size does not match the block size for this algorithm.
- `CryptographicException`: `rgbKey` is a known weak key for this algorithm and cannot be used.

-or-

`rgbIV` is `null`.

#### Remarks
This method decrypts an encrypted message created using the `CreateEncryptor` overload with the same signature.

> **Note:**
>  If you've created the `TripleDESCng` object using an existing persisted key and you want to make use of that key when decrypting the message, you want to set the `IV` property and then call the parameterless `CreateDecryptor` overload instead; otherwise, using this method will create an ephemeral key as specified by the `rgbKey` parameter.

## TripleDESCng.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric 3DES encryptor object using the current key and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric 3DES encryptor object.

Exceptions:

- `CryptographicException`: CFB64 mode is selected and the key is persisted.

#### Remarks
Use this method to encrypt a message and then use the `TripleDESCng.CreateDecryptor` overload with the same signature to decrypt the result of this method.

## TripleDESCng.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric 3DES encryptor object with the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the 3DES algorithm. The key size must be 192 bits.
- `rgbIV`: The initialization vector to use for the 3DES algorithm.

Returns: A symmetric 3DES encryptor object.

Exceptions:

- `ArgumentNullException`: `rgbKey` is `null`.
- `ArgumentException`: `rgbKey` is not a valid size for this algorithm.

-or-

`rgbIV` size does not match the block size for this algorithm.
- `CryptographicException`: `rgbKey` is a known weak key for this algorithm and cannot be used.

-or-

`rgbIV` is `null`.

#### Remarks
Use this method to encrypt a message and then use the `TripleDESCng.CreateDecryptor` overload with the same signature to decrypt the result of this method.

> **Note:**
>  If you've created the `TripleDESCng` object using an existing persisted key and you want to make use of that key when encrypting the message, you want to set the `IV` property and then call the parameterless `CreateEncryptor` overload instead; otherwise, using this method will create an ephemeral key as specified by the `rgbKey` parameter.

## TripleDESCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SymmetricAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `SymmetricAlgorithm` references. This method invokes the `Dispose()` method of each referenced object.

## TripleDESCng.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (IV) to use for the 3DES algorithm.

To be added.

## TripleDESCng.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key to use for the 3DES algorithm.

To be added.

## TripleDESCng.TryDecryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryDecryptCbcCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## TripleDESCng.TryDecryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected override bool TryDecryptCfbCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `feedbackSizeInBits`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## TripleDESCng.TryDecryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryDecryptEcbCore (ReadOnlySpan<byte> ciphertext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## TripleDESCng.TryEncryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryEncryptCbcCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## TripleDESCng.TryEncryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected override bool TryEncryptCfbCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `feedbackSizeInBits`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## TripleDESCng.TryEncryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryEncryptEcbCore (ReadOnlySpan<byte> plaintext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
