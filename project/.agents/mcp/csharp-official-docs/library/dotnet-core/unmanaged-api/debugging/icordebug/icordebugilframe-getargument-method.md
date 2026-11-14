---
title: "ICorDebugILFrame::GetArgument Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-getargument-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame::GetArgument Method

Gets the value of the specified argument in this common intermediate language (CIL) stack frame.

## Syntax

```cpp
HRESULT GetArgument (
    [in] DWORD                  dwIndex,
    [out] ICorDebugValue        **ppValue
);
```

## Parameters

 `dwIndex`
 [in] The index of the argument in this CIL stack frame.

 `ppValue`
 [out] A pointer to the address of an ICorDebugValue object that represents the retrieved value.

## Remarks

The `GetArgument` method can be used either in an CIL stack frame or in a just-in-time (JIT) compiled frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
