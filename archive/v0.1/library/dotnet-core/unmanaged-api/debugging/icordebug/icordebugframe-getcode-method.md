---
title: "ICorDebugFrame::GetCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugframe-getcode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFrame::GetCode Method

Gets a pointer to the code associated with this stack frame.

## Syntax

```cpp
HRESULT GetCode (
    [out] ICorDebugCode      **ppCode
);
```

## Parameters

 `ppCode`
 [out] A pointer to the address of an ICorDebugCode object that represents the code associated with this frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
