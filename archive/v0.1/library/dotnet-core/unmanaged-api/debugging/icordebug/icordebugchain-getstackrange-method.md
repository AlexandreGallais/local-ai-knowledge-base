---
title: "ICorDebugChain::GetStackRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getstackrange-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
