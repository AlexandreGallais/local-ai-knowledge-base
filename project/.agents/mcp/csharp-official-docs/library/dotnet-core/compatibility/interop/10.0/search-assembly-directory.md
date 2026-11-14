---
title: "Breaking change - Specifying DllImportSearchPath.AssemblyDirectory only searches the assembly directory"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/interop/10.0/search-assembly-directory.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Specifying DllImportSearchPath.AssemblyDirectory only searches the assembly directory

Starting in .NET 10, if you specify `System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory` as the only search flag, the runtime searches exclusively in the assembly directory. This change affects the behavior of P/Invokes and the `System.Runtime.InteropServices.NativeLibrary` class.

## Version introduced

.NET 10

## Previous behavior

Previously, when `System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory` was specified as the only search flag, the runtime searched the assembly directory first. If the library was not found, it fell back to the operating system's default library search behavior.

For example, with the following code, the runtime would search the assembly directory and then fall back to the OS search paths.

```csharp
[DllImport("example.dll", DllImportSearchPath = DllImportSearchPath.AssemblyDirectory)]
public static extern void ExampleMethod();
```

## New behavior

Starting in .NET 10, when `System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory` is specified as the only search flag, the runtime searches only in the assembly directory. It *doesn't* fall back to the operating system's default library search behavior.

The previous code example now only searches the assembly directory for *example.dll*. If the library is not found there, a `System.DllNotFoundException` is thrown.

## Type of breaking change

This is a behavioral change.

## Reason for change

The fallback behavior when specifying `System.Runtime.InteropServices.DllImportSearchPath.AssemblyDirectory` caused confusion and was inconsistent with the design of search flags. This change ensures clarity and consistency in behavior.

## Recommended action

If fallback behavior is required, avoid specifying an explicit `System.Runtime.InteropServices.DllImportSearchPath`. By default, when no flags are specified, the runtime searches the assembly directory and then falls back to the operating system's default library search behavior.

Example:

```csharp
[DllImport("example.dll")]
public static extern void ExampleMethod();
```

## Affected APIs

- P/Invokes using `System.Runtime.InteropServices.DefaultDllImportSearchPathsAttribute`
- `System.Runtime.InteropServices.NativeLibrary.Load*`
- `System.Runtime.InteropServices.NativeLibrary.TryLoad*`

## See also

- Single-file apps no longer look for native libraries in executable directory
