---
title: "ICorDebugILFrame::EnumerateLocalVariables Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-enumeratelocalvariables-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame::EnumerateLocalVariables Method

Gets an enumerator for the local variables in this frame.

## Syntax

```cpp
HRESULT EnumerateLocalVariables(
    [out] ICorDebugValueEnum    **ppValueEnum
);
```

## Parameters

 `ppValueEnum`
 [out] A pointer to the address of an ICorDebugValueEnum object that is the enumerator for the local variables in this frame.

## Remarks

 `EnumerateLocalVariables` gets an enumerator that can list the local variables available in the call frame that is represented by this ICorDebugILFrame object. The list may not include all of the local variables in the running function, because some of them may not be active.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
