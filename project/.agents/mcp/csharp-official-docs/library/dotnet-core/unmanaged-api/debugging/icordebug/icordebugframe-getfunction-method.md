---
title: "ICorDebugFrame::GetFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getfunction-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetFunction Method

Gets the function that contains the code associated with this stack frame.

## Syntax

```cpp
HRESULT GetFunction (
    [out] ICorDebugFunction  **ppFunction
);
```

## Parameters

 `ppFunction`
 [out] A pointer to the address of an ICorDebugFunction object that represents the function containing the code associated with this stack frame.

## Remarks

The `GetFunction` method may fail if the frame is not associated with any particular function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
