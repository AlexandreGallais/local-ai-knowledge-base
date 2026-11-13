---
title: "Native interoperability best practices - .NET (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Native interoperability best practices

.NET gives you various ways to customize your native interoperability code. This article includes the guidance that Microsoft's .NET teams follow for native interoperability.

## General guidance

The guidance in this section applies to all interop scenarios.

- ✔️ DO use `[LibraryImport]`, if possible, when targeting .NET 7+.
  - There are cases when using `[DllImport]` is appropriate. A code analyzer with ID SYSLIB1054 tells you when that's the case.
- ✔️ DO use the same naming and capitalization for your methods and parameters as the native method you want to call.
- ✔️ CONSIDER using the same naming and capitalization for constant values.
- ✔️ DO define P/Invoke and function pointer signatures that match the C function's arguments.
- ✔️ DO use .NET types that map closest to the native type. For example, in C#, use `uint` when the native type is `unsigned int`.
- ✔️ DO prefer expressing higher level native types using .NET structs rather than classes.
- ✔️ DO prefer using function pointers and `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` as opposed to `Delegate` types, when passing callbacks to unmanaged functions in C#. For more information, see `System.Runtime.InteropServices.Marshal.GetFunctionPointerForDelegate(System.Delegate)`.
- ✔️ DO use `[In]` and `[Out]` attributes on array parameters.
- ✔️ DO only use `[In]` and `[Out]` attributes on other types when the behavior you want differs from the default behavior.
- ✔️ CONSIDER using `System.Buffers.ArrayPool`1` to pool your native array buffers.
- ✔️ CONSIDER wrapping your P/Invoke declarations in a class with the same name and capitalization as your native library.
  - This allows your `[LibraryImport]` or `[DllImport]` attributes to use the C# `nameof` language feature to pass in the name of the native library and ensure that you didn't misspell the name of the native library.
- ✔️ DO use `SafeHandle` handles to manage lifetime of objects that encapsulate unmanaged resources. For more information, see Cleaning up unmanaged resources.
- ❌ AVOID finalizers to manage lifetime of objects that encapsulate unmanaged resources. For more information, see Implement a Dispose method.

## LibraryImport attribute settings

A code analyzer, with ID SYSLIB1054, helps guide you with `LibraryImportAttribute`. In most cases, the use of `LibraryImportAttribute` requires an explicit declaration rather than relying on default settings. This design is intentional and helps avoid unintended behavior in interop scenarios.

## DllImport attribute settings

| Setting | Default | Recommendation | Details |
|---------|---------|----------------|---------|
| `System.Runtime.InteropServices.DllImportAttribute.PreserveSig`   | `true` |  Keep default  | When this is explicitly set to false, failed HRESULT return values will be turned into exceptions (and the return value in the definition becomes null as a result).|
| `System.Runtime.InteropServices.DllImportAttribute.SetLastError` | `false`  | Depends on the API  | Set this to true if the API uses GetLastError and use Marshal.GetLastWin32Error to get the value. If the API sets a condition that says it has an error, get the error before making other calls to avoid inadvertently having it overwritten.|
| `System.Runtime.InteropServices.DllImportAttribute.CharSet` | Compiler-defined (specified in the charset documentation)  | Explicitly  use `CharSet.Unicode` or `CharSet.Ansi` when strings or characters are present in the definition | This specifies marshalling behavior of strings and what `ExactSpelling` does when `false`. Note that `CharSet.Ansi` is actually UTF8 on Unix. _Most_ of the time Windows uses Unicode while Unix uses UTF8. See more information on the documentation on charsets. |
| `System.Runtime.InteropServices.DllImportAttribute.ExactSpelling` | `false` | `true` | Set this to true and gain a slight perf benefit as the runtime will not look for alternate function names with either an "A" or "W" suffix depending on the value of the `CharSet` setting ("A" for `CharSet.Ansi` and "W" for `CharSet.Unicode`). |

## String parameters

A `string` is pinned and used directly by native code (rather than copied) when passed by value (not `ref` or `out`) and any one of the following:

- `System.Runtime.InteropServices.LibraryImportAttribute.StringMarshalling` is defined as `System.Runtime.InteropServices.StringMarshalling.Utf16`.
- The argument is explicitly marked as `[MarshalAs(UnmanagedType.LPWSTR)]`.
- `System.Runtime.InteropServices.DllImportAttribute.CharSet` is `System.Runtime.InteropServices.CharSet.Unicode`.

❌ DON'T use `[Out] string` parameters. String parameters passed by value with the `[Out]` attribute can destabilize the runtime if the string is an interned string. See more information about string interning in the documentation for `System.String.Intern*`.

✔️ CONSIDER `char[]` or `byte[]` arrays from an `ArrayPool` when native code is expected to fill a character buffer. This requires passing the argument as `[Out]`.

### DllImport-specific guidance

✔️ CONSIDER setting the `CharSet` property in `[DllImport]` so the runtime knows the expected string encoding.

✔️ CONSIDER avoiding `StringBuilder` parameters. `StringBuilder` marshalling *always* creates a native buffer copy. As such, it can be extremely inefficient. Take the typical scenario of calling a Windows API that takes a string:

1. Create a `StringBuilder` of the desired capacity (allocates managed capacity) **{1}**.
2. Invoke:
   1. Allocates a native buffer **{2}**.
   2. Copies the contents if `[In]` _(the default for a `StringBuilder` parameter)_.
   3. Copies the native buffer into a newly allocated managed array if `[Out]` **{3}** _(also the default for `StringBuilder`)_.
3. `ToString()` allocates yet another managed array **{4}**.

That's **{4}** allocations to get a string out of native code. The best you can do to limit this is to reuse the `StringBuilder`
in another call, but this still only saves one allocation. It's much better to use and cache a character buffer from `ArrayPool`. You can then get down to just the allocation for the `ToString()` on subsequent calls.

The other issue with `StringBuilder` is that it always copies the return buffer back up to the first null. If the passed back string isn't terminated or is a double-null-terminated string, your P/Invoke is incorrect at best.

If you *do* use `StringBuilder`, one last gotcha is that the capacity does **not** include a hidden null, which is always accounted for in interop. It's common for people to get this wrong as most APIs want the size of the buffer *including* the null. This can result in wasted/unnecessary allocations. Additionally, this gotcha prevents the runtime from optimizing `StringBuilder` marshalling to minimize copies.

For more information on string marshalling, see Default Marshalling for Strings and Customizing string marshalling.

> **Windows Specific**
> For `[Out]` strings the CLR will use `CoTaskMemFree` by default to free strings or `SysStringFree` for strings that are marked
as `UnmanagedType.BSTR`.
> **For most APIs with an output string buffer:**
> The passed in character count must include the null. If the returned value is less than the passed in character count the call has succeeded and the value is the number of characters *without* the trailing null. Otherwise the count is the required size of the buffer *including* the null character.
>
> - Pass in 5, get 4: The string is 4 characters long with a trailing null.
> - Pass in 5, get 6: The string is 5 characters long, need a 6 character buffer to hold the null.
> Windows Data Types for Strings

## Boolean parameters and fields

Booleans are easy to mess up. By default, a .NET `bool` is marshalled to a Windows `BOOL`, where it's a 4-byte value. However, the `_Bool`, and `bool` types in C and C++ are a *single* byte. This can lead to hard to track down bugs as half the return value will be discarded, which will only *potentially* change the result. For more for information on marshalling .NET `bool` values to C or C++ `bool` types, see the documentation on customizing boolean field marshalling.

## GUIDs

GUIDs are usable directly in signatures. Many Windows APIs take `GUID&` type aliases like `REFIID`. When the method signature contains a reference parameter, place either a `ref` keyword or a `[MarshalAs(UnmanagedType.LPStruct)]` attribute on the GUID parameter declaration.

| GUID | By-ref GUID |
|------|-------------|
| `KNOWNFOLDERID` | `REFKNOWNFOLDERID` |

❌ DON'T Use `[MarshalAs(UnmanagedType.LPStruct)]` for anything other than `ref` GUID parameters.

## Blittable types

Blittable types are types that have the same bit-level representation in managed and native code. As such they do not need to be converted to another format to be marshalled to and from native code, and as this improves performance they should be preferred. Some types are not blittable but are known to contain blittable contents. These types have similar optimizations as blittable types when they are not contained in another type, but are not considered blittable when in fields of structs or for the purposes of `UnmanagedCallersOnlyAttribute`.

### Blittable types when runtime marshalling is enabled

**Blittable types:**

- `byte`, `sbyte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `single`, `double`, `nint`, `nuint`
- unmanaged pointers (for example, `int*`)
- structs with fixed layout that only have blittable value types for instance fields
  - fixed layout requires `[StructLayout(LayoutKind.Sequential)]` or `[StructLayout(LayoutKind.Explicit)]`
  - structs are `LayoutKind.Sequential` by default

