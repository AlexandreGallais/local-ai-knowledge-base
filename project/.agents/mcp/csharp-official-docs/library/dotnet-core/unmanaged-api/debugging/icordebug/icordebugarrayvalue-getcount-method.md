---
title: "ICorDebugArrayValue::GetCount Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugarrayvalue-getcount-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugArrayValue::GetCount Method

Gets the total number of elements in the array.

## Syntax

```cpp
HRESULT GetCount (
    [out] ULONG32 *pnCount
);
```

## Parameters

 `pnCount`
 [out] A pointer to the total number of elements in the array.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
