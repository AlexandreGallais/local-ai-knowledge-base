---
title: "SymmetricAlgorithm class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymmetricAlgorithm class (part 2 of 5)

## SymmetricAlgorithm.CreateEncryptor(Byte[], Byte[]) method

```csharp
public abstract System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

When overridden in a derived class, creates a symmetric encryptor object with the specified `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric encryptor object.

#### Remarks
Use the `SymmetricAlgorithm.CreateDecryptor` overload with the same parameters to decrypt the result of this method.

## SymmetricAlgorithm.DecryptCbc(Byte[], Byte[], PaddingMode) method

```csharp
public byte[] DecryptCbc (byte[] ciphertext, byte[] iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Decrypts data using CBC mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentNullException`: `ciphertext` or `iv` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptCbcCore`.

## SymmetricAlgorithm.DecryptCbc(Byte>, Byte>, PaddingMode) method

```csharp
public byte[] DecryptCbc (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Decrypts data using CBC mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptCbcCore`.

## SymmetricAlgorithm.DecryptCbc(Byte>, Byte>, Byte>, PaddingMode) method

```csharp
public int DecryptCbc (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Decrypts data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The total number of bytes written to `destination`

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.
- `ArgumentException`: The buffer in `destination` is too small to hold the plaintext data.

#### Remarks

This method's behavior is defined by `TryDecryptCbcCore`.

## SymmetricAlgorithm.DecryptCfb(Byte[], Byte[], PaddingMode, Int32) method

```csharp
public byte[] DecryptCfb (byte[] ciphertext, byte[] iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Decrypts data using CFB mode with the specified padding mode and feedback size.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentNullException`: `ciphertext` or `iv` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

-or-

The feedback size is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryDecryptCfbCore`.

## SymmetricAlgorithm.DecryptCfb(Byte>, Byte>, PaddingMode, Int32) method

```csharp
public byte[] DecryptCfb (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Decrypts data using CFB mode with the specified padding mode and feedback size.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

-or-

The feedback size is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryDecryptCfbCore`.

## SymmetricAlgorithm.DecryptCfb(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
public int DecryptCfb (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Decrypts data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).

-or-

The buffer in `destination` is too small to hold the plaintext data.
- `CryptographicException`: The ciphertext could not be decrypted successfully.

-or-

`feedbackSizeInBits` is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryDecryptCfbCore`.

## SymmetricAlgorithm.DecryptEcb(Byte[], PaddingMode) method

```csharp
public byte[] DecryptEcb (byte[] ciphertext, System.Security.Cryptography.PaddingMode paddingMode);
```

Decrypts data using ECB mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentNullException`: `ciphertext` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptEcbCore`.

## SymmetricAlgorithm.DecryptEcb(Byte>, PaddingMode) method

```csharp
public byte[] DecryptEcb (ReadOnlySpan<byte> ciphertext, System.Security.Cryptography.PaddingMode paddingMode);
```

Decrypts data using ECB mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The decrypted plaintext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptEcbCore`.

## SymmetricAlgorithm.DecryptEcb(Byte>, Byte>, PaddingMode) method

```csharp
public int DecryptEcb (ReadOnlySpan<byte> ciphertext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode);
```

Decrypts data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The total number of bytes written to `destination`

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The ciphertext could not be decrypted successfully.
- `ArgumentException`: The buffer in `destination` is too small to hold the plaintext data.

#### Remarks

This method's behavior is defined by `TryDecryptEcbCore`.

## SymmetricAlgorithm.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `SymmetricAlgorithm` class.

#### Remarks
Call `Dispose` when you are finished using the `SymmetricAlgorithm`. The `Dispose` method leaves the `SymmetricAlgorithm` in an unusable state. After calling `Dispose`, you must release all references to the `SymmetricAlgorithm` so the garbage collector can reclaim the memory that the `SymmetricAlgorithm` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `SymmetricAlgorithm`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `SymmetricAlgorithm` object's `Finalize` method.

## SymmetricAlgorithm.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SymmetricAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `SymmetricAlgorithm` references. This method invokes the `Dispose()` method of each referenced object.

## SymmetricAlgorithm.EncryptCbc(Byte[], Byte[], PaddingMode) method

```csharp
public byte[] EncryptCbc (byte[] plaintext, byte[] iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Encrypts data using CBC mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentNullException`: `plaintext` or `iv` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptCbcCore`.

## SymmetricAlgorithm.EncryptCbc(Byte>, Byte>, PaddingMode) method

```csharp
public byte[] EncryptCbc (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Encrypts data using CBC mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptCbcCore`.
