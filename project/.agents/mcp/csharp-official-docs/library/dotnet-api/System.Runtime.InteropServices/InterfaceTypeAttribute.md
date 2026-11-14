---
title: "InterfaceTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/InterfaceTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InterfaceTypeAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class InterfaceTypeAttribute : Attribute
```

Indicates whether a managed interface is dual, dispatch-only, or `IUnknown` -only when exposed to COM.

#### Remarks
You can apply this attribute to interfaces.

By default, the Tlbexp.exe (Type Library Exporter) exposes a managed interface to COM as a dual interface, giving you the flexibility of late binding or the performance of early binding. The `ComInterfaceType` enumeration enables you to override the default behavior and specify late binding only or early binding only. For example, you can apply `InterfaceType (ComInterfaceType.InterfaceIsIDispatch)` to an interface to produce metadata to restrict callers to late binding only. Although interfaces that derive from the `IDispatch` interface are often dual, the `InterfaceIsIDispatch` enumeration member allows only late-bound calls to the interface methods. This attribute has no effect on the managed view of the interface.

The Tlbimp.exe (Type Library Importer) also applies this attribute to imported, nondual interfaces; it applies the appropriate enumeration member to indicate that the interface is dispatch-only or `IUnknown` -only.

#### Examples
The following example shows how `InterfaceTypeAttribute` controls how the interface is exposed to COM.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/InterfaceTypeAttribute/Overview/source.cs._

## InterfaceTypeAttribute.InterfaceTypeAttribute(Int16) constructor

```csharp
public InterfaceTypeAttribute (short interfaceType);
```

Initializes a new instance of the `InterfaceTypeAttribute` class with the specified `ComInterfaceType` enumeration member.

Parameters:

- `interfaceType`: Describes how the interface should be exposed to COM clients.

#### Remarks
This constructor takes an underlying 16-bit integer that represents each `ComInterfaceType` enumeration member. The Tlbimp.exe (Type Library Importer) uses this constructor.

## InterfaceTypeAttribute.InterfaceTypeAttribute(ComInterfaceType) constructor

```csharp
public InterfaceTypeAttribute (System.Runtime.InteropServices.ComInterfaceType interfaceType);
```

Initializes a new instance of the `InterfaceTypeAttribute` class with the specified `ComInterfaceType` enumeration member.

Parameters:

- `interfaceType`: One of the `ComInterfaceType` values that describes how the interface should be exposed to COM clients.

#### Remarks
For readable code that is less prone to error, always use this constructor.

## InterfaceTypeAttribute.Value property

```csharp
public System.Runtime.InteropServices.ComInterfaceType Value { get; }
```

Gets the `ComInterfaceType` value that describes how the interface should be exposed to COM.

Returns: The `ComInterfaceType` value that describes how the interface should be exposed to COM.

To be added.
