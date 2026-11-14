---
title: "CryptoConfig class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptoConfig.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptoConfig class

Namespace: `System.Security.Cryptography`

```csharp
public class CryptoConfig
```

Accesses the cryptography configuration information.

#### Remarks
The following table shows the simple names recognized by this class and the default algorithm implementations to which they map.

|Simple name|Algorithm implementation|
|-----------------|------------------------------|
|3DES, Triple DES, TripleDES, System.Security.Cryptography.TripleDES|`TripleDESCryptoServiceProvider`|
|AES, System.Security.Cryptography.AesCryptoServiceProvider|`AesCryptoServiceProvider`|
|AesManaged, System.Security.Cryptography.AesManaged|`AesManaged`|
|System.Security.Cryptography.AsymmetricAlgorithm|`RSACryptoServiceProvider`|
|DES, System.Security.Cryptography.DES|`DESCryptoServiceProvider`|
|DSA, System.Security.Cryptography.DSA|`DSACryptoServiceProvider`|
|ECDH, ECDiffieHellman, ECDiffieHellmanCng, System.Security.Cryptography.ECDiffieHellmanCng|`ECDiffieHellmanCng`|
|ECDsa, ECDsaCng, System.Security.Cryptography.ECDsaCng|`ECDsaCng`|
|System.Security.Cryptography.HashAlgorithm|`SHA1CryptoServiceProvider`|
|HMAC, System.Security.Cryptography.HMAC|`HMACSHA1`|
|HMACMD5, System.Security.Cryptography.HMACMD5|`HMACMD5`|
|HMACRIPEMD160, System.Security.Cryptography.HMACRIPEMD160|`HMACRIPEMD160`|
|HMACSHA1, System.Security.Cryptography.HMACSHA1|`HMACSHA1`|
|HMACSHA256, System.Security.Cryptography.HMACSHA256|`HMACSHA256`|
|HMACSHA384, System.Security.Cryptography.HMACSHA384|`HMACSHA384`|
|HMACSHA512, System.Security.Cryptography.HMACSHA512|`HMACSHA512`|
|System.Security.Cryptography.KeyedHashAlgorithm|`HMACSHA1`|
|MACTripleDES, System.Security.Cryptography.MACTripleDES|`MACTripleDES`|
|MD5, System.Security.Cryptography.MD5|`MD5CryptoServiceProvider`|
|System.Security.Cryptography.MD5Cng|`MD5Cng`|
|RandomNumberGenerator|`RNGCryptoServiceProvider`|
|RC2, System.Security.Cryptography.RC2|`RC2CryptoServiceProvider`|
|Rijndael, System.Security.Cryptography.Rijndael|`RijndaelManaged`|
|RIPEMD160, RIPEMD-160, System.Security.Cryptography.RIPEMD160Managed|`RIPEMD160Managed`|
|RSA, System.Security.Cryptography.RSA|`RSACryptoServiceProvider`|
|SHA, SHA1, System.Security.Cryptography.SHA1|`SHA1CryptoServiceProvider`|
|System.Security.Cryptography.SHA1Cng|`SHA1Cng`|
|SHA256, SHA-256, System.Security.Cryptography.SHA256|`SHA256Managed`|
|System.Security.Cryptography.SHA256Cng|`SHA256Cng`|
|System.Security.Cryptography.SHA256CryptoServiceProvider|`SHA256CryptoServiceProvider`|
|SHA384, SHA-384, System.Security.Cryptography.SHA384|`SHA384Managed`|
|System.Security.Cryptography.SHA384Cng|`SHA384Cng`|
|System.Security.Cryptography.SHA384CryptoServiceProvider|`SHA384CryptoServiceProvider`|
|SHA512, SHA-512, System.Security.Cryptography.SHA512|`SHA512Managed`|
|System.Security.Cryptography.SHA512Cng|`SHA512Cng`|
|System.Security.Cryptography.SHA512CryptoServiceProvider|`SHA512CryptoServiceProvider`|
|System.Security.Cryptography.SymmetricAlgorithm|`RijndaelManaged`|

#### Examples
The following code example demonstrates how to use members of the `CryptoConfig` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptoConfig/Overview/members.cs._

## CryptoConfig.CryptoConfig() constructor

```csharp
public CryptoConfig ();
```

