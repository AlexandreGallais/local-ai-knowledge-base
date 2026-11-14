---
title: "TypeLibTypeFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibTypeFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibTypeFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum TypeLibTypeFlags
```

Describes the original settings of the `TYPEFLAGS` in the COM type library from which the type was imported.

#### Remarks
`TypeLibTypeFlags` is used along with the `TypeLibTypeAttribute`. The flags are retained for reference only. They are not used by the common language runtime.

For more information, see `TYPEFLAGS` in the MSDN library.

## TypeLibTypeFlags.FAggregatable field

```csharp
FAggregatable
```

The class supports aggregation.

## TypeLibTypeFlags.FAppObject field

```csharp
FAppObject
```

A type description that describes an `Application` object.

## TypeLibTypeFlags.FCanCreate field

```csharp
FCanCreate
```

Instances of the type can be created by `ITypeInfo::CreateInstance`.

## TypeLibTypeFlags.FControl field

```csharp
FControl
```

The type is a control from which other types will be derived, and should not be displayed to users.

## TypeLibTypeFlags.FDispatchable field

```csharp
FDispatchable
```

Indicates that the interface derives from `IDispatch`, either directly or indirectly.

## TypeLibTypeFlags.FDual field

```csharp
FDual
```

The interface supplies both `IDispatch` and V-table binding.

## TypeLibTypeFlags.FHidden field

```csharp
FHidden
```

The type should not be displayed to browsers.

## TypeLibTypeFlags.FLicensed field

```csharp
FLicensed
```

The type is licensed.

## TypeLibTypeFlags.FNonExtensible field

```csharp
FNonExtensible
```

The interface cannot add members at run time.

## TypeLibTypeFlags.FOleAutomation field

```csharp
FOleAutomation
```

The types used in the interface are fully compatible with Automation, including vtable binding support.

## TypeLibTypeFlags.FPreDeclId field

```csharp
FPreDeclId
```

The type is predefined. The client application should automatically create a single instance of the object that has this attribute. The name of the variable that points to the object is the same as the class name of the object.

## TypeLibTypeFlags.FReplaceable field

```csharp
FReplaceable
```

The object supports `IConnectionPointWithDefault`, and has default behaviors.

## TypeLibTypeFlags.FRestricted field

```csharp
FRestricted
```

This flag is intended for system-level types or types that type browsers should not display.

## TypeLibTypeFlags.FReverseBind field

```csharp
FReverseBind
```

Indicates base interfaces should be checked for name resolution before checking child interfaces. This is the reverse of the default behavior.
