---
title: "Default Marshalling for Objects (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/default-marshalling-for-objects.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default Marshalling for Objects

Parameters and fields typed as `System.Object` can be exposed to unmanaged code as one of the following types:

- A variant when the object is a parameter.

- An interface when the object is a structure field.

Only COM interop supports marshalling for object types. The default behavior is to marshal objects to COM variants. These rules apply only to the type `Object` and do not apply to strongly typed objects that derive from the `Object` class.

## Marshalling Options

The following table shows the marshalling options for the `Object` data type. The `System.Runtime.InteropServices.MarshalAsAttribute` attribute provides several `System.Runtime.InteropServices.UnmanagedType` enumeration values to marshal objects.

|Enumeration type|Description of unmanaged format|
|----------------------|-------------------------------------|
|**UnmanagedType.Struct** (default for parameters)|A COM-style variant.|
|**UnmanagedType.Interface**|An `IDispatch` interface, if possible; otherwise, an `IUnknown` interface.|
|**UnmanagedType.IUnknown** (default for fields)|An `IUnknown` interface.|
|**UnmanagedType.IDispatch**|An `IDispatch` interface.|

The following example shows the managed interface definition for `MarshalObject`.

```vb
Interface MarshalObject
   Sub SetVariant(o As Object)
   Sub SetVariantRef(ByRef o As Object)
   Function GetVariant() As Object

   Sub SetIDispatch( <MarshalAs(UnmanagedType.IDispatch)> o As Object)
   Sub SetIDispatchRef(ByRef <MarshalAs(UnmanagedType.IDispatch)> o _
      As Object)
   Function GetIDispatch() As <MarshalAs(UnmanagedType.IDispatch)> Object
   Sub SetIUnknown( <MarshalAs(UnmanagedType.IUnknown)> o As Object)
   Sub SetIUnknownRef(ByRef <MarshalAs(UnmanagedType.IUnknown)> o _
      As Object)
   Function GetIUnknown() As <MarshalAs(UnmanagedType.IUnknown)> Object
End Interface
```

```csharp
interface MarshalObject {
   void SetVariant(Object o);
   void SetVariantRef(ref Object o);
   Object GetVariant();

   void SetIDispatch ([MarshalAs(UnmanagedType.IDispatch)]Object o);
   void SetIDispatchRef([MarshalAs(UnmanagedType.IDispatch)]ref Object o);
   [MarshalAs(UnmanagedType.IDispatch)] Object GetIDispatch();
   void SetIUnknown ([MarshalAs(UnmanagedType.IUnknown)]Object o);
   void SetIUnknownRef([MarshalAs(UnmanagedType.IUnknown)]ref Object o);
   [MarshalAs(UnmanagedType.IUnknown)] Object GetIUnknown();
}
```

The following code exports the `MarshalObject` interface to a type library.

```cpp
interface MarshalObject {
   HRESULT SetVariant([in] VARIANT o);
   HRESULT SetVariantRef([in,out] VARIANT *o);
   HRESULT GetVariant([out,retval] VARIANT *o)
   HRESULT SetIDispatch([in] IDispatch *o);
   HRESULT SetIDispatchRef([in,out] IDispatch **o);
   HRESULT GetIDispatch([out,retval] IDispatch **o)
   HRESULT SetIUnknown([in] IUnknown *o);
   HRESULT SetIUnknownRef([in,out] IUnknown **o);
   HRESULT GetIUnknown([out,retval] IUnknown **o)
}
```

> **Note:**
> The interop marshaller automatically frees any allocated object inside the variant after the call.

The following example shows a formatted value type.

```vb
Public Structure ObjectHolder
   Dim o1 As Object
   <MarshalAs(UnmanagedType.IDispatch)> Public o2 As Object
End Structure
```

```csharp
public struct ObjectHolder {
   Object o1;
   [MarshalAs(UnmanagedType.IDispatch)]public Object o2;
}
```

The following code exports the formatted type to a type library.

```cpp
struct ObjectHolder {
   VARIANT o1;
   IDispatch *o2;
}
```

## Marshalling Object to Interface

When an object is exposed to COM as an interface, that interface is the class interface for the managed type `System.Object` (the `_Object` interface). This interface is typed as an `IDispatch` (`System.Runtime.InteropServices.UnmanagedType`) or an `IUnknown` (**UnmanagedType.IUnknown**) in the resulting type library. COM clients can dynamically invoke the members of the managed class or any members implemented by its derived classes through the `_Object` interface. The client can also call `QueryInterface` to obtain any other interface explicitly implemented by the managed type.

## Marshalling Object to Variant

When an object is marshalled to a variant, the internal variant type is determined at runtime, based on the following rules:

