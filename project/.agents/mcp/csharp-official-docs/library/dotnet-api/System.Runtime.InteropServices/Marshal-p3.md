---
title: "Marshal class (part 3 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 3 of 13)

## Marshal.CreateWrapperOfType(Object, Type) method

```csharp
public static object? CreateWrapperOfType (object? o, Type t);
```

Wraps the specified COM object in an object of the specified type.

Parameters:

- `o`: The object to be wrapped.
- `t`: The type of wrapper to create.

Returns: The newly wrapped object that is an instance of the desired type.

Exceptions:

- `ArgumentException`: `t` must derive from `__ComObject`.

-or-

`t` is a Windows Runtime type.
- `ArgumentNullException`: The `t` parameter is `null`.
- `InvalidCastException`: `o` cannot be converted to the destination type because it does not support all required interfaces.

#### Remarks
`Marshal.CreateWrapperOfType` converts one COM class type, typically the base `__ComObject` type, to another COM class type. The input COM object, represented by parameter `o`, is a Runtime Callable Wrapper (RCW).

Both the `t` and `o` parameters must be classes whose signatures are attributed with `ComImportAttribute`. The Tlbimp.exe (Type Library Importer) tool applies this attribute for you when it imports a type library. If you create the RCW manually in source code, you should apply this attribute to the managed signature that represents the original coclass to signify its COM origins.

Tlbimp.exe imports a COM coclass as a managed class and an interface. The coclass interface has the same name as the original coclass, and the managed class has the original coclass name appended with "Class". For example, a coclass called `MyCoclass` becomes a coclass interface called `MyCoclass` and a managed class called `MyCoclassClass`. Since `t` must be a class, not an interface, be sure to specify the managed class (`MyCoclassClass`) and not the coclass interface.

> **Note:**
>  You lose the identity of the input COM object because a new RCW instance wraps the IUnknown pointer exposed by the original RCW.

## Marshal.CreateWrapperOfType<T,TWrapper>(T) method

```csharp
public static TWrapper CreateWrapperOfType<T,TWrapper> (T? o);
```

Wraps the specified COM object in an object of the specified type.

Parameters:

- `T`: The type of object to wrap.
- `TWrapper`: The type of object to return.
- `o`: The object to be wrapped.

Returns: The newly wrapped object.

Exceptions:

- `ArgumentException`: `T` must derive from `__ComObject`.

-or-

`T` is a Windows Runtime type.
- `InvalidCastException`: `o` cannot be converted to the `TWrapper` because it does not support all required interfaces.

#### Remarks
`CreateWrapperOfType<T1,T2>` converts a COM object of type `T` to the `TWrapper` COM class type. The input COM object, represented by parameter `o`, is a Runtime Callable Wrapper (RCW).

Both the `T` generic type parameter and the `o` parameter must be classes whose signatures are attributed with the `ComImportAttribute` attribute. The Tlbimp.exe (Type Library Importer) tool applies this attribute for you when it imports a type library. If you create the RCW manually in source code, you should apply this attribute to the managed signature that represents the original coclass to signify its COM origins.

Tlbimp.exe imports a COM coclass as a managed class and an interface. The coclass interface has the same name as the original coclass, and the managed class has the original coclass name appended with "Class". For example, a coclass called `MyCoclass` becomes a coclass interface called `MyCoclass` and a managed class called `MyCoclassClass`. Because`T` must be a class, not an interface, be sure to specify the managed class (`MyCoclassClass`) and not the `coclass` interface.

> **Note:**
>  You lose the identity of the input COM object, because a new RCW instance wraps the IUnknown pointer exposed by the original RCW.

## Marshal.DestroyStructure(IntPtr, Type) method

```csharp
public static void DestroyStructure (IntPtr ptr, Type structuretype);
```

Frees all substructures that the specified unmanaged memory block points to.

Parameters:

- `ptr`: A pointer to an unmanaged block of memory.
- `structuretype`: Type of a formatted class. This provides the layout information necessary to delete the buffer in the `ptr` parameter.

Exceptions:

- `ArgumentException`: `structuretype` has an automatic layout. Use sequential or explicit instead.

#### Remarks
You can use this method to free reference-type fields, such as strings, of an unmanaged structure. Unlike its fields, a structure can be a value type or a reference type. Value-type structures that contain value-type fields (all blittable) have no references whose memory must be freed. The `Marshal.StructureToPtr` method uses this method to prevent memory leaks when reusing memory occupied by a structure.

