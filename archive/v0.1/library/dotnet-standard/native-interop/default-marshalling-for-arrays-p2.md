---
title: "Default Marshalling for Arrays (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/default-marshalling-for-arrays.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Default Marshalling for Arrays (part 2 of 2)

## Passing Arrays to COM

 All managed array types can be passed to unmanaged code from managed code. Depending on the managed type and the attributes applied to it, the array can be accessed as a safe array or a C-style array, as shown in the following table.

|Managed array type|Exported as|
|------------------------|-----------------|
|**ELEMENT_TYPE_SZARRAY** **\<** *type* **>**|`System.Runtime.InteropServices.UnmanagedType` **.SafeArray(** *type* **)** **UnmanagedType.LPArray** Type is provided in the signature. Rank is always 1, lower bound is always 0. Size is always known at runtime.|
|**ELEMENT_TYPE_ARRAY** **\<** *type* **>** **\<** *rank* **>**[**\<** *bounds* **>**]|**UnmanagedType.SafeArray(** *type* **)** **UnmanagedType.LPArray** Type, rank, bounds are provided in the signature. Size is always known at runtime.|
|**ELEMENT_TYPE_CLASS** **\<**`System.Array`**>**|**UT_Interface** **UnmanagedType.SafeArray(** *type* **)** Type, rank, bounds, and size are always known at runtime.|

 There is a limitation in OLE Automation relating to arrays of structures that contain LPSTR or LPWSTR.  Therefore, `String` fields have to be marshalled as **UnmanagedType.BSTR**. Otherwise, an exception will be thrown.

### ELEMENT_TYPE_SZARRAY

 When a method containing an `ELEMENT_TYPE_SZARRAY` parameter (one-dimensional array) is exported from a .NET assembly to a type library, the array parameter is converted to a `SAFEARRAY` of a given type. The same conversion rules apply to the array element types. The contents of the managed array are automatically copied from managed memory into the **SAFEARRAY**. For example:

#### Managed signature

```vb
Sub [New](ar() As Long)
Sub [New](ar() As String)
```

```csharp
void New(long[] ar );
void New(String[] ar );
```

#### Unmanaged signature

```cpp
HRESULT New([in] SAFEARRAY( long ) ar);
HRESULT New([in] SAFEARRAY( BSTR ) ar);
```

 The rank of the safe arrays is always 1 and the lower bound is always 0. The size is determined at runtime by the size of the managed array being passed.

 The array can also be marshalled as a C-style array by using the `System.Runtime.InteropServices.MarshalAsAttribute` attribute. For example:

#### Managed signature

```vb
Sub [New](<MarshalAs(UnmanagedType.LPArray, SizeParamIndex:=1)> _
   ar() As Long, size as Integer)
Sub [New](<MarshalAs(UnmanagedType.LPArray, SizeParamIndex:=1)> _
   ar() As String, size as Integer)
Sub [New](<MarshalAs(UnmanagedType.LPArray, _
   ArraySubType= UnmanagedType.LPStr, SizeParamIndex:=1)> _
   ar() As String, size as Integer)
```

```csharp
void New([MarshalAs(UnmanagedType.LPArray, SizeParamIndex=1)]
   long [] ar, int size );
void New([MarshalAs(UnmanagedType.LPArray, SizeParamIndex=1)]
   String [] ar, int size );
void New([MarshalAs(UnmanagedType.LPArray, ArraySubType=
   UnmanagedType.LPStr, SizeParamIndex=1)]
   String [] ar, int size );
```

#### Unmanaged signature

```cpp
HRESULT New(long ar[]);
HRESULT New(BSTR ar[]);
HRESULT New(LPStr ar[]);
```

 Although the marshaller has the length information needed to marshal the array, the array length is usually passed as a separate argument to convey the length to the callee.

