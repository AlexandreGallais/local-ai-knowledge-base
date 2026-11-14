---
title: "ICorDebugRegisterSet::SetRegisters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-setregisters-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
