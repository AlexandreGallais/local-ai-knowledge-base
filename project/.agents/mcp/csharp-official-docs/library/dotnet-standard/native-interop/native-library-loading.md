---
title: "Native library loading"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/native-interop/native-library-loading.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Native library loading

This article explains which paths the runtime searches when loading native libraries via P/Invoke. It also shows how to use
`System.Runtime.InteropServices.NativeLibrary.SetDllImportResolver*`.

## Library name variations

To facilitate simpler cross platform P/Invoke code, the runtime adds the canonical shared library extension (`.dll`, `.so` or `.dylib`) to native library names. On Unix-based platforms, the runtime will also try prepending `lib`. These library names variations are automatically searched when you use APIs that load native libraries, such as `System.Runtime.InteropServices.DllImportAttribute`.

> **Note:**
> Absolute paths in library names (for example, `/usr/lib/libc.so`) are treated as-is and no variations will be searched.

Consider the following example of using P/Invoke:

```csharp
[DllImport("nativedep")]
static extern int ExportedFunction();
```

When running on Windows, the DLL is searched for in the following order:

1. `nativedep`
1. `nativedep.dll` (if the library name does not already end with `.dll` or .`exe`)

When running on Linux or macOS, the runtime will try prepending `lib` and appending the canonical shared library extension. On these OSes, library name variations are tried in the following order:

1. `nativedep.so` / `nativedep.dylib`
1. `libnativedep.so` / `libnativedep.dylib` 1
1. `nativedep`
1. `libnativedep` 1

On Linux, the search order is different if the library name ends with `.so` or contains `.so.` (note the trailing `.`). Consider the following example:

```csharp
[DllImport("nativedep.so.6")]
static extern int ExportedFunction();
```

In this case, the library name variations are tried in the following order:

1. `nativedep.so.6`
1. `libnativedep.so.6` 1
1. `nativedep.so.6.so`
1. `libnativedep.so.6.so` 1

1 Path is checked only if the library name does not contain a directory separator character (`/`).

## Custom import resolver

In more complex scenarios, you can use `System.Runtime.InteropServices.NativeLibrary.SetDllImportResolver*` to resolve DLL imports at runtime. In the following example, `nativedep` is resolved to `nativedep_avx2` if the CPU supports it.

> **Tip:**
> This functionality is only available in .NET Core 3.1 and .NET 5+.

_Code sample not included: ~/samples/snippets/standard/interop/pinvoke/import-resolver/Program.cs._

## See also

- Platform Invoke (P/Invoke)
