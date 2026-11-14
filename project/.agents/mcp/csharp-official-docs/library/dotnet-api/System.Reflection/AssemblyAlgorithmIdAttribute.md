---
title: "AssemblyAlgorithmIdAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyAlgorithmIdAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyAlgorithmIdAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyAlgorithmIdAttribute : Attribute
```

Specifies an algorithm to hash all files in an assembly. This class cannot be inherited.

#### Remarks
The file hash values and names in the assembly are stored in the assembly manifest. When a file is loaded, the hash value is used to verify that a file has not been changed since the manifest was built.

## AssemblyAlgorithmIdAttribute.AssemblyAlgorithmIdAttribute(AssemblyHashAlgorithm) constructor

```csharp
public AssemblyAlgorithmIdAttribute (System.Configuration.Assemblies.AssemblyHashAlgorithm algorithmId);
```

Initializes a new instance of the `AssemblyAlgorithmIdAttribute` class with the specified hash algorithm, using one of the members of `AssemblyHashAlgorithm` to represent the hash algorithm.

Parameters:

- `algorithmId`: A member of `AssemblyHashAlgorithm` that represents the hash algorithm.

To be added.

## AssemblyAlgorithmIdAttribute.AssemblyAlgorithmIdAttribute(UInt32) constructor

```csharp
public AssemblyAlgorithmIdAttribute (uint algorithmId);
```

Initializes a new instance of the `AssemblyAlgorithmIdAttribute` class with the specified hash algorithm, using an unsigned integer to represent the hash algorithm.

Parameters:

- `algorithmId`: An unsigned integer representing the hash algorithm.

To be added.

## AssemblyAlgorithmIdAttribute.AlgorithmId property

```csharp
public uint AlgorithmId { get; }
```

Gets the hash algorithm of an assembly manifest's contents.

Returns: An unsigned integer representing the assembly hash algorithm.

To be added.
