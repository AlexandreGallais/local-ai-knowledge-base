---
title: "Marshal class (part 9 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 9 of 13)

## Marshal.ReadIntPtr(Object, Int32) method

```csharp
public static IntPtr ReadIntPtr (object ptr, int ofs);
```

Reads a processor native-sized integer from unmanaged memory.

Parameters:

- `ptr`: The base address in unmanaged memory of the source object.
- `ofs`: An additional byte offset, which is added to the `ptr` parameter before reading.

Returns: The integer read from unmanaged memory at the given offset.

Exceptions:

- `AccessViolationException`: Base address (`ptr`) plus offset byte (`ofs`) produces a null or invalid address.
- `ArgumentException`: `ptr` is an `ArrayWithOffset` object. This method does not accept `ArrayWithOffset` parameters.

To be added.

## Marshal.ReAllocCoTaskMem(IntPtr, Int32) method

```csharp
public static IntPtr ReAllocCoTaskMem (IntPtr pv, int cb);
```

Resizes a block of memory previously allocated with `Marshal.AllocCoTaskMem`.

Parameters:

- `pv`: A pointer to memory allocated with `Marshal.AllocCoTaskMem`.
- `cb`: The new size of the allocated block.

Returns: An integer representing the address of the reallocated block of memory. This memory must be released with `Marshal.FreeCoTaskMem`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to satisfy the request.

#### Remarks
`Marshal.ReAllocCoTaskMem` is one of two memory reallocation methods in the `Marshal` class. (`Marshal.ReAllocHGlobal` is the other.) The beginning of the reallocated memory content is the same as the original content; however, the entire memory block can be in a different location. This method exposes the COM CoTaskMemRealloc function, which is referred to as the COM task memory allocator.

## Marshal.ReAllocHGlobal(IntPtr, IntPtr) method

```csharp
public static IntPtr ReAllocHGlobal (IntPtr pv, IntPtr cb);
```

Resizes a block of memory previously allocated with `Marshal.AllocHGlobal`.

Parameters:

- `pv`: A pointer to memory allocated with `Marshal.AllocHGlobal`.
- `cb`: The new size of the allocated block. This is not a pointer; it is the byte count you are requesting, cast to type `IntPtr`. If you pass a pointer, it is treated as a size.

Returns: A pointer to the reallocated memory. This memory must be released using `Marshal.FreeHGlobal`.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to satisfy the request.

#### Remarks
> **Important:**
> This native memory allocator is a legacy API that should be used exclusively when called for by specific Win32 APIs on the Windows platform. Use the `NativeMemory` class instead to allocate native memory.

`Marshal.ReAllocHGlobal` is one of two memory reallocation API methods in the `Marshal` class. (`Marshal.ReAllocCoTaskMem` is the other.)

This method exposes the Win32 GlobalReAlloc function from Kernel32.dll. The returned pointer can differ from the original. If it is different, the contents of the original memory block have been copied to the new block, and the original memory block has been freed.

## Marshal.Release(IntPtr) method

```csharp
public static int Release (IntPtr pUnk);
```

Decrements the reference count on the specified interface.

Parameters:

- `pUnk`: The interface to release.

Returns: The new value of the reference count on the interface specified by the `pUnk` parameter.

#### Remarks
The common language runtime manages the reference count of a COM object for you, making it unnecessary to use this method directly. Use this value only for testing purposes. In rare cases, such as testing a custom marshaler, you might find it necessary to manipulate an object's lifetime manually. Only programs that call `Marshal.AddRef` should call `Marshal.Release`. Calling `Marshal.Release` after the reference count has reached zero causes undefined behavior.

You can call `Marshal.GetComInterfaceForObject`, `Marshal.GetIUnknownForObject`, or `Marshal.GetIDispatchForObject` to obtain an `IntPtr` value that represents a IUnknown interface pointer to release. You can also use these methods and the `Marshal.Release` method on managed objects to release the COM interfaces represented by the managed object's COM Callable Wrapper.

