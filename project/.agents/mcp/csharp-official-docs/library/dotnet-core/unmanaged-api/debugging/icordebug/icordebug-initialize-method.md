---
title: "ICorDebug::Initialize Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-initialize-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebug::Initialize Method

Initializes the `ICorDebug` object.

## Syntax

```cpp
HRESULT Initialize ();
```

## Remarks

The debugger must call `Initialize` at creation time to initialize the debugging services. This method must be called before any other method on `ICorDebug` is called.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
