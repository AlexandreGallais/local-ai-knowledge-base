---
title: "DllImportResolver delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/DllImportResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DllImportResolver delegate

Namespace: `System.Runtime.InteropServices`

```csharp
public delegate IntPtr DllImportResolver(string libraryName, Assembly assembly, DllImportSearchPath? searchPath);
```

Provides a delegate used to resolve native libraries via callback.

Parameters:

- `libraryName`: The native library to resolve.
- `assembly`: The assembly requesting the resolution.
- `searchPath`: The `DefaultDllImportSearchPathsAttribute` on the PInvoke, if any. Otherwise, the `DefaultDllImportSearchPathsAttribute` on the assembly, if any. Otherwise `null`.

Returns: The handle for the loaded native library on success, or `IntPtr.Zero` on failure.

#### Remarks

The runtime does not do any lifetime management around the handle returned by a `DllImportResolver`. It is left to the implementation and consuming code to keep the library loaded for as long as necessary and free it if/when desired.

The resolver is typically called once for each PInvoke entry point. To improve performance, the implementation of the resolver can cache the `libraryName` to handle mapping, as long as the library isn't unloaded via `Free`.
