---
title: "ICorDebugInternalFrame2::GetFrameAddress Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuginternalframe2-getframeaddress-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugInternalFrame2::GetFrameAddress Method

Returns the stack address of the internal frame.

## Syntax

```cpp
HRESULT GetFrameAddress([out] CORDB_ADDRESS *pAddress);
```

## Parameters

 `pAddress`
 [out] Pointer to the `CORDB_ADDRESS` for the internal frame.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The address of the internal frame was successfully returned.|
|E_FAIL|The address of the internal frame could not be returned.|
|E_INVALIDARG|`pAddress` is `null`.|

## Remarks

The value returned in `pAddress` can be used to determine the location of the internal frame relative to other frames on the stack. Even on IA-64-based computers, the internal frame lives on the stack only, and there is no corresponding pointer to a backing store.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugInternalFrame2 Interface
