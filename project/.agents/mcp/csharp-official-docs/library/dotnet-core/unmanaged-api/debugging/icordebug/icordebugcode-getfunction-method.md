---
title: "ICorDebugCode::GetFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getfunction-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetFunction Method

Gets the "ICorDebugFunction" associated with this "ICorDebugCode".

## Syntax

```cpp
HRESULT GetFunction (
    [out] ICorDebugFunction **ppFunction
);
```

## Parameters

 `ppFunction`
 [out] A pointer to the address of the function.

## Remarks

 `ICorDebugCode` and `ICorDebugFunction` maintain a one-to-one relationship.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
