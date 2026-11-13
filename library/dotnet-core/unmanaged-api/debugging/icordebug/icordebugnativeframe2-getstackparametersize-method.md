---
title: "ICorDebugNativeFrame2::GetStackParameterSize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe2-getstackparametersize-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame2::GetStackParameterSize Method

Returns the cumulative size of the parameters on the stack on x86 operating systems.

## Syntax

```cpp
HRESULT GetStackParameterSize([out] ULONG32 * pSize)
```

## Parameters

 `pSize`
 [out] A pointer to the cumulative size of the parameters on the stack.

## Return Value

This method returns the following specific HRESULTs as well as HRESULT errors that indicate method failure.

|HRESULT|Description|
|-------------|-----------------|
|S_OK|The stack size was successfully returned.|
|S_FALSE|`GetStackParameterSize` was called on a non-x86 platform.|
|E_FAIL|`The size of the parameters could not be returned`.|
|E_INVALIDARG|`pSize` Is `null`.|

## Remarks

The ICorDebugStackWalk methods do not adjust the stack pointer for parameters that are pushed on the stack. Instead, you can use the value returned by `GetStackParameterSize` to adjust the stack pointer to seed a native unwinder, which does adjust for the parameters.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0

## See also

- ICorDebugNativeFrame2 Interface
