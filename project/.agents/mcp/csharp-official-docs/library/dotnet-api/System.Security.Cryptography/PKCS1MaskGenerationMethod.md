---
title: "PKCS1MaskGenerationMethod class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/PKCS1MaskGenerationMethod.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PKCS1MaskGenerationMethod class

Namespace: `System.Security.Cryptography`

```csharp
public class PKCS1MaskGenerationMethod : System.Security.Cryptography.MaskGenerationMethod
```

Computes masks according to PKCS #1 for use by key <example-value> algorithms.

#### Remarks
This class is only used by implementations of key <example-value> algorithms for mask generation. Application code does not use this class directly.

## PKCS1MaskGenerationMethod.PKCS1MaskGenerationMethod() constructor

```csharp
public PKCS1MaskGenerationMethod ();
```

Initializes a new instance of the `PKCS1MaskGenerationMethod` class.

#### Remarks
This constructor sets `PKCS1MaskGenerationMethod.HashName` to the default hash algorithm name (SHA1).

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## PKCS1MaskGenerationMethod.HashName property

```csharp
public string HashName { get; set; }
```

Gets or sets the name of the hash algorithm type to use for generating the mask.

Returns: The name of the type that implements the hash algorithm to use for computing the mask.

#### Remarks
If no hash algorithm is specified, `SHA1` is used by default.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## PKCS1MaskGenerationMethod.GenerateMask(Byte[], Int32) method

```csharp
public override byte[] GenerateMask (byte[] rgbSeed, int cbReturn);
```

Generates and returns a mask from the specified random seed of the specified length.

Parameters:

- `rgbSeed`: The random seed to use for computing the mask.
- `cbReturn`: The length of the generated mask in bytes.

Returns: A randomly generated mask whose length is equal to the `cbReturn` parameter.

#### Remarks
Masks are used in key <example-value> computation and generally are not used by applications.
