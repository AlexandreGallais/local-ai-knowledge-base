---
title: "ICorDebugExceptionObjectValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectvalue-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugExceptionObjectValue Interface

Extends the "ICorDebugObjectValue" interface to provide stack trace information from a managed exception object.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateExceptionCallStack Method|Gets an enumerator to the call stack embedded in an exception object.|

## Remarks

The call to `QueryInterface` will succeed for managed objects that derive from `System.Exception`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
