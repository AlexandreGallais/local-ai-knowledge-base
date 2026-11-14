---
title: "ICorDebugFrame::GetCaller Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getcaller-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetCaller Method

Gets a pointer to the ICorDebugFrame object in the current chain that called this frame.

## Syntax

```cpp
HRESULT GetCaller (
    [out] ICorDebugFrame     **ppFrame
);
```

## Parameters

 `ppFrame`
 [out] A pointer to the address of an `ICorDebugFrame` object that represents the calling frame. This value is null if the called frame is the outermost frame in the current chain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
