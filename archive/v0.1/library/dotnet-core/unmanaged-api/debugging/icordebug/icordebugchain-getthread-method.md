---
title: "ICorDebugChain::GetThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getthread-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugChain::GetThread Method

Gets the physical thread this call chain is part of.

## Syntax

```cpp
HRESULT GetThread (
    [out] ICorDebugThread    **ppThread
);
```

## Parameters

 `ppThread`
 [out] A pointer to an ICorDebugThread object that represents the physical thread this call chain is part of.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
