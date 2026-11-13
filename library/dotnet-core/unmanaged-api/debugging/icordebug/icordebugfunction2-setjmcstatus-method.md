---
title: "ICorDebugFunction2::SetJMCStatus Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-setjmcstatus-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction2::SetJMCStatus Method

Marks the function represented by this ICorDebugFunction2 for Just My Code stepping.

## Syntax

```cpp
HRESULT SetJMCStatus (
    [in] BOOL   bIsJustMyCode
);
```

## Parameters

 `bIsJustMyCode`
 [in] Set to `true` to mark the function as user code; otherwise, set to `false`.

## Return Values

|HRESULT|Description|
|-------------|-----------------|
|`S_OK`|The function was successfully marked.|
|`CORDBG_E_FUNCTION_NOT_DEBUGGABLE`|The function could not be marked as user code because it cannot be debugged.|

## Remarks

A Just My Code stepper will skip non-user code. User code must be a subset of debuggable code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
