---
title: "DSACryptoServiceProvider class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSACryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSACryptoServiceProvider class (part 2 of 2)

## DSACryptoServiceProvider.SignData(Byte[], Int32, Int32) method

```csharp
public byte[] SignData (byte[] buffer, int offset, int count);
```

Signs a byte array from the specified start point to the specified end point.

Parameters:

- `buffer`: The input data to sign.
- `offset`: The offset into the array from which to begin using data.
- `count`: The number of bytes in the array to use as data.

Returns: The `DSA` signature for the specified data.

#### Remarks
This method creates a digital signature that is verified using the `DSACryptoServiceProvider.VerifyData` method.

`DSA` uses the `SHA1` hash algorithm.

## DSACryptoServiceProvider.SignHash(Byte[], String) method

```csharp
public byte[] SignHash (byte[] rgbHash, string? str);
```

Computes the signature for the specified hash value by encrypting it with the private key.

Parameters:

- `rgbHash`: The hash value of the data to be signed.
- `str`: The name of the hash algorithm used to create the hash value of the data.

Returns: The `DSA` signature for the specified hash value.

Exceptions:

- `ArgumentNullException`: The `rgbHash` parameter is `null`.
- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

There is no private key.

#### Remarks
This method creates a digital signature that is verified using the `DSACryptoServiceProvider.VerifyHash` method.

`DSA` uses the `SHA1` hash algorithm.

## DSACryptoServiceProvider.VerifyData(Byte[], Byte[]) method

```csharp
public bool VerifyData (byte[] rgbData, byte[] rgbSignature);
```

Verifies the specified signature data by comparing it to the signature computed for the specified data.

Parameters:

- `rgbData`: The data that was signed.
- `rgbSignature`: The signature data to be verified.

Returns: `true` if the signature verifies as valid; otherwise, `false`.

#### Remarks
This method verifies the `DSA` digital signature produced by `DSACryptoServiceProvider.SignData`.

`DSA` uses the `SHA1` hash algorithm.

## DSACryptoServiceProvider.VerifyHash(Byte[], String, Byte[]) method

```csharp
public bool VerifyHash (byte[] rgbHash, string? str, byte[] rgbSignature);
```

Verifies the specified signature data by comparing it to the signature computed for the specified hash value.

Parameters:

- `rgbHash`: The hash value of the data to be signed.
- `str`: The name of the hash algorithm used to create the hash value of the data.
- `rgbSignature`: The signature data to be verified.

Returns: `true` if the signature verifies as valid; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `rgbHash` parameter is `null`.

-or-

The `rgbSignature` parameter is `null`.
- `CryptographicException`: The cryptographic service provider (CSP) cannot be acquired.

-or-

The signature cannot be verified.

#### Remarks
This method verifies the `DSA` digital signature produced by `DSACryptoServiceProvider.SignHash`.

If the `str` parameter is `null`, the default hash algorithm (SHA-1) is used.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## DSACryptoServiceProvider.VerifySignature(Byte[], Byte[]) method

```csharp
public override bool VerifySignature (byte[] rgbHash, byte[] rgbSignature);
```

Verifies the `DSA` signature for the specified data.

Parameters:

- `rgbHash`: The data signed with `rgbSignature`.
- `rgbSignature`: The signature to be verified for `rgbHash`.

Returns: `true` if `rgbSignature` matches the signature computed using the specified hash algorithm and key on `rgbHash`; otherwise, `false`.

To be added.
