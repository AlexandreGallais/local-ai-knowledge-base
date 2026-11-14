---
title: "Aes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Aes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Aes class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class Aes : System.Security.Cryptography.SymmetricAlgorithm
```

Represents the abstract base class from which all implementations of the Advanced Encryption Standard (AES) must inherit.

#### Examples
The following example demonstrates how to encrypt and decrypt sample data by using the `Aes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Aes/Overview/program.cs._

## Aes.Aes() constructor

```csharp
protected Aes ();
```

Initializes a new instance of the `Aes` class.

#### Examples
The following example demonstrates how to encrypt and decrypt sample data using the `Aes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Aes/Overview/program.cs._

## Aes.Create() method

```csharp
public static System.Security.Cryptography.Aes Create ();
```

Creates a cryptographic object that is used to perform the symmetric algorithm.

Returns: A cryptographic object that is used to perform the symmetric algorithm.

To be added.

## Aes.Create(String) method

```csharp
public static System.Security.Cryptography.Aes? Create (string algorithmName);
```

Creates a cryptographic object that specifies the implementation of AES to use to perform the symmetric algorithm.

Parameters:

- `algorithmName`: The name of the specific implementation of AES to use.

Returns: A cryptographic object that is used to perform the symmetric algorithm.

Exceptions:

- `ArgumentNullException`: The `algorithmName` parameter is `null`.

To be added.

## Aes.DecryptKeyWrap(Byte[]) method

```csharp
public byte[] DecryptKeyWrap (byte[] ciphertext);
```

To be added.

Parameters:

- `ciphertext`: To be added.

Returns: To be added.

To be added.

## Aes.DecryptKeyWrap(Byte>) method

```csharp
public byte[] DecryptKeyWrap (ReadOnlySpan<byte> ciphertext);
```

To be added.

Parameters:

- `ciphertext`: To be added.

Returns: To be added.

To be added.

## Aes.DecryptKeyWrap(Byte>, Byte>) method

```csharp
public int DecryptKeyWrap (ReadOnlySpan<byte> ciphertext, Span<byte> destination);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Aes.DecryptKeyWrapCore(Byte>, Byte>) method

```csharp
protected virtual int DecryptKeyWrapCore (ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

Returns: To be added.

To be added.

## Aes.DecryptKeyWrapPadded(Byte[]) method

```csharp
public byte[] DecryptKeyWrapPadded (byte[] ciphertext);
```

Unwraps a key that was wrapped using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `ciphertext`: The data to unwrap.

Returns: The unwrapped key.

Exceptions:

- `ArgumentNullException`: `ciphertext` is `null`.
- `ArgumentException`: `ciphertext` has a `Array.Length` that does not correspond to the output of the Key Wrap with Padding algorithm.

To be added.

## Aes.DecryptKeyWrapPadded(Byte>) method

```csharp
public byte[] DecryptKeyWrapPadded (ReadOnlySpan<byte> ciphertext);
```

Unwraps a key that was wrapped using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `ciphertext`: The data to unwrap.

Returns: The unwrapped key.

Exceptions:

- `ArgumentException`: `ciphertext` has a `ReadOnlySpan<T>.Length` that does not correspond to the output of the Key Wrap with Padding algorithm.

To be added.

## Aes.DecryptKeyWrapPadded(Byte>, Byte>) method

```csharp
public int DecryptKeyWrapPadded (ReadOnlySpan<byte> ciphertext, Span<byte> destination);
```

Unwraps a key that was wrapped using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `ciphertext`: The data to unwrap.
- `destination`: The buffer to receive the unwrapped key.

Returns: The number of bytes in the unwrapped key.

Exceptions:

- `ArgumentException`: `ciphertext` has a `ReadOnlySpan<T>.Length` that does not correspond to the output of the Key Wrap with Padding algorithm.

-or-

`destination` has a `Span<T>.Length` that is more than 16 bytes shorter than `ciphertext`, thus guaranteed too short to hold the unwrapped key.
- `CryptographicException`: `ciphertext` and `destination` overlap.

-or-

The unwrap algorithm failed to unwrap the ciphertext.

-or-

An error occurred during the cryptographic operation.

To be added.

## Aes.DecryptKeyWrapPaddedCore(Byte>, Byte>) method

```csharp
protected virtual int DecryptKeyWrapPaddedCore (ReadOnlySpan<byte> source, Span<byte> destination);
```

Unwraps a key that was wrapped using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `source`: The data to unwrap.
- `destination`: The buffer to receive the unwrapped key.

Returns: The number of bytes in the unwrapped key.

Exceptions:

- `CryptographicException`: The unwrap algorithm failed to unwrap the ciphertext.

-or-

An error occurred during the cryptographic operation.

When called by the base class, `source` is pre-validated to be at least 16 bytes long and a multiple of 8 bytes.

When called by the base class, `destination` will always be exactly 8 bytes shorter than `source`, so any valid value will always fit.

## Aes.EncryptKeyWrap(Byte[]) method

```csharp
public byte[] EncryptKeyWrap (byte[] plaintext);
```

To be added.

Parameters:

- `plaintext`: To be added.

Returns: To be added.

To be added.

## Aes.EncryptKeyWrap(Byte>) method

```csharp
public byte[] EncryptKeyWrap (ReadOnlySpan<byte> plaintext);
```

To be added.

Parameters:

- `plaintext`: To be added.

Returns: To be added.

To be added.

## Aes.EncryptKeyWrap(Byte>, Byte>) method

```csharp
public void EncryptKeyWrap (ReadOnlySpan<byte> plaintext, Span<byte> destination);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `destination`: To be added.

