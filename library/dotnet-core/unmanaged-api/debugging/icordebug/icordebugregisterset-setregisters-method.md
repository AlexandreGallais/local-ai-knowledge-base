---
title: "ICorDebugRegisterSet::SetRegisters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-setregisters-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet::SetRegisters Method

`SetRegisters` is not implemented.

> **Note:**
> Use the higher-level operations such as ICorDebugILFrame::SetIP or ICorDebugNativeFrame::SetIP.

## Syntax

```cpp
HRESULT SetRegisters (
    [in] ULONG64   mask,
    [in] ULONG32   regCount,
    [in, size_is(regCount)] CORDB_REGISTER regBuffer[]
);
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- ICorDebugRegisterSet Interface
- ICorDebugRegisterSet2 Interface
