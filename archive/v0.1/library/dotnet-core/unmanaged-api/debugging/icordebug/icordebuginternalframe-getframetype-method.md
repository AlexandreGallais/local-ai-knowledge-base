---
title: "ICorDebugInternalFrame::GetFrameType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuginternalframe-getframetype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugInternalFrame::GetFrameType Method

Gets the type of this internal frame.

## Syntax

```cpp
HRESULT GetFrameType (
    [out] CorDebugInternalFrameType  *pType
);
```

## Parameters

 `pType`
 [out] A pointer to a value of the CorDebugInternalFrameType enumeration that indicates the type of internal frame represented by this `ICorDebugInternalFrame` object.

## Remarks

The internal frame type will never be STUBFRAME_NONE. Debuggers should gracefully ignore unrecognized internal frame types.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
