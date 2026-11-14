---
title: "ClassInterfaceType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ClassInterfaceType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ClassInterfaceType enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum ClassInterfaceType
```

Identifies the type of class interface that is generated for a class.

#### Remarks
This enumeration is used in conjunction with the `ClassInterfaceAttribute` attribute.

#### Examples
This example shows how to apply the `ClassInterfaceAttribute` to a type, setting the `ClassInterfaceType`. Classes defined this way can be used from unmanaged COM.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ClassInterfaceType/Overview/ClassInterfaceType.cs._

## ClassInterfaceType.AutoDispatch field

```csharp
AutoDispatch
```

Indicates that the class only supports late binding for COM clients. A `dispinterface` for the class is automatically exposed to COM clients on request. The type library produced by Tlbexp.exe (Type Library Exporter) does not contain type information for the `dispinterface` in order to prevent clients from caching the DISPIDs of the interface. The `dispinterface` does not exhibit the versioning problems described in `ClassInterfaceAttribute` because clients can only late-bind to the interface.

This is the default setting for `ClassInterfaceAttribute`.

## ClassInterfaceType.AutoDual field

```csharp
AutoDual
```

Indicates that a dual class interface is automatically generated for the class and exposed to COM. Type information is produced for the class interface and published in the type library. Using `AutoDual` is strongly discouraged because of the versioning limitations described in `ClassInterfaceAttribute`.

## ClassInterfaceType.None field

```csharp
None
```

Indicates that no class interface is generated for the class. If no interfaces are implemented explicitly, the class can only provide late-bound access through the `IDispatch` interface. This is the recommended setting for `ClassInterfaceAttribute`. Using `ClassInterfaceType.None` is the only way to expose functionality through interfaces implemented explicitly by the class.

Tlbexp.exe (Type Library Exporter) exposes the first public, COM-visible interface implemented by the class as the default interface of the coclass. You can specify the default interface exposed to COM by using the `ComDefaultInterfaceAttribute` attribute. If the class implements no interfaces, the first public, COM-visible interface implemented by a base class becomes the default interface (starting with the most recently derived base class and working backward). Tlbexp.exe exposes `_Object` as the default interface if neither the class nor its base classes implement interfaces.
