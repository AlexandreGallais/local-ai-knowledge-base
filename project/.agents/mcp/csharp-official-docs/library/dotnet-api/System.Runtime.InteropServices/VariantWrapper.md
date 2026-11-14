---
title: "VariantWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/VariantWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# VariantWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class VariantWrapper
```

Marshals data of type `VT_VARIANT | VT_BYREF` from managed to unmanaged code. This class cannot be inherited.

#### Remarks
The purpose of `VariantWrapper` is to add one level of indirection when marshaling a managed type to the corresponding `VARIANT` type.

You can use this class to wrap an `Object` that the interop marshaler passes as `VT_VARIANT | VT_BYREF`. One advantage of using `VT_VARIANT | VT_BYREF` variant types is that the type of data can be changed during a method call. For example, you can pass a `VT_VARIANT | VT_BYREF` variant type that contains a `VT_BSTR` and get a variant returned that contains a `VT_I4` after a method call. Because the COM interop marshaler has no way of knowing when to pass `VT_BSTR | VT_BYREF` and when to pass `VT_VARIANT | VT_BYREF`, which points to a variant that contains a `BSTR` for parameters declared as `VARIANT *`, you can instruct the marshaler by using `VariantWrapper`.

Early binding is not supported; you can use `VariantWrapper` only when calling `Type.InvokeMember` or with a Dispatch-only interface called in an early bound fashion. In C#, you must also use the `ref` keyword to specify `ByRef` semantics for any parameter of type `VariantWrapper`. In Visual Basic, `ByRef` semantics are added automatically for every implicit late binding call. Also note that nesting `VariantWrapper` objects and arrays of `VariantWrapper` objects is not supported.

#### Examples
The following code example demonstrates how to use the `VariantWrapper` class to wrap an `Object` that the interop marshaler passes as `VT_VARIANT | VT_BYREF`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/VariantWrapper/Overview/sample.cs._

## VariantWrapper.VariantWrapper(Object) constructor

```csharp
public VariantWrapper (object? obj);
```

Initializes a new instance of the `VariantWrapper` class for the specified `Object` parameter.

Parameters:

- `obj`: The object to marshal.

#### Examples
The following code example demonstrates how to use the `VariantWrapper` class to wrap an `Object` that the interop marshaler passes as `VT_VARIANT | VT_BYREF`.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/VariantWrapper/Overview/sample.cs._

## VariantWrapper.WrappedObject property

```csharp
public object? WrappedObject { get; }
```

Gets the object wrapped by the `VariantWrapper` object.

Returns: The object wrapped by the `VariantWrapper` object.

To be added.
