---
title: "Native interoperability best practices - .NET (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/native-interop/best-practices.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Native interoperability best practices - .NET (part 2 of 3)

## Common Windows data types

Here is a list of data types commonly used in Windows APIs and which C# types to use when calling into the Windows code.

The following types are the same size on 32-bit and 64-bit Windows, despite their names.

| Width | Windows          | C#       | Alternative                          |
|:------|:-----------------|:---------|:-------------------------------------|
| 32    | `BOOL`           | `int`    | `bool`                               |
| 8     | `BOOLEAN`        | `byte`   | `[MarshalAs(UnmanagedType.U1)] bool` |
| 8     | `BYTE`           | `byte`   |                                      |
| 8     | `UCHAR`          | `byte`   |                                      |
| 8     | `UINT8`          | `byte`   |                                      |
| 8     | `CCHAR`          | `byte`   |                                      |
| 8     | `CHAR`           | `sbyte`  |                                      |
| 8     | `CHAR`           | `sbyte`  |                                      |
| 8     | `INT8`           | `sbyte`  |                                      |
| 16    | `CSHORT`         | `short`  |                                      |
| 16    | `INT16`          | `short`  |                                      |
| 16    | `SHORT`          | `short`  |                                      |
| 16    | `ATOM`           | `ushort` |                                      |
| 16    | `UINT16`         | `ushort` |                                      |
| 16    | `USHORT`         | `ushort` |                                      |
| 16    | `WORD`           | `ushort` |                                      |
| 32    | `INT`            | `int`    |                                      |
| 32    | `INT32`          | `int`    |                                      |
| 32    | `LONG`           | `int`    |  See `CLong` and `CULong`. |
| 32    | `LONG32`         | `int`    |                                        |
| 32    | `CLONG`          | `uint`   |  See `CLong` and `CULong`. |
| 32    | `DWORD`          | `uint`   |  See `CLong` and `CULong`. |
| 32    | `DWORD32`        | `uint`   |                                      |
| 32    | `UINT`           | `uint`   |                                      |
| 32    | `UINT32`         | `uint`   |                                      |
| 32    | `ULONG`          | `uint`   |  See `CLong` and `CULong`. |
| 32    | `ULONG32`        | `uint`   |                                      |
| 64    | `INT64`          | `long`   |                                      |
| 64    | `LARGE_INTEGER`  | `long`   |                                      |
| 64    | `LONG64`         | `long`   |                                      |
| 64    | `LONGLONG`       | `long`   |                                      |
| 64    | `QWORD`          | `long`   |                                      |
| 64    | `DWORD64`        | `ulong`  |                                      |
| 64    | `UINT64`         | `ulong`  |                                      |
| 64    | `ULONG64`        | `ulong`  |                                      |
| 64    | `ULONGLONG`      | `ulong`  |                                      |
| 64    | `ULARGE_INTEGER` | `ulong`  |                                      |
| 32    | `HRESULT`        | `int`    |                                      |
| 32    | `NTSTATUS`       | `int`    |                                      |

The following types, being pointers, do follow the width of the platform. Use `IntPtr`/`UIntPtr` for these.

| Signed Pointer Types (use `IntPtr`) | Unsigned Pointer Types (use `UIntPtr`) |
|:------------------------------------|:---------------------------------------|
| `HANDLE`                            | `WPARAM`                               |
| `HWND`                              | `UINT_PTR`                             |
| `HINSTANCE`                         | `ULONG_PTR`                            |
| `LPARAM`                            | `SIZE_T`                               |
| `LRESULT`                           |                                        |
| `LONG_PTR`                          |                                        |
| `INT_PTR`                           |                                        |

A Windows `PVOID`, which is a C `void*`, can be marshalled as either `IntPtr` or `UIntPtr`, but prefer `void*` when possible.

Windows Data Types

Data Type Ranges

### Formerly built-in supported types

There are rare instances when built-in support for a type is removed.

The `UnmanagedType.HString` and `UnmanagedType.IInspectable` built-in marshal support was removed in the .NET 5 release. You must recompile binaries that use this marshalling type and that target a previous framework. It's still possible to marshal this type, but you must marshal it manually, as the following code example shows. This code will work moving forward and is also compatible with previous frameworks.

