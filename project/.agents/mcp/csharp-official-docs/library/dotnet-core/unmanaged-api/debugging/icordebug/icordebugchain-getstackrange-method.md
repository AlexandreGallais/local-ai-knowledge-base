---
title: "ICorDebugChain::GetStackRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getstackrange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugChain::GetStackRange Method

Gets the address range of the stack segment for this chain.

## Syntax

```cpp
HRESULT GetStackRange (
    [out] CORDB_ADDRESS      *pStart,
    [out] CORDB_ADDRESS      *pEnd
);
```

## Parameters

 `pStart`
 [out] A pointer to a `CORDB_ADDRESS` value that is the starting address of the stack segment.

 `pEnd`
 [out] A pointer to a `CORDB_ADDRESS` value that is the ending address of the stack segment.

## Remarks

The numeric range is meaningful only for comparison of stack frame locations. You cannot make any assumptions about what is actually stored on the stack.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
