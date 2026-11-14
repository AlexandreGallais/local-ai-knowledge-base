---
title: "ICorDebugThread3::GetActiveInternalFrames Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread3-getactiveinternalframes-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread3::GetActiveInternalFrames Method

Returns an array of internal frames (ICorDebugInternalFrame2 objects) on the stack.

## Syntax

```cpp
HRESULT GetActiveInternalFrames
      (
      [in] ULONG32 cInternalFrames,
      [out] ULONG32 *pcInternalFrames,
      [in, out,size_is(cInternalFrames), length_is(*pcInternalFrames)]
            ICorDebugInternalFrame2 * ppInternalFrames[]
      );
```

## Parameters

 `cInternalFrames`
 [in] The number of internal frames expected in `ppInternalFrames`.

 `pcInternalFrames`
 [out] A pointer to a `ULONG32` that contains the number of internal frames on the stack.

 `ppInternalFrames`
 [in, out] A pointer to the address of an array of internal frames on the stack.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The ICorDebugInternalFrame2 object was successfully created.|
|E_INVALIDARG|`cInternalFrames` is not zero and `ppInternalFrames` is `null`, or `pcInternalFrames` is `null`.|
|HRESULT_FROM_WIN32(ERROR_INSUFFICIENT_BUFFER)|`ppInternalFrames` is smaller than the count of internal frames.|

## Remarks

Internal frames are data structures pushed onto the stack by the runtime to store temporary data.

When you first call `GetActiveInternalFrames`, you should set the `cInternalFrames` parameter to 0 (zero), and the `ppInternalFrames` parameter to null. When `GetActiveInternalFrames` first returns, `pcInternalFrames` contains the count of the internal frames on the stack.

 `GetActiveInternalFrames` should then be called a second time. You should pass the proper count (`pcInternalFrames`) in the `cInternalFrames` parameter, and specify a pointer to an appropriately sized array in `ppInternalFrames`.

Use the ICorDebugStackWalk::GetFrame method to return actual stack frames.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
