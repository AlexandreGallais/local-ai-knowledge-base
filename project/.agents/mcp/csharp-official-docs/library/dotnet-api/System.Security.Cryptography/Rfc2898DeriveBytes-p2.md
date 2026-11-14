---
title: "Rfc2898DeriveBytes class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Rfc2898DeriveBytes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rfc2898DeriveBytes class (part 2 of 2)

## Rfc2898DeriveBytes.Pbkdf2(Byte>, Byte>, Byte>, Int32, HashAlgorithmName) method

```csharp
public static void Pbkdf2 (ReadOnlySpan<byte> password, ReadOnlySpan<byte> salt, Span<byte> destination, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Fills a buffer with a PBKDF2 derived key.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `destination`: The buffer to fill with a derived key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.

Exceptions:

- `ArgumentOutOfRangeException`: `iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.

To be added.

## Rfc2898DeriveBytes.Pbkdf2(Char>, Byte>, Int32, HashAlgorithmName, Int32) method

```csharp
public static byte[] Pbkdf2 (ReadOnlySpan<char> password, ReadOnlySpan<byte> salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, int outputLength);
```

Creates a PBKDF2 derived key from a password.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.
- `outputLength`: The size of the key to derive, in bytes.

Returns: A byte array of length `outputLength` that is filled with pseudo-random key bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is not zero or a positive value.

-or-

`iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.
- `EncoderFallbackException`: `password` contains text that cannot be converted to UTF8.

#### Remarks

The `password` is converted to bytes using the UTF8 encoding. For other encodings, convert the password <example-value> to bytes using the appropriate `Encoding` and use `Pbkdf2`.

## Rfc2898DeriveBytes.Pbkdf2(Char>, Byte>, Byte>, Int32, HashAlgorithmName) method

```csharp
public static void Pbkdf2 (ReadOnlySpan<char> password, ReadOnlySpan<byte> salt, Span<byte> destination, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Fills a buffer with a PBKDF2 derived key.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `destination`: The buffer to fill with a derived key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.

Exceptions:

- `ArgumentOutOfRangeException`: `iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.
- `EncoderFallbackException`: `password` contains text that cannot be converted to UTF8.

#### Remarks

The `password` will be converted to bytes using the UTF8 encoding. For
other encodings, convert the password <example-value> to bytes using the appropriate `Encoding`
and use `Pbkdf2`.

## Rfc2898DeriveBytes.Pbkdf2(String, Byte[], Int32, HashAlgorithmName, Int32) method

```csharp
public static byte[] Pbkdf2 (string password, byte[] salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, int outputLength);
```

Creates a PBKDF2 derived key from a password.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.
- `outputLength`: The size of the key to derive, in bytes.

Returns: A byte array of length `outputLength` that is filled with pseudo-random key bytes.

Exceptions:

- `ArgumentNullException`: `password` or `salt` is `null`.
- `ArgumentOutOfRangeException`: `outputLength` is not zero or a positive value.

-or-

`iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.
- `EncoderFallbackException`: `password` contains text that cannot be converted to UTF8.

#### Remarks

The `password` is converted to bytes using the UTF8 encoding. For other encodings, convert the password <example-value> to bytes using the appropriate `Encoding` and use `Pbkdf2`.

## Rfc2898DeriveBytes.Reset() method

```csharp
public override void Reset ();
```

Resets the state of the operation.

#### Remarks
This method is automatically called if the salt or iteration count is modified.

#### Examples
The following example shows how to use the `Rfc2898DeriveBytes.Reset` method. This code example is part of a larger example provided for the `Rfc2898DeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Rfc2898DeriveBytes/Overview/rfc28981.cs._
