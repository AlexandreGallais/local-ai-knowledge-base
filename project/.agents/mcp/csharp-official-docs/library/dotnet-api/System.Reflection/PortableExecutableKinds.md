---
title: "PortableExecutableKinds enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/PortableExecutableKinds.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PortableExecutableKinds enum

Namespace: `System.Reflection`

```csharp
public enum PortableExecutableKinds
```

Identifies the nature of the code in an executable file.

#### Remarks
To obtain this value for a module, use the `Module.GetPEKind` method.

> **Note:**
>  This enumeration corresponds to the `CorPEKind` enumeration in the unmanaged reflection API, which is accessed by the unmanaged `GetPEKind` function.

## PortableExecutableKinds.ILOnly field

```csharp
ILOnly
```

The executable contains only Microsoft intermediate language (MSIL), and is therefore neutral with respect to 32-bit or 64-bit platforms.

## PortableExecutableKinds.NotAPortableExecutableImage field

```csharp
NotAPortableExecutableImage
```

The file is not in portable executable (PE) file format.

## PortableExecutableKinds.PE32Plus field

```csharp
PE32Plus
```

The executable requires a 64-bit platform.

## PortableExecutableKinds.Preferred32Bit field

```csharp
Preferred32Bit
```

The executable is platform-agnostic but should be run on a 32-bit platform whenever possible.

## PortableExecutableKinds.Required32Bit field

```csharp
Required32Bit
```

The executable can be run on a 32-bit platform, or in the 32-bit Windows on Windows (WOW) environment on a 64-bit platform.

## PortableExecutableKinds.Unmanaged32Bit field

```csharp
Unmanaged32Bit
```

The executable contains pure unmanaged code.
