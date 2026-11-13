---
title: "ICorDebugClass2::SetJMCStatus Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugclass2-setjmcstatus-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugClass2::SetJMCStatus Method

For each method of the class, sets a value that indicates whether the method is user-defined code.

## Syntax

```cpp
HRESULT SetJMCStatus (
    [in] BOOL   bIsJustMyCode
);
```

## Parameters

 `bIsJustMyCode`
 [in] Set to `true` to indicate that the method is user-defined code; otherwise, set to `false`.

## Remarks

A just-my-code (JMC) stepper will skip non-user-defined code. User-defined code must be a subset of debuggable code.

 `SetJMCStatus` returns an HRESULT value of S_FALSE if it fails to set the value for any method, even if it successfully sets the value for all other methods.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
