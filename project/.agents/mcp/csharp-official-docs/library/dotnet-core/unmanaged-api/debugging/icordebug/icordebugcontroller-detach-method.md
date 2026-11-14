---
title: "ICorDebugController::Detach Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcontroller-detach-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugController::Detach Method

Detaches the debugger from the process or application domain.

## Syntax

```cpp
HRESULT Detach ();
```

## Remarks

The process or application domain continues execution normally, but the `ICorDebugProcess` or `ICorDebugAppDomain` object is no longer valid and no further callbacks will occur.

If unmanaged debugging is enabled, this method will fail due to operating system limitations.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
