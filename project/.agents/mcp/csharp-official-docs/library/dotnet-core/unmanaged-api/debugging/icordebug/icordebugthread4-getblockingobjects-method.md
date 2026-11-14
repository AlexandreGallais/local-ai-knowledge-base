---
title: "ICorDebugThread4::GetBlockingObjects Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread4-getblockingobjects-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread4::GetBlockingObjects Method

Provides an ordered enumeration of CorDebugBlockingObject structures that provide thread blocking information.

## Syntax

```cpp
HRESULT GetBlockingObjects (
    [out] ICorDebugBlockingObjectEnum **ppBlockingObjectEnum
```

## Parameters

 `ppBlockingObjectEnum`
 [out] A pointer to an ordered enumeration of CorDebugBlockingObject structures.

## Remarks

The first element in the returned enumeration corresponds to the first structure that is blocking the thread. The second element corresponds to a blocking item that is encountered while running an asynchronous procedure call (APC) when blocked on the first, and so on.

The enumeration is valid only for the duration of the current synchronized state.

This method must be called while the debuggee is in a synchronized state.

If `ppBlockingObjectEnum` is not a valid pointer, the result is undefined.

If a thread is blocked and the error cannot be determined, the method returns an HRESULT that indicates failure; otherwise, it returns S_OK.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugThread4 Interface
