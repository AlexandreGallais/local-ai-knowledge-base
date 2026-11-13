---
title: "ICorDebugThread::GetActiveChain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getactivechain-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetActiveChain Method

Gets an interface pointer to the active (most recent) stack chain on this ICorDebugThread object.

## Syntax

```cpp
HRESULT GetActiveChain (
    [out] ICorDebugChain **ppChain
);
```

## Parameters

 `ppChain`
 [out] A pointer to the address of an ICorDebugChain object that represents the stack chain.

## Remarks

The `ppChain` parameter is null if no stack chain is currently active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
