---
title: "Rijndael class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Rijndael.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rijndael class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class Rijndael : System.Security.Cryptography.SymmetricAlgorithm
```

Represents the base class from which all implementations of the `Rijndael` symmetric encryption algorithm must inherit.

To be added.

## Rijndael.Rijndael() constructor

```csharp
protected Rijndael ();
```

Initializes a new instance of `Rijndael`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class.

This method initializes the protected fields of `SymmetricAlgorithm` to the default values listed in the following table.

|Field|Default Value|
|-----------|-------------------|
|`KeySizeValue`|256|
|`BlockSizeValue`|128|
|`FeedbackSizeValue`|128|

## Rijndael.Create() method

```csharp
public static System.Security.Cryptography.Rijndael Create ();
```

Creates a cryptographic object to perform the `Rijndael` algorithm.

Returns: A cryptographic object.

Exceptions:

- `TargetInvocationException`: The algorithm was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

#### Remarks
The default implementation of `Rijndael` is `RijndaelManaged`.

## Rijndael.Create(String) method

```csharp
public static System.Security.Cryptography.Rijndael? Create (string algName);
```

Creates a cryptographic object to perform the specified implementation of the `Rijndael` algorithm.

Parameters:

- `algName`: The name of the specific implementation of `Rijndael` to create.

Returns: A cryptographic object.

Exceptions:

- `TargetInvocationException`: The algorithm described by the `algName` parameter was used with Federal Information Processing Standards (FIPS) mode enabled, but is not FIPS compatible.

To be added.