```csharp
public sealed class HStringMarshaler : ICustomMarshaler
{
    public static readonly HStringMarshaler Instance = new HStringMarshaler();

    public static ICustomMarshaler GetInstance(string _) => Instance;

    public void CleanUpManagedData(object ManagedObj) { }

    public void CleanUpNativeData(IntPtr pNativeData)
    {
        if (pNativeData != IntPtr.Zero)
        {
            Marshal.ThrowExceptionForHR(WindowsDeleteString(pNativeData));
        }
    }

    public int GetNativeDataSize() => -1;

    public IntPtr MarshalManagedToNative(object ManagedObj)
    {
        if (ManagedObj is null)
            return IntPtr.Zero;

        var str = (string)ManagedObj;
        Marshal.ThrowExceptionForHR(WindowsCreateString(str, str.Length, out var ptr));
        return ptr;
    }

    public object MarshalNativeToManaged(IntPtr pNativeData)
    {
        if (pNativeData == IntPtr.Zero)
            return null;

        var ptr = WindowsGetStringRawBuffer(pNativeData, out var length);
        if (ptr == IntPtr.Zero)
            return null;

        if (length == 0)
            return string.Empty;

        return Marshal.PtrToStringUni(ptr, length);
    }

    [DllImport("api-ms-win-core-winrt-string-l1-1-0.dll")]
    [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
    private static extern int WindowsCreateString([MarshalAs(UnmanagedType.LPWStr)] string sourceString, int length, out IntPtr hstring);

    [DllImport("api-ms-win-core-winrt-string-l1-1-0.dll")]
    [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
    private static extern int WindowsDeleteString(IntPtr hstring);

    [DllImport("api-ms-win-core-winrt-string-l1-1-0.dll")]
    [DefaultDllImportSearchPaths(DllImportSearchPath.System32)]
    private static extern IntPtr WindowsGetStringRawBuffer(IntPtr hstring, out int length);
}

// Example usage:
[DllImport("api-ms-win-core-winrt-l1-1-0.dll", PreserveSig = true)]
internal static extern int RoGetActivationFactory(
    /*[MarshalAs(UnmanagedType.HString)]*/[MarshalAs(UnmanagedType.CustomMarshaler, MarshalTypeRef = typeof(HStringMarshaler))] string activatableClassId,
    [In] ref Guid iid,
    [Out, MarshalAs(UnmanagedType.IUnknown)] out object factory);
```

## Cross-platform data type considerations

There are types in the C/C++ language that have latitude in how they are defined. When writing cross-platform interop, cases can arise where platforms differ and can cause issues if not considered.

### C/C++ `long`

C/C++ `long` and C# `long` are not necessarily the same size.

The `long` type in C/C++ is defined to have "at least 32" bits. This means there is a minimum number of required bits, but platforms can choose to use more bits if desired. The following table illustrates the differences in provided bits for the C/C++ `long` data type between platforms.

| Platform    | 32-bit | 64-bit |
|:------------|:-------|:-------|
| Windows     | 32     | 32     |
| macOS/\*nix | 32     | 64     |

In contrast, C# `long` is always 64 bit. For this reason, it's best to avoid using C# `long` to interop with C/C++ `long`.

(This problem with C/C++ `long` does not exist for C/C++ `char`, `short`, `int`, and `long long` as they are 8, 16, 32, and 64 bits respectively on all of these platforms.)

In .NET 6 and later versions, use the `CLong` and `CULong` types for interop with C/C++ `long` and `unsigned long` data types. The following example is for `CLong`, but you can use `CULong` to abstract `unsigned long` in a similar way.

```csharp
// Cross platform C function
// long Function(long a);
[DllImport("NativeLib")]
extern static CLong Function(CLong a);

// Usage
nint result = Function(new CLong(10)).Value;
```

When targeting .NET 5 and earlier versions, you should declare separate Windows and non-Windows signatures to handle the problem.

```csharp
static readonly bool IsWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

// Cross platform C function
// long Function(long a);

[DllImport("NativeLib", EntryPoint = "Function")]
extern static int FunctionWindows(int a);

[DllImport("NativeLib", EntryPoint = "Function")]
extern static nint FunctionUnix(nint a);

// Usage
nint result;
if (IsWindows)
{
    result = FunctionWindows(10);
}
else
{
    result = FunctionUnix(10);
}
```

## Structs

Managed structs are created on the stack and aren't removed until the method returns. By definition then, they are "pinned" (it won't get moved by the GC). You can also simply take the address in unsafe code blocks if native code won't use the pointer past the end of the current method.

