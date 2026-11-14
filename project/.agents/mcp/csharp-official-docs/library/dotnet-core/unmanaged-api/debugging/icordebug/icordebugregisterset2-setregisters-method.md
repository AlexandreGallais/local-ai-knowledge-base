---
title: "ICorDebugRegisterSet2::SetRegisters Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset2-setregisters-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet2::SetRegisters Method

`SetRegisters` is not implemented.

> **Note:**
> Use the higher-level operations such as ICorDebugILFrame::SetIP or ICorDebugNativeFrame::SetIP.

## Syntax

```cpp
HRESULT SetRegisters (
    [in] ULONG32 maskCount,
    [in, size_is(maskCount)] BYTE mask[],
    [in] ULONG32 regCount,
    [in, size_is(regCount)] CORDB_REGISTER regBuffer[]
);
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugRegisterSet2 Interface
- ICorDebugRegisterSet Interface
