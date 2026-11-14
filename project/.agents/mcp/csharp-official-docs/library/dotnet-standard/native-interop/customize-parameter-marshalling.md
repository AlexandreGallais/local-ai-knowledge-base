---
title: "Customizing parameter marshalling - .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/customize-parameter-marshalling.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Customize parameter marshalling

When the .NET runtime's default parameter marshalling behavior doesn't do what you want, use can use the `System.Runtime.InteropServices.MarshalAsAttribute` attribute to customize how your parameters are marshalled. These customization features do not apply when runtime marshalling is disabled.

> **Note:**
> Source-generated interop for P/Invokes and COM only respects a small subset of `System.Runtime.InteropServices.MarshalAsAttribute` on parameters. It is recommended to use `System.Runtime.InteropServices.Marshalling.MarshalUsingAttribute` for source-generated interop instead. For more information, see Custom marshalling for source generation.

## Customizing string parameters

.NET has a variety of formats for marshalling strings. These methods are split into distinct sections on C-style strings and Windows-centric string formats.

### C-style strings

Each of these formats passes a null-terminated string to native code. They differ by the encoding of the native string.

| `System.Runtime.InteropServices.UnmanagedType` value | Encoding |
|------------------------------------------------------|----------|
| LPStr | ANSI |
| LPUTF8Str | UTF-8 |
| LPWStr | UTF-16 |
| LPTStr | UTF-16 |

The `System.Runtime.InteropServices.UnmanagedType.VBByRefStr` format is slightly different. Like `LPWStr`, it marshals the string to a native C-style string encoded in UTF-16. However, the managed signature has you pass in the string by reference and the matching native signature takes the string by value. This distinction allows you to use a native API that takes a string by value and modifies it in-place without having to use a `StringBuilder`. We recommend against manually using this format since it's prone to cause confusion with the mismatching native and managed signatures.

### Windows-centric string formats

When interacting with COM or OLE interfaces, you'll likely find that the native functions take strings as `BSTR` arguments. You can use the `System.Runtime.InteropServices.UnmanagedType.BStr` unmanaged type to marshal a string as a `BSTR`.

If you're interacting with WinRT APIs, you can use the `System.Runtime.InteropServices.UnmanagedType.HString` format to marshal a string as an `HSTRING`.

## Customize array parameters

.NET also provides you multiple ways to marshal array parameters. If you're calling an API that takes a C-style array, use the `System.Runtime.InteropServices.UnmanagedType.LPArray` unmanaged type. If the values in the array need customized marshalling, you can use the `System.Runtime.InteropServices.MarshalAsAttribute.ArraySubType` field on the `[MarshalAs]` attribute for that.

If you're using COM APIs, you'll likely have to marshal your array parameters as `SAFEARRAY*`s. To do so, you can use the `System.Runtime.InteropServices.UnmanagedType.SafeArray` unmanaged type. The default type of the elements of the `SAFEARRAY` can be seen in the table on customizing `object` fields. You can use the `System.Runtime.InteropServices.MarshalAsAttribute.SafeArraySubType` and `System.Runtime.InteropServices.MarshalAsAttribute.SafeArrayUserDefinedSubType` fields to customize the exact element type of the `SAFEARRAY`.

## Customizing Boolean or decimal parameters

For information on marshalling Boolean or decimal parameters, see Customizing structure marshalling.

## Customizing object parameters (Windows-only)

On Windows, the .NET runtime provides a number of different ways to marshal object parameters to native code.

### Marshalling as specific COM interfaces

If your API takes a pointer to a COM object, you can use any of the following `UnmanagedType` formats on an `object`-typed parameter to tell .NET to marshal as these specific interfaces:

- `IUnknown`
- `IDispatch`
- `IInspectable`

Additionally, if your type is marked `[ComVisible(true)]` or you're marshalling the `object` type, you can use the `System.Runtime.InteropServices.UnmanagedType.Interface` format to marshal your object as a COM callable wrapper for the COM view of your type.

### Marshalling to a `VARIANT`

If your native API takes a Win32 `VARIANT`, you can use the `System.Runtime.InteropServices.UnmanagedType.Struct` format on your `object` parameter to marshal your objects as `VARIANT`s. See the documentation on customizing `object` fields for a mapping between .NET types and `VARIANT` types.

### Custom marshallers

If you want to project a native COM interface into a different managed type, you can use the `UnmanagedType.CustomMarshaler` format and an implementation of `System.Runtime.InteropServices.ICustomMarshaler` to provide your own custom marshalling code.
