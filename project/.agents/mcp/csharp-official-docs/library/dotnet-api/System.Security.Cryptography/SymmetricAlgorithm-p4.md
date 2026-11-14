---
title: "SymmetricAlgorithm class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymmetricAlgorithm class (part 4 of 5)

## SymmetricAlgorithm.TryDecryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected virtual bool TryDecryptCbcCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

When overridden in a derived class, attempts to decrypt data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

## SymmetricAlgorithm.TryDecryptCfb(Byte>, Byte>, Byte>, Int32, PaddingMode, Int32) method

```csharp
public bool TryDecryptCfb (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, out int bytesWritten, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Attempts to decrypt data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.

-or-

`feedbackSizeInBits` is not positive or represent a whole number of bytes.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The ciphertext could not be decrypted successfully.

-or-

`feedbackSizeInBits` is not valid for the algorithm.

#### Remarks

This method's behavior is defined by `TryDecryptCfbCore`.

## SymmetricAlgorithm.TryDecryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected virtual bool TryDecryptCfbCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

When overridden in a derived class, attempts to decrypt data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `ciphertext`: The data to decrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

## SymmetricAlgorithm.TryDecryptEcb(Byte>, Byte>, PaddingMode, Int32) method

```csharp
public bool TryDecryptEcb (ReadOnlySpan<byte> ciphertext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

Attempts to decrypt data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The ciphertext could not be decrypted successfully.

#### Remarks

This method's behavior is defined by `TryDecryptEcbCore`.

## SymmetricAlgorithm.TryDecryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected virtual bool TryDecryptEcbCore (ReadOnlySpan<byte> ciphertext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

When overridden in a derived class, attempts to decrypt data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `ciphertext`: The data to decrypt.
- `destination`: The buffer to receive the plaintext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

## SymmetricAlgorithm.TryEncryptCbc(Byte>, Byte>, Byte>, Int32, PaddingMode) method

```csharp
public bool TryEncryptCbc (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, out int bytesWritten, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.PKCS7);
```

Attempts to encrypt data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `ArgumentException`: `iv` is the incorrect length. Callers are expected to pass an initialization vector that is exactly `SymmetricAlgorithm.BlockSize` in length, converted to bytes (`BlockSize / 8`).
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptCbcCore`.

## SymmetricAlgorithm.TryEncryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected virtual bool TryEncryptCbcCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

When overridden in a derived class, attempts to encrypt data into the specified buffer, using CBC mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

Implementations of this method must write precisely
`GetCiphertextLengthCbc(plaintext.Length, paddingMode)` bytes to `destination`
and report that via `bytesWritten`.

## SymmetricAlgorithm.TryEncryptCfb(Byte>, Byte>, Byte>, Int32, PaddingMode, Int32) method

```csharp
public bool TryEncryptCfb (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, out int bytesWritten, System.Security.Cryptography.PaddingMode paddingMode = System.Security.Cryptography.PaddingMode.None, int feedbackSizeInBits = 8);
```

Attempts to encrypt data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

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

## SymmetricAlgorithm.TryEncryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected virtual bool TryEncryptCfbCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

When overridden in a derived class, attempts to encrypt data into the specified buffer, using CFB mode with the specified padding mode and feedback size.

Parameters:

- `plaintext`: The data to encrypt.
- `iv`: The initialization vector.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `feedbackSizeInBits`: The feedback size, specified in bits.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

Implementations of this method must write precisely
`GetCiphertextLengthCfb(plaintext.Length, paddingMode, feedbackSizeInBits)`
bytes to `destination` and report that via `bytesWritten`.

## SymmetricAlgorithm.TryEncryptEcb(Byte>, Byte>, PaddingMode, Int32) method

```csharp
public bool TryEncryptEcb (ReadOnlySpan<byte> plaintext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

Attempts to encrypt data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `paddingMode` is not a valid padding mode.
- `CryptographicException`: The plaintext could not be encrypted successfully.

#### Remarks

This method's behavior is defined by `TryEncryptEcbCore`.

## SymmetricAlgorithm.TryEncryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected virtual bool TryEncryptEcbCore (ReadOnlySpan<byte> plaintext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

When overridden in a derived class, attempts to encrypt data into the specified buffer, using ECB mode with the specified padding mode.

Parameters:

- `plaintext`: The data to encrypt.
- `destination`: The buffer to receive the ciphertext data.
- `paddingMode`: The padding mode used to produce the ciphertext and remove during decryption.
- `bytesWritten`: When this method returns, contains the total number of bytes written to `destination`.

Returns: `true` if `destination` was large enough to receive the encrypted data; otherwise, `false`.

Exceptions:

- `NotSupportedException`: A derived class has not provided an implementation.

#### Remarks

Derived classes must override this and provide an implementation.

Implementations of this method must write precisely
`GetCiphertextLengthEcb(plaintext.Length, paddingMode)` bytes to `destination`
and report that via `bytesWritten`.

## SymmetricAlgorithm.ValidKeySize(Int32) method

```csharp
public bool ValidKeySize (int bitLength);
```

Determines whether the specified key size is valid for the current algorithm.

Parameters:

- `bitLength`: The length, in bits, to check for a valid key size.

Returns: `true` if the specified key size is valid for the current algorithm; otherwise, `false`.

To be added.

## SymmetricAlgorithm.BlockSizeValue field

```csharp
protected int BlockSizeValue;
```

Represents the block size, in bits, of the cryptographic operation.

#### Remarks
The block size is the basic unit of data that can be encrypted or decrypted in one operation. Messages longer than the block size are handled as successive blocks; messages shorter than the block size must be padded with extra bits to reach the size of a block. Valid block sizes are determined by the symmetric algorithm used.

This field is accessed through the `BlockSize` property.

## SymmetricAlgorithm.FeedbackSizeValue field

```csharp
protected int FeedbackSizeValue;
```

Represents the feedback size, in bits, of the cryptographic operation.

#### Remarks
The feedback size determines the amount of data that is fed back to successive encryption or decryption operations. The feedback size cannot be greater than the block size.

This field is accessed through the `FeedbackSize` property.
