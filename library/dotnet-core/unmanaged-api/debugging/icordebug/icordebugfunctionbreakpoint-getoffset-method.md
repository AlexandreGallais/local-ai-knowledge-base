---
title: "ICorDebugFunctionBreakpoint::GetOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-getoffset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunctionBreakpoint::GetOffset Method

Gets the offset of the breakpoint within the function.

## Syntax

```cpp
HRESULT GetOffset (
    [out] ULONG32  *pnOffset
);
```

## Parameters

 `pnOffset`
 [out] A pointer to the offset of the breakpoint.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
