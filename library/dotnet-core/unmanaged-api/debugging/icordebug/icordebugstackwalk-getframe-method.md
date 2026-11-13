---
title: "ICorDebugStackWalk::GetFrame Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstackwalk-getframe-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStackWalk::GetFrame Method

Gets the current frame in the ICorDebugStackWalk object.

## Syntax

```cpp
HRESULT GetFrame([out] ICorDebugFrame ** pFrame);
```

## Parameters

 `pFrame`\
 [in] A pointer to the address of the created frame object that represents the current frame in the stack.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

| HRESULT                    | Description                                          |
|----------------------------|------------------------------------------------------|
| S_OK                       | The runtime successfully returned the current frame. |
| E_FAIL                     | The current frame was not returned.                  |
| S_FALSE                    | The current frame is a native stack frame.           |
| E_INVALIDARG               | `pFrame` is null.                                    |
| CORDBG_E_PAST_END_OF_STACK | The frame pointer is already at the end of the stack; therefore, no additional frames can be accessed. |

## Remarks

 `ICorDebugStackWalk` returns only actual stack frames. Use the ICorDebugThread3::GetActiveInternalFrames method to return internal frames. (Internal frames are data structures pushed onto the stack by the runtime to store temporary data.)

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugStackWalk Interface