To be added.

## Aes.EncryptKeyWrapCore(Byte>, Byte>) method

```csharp
protected virtual void EncryptKeyWrapCore (ReadOnlySpan<byte> source, Span<byte> destination);
```

To be added.

Parameters:

- `source`: To be added.
- `destination`: To be added.

To be added.

## Aes.EncryptKeyWrapPadded(Byte[]) method

```csharp
public byte[] EncryptKeyWrapPadded (byte[] plaintext);
```

Wraps a key using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `plaintext`: The data to wrap.

Returns: The wrapped data.

Exceptions:

- `ArgumentException`: `plaintext` is `null` or empty.
- `CryptographicException`: An error occurred during the cryptographic operation.

To be added.

## Aes.EncryptKeyWrapPadded(Byte>) method

```csharp
public byte[] EncryptKeyWrapPadded (ReadOnlySpan<byte> plaintext);
```

Wraps a key using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `plaintext`: The data to wrap.

Returns: The wrapped data.

Exceptions:

- `ArgumentException`: `plaintext` is empty.
- `CryptographicException`: An error occurred during the cryptographic operation.

To be added.

## Aes.EncryptKeyWrapPadded(Byte>, Byte>) method

```csharp
public void EncryptKeyWrapPadded (ReadOnlySpan<byte> plaintext, Span<byte> destination);
```

Wraps a key using the IETF RFC 5649 AES Key Wrap with Padding algorithm, writing the result to a specified buffer.

Parameters:

- `plaintext`: The data to wrap.
- `destination`: The buffer to receive the wrapped data.

Exceptions:

- `ArgumentException`: `plaintext` is empty.

-or-

`destination` is not precisely sized.
- `CryptographicException`: `plaintext` and `destination` overlap.

-or-

An error occurred during the cryptographic operation.

To be added.

## Aes.EncryptKeyWrapPaddedCore(Byte>, Byte>) method

```csharp
protected virtual void EncryptKeyWrapPaddedCore (ReadOnlySpan<byte> source, Span<byte> destination);
```

Wraps a key using the IETF RFC 5649 AES Key Wrap with Padding algorithm, writing the result to a specified buffer.

Parameters:

- `source`: The data to wrap.
- `destination`: The buffer to receive the wrapped data.

Exceptions:

- `CryptographicException`: An error occurred during the cryptographic operation.

When called by the base class, `source` is pre-validated to not be empty.

When called by the base class, `destination` is pre-validated to be exactly the length returned by `Aes.GetKeyWrapPaddedLength` for the given input.

## Aes.GetKeyWrapLength(Int32) method

```csharp
public static int GetKeyWrapLength (int plaintextLengthInBytes);
```

To be added.

Parameters:

- `plaintextLengthInBytes`: To be added.

Returns: To be added.

To be added.

## Aes.GetKeyWrapPaddedLength(Int32) method

```csharp
public static int GetKeyWrapPaddedLength (int plaintextLengthInBytes);
```

Computes the output length of the IETF RFC 5649 AES Key Wrap with Padding Algorithm for the specified plaintext length.

Parameters:

- `plaintextLengthInBytes`: The length of the plaintext to be wrapped, in bytes.

Returns: The padded length of the key wrap for the specified plaintext.

Exceptions:

- `ArgumentOutOfRangeException`: `plaintextLengthInBytes` is less than or equal to zero.

-or-

`plaintextLengthInBytes` represents a plaintext length that, when wrapped, has a length that cannot be represented as a signed 32-bit integer.

To be added.

## Aes.TryDecryptKeyWrap(Byte>, Byte>, Int32) method

```csharp
public bool TryDecryptKeyWrap (ReadOnlySpan<byte> ciphertext, Span<byte> destination, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `destination`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## Aes.TryDecryptKeyWrapPadded(Byte>, Byte>, Int32) method

```csharp
public bool TryDecryptKeyWrapPadded (ReadOnlySpan<byte> ciphertext, Span<byte> destination, out int bytesWritten);
```

Attempts to unwrap a key that was wrapped using the IETF RFC 5649 AES Key Wrap with Padding algorithm.

Parameters:

- `ciphertext`: The data to unwrap.
- `destination`: The buffer to receive the unwrapped key.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.

This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the unwrapped key; otherwise, `false`.

Exceptions:

- `ArgumentException`: `ciphertext` has a `ReadOnlySpan<T>.Length` that does not correspond to the output of the Key Wrap with Padding algorithm.
- `CryptographicException`: `ciphertext` and `destination` overlap.

-or-

The unwrap algorithm failed to unwrap the ciphertext.

-or-

An error occurred during the cryptographic operation.

To be added.
