---
title: "MarshalAsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/MarshalAsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MarshalAsAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class MarshalAsAttribute : Attribute
```

Indicates how to marshal the data between managed and unmanaged code.

#### Remarks
You can apply this attribute to parameters, fields, or return values.

This attribute is optional, as each data type has a default marshaling behavior. This attribute is only necessary when a given type can be marshaled to multiple types. For example, you can marshal a string to unmanaged code as either a `LPStr`, a `LPWStr`, a `LPTStr`, or a `BStr`. By default, the common language runtime marshals a string parameter as a `BStr` to COM methods. You can apply the `MarshalAsAttribute` attribute to an individual field or parameter to cause that particular string to be marshaled as a `LPStr` instead of a `BStr`. The Tlbexp.exe (Type Library Exporter) passes your marshaling preferences to the common language runtime.

Some parameters and return values have different default marshaling behavior when used with COM interop or platform invoke. By default, the runtime marshals a string parameter (and fields in a value type) as a `LPStr` to a platform invoke method or function. For additional information, see Default Marshaling Behavior.

In most cases, the attribute simply identifies the format of the unmanaged data using the `UnmanagedType` enumeration, as shown in the following C# signature:

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/MarshalAsAttribute/Overview/Signature1.cs._

Some `UnmanagedType` enumeration members require additional information. For example, additional information is needed when the `UnmanagedType` is `LPArray`. For a complete description of how to use this attribute with arrays, see Default Marshaling for Arrays.

The Tlbimp.exe (Type Library Importer) also applies this attribute to parameters, fields, and return values to indicate that the data type in the input type library is not the default type for the corresponding managed data type. Tlbimp.exe always applies the `MarshalAsAttribute` to `String` and `Object` types for clarity, regardless of the type specified in the input type library.

> **Note:**
>  The `MarshalAsAttribute` does not support marshaling of generic types.

#### Examples
The following example applies the `MarshalAsAttribute` to a field, a method parameter, and a method return value in a managed type.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/MarshalAsAttribute/Overview/marshalasattribute.cs._

The following example applies the `MarshalAsAttribute` attribute to a property:

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/MarshalAsAttribute/Overview/Signature1.cs._

## MarshalAsAttribute.MarshalAsAttribute(Int16) constructor

```csharp
public MarshalAsAttribute (short unmanagedType);
```

Initializes a new instance of the `MarshalAsAttribute` class with the specified `UnmanagedType` value.

Parameters:

- `unmanagedType`: The value the data is to be marshaled as.

#### Remarks
This constructor takes an underlying 16-bit signed integer that represents each `UnmanagedType` enumeration member. The Tlbimp.exe (Type Library Importer) uses this constructor.

## MarshalAsAttribute.MarshalAsAttribute(UnmanagedType) constructor

```csharp
public MarshalAsAttribute (System.Runtime.InteropServices.UnmanagedType unmanagedType);
```

Initializes a new instance of the `MarshalAsAttribute` class with the specified `UnmanagedType` enumeration member.

Parameters:

- `unmanagedType`: The value the data is to be marshaled as.

#### Remarks
For readable code that is less prone to error, always use this constructor.

## MarshalAsAttribute.Value property

```csharp
public System.Runtime.InteropServices.UnmanagedType Value { get; }
```

Gets the `UnmanagedType` value the data is to be marshaled as.

Returns: The `UnmanagedType` value the data is to be marshaled as.

#### Remarks
This value is used with `MarshalAsAttribute` to indicate how types should be marshaled between managed and unmanaged code. In some cases, you can use this field with certain `UnmanagedType` enumeration members. For `CustomMarshaler` and `ByValArray`, you must use additional named parameters.

## MarshalAsAttribute.ArraySubType field

```csharp
public System.Runtime.InteropServices.UnmanagedType ArraySubType;
```

Specifies the element type of the unmanaged `UnmanagedType.LPArray` or `UnmanagedType.ByValArray`.

#### Remarks
You can set this parameter to a value from the `UnmanagedType` enumeration to specify the type of the array's elements. If a type is not specified, the default unmanaged type corresponding to the managed array's element type is used. For example, the `ArraySubType` for a `LPWStr` array in COM is `LPWStr`. For additional information, see Default Marshaling for Arrays.

## MarshalAsAttribute.IidParameterIndex field

```csharp
public int IidParameterIndex;
```

Specifies the parameter index of the unmanaged `iid_is` attribute used by COM.

To be added.

## MarshalAsAttribute.MarshalCookie field

```csharp
public string? MarshalCookie;
```

Provides additional information to a custom marshaler.

#### Remarks
This field is optional when using a custom marshaler.

You can set this field to a string that supplies additional information to a custom marshaler. For example, the same marshaler can be used to provide a number of wrappers, where the cookie is used to indicate the specific wrapper.

## MarshalAsAttribute.MarshalType field

```csharp
public string? MarshalType;
```

Specifies the fully qualified name of a custom marshaler.

#### Remarks
You can use either the `MarshalType` or `MarshalTypeRef` field specify a custom marshaler type for the attributed parameter, field, or return type. The `MarshalType` field enables you to specify a string representing the fully qualified name of a custom marshaler. It is useful for late-bound references, but is less preferred than `MarshalTypeRef` for specifying a custom marshaler.

## MarshalAsAttribute.MarshalTypeRef field

```csharp
public Type? MarshalTypeRef;
```

Implements `MarshalAsAttribute.MarshalType` as a type.

#### Remarks
You can use either the `MarshalTypeRef` or `MarshalType` field to specify a custom marshaler type for the attributed parameter, field, or return type. The `MarshalTypeRef` field allows easier usage of `MarshalType` by shortening the syntax. In the following example, the first line represents syntax using `MarshalType` and the second line represents syntax using `MarshalTypeRef`.

```
[MarshalAs(UnmanagedType.CustomMarshaler, MarshalType = "Assembly, NameSpace.TypeName")]
```

```
[MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(NameSpace.TypeName))]
```

You can set a `Type` object using `typeof` in C#, `GetType` in Visual Basic, or `typeid` in C++.

## MarshalAsAttribute.SafeArraySubType field

```csharp
public System.Runtime.InteropServices.VarEnum SafeArraySubType;
```

Indicates the element type of the `UnmanagedType.SafeArray`.

#### Remarks
You can set this field to a value from the `VarEnum` enumeration to specify the type of the safe array's elements. If a type is not specified, the managed element type's default type (if passed as a VARIANT) is used. For example, the `SafeArraySubType` for an `int` array in COM is `VT_I4`. For additional information, see Default Marshaling for Arrays.

## MarshalAsAttribute.SafeArrayUserDefinedSubType field

```csharp
public Type? SafeArrayUserDefinedSubType;
```

Indicates the user-defined element type of the `UnmanagedType.SafeArray`.

#### Remarks
Initialize this field with your custom type to enable the elements of the `SAFEARRAY` to be marshaled successfully. This field is only needed when the `SafeArraySubType` is either `VT_UNKNOWN`, `VT_DISPATCH`, or `VT_RECORD`. For additional information, see Default Marshaling for Arrays.

## MarshalAsAttribute.SizeConst field

```csharp
public int SizeConst;
```

Indicates the number of elements in the fixed-length array or the number of characters (not bytes) in a string to import.

#### Remarks
This field is required for the `ByValArray` and `ByValTStr` members of the `UnmanagedType` enumeration. Because the compressed format of the metadata is limited to 0x1FFFFFFF, the range of allowed values for `SizeConst` are (>= 0 and <= 0x1FFFFFFF).

For additional information, see Default Marshaling for Arrays.

## MarshalAsAttribute.SizeParamIndex field

```csharp
public short SizeParamIndex;
```

Indicates the zero-based parameter that contains the count of array elements, similar to `size_is` in COM.

#### Remarks
The `SizeParamIndex` field supports managed-to-unmanaged and unmanaged-to-managed calls. It does not have any effect on managed code that calls COM objects.

Depending on the managed type and the attributes applied to it, the array can be passed as a safe array or C-style array.

When arrays are passed as C-style arrays, the marshaler cannot determine the size of the array. Therefore, to pass an managed array to an unmanaged function or method, you must provide two arguments:

- The array, defined by reference or value.

- The array size, defined by reference or value.

The zero-based index of the array size parameter is defined by using the `SizeParamIndex` field.

If you specify both `SizeParamIndex` and `SizeConst` with a `LPArray` field, the sum of the fields' values produces a size total.

For more information, see Default Marshaling for Arrays.

#### Examples

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/MarshalAsAttribute/SizeParamIndex/marshalas.sizeparamindex.cs._