- If the object reference is null (**Nothing** in Visual Basic), the object is marshalled to a variant of type **VT_EMPTY**.

- If the object is an instance of any type listed in the following table, the resulting variant type is determined by the rules built into the marshaller and shown in the table.

- Other objects that need to explicitly control the marshalling behavior can implement the `System.IConvertible` interface. In that case, the variant type is determined by the type code returned from the `System.IConvertible.GetTypeCode*` method. Otherwise, the object is marshalled as a variant of type **VT_UNKNOWN**.

### Marshalling System Types to Variant

The following table shows managed object types and their corresponding COM variant types. These types are converted only when the signature of the method being called is of type `System.Object`.

|Object type|COM variant type|
|-----------------|----------------------|
|Null object reference (**Nothing** in Visual Basic).|**VT_EMPTY**|
|`System.DBNull`|**VT_NULL**|
|`System.Runtime.InteropServices.ErrorWrapper`|**VT_ERROR**|
|`System.Reflection.Missing`|**VT_ERROR** with **E_PARAMNOTFOUND**|
|`System.Runtime.InteropServices.DispatchWrapper`|**VT_DISPATCH**|
|`System.Runtime.InteropServices.UnknownWrapper`|**VT_UNKNOWN**|
|`System.Runtime.InteropServices.CurrencyWrapper`|**VT_CY**|
|`System.Boolean`|**VT_BOOL**|
|`System.SByte`|**VT_I1**|
|`System.Byte`|**VT_UI1**|
|`System.Int16`|**VT_I2**|
|`System.UInt16`|**VT_UI2**|
|`System.Int32`|**VT_I4**|
|`System.UInt32`|**VT_UI4**|
|`System.Int64`|**VT_I8**|
|`System.UInt64`|**VT_UI8**|
|`System.Single`|**VT_R4**|
|`System.Double`|**VT_R8**|
|`System.Decimal`|**VT_DECIMAL**|
|`System.DateTime`|**VT_DATE**|
|`System.String`|**VT_BSTR**|
|`System.IntPtr`|**VT_INT**|
|`System.UIntPtr`|**VT_UINT**|
|`System.Array`|**VT_ARRAY**|

Using the `MarshalObject` interface defined in the previous example, the following code example demonstrates how to pass <example-value> types of variants to a COM server.

```vb
Dim mo As New MarshalObject()
mo.SetVariant(Nothing)         ' Marshal as variant of type VT_EMPTY.
mo.SetVariant(System.DBNull.Value) ' Marshal as variant of type VT_NULL.
mo.SetVariant(CInt(27))        ' Marshal as variant of type VT_I2.
mo.SetVariant(CLng(27))        ' Marshal as variant of type VT_I4.
mo.SetVariant(CSng(27.0))      ' Marshal as variant of type VT_R4.
mo.SetVariant(CDbl(27.0))      ' Marshal as variant of type VT_R8.
```

```csharp
MarshalObject mo = new MarshalObject();
mo.SetVariant(null);            // Marshal as variant of type VT_EMPTY.
mo.SetVariant(System.DBNull.Value); // Marshal as variant of type VT_NULL.
mo.SetVariant((int)27);          // Marshal as variant of type VT_I2.
mo.SetVariant((long)27);          // Marshal as variant of type VT_I4.
mo.SetVariant((single)27.0);   // Marshal as variant of type VT_R4.
mo.SetVariant((double)27.0);   // Marshal as variant of type VT_R8.
```

COM types that do not have corresponding managed types can be marshalled using wrapper classes such as `System.Runtime.InteropServices.ErrorWrapper`, `System.Runtime.InteropServices.DispatchWrapper`, `System.Runtime.InteropServices.UnknownWrapper`, and `System.Runtime.InteropServices.CurrencyWrapper`. The following code example demonstrates how to use these wrappers to pass <example-value> types of variants to a COM server.

```vb
Imports System.Runtime.InteropServices
' Pass inew as a variant of type VT_UNKNOWN interface.
mo.SetVariant(New UnknownWrapper(inew))
' Pass inew as a variant of type VT_DISPATCH interface.
mo.SetVariant(New DispatchWrapper(inew))
' Pass a value as a variant of type VT_ERROR interface.
mo.SetVariant(New ErrorWrapper(&H80054002))
' Pass a value as a variant of type VT_CURRENCY interface.
mo.SetVariant(New CurrencyWrapper(New Decimal(5.25)))
```

```csharp
using System.Runtime.InteropServices;
// Pass inew as a variant of type VT_UNKNOWN interface.
mo.SetVariant(new UnknownWrapper(inew));
// Pass inew as a variant of type VT_DISPATCH interface.
mo.SetVariant(new DispatchWrapper(inew));
// Pass a value as a variant of type VT_ERROR interface.
mo.SetVariant(new ErrorWrapper(0x80054002));
// Pass a value as a variant of type VT_CURRENCY interface.
mo.SetVariant(new CurrencyWrapper(new Decimal(5.25)));
```

