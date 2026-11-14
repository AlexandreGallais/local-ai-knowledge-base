---
title: "ICorDebugChain::IsManaged Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-ismanaged-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugChain::IsManaged Method

Gets a value that indicates whether this chain is running managed code.

## Syntax

```cpp
HRESULT IsManaged (
    [out] BOOL               *pManaged
);
```

## Parameters

 `pManaged`
 [out] `true` if this chain is running managed code; otherwise, `false`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