### ELEMENT_TYPE_ARRAY

 When a method containing an `ELEMENT_TYPE_ARRAY` parameter is exported from a .NET assembly to a type library, the array parameter is converted to a `SAFEARRAY` of a given type. The contents of the managed array are automatically copied from managed memory into the **SAFEARRAY**. For example:

#### Managed signature

```vb
Sub [New](ar(,) As Long)
Sub [New](ar(,) As String)
```

```csharp
void New( long [,] ar );
void New( String [,] ar );
```

#### Unmanaged signature

```cpp
HRESULT New([in] SAFEARRAY( long ) ar);
HRESULT New([in] SAFEARRAY( BSTR ) ar);
```

 The rank, size, and bounds of the safe arrays are determined at runtime by the characteristics of the managed array.

 The array can also be marshalled as a C-style array by applying the `System.Runtime.InteropServices.MarshalAsAttribute` attribute. For example:

#### Managed signature

```vb
Sub [New](<MarshalAs(UnmanagedType.LPARRAY, SizeParamIndex:=1)> _
   ar(,) As Long, size As Integer)
Sub [New](<MarshalAs(UnmanagedType.LPARRAY, _
   ArraySubType:=UnmanagedType.LPStr, SizeParamIndex:=1)> _
   ar(,) As String, size As Integer)
```

```csharp
void New([MarshalAs(UnmanagedType.LPARRAY, SizeParamIndex=1)]
   long [,] ar, int size );
void New([MarshalAs(UnmanagedType.LPARRAY,
   ArraySubType= UnmanagedType.LPStr, SizeParamIndex=1)]
   String [,] ar, int size );
```

#### Unmanaged signature

```cpp
HRESULT New(long ar[]);
HRESULT New(LPStr ar[]);
```

 Nested arrays cannot be marshalled. For example, the following signature generates an error when exported with the Type Library Exporter (Tlbexp.exe).

#### Managed signature

```vb
Sub [New](ar()()() As Long)
```

```csharp
void New(long [][][] ar );
```

### ELEMENT_TYPE_CLASS \<System.Array>

 When a method containing a `System.Array` parameter is exported from a .NET assembly to a type library, the array parameter is converted to an `_Array` interface. The contents of the managed array are accessible only through the methods and properties of the `_Array` interface. **System.Array** can also be marshalled as a `SAFEARRAY` by using the `System.Runtime.InteropServices.MarshalAsAttribute` attribute. When marshalled as a safe array, the array elements are marshalled as variants. For example:

#### Managed signature

```vb
Sub New1( ar As System.Array )
Sub New2( <MarshalAs(UnmanagedType.SafeArray)> ar As System.Array )
```

```csharp
void New1( System.Array ar );
void New2( [MarshalAs(UnmanagedType.SafeArray)] System.Array ar );
```

#### Unmanaged signature

```cpp
HRESULT New([in] _Array *ar);
HRESULT New([in] SAFEARRAY(VARIANT) ar);
```

### Arrays within Structures

 Unmanaged structures can contain embedded arrays. By default, these embedded array fields are marshalled as a SAFEARRAY. In the following example, `s1` is an embedded array that is allocated directly within the structure itself.

#### Unmanaged representation

```cpp
struct MyStruct {
    short s1[128];
}
```

 Arrays can be marshalled as `System.Runtime.InteropServices.UnmanagedType`, which requires you to set the `System.Runtime.InteropServices.MarshalAsAttribute` field. The size can be set only as a constant. The following code shows the corresponding managed definition of `MyStruct`.

```vb
Public Structure <StructLayout(LayoutKind.Sequential)> MyStruct
   Public <MarshalAs(UnmanagedType.ByValArray, SizeConst := 128)> _
     s1() As Short
End Structure
```

```csharp
[StructLayout(LayoutKind.Sequential)]
public struct MyStruct {
   [MarshalAs(UnmanagedType.ByValArray, SizeConst=128)] public short[] s1;
}
```

## See also

- Default Marshalling Behavior
- Blittable and Non-Blittable Types
- Directional Attributes
- Copying and Pinning