`Marshal.DestroyStructure` calls the COM SysFreeString function, which, in turn, frees an allocated string.

In addition to `Marshal.DestroyStructure`, the `Marshal` class provides two other memory-deallocation methods: `Marshal.FreeCoTaskMem` and `Marshal.FreeHGlobal`.

## Marshal.DestroyStructure<T>(IntPtr) method

```csharp
public static void DestroyStructure<T> (IntPtr ptr);
```

Frees all substructures of a specified type that the specified unmanaged memory block points to.

Parameters:

- `T`: The type of the formatted structure. This provides the layout information necessary to delete the buffer in the `ptr` parameter.
- `ptr`: A pointer to an unmanaged block of memory.

Exceptions:

- `ArgumentException`: `T` has an automatic layout. Use sequential or explicit instead.

#### Remarks
You can use this method to free reference type fields, such as strings, of an unmanaged structure. Unlike its fields, a structure can be a value type or a reference type. Value type structures that contain value type fields (all blittable) have no references whose memory must be freed. The `Marshal.StructureToPtr` method uses this method to prevent memory leaks when reusing memory occupied by a structure.

`Marshal.DestroyStructure` calls the COM SysFreeString function, which, in turn, frees an allocated string.

## Marshal.FinalReleaseComObject(Object) method

```csharp
public static int FinalReleaseComObject (object o);
```

Releases all references to a Runtime Callable Wrapper (RCW) by setting its reference count to 0.

Parameters:

- `o`: The RCW to be released.

Returns: The new value of the reference count of the RCW associated with the `o` parameter, which is 0 (zero) if the release is successful.

Exceptions:

- `ArgumentException`: `o` is not a valid COM object.
- `ArgumentNullException`: `o` is `null`.

#### Remarks
The `Marshal.FinalReleaseComObject` method releases the managed reference to a COM object. Calling this method is equivalent to calling the `Marshal.ReleaseComObject` method in a loop until it returns 0 (zero).

When the reference count on the COM object becomes 0, the COM object is usually freed, although this depends on the COM object's implementation and is beyond the control of the runtime. However, the RCW can still exist, waiting to be garbage-collected.

The COM object cannot be used after it has been separated from its underlying RCW. If you try to call a method on the RCW after its reference count becomes 0, a `InvalidComObjectException` will be thrown.

## Marshal.FreeBSTR(IntPtr) method

```csharp
public static void FreeBSTR (IntPtr ptr);
```

Frees a `BSTR` using the COM SysFreeString function.

Parameters:

- `ptr`: The address of the BSTR to be freed.

#### Remarks
Like `Marshal.FreeCoTaskMem` and `Marshal.FreeHGlobal`, you can use this method to deallocate memory. `Marshal.FreeBSTR` calls the COM SysFreeString function, which frees memory allocated by any of the following unmanaged methods: `SysAllocString`, `SysAllocStringByteLen`, `SysAllocStringLen`, `SysReAllocString`, `SysReAllocStringLen`. You can call unmanaged methods such as these with platform invoke. For details, see Consuming Unmanaged DLL Functions.

## Marshal.FreeCoTaskMem(IntPtr) method

```csharp
public static void FreeCoTaskMem (IntPtr ptr);
```

Frees a block of memory allocated by the unmanaged COM task memory allocator.

Parameters:

- `ptr`: The address of the memory to be freed.

#### Remarks
You can use `Marshal.FreeCoTaskMem` to free any memory allocated by `Marshal.AllocCoTaskMem`, `Marshal.ReAllocCoTaskMem`, or any equivalent unmanaged method. If the `ptr` parameter is `IntPtr.Zero`, the method does nothing.

`Marshal.FreeCoTaskMem` exposes the COM CoTaskMemFree function, which frees all bytes so that you can no longer use the memory that the `ptr` parameter points to.

In addition to `Marshal.FreeCoTaskMem`, the `Marshal` class provides two other memory-deallocation methods: `Marshal.DestroyStructure` and `Marshal.FreeHGlobal`.

## Marshal.FreeHGlobal(IntPtr) method

```csharp
public static void FreeHGlobal (IntPtr hglobal);
```

Frees memory previously allocated from the unmanaged memory of the process.

Parameters:

- `hglobal`: The handle returned by the original matching call to `Marshal.AllocHGlobal`.

