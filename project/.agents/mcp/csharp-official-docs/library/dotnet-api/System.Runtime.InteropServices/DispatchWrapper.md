---
title: "DispatchWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DispatchWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DispatchWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class DispatchWrapper
```

Wraps objects the marshaler should marshal as a `VT_DISPATCH`.

#### Remarks
Use to wrap objects the marshaler should marshal as a `VT_DISPATCH`. This wrapper will force objects to be marshaled out as `VT_DISPATCH`. If the object does not support `IDispatch` then an exception will be thrown.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/DispatchWrapper/Overview/source.cs._

For more information on `VT_DISPATCH`, please see the existing documentation for `VARENUM::VT_DISPATCH` in the MSDN library.

## DispatchWrapper.DispatchWrapper(Object) constructor

```csharp
public DispatchWrapper (object? obj);
```

Initializes a new instance of the `DispatchWrapper` class with the object being wrapped.

Parameters:

- `obj`: The object to be wrapped and converted to `VarEnum.VT_DISPATCH`.

Exceptions:

- `ArgumentException`: `obj` is not a class or an array.

-or-

`obj` does not support `IDispatch`.
- `InvalidOperationException`: The `obj` parameter was marked with a `ComVisibleAttribute` attribute that was passed a value of `false`.

-or-

The `obj` parameter inherits from a type marked with a `ComVisibleAttribute` attribute that was passed a value of `false`.

To be added.

## DispatchWrapper.WrappedObject property

```csharp
public object? WrappedObject { get; }
```

Gets the object wrapped by the `DispatchWrapper`.

Returns: The object wrapped by the `DispatchWrapper`.

To be added.
