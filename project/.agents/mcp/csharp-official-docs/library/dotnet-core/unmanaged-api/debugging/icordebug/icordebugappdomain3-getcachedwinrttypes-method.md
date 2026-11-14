---
title: "ICorDebugAppDomain3::GetCachedWinRTTypes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain3-getcachedwinrttypes-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain3::GetCachedWinRTTypes Method

Gets an enumerator for all cached Windows Runtime types.

## Syntax

```cpp
HRESULT GetCachedWinRTTypes (
    [out] ICorDebugGuidToTypeEnum **ppGuidToTypeEnum)
;
```

## Parameters

 `ppGuidToTypeEnum`
 [out] A pointer to an ICorDebugGuidToTypeEnum interface object that can enumerate the managed representations of Windows Runtime types currently loaded in the application domain.

## Requirements

 **Platforms:** Windows Runtime

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugAppDomain3 Interface
