---
title: "Marshal class (part 7 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 7 of 13)

## Marshal.PtrToStringAnsi(IntPtr) method

```csharp
public static string? PtrToStringAnsi (IntPtr ptr);
```

Copies all characters up to the first null character from an unmanaged ANSI or UTF-8 string to a managed `String`, and widens each character to UTF-16.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.

Returns: A managed string that holds a copy of the unmanaged string. If `ptr` is `null`, the method returns a null string.

#### Remarks
`Marshal.PtrToStringAnsi` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemAnsi` and `Marshal.StringToHGlobalAnsi` methods.

#### Examples
The following example uses the `Marshal.PtrToStringAnsi` method to create a managed string from an unmanaged `char` array.

## Marshal.PtrToStringAnsi(IntPtr, Int32) method

```csharp
public static string PtrToStringAnsi (IntPtr ptr, int len);
```

Allocates a managed `String`, copies a specified number of characters from an unmanaged ANSI or UTF-8 string into it, and widens each character to UTF-16.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.
- `len`: The byte count of the input string to copy.

Returns: A managed string that holds a copy of the native string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

Exceptions:

- `ArgumentException`: `len` is less than zero.

#### Remarks
`Marshal.PtrToStringAnsi` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemAnsi` and `Marshal.StringToHGlobalAnsi` methods.

#### Examples
The following example uses the `Marshal.PtrToStringAnsi` method to create a managed string from an unmanaged`char` array.

## Marshal.PtrToStringAuto(IntPtr) method

```csharp
public static string? PtrToStringAuto (IntPtr ptr);
```

Allocates a managed `String` and copies all characters up to the first null character from a string stored in unmanaged memory into it.

Parameters:

- `ptr`: For Unicode platforms, the address of the first Unicode character.

-or-

For ANSI platforms, the address of the first ANSI character.

Returns: A managed string that holds a copy of the unmanaged string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

#### Remarks
If the current platform is Unicode, each ANSI character is widened to a Unicode character and this method calls `Marshal.PtrToStringUni`. Otherwise, this method calls `Marshal.PtrToStringAnsi`.

`Marshal.PtrToStringAuto` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. `Marshal.PtrToStringAuto` provides the opposite functionality of the `Marshal.StringToCoTaskMemAuto` and `Marshal.StringToHGlobalAuto` methods.

## Marshal.PtrToStringAuto(IntPtr, Int32) method

```csharp
public static string? PtrToStringAuto (IntPtr ptr, int len);
```

Allocates a managed `String` and copies the specified number of characters from a string stored in unmanaged memory into it.

Parameters:

- `ptr`: For Unicode platforms, the address of the first Unicode character.

-or-

For ANSI platforms, the address of the first ANSI character.
- `len`: The number of characters to copy.

Returns: A managed string that holds a copy of the native string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

Exceptions:

- `ArgumentException`: `len` is less than zero.

#### Remarks
On Unicode platforms, this method calls `Marshal.PtrToStringUni`; on ANSI platforms, it calls `Marshal.PtrToStringAnsi`. No transformations are done before these methods are called.

`Marshal.PtrToStringAuto` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. `Marshal.PtrToStringAuto` provides the opposite functionality of `Marshal.StringToCoTaskMemAuto` and `Marshal.StringToHGlobalAuto`.

## Marshal.PtrToStringBSTR(IntPtr) method

```csharp
public static string PtrToStringBSTR (IntPtr ptr);
```

Allocates a managed binary string (BSTR) stored in unmanaged memory into it.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.

Returns: A managed string that holds a copy of the unmanaged string.

Exceptions:

- `ArgumentNullException`: `ptr` equals `IntPtr.Zero`.

#### Remarks
Call this method only on strings that were allocated with the unmanaged SysAllocString and SysAllocStringLen functions.

`Marshal.PtrToStringBSTR` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToBSTR` method.

## Marshal.PtrToStringUni(IntPtr) method

```csharp
public static string? PtrToStringUni (IntPtr ptr);
```

Allocates a managed `String` and copies all characters up to the first null character from an unmanaged Unicode string into it.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.

Returns: A managed string that holds a copy of the unmanaged string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

#### Remarks
`Marshal.PtrToStringUni` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemUni` and `Marshal.StringToHGlobalUni` methods.

This API reflects the Windows definition of Unicode, which is a UTF-16 2-byte encoding. On many non-Windows platforms, the `wchar_t` data-type is 4-bytes, not 2-bytes. Consult your compiler to confirm if `wchar_t` can be used or `char16_t` should be used instead.

## Marshal.PtrToStringUni(IntPtr, Int32) method

```csharp
public static string PtrToStringUni (IntPtr ptr, int len);
```

Allocates a managed `String` and copies a specified number of characters from an unmanaged Unicode string into it.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.
- `len`: The number of Unicode characters to copy.

Returns: A managed string that holds a copy of the unmanaged string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

#### Remarks
`Marshal.PtrToStringUni` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemUni` and `Marshal.StringToHGlobalUni` methods.

This API reflects the Windows definition of Unicode, which is a UTF-16 2-byte encoding. On many non-Windows platforms, the `wchar_t` data-type is 4-bytes, not 2-bytes. Consult your compiler to confirm if `wchar_t` can be used or `char16_t` should be used instead.

## Marshal.PtrToStringUTF8(IntPtr) method

```csharp
public static string? PtrToStringUTF8 (IntPtr ptr);
```

Allocates a managed `String` and copies all characters up to the first null character from an unmanaged UTF-8 string into it.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.

Returns: A managed string that holds a copy of the unmanaged string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

#### Remarks
`Marshal.PtrToStringUTF8` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemUTF8` methods.

