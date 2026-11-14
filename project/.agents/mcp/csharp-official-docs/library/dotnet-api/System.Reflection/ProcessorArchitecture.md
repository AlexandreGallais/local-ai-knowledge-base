---
title: "ProcessorArchitecture enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ProcessorArchitecture.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessorArchitecture enum

Namespace: `System.Reflection`

```csharp
public enum ProcessorArchitecture
```

Identifies the processor and bits-per-word of the platform targeted by an executable.

#### Remarks
Not all combinations of `PortableExecutableKinds` and `ImageFileMachine` describe valid PE file types. `ProcessorArchitecture` is the set of combinations of `PortableExecutableKinds` and `ImageFileMachine` that describe valid PE file types for managed code.

## ProcessorArchitecture.Amd64 field

```csharp
Amd64
```

A 64-bit processor based on the x64 architecture.

## ProcessorArchitecture.Arm field

```csharp
Arm
```

An ARM processor.

## ProcessorArchitecture.IA64 field

```csharp
IA64
```

A 64-bit Intel Itanium processor only.

## ProcessorArchitecture.MSIL field

```csharp
MSIL
```

Neutral with respect to processor and bits-per-word.

## ProcessorArchitecture.None field

```csharp
None
```

An unknown or unspecified combination of processor and bits-per-word.

## ProcessorArchitecture.X86 field

```csharp
X86
```

A 32-bit Intel processor, either native or in the Windows on Windows environment on a 64-bit platform (WOW64).
