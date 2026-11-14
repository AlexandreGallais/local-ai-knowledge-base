---
title: "DSAParameters struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DSAParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSAParameters struct

Namespace: `System.Security.Cryptography`

```csharp
public struct DSAParameters
```

Contains the typical parameters for the `DSA` algorithm.

#### Remarks

> **Important:**
> The creators of the DSA algorithm have withdrawn their support for it. Consider using the `RSA` class or the `ECDsa` class instead of the `DSA` class. Use `DSA` only for compatibility with legacy applications and data.

## DSAParameters.Counter field

```csharp
public int Counter;
```

Specifies the counter for the `DSA` algorithm.

To be added.

## DSAParameters.G field

```csharp
public byte[]? G;
```

Specifies the `G` parameter for the `DSA` algorithm.

To be added.

## DSAParameters.J field

```csharp
public byte[]? J;
```

Specifies the `J` parameter for the `DSA` algorithm.

To be added.

## DSAParameters.P field

```csharp
public byte[]? P;
```

Specifies the `P` parameter for the `DSA` algorithm.

#### Remarks
`P` must be a prime number between 64 and 128 bytes long.

## DSAParameters.Q field

```csharp
public byte[]? Q;
```

Specifies the `Q` parameter for the `DSA` algorithm.

#### Remarks
`Q` must be a 160-bit prime factor of `P` - 1.

## DSAParameters.Seed field

```csharp
public byte[]? Seed;
```

Specifies the seed for the `DSA` algorithm.

#### Remarks
The seed is the base number used for the generation of pseudo-random numbers.

## DSAParameters.X field

```csharp
public byte[]? X;
```

Specifies the `X` parameter for the `DSA` algorithm.

To be added.

## DSAParameters.Y field

```csharp
public byte[]? Y;
```

Specifies the `Y` parameter for the `DSA` algorithm.

To be added.
