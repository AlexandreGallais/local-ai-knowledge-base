---
title: "ICorDebugMDA Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMDA Interface

Represents a managed debugging assistant (MDA) message.

## Methods

|Method|Description|
|------------|-----------------|
|GetDescription Method|Gets a string containing a description of this MDA.|
|GetFlags Method|Gets the flags associated with this MDA.|
|GetName Method|Gets a string containing the name of this MDA.|
|GetOSThreadId Method|Gets the operating system thread identifier upon which this MDA is executing.|
|GetXML Method|Gets the full XML stream associated with this MDA.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- Diagnose Errors with Managed Debugging Assistants
