---
title: "ICorDebugMDA::GetFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmda-getflags-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugMDA::GetFlags Method

Gets the flags associated with the managed debugging assistant (MDA) represented by ICorDebugMDA.

## Syntax

```cpp
HRESULT GetFlags (
    [in] CorDebugMDAFlags *pFlags
);
```

## Parameters

 `pFlags`
 [in] A bitwise combination of the CorDebugMDAFlags enumeration values that specify the settings of the flags for this MDA.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0

## See also

- ICorDebugMDA Interface
- Diagnose Errors with Managed Debugging Assistants
