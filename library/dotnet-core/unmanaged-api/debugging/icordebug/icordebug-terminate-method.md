---
title: "ICorDebug::Terminate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebug-terminate-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebug::Terminate Method

Terminates the `ICorDebug` object.

> **Note:**
> `Terminate` should not be called until an ICorDebugManagedCallback::ExitProcess callback has been received for all processes being debugged.

## Syntax

```cpp
HRESULT Terminate ();
```

## Remarks

 `Terminate` must be called when the `ICorDebug` object is no longer needed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
