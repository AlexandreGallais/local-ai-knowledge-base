---
title: "ICorDebugFrame::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getcode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetCode Method

Gets a pointer to the code associated with this stack frame.

## Syntax

```cpp
HRESULT GetCode (
    [out] ICorDebugCode      **ppCode
);
```

## Parameters

 `ppCode`
 [out] A pointer to the address of an ICorDebugCode object that represents the code associated with this frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
