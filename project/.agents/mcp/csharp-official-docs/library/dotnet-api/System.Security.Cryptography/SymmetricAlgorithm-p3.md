---
title: "SymmetricAlgorithm class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymmetricAlgorithm class (part 3 of 5)

## SymmetricAlgorithm.EncryptCbc(Byte>, Byte>, Byte>, PaddingMode) method

```csharp
public int EncryptCbc (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Encrypts data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.
- `ArgumentException`: The buffer in `destination` is too small to hold the ciphertext data.

#### Remarks

This method's behavior is defined by `TryEncryptCbcCore`.

## SymmetricAlgorithm.EncryptCfb(Byte[], Byte[], PaddingMode, Int32) method

```csharp
public byte[] EncryptCfb (byte[] plaintext, byte[] iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Encrypts data using CFB mode with the specified padding mode and feedback size.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentNullException`: `plaintext` or `iv` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

-or-

The feedback size is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryEncryptCfbCore`.

## SymmetricAlgorithm.EncryptCfb(Byte>, Byte>, PaddingMode, Int32) method

```csharp
public byte[] EncryptCfb (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Encrypts data using CFB mode with the specified padding mode and feedback size.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

-or-

The feedback size is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryEncryptCfbCore`.

## SymmetricAlgorithm.EncryptCfb(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
public int EncryptCfb (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Encrypts data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

-or-

The feedback size is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryEncryptCfbCore`.

## SymmetricAlgorithm.EncryptEcb(Byte[], PaddingMode) method

```csharp
public byte[] EncryptEcb (byte[] plaintext, System.Security.Cryptography.PaddingMode paddingMode);
```

Encrypts data using ECB mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentNullException`: `plaintext` is `null`.
- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptEcbCore`.

## SymmetricAlgorithm.EncryptEcb(Byte>, PaddingMode) method

```csharp
public byte[] EncryptEcb (ReadOnlySpan<byte> plaintext, System.Security.Cryptography.PaddingMode paddingMode);
```

Encrypts data using ECB mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The encrypted ciphertext data.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptEcbCore`.

## SymmetricAlgorithm.EncryptEcb(Byte>, Byte>, PaddingMode) method

```csharp
public int EncryptEcb (ReadOnlySpan<byte> plaintext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode);
```

Encrypts data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: The total number of bytes written to `destination`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The plaintext could not be encrypted successfully.
- `ArgumentException`: The buffer in `destination` is too small to hold the ciphertext data.

#### Remarks

This method's behavior is defined by `TryEncryptEcbCore`.

## SymmetricAlgorithm.GenerateIV() method

```csharp
public abstract void GenerateIV ();
```

When overridden in a derived class, generates a random initialization vector (`SymmetricAlgorithm.IV`) to use for the algorithm.

#### Remarks
In general, there is no reason to use this method, because `CreateEncryptor()` or `CreateEncryptor(null, null)` automatically generates both an initialization vector and a key. However, you may want to use the `SymmetricAlgorithm.GenerateIV` method to reuse a symmetric algorithm instance with a different initialization vector.

## SymmetricAlgorithm.GenerateKey() method

```csharp
public abstract void GenerateKey ();
```

When overridden in a derived class, generates a random key (`SymmetricAlgorithm.Key`) to use for the algorithm.

#### Remarks
In general, there is no reason to use this method, because `CreateEncryptor()` or `CreateEncryptor(null, null)` automatically generates both an initialization vector and a key. However, you may want to use the `SymmetricAlgorithm.GenerateKey` method to reuse a symmetric algorithm instance with a different key.

## SymmetricAlgorithm.GetCiphertextLengthCbc(Int32, PaddingMode) method

```csharp
public int GetCiphertextLengthCbc (int plaintextLength, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Gets the length of a ciphertext with a given padding mode and plaintext length in CBC mode.

Parameters:

- `plaintextLength`: The plaintext length, in bytes.
- `paddingMode`: The padding mode used to pad the plaintext to the algorithm's block size.

Returns: The length, in bytes, of the ciphertext with padding.

Exceptions:

- `ArgumentOutOfRangeException`: `plaintextLength` is a negative number.

-or-

`plaintextLength` when padded is too large to represent as a signed 32-bit integer.

-or-

`paddingMode` is not a valid padding mode.
- `CryptographicException`: `SymmetricAlgorithm.BlockSize` is not a positive integer.

-or-

`SymmetricAlgorithm.BlockSize` is not a whole number of bytes. It must be divisible by 8.
- `ArgumentException`: The padding mode `PaddingMode.None` was used, but `plaintextLength` is not a whole number of blocks.

To be added.

## SymmetricAlgorithm.GetCiphertextLengthCfb(Int32, PaddingMode, Int32) method

```csharp
public int GetCiphertextLengthCfb (int plaintextLength, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Gets the length of a ciphertext with a given padding mode and plaintext length in CFB mode.

Parameters:

- `plaintextLength`: The plaintext length, in bytes.
- `paddingMode`: The padding mode used to pad the plaintext to the feedback size.
- `feedbackSizeInBits`: The feedback size, in bits.

Returns: The length, in bytes, of the ciphertext with padding.

Exceptions:

- `ArgumentOutOfRangeException`: `feedbackSizeInBits` is not a positive number.

-or-

`plaintextLength` is a negative number.

-or-

`plaintextLength` when padded is too large to represent as a signed 32-bit integer.

-or-

`paddingMode` is not a valid padding mode.
- `ArgumentException`: The padding mode `PaddingMode.None` was used, but `plaintextLength` is not a whole number of blocks.

-or-

`feedbackSizeInBits` is not a whole number of bytes. It must be divisible by 8.

#### Remarks

`feedbackSizeInBits` accepts any value that is a valid feedback size, regardless if the algorithm
supports the specified feedback size.

## SymmetricAlgorithm.GetCiphertextLengthEcb(Int32, PaddingMode) method

```csharp
public int GetCiphertextLengthEcb (int plaintextLength, System.Security.Cryptography.PaddingMode paddingMode);
```

Gets the length of a ciphertext with a given padding mode and plaintext length in ECB mode.

Parameters:

- `plaintextLength`: The plaintext length, in bytes.
- `paddingMode`: The padding mode used to pad the plaintext to the algorithm's block size.

Returns: The length, in bytes, of the ciphertext with padding.

Exceptions:

- `ArgumentOutOfRangeException`: `plaintextLength` is a negative number.

-or-

`plaintextLength` when padded is too large to represent as a signed 32-bit integer.

-or-

`paddingMode` is not a valid padding mode.
- `CryptographicException`: `SymmetricAlgorithm.BlockSize` is not a positive integer.

-or-

`SymmetricAlgorithm.BlockSize` is not a whole number of bytes. It must be divisible by 8.
- `ArgumentException`: The padding mode `PaddingMode.None` was used, but `plaintextLength` is not a whole number of blocks.

To be added.

## SymmetricAlgorithm.SetKey(Byte>) method

```csharp
public void SetKey (ReadOnlySpan<byte> key);
```

Sets the key for this instance.

Parameters:

- `key`: The new key for this instance.

Exceptions:

- `CryptographicException`: The key size is invalid.

-or-

An error occurred while setting the key.

To be added.

## SymmetricAlgorithm.SetKeyCore(Byte>) method

```csharp
protected virtual void SetKeyCore (ReadOnlySpan<byte> key);
```

Sets the key for this instance.

Parameters:

- `key`: The new key for this instance.

Exceptions:

- `CryptographicException`: An error occurred while setting the key.

Other callers are expected to similarly ensure that this method is only called with validly sized inputs.

The base class implementation is to assign the `SymmetricAlgorithm.Key` property.

Derived types should override this method to avoid copying the key into a new array.

## SymmetricAlgorithm.TryDecryptCbc(Byte>, Byte>, Byte>, Int32, PaddingMode) method

```csharp
public bool TryDecryptCbc (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, out int bytesWritten, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Attempts to decrypt data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptCbcCore`.
