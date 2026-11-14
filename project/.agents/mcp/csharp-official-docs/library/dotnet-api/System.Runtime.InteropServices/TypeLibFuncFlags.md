---
title: "TypeLibFuncFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/TypeLibFuncFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeLibFuncFlags enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum TypeLibFuncFlags
```

Describes the original settings of the `FUNCFLAGS` in the COM type library from where this method was imported.

#### Remarks
`TypeLibFuncFlags` is used with the `TypeLibFuncAttribute`. The flags are retained for reference only. They are not used by the common language runtime.

For more information about `FUNCFLAGS`, see the MSDN library.

## TypeLibFuncFlags.FBindable field

```csharp
FBindable
```

The function that supports data binding.

## TypeLibFuncFlags.FDefaultBind field

```csharp
FDefaultBind
```

The function that best represents the object. Only one function in a type information can have this attribute.

## TypeLibFuncFlags.FDefaultCollelem field

```csharp
FDefaultCollelem
```

Permits an optimization in which the compiler looks for a member named "xyz" on the type "abc". If such a member is found and is flagged as an accessor function for an element of the default collection, then a call is generated to that member function.

## TypeLibFuncFlags.FDisplayBind field

```csharp
FDisplayBind
```

The function that is displayed to the user as bindable. `TypeLibFuncFlags.FBindable` must also be set.

## TypeLibFuncFlags.FHidden field

```csharp
FHidden
```

The function should not be displayed to the user, although it exists and is bindable.

## TypeLibFuncFlags.FImmediateBind field

```csharp
FImmediateBind
```

The function is mapped as individual bindable properties.

## TypeLibFuncFlags.FNonBrowsable field

```csharp
FNonBrowsable
```

The property appears in an object browser, but not in a properties browser.

## TypeLibFuncFlags.FReplaceable field

```csharp
FReplaceable
```

Tags the interface as having default behaviors.

## TypeLibFuncFlags.FRequestEdit field

```csharp
FRequestEdit
```

When set, any call to a method that sets the property results first in a call to `IPropertyNotifySink::OnRequestEdit`.

## TypeLibFuncFlags.FRestricted field

```csharp
FRestricted
```

This flag is intended for system-level functions or functions that type browsers should not display.

## TypeLibFuncFlags.FSource field

```csharp
FSource
```

The function returns an object that is a source of events.

## TypeLibFuncFlags.FUiDefault field

```csharp
FUiDefault
```

The type information member is the default member for display in the user interface.

## TypeLibFuncFlags.FUsesGetLastError field

```csharp
FUsesGetLastError
```

The function supports `GetLastError`.
