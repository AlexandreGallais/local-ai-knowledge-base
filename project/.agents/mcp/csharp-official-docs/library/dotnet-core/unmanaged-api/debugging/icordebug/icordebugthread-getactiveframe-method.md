---
title: "ICorDebugThread::GetActiveFrame Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getactiveframe-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetActiveFrame Method

Gets an interface pointer to the active (most recent) frame on this ICorDebugThread object.

## Syntax

```cpp
HRESULT GetActiveFrame (
    [out] ICorDebugFrame   **ppFrame
);
```

## Parameters

 `ppFrame`
 [out] A pointer to the address of an ICorDebugFrame interface object that represents a frame.

## Remarks

The `ppFrame` parameter is null if no frame is currently active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