Initializes a new instance of the `CryptoConfig` class.

To be added.

## CryptoConfig.AllowOnlyFipsAlgorithms property

```csharp
public static bool AllowOnlyFipsAlgorithms { get; }
```

Indicates whether the runtime should enforce the policy to create only Federal Information Processing Standard (FIPS) certified algorithms.

Returns: `true` to enforce the policy; otherwise, `false`.

#### Remarks
If `false`, any algorithm may be created.

## CryptoConfig.AddAlgorithm(Type, String[]) method

```csharp
public static void AddAlgorithm (Type algorithm, params string[] names);
```

Adds a set of names to algorithm mappings to be used for the current application domain.

Parameters:

- `algorithm`: The algorithm to map to.
- `names`: An array of names to map to the algorithm.

Exceptions:

- `ArgumentNullException`: The `algorithm` or `names` parameter is `null`.
- `ArgumentException`: `algorithm` cannot be accessed from outside the assembly.

-or-

One of the entries in the `names` parameter is empty or `null`.

The specified mappings take precedence over the built-in mappings.

## CryptoConfig.AddOID(String, String[]) method

```csharp
public static void AddOID (string oid, params string[] names);
```

Adds a set of names to object identifier (OID) mappings to be used for the current application domain.

Parameters:

- `oid`: The object identifier (OID) to map to.
- `names`: An array of names to map to the OID.

Exceptions:

- `ArgumentNullException`: The `oid` or `names` parameter is `null`.
- `ArgumentException`: One of the entries in the `names` parameter is empty or `null`.

The specified mappings take precedence over the built-in mappings.

## CryptoConfig.CreateFromName(String) method

```csharp
public static object? CreateFromName (string name);
```

Creates a new instance of the specified cryptographic object.

Parameters:

- `name`: The simple name of the cryptographic object of which to create an instance.

Returns: A new instance of the specified cryptographic object.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.
- `TargetInvocationException`: The algorithm described by the `name` parameter was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

#### Remarks
For a list of simple names recognized by this class, see `CryptoConfig`.

#### Examples
The following code example demonstrates how to call the `CryptoConfig.CreateFromName` method to create a new SHA-1 provider. This code example is part of a larger example provided for the `CryptoConfig` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptoConfig/Overview/members.cs._

## CryptoConfig.CreateFromName(String, Object[]) method

```csharp
public static object? CreateFromName (string name, params object?[]? args);
```

Creates a new instance of the specified cryptographic object with the specified arguments.

Parameters:

- `name`: The simple name of the cryptographic object of which to create an instance.
- `args`: The arguments used to create the specified cryptographic object.

Returns: A new instance of the specified cryptographic object.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.
- `TargetInvocationException`: The algorithm described by the `name` parameter was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

#### Remarks
For a list of simple names recognized by this class, see `CryptoConfig`.

#### Examples
The following code example demonstrates how to call the `CryptoConfig.CreateFromName` method to initialize a new RSA provider instance accessing the `TestContainer` key container. This code example is part of a larger example provided for the `CryptoConfig` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptoConfig/Overview/members.cs._

## CryptoConfig.EncodeOID(String) method

```csharp
public static byte[] EncodeOID (string str);
```

Encodes the specified object identifier (OID).

Parameters:

- `str`: The OID to encode.

Returns: A byte array containing the encoded OID.

Exceptions:

- `ArgumentNullException`: The `str` parameter is `null`.
- `CryptographicUnexpectedOperationException`: An error occurred while encoding the OID.
- `PlatformNotSupportedException`: On browser and WASI platforms: In all cases.

To be added.

## CryptoConfig.MapNameToOID(String) method

```csharp
public static string? MapNameToOID (string name);
```

Gets the object identifier (OID) of the algorithm corresponding to the specified simple name.

Parameters:

- `name`: The simple name of the algorithm for which to get the OID.

Returns: The OID of the specified algorithm.

Exceptions:

- `ArgumentNullException`: The `name` parameter is `null`.

#### Remarks
For a list of simple names recognized by this class, see `CryptoConfig`.

#### Examples
The following code example demonstrates how to call the `CryptoConfig.MapNameToOID` method to retrieve an object identifier (OID) from the string name of the SHA-1 algorithm. This code example is part of a larger example provided for the `CryptoConfig` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptoConfig/Overview/members.cs._
