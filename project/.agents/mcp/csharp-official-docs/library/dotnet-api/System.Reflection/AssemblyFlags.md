---
title: "AssemblyFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyFlags enum

Namespace: `System.Reflection`

```csharp
public enum AssemblyFlags
```

To be added.

To be added.

## AssemblyFlags.ContentTypeMask field

```csharp
ContentTypeMask
```

Content type masked bits that correspond to values of `AssemblyContentType`.

## AssemblyFlags.DisableJitCompileOptimizer field

```csharp
DisableJitCompileOptimizer
```

Just-In-Time (JIT) compiler optimization is disabled for the assembly.

## AssemblyFlags.EnableJitCompileTracking field

```csharp
EnableJitCompileTracking
```

Just-In-Time (JIT) compiler tracking is enabled for the assembly.

## AssemblyFlags.PublicKey field

```csharp
PublicKey
```

The assembly reference holds the full (unhashed) public key. Not applicable on assembly definition.

## AssemblyFlags.Retargetable field

```csharp
Retargetable
```

The implementation of the referenced assembly used at runtime is not expected to match the version seen at compile time.

## AssemblyFlags.WindowsRuntime field

```csharp
WindowsRuntime
```

The assembly contains Windows Runtime code.
