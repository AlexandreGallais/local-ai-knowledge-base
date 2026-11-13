---
title: "ICorDebugEval::GetThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-getthread-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval::GetThread Method

Gets the thread in which this evaluation is executing or will execute.

## Syntax

```cpp
HRESULT GetThread (
    [out] ICorDebugThread   **ppThread
);
```

## Parameters

 `ppThread`
 [out] A pointer to the address of an ICorDebugThread object that represents the thread.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
