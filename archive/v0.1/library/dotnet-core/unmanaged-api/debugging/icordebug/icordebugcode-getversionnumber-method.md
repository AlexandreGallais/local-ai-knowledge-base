---
title: "ICorDebugCode::GetVersionNumber Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getversionnumber-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetVersionNumber Method

Gets the one-based number that identifies the version of the code that this "ICorDebugCode" represents.

## Syntax

```cpp
HRESULT GetVersionNumber (
    [out] ULONG32    *nVersion
);
```

## Parameters

 `nVersion`
 [out] A pointer to the version number of the code.

## Remarks

The version number is incremented each time an edit-and-continue (EnC) operation is performed on the code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
