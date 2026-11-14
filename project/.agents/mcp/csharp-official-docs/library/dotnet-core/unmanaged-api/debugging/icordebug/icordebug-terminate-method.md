---
title: "ICorDebug::Terminate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-terminate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
