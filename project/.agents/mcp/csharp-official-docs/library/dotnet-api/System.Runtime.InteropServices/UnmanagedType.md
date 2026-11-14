---
title: "UnmanagedType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/UnmanagedType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedType enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum UnmanagedType
```

Identifies how to marshal parameters or fields to unmanaged code.

#### Remarks
Use the `UnmanagedType` enumeration with the `MarshalAsAttribute` attribute to specify how types are marshaled during interoperation with unmanaged code. You can use this enumeration to marshal code using simple value types (I1, I2, I4, I8, R4, R8, U2, U4, and U8), unmanaged types that are unavailable in .NET, and various miscellaneous types.

#### Examples
The following code fragment demonstrates how to declare, in managed source code, an unmanaged interface implemented by a COM component. The `ComImportAttribute` attribute prevents the `IMyStorage` interface from being exported back for use by COM. (COM clients should use the existing COM component directly.) In this example, `MarshalAsAttribute` specifies several `UnmanagedType` members, which represent the types used by the original COM interface.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile2.cs._

## UnmanagedType.AnsiBStr field

```csharp
AnsiBStr
```

An ANSI character string that is a length-prefixed single byte. You can use this member on the `String` data type.

## UnmanagedType.AsAny field

```csharp
AsAny
```

A dynamic type that determines the type of an object at run time and marshals the object as that type. This member is valid for platform invoke methods only.

## UnmanagedType.Bool field

```csharp
Bool
```

A 4-byte Boolean value (`true` != 0, `false` = 0). This is the Win32 BOOL type.

## UnmanagedType.BStr field

```csharp
BStr
```

A Unicode character string that is a length-prefixed double byte. You can use this member, which is the default string in COM, on the `String` data type.

## UnmanagedType.ByValArray field

```csharp
ByValArray
```

When the `MarshalAsAttribute.Value` property is set to `ByValArray`, the `MarshalAsAttribute.SizeConst` field must be set to indicate the number of elements in the array. The `MarshalAsAttribute.ArraySubType` field can optionally contain the `UnmanagedType` of the array elements when it is necessary to differentiate among string types. You can use this `UnmanagedType` only on an array that whose elements appear as fields in a structure.

## UnmanagedType.ByValTStr field

```csharp
ByValTStr
```

Used for in-line, fixed-length character arrays that appear within a structure. `ByValTStr` types behave like C-style, fixed-size strings inside a structure (for example, `char s[5]`). The character type used with `ByValTStr` is determined by the `CharSet` argument of the `StructLayoutAttribute` attribute applied to the containing structure. Always use the `MarshalAsAttribute.SizeConst` field to indicate the size of the array.

## UnmanagedType.Currency field

```csharp
Currency
```

A currency type. Used on a `Decimal` to marshal the decimal value as a COM currency type instead of as a `Decimal`.

## UnmanagedType.CustomMarshaler field

```csharp
CustomMarshaler
```

Specifies the custom marshaler class when used with the `MarshalAsAttribute.MarshalType` or `MarshalAsAttribute.MarshalTypeRef` field. The `MarshalAsAttribute.MarshalCookie` field can be used to pass <example-value> information to the custom marshaler. You can use this member on any reference type. This member is valid for parameters and return values only. It cannot be used on fields.

## UnmanagedType.Error field

```csharp
Error
```

A native type that is associated with an `UnmanagedType.I4` or an `UnmanagedType.U4` and that causes the parameter to be exported as an HRESULT in the exported type library.

## UnmanagedType.FunctionPtr field

```csharp
FunctionPtr
```

An integer that can be used as a C-style function pointer. You can use this member on a `Delegate` data type or on a type that inherits from a `Delegate`.

## UnmanagedType.HString field

```csharp
HString
```

A Windows Runtime string. You can use this member on the `String` data type. Built-in support for WinRT was removed in .NET 5. See Formerly built-in supported types for workaround.

## UnmanagedType.I1 field

```csharp
I1
```

A 1-byte signed integer. You can use this member to transform a Boolean value into a 1-byte, C-style `bool` (`true` = 1, `false` = 0).

## UnmanagedType.I2 field

```csharp
I2
```

A 2-byte signed integer.

## UnmanagedType.I4 field

```csharp
I4
```

A 4-byte signed integer.

## UnmanagedType.I8 field

```csharp
I8
```

An 8-byte signed integer.

## UnmanagedType.IDispatch field

```csharp
IDispatch
```

A COM `IDispatch` pointer (`Object` in Microsoft Visual Basic 6.0).

## UnmanagedType.IInspectable field

```csharp
IInspectable
```

A Windows Runtime interface pointer. You can use this member on the `Object` data type. Built-in support for WinRT was removed in .NET 5.

## UnmanagedType.Interface field

```csharp
Interface
```

A COM interface pointer. The `Guid` of the interface is obtained from the class metadata. Use this member to specify the exact interface type or the default interface type if you apply it to a class. This member produces the same behavior as `UnmanagedType.IUnknown` when you apply it to the `Object` data type.

## UnmanagedType.IUnknown field

```csharp
IUnknown
```

A COM `IUnknown` pointer. You can use this member on the `Object` data type.

## UnmanagedType.LPArray field

```csharp
LPArray
```

A pointer to the first element of a C-style array. When marshaling from managed to unmanaged code, the length of the array is determined by the length of the managed array. When marshaling from unmanaged to managed code, the length of the array is determined from the `MarshalAsAttribute.SizeConst` and `MarshalAsAttribute.SizeParamIndex` fields, optionally followed by the unmanaged type of the elements within the array when it is necessary to differentiate among string types.

## UnmanagedType.LPStr field

```csharp
LPStr
```

A single byte, null-terminated ANSI character string. You can use this member on the `String` and `StringBuilder` data types.

## UnmanagedType.LPStruct field

```csharp
LPStruct
```

A pointer to a C-style structure that you use to marshal managed formatted classes. This member is valid for platform invoke methods only.

## UnmanagedType.LPTStr field

```csharp
LPTStr
```

A Unicode character string. This value is supported only for platform invoke and not for COM interop, because exporting a string of type `LPTStr` is not supported.

## UnmanagedType.LPUTF8Str field

```csharp
LPUTF8Str
```

A pointer to a UTF-8 encoded string.

## UnmanagedType.LPWStr field

```csharp
LPWStr
```

A 2-byte, null-terminated Unicode character string. You cannot use the `LPWStr` value with an unmanaged string unless the string was created by using the unmanaged `CoTaskMemAlloc` function.

## UnmanagedType.R4 field

```csharp
R4
```

A 4-byte floating-point number.

## UnmanagedType.R8 field

```csharp
R8
```

An 8-byte floating-point number.

## UnmanagedType.SafeArray field

```csharp
SafeArray
```

A `SafeArray`, which is a self-describing array that carries the type, rank, and bounds of the associated array data. You can use this member with the `MarshalAsAttribute.SafeArraySubType` field to override the default element type.

## UnmanagedType.Struct field

```csharp
Struct
```

A VARIANT, which is used to marshal managed formatted classes and value types.

## UnmanagedType.SysInt field

```csharp
SysInt
```

A platform-dependent, signed integer: 4 bytes on 32-bit Windows, 8 bytes on 64-bit Windows.

## UnmanagedType.SysUInt field

```csharp
SysUInt
```

A platform-dependent, unsigned integer: 4 bytes on 32-bit Windows, 8 bytes on 64-bit Windows.

## UnmanagedType.TBStr field

```csharp
TBStr
```

A length-prefixed, Unicode `char` string. You rarely use this BSTR-like member.

## UnmanagedType.U1 field

```csharp
U1
```

A 1-byte unsigned integer.

## UnmanagedType.U2 field

```csharp
U2
```

A 2-byte unsigned integer.

## UnmanagedType.U4 field

```csharp
U4
```

A 4-byte unsigned integer.

## UnmanagedType.U8 field

```csharp
U8
```

An 8-byte unsigned integer.

## UnmanagedType.VariantBool field

```csharp
VariantBool
```

A 2-byte, OLE-defined VARIANT_BOOL type (`true` = -1, `false` = 0).

## UnmanagedType.VBByRefStr field

```csharp
VBByRefStr
```

A value that enables Visual Basic to change a string in unmanaged code and have the results reflected in managed code. This value is only supported for platform invoke.
