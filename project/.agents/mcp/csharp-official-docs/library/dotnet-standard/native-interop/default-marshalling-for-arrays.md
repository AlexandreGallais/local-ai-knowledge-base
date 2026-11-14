---
title: "Default Marshalling for Arrays (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/default-marshalling-for-arrays.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default Marshalling for Arrays

In an application consisting entirely of managed code, the common language runtime passes array types as In/Out parameters. In contrast, the interop marshaller passes an array as In parameters by default.

 With pinning optimization, a blittable array can appear to operate as an In/Out parameter when interacting with objects in the same apartment. However, if you later export the code to a type library used to generate the cross-machine proxy, and that library is used to marshal your calls across apartments, the calls can revert to true In parameter behavior.

 Arrays are complex by nature, and the distinctions between managed and unmanaged arrays warrant more information than other non-blittable types.

## Managed Arrays

 Managed array types can vary; however, the `System.Array` class is the base class of all array types. The **System.Array** class has properties for determining the rank, length, and lower and upper bounds of an array, as well as methods for accessing, sorting, searching, copying, and creating arrays.

 These array types are dynamic and do not have a corresponding static type defined in the base class library. It is convenient to think of each combination of element type and rank as a distinct type of array. Therefore, a one-dimensional array of integers is of a different type than a one-dimensional array of double types. Similarly a two-dimensional array of integers is different from a one-dimensional array of integers. The bounds of the array are not considered when comparing types.

 As the following table shows, any instance of a managed array must be of a specific element type, rank, and lower bound.

| Managed array type       | Element type      | Rank    | Lower bound | Signature notation     |
|--------------------------|-------------------|---------|-------------|------------------------|
| **ELEMENT_TYPE_ARRAY**   | Specified by type | Specified by rank | Optionally specified by bounds | *type* **[** *n*,*m* **]** |
| **ELEMENT_TYPE_CLASS**   | Unknown           | Unknown | Unknown     | **System.Array**       |
| **ELEMENT_TYPE_SZARRAY** | Specified by type | 1       | 0           | *type* **[** *n* **]** |

## Unmanaged Arrays

 Unmanaged arrays are either COM-style safe arrays or C-style arrays with fixed or variable length. Safe arrays are self-describing arrays that carry the type, rank, and bounds of the associated array data. C-style arrays are one-dimensional typed arrays with a fixed lower bound of 0. The marshalling service has limited support for both types of arrays.

## Passing Array Parameters to .NET Code

 Both C-style arrays and safe arrays can be passed to .NET code from unmanaged code as either a safe array or a C-style array. The following table shows the unmanaged type value and the imported type.

| Unmanaged type | Imported type |
|----------------|---------------|
|**SafeArray(** *Type* **)**|**ELEMENT_TYPE_SZARRAY** **\<** *ConvertedType* **>** Rank = 1, lower bound = 0. Size is known only if provided in the managed signature. Safe arrays that are not rank = 1 or lower bound = 0 cannot be marshalled as **SZARRAY**.|
|*Type*  **[]**|**ELEMENT_TYPE_SZARRAY** **\<** *ConvertedType* **>** Rank = 1, lower bound = 0. Size is known only if provided in the managed signature.|

### Safe Arrays

 When a safe array is imported from a type library to a .NET assembly, the array is converted to a one-dimensional array of a known type (such as **int**). The same type conversion rules that apply to parameters also apply to array elements. For example, a safe array of `BSTR` types becomes a managed array of strings and a safe array of variants becomes a managed array of objects. The `SAFEARRAY` element type is captured from the type library and saved in the `SAFEARRAY` value of the `System.Runtime.InteropServices.UnmanagedType` enumeration.

 Because the rank and bounds of the safe array cannot be determined from the type library, the rank is assumed to equal 1 and the lower bound is assumed to equal 0. The rank and bounds must be defined in the managed signature produced by the Type Library Importer (Tlbimp.exe). If the rank passed to the method at runtime differs, a `System.Runtime.InteropServices.SafeArrayRankMismatchException` is thrown. If the type of the array passed at runtime differs, a `System.Runtime.InteropServices.SafeArrayTypeMismatchException` is thrown. The following example shows safe arrays in managed and unmanaged code.

 **Unmanaged signature**

```cpp
HRESULT New1([in] SAFEARRAY( int ) ar);
HRESULT New2([in] SAFEARRAY( DATE ) ar);
HRESULT New3([in, out] SAFEARRAY( BSTR ) *ar);
```

 **Managed signature**

```vb
Sub New1(<MarshalAs(UnmanagedType.SafeArray, SafeArraySubType:=VT_I4)> _
   ar() As Integer)
Sub New2(<MarshalAs(UnmanagedType.SafeArray, SafeArraySubType:=VT_DATE)> _
   ar() As DateTime)
Sub New3(ByRef <MarshalAs(UnmanagedType.SafeArray, SafeArraySubType:=VT_BSTR)> _
   ar() As String)
```

