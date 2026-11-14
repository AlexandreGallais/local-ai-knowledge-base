---
title: "HKDF class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HKDF.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HKDF class

Namespace: `System.Security.Cryptography`

```csharp
public static class HKDF
```

RFC5869  HMAC-based Extract-and-Expand Key <example-value> (HKDF)

#### Remarks

In situations where the input key <example-value> is already a uniformly random bit string, the HKDF standard allows the Extract phase to be skipped and the master key to be used directly as the pseudorandom key.
See RFC5869 for more information.

On Windows in .NET 11 and later, `HKDF.DeriveKey` throws `CryptographicException` if the input keying material exceeds 2,048 bytes. `HKDF.Expand` throws the same exception if the pseudorandom key <example-value> 2,048 bytes.

## HKDF.DeriveKey(HashAlgorithmName, Byte[], Int32, Byte[], Byte[]) method

```csharp
public static byte[] DeriveKey (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, byte[] ikm, int outputLength, byte[]? salt = default, byte[]? info = default);
```

Performs the key <example-value> HKDF Expand and Extract functions.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `ikm`: The input keying material.
- `outputLength`: The length of the output keying material.
- `salt`: The optional salt value (a non-secret <example-value> value). If not provided, it defaults to a byte array of the same length as the output of the specified hash algorithm.
- `info`: The optional context and application specific information.

Returns: The output keying material.

Exceptions:

- `ArgumentNullException`: `ikm`is `null`.
- `ArgumentOutOfRangeException`: `outputLength` is less than 1.
- `CryptographicException`: On Windows in .NET 11 and later, `ikm` exceeds 2,048 bytes.

To be added.

## HKDF.DeriveKey(HashAlgorithmName, Byte>, Byte>, Byte>, Byte>) method

```csharp
public static void DeriveKey (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, ReadOnlySpan<byte> ikm, Span<byte> output, ReadOnlySpan<byte> salt, ReadOnlySpan<byte> info);
```

Performs the key <example-value> HKDF Expand and Extract functions.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `ikm`: The input keying material.
- `output`: The output buffer that represents output keying material.
- `salt`: The salt value (a non-secret <example-value> value).
- `info`: The context and application specific information (can be an empty span).

Exceptions:

- `ArgumentException`: `output` is empty, or is larger than the maximum allowed length.
- `CryptographicException`: On Windows in .NET 11 and later, `ikm` exceeds 2,048 bytes.

To be added.

## HKDF.Expand(HashAlgorithmName, Byte[], Int32, Byte[]) method

```csharp
public static byte[] Expand (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, byte[] prk, int outputLength, byte[]? info = default);
```

Performs the HKDF-Expand function See section 2.3 of RFC5869.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `prk`: The pseudorandom key that is at least as long as the output byte array of the specified hash algorithm (usually the output from the Extract step).
- `outputLength`: The length of the output keying material.
- `info`: The optional context and application specific information.

Returns: The output keying material.

Exceptions:

- `ArgumentNullException`: `prk`is `null`.
- `ArgumentOutOfRangeException`: `outputLength` is less than 1.
- `CryptographicException`: On Windows in .NET 11 and later, `prk` exceeds 2,048 bytes.

To be added.

## HKDF.Expand(HashAlgorithmName, Byte>, Byte>, Byte>) method

```csharp
public static void Expand (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, ReadOnlySpan<byte> prk, Span<byte> output, ReadOnlySpan<byte> info);
```

Performs the HKDF-Expand function. See section 2.3 of RFC5869.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `prk`: The pseudorandom key that is at least as long as as the output byte array of the specified hash algorithm (usually the output from the Extract step).
- `output`: The destination buffer to receive the output keying material.
- `info`: The context and application specific information (can be an empty span).

Exceptions:

- `ArgumentException`: `output` is empty, or is larger than the maximum allowed length.
- `CryptographicException`: On Windows in .NET 11 and later, `prk` exceeds 2,048 bytes.

To be added.

## HKDF.Extract(HashAlgorithmName, Byte[], Byte[]) method

```csharp
public static byte[] Extract (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, byte[] ikm, byte[]? salt = default);
```

Performs the HKDF-Extract function.
See section 2.2 of RFC5869.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `ikm`: The input keying material.
- `salt`: The optional salt value (a non-secret <example-value> value). If not provided it defaults to a byte array of the same length as the output of the specified hash algorithm.

Returns: The pseudorandom key (prk).

To be added.

## HKDF.Extract(HashAlgorithmName, Byte>, Byte>, Byte>) method

```csharp
public static int Extract (System.Security.Cryptography.HashAlgorithmName hashAlgorithmName, ReadOnlySpan<byte> ikm, ReadOnlySpan<byte> salt, Span<byte> prk);
```

Performs the HKDF-Extract function.
See section 2.2 of RFC5869.

Parameters:

- `hashAlgorithmName`: The hash algorithm used for HMAC operations.
- `ikm`: The input keying material.
- `salt`: The salt value (a non-secret <example-value> value).
- `prk`: The destination buffer to receive the pseudorandom key (prk).

Returns: The number of bytes written to the `prk` buffer.

To be added.
