---
title: "Marshal class (part 10 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 10 of 13)

## Marshal.SetComObjectData(Object, Object, Object) method

```csharp
public static bool SetComObjectData (object obj, object key, object? data);
```

Sets data referenced by the specified key in the specified COM object.

Parameters:

- `obj`: The COM object in which to store the data.
- `key`: The key in the internal hash table of the COM object in which to store the data.
- `data`: The data to set.

Returns: `true` if the data was set successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

-or-

`key` is `null`.
- `ArgumentException`: `obj` is not a COM object.

-or-

`obj` is a Windows Runtime object.

#### Remarks
All COM objects wrapped in a Runtime Callable Wrapper (RCW) have an associated hash table, to which `Marshal.SetComObjectData` adds data. `Marshal.GetComObjectData` retrieves data from the hash table. You should never have to call either method from your code.

## Marshal.SetLastPInvokeError(Int32) method

```csharp
public static void SetLastPInvokeError (int error);
```

Sets the last platform invoke error on the current thread.

Parameters:

- `error`: The error to set.

#### Remarks

The last platform invoke error is stored per-thread and can be retrieved using `Marshal.GetLastPInvokeError`.

## Marshal.SetLastSystemError(Int32) method

```csharp
public static void SetLastSystemError (int error);
```

Sets the last system error on the current thread.

Parameters:

- `error`: The error to set.

#### Remarks

The system error is based on the current operating system—that is, `errno` on Unix and SetLastError on Windows.

## Marshal.SizeOf(Object) method

```csharp
public static int SizeOf (object structure);
```

Returns the unmanaged size of an object in bytes.

Parameters:

- `structure`: The object whose size is to be returned.

Returns: The size of the specified object in unmanaged code.

Exceptions:

- `ArgumentNullException`: The `structure` parameter is `null`.

#### Remarks
This method accepts an instance of a structure, which can be a reference type or a boxed value type. The layout must be sequential or explicit.

The size returned is the size of the unmanaged object. The unmanaged and managed sizes of an object can differ. For character types, the size is affected by the `CharSet` value applied to that class.

You can use the `Marshal.SizeOf` method to determine how much unmanaged memory to allocate using the `Marshal.AllocHGlobal` and `Marshal.AllocCoTaskMem` methods.

## Marshal.SizeOf(Type) method

```csharp
public static int SizeOf (Type t);
```

Returns the size of an unmanaged type in bytes.

Parameters:

- `t`: The type whose size is to be returned.

Returns: The size of the specified type in unmanaged code.

Exceptions:

- `ArgumentException`: The `t` parameter is a generic type definition.
- `ArgumentNullException`: The `t` parameter is `null`.

You can use this method when you do not have a structure. The layout must be sequential or explicit.

The size returned is the size of the unmanaged type. The unmanaged and managed sizes of an object can differ. For character types, the size is affected by the `CharSet` value applied to that class.

## Marshal.SizeOf<T>() method

```csharp
public static int SizeOf<T> ();
```

Returns the size of an unmanaged type in bytes.

Parameters:

- `T`: The type whose size is to be returned.

Returns: The size, in bytes, of the type that is specified by the `T` generic type parameter.

#### Remarks
You can use this method when you do not have a structure. The layout must be sequential or explicit.

The size returned is the size of the unmanaged type. The unmanaged and managed sizes of an object can differ. For character types, the size is affected by the `CharSet` value applied to that class.

## Marshal.SizeOf<T>(T) method

```csharp
public static int SizeOf<T> (T structure);
```

Returns the unmanaged size of an object of a specified type in bytes.

Parameters:

- `T`: The type of the `structure` parameter.
- `structure`: The object whose size is to be returned.

Returns: The size, in bytes, of the specified object in unmanaged code.

Exceptions:

- `ArgumentNullException`: The `structure` parameter is `null`.

#### Remarks
This method accepts an instance of a structure, which can be a reference type or a boxed value type. The layout must be sequential or explicit.

The size returned is the size of the unmanaged object. The unmanaged and managed sizes of an object can differ. For character types, the size is affected by the `CharSet` value applied to that class.

You can use the `SizeOf<T>` method to determine how much unmanaged memory to allocate by using the `Marshal.AllocHGlobal` and `Marshal.AllocCoTaskMem` methods.

## Marshal.StringToBSTR(String) method

```csharp
public static IntPtr StringToBSTR (string? s);
```

Allocates a BSTR and copies the contents of a managed `String` into it.

Parameters:

- `s`: The managed string to be copied.

Returns: An unmanaged pointer to the `BSTR`, or 0 if `s` is null.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory available.
- `ArgumentOutOfRangeException`: The length for `s` is out of range.

#### Remarks
`Marshal.StringToBSTR` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the `BSTR` when finished by calling `Marshal.FreeBSTR`. This method provides the opposite functionality of `Marshal.PtrToStringBSTR`.

## Marshal.StringToCoTaskMemAnsi(String) method

```csharp
public static IntPtr StringToCoTaskMemAnsi (string? s);
```

Copies the contents of a managed `String` to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: A managed string to be copied.

