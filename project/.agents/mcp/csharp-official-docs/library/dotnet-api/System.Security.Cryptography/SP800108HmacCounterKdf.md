---
title: "SP800108HmacCounterKdf class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SP800108HmacCounterKdf.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SP800108HmacCounterKdf class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class SP800108HmacCounterKdf : IDisposable
```

NIST SP 800-108 HMAC CTR Key-Based Key <example-value> (KBKDF)

This implements NIST SP 800-108 HMAC in counter mode. The implemented KDF assumes the form of
`PRF (KI, [i]2 || Label || 0x00 || Context || [L]2)` where `[i]2` and `[L]2` are encoded as
unsigned 32-bit integers, big endian.

All members of this class are thread safe. If the instance is disposed of while other threads are using
the instance, those threads will either receive an `ObjectDisposedException` or produce a valid
derived key.

## SP800108HmacCounterKdf.SP800108HmacCounterKdf(Byte[], HashAlgorithmName) constructor

```csharp
public SP800108HmacCounterKdf (byte[] key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of `SP800108HmacCounterKdf` using a specified key and HMAC algorithm.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.

-or-

`key` is `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

To be added.

## SP800108HmacCounterKdf.SP800108HmacCounterKdf(Byte>, HashAlgorithmName) constructor

```csharp
public SP800108HmacCounterKdf (ReadOnlySpan<byte> key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of `SP800108HmacCounterKdf` using a specified key and HMAC algorithm.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

To be added.

## SP800108HmacCounterKdf.DeriveBytes(Byte[], HashAlgorithmName, Byte[], Byte[], Int32) method

```csharp
public static byte[] DeriveBytes (byte[] key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, byte[] label, byte[] context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

-or-

`label` is `null`.

-or-

`context` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

To be added.

## SP800108HmacCounterKdf.DeriveBytes(Byte[], HashAlgorithmName, String, String, Int32) method

```csharp
public static byte[] DeriveBytes (byte[] key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, string label, string context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

-or-

`label` is `null`.

-or-

`context` is `null`.

-or-

`hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

`label` and `context` will be converted to bytes using the UTF-8 encoding. For other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.

## SP800108HmacCounterKdf.DeriveBytes(Byte>, HashAlgorithmName, Byte>, Byte>, Int32) method

```csharp
public static byte[] DeriveBytes (ReadOnlySpan<byte> key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> label, ReadOnlySpan<byte> context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

To be added.

## SP800108HmacCounterKdf.DeriveBytes(Byte>, HashAlgorithmName, Byte>, Byte>, Byte>) method

```csharp
public static void DeriveBytes (ReadOnlySpan<byte> key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<byte> label, ReadOnlySpan<byte> context, Span<byte> destination);
```

Fills a buffer with a derived key.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `destination`: The buffer which will receive the derived key.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `destination` is larger than the maximum number of bytes that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

To be added.

## SP800108HmacCounterKdf.DeriveBytes(Byte>, HashAlgorithmName, Char>, Char>, Int32) method

```csharp
public static byte[] DeriveBytes (ReadOnlySpan<byte> key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<char> label, ReadOnlySpan<char> context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

`label` and `context` will be converted to bytes using the UTF-8 encoding.
for other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.

## SP800108HmacCounterKdf.DeriveBytes(Byte>, HashAlgorithmName, Char>, Char>, Byte>) method

```csharp
public static void DeriveBytes (ReadOnlySpan<byte> key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, ReadOnlySpan<char> label, ReadOnlySpan<char> context, Span<byte> destination);
```

Fills a buffer with a derived key.

Parameters:

- `key`: The key-derivation key.
- `hashAlgorithm`: The HMAC algorithm.
- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `destination`: The buffer which will receive the derived key.

Exceptions:

- `ArgumentNullException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's `null`.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that's empty.
- `ArgumentOutOfRangeException`: `destination` is larger than the maximum number of bytes that can be derived.
- `CryptographicException`: `hashAlgorithm` is not a known or supported hash algorithm.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.
- `PlatformNotSupportedException`: The current platform does not have a supported implementation of HMAC.

`label` and `context` will be converted to bytes using the UTF-8 encoding.
for other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.

## SP800108HmacCounterKdf.DeriveKey(Byte[], Byte[], Int32) method

```csharp
public byte[] DeriveKey (byte[] label, byte[] context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentNullException`: `label` is `null`.

-or-

`context` is `null`.
- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.

To be added.

## SP800108HmacCounterKdf.DeriveKey(Byte>, Byte>, Int32) method

```csharp
public byte[] DeriveKey (ReadOnlySpan<byte> label, ReadOnlySpan<byte> context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.

To be added.

## SP800108HmacCounterKdf.DeriveKey(Byte>, Byte>, Byte>) method

```csharp
public void DeriveKey (ReadOnlySpan<byte> label, ReadOnlySpan<byte> context, Span<byte> destination);
```

Fills a buffer with a derived key.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `destination`: The buffer which will receive the derived key.

Exceptions:

- `ArgumentNullException`: `label` is `null`.

-or-

`context` is `null`.
- `ArgumentOutOfRangeException`: `destination` is larger than the maximum number of bytes that can be derived.

To be added.

## SP800108HmacCounterKdf.DeriveKey(Char>, Char>, Int32) method

```csharp
public byte[] DeriveKey (ReadOnlySpan<char> label, ReadOnlySpan<char> context, int derivedKeyLengthInBytes);
```

Derives a key of a specified length.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `derivedKeyLengthInBytes`: The length of the derived key, in bytes.

Returns: An array containing the derived key.

Exceptions:

- `ArgumentOutOfRangeException`: `derivedKeyLengthInBytes` is negative or larger than the maximum number of bytes
that can be derived.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.

`label` and `context` will be converted to bytes using the UTF-8 encoding.
for other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.

## SP800108HmacCounterKdf.DeriveKey(Char>, Char>, Byte>) method

```csharp
public void DeriveKey (ReadOnlySpan<char> label, ReadOnlySpan<char> context, Span<byte> destination);
```

Fills a buffer with a derived key.

Parameters:

- `label`: The label that identifies the purpose for the derived key.
- `context`: The context containing information related to the derived key.
- `destination`: The buffer which will receive the derived key.

Exceptions:

- `ArgumentOutOfRangeException`: `destination` is larger than the maximum number of bytes that can be derived.
- `EncoderFallbackException`: `label` or `context` contains text that cannot be converted to UTF-8.

`label` and `context` will be converted to bytes using the UTF-8 encoding.
for other encodings, perform the conversion using the desired encoding and use an overload that accepts the
label and context as a sequence of bytes.
