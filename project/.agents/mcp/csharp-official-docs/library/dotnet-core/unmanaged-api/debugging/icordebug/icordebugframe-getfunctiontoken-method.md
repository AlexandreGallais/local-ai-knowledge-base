---
title: "ICorDebugFrame::GetFunctionToken Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getfunctiontoken-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetFunctionToken <example-value>

Gets the metadata token for the function that contains the code associated with this stack frame.

## Syntax

```cpp
HRESULT GetFunctionToken (
    [out] mdMethodDef        *pToken
);
```

## Parameters

 `pToken`
 [out] A pointer to an `mdMethodDef` token that references the metadata for the function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