Returns: An integer representing a pointer to the block of memory allocated for the string, or 0 if `s` is `null`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory available.
- `ArgumentOutOfRangeException`: The `s` parameter exceeds the maximum length allowed by the operating system.

#### Remarks
`Marshal.StringToCoTaskMemAnsi` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeCoTaskMem`. This method provides the opposite functionality of `Marshal.PtrToStringAnsi`. The characters of the string are copied as ANSI characters.

## Marshal.StringToCoTaskMemAuto(String) method

```csharp
public static IntPtr StringToCoTaskMemAuto (string? s);
```

Copies the contents of a managed `String` to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: A managed string to be copied.

Returns: The allocated memory block, or 0 if `s` is `null`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory available.
- `ArgumentOutOfRangeException`: The length for `s` is out of range.

#### Remarks
`Marshal.StringToCoTaskMemAuto` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeCoTaskMem`. This method provides the opposite functionality of `Marshal.PtrToStringAuto`.

The characters of the string are copied as Unicode characters.

## Marshal.StringToCoTaskMemUni(String) method

```csharp
public static IntPtr StringToCoTaskMemUni (string? s);
```

Copies the contents of a managed `String` to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: A managed string to be copied.

Returns: An integer representing a pointer to the block of memory allocated for the string, or 0 if s is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: The `s` parameter exceeds the maximum length allowed by the operating system.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
`Marshal.StringToCoTaskMemUni` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeCoTaskMem`. This method provides the opposite functionality of `Marshal.PtrToStringUni`. The characters of the string are copied as Unicode characters.

This API reflects the Windows definition of Unicode, which is a UTF-16 2-byte encoding. On many non-Windows platforms, the `wchar_t` data-type is 4-bytes, not 2-bytes. Consult your compiler to confirm if `wchar_t` can be used or `char16_t` should be used instead.

## Marshal.StringToCoTaskMemUTF8(String) method

```csharp
public static IntPtr StringToCoTaskMemUTF8 (string? s);
```

Copies the contents of a managed `String` to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: A managed string to be copied.

Returns: An integer representing a pointer to the block of memory allocated for the string, or 0 if `s` is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: The `s` parameter exceeds the maximum length allowed by the operating system.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
`Marshal.StringToCoTaskMemUTF8` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string including a null terminator, always free the memory by calling `Marshal.FreeCoTaskMem`. This method provides the opposite functionality of `Marshal.PtrToStringUTF8`. The characters of the string are copied as UTF-8 characters.

## Marshal.StringToHGlobalAnsi(String) method

```csharp
public static IntPtr StringToHGlobalAnsi (string? s);
```

Copies the contents of a managed `String` into unmanaged memory, converting into ANSI format as it copies.

Parameters:

- `s`: A managed string to be copied.

Returns: The address, in unmanaged memory, to where `s` was copied, or 0 if `s` is `null`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory available.
- `ArgumentOutOfRangeException`: The `s` parameter exceeds the maximum length allowed by the operating system.

#### Remarks
`Marshal.StringToHGlobalAnsi` is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeHGlobal`. `Marshal.StringToHGlobalAnsi` provides the opposite functionality of `Marshal.PtrToStringAnsi`.

This method copies embedded null characters, and includes a terminating null character.

#### Examples
The following example demonstrates how to convert the contents of a managed `String` class to unmanaged memory and then dispose of the unmanaged memory when done.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/FreeHGlobal/stringtohglobalansi.cs._
## Marshal.StringToHGlobalAuto(String) method

```csharp
public static IntPtr StringToHGlobalAuto (string? s);
```

Copies the contents of a managed `String` into unmanaged memory, converting into ANSI format if required.

Parameters:

- `s`: A managed string to be copied.

Returns: The address, in unmanaged memory, to where the string was copied, or 0 if `s` is `null`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
`Marshal.StringToHGlobalAuto` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeHGlobal`. This method provides the opposite functionality of `Marshal.PtrToStringAuto`.

This method copies embedded null characters, and includes a terminating null character.

#### Examples
The following example demonstrates how to convert the contents of a managed `String` class to unmanaged memory and then dispose of the unmanaged memory when done.

## Marshal.StringToHGlobalUni(String) method

```csharp
public static IntPtr StringToHGlobalUni (string? s);
```

Copies the contents of a managed `String` into unmanaged memory.

Parameters:

- `s`: A managed string to be copied.

Returns: The address, in unmanaged memory, to where the `s` was copied, or 0 if `s` is `null`.

Exceptions:

- `OutOfMemoryException`: The method could not allocate enough native heap memory.
- `ArgumentOutOfRangeException`: The `s` parameter exceeds the maximum length allowed by the operating system.

#### Remarks
`Marshal.StringToHGlobalUni` is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.FreeHGlobal`. This method provides the opposite functionality of `Marshal.PtrToStringUni`.

This method copies embedded null characters, and includes a terminating null character.

This API reflects the Windows definition of Unicode, which is a UTF-16 2-byte encoding. On many non-Windows platforms, the `wchar_t` data-type is 4-bytes, not 2-bytes. Consult your compiler to confirm if `wchar_t` can be used or `char16_t` should be used instead.