The wrapper classes are defined in the `System.Runtime.InteropServices` namespace.

### Marshalling the IConvertible Interface to Variant

Types other than those listed in the previous section can control how they are marshalled by implementing the `System.IConvertible` interface. If the object implements the `IConvertible` interface, the COM variant type is determined at runtime by the value of the `System.TypeCode` enumeration returned from the `System.IConvertible.GetTypeCode*` method.

The following table shows the possible values for the `TypeCode` enumeration and the corresponding COM variant type for each value.

|TypeCode|COM variant type|
|--------------|----------------------|
|**TypeCode.Empty**|**VT_EMPTY**|
|**TypeCode.Object**|**VT_UNKNOWN**|
|**TypeCode.DBNull**|**VT_NULL**|
|**TypeCode.Boolean**|**VT_BOOL**|
|**TypeCode.Char**|**VT_UI2**|
|**TypeCode.Sbyte**|**VT_I1**|
|**TypeCode.Byte**|**VT_UI1**|
|**TypeCode.Int16**|**VT_I2**|
|**TypeCode.UInt16**|**VT_UI2**|
|**TypeCode.Int32**|**VT_I4**|
|**TypeCode.UInt32**|**VT_UI4**|
|**TypeCode.Int64**|**VT_I8**|
|**TypeCode.UInt64**|**VT_UI8**|
|**TypeCode.Single**|**VT_R4**|
|**TypeCode.Double**|**VT_R8**|
|**TypeCode.Decimal**|**VT_DECIMAL**|
|**TypeCode.DateTime**|**VT_DATE**|
|**TypeCode.String**|**VT_BSTR**|
|Not supported.|**VT_INT**|
|Not supported.|**VT_UINT**|
|Not supported.|**VT_ARRAY**|
|Not supported.|**VT_RECORD**|
|Not supported.|**VT_CY**|
|Not supported.|**VT_VARIANT**|

The value of the COM variant is determined by calling the **IConvertible.To** *Type* interface, where `To` *Type* is the conversion routine that corresponds to the type that was returned from **IConvertible.GetTypeCode**. For example, an object that returns **TypeCode.Double** from **IConvertible.GetTypeCode** is marshalled as a COM variant of type **VT_R8**. You can obtain the value of the variant (stored in the `dblVal` field of the COM variant) by casting to the `IConvertible` interface and calling the `System.IConvertible.ToDouble*` method.

## Marshalling Variant to Object

When marshalling a variant to an object, the type, and sometimes the value, of the marshalled variant determines the type of object produced. The following table identifies each variant type and the corresponding object type that the marshaller creates when a variant is passed from COM to .NET.

|COM variant type|Object type|
|----------------------|-----------------|
|**VT_EMPTY**|Null object reference (**Nothing** in Visual Basic).|
|**VT_NULL**|`System.DBNull`|
|**VT_DISPATCH**|**System.__ComObject** or null if (pdispVal == null)|
|**VT_UNKNOWN**|**System.__ComObject** or null if (punkVal == null)|
|**VT_ERROR**|`System.UInt32`|
|**VT_BOOL**|`System.Boolean`|
|**VT_I1**|`System.SByte`|
|**VT_UI1**|`System.Byte`|
|**VT_I2**|`System.Int16`|
|**VT_UI2**|`System.UInt16`|
|**VT_I4**|`System.Int32`|
|**VT_UI4**|`System.UInt32`|
|**VT_I8**|`System.Int64`|
|**VT_UI8**|`System.UInt64`|
|**VT_R4**|`System.Single`|
|**VT_R8**|`System.Double`|
|**VT_DECIMAL**|`System.Decimal`|
|**VT_DATE**|`System.DateTime`|
|**VT_BSTR**|`System.String`|
|**VT_INT**|`System.Int32`|
|**VT_UINT**|`System.UInt32`|
|**VT_ARRAY** &#124; **VT_**\*|`System.Array`|
|**VT_CY**|`System.Decimal`|
|**VT_RECORD**|Corresponding boxed value type.|
|**VT_VARIANT**|Not supported.|

Variant types passed from COM to managed code and then back to COM might not retain the same variant type for the duration of the call. Consider what happens when a variant of type `VT_DISPATCH` is passed from COM to .NET. During marshalling, the variant is converted to a `System.Object`. If the `Object` is then passed back to COM, it is marshalled back to a variant of type **VT_UNKNOWN**. There is no guarantee that the variant produced when an object is marshalled from managed code to COM will be the same type as the variant initially used to produce the object.
