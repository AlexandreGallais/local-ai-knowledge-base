---
title: "ICorDebugAppDomain::GetId Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getid-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetId Method

Gets the unique identifier of the application domain.

## Syntax

```cpp
HRESULT GetID (
    [out] ULONG32   *pId
);
```

## Parameters

 `pId`
 [out] The unique identifier of the application domain.

## Remarks

The identifier for the application domain is unique within the containing process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
