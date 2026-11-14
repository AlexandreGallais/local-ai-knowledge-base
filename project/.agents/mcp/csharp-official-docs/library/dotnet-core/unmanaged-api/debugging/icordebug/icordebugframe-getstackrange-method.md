---
title: "ICorDebugFrame::GetStackRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getstackrange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetStackRange Method

Gets the absolute address range of this stack frame.

## Syntax

```cpp
HRESULT GetStackRange (
    [out] CORDB_ADDRESS      *pStart,
    [out] CORDB_ADDRESS      *pEnd
);
```

## Parameters

 `pStart`
 [out] A pointer to a `CORDB_ADDRESS` that specifies the starting address of the stack frame represented by this `ICorDebugFrame` object.

 `pEnd`
 [out] A pointer to a `CORDB_ADDRESS` that specifies the ending address of the stack frame represented by this `ICorDebugFrame` object.

## Remarks

The address range of the stack is useful for piecing together interleaved stack traces gathered from multiple debugging engines. The numeric range provides no information about the contents of the stack frame. It is meaningful only for comparison of stack frame locations.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