**Types with blittable contents:**

- non-nested, one-dimensional arrays of blittable primitive types (for example, `int[]`)
- classes with fixed layout that only have blittable value types for instance fields
  - fixed layout requires `[StructLayout(LayoutKind.Sequential)]` or `[StructLayout(LayoutKind.Explicit)]`
  - classes are `LayoutKind.Auto` by default

**NOT blittable:**

- `bool`

**SOMETIMES blittable:**

- `char`

**Types with SOMETIMES blittable contents:**

- `string`

When blittable types are passed by reference with `in`, `ref`, or `out`, or when types with blittable contents are passed by value, they're simply pinned by the marshaller instead of being copied to an intermediate buffer.

`char` is blittable in a one-dimensional array **or** if it's part of a type that contains it's explicitly marked with `[StructLayout]` with `CharSet = CharSet.Unicode`.

```csharp
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
public struct UnicodeCharStruct
{
    public char c;
}
```

`string` contains blittable contents if it isn't contained in another type and is being passed by value (not `ref` or `out`) as an argument and any one of the following:

- `System.Runtime.InteropServices.LibraryImportAttribute.StringMarshalling` is defined as `System.Runtime.InteropServices.StringMarshalling.Utf16`.
- The argument is explicitly marked as `[MarshalAs(UnmanagedType.LPWSTR)]`.
- `System.Runtime.InteropServices.DllImportAttribute.CharSet` is Unicode.

