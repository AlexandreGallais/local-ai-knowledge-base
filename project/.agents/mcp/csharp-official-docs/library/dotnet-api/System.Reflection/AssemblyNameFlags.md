---
title: "AssemblyNameFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyNameFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyNameFlags enum

Namespace: `System.Reflection`

```csharp
public enum AssemblyNameFlags
```

Provides information about an `Assembly` reference.

To be added.

## AssemblyNameFlags.EnableJITcompileOptimizer field

```csharp
EnableJITcompileOptimizer
```

Specifies that just-in-time (JIT) compiler optimization is disabled for the assembly. This is the exact opposite of the meaning that is suggested by the member name.

## AssemblyNameFlags.EnableJITcompileTracking field

```csharp
EnableJITcompileTracking
```

Specifies that just-in-time (JIT) compiler tracking is enabled for the assembly.

## AssemblyNameFlags.None field

```csharp
None
```

Specifies that no flags are in effect.

## AssemblyNameFlags.PublicKey field

```csharp
PublicKey
```

Specifies that a public key is formed from the full public key <example-value> than the public key token.

## AssemblyNameFlags.Retargetable field

```csharp
Retargetable
```

Specifies that the assembly can be retargeted at runtime to an assembly from a different publisher. This value supports the .NET infrastructure and is not intended to be used directly from your code.
