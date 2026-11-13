---
title: "ICorDebugILFrame::GetArgument Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe-getargument-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
