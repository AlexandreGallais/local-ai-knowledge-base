---
title: "ICorDebugNativeFrame2::IsChild Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe2-ischild-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame2::IsChild Method

Determines whether the current frame is a child frame.

## Syntax

```cpp
HRESULT IsChild([out] BOOL * pIsChild);
```

## Parameters

 `pIsChild`
 [out] A Boolean value that specifies whether the current frame is a child frame.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The child status was successfully returned.|
|E_FAIL|The child status could not be returned.|
|E_INVALIDARG|`pIsChild` is null.|

## Remarks

The `IsChild` method returns `true` if the frame object on which you call the method is a child of another frame. If this is the case, use the IsMatchingParentFrame method to check whether a frame is its parent.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugNativeFrame2 Interface
