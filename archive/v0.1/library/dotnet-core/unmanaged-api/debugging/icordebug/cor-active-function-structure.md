---
title: "COR_ACTIVE_FUNCTION Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-active-function-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_ACTIVE_FUNCTION Structure

Contains information about the functions that are currently active in a thread's frames. This structure is used by the ICorDebugThread2::GetActiveFunctions method.

## Syntax

```cpp
typedef struct  _COR_ACTIVE_FUNCTION {
    ICorDebugAppDomain   *pAppDomain;
    ICorDebugModule      *pModule;
    ICorDebugFunction2   *pFunction;
    ULONG32              ilOffset;
    ULONG32              flags;
} COR_ACTIVE_FUNCTION;
```

## Members

| Member       | Description                                                      |
|--------------|------------------------------------------------------------------|
| `pAppDomain` | Pointer to the application domain owner of the `ilOffset` field. |
| `pModule`    | Pointer to the module owner of the `ilOffset` field.             |
| `pFunction`  | Pointer to the function owner of the `ilOffset` field.           |
| `ilOffset`   | The common intermediate language (CIL) offset of the frame.      |
| `flags`      | Reserved for future extensibility.                               |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
