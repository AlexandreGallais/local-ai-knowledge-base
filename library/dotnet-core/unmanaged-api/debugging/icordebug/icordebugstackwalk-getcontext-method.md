---
title: "ICorDebugStackWalk::GetContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugstackwalk-getcontext-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugStackWalk::GetContext Method

Returns the context for the current frame in the ICorDebugStackWalk object.

## Syntax

```cpp
HRESULT GetContext([in]  ULONG32 contextFlags,
                   [in]  ULONG32 contextBufSize,
                   [out] ULONG32* contextSize,
                   [out, size_is(contextBufSize)] BYTE contextBuf[]);
```

## Parameters

 `contextFlags`
 [in] Flags that indicate the requested contents of the context buffer (defined in WinNT.h).

 `contextBufSize`
 [in] The allocated size of the context buffer.

 `contextSize`
 [out] The actual size of the context. This value must be less than or equal to the size of the context buffer.

 `contextBuf`
 [out] The context buffer.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The context for the current frame was successfully returned.|
|E_FAIL|The context could not be returned.|
|HRESULT_FROM_WIN32(ERROR_INSUFFICIENT BUFFER)|The context buffer is too small.|
|CORDBG_E_PAST_END_OF_STACK|The frame pointer is already at the end of the stack; therefore, no additional frames can be accessed.|

## Remarks

Because unwinding restores only a subset of the registers, such as non-volatile registers, the context may not exactly match the register state at the time of the call.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
