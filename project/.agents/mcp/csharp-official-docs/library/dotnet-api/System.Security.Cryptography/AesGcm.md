---
title: "AesGcm class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AesGcm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AesGcm class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AesGcm : IDisposable
```

Represents an Advanced Encryption Standard (AES) key to be used with the Galois/Counter Mode (GCM) mode of operation.

To be added.

## AesGcm.AesGcm(Byte[]) constructor

```csharp
public AesGcm (byte[] key);
```

Initializes a new instance of the `AesGcm` class with a provided key.

Parameters:

- `key`: The secret key to use for this instance.

Exceptions:

- `ArgumentNullException`: The `key` parameter is `null`.
- `CryptographicException`: The `key` parameter length is other than 16, 24, or 32 bytes (128, 192, or 256 bits).

To be added.

## AesGcm.AesGcm(Byte>) constructor

```csharp
public AesGcm (ReadOnlySpan<byte> key);
```

Initializes a new instance of the `AesGcm` class with a provided key.

Parameters:

- `key`: The secret key to use for this instance.

Exceptions:

- `CryptographicException`: The `key` parameter length is other than 16, 24, or 32 bytes (128, 192, or 256 bits).

To be added.

## AesGcm.AesGcm(Byte[], Int32) constructor

```csharp
public AesGcm (byte[] key, int tagSizeInBytes);
```

Initializes a new instance of the `AesGcm` class with a provided key and required tag size.

Parameters:

- `key`: The secret key to use for this instance.
- `tagSizeInBytes`: The size of the tag, in bytes, that encryption and decryption must use.

Exceptions:

- `ArgumentNullException`: The `key` parameter is `null`.
- `CryptographicException`: The `key` parameter length is other than 16, 24, or 32 bytes (128, 192, or 256 bits).
- `ArgumentException`: The `tagSizeInBytes` parameter is an unsupported tag size indicated by
`AesGcm.TagByteSizes`.
- `PlatformNotSupportedException`: The current platform does not support AES-GCM.

The `tagSizeInBytes` parameter is used to indicate that the tag parameter in `Encrypt` or `Decrypt` must be exactly this size. Indicating the required tag size prevents issues where callers of `Decrypt` may supply a tag as input and that input is truncated to an unexpected size.

## AesGcm.AesGcm(Byte>, Int32) constructor

```csharp
public AesGcm (ReadOnlySpan<byte> key, int tagSizeInBytes);
```

Initializes a new instance of the `AesGcm` class with a provided key and required tag size.

Parameters:

- `key`: The secret key to use for this instance.
- `tagSizeInBytes`: The size of the tag, in bytes, that encryption and decryption must use.

Exceptions:

- `CryptographicException`: The `key` parameter length is other than 16, 24, or 32 bytes (128, 192, or 256 bits).
- `ArgumentException`: The `tagSizeInBytes` parameter is an unsupported tag size indicated by
`AesGcm.TagByteSizes`.
- `PlatformNotSupportedException`: The current platform does not support AES-GCM.

The `tagSizeInBytes` parameter is used to indicate that the tag parameter in `Encrypt` or `Decrypt` must be exactly this size. Indicating the required tag size prevents issues where callers of `Decrypt` may supply a tag as input and that input is truncated to an unexpected size.

## AesGcm.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## AesGcm.KeySizeInBytes property

```csharp
public int KeySizeInBytes { get; }
```

To be added.

Returns: To be added.

To be added.

## AesGcm.NonceByteSizes property

```csharp
public static System.Security.Cryptography.KeySizes NonceByteSizes { get; }
```

Gets the nonce sizes, in bytes, supported by this instance.

Returns: The nonce sizes supported by this instance: 12 bytes (96 bits).

To be added.

## AesGcm.TagByteSizes property

```csharp
public static System.Security.Cryptography.KeySizes TagByteSizes { get; }
```

Gets the tag sizes, in bytes, supported by this instance.

Returns: The tag sizes supported by this instance: 12, 13, 14, 15, or 16 bytes (96, 104, 112, 120, or 128 bits).

To be added.

## AesGcm.TagSizeInBytes property

```csharp
public int? TagSizeInBytes { get; }
```

Gets the size of the tag, in bytes.

Returns: The size of the tag that must be used for encryption or decryption, or `null` if the tag size is unspecified.

To be added.

## AesGcm.Decrypt(Byte[], Byte[], Byte[], Byte[], Byte[]) method

```csharp
public void Decrypt (byte[] nonce, byte[] ciphertext, byte[] tag, byte[] plaintext, byte[]? associatedData = default);
```

Decrypts the ciphertext into the provided destination buffer if the authentication tag can be validated.

Parameters:

- `nonce`: The nonce associated with this message, which must match the value provided during encryption.
- `ciphertext`: The encrypted content to decrypt.
- `tag`: The authentication tag produced for this message during encryption.
- `plaintext`: The byte array to receive the decrypted contents.
- `associatedData`: Extra data associated with this message, which must match the value provided during encryption.

Exceptions:

- `ArgumentException`: The `plaintext` parameter and the `ciphertext` do not have the same length.

-or-

The `nonce` parameter length is not permitted by `AesGcm.NonceByteSizes`.

-or-

The `tag` parameter length is not permitted by `AesGcm.TagByteSizes`.
- `ArgumentNullException`: The `nonce`, `ciphertext`, `tag`, or `plaintext` parameter is `null`.
- `CryptographicException`: The decryption operation failed. Prior to .NET 8, indicates the tag value could not be verified.
- `AuthenticationTagMismatchException`: .NET 8 and later versions: the tag value could not be verified.

#### Remarks

If `tag` cannot be validated (using the key, `nonce`, `ciphertext`, and `associatedData` values), then `plaintext` is cleared.

## AesGcm.Decrypt(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
public void Decrypt (ReadOnlySpan<byte> nonce, ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> tag, Span<byte> plaintext, ReadOnlySpan<byte> associatedData = default);
```

