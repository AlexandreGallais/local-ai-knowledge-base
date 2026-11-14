---
title: "BStrWrapper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/BStrWrapper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BStrWrapper class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class BStrWrapper
```

Marshals data of type `VT_BSTR` from managed to unmanaged code. This class cannot be inherited.

#### Remarks
The `BStrWrapper` class controls how the wrapped object is marshaled when passed as `VARIANT`. You can wrap a `String` object in a `BStrWrapper` object to marshal it as `VT_BSTR`. `BStrWrapper` is useful when passing a null string to unmanaged code. Without `BStrWrapper`, a null string is passed as `VT_EMPTY`; however, wrapping the string with `BStrWrapper` ensures that the null string is passed as `VT_BSTR`.

## BStrWrapper.BStrWrapper(Object) constructor

```csharp
public BStrWrapper (object? value);
```

Initializes a new instance of the `BStrWrapper` class with the specified `Object` object.

Parameters:

- `value`: The object to wrap and marshal as `VT_BSTR`.

To be added.

## BStrWrapper.BStrWrapper(String) constructor

```csharp
public BStrWrapper (string? value);
```

Initializes a new instance of the `BStrWrapper` class with the specified `String` object.

Parameters:

- `value`: The object to wrap and marshal as `VT_BSTR`.

To be added.

## BStrWrapper.WrappedObject property

```csharp
public string? WrappedObject { get; }
```

Gets the wrapped `String` object to marshal as type `VT_BSTR`.

Returns: The object that is wrapped by `BStrWrapper`.

To be added.
