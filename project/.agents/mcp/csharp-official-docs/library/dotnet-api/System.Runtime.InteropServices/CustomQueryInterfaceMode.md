---
title: "CustomQueryInterfaceMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CustomQueryInterfaceMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomQueryInterfaceMode enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CustomQueryInterfaceMode
```

Indicates whether the `Marshal.GetComInterfaceForObject` method's IUnknown::QueryInterface calls can use the `ICustomQueryInterface` interface.

To be added.

## CustomQueryInterfaceMode.Allow field

```csharp
Allow
```

IUnknown::QueryInterface method calls can use the `ICustomQueryInterface` interface. When you use this value, the `Marshal.GetComInterfaceForObject` method overload functions like the `Marshal.GetComInterfaceForObject` overload.

## CustomQueryInterfaceMode.Ignore field

```csharp
Ignore
```

IUnknown::QueryInterface method calls should ignore the `ICustomQueryInterface` interface.