## Marshal.PtrToStringUTF8(IntPtr, Int32) method

```csharp
public static string PtrToStringUTF8 (IntPtr ptr, int byteLen);
```

Allocates a managed `String` and copies a specified number of bytes from an unmanaged UTF8 string into it.

Parameters:

- `ptr`: The address of the first character of the unmanaged string.
- `byteLen`: The number of bytes to copy.

Returns: A managed string that holds a copy of the unmanaged string if the value of the `ptr` parameter is not `null`; otherwise, this method returns `null`.

#### Remarks
`Marshal.PtrToStringUTF8` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method creates a copy of the unmanaged string's contents, you must free the original string as appropriate. This method provides the opposite functionality of the `Marshal.StringToCoTaskMemUTF8` methods.

## Marshal.PtrToStructure(IntPtr, Object) method

```csharp
public static void PtrToStructure (IntPtr ptr, object structure);
```

Marshals data from an unmanaged block of memory to a managed object.

Parameters:

- `ptr`: A pointer to an unmanaged block of memory.
- `structure`: The object to which the data is to be copied. This must be an instance of a formatted class.

Exceptions:

- `ArgumentException`: Structure layout is not sequential or explicit.

-or-

Structure is a boxed value type.

#### Remarks
`Marshal.PtrToStructure` is often necessary in COM interop and platform invoke when structure parameters are represented as an `IntPtr` value. You cannot use this overload method with value types.
If the `ptr` parameter equals `Zero`, `null` will be returned.

## Marshal.PtrToStructure(IntPtr, Type) method

```csharp
public static object? PtrToStructure (IntPtr ptr, Type structureType);
```

Marshals data from an unmanaged block of memory to a newly allocated managed object of the specified type.

Parameters:

- `ptr`: A pointer to an unmanaged block of memory.
- `structureType`: The type of object to be created. This object must represent a formatted class or a structure.

Returns: A managed object containing the data pointed to by the `ptr` parameter.

Exceptions:

- `ArgumentException`: The `structureType` parameter layout is not sequential or explicit.

-or-

The `structureType` parameter is a generic type definition.
- `ArgumentNullException`: `structureType` is `null`.
- `MissingMethodException`: The class specified by `structureType` does not have an accessible parameterless constructor.

`Marshal.PtrToStructure` is often necessary in COM interop and platform invoke when structure parameters are represented as an `IntPtr` value. You can pass a value type to this overload method. In this case, the returned object is a boxed instance.
If the `ptr` parameter equals `Zero`, `null` will be returned.

## Marshal.PtrToStructure<T>(IntPtr) method

```csharp
public static T? PtrToStructure<T> (IntPtr ptr);
```

Marshals data from an unmanaged block of memory to a newly allocated managed object of the type specified by a generic type parameter.

Parameters:

- `T`: The type of the object to which the data is to be copied. This must be a formatted class or a structure.
- `ptr`: A pointer to an unmanaged block of memory.

Returns: A managed object that contains the data that the `ptr` parameter points to.

Exceptions:

- `ArgumentException`: The layout of `T` is not sequential or explicit.
- `MissingMethodException`: The class specified by `T` does not have an accessible parameterless constructor.

#### Remarks
`PtrToStructure<T>` is often necessary in COM interop and platform invoke when structure parameters are represented as `IntPtr` values. You can pass a value type to this method overload.
If the `ptr` parameter equals `Zero` and `T` is a reference type, `null` is returned. If `ptr` equals `Zero` and `T` is a value type, a `NullReferenceException` is thrown.

## Marshal.PtrToStructure<T>(IntPtr, T) method

```csharp
public static void PtrToStructure<T> (IntPtr ptr, T structure);
```

Marshals data from an unmanaged block of memory to a managed object of the specified type.

Parameters:

- `T`: The type of `structure`. This must be a formatted class.
- `ptr`: A pointer to an unmanaged block of memory.
- `structure`: The object to which the data is to be copied.

Exceptions:

- `ArgumentException`: Structure layout is not sequential or explicit.

#### Remarks
`PtrToStructure<T>` is often necessary in COM interop and platform invoke when structure parameters are represented as `IntPtr` values. You cannot use this method overload with value types.
If the `ptr` parameter equals `Zero` and `T` is a reference type, `null` is returned. If `ptr` equals `Zero` and `T` is a value type, a `NullReferenceException` is thrown.

## Marshal.QueryInterface(IntPtr, Guid, IntPtr) method

```csharp
public static int QueryInterface (IntPtr pUnk, in Guid iid, out IntPtr ppv);
```

Requests a pointer to a specified interface from a COM object.

Parameters:

- `pUnk`: The interface to be queried.
- `iid`: The interface identifier (IID) of the requested interface.
- `ppv`: When this method returns, contains a reference to the returned interface.

Returns: An HRESULT that indicates the success or failure of the call.

#### Remarks
The `Marshal.QueryInterface` method exposes the IUnknown::QueryInterface method of a COM object, which attempts to obtain a specific interface pointer. Using `QueryInterface` on a COM object is the same as performing a cast operation in managed code. Calling an object with this method causes the reference count to increment on the interface pointer before the pointer is returned. Always use `Marshal.Release` to decrement the reference count once you have finished with the pointer. To obtain an `IntPtr` value that represents a IUnknown interface pointer, you can call `Marshal.GetComInterfaceForObject`, `Marshal.GetIUnknownForObject`, or `Marshal.GetIDispatchForObject`.
