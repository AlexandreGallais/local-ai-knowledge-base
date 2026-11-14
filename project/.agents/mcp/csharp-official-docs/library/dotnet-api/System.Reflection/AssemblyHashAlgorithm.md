---
title: "AssemblyHashAlgorithm enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyHashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyHashAlgorithm enum

Namespace: `System.Reflection`

```csharp
public enum AssemblyHashAlgorithm
```

Specifies the hash algorithms used for hashing assembly files and for generating the strong name.

To be added.

## AssemblyHashAlgorithm.MD5 field

```csharp
MD5
```

Retrieves the MD5 message-digest algorithm.

Due to collision problems with MD5, Microsoft recommends SHA-256.

MD5 was developed by Rivest in 1991. It is basically MD4 with safety-belts and, while it is slightly slower than MD4, it helps provide more security. The algorithm consists of four distinct rounds, which has a slightly different design from that of MD4. Message-digest size, as well as padding requirements, remain the same.

## AssemblyHashAlgorithm.None field

```csharp
None
```

A mask indicating that there is no hash algorithm.

If you specify `AssemblyHashAlgorithm.None` for a multi-module assembly, the common language runtime defaults to the SHA-1 algorithm, since multi-module assemblies need to generate a hash.

## AssemblyHashAlgorithm.Sha1 field

```csharp
Sha1
```

Retrieves a revision of the Secure Hash Algorithm that corrects an unpublished flaw in SHA.

Due to collision problems with SHA-1, Microsoft recommends SHA-256.

## AssemblyHashAlgorithm.Sha256 field

```csharp
Sha256
```

Retrieves a version of the Secure Hash Algorithm with a hash size of 256 bits.

## AssemblyHashAlgorithm.Sha384 field

```csharp
Sha384
```

Retrieves a version of the Secure Hash Algorithm with a hash size of 384 bits.

## AssemblyHashAlgorithm.Sha512 field

```csharp
Sha512
```

Retrieves a version of the Secure Hash Algorithm with a hash size of 512 bits.
