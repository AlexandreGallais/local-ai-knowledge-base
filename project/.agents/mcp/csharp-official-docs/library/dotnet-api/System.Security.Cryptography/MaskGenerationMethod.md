---
title: "MaskGenerationMethod class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/MaskGenerationMethod.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskGenerationMethod class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class MaskGenerationMethod
```

Represents the abstract class from which all mask generator algorithms must derive.

#### Remarks
Derived classes of `MaskGenerationMethod` compute masks that are used in key <example-value> algorithms such as Optimal Asymmetric Encryption Padding (OAEP).

This class is used by implementations of key <example-value> algorithms only for mask generation. Application code does not use this class directly.

#### Examples
The following code example demonstrates how to derive from the `MaskGenerationMethod` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/MaskGenerationMethod/Overview/maskgenerator.cs._

## MaskGenerationMethod.MaskGenerationMethod() constructor

```csharp
protected MaskGenerationMethod ();
```

Initializes a new instance of the `MaskGenerationMethod` class.

To be added.

## MaskGenerationMethod.GenerateMask(Byte[], Int32) method

```csharp
public abstract byte[] GenerateMask (byte[] rgbSeed, int cbReturn);
```

When overridden in a derived class, generates a mask with the specified length using the specified random seed.

Parameters:

- `rgbSeed`: The random seed to use to compute the mask.
- `cbReturn`: The length of the generated mask in bytes.

Returns: A randomly generated mask whose length is equal to the `cbReturn` parameter.

#### Examples
The following code example demonstrates how to override the `MaskGenerationMethod.GenerateMask` to create and return a mask using the specified seed. This code example is part of a larger example provided for the `MaskGenerationMethod` class.

System.Security.Cryptography.MaskGenerationMethod#3
