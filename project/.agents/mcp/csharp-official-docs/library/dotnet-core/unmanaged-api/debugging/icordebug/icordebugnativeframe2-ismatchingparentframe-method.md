---
title: "ICorDebugNativeFrame2::IsMatchingParentFrame Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe2-ismatchingparentframe-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame2::IsMatchingParentFrame Method

Determines whether the specified frame is the parent of the current frame.

## Syntax

```cpp
HRESULT IsMatchingParentFrame([in] ICorDebugNativeFrame2
                                      *pPotentialParentFrame,
                              [out] BOOL *pIsParent);
```

## Parameters

 `pPotentialParentFrame`
 [in] A pointer to the frame object that you want to evaluate for parent status.

 `pIsParent`
 [out] `true` if `pPotentialParentFrame` is the current frame’s parent; otherwise, `false`.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The parent status was successfully returned.|
|E_FAIL|The parent status could not be returned.|
|E_INVALIDARG|`pPotentialParentFrame` or `pIsParent` is null.|

## Remarks

 `IsMatchingParentFrame` returns `true` if the frame object you pass to the method is the parent of the frame object on which the method was called. If you call the method on a frame that is not a child of the specified frame, it returns an error.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugNativeFrame2 Interface