Decrypts the ciphertext into the provided destination buffer if the authentication tag can be validated.

Parameters:

- `nonce`: The nonce associated with this message, which must match the value provided during encryption.
- `ciphertext`: The encrypted content to decrypt.
- `tag`: The authentication tag produced for this message during encryption.
- `plaintext`: The byte span to receive the decrypted contents.
- `associatedData`: Extra data associated with this message, which must match the value provided during encryption.

Exceptions:

- `ArgumentException`: The `plaintext` parameter and the `ciphertext` do not have the same length.

-or-

The `nonce` parameter length is not permitted by `AesGcm.NonceByteSizes`.

-or-

The `tag` parameter length is not permitted by `AesGcm.TagByteSizes`.
- `CryptographicException`: The decryption operation failed. Prior to .NET 8, indicates the tag value could not be verified.
- `AuthenticationTagMismatchException`: .NET 8 and later versions: the tag value could not be verified.

#### Remarks

If `tag` cannot be validated (using the key, `nonce`, `ciphertext`, and `associatedData` values), then `plaintext` is cleared.

## AesGcm.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `AesGcm` class.

To be added.

## AesGcm.Encrypt(Byte[], Byte[], Byte[], Byte[], Byte[]) method

```csharp
public void Encrypt (byte[] nonce, byte[] plaintext, byte[] ciphertext, byte[] tag, byte[]? associatedData = default);
```

Encrypts the plaintext into the ciphertext destination buffer and generates the authentication tag into a separate buffer.

Parameters:

- `nonce`: The nonce associated with this message, which should be a unique value for every operation with the same key.
- `plaintext`: The content to encrypt.
- `ciphertext`: The byte array to receive the encrypted contents.
- `tag`: The byte array to receive the generated authentication tag.
- `associatedData`: Extra data associated with this message, which must also be provided during decryption.

Exceptions:

- `ArgumentException`: The `plaintext` parameter and the `ciphertext` do not have the same length.

-or-

The `nonce` parameter length is not permitted by `AesGcm.NonceByteSizes`.

-or-

The `tag` parameter length is not permitted by `AesGcm.TagByteSizes`.
- `ArgumentNullException`: The `nonce`, `ciphertext`, `tag`, or `plaintext` parameter is `null`.
- `CryptographicException`: The encryption operation failed.

#### Remarks

The security guarantees of the AES-GCM algorithm mode require that the same nonce value is never used twice with the same key.

## AesGcm.Encrypt(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
public void Encrypt (ReadOnlySpan<byte> nonce, ReadOnlySpan<byte> plaintext, Span<byte> ciphertext, Span<byte> tag, ReadOnlySpan<byte> associatedData = default);
```

Encrypts the plaintext into the ciphertext destination buffer and generates the authentication tag into a separate buffer.

Parameters:

- `nonce`: The nonce associated with this message, which should be a unique value for every operation with the same key.
- `plaintext`: The content to encrypt.
- `ciphertext`: The byte array to receive the encrypted contents.
- `tag`: The byte array to receive the generated authentication tag.
- `associatedData`: Extra data associated with this message, which must also be provided during decryption.

Exceptions:

- `ArgumentException`: The `plaintext` parameter and the `ciphertext` do not have the same length.

-or-

The `nonce` parameter length is not permitted by `AesGcm.NonceByteSizes`.

-or-

The `tag` parameter length is not permitted by `AesGcm.TagByteSizes`.
- `CryptographicException`: The encryption operation failed.

#### Remarks

The security guarantees of the AES-GCM algorithm mode require that the same nonce value is never used twice with the same key.
