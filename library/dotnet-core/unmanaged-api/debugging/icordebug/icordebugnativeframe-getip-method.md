---
title: "ICorDebugNativeFrame::GetIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-getip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::GetIP Method

Gets the native code offset location to which the instruction pointer is currently set.

## Syntax

```cpp
HRESULT GetIP (
    [out] ULONG32           *pnOffset
);
```

## Parameters

 `pnOffset`
 [out] A pointer to the offset location in the native code.

## Remarks

If the stack frame that is represented by this "ICorDebugNativeFrame" is active, the offset is the address of the next instruction to be executed. If this stack frame is not active, the offset is the address of the next instruction to be executed when the stack frame is reactivated.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
