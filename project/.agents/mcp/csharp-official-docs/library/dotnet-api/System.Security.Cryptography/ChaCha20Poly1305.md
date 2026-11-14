---
title: "ChaCha20Poly1305 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ChaCha20Poly1305.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChaCha20Poly1305 class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class ChaCha20Poly1305 : IDisposable
```

Represents a symmetric key to be used with the ChaCha20 stream cipher in the combined mode with the Poly1305 authenticator.

To be added.

## ChaCha20Poly1305.ChaCha20Poly1305(Byte[]) constructor

```csharp
public ChaCha20Poly1305 (byte[] key);
```

Initializes a new instance of the `ChaCha20Poly1305` class with a provided key.

Parameters:

- `key`: The secret key to use for this instance.

Exceptions:

- `CryptographicException`: The `key` parameter length is not 32 bytes (256 bits).

To be added.

## ChaCha20Poly1305.ChaCha20Poly1305(Byte>) constructor

```csharp
public ChaCha20Poly1305 (ReadOnlySpan<byte> key);
```

Initializes a new instance of the `ChaCha20Poly1305` class with a provided key.

Parameters:

- `key`: The secret key to use for this instance.

Exceptions:

- `CryptographicException`: The `key` parameter length is not 32 bytes (256 bits).

To be added.

## ChaCha20Poly1305.IsSupported property

```csharp
public static bool IsSupported { get; }
```

Gets a value that indicates whether the algorithm is supported on the current platform.

Returns: `true` if the algorithm is supported; otherwise, `false`.

To be added.

## ChaCha20Poly1305.Decrypt(Byte[], Byte[], Byte[], Byte[], Byte[]) method

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

The `nonce` parameter length is not 12 bytes (96 bits).

-or-

The `tag` parameter length is not 16 bytes (128 bits).
- `ArgumentNullException`: The `nonce`, `ciphertext`, `tag`, or `plaintext` parameter is `null`.
- `CryptographicException`: The decryption operation failed. Prior to .NET 8, indicates the tag value could not be verified.
- `AuthenticationTagMismatchException`: .NET 8 and later versions: the tag value could not be verified.

#### Remarks

If `tag` cannot be validated (using the key, `nonce`, `ciphertext`, and `associatedData` values), then `plaintext` is cleared.

## ChaCha20Poly1305.Decrypt(Byte>, Byte>, Byte>, Byte>, Byte>) method

```csharp
public void Decrypt (ReadOnlySpan<byte> nonce, ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> tag, Span<byte> plaintext, ReadOnlySpan<byte> associatedData = default);
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

The `nonce` parameter length is not 12 bytes (96 bits).

-or-

The `tag` parameter length is not 16 bytes (128 bits).
- `CryptographicException`: The decryption operation failed. Prior to .NET 8, indicates the tag value could not be verified.
- `AuthenticationTagMismatchException`: .NET 8 and later versions: the tag value could not be verified.

#### Remarks

If `tag` cannot be validated (using the key, `nonce`, `ciphertext`, and `associatedData` values), then `plaintext` is cleared.

## ChaCha20Poly1305.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## ChaCha20Poly1305.Encrypt(Byte[], Byte[], Byte[], Byte[], Byte[]) method

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

The `nonce` parameter length is not 12 bytes (96 bits).

-or-

The `tag` parameter length is not 16 bytes (128 bits).
- `ArgumentNullException`: The `nonce`, `ciphertext`, `tag`, or `plaintext` parameter is `null`.
- `CryptographicException`: The encryption operation failed.

#### Remarks

The security guarantees of the ChaCha20/Poly1305 algorithm mode require that the same nonce value is never used twice with the same key.

## ChaCha20Poly1305.Encrypt(Byte>, Byte>, Byte>, Byte>, Byte>) method

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

The `nonce` parameter length is not 12 bytes (96 bits).

-or-

The `tag` parameter length is not 16 bytes (128 bits).
- `ArgumentNullException`: The `nonce`, `ciphertext`, `tag`, or `plaintext` parameter is `null`.
- `CryptographicException`: The encryption operation failed.

#### Remarks

The security guarantees of the ChaCha20/Poly1305 algorithm mode require that the same nonce value is never used twice with the same key.
