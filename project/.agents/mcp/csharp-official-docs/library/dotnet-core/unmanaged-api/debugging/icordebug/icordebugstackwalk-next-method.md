---
title: "ICorDebugStackWalk::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstackwalk-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStackWalk::Next Method

Moves the ICorDebugStackWalk object to the next frame.

## Syntax

```cpp
HRESULT Next();
```

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The runtime successfully unwound to the next frame (see Remarks).|
|E_FAIL|The `ICorDebugStackWalk` object could not be advanced.|
|CORDBG_S_AT_END_OF_STACK|The end of the stack was reached as a result of this unwind.|
|CORDBG_E_PAST_END_OF_STACK|The frame pointer is already at the end of the stack; therefore, no additional frames can be accessed.|

## Remarks

The `Next` method advances the `ICorDebugStackWalk` object to the calling frame only if the runtime can unwind the current frame. Otherwise, the object advances to the next frame that the runtime is able to unwind.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugStackWalk Interface
