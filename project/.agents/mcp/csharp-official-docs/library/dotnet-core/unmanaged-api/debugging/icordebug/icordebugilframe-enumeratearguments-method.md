---
title: "ICorDebugILFrame::EnumerateArguments Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-enumeratearguments-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame::EnumerateArguments Method

Gets an enumerator for the arguments in this frame.

## Syntax

```cpp
HRESULT EnumerateArguments (
    [out] ICorDebugValueEnum    **ppValueEnum
);
```

## Parameters

 `ppValueEnum`
 [out] A pointer to the address of an ICorDebugValueEnum object that is the enumerator for the arguments in this frame.

## Remarks

 `EnumerateArguments` gets an enumerator that can list the arguments available in the call frame that is represented by this ICorDebugILFrame object. The list will include arguments that are vararg (that is, a variable number of arguments) as well as arguments that are not `vararg`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
