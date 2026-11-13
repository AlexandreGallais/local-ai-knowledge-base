---
title: "ICorDebugILFrame::GetIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-getip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILFrame::GetIP Method

Gets the value of the instruction pointer and a bitwise combination value that describes how the value of the instruction pointer was obtained.

## Syntax

```cpp
HRESULT GetIP (
    [out] ULONG32               *pnOffset,
    [out] CorDebugMappingResult *pMappingResult
);
```

## Parameters

 `pnOffset`
 [out] The value of the instruction pointer.

 `pMappingResult`
 [out] A pointer to a bitwise combination of the CorDebugMappingResult enumeration values that describe how the value of the instruction pointer was obtained.

## Remarks

The value of the instruction pointer is the stack frame's offset into the function's common intermediate language (CIL) code. If the stack frame is active, this address is the next instruction to execute. If the stack frame is not active, this address is the next instruction to execute when the stack frame is reactivated.

If this frame is a just-in-time (JIT) compiled frame, the value of the instruction pointer will be determined by mapping backwards from the actual native instruction pointer, so the value may be only approximate.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
