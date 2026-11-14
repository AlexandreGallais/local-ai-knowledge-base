---
title: "ICorDebugChain::GetThread Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getthread-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
