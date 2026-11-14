---
title: "Marshal class (part 11 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 11 of 13)

## Marshal.StructureToPtr(Object, IntPtr, Boolean) method

```csharp
public static void StructureToPtr (object structure, IntPtr ptr, bool fDeleteOld);
```

Marshals data from a managed object to an unmanaged block of memory.

Parameters:

- `structure`: A managed object that holds the data to be marshaled. This object must be a structure or an instance of a formatted class.
- `ptr`: A pointer to an unmanaged block of memory, which must be allocated before this method is called.
- `fDeleteOld`: `true` to call the `Marshal.DestroyStructure` method on the `ptr` parameter before this method copies the data. The block must contain valid data. Note that passing `false` when the memory block already contains data can lead to a memory leak.

Exceptions:

- `ArgumentException`: `structure` is a reference type that is not a formatted class.

If `structure` is a value type, it can be boxed or unboxed. If it is boxed, it is unboxed before copying.

A formatted class is a reference type whose layout is specified by the `StructLayoutAttribute` attribute, as either `Explicit` or `Sequential`.

`Marshal.StructureToPtr` copies the contents of `structure` to the pre-allocated block of memory that the `ptr` parameter points to. If `structure` contains reference types that marshal to COM interface pointers (interfaces, classes without layout, and `Object`), the managed objects are kept alive with reference counts. All other reference types (for example, strings and arrays) are marshaled to copies. To release these managed or unmanaged objects, you must call the `Marshal.DestroyStructure` method before you free the memory block.

If you use the `Marshal.StructureToPtr` method to copy a different instance to the memory block at a later time, specify `true` for `fDeleteOld` to remove reference counts for reference types in the previous instance. Otherwise, the managed reference types and unmanaged copies are effectively leaked.

The overall pattern for using `Marshal.StructureToPtr` is as follows:

1. On the first call to the `Marshal.StructureToPtr` method after a memory block has been allocated, `fDeleteOld` must be `false`, because there are no contents to clear.

> **Important:**
>  Specify `true` for `fDeleteOld` only if the block contains valid data.

2. If you copy a different instance to the memory block, and the object contains reference types, `fDeleteOld` must be `true` to free reference types in the old contents.

3. If the object contains reference types, you must call the `Marshal.DestroyStructure` method before you free the memory block.

> **Note:**
>  To pin an existing structure instead of copying it, use the `GCHandle` type to create a pinned handle for the structure. For details on how to pin, see Copying and Pinning.

## Marshal.StructureToPtr<T>(T, IntPtr, Boolean) method

```csharp
public static void StructureToPtr<T> (T structure, IntPtr ptr, bool fDeleteOld);
```

Marshals data from a managed object of a specified type to an unmanaged block of memory.

Parameters:

- `T`: The type of the managed object.
- `structure`: A managed object that holds the data to be marshaled. The object must be a structure or an instance of a formatted class.
- `ptr`: A pointer to an unmanaged block of memory, which must be allocated before this method is called.
- `fDeleteOld`: `true` to call the `Marshal.DestroyStructure<T>` method on the `ptr` parameter before this method copies the data. The block must contain valid data. Note that passing `false` when the memory block already contains data can lead to a memory leak.

Exceptions:

- `ArgumentException`: `structure` is a reference type that is not a formatted class.

#### Remarks
A formatted class is a reference type whose layout is specified by the `StructLayoutAttribute` attribute, as either `Explicit` or `Sequential`.

`StructureToPtr<T>` copies the contents of `structure` to the pre-allocated block of memory that the `ptr` parameter points to. If `structure` contains reference types that marshal to COM interface pointers (interfaces, classes without layout, and `Object`), the managed objects are kept alive with reference counts. All other reference types (for example, strings and arrays) are marshaled to copies. To release these managed or unmanaged objects, you must call the `DestroyStructure<T>` method before you free the memory block.

If you use the `StructureToPtr<T>` method to copy a different instance to the memory block at a later time, specify `true` for `fDeleteOld` to remove reference counts for reference types in the previous instance. Otherwise, the managed reference types and unmanaged copies are effectively leaked.

The overall pattern for using `StructureToPtr<T>` is as follows:

1. On the first call to the `Marshal.StructureToPtr` method after a memory block has been allocated, `fDeleteOld` must be `false`, because there are no contents to clear.

> **Important:**
>  Specify `true` for `fDeleteOld` only if the block contains valid data.

2. If you copy a different instance to the memory block, and the object contains reference types, `fDeleteOld` must be `true` to free reference types in the old contents.

3. If the object contains reference types, you must call the `Marshal.DestroyStructure` method before you free the memory block.

> **Note:**
>  To pin an existing structure instead of copying it, use the `GCHandle` type to create a pinned handle for the structure. For details on how to pin, see Copying and Pinning.

## Marshal.ThrowExceptionForHR(Int32) method

```csharp
public static void ThrowExceptionForHR (int errorCode);
```

Throws an exception with a specific failure HRESULT value.

Parameters:

- `errorCode`: The HRESULT corresponding to the desired exception.

#### Remarks
This method creates an exception object for the specified failure HRESULT. If the HRESULT is 0 or positive (a success code), the method returns without creating or throwing an exception.

Note that the `ThrowExceptionForHR` method returns an exception based on the IErrorInfo interface of the current thread if one is set. When this happens, the `errorCode` parameter is ignored.

Some failure HRESULTs map to defined exceptions, whereas others do not. If the HRESULT maps to a defined exception, `Marshal.ThrowExceptionForHR` creates an instance of the exception and throws it. Otherwise, it creates an instance of `COMException`, initializes the error code field with the HRESULT, and throws that exception. When `Marshal.ThrowExceptionForHR` is invoked, it attempts to retrieve extra information regarding the error by using the unmanaged GetErrorInfo function.

