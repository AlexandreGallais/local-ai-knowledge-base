---
title: "ICLRDebuggingLibraryProvider3 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/iclrdebugginglibraryprovider3-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICLRDebuggingLibraryProvider3 interface

Includes callback methods that allow common language runtime version-specific debugging libraries to be located and loaded on demand for .NET Core regular and single-file applications. This interface is required by the RegisterForRuntimeStartup3 and CreateDebuggingInterfaceFromVersion3 methods. It is supported by the `ICLRDebugging::OpenVirtualProcess` method acquired with dbgshim's CLRCreateInstance API.

## Methods

| Method | Description |
|------------|-----------------|
|ProvideWindowsLibrary|Allows the debugger to provide a path to a version-specific Windows debugging library.|
|ProvideUnixLibrary|Allows the debugger to provide a path to a version-specific Linux or macOS debugging library.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET 6.0

## See also

- ICLRDebuggingLibraryProvider2 interface
- ICLRDebuggingLibraryProvider interface
