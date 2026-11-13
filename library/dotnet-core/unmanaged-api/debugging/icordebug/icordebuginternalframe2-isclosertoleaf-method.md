---
title: "ICorDebugInternalFrame2::IsCloserToLeaf Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebuginternalframe2-isclosertoleaf-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugInternalFrame2::IsCloserToLeaf Method

Checks whether the `this` internal frame is closer to the leaf than the specified ICorDebugFrame object.

## Syntax

```cpp
HRESULT IsCloserToLeaf([in] ICorDebugFrame * pFrameToCompare,
                       [out] BOOL * pIsCloser);
```

## Parameters

 `pFrameToCompare`
 [in] A pointer to the comparison `ICorDebugFrame` object.

 `pIsCloser`
 [out] `true` if the `this` internal frame is closer to the leaf than the frame specified by `pFrameToCompare`; otherwise, `false`.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The comparison was successfully performed.|
|E_FAIL|The comparison could not be performed.|
|E_INVALIDARG|`pFrameToCompare` or `pIsCloser` is null.|

## Remarks

 `IsCloserToLeaf` can be used to implement a policy for interleaving internal frames with other frames on the stack.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugInternalFrame2 Interface