```csharp
void New1([MarshalAs(UnmanagedType.SafeArray, SafeArraySubType=VT_I4)] int[] ar) ;
void New2([MarshalAs(UnmanagedType.SafeArray, SafeArraySubType=VT_DATE)]
   DateTime[] ar);
void New3([MarshalAs(UnmanagedType.SafeArray, SafeArraySubType=VT_BSTR)]
   ref String[] ar);
```

 Multidimensional, or nonzero-bound safe arrays, can be marshalled into managed code if the method signature produced by Tlbimp.exe is modified to indicate an element type of `ELEMENT_TYPE_ARRAY` instead of **ELEMENT_TYPE_SZARRAY**. Alternatively, you can use the **/sysarray** switch with Tlbimp.exe to import all arrays as `System.Array` objects. In cases where the array being passed is known to be multidimensional, you can edit the common intermediate language (CIL) code produced by Tlbimp.exe and then recompile it. For details about how to modify CIL code, see Customizing Runtime Callable Wrappers.

### C-Style Arrays

 When a C-style array is imported from a type library to a .NET assembly, the array is converted to **ELEMENT_TYPE_SZARRAY**.

 The array element type is determined from the type library and preserved during the import. The same conversion rules that apply to parameters also apply to array elements. For example, an array of `LPStr` types becomes an array of `String` types. Tlbimp.exe captures the array element type and applies the `System.Runtime.InteropServices.MarshalAsAttribute` attribute to the parameter.

 The array rank is assumed to equal 1. If the rank is greater than 1, the array is marshalled as a one-dimensional array in column-major order. The lower bound always equals 0.

 Type libraries can contain arrays of fixed or variable length. Tlbimp.exe can import only fixed-length arrays from type libraries because type libraries lack the information needed to marshal variable-length arrays. With fixed-length arrays, the size is imported from the type library and captured in the `MarshalAsAttribute` that is applied to the parameter.

 You must manually define type libraries containing variable-length arrays, as shown in the following example.

 **Unmanaged signature**

```cpp
HRESULT New1(int ar[10]);
HRESULT New2(double ar[10][20]);
HRESULT New3(LPWStr ar[10]);
```

 **Managed signature**

```vb
Sub New1(<MarshalAs(UnmanagedType.LPArray, SizeConst=10)> _
   ar() As Integer)
Sub New2(<MarshalAs(UnmanagedType.LPArray, SizeConst=200)> _
   ar() As Double)
Sub New2(<MarshalAs(UnmanagedType.LPArray, _
   ArraySubType=UnmanagedType.LPWStr, SizeConst=10)> _
   ar() As String)
```

```csharp
void New1([MarshalAs(UnmanagedType.LPArray, SizeConst=10)] int[] ar);
void New2([MarshalAs(UnmanagedType.LPArray, SizeConst=200)] double[] ar);
void New2([MarshalAs(UnmanagedType.LPArray,
   ArraySubType=UnmanagedType.LPWStr, SizeConst=10)] String[] ar);
```

 Although you can apply the `size_is` or `length_is` attributes to an array in Interface Definition Language (IDL) source to convey the size to a client, the Microsoft Interface Definition Language (MIDL) compiler does not propagate that information to the type library. Without knowing the size, the interop marshalling service cannot marshal the array elements. Consequently, variable-length arrays are imported as reference arguments. For example:

 **Unmanaged signature**

```cpp
HRESULT New1(int ar[]);
HRESULT New2(int ArSize, [size_is(ArSize)] double ar[]);
HRESULT New3(int ElemCnt, [length_is(ElemCnt)] LPStr ar[]);
```

 **Managed signature**

```vb
Sub New1(ByRef ar As Integer)
Sub New2(ByRef ar As Double)
Sub New3(ByRef ar As String)
```

```csharp
void New1(ref int ar);
void New2(ref double ar);
void New3(ref String ar);
```

 You can provide the marshaller with the array size by editing the common intermediate language (CIL) code produced by Tlbimp.exe and then recompiling it. For details about how to modify CIL code, see Customizing Runtime Callable Wrappers. To indicate the number of elements in the array, apply the `System.Runtime.InteropServices.MarshalAsAttribute` type to the array parameter of the managed method definition in one of the following ways:

- Identify another parameter that contains the number of elements in the array. The parameters are identified by position, starting with the first parameter as number 0.

    ```vb
    Sub [New](ElemCnt As Integer, _
       <MarshalAs(UnmanagedType.LPArray, SizeParamIndex:=1)> _
       ar() As Integer)
    ```

    ```csharp
    void New(
       int ElemCnt,
       [MarshalAs(UnmanagedType.LPArray, SizeParamIndex=0)] int[] ar );
    ```

- Define the size of the array as a constant. For example:

    ```vb
    Sub [New](<MarshalAs(UnmanagedType.LPArray, SizeConst:=128)> _
       ar() As Integer)
    ```

    ```csharp
    void New(
       [MarshalAs(UnmanagedType.LPArray, SizeConst=128)] int[] ar );
    ```

 When marshalling arrays from unmanaged code to managed code, the marshaller checks the `MarshalAsAttribute` associated with the parameter to determine the array size. If the array size is not specified, only one element is marshalled.

> **Note:**
> The `MarshalAsAttribute` has no effect on marshalling managed arrays to unmanaged code. In that direction, the array size is determined by examination. There is no way to marshal a subset of a managed array.

 The interop marshaller uses the `CoTaskMemAlloc` and `CoTaskMemFree` methods on Windows or `malloc` and `free` methods on other operating systems to allocate and retrieve memory. Memory allocation performed by unmanaged code must also use these methods.
