---
title: "ICorDebugStepper::Deactivate Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugstepper-deactivate-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugStepper::Deactivate Method

Causes this ICorDebugStepper to cancel the last step command that it received.

## Syntax

```cpp
HRESULT Deactivate ();
```

## Remarks

A new stepping command may be issued after the most recently received step command has been canceled.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
