---
title: "RC2 class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RC2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RC2 class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class RC2 : System.Security.Cryptography.SymmetricAlgorithm
```

Represents the base class from which all implementations of the `RC2` algorithm must derive.

#### Remarks

> **Note:**
>  A newer symmetric encryption algorithm, Advanced Encryption Standard (AES), is available. Consider using the `Aes` algorithm and its derived classes instead of the `RC2` class. Use `RC2` only for compatibility with legacy applications and data.

## RC2.RC2() constructor

```csharp
protected RC2 ();
```

Initializes a new instance of `RC2`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

This algorithm supports key <example-value> from 40 bits to 1024 bits in increments of 8 bits, but the `RC2CryptoServiceProvider` implementation only supports key <example-value> from 40 bits to 128 bits in increments of 8 bits.

This method initializes the protected fields of `SymmetricAlgorithm` to the default values listed in the following table.

|Field|Default Value|
|-----------|-------------------|
|`KeySizeValue`|128|
|`BlockSizeValue`|64|
|`FeedbackSizeValue`|64|

## RC2.EffectiveKeySize property

```csharp
public virtual int EffectiveKeySize { get; set; }
```

Gets or sets the effective size of the secret key used by the `RC2` algorithm in bits.

Returns: The effective key size used by the `RC2` algorithm.

Exceptions:

- `CryptographicException`: The effective key size is invalid.

To be added.

## RC2.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size of the secret key used by the `RC2` algorithm in bits.

Returns: The size of the secret key used by the `RC2` algorithm.

Exceptions:

- `CryptographicException`: The value for the RC2 key size is less than the effective key size value.

#### Remarks
This algorithm supports key <example-value> from 40 bits to 1024 bits in increments of 8 bits, but the RC2CryptoServiceProvider implementation only supports key <example-value> from 40 bits to 128 bits in increments of 8 bits.

## RC2.Create() method

```csharp
public static System.Security.Cryptography.RC2 Create ();
```

Creates an instance of a cryptographic object to perform the `RC2` algorithm.

Returns: An instance of a cryptographic object.

Exceptions:

- `TargetInvocationException`: The algorithm was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

#### Remarks
Use this method to create an instance of the RC2 class that you can use to encrypt and decrypt data.

#### Examples
The following example shows how to create and use an RC2 object to encrypt and decrypt data in a file.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2/Create/fileexample.cs._

The following example shows how to create and use an RC2 object to encrypt and decrypt data in memory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RC2/Create/memoryexample.cs._

## RC2.Create(String) method

```csharp
public static System.Security.Cryptography.RC2? Create (string AlgName);
```

Creates an instance of a cryptographic object to perform the specified implementation of the `RC2` algorithm.

Parameters:

- `AlgName`: The name of the specific implementation of `RC2` to use.

Returns: An instance of a cryptographic object.

Exceptions:

- `TargetInvocationException`: The algorithm described by the `AlgName` parameter was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

To be added.

## RC2.EffectiveKeySizeValue field

```csharp
protected int EffectiveKeySizeValue;
```

Represents the effective size of the secret key used by the `RC2` algorithm in bits.

#### Remarks
This field is accessed through the `EffectiveKeySize` property.
