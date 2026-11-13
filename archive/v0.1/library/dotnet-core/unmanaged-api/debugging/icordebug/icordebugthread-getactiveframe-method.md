---
title: "ICorDebugThread::GetActiveFrame Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-getactiveframe-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugThread::GetActiveFrame Method

Gets an interface pointer to the active (most recent) frame on this ICorDebugThread object.

## Syntax

```cpp
HRESULT GetActiveFrame (
    [out] ICorDebugFrame   **ppFrame
);
```

## Parameters

 `ppFrame`
 [out] A pointer to the address of an ICorDebugFrame interface object that represents a frame.

## Remarks

The `ppFrame` parameter is null if no frame is currently active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
