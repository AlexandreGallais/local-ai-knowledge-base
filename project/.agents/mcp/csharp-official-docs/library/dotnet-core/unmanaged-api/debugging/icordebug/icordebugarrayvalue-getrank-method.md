---
title: "ICorDebugArrayValue::GetRank Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getrank-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetRank Method

Gets the number of dimensions in the array.

## Syntax

```cpp
HRESULT GetRank (
    [out] ULONG32   *pnRank
);
```

## Parameters

 `pnRank`
 [out] A pointer to the number of dimensions in this `ICorDebugArrayValue` object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
