---
title: "MLDsa class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MLDsa.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MLDsa class (part 4 of 4)

## MLDsa.VerifyPreHash(Byte[], Byte[], String, Byte[]) method

```csharp
public bool VerifyPreHash (byte[] hash, byte[] signature, string hashAlgorithmOid, byte[]? context = default);
```

Verifies that the specified FIPS 204 pre-hash signature is valid for this key and the provided hash.

Parameters:

- `hash`: The hash to verify.
- `signature`: The signature to verify.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: The context value which was provided during signing.

The default value is `null`.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hash` or `signature` or `hashAlgorithmOid` is `null`.
- `ArgumentOutOfRangeException`: `context` has a length in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

An error occurred while verifying the hash.

A `null` context is treated as empty.

## MLDsa.VerifyPreHash(Byte>, Byte>, String, Byte>) method

```csharp
public bool VerifyPreHash (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> signature, string hashAlgorithmOid, ReadOnlySpan<byte> context = default);
```

Verifies that the specified FIPS 204 pre-hash signature is valid for this key and the provided hash.

Parameters:

- `hash`: The hash to verify.
- `signature`: The signature to verify.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `context`: The context value which was provided during signing.

The default value is an empty buffer.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `hashAlgorithmOid` is `null`.
- `ArgumentOutOfRangeException`: `context` has a `ReadOnlySpan<T>.Length` in excess of 255 bytes.
- `ObjectDisposedException`: This instance has been disposed.
- `CryptographicException`: `hashAlgorithmOid` is not a well-formed OID.

-or-

`hashAlgorithmOid` is a well-known algorithm and `hash` does not have the expected length.

-or-

An error occurred while verifying the hash.

To be added.

## MLDsa.VerifyPreHashCore(Byte>, Byte>, String, Byte>) method

```csharp
protected abstract bool VerifyPreHashCore (ReadOnlySpan<byte> hash, ReadOnlySpan<byte> context, string hashAlgorithmOid, ReadOnlySpan<byte> signature);
```

When overridden in a derived class, verifies the pre-hash signature of the specified hash and context.

Parameters:

- `hash`: The data to verify.
- `context`: The signature context.
- `hashAlgorithmOid`: The OID of the hash algorithm used to create the hash.
- `signature`: The signature to verify.

Returns: `true` if the signature validates the hash; otherwise, `false`.

Exceptions:

- `CryptographicException`: An error occurred while verifying the hash.

To be added.
