---
title: "ICorDebugThread3::CreateStackWalk Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread3-createstackwalk-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread3::CreateStackWalk Method

Creates an ICorDebugStackWalk object for the thread whose stack you want to unwind.

## Syntax

```cpp
HRESULT CreateStackWalk([out] ICorDebugStackWalk **ppStackWalk);
```

## Parameters

 `ppStackWalk`
 [out] A pointer to address of the ICorDebugStackWalk object for the thread whose stack you want to unwind.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The `ICorDebugStackWalk` object was successfully created.|
|E_FAIL|The `ICorDebugStackWalk` object was not created.|

## Remarks

If the `CreateStackWalk` method succeeds, the returned `ICorDebugStackWalk` object's context is set to the thread's current context.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
