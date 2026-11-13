---
title: "ICorDebugCode4::EnumerateVariableHomes Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode4-enumeratevariablehomes-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode4::EnumerateVariableHomes Method

Gets an enumerator to the local variables and arguments in a function.

## Syntax

```cpp
HRESULT EnumerateVariableHomes(
    [out] ICorDebugVariableHomeEnum **ppEnum
);
```

## Parameters

 `ppEnum`
A pointer to the address of an ICorDebugVariableHomeEnum interface object that is an enumerator for the local variables and arguments in a function.

## Remarks

The ICorDebugVariableHomeEnum interface object is a standard enumerator derived from the "ICorDebugEnum" interface that allows you to enumerate ICorDebugVariableHome objects. The collection may include multiple ICorDebugVariableHome objects for the same slot or      argument index if they have different homes at different points in the      function.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugCode4 Interface
