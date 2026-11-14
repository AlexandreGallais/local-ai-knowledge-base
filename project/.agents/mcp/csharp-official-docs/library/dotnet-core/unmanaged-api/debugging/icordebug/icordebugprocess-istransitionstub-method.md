---
title: "ICorDebugProcess::IsTransitionStub Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-istransitionstub-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::IsTransitionStub Method

Gets a value that indicates whether an address is inside a stub that will cause a transition to managed code.

## Syntax

```cpp
HRESULT IsTransitionStub(
    [in]  CORDB_ADDRESS address,
    [out] BOOL *pbTransitionStub);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` value that specifies the address in question.

 `pbTransitionStub`
 [out] A pointer to a Boolean value that is `true` if the specified address is inside a stub that will cause a transition to managed code; otherwise *`pbTransitionStub` is `false`.

## Remarks

The `IsTransitionStub` method can be used by unmanaged stepping code to decide when to return stepping control to the managed stepper.

You can also identity transition stubs by looking at information in the portable executable (PE) file.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