#### Examples
The following example demonstrates how to retrieve an `IUnknown` interface for a managed object using the `Marshal.GetIUnknownForObject` method. The example then releases the interface pointer by calling the `Marshal.Release` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/GetIUnknownForObject/example.cs._

## Marshal.ReleaseComObject(Object) method

```csharp
public static int ReleaseComObject (object o);
```

Decrements the reference count of the Runtime Callable Wrapper (RCW) associated with the specified COM object.

Parameters:

- `o`: The COM object to release.

Returns: The new value of the reference count of the RCW associated with `o`. This value is typically zero since the RCW keeps just one reference to the wrapped COM object regardless of the number of managed clients calling it.

Exceptions:

- `ArgumentException`: `o` is not a valid COM object.
- `NullReferenceException`: `o` is `null`.

#### Remarks
This method is used to explicitly control the lifetime of a COM object used from managed code. You should use this method to free the underlying COM object that holds references to resources in a timely manner or when objects must be freed in a specific order.

Every time a COM interface pointer enters the common language runtime (CLR), it is wrapped in an RCW.

The RCW has a reference count that is incremented every time a COM interface pointer is mapped to it. The `Marshal.ReleaseComObject` method decrements the reference count of an RCW. When the reference count reaches zero, the runtime releases all its references on the unmanaged COM object, and throws a `NullReferenceException` if you attempt to use the object further. If the same COM interface is passed more than one time from unmanaged to managed code, the reference count on the wrapper is incremented every time, and calling `Marshal.ReleaseComObject` returns the number of remaining references.

This method enables you to force an RCW reference count release so that it occurs precisely when you want it to. However, improper use of `Marshal.ReleaseComObject` might cause your application to fail, or might cause an access violation.

Consider a scenario in which managed code is holding onto an RCW that represents a COM component. If you call the `Marshal.ReleaseComObject` method on the RCW, the managed code will be unable to access the RCW and will raise an `InvalidComObjectException` exception.

A more serious error can occur if a call to the RCW is executing when the RCW is released. In this case, there is a good chance that the thread making the call will cause an access violation. However, process memory can become corrupted, and the process might continue to run until it fails for reasons that are very difficult to debug.

This risk is compounded when the COM component that is being used is a singleton, for the following reason: The CLR activates COM components by calling the COM CoCreateInstance function, which returns the same interface pointer every time it is called for singleton COM components. Thus, separate and independent pieces of managed code can be using the same RCW for a singleton COM component, and if either one calls the `Marshal.ReleaseComObject` method on the COM component, the other will be broken.

Therefore, use the `Marshal.ReleaseComObject` only if it is absolutely required. If you want to call this method to ensure that a COM component is released at a determined time, consider using the `Marshal.FinalReleaseComObject` method instead. `Marshal.FinalReleaseComObject` will release the underlying COM component regardless of how many times it has re-entered the CLR. The internal reference count of the RCW is incremented by one every time the COM component re-enters the CLR. Therefore, you could call the `Marshal.ReleaseComObject` method in a loop until the value returned is zero. This achieves the same result as the `Marshal.FinalReleaseComObject` method.

## Marshal.SecureStringToBSTR(SecureString) method

```csharp
public static IntPtr SecureStringToBSTR (System.Security.SecureString s);
```

Allocates an unmanaged binary string (BSTR) and copies the contents of a managed `SecureString` object into it.

Parameters:

- `s`: The managed object to copy.

Returns: The address, in unmanaged memory, where the `s` parameter was copied to, or 0 if a null object was supplied.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
The `Marshal.SecureStringToBSTR` method is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the `BSTR` when finished by calling the `Marshal.ZeroFreeBSTR` method.

## Marshal.SecureStringToCoTaskMemAnsi(SecureString) method

```csharp
public static IntPtr SecureStringToCoTaskMemAnsi (System.Security.SecureString s);
```

