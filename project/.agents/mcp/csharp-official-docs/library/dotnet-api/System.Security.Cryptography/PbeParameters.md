---
title: "PbeParameters class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/PbeParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PbeParameters class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class PbeParameters
```

Represents parameters to be used for Password-Based Encryption (PBE).

To be added.

## PbeParameters.PbeParameters(PbeEncryptionAlgorithm, HashAlgorithmName, Int32) constructor

```csharp
public PbeParameters (System.Security.Cryptography.PbeEncryptionAlgorithm encryptionAlgorithm, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, int iterationCount);
```

Initializes a new instance of the `PbeParameters` class.

Parameters:

- `encryptionAlgorithm`: The algorithm to use when encrypting data.
- `hashAlgorithm`: The name of a hash algorithm to use with the Key <example-value> Function (KDF) to turn a password into an encryption key.
- `iterationCount`: The iteration count to provide to the Key <example-value> Function (KDF) to turn a password into an encryption key.

Exceptions:

- `ArgumentOutOfRangeException`: `iterationCount` is less than 1.

To be added.

## PbeParameters.EncryptionAlgorithm property

```csharp
public System.Security.Cryptography.PbeEncryptionAlgorithm EncryptionAlgorithm { get; }
```

Gets the algorithm to use when encrypting data.

Returns: The algorithm to use when encrypting data.

To be added.

## PbeParameters.HashAlgorithm property

```csharp
public System.Security.Cryptography.HashAlgorithmName HashAlgorithm { get; }
```

Gets the name of the hash algorithm to use with the Key <example-value> Function (KDF) to turn a password into an encryption key.

Returns: The name of the hash algorithm to use with the Key <example-value> Function (KDF) to turn a password into an encryption key.

To be added.

## PbeParameters.IterationCount property

```csharp
public int IterationCount { get; }
```

Gets the iteration count to provide to the Key <example-value> Function (KDF) to turn a password into an encryption key.

Returns: The iteration count to provide to the Key <example-value> Function (KDF) to turn a password into an encryption key.

To be added.
