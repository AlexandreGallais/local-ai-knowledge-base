---
title: "ICorDebugExceptionObjectValue Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptionobjectvalue-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