Copies the contents of a managed `SecureString` object to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: The managed object to copy.

Returns: The address, in unmanaged memory, where the `s` parameter was copied to, or 0 if a null object was supplied.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
The `Marshal.SecureStringToCoTaskMemAnsi` method is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling `Marshal.ZeroFreeCoTaskMemAnsi`. The characters of the string are copied as ANSI characters.

#### Examples
The following example uses the `Marshal.SecureStringToCoTaskMemAnsi` method to marshal and decrypt the contents of a `SecureString` object to a block of unmanaged memory. It then uses the `Marshal.ZeroFreeCoTaskMemAnsi` method to zero out and dispose the unmanaged block.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToCoTaskMemAnsi/sample.cs._

## Marshal.SecureStringToCoTaskMemUnicode(SecureString) method

```csharp
public static IntPtr SecureStringToCoTaskMemUnicode (System.Security.SecureString s);
```

Copies the contents of a managed `SecureString` object to a block of memory allocated from the unmanaged COM task allocator.

Parameters:

- `s`: The managed object to copy.

Returns: The address, in unmanaged memory, where the `s` parameter was copied to, or 0 if a null object was supplied.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
The `Marshal.SecureStringToCoTaskMemUnicode` method is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling the `Marshal.ZeroFreeCoTaskMemUnicode` method. The characters of the string are copied as Unicode characters.

#### Examples
The following example uses the `Marshal.SecureStringToCoTaskMemUnicode` method to marshal and decrypt the contents of a `SecureString` object to a block of unmanaged memory. It then uses the `Marshal.ZeroFreeCoTaskMemUnicode` method to zero out and dispose the unmanaged block.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToCoTaskMemUnicode/sample.cs._

## Marshal.SecureStringToGlobalAllocAnsi(SecureString) method

```csharp
public static IntPtr SecureStringToGlobalAllocAnsi (System.Security.SecureString s);
```

Copies the contents of a managed `SecureString` into unmanaged memory, converting into ANSI format as it copies.

Parameters:

- `s`: The managed object to copy.

Returns: The address, in unmanaged memory, to where the `s` parameter was copied, or 0 if a null object was supplied.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
The `Marshal.SecureStringToGlobalAllocAnsi` method is useful for custom marshaling or when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling the `Marshal.ZeroFreeGlobalAllocAnsi` method.

#### Examples
The following example uses the `Marshal.SecureStringToGlobalAllocAnsi` method to marshal and decrypt the contents of a `SecureString` object to a block of unmanaged memory. It then uses the `Marshal.ZeroFreeGlobalAllocAnsi` method to zero out and dispose the unmanaged block.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToGlobalAllocAnsi/sample.cs._

## Marshal.SecureStringToGlobalAllocUnicode(SecureString) method

```csharp
public static IntPtr SecureStringToGlobalAllocUnicode (System.Security.SecureString s);
```

Copies the contents of a managed `SecureString` object into unmanaged memory.

Parameters:

- `s`: The managed object to copy.

Returns: The address, in unmanaged memory, where `s` was copied, or 0 if `s` is a `SecureString` object whose length is 0.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.
- `OutOfMemoryException`: There is insufficient memory available.

#### Remarks
The `Marshal.SecureStringToGlobalAllocUnicode` method is useful for custom marshaling or for use when mixing managed and unmanaged code. Because this method allocates the unmanaged memory required for a string, always free the memory by calling the `Marshal.ZeroFreeGlobalAllocUnicode` method.

#### Examples
The following example demonstrates how to use the `Marshal.SecureStringToGlobalAllocUnicode` method with the unmanaged `LogonUser` function to perform impersonation with the `SecureString` class. The example then uses the `Marshal.ZeroFreeGlobalAllocUnicode` method to zero out and free the unmanaged string reference.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/SecureStringToGlobalAllocUnicode/sample.cs._