You can see if a type is blittable or contains blittable contents by attempting to create a pinned `GCHandle`. If the type isn't a string or considered blittable, `GCHandle.Alloc` will throw an `ArgumentException`.

### Blittable types when runtime marshalling is disabled

When runtime marshalling is disabled, the rules for which types are blittable are significantly simpler. All types that are C# `unmanaged` types and don't have any fields that are marked with `[StructLayout(LayoutKind.Auto)]` are blittable. All types that are not C# `unmanaged` types are not blittable. The concept of types with blittable contents, such as arrays or strings, does not apply when runtime marshalling is disabled. Any type that is not considered blittable by the aforementioned rule is unsupported when runtime marshalling is disabled.

These rules differ from the built-in system primarily in situations where `bool` and `char` are used. When marshalling is disabled, `bool` is passed as a 1-byte value and not normalized and `char` is always passed as a 2-byte value. When runtime marshalling is enabled, `bool` can map to a 1, 2, or 4-byte value and is always normalized, and `char` maps to either a 1 or 2-byte value depending on the `CharSet`.

✔️ DO make your structures blittable when possible.

For more information, see:

- Blittable and Non-Blittable Types
- Type Marshalling

## Keeping managed objects alive

`GC.KeepAlive()` will ensure an object stays in scope until the KeepAlive method is hit.

`HandleRef` allows the marshaller to keep an object alive for the duration of a P/Invoke. It can be used instead of `IntPtr` in method signatures. `SafeHandle` effectively replaces this class and should be used instead.

`GCHandle` allows pinning a managed object and getting the native pointer to it. The basic pattern is:

```csharp
GCHandle handle = GCHandle.Alloc(obj, GCHandleType.Pinned);
IntPtr ptr = handle.AddrOfPinnedObject();
handle.Free();
```

Pinning isn't the default for `GCHandle`. The other major pattern is for passing a reference to a managed object through native code and back to managed code, usually with a callback. Here is the pattern:

```csharp
GCHandle handle = GCHandle.Alloc(obj);
SomeNativeEnumerator(callbackDelegate, GCHandle.ToIntPtr(handle));

// In the callback
GCHandle handle = GCHandle.FromIntPtr(param);
object managedObject = handle.Target;

// After the last callback
handle.Free();
```

Don't forget that `GCHandle` needs to be explicitly freed to avoid memory leaks.
