---
title: "VarEnum enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/VarEnum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# VarEnum enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum VarEnum
```

Indicates how to marshal the array elements when an array is marshaled from managed to unmanaged code as a `UnmanagedType.SafeArray`.

#### Remarks
Used with `MarshalAsAttribute` to explicitly control the element type of the `SafeArray`.

#### Examples

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/ComImportAttribute/Overview/codefile2.cs._

## VarEnum.VT_ARRAY field

```csharp
VT_ARRAY
```

Indicates a `SAFEARRAY` pointer.

## VarEnum.VT_BLOB field

```csharp
VT_BLOB
```

Indicates length prefixed bytes.

## VarEnum.VT_BLOB_OBJECT field

```csharp
VT_BLOB_OBJECT
```

Indicates that a blob contains an object.

## VarEnum.VT_BOOL field

```csharp
VT_BOOL
```

Indicates a Boolean value.

## VarEnum.VT_BSTR field

```csharp
VT_BSTR
```

Indicates a BSTR string.

## VarEnum.VT_BYREF field

```csharp
VT_BYREF
```

Indicates that a value is a reference.

## VarEnum.VT_CARRAY field

```csharp
VT_CARRAY
```

Indicates a C style array.

## VarEnum.VT_CF field

```csharp
VT_CF
```

Indicates the clipboard format.

## VarEnum.VT_CLSID field

```csharp
VT_CLSID
```

Indicates a class ID.

## VarEnum.VT_CY field

```csharp
VT_CY
```

Indicates a currency value.

## VarEnum.VT_DATE field

```csharp
VT_DATE
```

Indicates a DATE value.

## VarEnum.VT_DECIMAL field

```csharp
VT_DECIMAL
```

Indicates a `decimal` value.

## VarEnum.VT_DISPATCH field

```csharp
VT_DISPATCH
```

Indicates an `IDispatch` pointer.

## VarEnum.VT_EMPTY field

```csharp
VT_EMPTY
```

Indicates that a value was not specified.

## VarEnum.VT_ERROR field

```csharp
VT_ERROR
```

Indicates an SCODE.

## VarEnum.VT_FILETIME field

```csharp
VT_FILETIME
```

Indicates a FILETIME value.

## VarEnum.VT_HRESULT field

```csharp
VT_HRESULT
```

Indicates an HRESULT.

## VarEnum.VT_I1 field

```csharp
VT_I1
```

Indicates a `char` value.

## VarEnum.VT_I2 field

```csharp
VT_I2
```

Indicates a `short` integer.

## VarEnum.VT_I4 field

```csharp
VT_I4
```

Indicates a `long` integer.

## VarEnum.VT_I8 field

```csharp
VT_I8
```

Indicates a 64-bit integer.

## VarEnum.VT_INT field

```csharp
VT_INT
```

Indicates an integer value.

## VarEnum.VT_LPSTR field

```csharp
VT_LPSTR
```

Indicates a null-terminated string.

## VarEnum.VT_LPWSTR field

```csharp
VT_LPWSTR
```

Indicates a wide string terminated by `null`.

## VarEnum.VT_NULL field

```csharp
VT_NULL
```

Indicates a null value, similar to a null value in SQL.

## VarEnum.VT_PTR field

```csharp
VT_PTR
```

Indicates a pointer type.

## VarEnum.VT_R4 field

```csharp
VT_R4
```

Indicates a `float` value.

## VarEnum.VT_R8 field

```csharp
VT_R8
```

Indicates a `double` value.

## VarEnum.VT_RECORD field

```csharp
VT_RECORD
```

Indicates a user defined type.

## VarEnum.VT_SAFEARRAY field

```csharp
VT_SAFEARRAY
```

Indicates a SAFEARRAY. Not valid in a VARIANT.

## VarEnum.VT_STORAGE field

```csharp
VT_STORAGE
```

Indicates that the name of a storage follows.

## VarEnum.VT_STORED_OBJECT field

```csharp
VT_STORED_OBJECT
```

Indicates that a storage contains an object.

## VarEnum.VT_STREAM field

```csharp
VT_STREAM
```

Indicates that the name of a stream follows.

## VarEnum.VT_STREAMED_OBJECT field

```csharp
VT_STREAMED_OBJECT
```

Indicates that a stream contains an object.

## VarEnum.VT_UI1 field

```csharp
VT_UI1
```

Indicates a `byte`.

## VarEnum.VT_UI2 field

```csharp
VT_UI2
```

Indicates an `unsigned``short`.

## VarEnum.VT_UI4 field

```csharp
VT_UI4
```

Indicates an `unsigned``long`.

## VarEnum.VT_UI8 field

```csharp
VT_UI8
```

Indicates an 64-bit unsigned integer.

## VarEnum.VT_UINT field

```csharp
VT_UINT
```

Indicates an `unsigned` integer value.

## VarEnum.VT_UNKNOWN field

```csharp
VT_UNKNOWN
```

Indicates an `IUnknown` pointer.

## VarEnum.VT_USERDEFINED field

```csharp
VT_USERDEFINED
```

Indicates a user defined type.

## VarEnum.VT_VARIANT field

```csharp
VT_VARIANT
```

Indicates a VARIANT `far` pointer.

## VarEnum.VT_VECTOR field

```csharp
VT_VECTOR
```

Indicates a simple, counted array.

## VarEnum.VT_VOID field

```csharp
VT_VOID
```

Indicates a C style `void`.
