---
title: "Customizing structure marshalling - .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/customize-struct-marshalling.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Customizing structure marshalling - .NET (part 2 of 2)

## Marshal `System.Object`

On Windows, you can marshal `object`-typed fields to native code. You can marshal these fields to one of three types:

- `VARIANT`
- `IUnknown*`
- `IDispatch*`

By default, an `object`-typed field will be marshalled to an `IUnknown*` that wraps the object.

```csharp
public struct ObjectDefault
{
    public object obj;
}
```

```cpp
struct ObjectDefault
{
    IUnknown* obj;
};
```

If you want to marshal an object field to an `IDispatch*`, add a `System.Runtime.InteropServices.MarshalAsAttribute` with the `System.Runtime.InteropServices.UnmanagedType.IDispatch` value.

```csharp
public struct ObjectDispatch
{
    [MarshalAs(UnmanagedType.IDispatch)]
    public object obj;
}
```

```cpp
struct ObjectDispatch
{
    IDispatch* obj;
};
```

If you want to marshal it as a `VARIANT`, add a `System.Runtime.InteropServices.MarshalAsAttribute` with the `System.Runtime.InteropServices.UnmanagedType.Struct` value.

```csharp
public struct ObjectVariant
{
    [MarshalAs(UnmanagedType.Struct)]
    public object obj;
}
```

```cpp
struct ObjectVariant
{
    VARIANT obj;
};
```

The following table describes how different runtime types of the `obj` field map to the various types stored in a `VARIANT`:

| .NET Type                                        | VARIANT Type  |
|--------------------------------------------------|---------------|
| `byte`                                           | `VT_UI1`      |
| `sbyte`                                          | `VT_I1`       |
| `short`                                          | `VT_I2`       |
| `ushort`                                         | `VT_UI2`      |
| `int`                                            | `VT_I4`       |
| `uint`                                           | `VT_UI4`      |
| `long`                                           | `VT_I8`       |
| `ulong`                                          | `VT_UI8`      |
| `float`                                          | `VT_R4`       |
| `double`                                         | `VT_R8`       |
| `char`                                           | `VT_UI2`      |
| `string`                                         | `VT_BSTR`     |
| `System.Runtime.InteropServices.BStrWrapper`     | `VT_BSTR`     |
| `object`                                         | `VT_DISPATCH` |
| `System.Runtime.InteropServices.UnknownWrapper`  | `VT_UNKNOWN`  |
| `System.Runtime.InteropServices.DispatchWrapper` | `VT_DISPATCH` |
| `System.Reflection.Missing`                      | `VT_ERROR`    |
| `(object)null`                                   | `VT_EMPTY`    |
| `bool`                                           | `VT_BOOL`     |
| `System.DateTime`                                | `VT_DATE`     |
| `decimal`                                        | `VT_DECIMAL`  |
| `System.Runtime.InteropServices.CurrencyWrapper` | `VT_CURRENCY` |
| `System.DBNull`                                  | `VT_NULL`     |
