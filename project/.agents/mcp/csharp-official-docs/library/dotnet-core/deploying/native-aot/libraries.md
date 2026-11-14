---
title: "Building native libraries"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/deploying/native-aot/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Building native libraries

Publishing .NET class libraries as Native AOT allows creating libraries that can be consumed from non-.NET programming languages. The produced native library is self-contained and doesn't require a .NET runtime to be installed.

> **Note:**
> Only "shared libraries" (also known as DLLs on Windows) are supported. Static libraries are not officially supported and may require compiling Native AOT from source. Unloading Native AOT libraries (via `dlclose` or `FreeLibrary`, for example) is not supported.

Publishing a class library as Native AOT creates a native library that exposes methods of the class library annotated with `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` with a non-null `EntryPoint` field. For more information, see the native library sample available in the dotnet/samples repository on GitHub.