Blittable structs are much more performant as they can simply be used directly by the marshalling layer. Try to make structs blittable (for example, avoid `bool`). For more information, see the Blittable Types section.

*If* the struct is blittable, use `sizeof()` instead of `Marshal.SizeOf<MyStruct>()` for better performance. As mentioned above, you can validate that the type is blittable by attempting to create a pinned `GCHandle`. If the type is not a string or considered blittable, `GCHandle.Alloc` will throw an `ArgumentException`.

Pointers to structs in definitions must either be passed by `ref` or use `unsafe` and `*`.

✔️ DO match the managed struct as closely as possible to the shape and names that are used in the official platform documentation or header.

✔️ DO use the C# `sizeof()` instead of `Marshal.SizeOf<MyStruct>()` for blittable structures to improve performance.

❌ DON'T depend on internal representation of struct types exposed by .NET runtime libraries unless it is explicitly documented.

❌ AVOID using classes to express complex native types through inheritance.

❌ AVOID using `System.Delegate` or `System.MulticastDelegate` fields to represent function pointer fields in structures.

Since `System.Delegate` and `System.MulticastDelegate` don't have a required signature, they don't guarantee that the delegate passed in will match the signature the native code expects. Additionally, in .NET Framework and .NET Core, marshalling a struct containing a `System.Delegate` or `System.MulticastDelegate` from its native representation to a managed object can destabilize the runtime if the value of the field in the native representation isn't a function pointer that wraps a managed delegate. In .NET 5 and later versions, marshalling a `System.Delegate` or `System.MulticastDelegate` field from a native representation to a managed object is not supported. Use a specific delegate type instead of `System.Delegate` or `System.MulticastDelegate`.

### Fixed Buffers

An array like `INT_PTR Reserved1[2]` has to be marshalled to two `IntPtr` fields, `Reserved1a` and `Reserved1b`. When the native array is a primitive type, we can use the `fixed` keyword to write it a little more cleanly. For example, `SYSTEM_PROCESS_INFORMATION` looks like this in the native header:

```c
typedef struct _SYSTEM_PROCESS_INFORMATION {
    ULONG NextEntryOffset;
    ULONG NumberOfThreads;
    BYTE Reserved1[48];
    UNICODE_STRING ImageName;
...
} SYSTEM_PROCESS_INFORMATION;
```

In C#, we can write it like this:

```csharp
internal unsafe struct SYSTEM_PROCESS_INFORMATION
{
    internal uint NextEntryOffset;
    internal uint NumberOfThreads;
    private fixed byte Reserved1[48];
    internal Interop.UNICODE_STRING ImageName;
    ...
}
```

However, there are some gotchas with fixed buffers. Fixed buffers of non-blittable types won't be correctly marshalled, so the in-place array needs to be expanded out to multiple individual fields. Additionally, in .NET Framework and .NET Core before 3.0, if a struct containing a fixed buffer field is nested within a non-blittable struct, the fixed buffer field won't be correctly marshalled to native code.

## Troubleshoot P/Invoke failures

The following table maps common symptoms to their likely cause and recommended fix.

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `System.DllNotFoundException` | Library not found at runtime | Check library name, path, and platform. Use `System.Runtime.InteropServices.NativeLibrary.TryLoad*` to test loading. On Linux, verify `LD_LIBRARY_PATH` or `rpath`. |
| `System.EntryPointNotFoundException` | Export name mismatch | Inspect native exports (`dumpbin /exports` on Windows, `nm -D` on Linux). Check for C++ name mangling (missing `extern "C"`). Set `EntryPoint` explicitly. |
| `System.AccessViolationException` | Signature mismatch, use-after-free, or missing pinning | Compare managed and native signatures. Check struct sizes with `Marshal.SizeOf<T>()` vs native `sizeof`. Verify memory lifetime. Use a blittable signature to troubleshoot marshalling issue  |
| Silent data corruption | Wrong type size or encoding | Add boundary logging. Compare `Marshal.SizeOf<T>()` to native `sizeof`. Test with known input/output pairs. |
| Intermittent crashes | GC moved an unpinned object or collected a delegate | Root callback delegates for their full lifetime. Use `GCHandle` or `fixed` for pointers held across calls. |
| Heap corruption on free | Wrong allocator | Match the allocator: never mix `malloc`/`free` with `CoTaskMemAlloc`/`CoTaskMemFree` or `Marshal.FreeHGlobal`. Use the library's own free function. |
