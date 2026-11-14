---
title: "TypeLibVarFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibVarFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibVarFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum TypeLibVarFlags
```

Describes the original settings of the `VARFLAGS` in the COM type library from which the variable was imported.

#### Remarks
`TypeLibVarFlags` is used in conjunction with the `TypeLibVarAttribute`. The flags are retained for reference only. They are not used by the common language runtime.

For more information, see `VARFLAGS` in the MSDN library.

## TypeLibVarFlags.FBindable field

```csharp
FBindable
```

The variable supports data binding.

## TypeLibVarFlags.FDefaultBind field

```csharp
FDefaultBind
```

The variable is the single property that best represents the object. Only one variable in a type info can have this value.

## TypeLibVarFlags.FDefaultCollelem field

```csharp
FDefaultCollelem
```

Permits an optimization in which the compiler looks for a member named "xyz" on the type "abc". If such a member is found and is flagged as an accessor function for an element of the default collection, then a call is generated to that member function.

## TypeLibVarFlags.FDisplayBind field

```csharp
FDisplayBind
```

The variable is displayed as bindable. `TypeLibVarFlags.FBindable` must also be set.

## TypeLibVarFlags.FHidden field

```csharp
FHidden
```

The variable should not be displayed in a browser, though it exists and is bindable.

## TypeLibVarFlags.FImmediateBind field

```csharp
FImmediateBind
```

The variable is mapped as individual bindable properties.

## TypeLibVarFlags.FNonBrowsable field

```csharp
FNonBrowsable
```

The variable appears in an object browser, but not in a properties browser.

## TypeLibVarFlags.FReadOnly field

```csharp
FReadOnly
```

Assignment to the variable should not be allowed.

## TypeLibVarFlags.FReplaceable field

```csharp
FReplaceable
```

Tags the interface as having default behaviors.

## TypeLibVarFlags.FRequestEdit field

```csharp
FRequestEdit
```

Indicates that the property supports the COM `OnRequestEdit` notification.

## TypeLibVarFlags.FRestricted field

```csharp
FRestricted
```

This flag is intended for system-level functions or functions that type browsers should not display.

## TypeLibVarFlags.FSource field

```csharp
FSource
```

The variable returns an object that is a source of events.

## TypeLibVarFlags.FUiDefault field

```csharp
FUiDefault
```

The default display in the user interface.
