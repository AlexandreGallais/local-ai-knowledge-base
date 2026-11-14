---
title: "ComInterfaceType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComInterfaceType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComInterfaceType enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum ComInterfaceType
```

Identifies how to expose an interface to COM.

#### Remarks
This enumeration works in conjunction with the `InterfaceTypeAttribute` attribute.

## ComInterfaceType.InterfaceIsDual field

```csharp
InterfaceIsDual
```

Indicates that the interface is exposed to COM as a dual interface, which enables both early and late binding. `ComInterfaceType.InterfaceIsDual` is the default value.

## ComInterfaceType.InterfaceIsIDispatch field

```csharp
InterfaceIsIDispatch
```

Indicates that an interface is exposed to COM as a dispinterface, which enables late binding only.

## ComInterfaceType.InterfaceIsIInspectable field

```csharp
InterfaceIsIInspectable
```

Indicates that an interface is exposed to COM as a Windows Runtime interface.

## ComInterfaceType.InterfaceIsIUnknown field

```csharp
InterfaceIsIUnknown
```

Indicates that an interface is exposed to COM as an interface that is derived from IUnknown, which enables only early binding.
