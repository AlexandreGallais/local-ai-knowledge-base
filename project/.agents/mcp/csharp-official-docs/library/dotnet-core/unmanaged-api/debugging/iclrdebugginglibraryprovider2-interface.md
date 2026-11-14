---
title: "ICLRDebuggingLibraryProvider2 Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/iclrdebugginglibraryprovider2-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
