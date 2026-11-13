---
title: "ICorDebugEval::GetResult Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-getresult-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval::GetResult Method

Gets the results of this evaluation.

## Syntax

```cpp
HRESULT GetResult (
    [out] ICorDebugValue    **ppResult
);
```

## Parameters

 `ppResult`
 [out] Pointer to the address of an ICorDebugValue object that represents the results of this evaluation, if the evaluation completes normally.

## Remarks

The `GetResult` method is valid only after the evaluation is completed.

If the evaluation completes normally, `ppResult` specifies the results. If it terminates with an exception, the result is the exception thrown. If the evaluation was for a new object, the result is the reference to the new object.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