For the mapping from each HRESULT to its comparable exception class in .NET, see How to: Map HRESULTs and Exceptions.

Occasionally, `Marshal.ThrowExceptionForHR` might return an exception from a previous COM call. In this case, you can use the following workaround and pass `IntPtr(-1)` as the second parameter (`errorInfo`):

```csharp
public static void ThrowExceptionForHR(interrorCode,IntPtrerrorInfo)
```

## Marshal.ThrowExceptionForHR(Int32, IntPtr) method

```csharp
public static void ThrowExceptionForHR (int errorCode, IntPtr errorInfo);
```

Throws an exception with a specific failure HRESULT, based on the specified IErrorInfo interface.

Parameters:

- `errorCode`: The HRESULT corresponding to the desired exception.
- `errorInfo`: A pointer to the IErrorInfo interface that provides more information about the error. You can specify `IntPtr(0)` to use the current IErrorInfo interface, or `IntPtr(-1)` to ignore the current IErrorInfo interface and construct the exception just from the error code.

#### Remarks
This method creates an exception object for the specified failure HRESULT. If the HRESULT is 0 or positive (a success code), the method returns without creating or throwing an exception.

The `Marshal.ThrowExceptionForHR` method releases the `errorInfo` parameter, decreasing the COM reference count of the IErrorInfo interface.

Note that the `Marshal.ThrowExceptionForHR` method returns an exception based on the IErrorInfo interface of the current thread if one is set. When this happens, the `errorCode` parameter is ignored.

Some failure HRESULTs map to defined exceptions, whereas others do not. If the HRESULT maps to a defined exception, `Marshal.ThrowExceptionForHR` creates an instance of the exception and throws it. Otherwise, it creates an instance of `COMException`, initializes the error code field with the HRESULT, and throws that exception. The `errorInfo` parameter is used to retrieve extra information regarding the error.

For the mapping from each HRESULT to its comparable exception class in .NET, see How to: Map HRESULTs and Exceptions.

## Marshal.ThrowExceptionForHR(Int32, Guid, IntPtr) method

```csharp
public static void ThrowExceptionForHR (int errorCode, in Guid iid, IntPtr pUnk);
```

To be added.

Parameters:

- `errorCode`: To be added.
- `iid`: To be added.
- `pUnk`: To be added.

To be added.

## Marshal.UnsafeAddrOfPinnedArrayElement(Array, Int32) method

```csharp
public static IntPtr UnsafeAddrOfPinnedArrayElement (Array arr, int index);
```

Gets the address of the element at the specified index inside the specified array.

Parameters:

- `arr`: The array that contains the desired element.
- `index`: The index in the `arr` parameter of the desired element.

Returns: The address of `index` inside `arr`.

#### Remarks
The array must be pinned using a `GCHandle` before it is passed to this method. For maximum performance, this method does not validate the array passed to it; this can result in unexpected behavior.

## Marshal.UnsafeAddrOfPinnedArrayElement<T>(T[], Int32) method

```csharp
public static IntPtr UnsafeAddrOfPinnedArrayElement<T> (T[] arr, int index);
```

Gets the address of the element at the specified index in an array of a specified type.

Parameters:

- `T`: The type of the array.
- `arr`: The array that contains the desired element.
- `index`: The index of the desired element in the `arr` array.

Returns: The address of `index` in `arr`.

#### Remarks
The array must be pinned by using a `GCHandle` before it is passed to this method. For maximum performance, this method does not validate the array passed to it; this can result in unexpected behavior.

## Marshal.WriteByte(IntPtr, Byte) method

```csharp
public static void WriteByte (IntPtr ptr, byte val);
```

Writes a single byte value to unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteByte` enables direct interaction with an unmanaged C-style byte array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

#### Examples
The following example creates a block of unmanaged memory, writes a byte to the unmanaged memory, reads the byte back from unmanaged memory, and then disposes the unmanaged memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/example.cs._

## Marshal.WriteByte(IntPtr, Int32, Byte) method

```csharp
public static void WriteByte (IntPtr ptr, int ofs, byte val);
```

Writes a single byte value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory to write to.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.

#### Remarks
`Marshal.WriteByte` enables direct interaction with an unmanaged C-style byte array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadByte` and `Marshal.WriteByte` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteByte(Object, Int32, Byte) method

```csharp
public static void WriteByte (object ptr, int ofs, byte val);
```

Writes a single byte value to unmanaged memory at a specified offset.

Parameters:

- `ptr`: The base address in unmanaged memory of the target object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before writing.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.WriteInt16(IntPtr, Char) method

```csharp
public static void WriteInt16 (IntPtr ptr, char val);
```

Writes a character as a 16-bit integer value to unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteInt16` enables direct interaction with an unmanaged 16-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._

## Marshal.WriteInt16(IntPtr, Int16) method

```csharp
public static void WriteInt16 (IntPtr ptr, short val);
```

Writes a 16-bit integer value to unmanaged memory.

Parameters:

- `ptr`: The address in unmanaged memory to write to.
- `val`: The value to write.

Exceptions:

- `AccessViolationException`: `ptr` is not a recognized format.

-or-

`ptr` is `null`.

-or-

`ptr` is invalid.

#### Remarks
`Marshal.WriteInt16` enables direct interaction with an unmanaged 16-bit signed array, eliminating the expense of copying an entire unmanaged array (using `Marshal.Copy`) to a separate managed array before setting its element values.

Writing to unaligned memory locations is supported.

#### Examples
The following example demonstrates how to read and write to an unmanaged array using the `Marshal.ReadInt16` and `Marshal.WriteInt16` methods.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/ReadByte/sample.cs._
