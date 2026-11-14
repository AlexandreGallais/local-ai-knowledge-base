---
title: "ICorDebugExceptionDebugEvent Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugexceptiondebugevent-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugExceptionDebugEvent Interface

Extends the ICorDebugDebugEvent interface to support exception events.

## Methods

|Method|Description|
|------------|-----------------|
|GetFlags Method|Gets a flag that indicates whether the exception is can be intercepted.|
|GetNativeIP Method|Gets the native interface pointer for this exception debug event.|
|GetStackPointer Method|Gets the stack pointer for this exception debug event.|

## Remarks

The `ICorDebugExceptionDebugEvent` interface is implemented by the following event types:

- MANAGED_EXCEPTION_FIRST_CHANCE
- MANAGED_EXCEPTION_USER_FIRST_CHANCE
- MANAGED_EXCEPTION_CATCH_HANDLER_FOUND
- MANAGED_EXCEPTION_UNHANDLED

> **Note:**
> The interface is available with .NET Native only. Attempting to call `QueryInterface` to retrieve an interface pointer returns `E_NOINTERFACE` for ICorDebug scenarios outside of .NET Native.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
