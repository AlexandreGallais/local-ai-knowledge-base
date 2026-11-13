---
title: "ICorDebugNativeFrame::GetRegisterSet Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-getregisterset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::GetRegisterSet Method

Gets the register set for this stack frame.

## Syntax

```cpp
HRESULT GetRegisterSet (
    [out] ICorDebugRegisterSet **ppRegisters
);
```

## Parameters

 `ppRegisters`
 [out] A pointer to the address of an ICorDebugRegisterSet object that represents the register set for this stack frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