#### Remarks
> **Important:**
> This native memory allocator is a legacy API that should be used exclusively when called for by specific Win32 APIs on the Windows platform. Use the `NativeMemory` class on all platforms to allocate native memory.

You can use `Marshal.FreeHGlobal` to free any memory from the global heap allocated by `Marshal.AllocHGlobal`, `Marshal.ReAllocHGlobal`, or any equivalent unmanaged API method. If the `hglobal` parameter is `Zero` the method does nothing.

`Marshal.FreeHGlobal` exposes the LocalFree function from Kernel32.DLL, which frees all bytes so that you can no longer use the memory pointed to by `hglobal`.

In addition to `Marshal.FreeHGlobal`, the `Marshal` class provides two other memory-deallocation API methods: `Marshal.DestroyStructure` and `Marshal.FreeCoTaskMem`.

#### Examples
The following example demonstrates calling the `Marshal.FreeHGlobal` method. This code example is part of a larger example provided for the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Overview/Marshal.cs._

The following example demonstrates how to convert the contents of a managed `String` class to unmanaged memory and then dispose of the unmanaged memory when done.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/FreeHGlobal/stringtohglobalansi.cs._
## Marshal.GenerateGuidForType(Type) method

```csharp
public static Guid GenerateGuidForType (Type type);
```

Returns the globally unique identifier (GUID) for the specified type, or generates a GUID using the algorithm used by the Type Library Exporter (Tlbexp.exe).

Parameters:

- `type`: The type to generate a GUID for.

Returns: An identifier for the specified type.

#### Remarks
If the type has a GUID in the metadata, it is returned. Otherwise, a GUID is automatically generated. You can use this method to programmatically determine the COM GUID for any managed type, including COM-invisible types. Class interfaces are the only exception because they do not correspond to a managed type. `Marshal.GenerateGuidForType` provides the same functionality as the `GUID` property.

## Marshal.GenerateProgIdForType(Type) method

```csharp
public static string? GenerateProgIdForType (Type type);
```

Returns a programmatic identifier (ProgID) for the specified type.

Parameters:

- `type`: The type to get a ProgID for.

Returns: The ProgID of the specified type.

Exceptions:

- `ArgumentException`: The `type` parameter is not a class that can be create by COM. The class must be public, have a public parameterless constructor, and be COM visible.
- `ArgumentNullException`: The `type` parameter is `null`.

#### Remarks
If the type has a ProgID in the metadata, that ProgID is returned. Otherwise, a ProgID is generated based on the fully qualified name of the type.

## Marshal.GetComInterfaceForObject(Object, Type) method

```csharp
public static IntPtr GetComInterfaceForObject (object o, Type T);
```

Returns a pointer to an IUnknown interface that represents the specified interface on the specified object. Custom query interface access is enabled by default.

Parameters:

- `o`: The object that provides the interface.
- `T`: The type of interface that is requested.

Returns: The interface pointer that represents the specified interface for the object.

Exceptions:

- `ArgumentException`: The `T` parameter is not an interface.

-or-

The type is not visible to COM.

-or-

The `T` parameter is a generic type definition.
- `InvalidCastException`: The `o` parameter does not support the requested interface.
- `ArgumentNullException`: The `o` parameter is `null`.

-or-

The `T` parameter is `null`.

#### Remarks
This method returns an interface pointer that represents the requested interface on the specified object. It is particularly useful if you have an unmanaged method that expects to be passed an interface pointer. Calling an object with this method causes the reference count to increment on the interface pointer before the pointer is returned. Always use `Marshal.Release` to decrement the reference count once you have finished with the pointer. You must adhere to the rules defined by COM when using raw COM interface pointers.

`GetComInterfaceForObject` is useful when calling a method that exposes a COM object parameter as an `IntPtr` type, or with custom marshaling. Although less common, you can use this method on a managed object to obtain a pointer to the object's COM callable wrapper. For example, you can use `GetComInterfaceForObject` on a managed object that is exported to COM to obtain an interface pointer for `UCOMIConnectionPointContainer`. You cannot obtain a pointer to a class interface since a class interface lacks the corresponding type to pass to the second parameter (`t`). Instead, use `Marshal.GetIDispatchForObject` to invoke the members on the default interface of the COM callable wrapper, which is usually an auto-dispatch class interface.

The `GetComInterfaceForObject` method overload allows query interface customization by default. To specify whether to apply query interface customization, use the `GetComInterfaceForObject` method overload.

For additional information, see the COM Callable Wrapper and Runtime Callable Wrapper articles.
