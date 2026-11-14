---
title: "ICorDebugFunction::GetCurrentVersionNumber Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getcurrentversionnumber-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetCurrentVersionNumber Method

Gets the version number of the latest edit made to the function represented by this ICorDebugFunction object.

## Syntax

```cpp
HRESULT GetCurrentVersionNumber (
    [out] ULONG32 *pnCurrentVersion
);
```

## Parameters

 `pnCurrentVersion`
 [out] A pointer to an integer value that is the version number of the latest edit made to this function.

## Remarks

The version number of the latest edit made to this function may be greater than the version number of the function itself. Use either the ICorDebugFunction2::GetVersionNumber method or the ICorDebugCode::GetVersionNumber method to retrieve the version number of the function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
