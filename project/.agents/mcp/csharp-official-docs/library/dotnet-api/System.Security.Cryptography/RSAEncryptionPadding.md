---
title: "RSAEncryptionPadding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAEncryptionPadding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAEncryptionPadding class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RSAEncryptionPadding : IEquatable<System.Security.Cryptography.RSAEncryptionPadding>
```

Specifies the padding mode and parameters to use with RSA encryption or decryption operations.

To be added.

## RSAEncryptionPadding.Mode property

```csharp
public System.Security.Cryptography.RSAEncryptionPaddingMode Mode { get; }
```

Gets the padding mode represented by this `RSAEncryptionPadding` instance.

Returns: A padding mode.

To be added.

## RSAEncryptionPadding.OaepHashAlgorithm property

```csharp
public System.Security.Cryptography.HashAlgorithmName OaepHashAlgorithm { get; }
```

Gets the hash algorithm used in conjunction with the `RSAEncryptionPaddingMode.Oaep` padding mode.

Returns: The hash algorithm.

#### Remarks

If the value of the `Mode` property is not `Oaep`, then `Name` will be `null`.

## RSAEncryptionPadding.OaepSHA1 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA1 { get; }
```

Gets an object that represents the Optimal Asymmetric Encryption Padding (OAEP) encryption standard with a SHA-1 hash algorithm.

Returns: An object that represents the OAEP encryption standard with a SHA-1 hash algorithm.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## RSAEncryptionPadding.OaepSHA256 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA256 { get; }
```

Gets an object that represents the Optimal Asymmetric Encryption Padding (OAEP) encryption standard with a SHA-256 hash algorithm.

Returns: An object that represents the OAEP encryption standard with a SHA-256 hash algorithm.

To be added.

## RSAEncryptionPadding.OaepSHA3_256 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA3_256 { get; }
```

`RSAEncryptionPaddingMode.Oaep` mode with SHA-3-256 hash algorithm.

Returns: To be added.

To be added.

## RSAEncryptionPadding.OaepSHA3_384 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA3_384 { get; }
```

`RSAEncryptionPaddingMode.Oaep` mode with SHA-3-384 hash algorithm.

Returns: To be added.

To be added.

## RSAEncryptionPadding.OaepSHA3_512 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA3_512 { get; }
```

`RSAEncryptionPaddingMode.Oaep` mode with SHA-3-512 hash algorithm.

Returns: To be added.

To be added.

## RSAEncryptionPadding.OaepSHA384 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA384 { get; }
```

Gets an object that represents the Optimal Asymmetric Encryption Padding (OAEP) encryption standard with a SHA-384 hash algorithm.

Returns: An object that represents the OAEP encryption standard with a SHA-384 hash algorithm.

To be added.

## RSAEncryptionPadding.OaepSHA512 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding OaepSHA512 { get; }
```

Gets an object that represents the Optimal Asymmetric Encryption Padding (OAEP) encryption standard with a SHA-512 hash algorithm.

Returns: An object that represents the OAEP encryption standard with a SHA-512 hash algorithm.

To be added.

## RSAEncryptionPadding.Pkcs1 property

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding Pkcs1 { get; }
```

Gets an object that represents the PKCS #1 encryption standard.

Returns: An object that represents the PKCS #1 encryption standard.

To be added.

## RSAEncryptionPadding.CreateOaep(HashAlgorithmName) method

```csharp
public static System.Security.Cryptography.RSAEncryptionPadding CreateOaep (System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Creates a new `RSAEncryptionPadding` instance whose `RSAEncryptionPadding.Mode` is `RSAEncryptionPaddingMode.Oaep` with the given hash algorithm.

Parameters:

- `hashAlgorithm`: The hash algorithm.

Returns: An object whose mode is `RSAEncryptionPadding.Mode` is `RSAEncryptionPaddingMode.Oaep` with the hash algorithm specified by `hashAlgorithm`.

Exceptions:

- `ArgumentException`: The `HashAlgorithmName.Name` property of `hashAlgorithm` is either `null` or `String.Empty`.

To be added.

## RSAEncryptionPadding.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the current instance is equal to the specified object.

Parameters:

- `obj`: The object to compare.

Returns: `true` if `obj` is equal to the current instance; otherwise, `false`.

#### Remarks
`obj` is equal to the current instance if it is a `RSAEncryptionPadding` object and the two objects have identical `RSAEncryptionPadding.Mode` and `OaepHashAlgorithm` property values.

## RSAEncryptionPadding.Equals(RSAEncryptionPadding) method

```csharp
public bool Equals (System.Security.Cryptography.RSAEncryptionPadding? other);
```

Determines whether the current instance is equal to the specified `RSAEncryptionPadding` object.

Parameters:

- `other`: The object to compare.

Returns: `true` if `other` is equal to the current instance; otherwise, `false`.

#### Remarks
`instance` and the current instance are equal if they have identical `RSAEncryptionPadding.Mode` and `OaepHashAlgorithm` property values.

## RSAEncryptionPadding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code of this `RSAEncryptionPadding` object.

Returns: The hash code of this instance.

To be added.

## RSAEncryptionPadding.op_Equality(RSAEncryptionPadding, RSAEncryptionPadding) method

```csharp
public static bool operator == (System.Security.Cryptography.RSAEncryptionPadding? left, System.Security.Cryptography.RSAEncryptionPadding? right);
```

Indicates whether two specified `RSAEncryptionPadding` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
Two `RSAEncryptionPadding` objects are equal if their `RSAEncryptionPadding.Mode` and `OaepHashAlgorithm` property values are equal.

## RSAEncryptionPadding.op_Inequality(RSAEncryptionPadding, RSAEncryptionPadding) method

```csharp
public static bool operator != (System.Security.Cryptography.RSAEncryptionPadding? left, System.Security.Cryptography.RSAEncryptionPadding? right);
```

Indicates whether two specified `RSAEncryptionPadding` objects are unequal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are not equal; otherwise, `false`.

#### Remarks
Two `RSAEncryptionPadding` objects are not equal if their `RSAEncryptionPadding.Mode` and `OaepHashAlgorithm` property values are not equal.

## RSAEncryptionPadding.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of the current `RSAEncryptionPadding` instance.

Returns: The string representation of the current object.

#### Remarks
The string representation of a `RSAEncryptionPadding` object is the concatenation of its `RSAEncryptionPadding.Mode` and `OaepHashAlgorithm.Name` properties.
