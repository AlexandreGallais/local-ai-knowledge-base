---
title: ".NET 8 breaking change: Backslash mapping in Unix file paths"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/file-path-backslash.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Backslash mapping in Unix file paths

Backslash (`\`) characters are valid in directory and file names on Unix. Starting in .NET 8, the native CoreCLR runtime no longer converts `\` characters to directory separators—forward slashes (`/`)—on Unix. This change enables .NET applications to be located on paths with names that contain backslash characters. It also allows the native runtime, `dotnet` host, and the `ilasm` and `ildasm` tools to access files on paths that contain backslash characters.

## Previous behavior

The native CoreCLR runtime automatically converted backslash (`\`) characters in file paths to forward slashes (`/`) on Unix.

## New behavior

The native CoreCLR runtime doesn't convert any file path characters on Unix.

## Version introduced

.NET 8 Preview 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

Without this change, .NET apps located in directories that contain backslash characters fail to start.

## Recommended action

- Use `System.IO.Path.DirectorySeparatorChar` as a directory separator in your app instead of hardcoding it to `\` or `/`.
- Use `/` as a directory separator on Unix in file paths that you pass to the `dotnet` host, hosting APIs, and `ilasm` and `ildasm` tools.
- Use `/` as a directory separator on Unix in file paths in various `DOTNET_xxx` environment variables.

## Affected APIs

- Hosting APIs
- `System.Runtime.InteropServices.DllImportAttribute.Value`
- `System.Runtime.InteropServices.NativeLibrary.Load*`
- `System.Runtime.InteropServices.NativeLibrary.TryLoad*`
- `System.Reflection.Assembly.LoadFrom*`
- `System.Reflection.Assembly.LoadFile*`
- `System.Reflection.Assembly.UnsafeLoadFrom(System.String)`
- `System.Runtime.Loader.AssemblyLoadContext.LoadFromAssemblyPath(System.String)`
- `System.Runtime.Loader.AssemblyLoadContext.LoadFromNativeImagePath(System.String,System.String)`
- `System.Runtime.Loader.AssemblyLoadContext.LoadUnmanagedDllFromPath(System.String)`
