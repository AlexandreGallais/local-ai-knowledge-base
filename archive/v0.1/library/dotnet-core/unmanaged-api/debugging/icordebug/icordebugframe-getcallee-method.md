---
title: "ICorDebugFrame::GetCallee Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getcallee-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetCallee Method

Gets a pointer to the ICorDebugFrame object in the current chain that this frame called.

## Syntax

```cpp
HRESULT GetCallee (
    [out] ICorDebugFrame     **ppFrame
);
```

## Parameters

 `ppFrame`
 [out] A pointer to the address of an `ICorDebugFrame` object that represents the called frame. This value is null if the calling frame is the innermost frame in the current chain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
