---
title: "ICorDebugFunctionBreakpoint::GetOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunctionbreakpoint-getoffset-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
