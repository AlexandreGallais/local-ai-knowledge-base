---
title: "ICorDebugNativeFrame::SetIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-setip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::SetIP Method

Sets the instruction pointer to the specified offset location in native code.

## Syntax

```cpp
HRESULT SetIP (
    [in] ULONG32 nOffset
);
```

## Parameters

 `nOffset`
 [in] The offset location in the native code.

## Remarks

Calls to `SetIP` immediately invalidate all frames and chains for the current thread. If the debugger needs frame information after a call to `SetIP`, it must perform a new stack trace.

 ICorDebug will attempt to keep the stack frame in a valid state. However, even if the frame is in a valid state, as far as the runtime is concerned, there still may be problems, such as uninitialized local variables, and so on. The caller is responsible for insuring coherency of the running program.

On 64-bit platforms, the instruction pointer cannot be moved out of a `catch` or `finally` block. If `SetIP` is called to make such a move on a 64-bit platform, it will return an HRESULT indicating failure.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
