---
title: "ICorDebugILFrame::SetIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-setip-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame::SetIP Method

Sets the instruction pointer to the specified offset location in the common intermediate language (CIL) code.

## Syntax

```cpp
HRESULT SetIP (
    [in] ULONG32 nOffset
);
```

## Parameters

 `nOffset`
The offset location in the CIL code.

## Remarks

Calls to `SetIP` immediately invalidate all frames and chains for the current thread. If the debugger needs frame information after a call to `SetIP`, it must perform a new stack trace.

 ICorDebug will attempt to keep the stack frame in a valid state. However, even if the frame is in a valid state, there still may be problems such as uninitialized local variables. The caller is responsible for ensuring the coherency of the running program.

On 64-bit platforms, the instruction pointer cannot be moved out of a `catch` or `finally` block. If `SetIP` is called to make such a move on a 64-bit platform, it will return an HRESULT indicating failure.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
