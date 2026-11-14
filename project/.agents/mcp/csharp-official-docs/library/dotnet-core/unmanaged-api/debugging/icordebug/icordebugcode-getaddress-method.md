---
title: "ICorDebugCode::GetAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getaddress-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetAddress Method

Gets the relative virtual address (RVA) of the code segment that this "ICorDebugCode" interface represents.

## Syntax

```cpp
HRESULT GetAddress (
    [out] CORDB_ADDRESS *pStart
);
```

## Parameters

 `pStart`
 [out] A pointer to the RVA of the code segment.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
