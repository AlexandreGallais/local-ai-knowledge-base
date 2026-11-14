---
title: "ImageFileMachine enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/ImageFileMachine.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImageFileMachine enum

Namespace: `System.Reflection`

```csharp
public enum ImageFileMachine
```

Identifies the platform targeted by an executable.

#### Remarks
To obtain this value for a module, use the `Module.GetPEKind` method.

> **Note:**
>  The values in this enumeration correspond to the constants IMAGE_FILE_MACHINE_I386, IMAGE_FILE_MACHINE_IA64, and IMAGE_FILE_MACHINE_AMD64 in the unmanaged Windows API, which are accessed by the unmanaged `GetPEKind` function.

## ImageFileMachine.AMD64 field

```csharp
AMD64
```

Targets a 64-bit AMD processor.

## ImageFileMachine.ARM field

```csharp
ARM
```

Targets an ARM processor.

## ImageFileMachine.I386 field

```csharp
I386
```

Targets a 32-bit Intel processor.

## ImageFileMachine.IA64 field

```csharp
IA64
```

Targets a 64-bit Intel processor.
