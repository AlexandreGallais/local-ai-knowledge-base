---
title: "ICLRDebuggingLibraryProvider2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/iclrdebugginglibraryprovider2-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICLRDebuggingLibraryProvider2 interface

Includes the ProvideLibrary2 method, which allows the debugger to provide a path to a version-specific debugging library.

## Methods

| Method | Description |
|------------|-----------------|
|ProvideLibrary2|Allows the debugger to provide a path to a version-specific debugging library.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** dbgshim.h

 **Library:** dbgshim.dll, libdbgshim.so, libdbgshim.dylib

 **.NET Versions:** Available since .NET Core 2.1

## See also

- ICLRDebuggingLibraryProvider3 interface
- ICLRDebuggingLibraryProvider interface
